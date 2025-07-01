SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE datname = 'hospital';

DROP
DATABASE IF EXISTS "hospital";
CREATE
DATABASE "hospital";
BEGIN;
\c hospital
\i create.sql
\i data.sql
COMMIT;
