import { Client, ClientConfig, QueryResult } from 'pg';

const connectionInfo: ClientConfig = {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT),
};

const getIDCCobro = async (req: any) => {
    const client = new Client(connectionInfo);
    await client.connect();
    let query = `
            SELECT
                mc.id_mensaje_cobro::text AS id,
                'Cobro'::text AS descripcion,
                extract(epoch from mc.fecha_hora_solicitud)*1000 AS fhs,
                mc.concepto_pago AS cc,
                mc.monto AS mt,
                mc.referencia_numerica AS cr,
                mc.numero_cuenta_vendedor AS vcb,
                mc.numero_celular_vendedor::text AS vnc,
                mc.digito_verificador_vendedor::text AS vdv
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
        return res.rows;
    }).finally(() => {
        client.end();
    });
};

const getIDCPago = async (req: any) => {
    const client = new Client(connectionInfo);
    await client.connect();
    let query = `
            SELECT DISTINCT
                oper.id_mensaje_cobro::text AS id,
                tOper.tipo_operacion::text AS descripcion,
                extract(epoch from oper.fecha_hora_procesamiento)*1000 AS fhp,
                extract(epoch from oper.fecha_hora_solicitud)*1000 AS fhs,
                extract(epoch from oper.fecha_hora_limite)*1000 AS fhl,
                oper.concepto_pago AS cc,
                oper.monto AS mt,
                oper.referencia_numerica AS rn,
                oper.numero_cuenta_vendedor AS vcb,
                oper.cve_rastreo AS cr,
                oper.numero_cuenta_comprador AS cnb,
                oper.estado_aviso_mc AS e,
                oper.numero_celular_comprador::text AS cnc,
                oper.digito_verificador_comprador::text AS cdv,
                oper.numero_celular_vendedor::text AS vnc,
                oper.digito_verificador_vendedor::text AS vdv,
                oper.id_tipo_pago AS tp,
                oper.id_institucion_vendedor AS vii,
                oper.id_institucion_comprador AS cii,
                oper.id_tipo_cuenta_vendedor AS itc,
                oper.nombre_vendedor AS nv,
                oper.comision_transferencia AS ct
            FROM codi_operaciones AS oper
            INNER JOIN codi_tipo_operacion AS tOper ON tOper.id_tipo_operacion = oper.id_tipo_operacion
            WHERE
                oper.id_tipo_operacion in (1, 2)`;

    if (req.fechainicial && req.fechainicial !== '') {
        query += ' AND TO_DATE(oper.fecha_hora_solicitud::text, \'YYYY-MM-DD\') BETWEEN \'' +  req.fechainicial + '\' AND \'' + req.fechafinal + '\'';
    }

    if (req.cliente && req.cliente !== '') {
        query += ' AND oper.id_cliente = \'' +  req.cliente + '\'';
    }

    query += ' ORDER BY id ASC;';

    return client.query(query, []).then((res: QueryResult) => {
        return res.rows;
    }).finally(() => {
        client.end();
    });
};


export const DB = {
    getIDCCobro,
    getIDCPago,
};
