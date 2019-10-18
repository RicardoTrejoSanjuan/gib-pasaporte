import http from 'http';
import nock from 'nock';
import supertest from 'supertest';
import packageJson from '../package.json';
import routes from '../routes/routes.json';
import app from '../src/app';
import * as fixtures from '../src/fixtures';


describe(`al ejecutar el servidor`, () => {

    let server: http.Server;
    let request: supertest.SuperTest<supertest.Test>;

    beforeAll((done) => {
        server = http.createServer(app);
        server.listen(done);
        request = supertest(server);
    });

    afterAll((done) => {
        server.close(done);
    });

    describe('Al ejecutar un GET /describe', () => {
        test(`Debería retornar un JSON con la descripción del servicio`, async () => {
            const response = await request
                .get('/describe');
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body.version).toEqual(packageJson.version);
        });
    });

    // Consulta Url Cep

    describe('al ejecutar un POST /comprador/consultaUrlCep', () => {
        describe(`Si la petición no cumple con la estructura`, () => {
            test(`Debería retornar un 400 con los errores detallados`, async () => {
                const response = await request
                    .post('/comprador/consultaUrlCep')
                    .send({
                        name: '33',
                    });
                expect(response.status).toBe(400);
                expect(response.body.code).toBe(-8);
                expect(response.body.errors).toBeInstanceOf(Array);
            });
        });


        describe(`al hacer una petición correcta`, () => {
            afterEach(() => {
                nock.cleanAll();
                nock.recorder.clear();
            });

            describe(`si el servicio de UrlCep reponse correctamente`, () => {
                let bodyRequestCEPConsulta: any;
                beforeEach(() => {
                    nock(routes.consultaUrlCep)
                    .filteringRequestBody((body) => {
                        bodyRequestCEPConsulta = body;
                        return '*';
                    })
                    .post('')
                    .reply(200, {
                        responseError: "",
                        responseStatus: 200,
                        url: "https://www.banxico.org.mx/cep/go?i=40132&s=20180809&d=fmvLAp9ICru0kWVRD6Tnd%2BF7zMEPrAwUMOST1Cc2gqe5ZiMm08%2Fmaj2BjNjlVAzoCDEhME9138EoO78En5c7dQ%3D%3D",
                    });
                });

                test(`Debería retornar un 204`, async () => {
                    const response = await request
                        .post('/comprador/consultaUrlCep')
                        .set('iv-user', '1000100101')
                        .set('cookie', fixtures.cookie)
                        .send(fixtures.consultaCEPRequest);
                    expect(response.header['content-type']).toContain('application/json');
                    expect(response.status).toBe(200);
                });
            });

            describe(`si el servicio de UrlCep NO reponse correctamente`, () => {
                let bodyRequestCEPConsulta: any;
                beforeEach(() => {
                    nock(routes.consultaUrlCep)
                    .filteringRequestBody((body) => {
                        bodyRequestCEPConsulta = body;
                        return '*';
                    })
                    .post('')
                    .reply(400, {
                        responseError: "",
                        responseStatus: 200,
                        url: "https://www.banxico.org.mx/cep/go?i=40132&s=20180809&d=fmvLAp9ICru0kWVRD6Tnd%2BF7zMEPrAwUMOST1Cc2gqe5ZiMm08%2Fmaj2BjNjlVAzoCDEhME9138EoO78En5c7dQ%3D%3D",
                    });
                });

                test(`Debería retornar un 400`, async () => {
                    const response = await request
                        .post('/comprador/consultaUrlCep')
                        .set('iv-user', '1000100101')
                        .set('cookie', fixtures.cookie)
                        .send(fixtures.consultaCEPRequest);
                    expect(response.header['content-type']).toContain('application/json');
                    expect(response.status).toBe(400);
                });
            });
        });
    });

});
