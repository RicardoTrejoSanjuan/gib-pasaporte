import { Client, ClientConfig, QueryResult } from 'pg';
import { Logger, LColor } from 'logger-colors';
const logger = new Logger();

const separador = '----------------------------------------------------';

const getCoonfig = (): ClientConfig => {
    return {
        user: 'biometricos',
        host: '10.160.188.27',
        database: 'base_central_operaciones_qa',
        password: 'Biometric0s#2019',
        port: 5432,
    };
};

const insert = (datos: any, lamina: boolean) => {
    let data: any[] = [];
    try {
        return _insert(datos, lamina).then((dataInsert) => {
            data = dataInsert;
            return data;
        }).catch((error: any) => {
            // console.error(error);
            throw new Error(error);
        });
    } catch (e) {
        throw new Error(e);
    }
};

async function _insert(datos: any, lamina: boolean) {
    const data: any[] = [];

    for await (const item of datos) {
        const record = {
            item: '',
            status: 0,
        };

        record.item = item;
        record.status = await insertRecordDB(item, lamina);
        data.push(record);
    }
    return data;
}

const insertRecordDB = (item: string, lamina: boolean) => {
    const client = new Client(getCoonfig());
    return client.connect().then(async () => {
        const q = lamina ? `
        INSERT INTO laminas(
            id_lamina
        ) VALUES ($1)` : `
        INSERT INTO libretas(
            id_libreta
        ) VALUES ($1)`;

        return client.query(q, [
            item,
        ]).then((res: QueryResult) => {
            return res.rowCount;
        }).catch((error: any) => {
            if (error.code === '23505') {
                return -1;
            } else {
                logger.error(error);
                return -2;
            }
        }).finally(() => {
            client.end();
        });
    }).catch((error: any) => {
        throw new Error(error);
    });
};


const getRecords = async (lamina: boolean) => {
    const client = new Client(getCoonfig());
    return client.connect().then(async () => {
        let query = lamina ? `
                SELECT
                    l.id_lamina::text AS id,
                    COALESCE(to_char(l.fecha_insert, 'DD-MM-YYYY HH24:MI:SS'), '') AS fecha
                FROM
                    laminas AS l
                WHERE
                    1 = 1` : `
                SELECT
                    l.id_libreta::text AS id,
                    COALESCE(to_char(l.fecha_insert, 'DD-MM-YYYY HH24:MI:SS'), '') AS fecha
                FROM
                    libretas AS l
                WHERE
                    1 = 1`;

        query += ' ORDER BY id ASC;';

        return client.query(query, []).then((res: QueryResult) => {
            logger.info(separador);
            const text = lamina ? 'Laminas' : 'Libretas';
            // tslint:disable-next-line: max-line-length
            logger.cyan(`Registros ${text} de DB: ${LColor.c_gray}${JSON.stringify(res.rows.length)}${LColor.c_gray}`, false);

            const data: any[] = [];
            if (res.rows.length > 0) {
                return res.rows;
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


const findRecords = async (records: string[], lamina: boolean) => {
    const client = new Client(getCoonfig());
    return client.connect().then(async () => {
        let query = lamina ? `
                SELECT
                    l.id_lamina::text AS id,
                    COALESCE(to_char(l.fecha_insert, 'DD-MM-YYYY HH24:MI:SS'), '') AS fecha
                FROM
                    laminas AS l
                WHERE
                    l.id_lamina in ` : `
                SELECT
                    l.id_libreta::text AS id,
                    COALESCE(to_char(l.fecha_insert, 'DD-MM-YYYY HH24:MI:SS'), '') AS fecha
                FROM
                    libretas AS l
                WHERE
                    l.id_libreta in `;

        const ids = records.map((x: string) => x.replace(/[^a-z0-9A-Z]/g, ''));

        let condition = '(';
        ids.forEach((id: string) => {
            condition += '\'' + id.toString() + '\',';
        });

        condition = condition.slice(0, -1);
        condition += ')';
        query += condition;

        return client.query(query, []).then((res: QueryResult) => {
            const data: any[] = [];
            if (res.rows.length > 0) {
                return res.rows;
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

export const DB = {
    insert,
    getRecords,
    findRecords,
};
