import { DBTest } from './db';
import * as fixtures from '../src/fixtures';
import { DB } from '../src/db/DBController';


describe('Crear la BD', () => {
    describe("Si la conexión es correcta, ", () => {
        beforeAll(() => {
            // process.env.POSTGRES_USER = 'admin';
            // process.env.POSTGRES_HOST = 'localhost';
            // process.env.POSTGRES_PORT = '5432';
            // process.env.POSTGRES_DB = 'test';
            // process.env.POSTGRES_PASSWORD = 'admin123';
            process.env.KEY_LUNA_CRYPTOGRAPHY = 'CODIDEV_AES256_KEY';
            process.env.RUTA_LUNA_CRYPTOGRAPHY = 'http://10.160.4.105:8080/luna-cryptography/ConectaCryptography?wsdl';
        });

        beforeEach(() => {
            return DBTest.createDB();
        });

        afterAll(() => {
            return DBTest.deleteDB();
        });

        xdescribe('Cuando se obtiene lista de Mensajes', () => {
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
            xtest(`Si se obtiene correctamente el IDCPago sin fechas`, async () => {
                const row = await DB.getIDCPago(fixtures.consultaMCVacio);
                expect(row).toBeDefined();
                expect(row.length).toBe(2);
            });

            xtest(`Si se obtiene correctamente el IDCobro sin fechas`, async () => {
                const row = await DB.getIDCCobro(fixtures.consultaMCVacio);
                expect(row).toBeDefined();
                expect(row.length).toBe(2);
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
            // beforeEach(async () => {
            //     return await DBTest.deleteDB();
            // });

            test(`Si ocurre un error al llamar el IDCobro`, async () => {
                try {
                    const row = await DB.getIDCCobro(fixtures.consultaMC);
                } catch (error) {
                    const err = 1;
                    expect(err).toBe(1);
                }
            });
        });

        describe('Al consultar el mensaje por IDC', () => {
            describe(`Si se obtiene correctamente la informacion`, () => {
                test('debería devlver un registro', async () => {
                    const row = await DB.getInfoCobroIDC(fixtures.consultaMCPorIdc);
                    expect(row).toBeDefined();
                    expect(row.length).toBe(1);
                });
            });

            describe('Si no existe registro con ese IDC', () => {
                test(`debería devolver el detalle vacío.`, async () => {
                    const row = await DB.getInfoCobroIDC({idc: '12312'});
                    expect(row).toBeDefined();
                    expect(row.length).toBe(0);
                });
            });

            describe('Si ocurre algún error en la consulta, ', () => {
                test(`devolver un error.`, async () => {
                    try {
                        const row = await DB.getInfoCobroIDC({idc: "'123123123'"});
                    } catch (e) {
                        expect(e.toString()).toContain('Error en la operacion sql');
                    }
                });
            });
            
            describe('Si ocurre algún error al descifrar la información', () => {
                test(`debería devolver un error.`, async () => {
                    try {
                        const row = await DB.getInfoCobroIDC({idc: '27610062d7'});
                    } catch (e) {
                        expect(e.toString()).toContain('Error en la operacion sql');
                    }
                });
            });
        });


    });
});

