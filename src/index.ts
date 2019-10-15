import app from './app';
import { Logger } from 'logger-colors';
import packageJson from '../package.json';
import {art} from 'commons';
const logger = new Logger();
const port: number = Number(process.env.PORT) || 8080;

app.listen(port, () => {
    logger.success(art);
    logger.success(`${packageJson.name} v${packageJson.version}`);
    logger.success("Servicio ejecutado exitosamente");
    logger.success(`Escuchando en el puerto ${port}`);
});
