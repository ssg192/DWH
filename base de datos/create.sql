CREATE SEQUENCE th01_cat_estado_paciente_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE th02_dim_paciente_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE th03_dim_hospital_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE th04_dim_medico_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE th05_cat_estado_cita_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE th06_dim_fecha_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE th07_cita_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE th01_cat_estado_paciente
(
    id_estado     INT DEFAULT nextval('th01_cat_estado_paciente_seq') PRIMARY KEY,
    nombre_estado VARCHAR(100) NOT NULL
);

CREATE TABLE th02_dim_paciente
(
    id_paciente      INT DEFAULT nextval('th02_dim_paciente_seq') PRIMARY KEY,
    nombre_completo  VARCHAR(150),
    fecha_afiliacion DATE,
    id_estado        INT REFERENCES th01_cat_estado_paciente (id_estado)
);

CREATE TABLE th03_dim_hospital
(
    id_hospital     INT DEFAULT nextval('th03_dim_hospital_seq') PRIMARY KEY,
    nombre          VARCHAR(255),
    estado_hospital VARCHAR(100)
);

CREATE TABLE th04_dim_medico
(
    id_medico       INT DEFAULT nextval('th04_dim_medico_seq') PRIMARY KEY,
    nombre_completo VARCHAR(255),
    estado_medico   VARCHAR(100)
);

CREATE TABLE th05_cat_estado_cita
(
    id_estado     INT DEFAULT nextval('th05_cat_estado_cita_seq') PRIMARY KEY,
    nombre_estado VARCHAR(100) NOT NULL
);

CREATE TABLE th06_dim_fecha
(
    id_fecha INT DEFAULT nextval('th06_dim_fecha_seq') PRIMARY KEY,
    fecha    DATE
);

CREATE TABLE th07_cita
(
    id_cita        INT DEFAULT nextval('th07_cita_seq') PRIMARY KEY,
    fk_id_fecha    INT REFERENCES th06_dim_fecha (id_fecha),
    fk_id_hospital INT REFERENCES th03_dim_hospital (id_hospital),
    fk_id_medico   INT REFERENCES th04_dim_medico (id_medico),
    fk_id_paciente INT REFERENCES th02_dim_paciente (id_paciente),
    fk_id_estado   INT REFERENCES th05_cat_estado_cita (id_estado)
);
