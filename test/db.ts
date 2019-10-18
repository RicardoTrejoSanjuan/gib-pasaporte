import { Client, ClientConfig, QueryResult } from 'pg';
import fs from 'fs';

function getCoonfig(): ClientConfig {
    return {
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        port: Number(process.env.POSTGRES_PORT),
    };
}

function createDB() {
    console.info("CREANDO-DB");
    const sql = fs.readFileSync('test/db.sql', { encoding: 'utf-8' });

    const client = new Client(getCoonfig());
    return client.connect().then(() => {
        return client.query(sql, []).then((res: QueryResult) => {
            console.info("DB CREADA");
            return res;
        }).catch((e) => {
            console.info("ERROR AL CREAR DB" + e);
        }).finally(() => {
            client.end();
        });
    });
    // .catch((e) => {
    //     console.error(e);
    // });
}

function deleteDB() {
    console.info("BORRANDO-DB");
    const sql = 'DROP SCHEMA public CASCADE;';
    const client = new Client(getCoonfig());
    return client.connect().then(() => {
        return client.query(sql, []).then((res: QueryResult) => {
            console.info("DB Borrada");
            return res;
        }).finally(() => {
            client.end();
        });
    });
    // .catch((e) => {
    //     console.error(e);
    // });
}


export const DBTest = {
    createDB,
    deleteDB,
};
