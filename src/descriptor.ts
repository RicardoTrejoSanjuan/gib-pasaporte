// Este archivo describe
// las apis implementadas en este servicio
// para que puedan ser configuradas automáticamente por
// el api gateway
import packageJson from '../package.json';

export function descriptor(req: any, res: any) {
    res.json({
        service: packageJson.name,
        version: packageJson.version,
        apis: [
            {
                name: "Consulta mensajes de cobro",
                endpoint: '/comprador/consultaMensajesCobro',
                method: 'POST',
            },
            {
                name: "Consulta historial mensajes de cobro",
                endpoint: '/comprador/consultaMensajesHistorial',
                method: 'POST',
            },
            {
                name: "Consulta la URL para los recibos CEP de Banxico",
                endpoint: '/comprador/consultaUrlCep',
                method: 'POST',
            },
        ],
    });
}
