import { wrap } from 'async-middleware';
import { Request, Response, Router } from 'express';
import { Logger } from 'logger-colors';

import { DB } from '../db/DBController';

const router: Router = Router();
const logger = new Logger();

const separador = '----------------------------------------------------';

// La ruta depende de donde se monte este controller en server.ts, en
// este caso este controller está en /controller, por lo tanto esta
// ruta está ligada a /guardarExcel
// Usando 'wrap' no tenemos que hacer try-catch para los métodos async
router.post("", wrap(async (req: Request, res: Response) => {
    // const body = req.body;
    // body.cliente = req.ldapAttributes.cliente;

    try {
        const listLaminas = await DB.getRecords(true);
        const listLibretas = await DB.getRecords(false);
        const respuesta = {
            error: null,
            result: {
                code: 200,
                message: 'Ok',
                data: {laminas: listLaminas, libretas: listLibretas},
            },
        };
        logger.magenta('BODY');
        logger.magenta(JSON.stringify(respuesta), false);
        res.status(200).send(respuesta);

        logger.info(separador);

    } catch (e) {
        logger.error(e);
        res.status(400).send({
            error: {
                code: 400,
                message: 'Error al procesar respuesta: "' + e + '"',
            },
            result: null,
        });
    }
}));

// Export the express.Router() instance to be used by server.ts
export const ConsultaPasaportesController: Router = router;
