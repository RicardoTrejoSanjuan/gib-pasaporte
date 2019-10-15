import { DBTest } from './db';
// const savePIN = require('./SavePinDB');
import * as fixtures from '../fixtures';
import { DB } from '../db/DBController';
// import { DB } from '../db/DBController';


describe('Al guardar un registro', () => {
    describe("Si hay un error de conexión", () => {
        beforeAll(() => {
            return DBTest.deleteDB();
        });
    });
    describe("Si la conexión es correcta, ", () => {
        beforeAll(() => {
            process.env.POSTGRES_USER = 'admin';
            process.env.POSTGRES_HOST = 'localhost';
            process.env.POSTGRES_PORT = '5432';
            process.env.POSTGRES_DB = 'pruebas';
            process.env.POSTGRES_PASSWORD = 'admin123';

            return  DBTest.createDB();
        });

        afterAll(() => {
            return DBTest.deleteDB();
        });

        describe('Cuando se obtiene lis ID', () => {
            test(`Si se obtiene correctamente el IDCPago`, async () => {
                const row = await DB.getIDCPago(fixtures.consultaIDCPago);
                expect(row).toBeDefined();
                expect(row).toBe(1);
             });

            test(`Si se guarda correctamente el IDCobro`, async () => {
                const row = await DB.getIDCCobro(fixtures.consltaIDCobro);
                expect(row).toBeDefined();
                expect(row).toBe(1);
             });
        });

    });
});

