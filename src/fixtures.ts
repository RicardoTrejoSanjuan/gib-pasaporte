export const respuestaErrorBanxico = {
    edoPet: -1,
};

export const consultaMensajesCobroRequest = {
    informacionBeneficiario: {
        numeroCelular: 9,
        digitoVerificador: 0,
    },
    informacionOrdenante: {
        numeroCelular: 9,
        digitoVerificador: 0,
    },
    identificadorMensajeCobro: "string",
    cantidadRegistrosConsulta: 0,
    paginaConsulta: 0,
    hmac: "string",
};

export const consultaMensajesCobroRequestBanxico = {
    v: {
        nc: 9,
        dv: 0,
    },
    c: {
        nc: 9,
        dv: 0,
    },
    id: 'string',
    tpg: 0,
    npg: 0,
    hmac: 'string',
};
