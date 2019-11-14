import { Client, ClientConfig, QueryResult } from 'pg';
import { AESEncryptionMiddleware } from 'commons';
import { Logger, LColor } from 'logger-colors';
const logger = new Logger();
const separador = '----------------------------------------------------';

const getCoonfig = (): ClientConfig => {
    return {
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        port: Number(process.env.POSTGRES_PORT),
    };
};

const getIDCCobro = async (req: any) => {
    logger.cyan('getIDCCobro');

    const client = new Client(getCoonfig());
    return client.connect().then(async () => {
        let query = `
                SELECT
                    mc.id_mensaje_cobro::text AS id,
                    'Cobro'::text AS descripcion,
                    extract(epoch from mc.fecha_hora_solicitud)*1000 AS fhs,
                    CASE WHEN mc.concepto_pago IS NOT NULL THEN mc.concepto_pago ELSE '' END::text AS cc,
                    CASE WHEN mc.monto IS NOT NULL THEN mc.monto ELSE '' END::text AS mt,
                    mc.referencia_numerica AS cr,
                    CASE WHEN mc.numero_cuenta_vendedor IS NOT NULL THEN mc.numero_cuenta_vendedor ELSE '' END::text AS vcb,
                    CASE WHEN mc.numero_celular_vendedor IS NOT NULL THEN mc.numero_celular_vendedor ELSE '' END::text AS vnc,
                    CASE WHEN mc.digito_verificador_vendedor IS NOT NULL THEN mc.digito_verificador_vendedor ELSE '' END::text AS vdv
                FROM
                    codi_mc_generados AS mc
                WHERE
                    1 = 1`;

        if (req.fechainicial && req.fechainicial !== '') {
            // tslint:disable-next-line: max-line-length
            query += ' AND TO_DATE(mc.fecha_hora_solicitud::text, \'YYYY-MM-DD\')  BETWEEN \'' +  req.fechainicial + '\' AND \'' + req.fechafinal + '\'';
        }

        if (req.cliente && req.cliente !== '') {
            query += ' AND mc.id_cliente = \'' +  req.cliente + '\'';
        }

        query += ' ORDER BY id ASC;';

        return client.query(query, []).then((res: QueryResult) => {
            logger.info(separador);
            logger.cyan(`Registros de DB: ${LColor.c_gray}${JSON.stringify(res.rows)}${LColor.c_gray}`, false);

            const data: any[] = [];
            if (res.rows.length > 0) {
                return desencriptarDatosIDCCobro(res.rows).then(async (datos) => {
                    logger.cyan('Datos Desencriptados:');
                    logger.success(JSON.stringify(datos));
                    return datos;
                }).catch((error: any) => {
                    throw error;
                });
            } else {
                return data;
            }
        }).catch((e) => {
            throw e;
        }).finally(() => {
            client.end();
        });
    }).catch((error) => {
        throw new Error(error);
    });
};

