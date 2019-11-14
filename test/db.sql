

CREATE SCHEMA public;

CREATE TABLE public.codi_tipo_operacion (
	id_tipo_operacion int4 NOT NULL,
	tipo_operacion varchar(250) NULL,
	CONSTRAINT pk_codi_tipo_operacion PRIMARY KEY (id_tipo_operacion)
);

ALTER TABLE public.codi_tipo_operacion OWNER TO admin;

INSERT INTO public.codi_tipo_operacion (id_tipo_operacion, tipo_operacion) VALUES (1, 'Cobro');
INSERT INTO public.codi_tipo_operacion (id_tipo_operacion, tipo_operacion) VALUES (2, 'Pago');

CREATE TABLE public.codi_mc_generados (
	cve_entidad varchar(20) NOT NULL,
	id_empresa numeric(10) NOT NULL,
	id_mensaje_cobro varchar(10) NOT NULL,
	fecha_hora_solicitud timestamp NULL,
	monto text NULL,
	concepto_pago text NULL,
	referencia_numerica int4 NULL,
	numero_celular_vendedor text NULL,
	digito_verificador_vendedor text NULL,
	nombre_vendedor text NULL,
	id_tipo_cuenta_vendedor text NULL,
	numero_cuenta_vendedor text NULL,
	id_institucion_vendedor text NULL,
	id_cliente numeric(10) NULL,
	hmac text NULL
);

ALTER TABLE public.codi_mc_generados OWNER TO admin;

INSERT INTO public.codi_mc_generados
(cve_entidad, id_empresa, id_mensaje_cobro, fecha_hora_solicitud, monto, concepto_pago, referencia_numerica, numero_celular_vendedor, digito_verificador_vendedor, nombre_vendedor, id_tipo_cuenta_vendedor, numero_cuenta_vendedor, id_institucion_vendedor, id_cliente, hmac)
VALUES('BMULTIVA', 1, '275fb66dab', '2019-10-31 22:51:27.299', '7CA4FD363383E98B220256D4253E2B32', 'EEFF9593C027160BBA1790BE3076DD2F', 1234567, '52D6BAA9A674D50E1B8ACFC33D34FEDD14EB07560874DCDD55AAF13279625825', '0221B14A70E457989C2145029E846847', '84E70E285F36AE826B0D2770BC2C0D1AE56A25FA75B0C81EF13955239DE7274F97B6AEDBE73F36B01F78B1F4E76D2512ECA66C8EC200C0C326563EEB077A0C8D', '92A571EF85C8ABB276CD07781C3E66B9', 'DC4EFE2B992AA43D0DF1ACDFCFFCAE3D284B140931E8FC30147647A4E1ADE221', 'AC326478D1DF235321FB96D782D589E1', 1001013699, NULL);
INSERT INTO public.codi_mc_generados
(cve_entidad, id_empresa, id_mensaje_cobro, fecha_hora_solicitud, monto, concepto_pago, referencia_numerica, numero_celular_vendedor, digito_verificador_vendedor, nombre_vendedor, id_tipo_cuenta_vendedor, numero_cuenta_vendedor, id_institucion_vendedor, id_cliente, hmac)
VALUES('BMULTIVA', 1, '27610062d7', '2019-11-01 00:03:05.727', 'aasdadqw', 'EEFF9593C027160BBA1790BE3076DD2F', 1234868, '52D6BAA9A674D50E1B8ACFC33D34FEDD14EB07560874DCDD55AAF13279625825', '0221B14A70E457989C2145029E846847', '84E70E285F36AE826B0D2770BC2C0D1AE56A25FA75B0C81EF13955239DE7274F97B6AEDBE73F36B01F78B1F4E76D2512ECA66C8EC200C0C326563EEB077A0C8D', '92A571EF85C8ABB276CD07781C3E66B9', 'DC4EFE2B992AA43D0DF1ACDFCFFCAE3D284B140931E8FC30147647A4E1ADE221', 'AC326478D1DF235321FB96D782D589E1', 1001013699, NULL);


CREATE TABLE public.codi_operaciones (
	cve_entidad varchar(20) NOT NULL,
	id_empresa numeric(10) NOT NULL,
	id_mensaje_cobro varchar(20) NOT NULL,
	fecha_hora_solicitud timestamp NULL,
	fecha_hora_procesamiento timestamp NULL,
	fecha_hora_limite timestamp NULL,
	monto text NULL,
	concepto_pago text NULL,
	cve_rastreo text NULL,
	referencia_numerica int4 NULL,
	numero_celular_comprador text NULL,
	digito_verificador_comprador text NULL,
	nombre_comprador text NULL,
	id_tipo_cuenta_comprador text NULL,
	numero_cuenta_comprador text NULL,
	id_institucion_comprador text NULL,
	numero_celular_vendedor text NULL,
	digito_verificador_vendedor text NULL,
	nombre_vendedor text NULL,
	id_tipo_cuenta_vendedor text NULL,
	numero_cuenta_vendedor text NULL,
	id_institucion_vendedor text NULL,
	id_tipo_operacion int4 NULL,
	id_tipo_pago int4 NULL,
	comision_transferencia int4 NULL,
	estado_aviso_mc int4 NULL,
	id_cliente numeric(10) NOT NULL,
	hmac varchar NULL
);


