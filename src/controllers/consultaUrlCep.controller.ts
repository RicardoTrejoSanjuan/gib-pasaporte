import { wrap } from 'async-middleware';
import { Request, Response, Router } from 'express';
import got from 'got';
import routes from '../../routes/routes.json';
// import HttpsProxyAgent from 'https-proxy-agent';
import { Logger, LColor } from 'logger-colors';
// import { mapear } from 'commons';
const router: Router = Router();
const logger = new Logger();

const separador = '----------------------------------------------------';

// La ruta depende de donde se monte este controller en server.ts, en
// este caso este controller está en /comprador, por lo tanto esta
// ruta está ligada a /comprador/consultaMensajesCobro
// Usando 'wrap' no tenemos que hacer try-catch para los métodos async
router.post("", wrap(async (req: Request, res: Response) => {
    try {
        logger.info('URL:' + routes.consultaUrlCep);

        const usuario = req.header('iv-user');
        const cookie = req.header('cookie');

        const response = await got.post(routes.consultaUrlCep, {
            body: req.body,
            headers: {
                'cookie': cookie,
                'iv-user': usuario,
            },
            rejectUnauthorized: false,
            agent: false,
            json: true,
        });

        logger.magenta('RESPONSE', true);
        logger.magenta(`STATUS: [${LColor.c_white}${response.statusCode}${LColor.c_magenta}]`, false);
        logger.magenta('');

        const respuesta = response.body;
        logger.magenta('BODY');
        logger.magenta(JSON.stringify(respuesta), false);

        res.status(200).send(respuesta);

        logger.info(separador);

    } catch (e) {
        throw new Error('Error al procesar respuesta: "' + e + '"');
    }
}));

// Export the express.Router() instance to be used by server.ts
export const ConsultaUrlCepController: Router = router;
