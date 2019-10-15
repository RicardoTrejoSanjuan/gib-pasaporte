import http from 'http';
import nock from 'nock';
import supertest from 'supertest';
import packageJson from '../../package.json';
import routes from '../../routes/routes.json';
import app from '../app';
import * as fixtures from '../fixtures';
import { consultaMensajesCobroRequest } from '../fixtures';


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

    describe('al ejecutar un POST /comprador/consultaMensajesCobro', () => {
        describe(`Si la petición no cumple con la estructura`, () => {
            test(`Debería retornar un 400 con los errores detallados`, async () => {
                const response = await request
                    .post('/comprador/consultaMensajesCobro')
                    .send({
                        name: '33',
                    });
                expect(response.status).toBe(400);
                // expect(response.body.code).toBe(-6);
                expect(response.body.errors).toBeInstanceOf(Array);
            });
        });


        describe(`al hacer una petición correcta`, () => {
            afterEach(() => {
                nock.cleanAll();
                nock.recorder.clear();
            });

            test(`si el servicio de banxico responde correctamente`, async () => {
                let bodyRequestBanxico: string = '';
                let contentTypeRequestBanxico: string = '';
                nock(routes.consultaEstadoOperacion)
                    .filteringRequestBody((body) => {
                        // Obtenemos el body hacia banxico
                        bodyRequestBanxico = body;
                        return '*';
                    })
                    .matchHeader('content-type', (val) => {
                        // Obtenemos el contentType enviado hacia banxico
                        contentTypeRequestBanxico = val;
                        return true;
                    })
                    .post('')
                    .reply(200, {
                        info: {
                            // tslint:disable-next-line:max-line-length
                            listaMC: "95d461616d96ebef6b545152a2ef6f4d4ad6932756f3aa715650d09a1847e171a5ebac4fc5d870f223db8566f939122882fb8eaf5115c54c837035661d75c403eedba37c9a1c59c622a1a9890f025c7479ba2e87fb37573c29c4bd7a7c364220674175fe78b01167ecdba8a4985af6826e40bb0849eb6fa1ceab7433f77a1d769311307cb1a16f0506f5b238369747cac699dc0692a4642d674bbb7078772fed82fda92636c054ed100fb564cd151701127f743cf19e4fdd9bf293286f530429e827deeaeaff17e736abbd43ff94a01bdd04731ba6ebe15f691fa82c365bc9a1",
                            ultima: true,
                        },
                        edoPet: 0,
                    });

                const response = await request
                    .post('/comprador/consultaMensajesCobro')
                    .send(fixtures.consultaMensajesCobroRequest);

                // El body que va hacia el servicio de Banxico debe ser text/plain con
                // una d= al inicio del json, en string el body
                expect(bodyRequestBanxico).toEqual('d=' + JSON.stringify(fixtures.consultaMensajesCobroRequestBanxico));
                expect(contentTypeRequestBanxico).toBe('text/plain');

                // Si todo es correcto Banxico retorna un 200
                // console.log("response:", response.header['content-type']);
                expect(response.header['content-type']).toContain('application/json');
                expect(response.status).toBe(200);
                // Debería de mapear la respuesta del servicio de banxico
                expect(response.body).toEqual({
                    info: {
                        // tslint:disable-next-line:max-line-length
                        listaMensajesCobro: "95d461616d96ebef6b545152a2ef6f4d4ad6932756f3aa715650d09a1847e171a5ebac4fc5d870f223db8566f939122882fb8eaf5115c54c837035661d75c403eedba37c9a1c59c622a1a9890f025c7479ba2e87fb37573c29c4bd7a7c364220674175fe78b01167ecdba8a4985af6826e40bb0849eb6fa1ceab7433f77a1d769311307cb1a16f0506f5b238369747cac699dc0692a4642d674bbb7078772fed82fda92636c054ed100fb564cd151701127f743cf19e4fdd9bf293286f530429e827deeaeaff17e736abbd43ff94a01bdd04731ba6ebe15f691fa82c365bc9a1",
                        ultima: true,
                    },
                    estadoPeticion: 0,
                });
            });


            test(`si el servicio de banxico no responde json`, async () => {
                nock(routes.consultaEstadoOperacion)
                    .post('')
                    .reply(200, 'error banxico string');

                const response = await request
                    .post('/comprador/consultaMensajesCobro')
                    .send(fixtures.consultaMensajesCobroRequest);

                // Este servicio si debe responder con JSON
                expect(response.header['content-type']).toContain('application/json');
                // Status 503 para indicar que hay error en Banxico
                expect(response.status).toBe(400);
                // expect(response.body.code).toEqual(-1);
                expect(response.body.message).toContain('Error al procesar respuesta');
                expect(response.body.message).toContain('error banxico string');
            });



            test(`si el servicio de banxico responde error`, async () => {
                process.env.HTTPS_PROXY = 'http://127.0.0.1:9080';
                nock(routes.consultaEstadoOperacion)
                    .post('')
                    .reply(404, fixtures.respuestaErrorBanxico);

                const response = await request
                    .post('/comprador/consultaMensajesCobro')
                    .send(fixtures.consultaMensajesCobroRequest);
                expect(response.status).toBe(400);
                // expect(response.body.code).toBe(-404);
                expect(response.body.details)
                    .toBe(JSON.stringify(fixtures.respuestaErrorBanxico));
            });
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
                // expect(response.body.code).toBe(-5);
                expect(response.body.errors).toBeInstanceOf(Array);
            });
        });


        describe(`al hacer una petición correcta`, () => {
            afterEach(() => {
                nock.cleanAll();
                nock.recorder.clear();
            });

            test(`si el servicio de UrlCep reponse correctamente`, async () => {
                nock(routes.consultaUrlCep)
                    .post('')
                    .reply(200, {
                        hola: '2222',
                    });

                const response = await request
                    .post('/comprador/consultaUrlCep')
                    .send(fixtures.consultaMensajesCobroRequest);
                expect(response.status).toBe(200);
            });

            test(`si el servicio de UrlCep no responde a un json`, async () => {
                nock(routes.consultaUrlCep)
                    .post('')
                    .reply(200, '.```---');

                const response = await request
                    .post('/comprador/consultaUrlCep')
                    .send(fixtures.consultaMensajesCobroRequest);
                expect(response.status).toBe(400);
                expect(response.body).toBe(400);
            });
        });
    });

});
