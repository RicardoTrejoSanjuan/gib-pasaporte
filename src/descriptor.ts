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
                isPublic: false,
            },
            {
                name: "Consulta historial mensajes de cobro",
                endpoint: '/comprador/consultaMensajesHistorial',
                method: 'POST',
                isPublic: false,
            },
            {
                name: "Consulta la URL para los recibos CEP de Banxico",
                endpoint: '/comprador/consultaUrlCep',
                method: 'POST',
            },
            {
                name: "Consulta los mensajes de cobro a través del IDC",
                endpoint: '/comprador/consultacobroIdc',
                method: 'POST',
            },
        ],
    });
}
