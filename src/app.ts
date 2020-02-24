import bodyParser from 'body-parser';
import express from 'express';
import { GuardarExcelController, ConsultaPasaportesController } from './controllers';
import {
    ErrorHandler,
    LoggerRequest,
} from 'commons';

import { descriptor } from './descriptor';

const app: express.Application = express();

app.get('/describe', descriptor);

app.use('/reportes/guardarExcel', [
    // // LoggerRequest(),
    GuardarExcelController, // Manda la petición a banxico
]);

// Middlewares Before controllers
app.use(bodyParser.json());

app.use('/reportes/consultaPasaporte', [
    LoggerRequest(),
    ConsultaPasaportesController, // Manda la petición a banxico
]);

// Error Handler
app.use(ErrorHandler());

export default app;
