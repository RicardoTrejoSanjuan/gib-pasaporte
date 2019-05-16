import { wrap } from 'async-middleware';
import { Request, Response, Router } from 'express';
import got from 'got';
import routes from '../../routes/routes.json';
import { mapear } from '../middlewares/Mapper';
const LoggerColors = require('logger-colors');
const router: Router = Router();
const logger = new LoggerColors();

const separador = '----------------------------------------------------';

// La ruta depende de donde se monte este controller en server.ts, en
// este caso este controller está en /comprador, por lo tanto esta
// ruta está ligada a /comprador/consultaMensajesCobro
// Usando 'wrap' no tenemos que hacer try-catch para los métodos async
router.post("/consultaMensajesCobro", wrap(async (req: Request, res: Response) => {

    const response = await got.post(routes.consultaEstadoOperacion, {
        body: "d=" + JSON.stringify(req.body),
        headers: {
            "Content-Type": "text/plain",
        },
    });

    logger.magenta('RESPONSE', true);
    logger.magenta(`STATUS: [${logger.c_white}${response.statusCode}${logger.c_magenta}]`, false);
    logger.magenta('');
    // logger.magenta('HEADERS BANXICO');
    // logger.magenta(JSON.stringify(response.headers, LoggerColors.smallJSON), false);
    // logger.magenta('');
    // logger.magenta('BODY BANXICO:');
    // logger.magenta(response.body);

    try {
        const respuesta = JSON.parse(response.body);
        const respuestaMapeada = mapear(respuesta, {
            info: 'info',
            listaMC: 'listaMensajesCobro',
            ultima: 'ultima',
            edoPet: 'estadoPeticion',
        });
        logger.magenta('BODY');
        logger.magenta(JSON.stringify(respuestaMapeada), false);

        res.status(200).send(respuestaMapeada);

        logger.info(separador);

    } catch (e) {
        throw new Error('Error al procesar respuesta: "' + response.body + '"');
    }
}));

// Export the express.Router() instance to be used by server.ts
export const ConsultaMensajeCobroController: Router = router;