const getIDCPago = async (req: any) => {
    logger.cyan('getIDCPago');

    const client = new Client(getCoonfig());
    return client.connect().then(async () => {
        let query = `
                SELECT DISTINCT
                    oper.id_mensaje_cobro::text AS id,
                    tOper.tipo_operacion::text AS descripcion,
                    extract(epoch from oper.fecha_hora_procesamiento)*1000 AS fhp,
                    extract(epoch from oper.fecha_hora_solicitud)*1000 AS fhs,
                    extract(epoch from oper.fecha_hora_limite)*1000 AS fhl,
                    CASE WHEN oper.concepto_pago IS NOT NULL THEN oper.concepto_pago ELSE '' END::text AS cc,
                    CASE WHEN oper.monto IS NOT NULL THEN oper.monto ELSE '' END::text AS mt,
                    oper.referencia_numerica AS rn,
                    CASE WHEN oper.numero_cuenta_vendedor IS NOT NULL THEN oper.numero_cuenta_vendedor ELSE '' END::text AS vcb,
                    CASE WHEN oper.cve_rastreo IS NOT NULL THEN oper.cve_rastreo ELSE '' END::text AS cr,
                    CASE WHEN oper.numero_cuenta_comprador IS NOT NULL THEN oper.numero_cuenta_comprador ELSE '' END::text AS cnb,
                    oper.estado_aviso_mc AS e,
                    CASE WHEN oper.numero_celular_comprador IS NOT NULL THEN oper.numero_celular_comprador ELSE '' END::text AS cnc,
                    CASE WHEN oper.digito_verificador_comprador IS NOT NULL THEN oper.digito_verificador_comprador ELSE '' END::text AS cdv,
                    CASE WHEN oper.numero_celular_vendedor IS NOT NULL THEN oper.numero_celular_vendedor ELSE '' END::text AS vnc,
                    CASE WHEN oper.digito_verificador_vendedor IS NOT NULL THEN oper.digito_verificador_vendedor ELSE '' END::text AS vdv,
                    oper.id_tipo_pago AS tp,
                    CASE WHEN oper.id_institucion_vendedor IS NOT NULL THEN oper.id_institucion_vendedor ELSE '' END::text AS vii,
                    CASE WHEN oper.id_institucion_comprador IS NOT NULL THEN oper.id_institucion_comprador ELSE '' END::text AS cii,
                    CASE WHEN oper.id_tipo_cuenta_vendedor IS NOT NULL THEN oper.id_tipo_cuenta_vendedor ELSE '' END::text AS itcv,
                    CASE WHEN oper.id_tipo_cuenta_comprador IS NOT NULL THEN oper.id_tipo_cuenta_comprador ELSE '' END::text as itcc,
                    CASE WHEN oper.nombre_vendedor IS NOT NULL THEN oper.nombre_vendedor ELSE '' END::text AS nbv,
                    CASE WHEN oper.nombre_comprador IS NOT NULL THEN oper.nombre_comprador ELSE '' END::text AS nbc,
                    oper.comision_transferencia AS ct
                FROM codi_operaciones AS oper
                INNER JOIN codi_tipo_operacion AS tOper ON tOper.id_tipo_operacion = oper.id_tipo_operacion
                WHERE
                    oper.id_tipo_operacion in (1, 2) AND oper.id_tipo_pago != 19`;

        if (req.fechainicial && req.fechainicial !== '') {
            query += ' AND TO_DATE(oper.fecha_hora_solicitud::text, \'YYYY-MM-DD\') BETWEEN \'' +  req.fechainicial + '\' AND \'' + req.fechafinal + '\'';
        }

        if (req.cliente && req.cliente !== '') {
            query += ' AND oper.id_cliente = \'' +  req.cliente + '\'';
        }

        query += ' ORDER BY id ASC;';

        return client.query(query, []).then((res: QueryResult) => {
            logger.info(separador);
            logger.cyan(`Registros de DB: ${LColor.c_gray}${JSON.stringify(res.rows)}${LColor.c_gray}`, false);

            const data: any[] = [];
            if (res.rows.length > 0) {
                return desencriptarDatosIDCPago(res.rows).then(async (datos) => {
                    logger.cyan('Datos Desencriptados:');
                    logger.success(JSON.stringify(datos));
                    return datos;
                }).catch((error: any) => {
                    throw error;
                });
            } else {
                return data;
            }
        }).catch((e: any) => {
            throw e;
        }).finally(() => {
            client.end();
        });
    }).catch((error) => {
        throw new Error(error);
    });
};

const getInfoCobroIDC = async (req: any) => {
    const client = new Client(getCoonfig());
    await client.connect();
    const query = `
        SELECT
            mc.id_mensaje_cobro::text AS idc,
            mc.concepto_pago AS concepto,
            mc.referencia_numerica AS referencia,
            extract(epoch from mc.fecha_hora_solicitud)*1000 AS fhs,
            mc.monto AS monto
        FROM
            codi_mc_generados AS mc
        WHERE
            mc.id_mensaje_cobro = '${req.idc}'`;

    return client.query(query, []).then(async (res: QueryResult) => {
        if (res.rows.length > 0) {
            logger.cyan('Datos Encriptados:');
            logger.success(JSON.stringify(res.rows));

            return desencriptarInfoIdcCobro(res.rows).then(async (datos) => {
                logger.cyan('Datos Desencriptados:');
                logger.success(JSON.stringify(datos));
                return datos;
            }).catch((error: any) => {
                throw error;
            });
        } else {
            return res.rows;
        }
    }).catch((e) => {
        throw new Error('Error en la operacion sql: "' + e + '"');
    }).finally(() => {
        client.end();
    });
};

