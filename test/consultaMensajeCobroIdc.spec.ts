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

        process.env.POSTGRES_USER = 'admin';
        process.env.POSTGRES_HOST = 'localhost';
        process.env.POSTGRES_PORT = '5432';
        process.env.POSTGRES_DB = 'test';
        process.env.POSTGRES_PASSWORD = 'admin123';
        process.env.KEY_LUNA_CRYPTOGRAPHY = 'CODIDEV_AES256_KEY';
        process.env.RUTA_LUNA_CRYPTOGRAPHY = 'http://10.160.4.105:8080/luna-cryptography/ConectaCryptography?wsdl';
    });

    afterAll((done) => {
        server.close(done);
    });

    beforeEach(() => {
        return DBTest.createDB();
        //   Se agregan las variables de entorno en cada una de las pruebas
        // process.env.POSTGRES_USER = 'admin';
        // process.env.POSTGRES_HOST = '10.160.121.82';
        // process.env.POSTGRES_PORT = '5434';
        // process.env.POSTGRES_DB = 'pruebas';
        // process.env.POSTGRES_PASSWORD = 'admin123';
    });

    afterEach(() => {
        return DBTest.deleteDB();
    });
    describe('al ejecutar un POST /comprador/consultacobroIdc', () => {
        describe(`Si la petición no cumple con la estructura`, () => {
            test(`Debería retornar un 400 con los errores detallados`, async () => {
                const response = await request
                    .post('/comprador/consultacobroIdc')
                    .send({
                        name: '33',
                    });
                expect(response.status).toBe(400);
                expect(response.body.message).toBe('La petición no cumple con la estructura definida');
            });
        });

        describe(`al hacer una petición correcta`, () => {
            describe(`si el servicio de Consulta Mensaje por IDC reponde correctamente`, () => {
                test(`Debería retornar un 200`, async () => {
                    const response = await request
                        .post('/comprador/consultacobroIdc')
                        .send(fixtures.consultaMCPorIdc);
                    // expect(response.header['content-type']).toContain('application/json');
                    // console.log('response :', response);
                    expect(response.status).toBe(200);
                    expect(response.body.code).toBe(200);
                    expect(response.body.details.length).toBe(1);
                    // console.log('response :', response.body);
                });
            });

            describe(`si no existe el registro en el servicio de Consulta Mensaje por IDC`, () => {
                test(`Debería retornar el detalle vacio`, async () => {
                    const response = await request
                        .post('/comprador/consultacobroIdc')
                        .send({idc: '123123123'});
                    expect(response.status).toBe(200);
                    expect(response.body.details.length).toBe(0);
                });
            });
            
            describe(`Si ocurre un error en la Base de datos`, () => {
                test(`Debería retornar un error`, async () => {
                    const response = await request
                        .post('/comprador/consultacobroIdc')
                        .send({idc: "'123123123'"});
                    expect(response.status).toBe(400);
                    expect(response.body.message).toContain('Error en la operacion sql');
                });
            });
        });
    });
});
