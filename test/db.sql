

CREATE SCHEMA public;

CREATE TABLE public.codi_tipo_operacion
(
	id_tipo_operacion int4 NOT NULL,
	tipo_operacion character varying(250)
);

ALTER TABLE public.codi_tipo_operacion OWNER TO admin;

INSERT INTO public.codi_tipo_operacion (id_tipo_operacion, tipo_operacion) VALUES (1, 'Cobro');
INSERT INTO public.codi_tipo_operacion (id_tipo_operacion, tipo_operacion) VALUES (2, 'Pago');

CREATE TABLE public.codi_mc_generados (
    cve_entidad character varying(20) NOT NULL,
    id_empresa numeric(10,0) NOT NULL,
    id_mensaje_cobro character varying(10) NOT NULL,
    fecha_hora_solicitud timestamp NULL,
    monto numeric(25,2),
    concepto_pago character varying(255),
    referencia_numerica integer,
    numero_celular_vendedor character varying(10),
    digito_verificador_vendedor character varying(3),
    nombre_vendedor character varying(40),
    id_tipo_cuenta_vendedor integer,
    numero_cuenta_vendedor character varying(20),
    id_institucion_vendedor integer,
	id_cliente integer,
	hmac character varying(255)
);

ALTER TABLE public.codi_mc_generados OWNER TO admin;

INSERT INTO public.codi_mc_generados (cve_entidad, id_empresa, id_mensaje_cobro, fecha_hora_solicitud, monto, concepto_pago, referencia_numerica, numero_celular_vendedor, digito_verificador_vendedor, nombre_vendedor, id_tipo_cuenta_vendedor, numero_cuenta_vendedor, id_institucion_vendedor, id_cliente, hmac) VALUES ('BMULTIVA', 1, '27330a9b42', '2019-10-05 20:31:03.495000'::timestamp, 45.00, 'Test14', 4013214, '9029410779', '6', 'ELIZABETH  CASTRO C.', 40, '132180000035759185', 40132, 1000100101, null);
INSERT INTO public.codi_mc_generados (cve_entidad, id_empresa, id_mensaje_cobro, fecha_hora_solicitud, monto, concepto_pago, referencia_numerica, numero_celular_vendedor, digito_verificador_vendedor, nombre_vendedor, id_tipo_cuenta_vendedor, numero_cuenta_vendedor, id_institucion_vendedor, id_cliente, hmac) VALUES ('BMULTIVA', 1, '273386db37', '2019-10-05 20:31:03.495000'::timestamp, 0.00, 'test0', 1234567, '9029410779', '2', 'ELIZABETH CASTRO CENOBIO', 40, '132180000035759185', 40132, 1000100101, null);
INSERT INTO public.codi_mc_generados (cve_entidad, id_empresa, id_mensaje_cobro, fecha_hora_solicitud, monto, concepto_pago, referencia_numerica, numero_celular_vendedor, digito_verificador_vendedor, nombre_vendedor, id_tipo_cuenta_vendedor, numero_cuenta_vendedor, id_institucion_vendedor, id_cliente, hmac) VALUES ('BMULTIVA', 1, 'qw123dq2', '2019-10-05 20:31:03.495000'::timestamp, 0.00, '2', null, '5562922378', '2', 'Alejandro C', 23, '123456789123456', 40132, 1000100101, null);
INSERT INTO public.codi_mc_generados (cve_entidad, id_empresa, id_mensaje_cobro, fecha_hora_solicitud, monto, concepto_pago, referencia_numerica, numero_celular_vendedor, digito_verificador_vendedor, nombre_vendedor, id_tipo_cuenta_vendedor, numero_cuenta_vendedor, id_institucion_vendedor, id_cliente, hmac) VALUES ('BMULTIVA', 1, 'qw123dq2', '2019-10-05 20:31:03.495000'::timestamp, 20.00, '2', null, '5562922378', '2', 'Alejandro C', 23, '123456789123456', 40132, 1000100101, null);
INSERT INTO public.codi_mc_generados (cve_entidad, id_empresa, id_mensaje_cobro, fecha_hora_solicitud, monto, concepto_pago, referencia_numerica, numero_celular_vendedor, digito_verificador_vendedor, nombre_vendedor, id_tipo_cuenta_vendedor, numero_cuenta_vendedor, id_institucion_vendedor, id_cliente, hmac) VALUES ('BMULTIVA', 1, 'qw123dq2', '2019-10-05 20:31:03.495000'::timestamp, 0.00, '2', null, '5562922378', '2', 'Alejandro C', 23, '123456789123456', 40132, 1000100101, null);
INSERT INTO public.codi_mc_generados (cve_entidad, id_empresa, id_mensaje_cobro, fecha_hora_solicitud, monto, concepto_pago, referencia_numerica, numero_celular_vendedor, digito_verificador_vendedor, nombre_vendedor, id_tipo_cuenta_vendedor, numero_cuenta_vendedor, id_institucion_vendedor, id_cliente, hmac) VALUES ('BMULTIVA', 1, 'qw123dq2', '2019-10-05 20:31:03.495000'::timestamp, 20.00, '2', null, '5562922378', '2', 'Alejandro C', 23, '123456789123456', 40132, 1000100101, null);
INSERT INTO public.codi_mc_generados (cve_entidad, id_empresa, id_mensaje_cobro, fecha_hora_solicitud, monto, concepto_pago, referencia_numerica, numero_celular_vendedor, digito_verificador_vendedor, nombre_vendedor, id_tipo_cuenta_vendedor, numero_cuenta_vendedor, id_institucion_vendedor, id_cliente, hmac) VALUES ('BMULTIVA', 1, '2739adfa08', '2019-10-05 20:31:03.495000'::timestamp, 2.00, 'tgg', 0, '8946105739', '4', ' HELLO MEXICO HELLO MEXICO', 40, '132180000066942848', 40132, 1000100101, null);

