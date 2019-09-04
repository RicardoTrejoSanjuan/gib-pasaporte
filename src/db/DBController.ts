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
                TO_DATE(mc.fecha_hora_solicitud::text, 'YYYY-MM-DD')::text AS fecha,
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
                TO_DATE(oper.fecha_hora_solicitud::text, 'YYYY-MM-DD')::text AS fecha,
                oper.numero_celular_comprador::text AS cnc,
                oper.digito_verificador_comprador::text AS cdv,
                oper.numero_celular_vendedor::text AS vnc,
                oper.digito_verificador_vendedor::text AS vdv
            FROM codi_operaciones AS oper
            INNER JOIN codi_tipo_operacion AS tOper ON tOper.id_tipo_operacion = oper.id_tipo_operacion
            WHERE
                oper.id_tipo_operacion = 2`;

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
