export const respuestaErrorBanxico = {
    edoPet: -1,
};

export const consultaMensajesCobroRequest = {
    informacionBeneficiario: {
        numeroCelular: '5512345678',
        digitoVerificador: 0,
    },
    informacionOrdenante: {
        numeroCelular: '5512345678',
        digitoVerificador: 0,
    },
    identificadorMensajeCobro: "string",
    cantidadRegistrosConsulta: 0,
    paginaConsulta: 0,
    hmac: "string",
};

export const consultaMCPorIdc = {
    idc: '275fb66dab',
};

export const responseOkIdc = {
    code: 200,
    message: "Ok",
    details: [
        {
            idc: "275fb66dab",
            concepto: "pago",
            referencia: 1234567,
            fhs: 1572562287299,
            monto: "12",
        },
    ],
};

export const consultaMensajesCobroRequestBanxico = {
    v: {
        nc: '5512345678',
        dv: 0,
    },
    c: {
        nc: '5512345678',
        dv: 0,
    },
    id: 'string',
    tpg: 0,
    npg: 0,
    hmac: 'string',
};

// Consulta Mensajes Historial

export const consultaMHistorialRequest = {
    fechafinal: "2019-10-10",
    fechainicial: "2019-10-03",
};

export const consultaMC = {
    fechafinal: "2019-10-10",
    fechainicial: "2019-09-03",
    cliente: '1000100101',
};

export const consultaMCVacio = {};

// Consulta CEP

export const cookie = "PD-S-SESSION-ID=1_zad1fk+DA5yfws" +
"R7ARYJlpAeHOQ9FYF0zNlTST+Tj5Y5/nEEfLY=_AAAAAAA=_N0OdW7" +
"z5BsHXNoBkGCv48JIYCwM=";

export const consultaCEPRequest = {
    fechaOperacion: 20190919,
    valorConsulta: "19232004077894",
    montoOperacion: 21.01,
    criterioConsulta: "T",
    claveSpeiBancoEmisorPago: 40132,
    claveSpeiBancoReceptorPago: 40997,
    numeroCuentaBeneficiario: "147152000001550399",
};

export const consultaCEPResponse = {
    cliente: "1001030999",
    fechafinal: "2019-10-10",
    fechainicial: "2019-09-03",
};
