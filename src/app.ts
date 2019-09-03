import bodyParser from 'body-parser';
import express from 'express';
import { ConsultaMensajeCobroController, ConsultaHistorialController } from './controllers';
import {
    Mapper,
    ErrorHandler,
    JSONSchema,
    LoggerRequest,
    LoggerRequestOptions,
} from 'commons';

// import { ErrorHandler } from './middlewares/ErrorHandler';
// import { JSONSchema } from './middlewares/JSONSchemaValidator';
// import { LoggerRequest } from './middlewares/LoggerRequest';
// // import { requests } from 'banca-movil-schemas/schemas';
// import { Mapper } from './middlewares/Mapper';

import { descriptor } from './descriptor';
import { requests } from 'banca-movil-schemas';

// const schemas = require('banca-movil-schemas/schemas');
const app: express.Application = express();

app.get('/describe', descriptor);

// Middlewares Before controllers
app.use(bodyParser.json());

const map = {
    informacionBeneficiario: 'v',
    informacionOrdenante: 'c',
    numeroCelular: 'nc',
    digitoVerificador: 'dv',
    identificadorMensajeCobro: 'id',
    cantidadRegistrosConsulta: 'tpg',
    paginaConsulta: 'npg',
    hmac: 'hmac',
};

const logRequestOptions: LoggerRequestOptions = {
    smallJsonOptions: {
        protectKeys: [
        ],
    },
};

const schema = requests.consultaMensajesCobroRequest;
app.use('/comprador/consultaMensajesCobro', [
    LoggerRequest(logRequestOptions),
    JSONSchema(schema), // Valida petición contra JSON Schema
    Mapper(map),  // Mapea campos de petición a como se requiere por banxico
    ConsultaMensajeCobroController, // Manda la petición a banxico
]);

const schema2 = requests.consultaMensajesHistorialRequest;
app.use('/comprador/consultaMensajesHistorial', [
    LoggerRequest(),
    JSONSchema(schema2), // Valida petición contra JSON Schema
    ConsultaHistorialController, // Manda la petición a banxico
]);

// Error Handler
app.use(ErrorHandler());

export default app;
