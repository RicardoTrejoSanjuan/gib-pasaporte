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


export const consultaIDCPago = {
    fechafinal: "2019-10-10",
    fechainicial: "2019-10-03",
    cliente: '1001036515',
};


export const consltaIDCobro = {
    fechafinal: "2019-10-10",
    fechainicial: "2019-09-03",
    cliente: '1001030999',
};
