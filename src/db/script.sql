CREATE TABLE public.laminas (
	id_lamina varchar NOT NULL,
	fecha_insert timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT laminas_un UNIQUE (id_lamina)
);


CREATE TABLE public.libretas (
	id_libreta varchar NOT NULL,
	fecha_insert timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT libreta_un UNIQUE (id_libreta)
);