CREATE TABLE public.codi_operaciones (
	cve_entidad character varying(20) NOT NULL,
	id_empresa numeric(10) NOT NULL,
	id_mensaje_cobro character varying(20) NOT NULL,
	fecha_hora_solicitud timestamp NULL,
	fecha_hora_procesamiento timestamp NULL,
	fecha_hora_limite timestamp NULL,
	monto numeric(25,2) NULL,
	concepto_pago character varying(255) NULL,
	cve_rastreo character varying(30) NULL,
	referencia_numerica int4 NULL,
	numero_celular_comprador character varying(10) NULL,
	digito_verificador_comprador character varying(3) NULL,
	nombre_comprador character varying(40) NULL,
	id_tipo_cuenta_comprador int4 NULL,
	numero_cuenta_comprador character varying(20) NULL,
	id_institucion_comprador int4 NULL,
	numero_celular_vendedor character varying(20) NULL,
	digito_verificador_vendedor character varying(3) NULL,
	nombre_vendedor character varying(40) NULL,
	id_tipo_cuenta_vendedor int4 NULL,
	numero_cuenta_vendedor character varying(20) NULL,
	id_institucion_vendedor int4 NULL,
	id_tipo_operacion int4 NULL,
	id_tipo_pago int4 NULL,
	comision_transferencia int4 NULL,
	estado_aviso_mc int4 NULL,
	id_cliente int4 NULL,
	hmac character varying(255)
);

ALTER TABLE public.codi_operaciones OWNER TO admin;

