import { Client, ClientConfig, QueryResult } from 'pg';
import fs from 'fs';

// function getCoonfig(): ClientConfig {
//     return {
//         user: process.env.POSTGRES_USER,
//         host: process.env.POSTGRES_HOST,
//         database: process.env.POSTGRES_DB,
//         password: process.env.POSTGRES_PASSWORD,
//         port: Number(process.env.POSTGRES_PORT),
//     };
// }

process.env.POSTGRES_USER = 'admin';
process.env.POSTGRES_HOST = 'localhost';
process.env.POSTGRES_PORT = '5432';
process.env.POSTGRES_DB = 'pruebas';
process.env.POSTGRES_PASSWORD = 'admin123';


function getCoonfig(): ClientConfig {
    return {
        user: 'admin',
        host: 'localhost',
        database: 'pruebas',
        password: 'admin123',
        port: 5432,
    };
}
function createDB() {
    console.info("CREANDO-DB");
    // const sql = fs.readFileSync('test/db.sql', { encoding: 'utf-8' });
    const  sql = fs.readFileSync('test/db.sql').toString();
    // const sql = fs.readFileSync('db.sql').toString()
    // .replace(/(\r\n|\n|\r)/gm, "") // remove newlines
    // .replace(/\s+/g, ' ') // excess white space
    // .split(";") // split into all statements
    // .map(Function.prototype.call, String.prototype.trim)
    // .filter(function(el) {return el.length !== 0; }); // remove any empty ones

    const client = new Client(getCoonfig());
    // console.log('info -> ', getCoonfig());
    return client.connect().then(() => {
        return client.query(sql, []).then((res: QueryResult) => {
            // console.info("DB CREADA");
            return res;
        }).finally(() => {
            client.end();
        });
    });
}

function deleteDB() {
    // console.info("BORRANDO-DB");
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
}


export const DBTest = {
    createDB,
    deleteDB,
};
