import bodyParser from 'body-parser';
import express from 'express';
import { GuardarExcelController, ConsultaPasaportesController, BuscarPasaportesController } from './controllers';
import {
    ErrorHandler,
    LoggerRequest,
} from 'commons';

import { descriptor } from './descriptor';

const app: express.Application = express();

app.get('/describe', descriptor);

app.use('/reportes/guardarExcel', [
    GuardarExcelController,
]);

// Middlewares Before controllers
app.use(bodyParser.json());

app.use('/reportes/consultaPasaporte', [
    LoggerRequest(),
    ConsultaPasaportesController,
]);

app.use('/reportes/buscarPasaporte', [
    LoggerRequest(),
    BuscarPasaportesController,
]);

// Error Handler
app.use(ErrorHandler());

export default app;