async function desencriptarInfoIdcCobro(datos: any) {
    const data: any[] = [];
    for await (const msc of datos) {
        let mensajeCobro = {
            idc: msc.idc,
            referencia: msc.referencia,
            horaSolicitud: msc.fhs,
            concepto: '',
            monto: '',
        };
        mensajeCobro = msc;
        mensajeCobro.concepto = await AESEncryptionMiddleware()
            .decryption(String(msc.concepto));
        mensajeCobro.monto = await AESEncryptionMiddleware()
            .decryption(String(msc.monto));
        data.push(mensajeCobro);
    }
    return data;
}

async function desencriptarDatosIDCCobro(datos: any) {
    const data: any[] = [];
    for await (const msc of datos) {
        let mensajeCobro = {
            id: msc.id,
            descripcion: msc.descripcion,
            fhs: msc.fhs,
            cc: '',
            mt: '',
            cr: msc.cr,
            vcb: '',
            vnc: '',
            vdv: '',
        };
        mensajeCobro = msc;
        mensajeCobro.cc = await AESEncryptionMiddleware()
            .decryption(String(msc.cc));
        mensajeCobro.mt = await AESEncryptionMiddleware()
            .decryption(String(msc.mt));
        mensajeCobro.vcb = await AESEncryptionMiddleware()
            .decryption(String(msc.vcb));
        mensajeCobro.vnc = await AESEncryptionMiddleware()
            .decryption(String(msc.vnc));
        mensajeCobro.vdv = await AESEncryptionMiddleware()
            .decryption(String(msc.vdv));

        data.push(mensajeCobro);
    }
    return data;
}
async function desencriptarDatosIDCPago(datos: any) {
    const data: any[] = [];
    for await (const idcp of datos) {
        let mensajePago = {
            id: idcp.id,
            descripcion: idcp.descripcion,
            fhp: idcp.fhp,
            fhs: idcp.fhs,
            fhl: idcp.fhl,
            cc: '',
            mt: '',
            rn: idcp.rn,
            vcb: '',
            cr: '',
            cnb: '',
            e: idcp.e,
            cnc: '',
            cdv: '',
            vnc: '',
            vdv: '',
            tp: idcp.tp,
            vii: '',
            cii: '',
            itcv: '',
            itcc: '',
            nbv: '',
            nbc: '',
            ct: idcp.ct,
        };
        mensajePago = idcp;
        mensajePago.mt = await AESEncryptionMiddleware()
            .decryption(String(idcp.mt));
        mensajePago.cc = await AESEncryptionMiddleware()
            .decryption(String(idcp.cc));
        mensajePago.cr = await AESEncryptionMiddleware()
            .decryption(String(idcp.cr));
        mensajePago.cnc = await AESEncryptionMiddleware()
            .decryption(String(idcp.cnc));
        mensajePago.cdv = await AESEncryptionMiddleware()
            .decryption(String(idcp.cdv));
        mensajePago.nbc = await AESEncryptionMiddleware()
            .decryption(String(idcp.nbc));
        mensajePago.itcc = await AESEncryptionMiddleware()
            .decryption(String(idcp.itcc));
        mensajePago.cnb = await AESEncryptionMiddleware()
            .decryption(String(idcp.cnb));
        mensajePago.cii = await AESEncryptionMiddleware()
            .decryption(String(idcp.cii));
        mensajePago.vnc = await AESEncryptionMiddleware()
            .decryption(String(idcp.vnc));
        mensajePago.vdv = await AESEncryptionMiddleware()
            .decryption(String(idcp.vdv));
        mensajePago.nbv = await AESEncryptionMiddleware()
            .decryption(String(idcp.nbv));
        mensajePago.itcv = await AESEncryptionMiddleware()
            .decryption(String(idcp.itcv));
        mensajePago.vcb = await AESEncryptionMiddleware()
            .decryption(String(idcp.vcb));
        mensajePago.vii = await AESEncryptionMiddleware()
            .decryption(String(idcp.vii));

        data.push(mensajePago);
    }
    return data;
}

export const DB = {
    getIDCCobro,
    getIDCPago,
    getInfoCobroIDC,
};
