import { wrap } from 'async-middleware';
import multer from 'multer';
import { Request, Response, Router } from 'express';
// import got from 'got';
// import routes from '../../routes/routes.json';
// import HttpsProxyAgent from 'https-proxy-agent';
import { Logger, LColor } from 'logger-colors';
import { mapear } from 'commons';
import { DB } from '../db/DBController';
const router: Router = Router();
const logger = new Logger();

const readXlsxFile = require('read-excel-file/node');

const storage = multer.diskStorage({ // multers disk storage settings
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        const datetimestamp = Date.now();
        // tslint:disable-next-line: max-line-length
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    },
});

const upload = multer({ // multer settings
    storage,
    fileFilter: (req, file, callback) => { // file filter
        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    },
}).single('file');




interface Records {
    lamina: string | number | null;
    libreta: string | number | null;
}
const records: Records[] = [];


const insertLamina = (lamina: any, libreta: any) => {
    records.push({lamina, libreta});
};

const insertLibreta = (lamina: any, libreta: any) => {
    records.push({lamina, libreta});
};

const LoopRecords = (start: any, end: any) => {
    const character = /^.*[a-zA-Z].*$/;
    const hasCharacter = character.exec(start);
    let letter: string = '';
    if (hasCharacter) {
        letter = start.charAt(0);
        start = start.slice(1);
        end = end.slice(1);
        // console.log(end);
    }

    for (let i = start; i <= end; i++) {
        if (letter !== '') {
            insertLibreta(null, letter + i);
        } else {
            insertLamina(i, null)
        }
    }
};


const generateSQL = (rows: []) => {
    rows.forEach((row: any[], index) => {
        if (index === 0) {
            return;
        }

        row.forEach((item: any, i) => {
            switch (i) {
                case 0: // Lamina
                    if (item) {
                        insertLamina(item, null);
                        // records.push({lamina: item, libreta: null});
                    }
                    break;
                case 1: // Libreta
                    if (item) {
                        insertLibreta(null, item);
                        // records.push({lamina: null, libreta: item});
                    }
                    break;
                case 2:
                    if (index === 1) { return; }
                    if (item === null) { return; }
                    LoopRecords(item, row[i + 1]);
                    // const character = /^.*[a-zA-Z].*$/;
                    // const hasCharacter = character.exec(item);
                    // if (hasCharacter) {
                    //     const letter = item.charAt(0);
                    //     const start = item.slice(1);
                    //     // console.log(start);
                    //     const end = row[i + 1].slice(1);
                    //     // console.log(end);
                    // } else {
                    //     // console.log(2);
                    //     // console.log(item);
                    // }
                        // console.log(item);
                        // console.log(row[i + 1]);
                        // return;
                        // for (let t = item; t <= row[i + 1]; t++) {
                        //     // const element = array[t];
                        //     // console.log(t);
                        // }
                    // }
                    break;
                case 3:
                    // console.log(item);
                break;
                default:
                    break;
            }
        });

        // let sql = 'INSERT INTO pasaportes (lamina, libreta) VALUES ?';
    });
    console.table(records);
};

const separador = '----------------------------------------------------';

// La ruta depende de donde se monte este controller en server.ts, en
// este caso este controller está en /controller, por lo tanto esta
// ruta está ligada a /guardarExcel
// Usando 'wrap' no tenemos que hacer try-catch para los métodos async
router.post("", wrap(async (req: Request, res: Response) => {
    upload(req, res, (err) => {
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }

        if (!req.file) {
            res.json({ error_code: 2, err_desc: "No se encontro archivo" });
            return;
        }

        if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] !== 'xlsx') {
            res.json({ error_code: 3, err_desc: "Extención incorrecta" });
            return;
        }

        logger.magenta('File');
        logger.magenta(req.file.path, false);



        // console.log(req.file.path);
        // console.log(req.file.originalname);
        readXlsxFile(req.file.path).then((rows: any) => {
            // console.log(rows);
            // `rows` is an array of rows
            // each row being an array of cells.
            generateSQL(rows);
        });

        res.json({ status : 0, desc: null, data: 'result' });
    });
    // try {
    //     // console.log(req);
    //     upload(req, res, (err) => {
    //         console.log('0');
    //         if (err) {
    //             console.log('1');
    //             res.json({
    //                 error_code: 1,
    //                 err_desc: err,
    //             });
    //             return;
    //         }
    //         if (!req.file) {
    //             console.log('2');
    //             res.json({ error_code: 1, err_desc: "No file passed" });
    //             return;
    //         }
    //         if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
    //             console.log('3');
    //             // exceltojson = xlsxtojson;
    //         } else {
    //             console.log('4');
    //             // exceltojson = xlstojson;
    //         }
    //         // res.json({ error_code: 0, err_desc: null });
    //     });
    //     // const body = req.body;
    //     // console.log(body);
    //     // console.log(req.file.path);
    //     // console.log(body.name);
    //     // body.cliente = req.ldapAttributes.cliente;


    //     // const listaCobro = await DB.getIDCCobro(body);
    //     // const listaPago = await DB.getIDCPago(body);
    //     const respuesta = {
    //         code: 200,
    //         message: 'Ok',
    //         details: {}, //listaCobro.concat(listaPago),
    //     };
    //     logger.magenta('BODY');
    //     logger.magenta(JSON.stringify(respuesta), false);
    //     res.status(200).send(respuesta);

    //     logger.info(separador);

    // } catch (e) {
    //     logger.error(e);
    //     res.status(400).send({
    //         code: 400,
    //         message: 'Error al procesar respuesta: "' + e + '"',
    //     });
    // }
}));

// Export the express.Router() instance to be used by server.ts
export const GuardarExcelController: Router = router;
