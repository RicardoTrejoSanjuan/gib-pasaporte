import { wrap } from 'async-middleware';
import { Request, Response, Router } from 'express';
import got from 'got';
import routes from '../../routes/routes.json';
import HttpsProxyAgent from 'https-proxy-agent';
import { Logger, LColor } from 'logger-colors';
import { mapear } from 'commons';
const router: Router = Router();
const logger = new Logger();

const separador = '----------------------------------------------------';

// La ruta depende de donde se monte este controller en server.ts, en
// este caso este controller está en /comprador, por lo tanto esta
// ruta está ligada a /comprador/consultaMensajesCobro
// Usando 'wrap' no tenemos que hacer try-catch para los métodos async
router.post("", wrap(async (req: Request, res: Response) => {
    const bodyBanxico = "d=" + JSON.stringify(req.body);
    logger.info('BanxicoRequest', true);
    logger.info('URL:' + routes.consultaEstadoOperacion);
    logger.info('BODY: ' + bodyBanxico);

    let agente;
    if (process.env.HTTPS_PROXY) {
        const proxy = process.env.HTTPS_PROXY as string;
        logger.info("proxy:" + proxy);
        agente = new HttpsProxyAgent(proxy);
    }

    const response = await got.post(routes.consultaEstadoOperacion, {
        body: bodyBanxico,
        headers: {
            "Content-Type": "text/plain",
        },
        agent: agente,
    });

    logger.magenta('RESPONSE', true);
    logger.magenta(`STATUS: [${LColor.c_white}${response.statusCode}${LColor.c_magenta}]`, false);
    logger.magenta('');

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
        logger.error(e);
        res.status(400).send({
            code: 400,
            message: 'Error al procesar respuesta: "' + e + '"',
        });
    }
}));

// Export the express.Router() instance to be used by server.ts
export const ConsultaMensajeCobroController: Router = router;
