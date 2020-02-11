# GIB Pasaportes

Este proyecto contiene el servicio de middleware codi-08-consultaMensajesCobroComprador que es la capa entre el front (app CoDi Multiva) y el servicio consultaEstadoOperacion de Banxico.

---
## Rutas

Este servicio expone 2 rutas:

* ### **<span style="color:skyblue">POST</span> /comprador/consultaMensajesCobro**
Apunta al servicio de Consulta de Mensajes de Cobro (comprador) de banxico, cuya definición puede encontrarse aquí:
https://multiva-codi.gitlab.io/banca-movil-schemas/#operation/codi-08-consultaMensajesCobroComprador

* ### **<span style="color:limegreen">GET</span>  /version**
Retorna la versión actual del servicio, con base en el package.json del mismo.

Ej de respuesta `(application/json)`:
```json
{
    "version":"1.0.0"
}
```

---
## Variables de entorno

Para correr de forma local el proyecto apuntando a qa:

```bash
export SERVICE_KEY="JWTMultiv@Gi8Key"
export DATASOURCE_URL="jdbc:postgresql://10.160.188.27:5432/base_central_operaciones_qa"
export DATASOURCE_USERNAME="biometricos"
export DATASOURCE_PASSWORD="Biometric0s#2019"
```

---
## Ejecución local
Para ejecutar este proyecto de forma inicial hay que ejecutar lo siguiente:

```bash
npm install
npm start
```

Esto ejecutará el proyecto por defecto en el puerto **8080**, a menos que se establezca la variable de entorno PORT con un puerto diferente.

Ej.
```
export PORT=8080
npm start
```

---

## Pruebas unitarias

Las pruebas unitarias estas creadas con las siguientes herramientas:

- Jest (Testing Framework by Facebook)
- nock (HTTP server mocking and expectations library for Node.js)
- supertest (HTTP assertions made easy via superagent)

Para ejecutar las pruebas unitarias:

```bash
npm test
```
Esto mostrará un reporte de coverage en la terminal, que es la descripción de que tanto código está realmente probado, también se muestra una versión más detallada del reporte en un HTML generado en la carpeta `coverage/lcov-report/index.html`
