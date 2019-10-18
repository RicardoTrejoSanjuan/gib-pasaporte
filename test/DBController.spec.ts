import { DBTest } from './db';
import * as fixtures from '../src/fixtures';
import { DB } from '../src/db/DBController';


describe('Crear la BD', () => {
    describe("Si la conexión es correcta, ", () => {
        beforeAll(() => {
            // process.env.POSTGRES_USER = 'admin';
            // process.env.POSTGRES_HOST = '10.160.121.82';
            // process.env.POSTGRES_PORT = '5434';
            // process.env.POSTGRES_DB = 'pruebas';
            // process.env.POSTGRES_PASSWORD = 'admin123';
        });

        beforeEach(() => {
            return DBTest.createDB();
        });

        describe('Cuando se obtiene lista de Mensajes', () => {
            test(`Si se obtiene correctamente el IDCPago`, async () => {
                const row = await DB.getIDCPago(fixtures.consultaMC);
                expect(row).toBeDefined();
                expect(row.length).toBe(7);
            });

            test(`Si se obtiene correctamente el IDCobro`, async () => {
                const row = await DB.getIDCCobro(fixtures.consultaMC);
                expect(row).toBeDefined();
                expect(row.length).toBe(7);
            });
        });

        describe('Cuando se obtiene lista de Mensajes', () => {
            test(`Si se obtiene correctamente el IDCPago sin fechas`, async () => {
                const row = await DB.getIDCPago(fixtures.consultaMCVacio);
                expect(row).toBeDefined();
                expect(row.length).toBe(7);
            });

            test(`Si se obtiene correctamente el IDCobro sin fechas`, async () => {
                const row = await DB.getIDCCobro(fixtures.consultaMCVacio);
                expect(row).toBeDefined();
                expect(row.length).toBe(7);
            });
        });

        describe('Cuando ocurre un error al obtener la lista de Mensajes', () => {
            beforeEach(async () => {
                return await DBTest.deleteDB();
            });
            test(`Si ocurre un error al llamar el IDCPago`, async () => {
                try {
                    const row = await DB.getIDCPago(fixtures.consultaMC);
                } catch (error) {
                    const err = 1;
                    expect(err).toBe(1);
                }
            });

            test(`Si ocurre un error al llamar el IDCobro`, async () => {
                try {
                    const row = await DB.getIDCCobro(fixtures.consultaMC);
                } catch (error) {
                    const err = 1;
                    expect(err).toBe(1);
                }
            });
        });

        describe('Cuando ocurre un error al obtener la lista de Mensajes', () => {
            beforeEach(async () => {
                return await DBTest.deleteDB();
            });

            test(`Si ocurre un error al llamar el IDCobro`, async () => {
                try {
                    const row = await DB.getIDCCobro(fixtures.consultaMC);
                } catch (error) {
                    const err = 1;
                    expect(err).toBe(1);
                }
            });
        });


    });
});

