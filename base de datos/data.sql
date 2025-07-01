SET client_encoding TO 'UTF8';
-- 1) Catálogo de estado de paciente (3 filas)
INSERT INTO th01_cat_estado_paciente (nombre_estado)
VALUES ('Activo'),
       ('Inactivo'),
       ('Pendiente');

-- 2) Catálogo de estado de cita (3 filas)
INSERT INTO th05_cat_estado_cita (nombre_estado)
VALUES ('Programada'),
       ('Atendida'),
       ('Cancelada');

-- 3) Dimensión Hospital (20 hospitales reales en México)
INSERT INTO th03_dim_hospital (nombre, estado_hospital)
VALUES ('Hospital General de México "Dr. Eduardo Liceaga"', 'Ciudad de México'),
       ('Hospital Ángeles Puebla', 'Puebla'),
       ('Hospital ABC Santa Fe', 'Ciudad de México'),
       ('Hospital Médica Sur', 'Ciudad de México'),
       ('Hospital Zambrano Hellion', 'Nuevo León'),
       ('Star Médica Guadalajara', 'Jalisco'),
       ('Hospital Juárez de México', 'Ciudad de México'),
       ('Hospital Civil de Guadalajara "Fray Antonio Alcalde"', 'Jalisco'),
       ('Hospital de Especialidades CMN Siglo XXI', 'Ciudad de México'),
       ('Hospital Ángeles León', 'Guanajuato'),
       ('Christus Muguerza Alta Especialidad', 'Nuevo León'),
       ('Hospital Regional ISSSTE Morelia', 'Michoacán'),
       ('Hospital General de Tijuana', 'Baja California'),
       ('Hospital IMSS La Raza', 'Ciudad de México'),
       ('Hospital Naval de Alta Especialidad', 'Veracruz'),
       ('Hospital Ángeles Saltillo', 'Coahuila'),
       ('Star Médica Puebla', 'Puebla'),
       ('Hospital del Niño y la Mujer Tampico', 'Tamaulipas'),
       ('Hospital General Dr. Manuel Gea González', 'Ciudad de México'),
       ('Hospital Ángeles Acoxpa', 'Ciudad de México');

-- 4) Dimensión Médico (200 médicos, 80% “Activo”, 20% “Inactivo”)
INSERT INTO th04_dim_medico (nombre_completo, estado_medico)
SELECT 
  (CASE WHEN random() < 0.5 THEN 'Dr. ' ELSE 'Dra. ' END) ||
  (ARRAY['Juan', 'José', 'Luis', 'Carlos', 'Miguel', 'Francisco', 'Jesús', 'Javier', 'David', 'Alejandro',
         'Fernando', 'Manuel', 'Arturo', 'Ricardo', 'Pablo', 'Sergio', 'Diego', 'Roberto', 'Alberto', 'Raúl']
  )[floor(random()*20)::int+1] || ' ' ||
  (ARRAY['García','Hernández','Martínez','López','González','Pérez','Sánchez','Ramírez','Torres','Flores',
         'Rivera','Gómez','Díaz','Reyes','Cruz']
  )[floor(random()*15)::int+1] || ' ' ||
  (ARRAY['García','Hernández','Martínez','López','González','Pérez','Sánchez','Ramírez','Torres','Flores',
         'Rivera','Gómez','Díaz','Reyes','Cruz']
  )[floor(random()*15)::int+1] AS nombre_completo,
  CASE WHEN random()<0.8 THEN 'Activo' ELSE 'Inactivo' END AS estado_medico
FROM generate_series(1,200) AS s(i);

-- 5) Dimensión Fecha (2025, 365 filas)
INSERT INTO th06_dim_fecha (fecha)
SELECT date '2025-01-01' + (i - 1)
FROM generate_series(1, 365) AS s(i);

-- 6) Dimensión Paciente (1,000 pacientes con nombres reales)
INSERT INTO th02_dim_paciente (nombre_completo, fecha_afiliacion, id_estado)
SELECT 
  (ARRAY['María', 'Juana', 'Ana', 'Laura', 'Carmen', 'José', 'Luis', 'Carlos', 'Antonio', 'Francisco',
         'Jesús', 'Jorge', 'Miguel', 'Pedro', 'Alejandro', 'Sofía', 'Valeria', 'Fernanda', 'Gabriela', 'Daniel']
  )[floor(random()*20)::int+1] || ' ' ||
  (ARRAY['García','Hernández','Martínez','López','González','Pérez','Sánchez','Ramírez','Torres','Flores',
         'Rivera','Gómez','Díaz','Reyes','Cruz','Morales','Vargas','Ortega','Silva','Rojas']
  )[floor(random()*20)::int+1] || ' ' ||
  (ARRAY['García','Hernández','Martínez','López','González','Pérez','Sánchez','Ramírez','Torres','Flores',
         'Rivera','Gómez','Díaz','Reyes','Cruz','Morales','Vargas','Ortega','Silva','Rojas']
  )[floor(random()*20)::int+1] AS nombre_completo,
  current_date - (random()*3650)::int AS fecha_afiliacion,
  floor(random()*3)::int+1 AS id_estado
FROM generate_series(1, 1000) AS s(i);

-- 7) Hechos Cita (5,000 filas)
INSERT INTO th07_cita (fk_id_fecha, fk_id_hospital, fk_id_medico, fk_id_paciente, fk_id_estado)
SELECT 
  floor(random() * 365)::int + 1,             -- fechas 1–365
  floor(random() * 20)::int + 1,               -- hospitales 1–20
  floor(random() * 200)::int + 1,              -- médicos 1–200
  floor(random() * 1000)::int + 1,             -- pacientes 1–1000
  floor(random() * 3)::int + 1                   -- estados 1–3
FROM generate_series(1, 5000) AS s(i);
