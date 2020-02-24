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
                name: "Guarda Excel",
                endpoint: '/reportes/guardarExcel',
                method: 'POST',
                isPublic: false,
            },
            {
                name: "Consulta Pasaportes",
                endpoint: '/reportes/consultaPasaporte',
                method: 'POST',
                isPublic: false,
            },
        ],
    });
}
