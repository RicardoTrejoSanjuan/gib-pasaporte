import bodyParser from 'body-parser';
import express from 'express';
import { GuardarExcelController } from './controllers';
import {
    Mapper,
    ErrorHandler,
    JSONSchema,
    LoggerRequest,
    LoggerRequestOptions,
    LDAPAttributesMiddleware,
} from 'commons';

import { descriptor } from './descriptor';

const app: express.Application = express();

app.get('/describe', descriptor);

// Middlewares Before controllers
app.use(bodyParser.json());

app.use('/guardarExcel', [
    // LoggerRequest(),
    // JSONSchema(schema), // Valida petición contra JSON Schema
    // Mapper(map),  // Mapea campos de petición a como se requiere por banxico
    GuardarExcelController, // Manda la petición a banxico
]);

// Error Handler
app.use(ErrorHandler());

export default app;