ALTER TABLE public.codi_operaciones OWNER TO admin;

INSERT INTO public.codi_operaciones
(cve_entidad, id_empresa, id_mensaje_cobro, fecha_hora_solicitud, fecha_hora_procesamiento, fecha_hora_limite, monto, concepto_pago, cve_rastreo, referencia_numerica, numero_celular_comprador, digito_verificador_comprador, nombre_comprador, id_tipo_cuenta_comprador, numero_cuenta_comprador, id_institucion_comprador, numero_celular_vendedor, digito_verificador_vendedor, nombre_vendedor, id_tipo_cuenta_vendedor, numero_cuenta_vendedor, id_institucion_vendedor, id_tipo_operacion, id_tipo_pago, comision_transferencia, estado_aviso_mc, id_cliente, hmac)
VALUES('BMULTIVA', 1, '275fb66dab275fb6a041', '2019-10-31 22:51:27.299', NULL, '2019-10-31 16:53:02.992', '7CA4FD363383E98B220256D4253E2B32', 'EEFF9593C027160BBA1790BE3076DD2F', NULL, 1234567, '31EB2D7DA02CEEA22D580461B8E79FE7A45D32A49326C120FD5E232286325462', 'D53DCD922BCE857DE8315267F64853B6', 'A92E99DE1D0A339BE48818B700725A74B8001EB0822C5969919E75A7D53D129E', NULL, NULL, NULL, '52D6BAA9A674D50E1B8ACFC33D34FEDD14EB07560874DCDD55AAF13279625825', '0221B14A70E457989C2145029E846847', '84E70E285F36AE826B0D2770BC2C0D1AE56A25FA75B0C81EF13955239DE7274F97B6AEDBE73F36B01F78B1F4E76D2512ECA66C8EC200C0C326563EEB077A0C8D', '92A571EF85C8ABB276CD07781C3E66B9', 'DC4EFE2B992AA43D0DF1ACDFCFFCAE3D284B140931E8FC30147647A4E1ADE221', 'AC326478D1DF235321FB96D782D589E1', 2, 19, 1, NULL, 1000253899, NULL);
INSERT INTO public.codi_operaciones
(cve_entidad, id_empresa, id_mensaje_cobro, fecha_hora_solicitud, fecha_hora_procesamiento, fecha_hora_limite, monto, concepto_pago, cve_rastreo, referencia_numerica, numero_celular_comprador, digito_verificador_comprador, nombre_comprador, id_tipo_cuenta_comprador, numero_cuenta_comprador, id_institucion_comprador, numero_celular_vendedor, digito_verificador_vendedor, nombre_vendedor, id_tipo_cuenta_vendedor, numero_cuenta_vendedor, id_institucion_vendedor, id_tipo_operacion, id_tipo_pago, comision_transferencia, estado_aviso_mc, id_cliente, hmac)
VALUES('BMULTIVA', 1, '275fb66dab275fb6c450', '2019-10-31 22:51:27.299', NULL, '2019-10-31 16:54:11.308', '7CA4FD363383E98B220256D4253E2B32', 'EEFF9593C027160BBA1790BE3076DD2F', NULL, 1234567, '52F004F3B988DA5CF906328E3613B9631B881922283BFECCCD1AB6E69D3D6B42', '3E45371F0ACDEA961AF1109D6F524E35', '0A6EF3712E9F6800712647FFAA0DFC6AE26E6E0795EB800F9564D461340F6A48', NULL, NULL, NULL, '52D6BAA9A674D50E1B8ACFC33D34FEDD14EB07560874DCDD55AAF13279625825', '0221B14A70E457989C2145029E846847', '84E70E285F36AE826B0D2770BC2C0D1AE56A25FA75B0C81EF13955239DE7274F97B6AEDBE73F36B01F78B1F4E76D2512ECA66C8EC200C0C326563EEB077A0C8D', '92A571EF85C8ABB276CD07781C3E66B9', 'DC4EFE2B992AA43D0DF1ACDFCFFCAE3D284B140931E8FC30147647A4E1ADE221', 'AC326478D1DF235321FB96D782D589E1', 2, 19, 1, NULL, 1000870709, NULL);
INSERT INTO public.codi_operaciones
(cve_entidad, id_empresa, id_mensaje_cobro, fecha_hora_solicitud, fecha_hora_procesamiento, fecha_hora_limite, monto, concepto_pago, cve_rastreo, referencia_numerica, numero_celular_comprador, digito_verificador_comprador, nombre_comprador, id_tipo_cuenta_comprador, numero_cuenta_comprador, id_institucion_comprador, numero_celular_vendedor, digito_verificador_vendedor, nombre_vendedor, id_tipo_cuenta_vendedor, numero_cuenta_vendedor, id_institucion_vendedor, id_tipo_operacion, id_tipo_pago, comision_transferencia, estado_aviso_mc, id_cliente, hmac)
VALUES('BMULTIVA', 1, '275f8ccb42275fbccdee', '2019-10-31 23:38:22.661', NULL, '2019-10-31 17:53:22.661', '11CA9C939463D30052CCCAB8B7AB5845', '30A69D175410364D7D5B3D52EB5AA499973854CA164D4D8C5927E52D350E4364CBFA8B6CB79D9EA66EB4BE2998202E13', NULL, 0, 'BD39D47FAE3D5D49A203428644415A80DB55869B3CF63D354F74C43908979EFB', 'D7ECCEF3BFB01564083DAFEF683E7CF9', '6A345BD91B96C04187A89D0FA6612F6D108F14D0DB524CF540124BB1F97399FF', NULL, NULL, NULL, 'E70C687C15391788315F3FBB4FE1370CFFEECD84B4953810CAF8416C52877CA1', '2A0785CB21A8D307348A27EBF48EAFD5', 'FD3BAC63F21713CF74EF3E1227FE1715', '92A571EF85C8ABB276CD07781C3E66B9', '8A652B379972471CBAB96CD7D077C20247B2F40C91671A703947F587ABAEFF4A', '9F6D560F5A36E29B10EB216CB99424C0', 2, 20, 1, NULL, 1001013707, NULL);
INSERT INTO public.codi_operaciones
(cve_entidad, id_empresa, id_mensaje_cobro, fecha_hora_solicitud, fecha_hora_procesamiento, fecha_hora_limite, monto, concepto_pago, cve_rastreo, referencia_numerica, numero_celular_comprador, digito_verificador_comprador, nombre_comprador, id_tipo_cuenta_comprador, numero_cuenta_comprador, id_institucion_comprador, numero_celular_vendedor, digito_verificador_vendedor, nombre_vendedor, id_tipo_cuenta_vendedor, numero_cuenta_vendedor, id_institucion_vendedor, id_tipo_operacion, id_tipo_pago, comision_transferencia, estado_aviso_mc, id_cliente, hmac)
VALUES('BMULTIVA', 1, '275fbed9aa275fbedafa', '2019-10-31 23:54:51.041', NULL, '2019-10-31 17:54:56.100', '11E911026B97C44062BEF07AAC411874', 'A9BB0AAD794E14831203AB2A38307AC0', NULL, 0, '31EB2D7DA02CEEA22D580461B8E79FE7A45D32A49326C120FD5E232286325462', 'D53DCD922BCE857DE8315267F64853B6', 'A92E99DE1D0A339BE48818B700725A74B8001EB0822C5969919E75A7D53D129E', NULL, NULL, NULL, 'BE2F82E406C9A4D159A5670CC9F5072CD5CF892659D4741EBC448F832C86FA31', '2A0785CB21A8D307348A27EBF48EAFD5', '28BB02E3042D4CF718B513C9F3EBAB7095AA4DD3D09ED50638D19C3A1003D85AB41FE65F10F6D698D76C9B51DF44A9E8', '92A571EF85C8ABB276CD07781C3E66B9', '29884FA8D80F1E2164AF32F716A73426E3A0A009EE7FE5179FAD6D55B014DCEA', 'AC326478D1DF235321FB96D782D589E1', 2, 19, 1, NULL, 1000253899, NULL);
INSERT INTO public.codi_operaciones
(cve_entidad, id_empresa, id_mensaje_cobro, fecha_hora_solicitud, fecha_hora_procesamiento, fecha_hora_limite, monto, concepto_pago, cve_rastreo, referencia_numerica, numero_celular_comprador, digito_verificador_comprador, nombre_comprador, id_tipo_cuenta_comprador, numero_cuenta_comprador, id_institucion_comprador, numero_celular_vendedor, digito_verificador_vendedor, nombre_vendedor, id_tipo_cuenta_vendedor, numero_cuenta_vendedor, id_institucion_vendedor, id_tipo_operacion, id_tipo_pago, comision_transferencia, estado_aviso_mc, id_cliente, hmac)
VALUES('BMULTIVA', 1, '275f8ef63b275fbef62e', '2019-10-31 23:55:44.571', NULL, '2019-10-31 18:10:44.571', '2456C79FC4154AE1D1ED1A9BF540ED1D', '30A69D175410364D7D5B3D52EB5AA499973854CA164D4D8C5927E52D350E4364CBFA8B6CB79D9EA66EB4BE2998202E13', NULL, 0, '31EB2D7DA02CEEA22D580461B8E79FE7A45D32A49326C120FD5E232286325462', 'D53DCD922BCE857DE8315267F64853B6', 'A92E99DE1D0A339BE48818B700725A74B8001EB0822C5969919E75A7D53D129E', NULL, NULL, NULL, 'E70C687C15391788315F3FBB4FE1370CFFEECD84B4953810CAF8416C52877CA1', '2A0785CB21A8D307348A27EBF48EAFD5', 'FD3BAC63F21713CF74EF3E1227FE1715', '92A571EF85C8ABB276CD07781C3E66B9', '8A652B379972471CBAB96CD7D077C20247B2F40C91671A703947F587ABAEFF4A', '9F6D560F5A36E29B10EB216CB99424C0', 2, 20, 1, NULL, 1000253899, NULL);