INSERT INTO public.codi_operaciones (cve_entidad, id_empresa, id_mensaje_cobro, fecha_hora_solicitud, fecha_hora_procesamiento, fecha_hora_limite, monto, concepto_pago, cve_rastreo, referencia_numerica, numero_celular_comprador, digito_verificador_comprador, nombre_comprador, id_tipo_cuenta_comprador, numero_cuenta_comprador, id_institucion_comprador, numero_celular_vendedor, digito_verificador_vendedor, nombre_vendedor, id_tipo_cuenta_vendedor, numero_cuenta_vendedor, id_institucion_vendedor, id_tipo_operacion, id_tipo_pago, comision_transferencia, estado_aviso_mc, id_cliente, hmac) VALUES ('BMULTIVA', 1, '274a612b7b274a892ca0', '2019-10-05 20:31:03.495000'::timestamp, null, null, 2400.50, 'VENTA DE MONEDAS DE COLECCION', null, 0, '9026669721', '16', 'JONATAN SANCHEZ SANSORES', null, null, null, '00000161803561216368', '0', 'CobroSPEI', 40, '996123654789652365', 90996, 2, 20, 1, null, 1000100101, null);
INSERT INTO public.codi_operaciones (cve_entidad, id_empresa, id_mensaje_cobro, fecha_hora_solicitud, fecha_hora_procesamiento, fecha_hora_limite, monto, concepto_pago, cve_rastreo, referencia_numerica, numero_celular_comprador, digito_verificador_comprador, nombre_comprador, id_tipo_cuenta_comprador, numero_cuenta_comprador, id_institucion_comprador, numero_celular_vendedor, digito_verificador_vendedor, nombre_vendedor, id_tipo_cuenta_vendedor, numero_cuenta_vendedor, id_institucion_vendedor, id_tipo_operacion, id_tipo_pago, comision_transferencia, estado_aviso_mc, id_cliente, hmac) VALUES ('BMULTIVA', 1, '274a612b7b274a892ca0', '2019-10-10 17:09:22.764000'::timestamp, null, null, 2400.50, 'VENTA DE MONEDAS DE COLECCION', null, 0, '9026669721', '16', 'JONATAN SANCHEZ SANSORES', null, null, null, '00000161803561216368', '0', 'CobroSPEI', 40, '996123654789652365', 90996, 2, 20, 1, null, 1000100101, null);
INSERT INTO public.codi_operaciones (cve_entidad, id_empresa, id_mensaje_cobro, fecha_hora_solicitud, fecha_hora_procesamiento, fecha_hora_limite, monto, concepto_pago, cve_rastreo, referencia_numerica, numero_celular_comprador, digito_verificador_comprador, nombre_comprador, id_tipo_cuenta_comprador, numero_cuenta_comprador, id_institucion_comprador, numero_celular_vendedor, digito_verificador_vendedor, nombre_vendedor, id_tipo_cuenta_vendedor, numero_cuenta_vendedor, id_institucion_vendedor, id_tipo_operacion, id_tipo_pago, comision_transferencia, estado_aviso_mc, id_cliente, hmac) VALUES ('BMULTIVA', 1, '27438cc1ef2743b4d341', '2019-10-03 22:38:03.495000'::timestamp, '2019-10-03 22:46:46.000000'::timestamp, null, 1800.00, 'VENTA DE MONEDAS DE COLECCION', '-', 0, '8929976502', '0', 'ELIZABETH CASTRO CENOBIO', 40, '132180000035759185', 40132, '00000161803561216368', '0', 'CobroSPEI', 40, '996123654789652365', 90996, 2, 20, 1, 1, 1000100101, null);
INSERT INTO public.codi_operaciones (cve_entidad, id_empresa, id_mensaje_cobro, fecha_hora_solicitud, fecha_hora_procesamiento, fecha_hora_limite, monto, concepto_pago, cve_rastreo, referencia_numerica, numero_celular_comprador, digito_verificador_comprador, nombre_comprador, id_tipo_cuenta_comprador, numero_cuenta_comprador, id_institucion_comprador, numero_celular_vendedor, digito_verificador_vendedor, nombre_vendedor, id_tipo_cuenta_vendedor, numero_cuenta_vendedor, id_institucion_vendedor, id_tipo_operacion, id_tipo_pago, comision_transferencia, estado_aviso_mc, id_cliente, hmac) VALUES ('BMULTIVA', 1, '27437f478b2743a975f8', '2019-10-03 20:58:15.110000'::timestamp, '2019-10-03 21:12:54.000000'::timestamp, null, 2400.50, 'VENTA DE MONEDAS DE COLECCION', '-', 0, '8929976502', '0', 'ELIZABETH CASTRO CENOBIO', 40, '132180000035759185', 40132, '00000161803561216368', '0', 'CobroSPEI', 40, '996123654789652365', 90996, 2, 20, 1, 1, 1000100101, null);
INSERT INTO public.codi_operaciones (cve_entidad, id_empresa, id_mensaje_cobro, fecha_hora_solicitud, fecha_hora_procesamiento, fecha_hora_limite, monto, concepto_pago, cve_rastreo, referencia_numerica, numero_celular_comprador, digito_verificador_comprador, nombre_comprador, id_tipo_cuenta_comprador, numero_cuenta_comprador, id_institucion_comprador, numero_celular_vendedor, digito_verificador_vendedor, nombre_vendedor, id_tipo_cuenta_vendedor, numero_cuenta_vendedor, id_institucion_vendedor, id_tipo_operacion, id_tipo_pago, comision_transferencia, estado_aviso_mc, id_cliente, hmac) VALUES ('BMULTIVA', 1, '27476ac007274792c0fb', '2019-10-07 18:22:00.070000'::timestamp, null, null, 100.80, 'VENTA DE MONEDAS DE COLECCION', null, 0, '9000997513', '3', 'SARA LOPEZ ANTONIO', null, null, null, '00000161803561216368', '0', 'CobroSPEI', 40, '996123654789652365', 90996, 2, 20, 1, null, 1000100101, null);
INSERT INTO public.codi_operaciones (cve_entidad, id_empresa, id_mensaje_cobro, fecha_hora_solicitud, fecha_hora_procesamiento, fecha_hora_limite, monto, concepto_pago, cve_rastreo, referencia_numerica, numero_celular_comprador, digito_verificador_comprador, nombre_comprador, id_tipo_cuenta_comprador, numero_cuenta_comprador, id_institucion_comprador, numero_celular_vendedor, digito_verificador_vendedor, nombre_vendedor, id_tipo_cuenta_vendedor, numero_cuenta_vendedor, id_institucion_vendedor, id_tipo_operacion, id_tipo_pago, comision_transferencia, estado_aviso_mc, id_cliente, hmac) VALUES ('BMULTIVA', 1, '274381d3502743a9d460', '2019-10-03 21:14:38.592000'::timestamp, '2019-10-03 21:15:37.000000'::timestamp, null, 700.20, 'VENTA DE MONEDAS DE COLECCION', '-', 0, '8929976502', '0', 'ELIZABETH CASTRO CENOBIO', 40, '132180000035759185', 40132, '00000161803561216368', '0', 'CobroSPEI', 40, '996123654789652365', 90996, 2, 20, 1, 1, 1000100101, null);
INSERT INTO public.codi_operaciones (cve_entidad, id_empresa, id_mensaje_cobro, fecha_hora_solicitud, fecha_hora_procesamiento, fecha_hora_limite, monto, concepto_pago, cve_rastreo, referencia_numerica, numero_celular_comprador, digito_verificador_comprador, nombre_comprador, id_tipo_cuenta_comprador, numero_cuenta_comprador, id_institucion_comprador, numero_celular_vendedor, digito_verificador_vendedor, nombre_vendedor, id_tipo_cuenta_vendedor, numero_cuenta_vendedor, id_institucion_vendedor, id_tipo_operacion, id_tipo_pago, comision_transferencia, estado_aviso_mc, id_cliente, hmac) VALUES ('BMULTIVA', 1, '27476ac007274792d853', '2019-10-07 18:22:00.070000'::timestamp, null, null, 100.80, 'VENTA DE MONEDAS DE COLECCION', null, 0, '9000997513', '3', 'SARA LOPEZ ANTONIO', null, null, null, '00000161803561216368', '0', 'CobroSPEI', 40, '996123654789652365', 90996, 2, 20, 1, null, 1000100101, null);