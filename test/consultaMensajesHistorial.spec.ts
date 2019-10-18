import http from 'http';
import nock from 'nock';
import supertest from 'supertest';
import packageJson from '../package.json';
import routes from '../routes/routes.json';
import app from '../src/app';
import * as fixtures from '../src/fixtures';
import { DBTest } from './db';

describe(`al ejecutar el servidor`, () => {

    let server: http.Server;
    let request: supertest.SuperTest<supertest.Test>;

    beforeAll((done) => {
        // console.dir(process.env);
        server = http.createServer(app);
        server.listen(done);
        request = supertest(server);
    });

    afterAll((done) => {
        server.close(done);
    });

    beforeEach(() => {
        //   Se agregan las variables de entorno en cada una de las pruebas
        // process.env.POSTGRES_USER = 'admin';
        // process.env.POSTGRES_HOST = '10.160.121.82';
        // process.env.POSTGRES_PORT = '5434';
        // process.env.POSTGRES_DB = 'pruebas';
        // process.env.POSTGRES_PASSWORD = 'admin123';
    });

    describe('al ejecutar un POST /comprador/consultaMensajesHistorial', () => {

        beforeAll(() => {
            // return DBTest.deleteDB();
        });

        describe(`Si la petición no cumple con la estructura`, () => {
            test(`Debería retornar un 400 con los errores detallados`, async () => {
                const response = await request
                    .post('/comprador/consultaMensajesHistorial')
                    .send({
                        name: '33',
                    });
                expect(response.status).toBe(400);
                expect(response.body.code).toBe(-3);
                expect(response.body.errors).toBeInstanceOf(Array);
            });
        });

        describe(`al hacer una petición correcta`, () => {

            beforeEach(async () => {
                return await DBTest.createDB();
            });

            afterEach(async () => {
                // return await DBTest.deleteDB();
            });

            describe(`si el servicio de Consulta Mensaje Historial reponse correctamente`, () => {
                test(`Debería retornar un 200`, async () => {
                    const response = await request
                        .post('/comprador/consultaMensajesHistorial')
                        .set('iv-user', '1000100101')
                        .set('cookie', fixtures.cookie)
                        .send(fixtures.consultaMHistorialRequest);
                    // expect(response.header['content-type']).toContain('application/json');
                    // console.log('response :', response);
                    expect(response.status).toBe(200);
                    expect(response.body.code).toBe(200);
                    // console.log('response :', response.body);
                });
            });

            describe(`si el servicio de Consulta Mensaje Historial reponse correctamente`, () => {
                beforeEach(async () => {
                    return await DBTest.deleteDB();
                });
                test(`Debería retornar un 400`, async () => {
                    const response = await request
                        .post('/comprador/consultaMensajesHistorial')
                        .set('iv-user', '1000100101')
                        .set('cookie', fixtures.cookie)
                        .send(fixtures.consultaMHistorialRequest);
                    expect(response.status).toBe(400);
                    expect(response.body.code).toBe(400);
                });
            });
        });
    });

});
