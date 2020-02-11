import { wrap } from 'async-middleware';
import { Request, Response, Router } from 'express';
import { Logger } from 'logger-colors';

import { DB } from '../db/DBController';

import { upload } from '../bll/getExcel';
import { generateSQL } from '../bll/generateSQL';

const readXlsxFile = require('read-excel-file/node');
const router: Router = Router();
const logger = new Logger();

const separador = '----------------------------------------------------';

// La ruta depende de donde se monte este controller en server.ts, en
// este caso este controller está en /controller, por lo tanto esta
// ruta está ligada a /guardarExcel
// Usando 'wrap' no tenemos que hacer try-catch para los métodos async
router.post("", wrap(async (req: Request, res: Response) => {
    try {
        let sql: any;
        upload(req, res, (err) => {
            if (err) {
                logger.error(JSON.stringify({ error_code: 1, err_desc: err }), false);
                res.json({ error_code: 1, err_desc: err });
                return;
            }

            if (!req.file) {
                logger.error(JSON.stringify({ error_code: 2, err_desc: "No se encontro archivo" }), false);
                res.json({ error_code: 2, err_desc: "No se encontro archivo" });
                return;
            }

            logger.magenta('FILE UPLOAD: ');
            logger.magenta(req.file.originalname, false);


            readXlsxFile(req.file.path).then(async (rows: any) => {
                sql = await generateSQL(rows);
                const lamina: any = {};
                const libreta: any = {};
                const resultLamina = await DB.insert(sql.lamina, true);

                lamina.total = (sql.lamina.length);
                lamina.insertados = (resultLamina.filter((item) => item.status === 1)).length;
                lamina.existentes = (resultLamina.filter((item) => item.status === -1)).length;
                lamina.error = resultLamina.filter((item) => item.status === -2);

                logger.magenta('Registros Lamina', true);
                logger.magenta(`Total : ${lamina.total}`, false);
                logger.success(`Insertados: ${lamina.insertados}`, false);
                logger.warn(`Existentes: ${lamina.existentes}`, false);
                logger.error(`Error: ${lamina.error.length}`, false);
                if (lamina.error.length) {
                    console.table(lamina.error);
                }

                const resultLibreta = await DB.insert(sql.libreta, false);

                libreta.total = (sql.libreta.length);
                libreta.insertados = (resultLibreta.filter((item) => item.status === 1)).length;
                libreta.existentes = (resultLibreta.filter((item) => item.status === -1)).length;
                libreta.error = resultLibreta.filter((item) => item.status === -2);

                logger.magenta('Registros Libreta', true);
                logger.magenta(`Total : ${libreta.total}`, false);
                logger.success(`Insertados: ${libreta.insertados}`, false);
                logger.warn(`Existentes: ${libreta.existentes}`, false);
                logger.error(`Error: ${libreta.error.length}`, false);
                if (libreta.error.length) {
                    console.table(libreta.error);
                }

                res.json({ status : 200, data: {lamina, libreta} });
            });
        });

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
export const GuardarExcelController: Router = router;
