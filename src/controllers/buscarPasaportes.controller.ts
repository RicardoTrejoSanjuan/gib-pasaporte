import { wrap } from 'async-middleware';
import { Request, Response, Router } from 'express';
import { Logger, LColor } from 'logger-colors';

import { DB } from '../db/DBController';

const router: Router = Router();
const logger = new Logger();

const separador = '----------------------------------------------------';

// La ruta depende de donde se monte este controller en server.ts, en
// este caso este controller está en /controller, por lo tanto esta
// ruta está ligada a /guardarExcel
// Usando 'wrap' no tenemos que hacer try-catch para los métodos async
router.post("", wrap(async (req: Request, res: Response) => {
    const idsPasaporte = req.body.ids;

    try {
        const listLaminas = await DB.findRecords(idsPasaporte, true);
        const listLibretas = await DB.findRecords(idsPasaporte, false);

        const total = listLaminas.length + listLibretas.length;
        logger.cyan(`Registros encontrado: ${LColor.c_gray}${JSON.stringify(total)}${LColor.c_gray}`, false);
        const respuesta = {
            error: null,
            result: {
                code: 200,
                message: 'Ok',
                data: {
                    laminas: listLaminas,
                    libretas: listLibretas,
                },
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
export const BuscarPasaportesController: Router = router;
