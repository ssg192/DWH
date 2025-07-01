package hospital.external.jpa.dao;

import hospital.core.business.output.DatosRepository;
import hospital.core.entity.Catalogos;
import hospital.core.entity.Cita;
import hospital.core.entity.Datos;
import hospital.external.jpa.model.CitaJpa;
import hospital.external.jpa.repository.CitaJpaRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceUnit;

import java.sql.Date;
import java.util.List;
import java.util.stream.Stream;

@ApplicationScoped
public class DatosDao implements DatosRepository {

    @PersistenceUnit()
    private final EntityManager entityManagerReading;
    private final CitaJpaRepository citaJpaRepository;

    @Inject
    public DatosDao(EntityManager entityManagerReading, CitaJpaRepository citaJpaRepository) {
        this.entityManagerReading = entityManagerReading;
        this.citaJpaRepository = citaJpaRepository;
    }

    private static final String QUERY_FIND_CITAS_ESTADO_Y_MES = """
            with meses as (
            select
            initcap(u.mes_nombre) as mes_nombre,
            u.orden
            from unnest(
            array[
            'enero','febrero','marzo','abril','mayo','junio',
            'julio','agosto','septiembre','octubre','noviembre','diciembre'
            ]
            ) with ordinality as u(mes_nombre, orden)
            )
            select
            m.mes_nombre,
            th05.nombre_estado as estado_cita,
            cast(count(*) as int) as total_citas
            from th07_cita th07
            join th06_dim_fecha th06 on th07.fk_id_fecha  = th06.id_fecha
            join th05_cat_estado_cita th05 on th07.fk_id_estado = th05.id_estado
            join meses m on extract(month from th06.fecha)::int = m.orden
            group by
            m.orden,
            m.mes_nombre,
            estado_cita
            order by
            m.orden,
            estado_cita
            """;
    private static final String QUERY_FIND_HOSPITAL_CON_CITAS = """
            with conteos as (
            select
            h.id_hospital,
            h.nombre as nombre_hospital,
            e.nombre_estado,
            cast (count(*)as int) as total_citas
            from th07_cita c
            join th03_dim_hospital h on c.fk_id_hospital = h.id_hospital
            join th05_cat_estado_cita e on c.fk_id_estado = e.id_estado
            where e.nombre_estado in ('Cancelada', 'Atendida')
            group by
            h.id_hospital,
            h.nombre,
            e.nombre_estado
            ),
            ranked as (
            select
            nombre_estado,
            nombre_hospital,
            total_citas,
            row_number() over (
            partition by nombre_estado
            order by total_citas desc
            ) as rn
            from conteos
            )
            select
            nombre_estado as estado_cita,
            nombre_hospital,
            total_citas
            from ranked
            where rn = 1
            """;
    private static final String QUERY_FIND_MEDICOS_CON_ESTADO_CITAS = """
           with medicos as (
           select
           m.id_medico,
           m.nombre_completo as medico,
           cast (count(*)as int) as total_citas,
          cast(sum(case when e.nombre_estado = 'Cancelada' then 1 else 0 end)as int) as canceladas,
           cast(sum(case when e.nombre_estado = 'Atendida'  then 1 else 0 end)as int) as atendidas,
           cast(sum(case when e.nombre_estado = 'Programada' then 1 else 0 end)as int) as programadas
           from th07_cita c
           join th04_dim_medico m       on c.fk_id_medico = m.id_medico
           join th05_cat_estado_cita e  on c.fk_id_estado = e.id_estado
           group by m.id_medico, m.nombre_completo
           )
           select
           medico,
           total_citas,
           canceladas,
           atendidas,
           programadas
            from medicos
""";

    private static final String QUERY_FIND_FECHAS = """
    select th06.id_fecha, th06.fecha from th06_dim_fecha th06
""";
    private static final String QUERY_FIND_MEDICOS = """
    select th04.id_medico, th04.nombre_completo from th04_dim_medico th04
    where th04.estado_medico = 'Activo';
    """;

    private static final String QUERY_FIND_HOSPITAL = """
    select th03.id_hospital,th03.nombre from th03_dim_hospital th03
    """;
    private static final String QUERY_FIND_PACIENTE = """
    select th02.id_paciente, th02.nombre_completo from th02_dim_paciente th02
    where th02.id_estado = 1;
    """;
    private static final String QUERY_EXISTS_ID_CITA = """
            select exists(select 1 from th07_cita th07 where th07.id_cita = :idCita)
            """;

    private static final String PARAM_ID_CITA = "idCita";

    @Override
    @SuppressWarnings("unchecked")
    public List<Datos> findCitasWithEstadoAndMes() {
       Stream<Object[]> result = entityManagerReading.createNativeQuery(QUERY_FIND_CITAS_ESTADO_Y_MES)
               .getResultStream();
        return result.map(row->Datos.builder()
                .mes((String) row[0])
                .estadoCita((String) row[1])
                .totalCitas((Integer) row[2])
                .build())
                .toList();
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<Datos> findHospitalWithCitasConteo() {
        Stream<Object[]> result = entityManagerReading.createNativeQuery(QUERY_FIND_HOSPITAL_CON_CITAS)
                .getResultStream();
        return result.map(row->Datos.builder()
                .estadoCita((String) row[0])
                .nombreHospital((String) row[1])
                .totalCitas((Integer) row[2])
                .build())
                .toList();
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<Datos> findMedicosWithEstadoCitasConteo() {
        Stream<Object[]> result = entityManagerReading.createNativeQuery(QUERY_FIND_MEDICOS_CON_ESTADO_CITAS)
                .getResultStream();
        return result.map(row->Datos.builder()
                .nombreMedico((String) row[0])
                .totalCitas((Integer) row[1])
                .canceladas((Integer) row[2])
                .atendidas((Integer) row[3])
                .programadas((Integer) row[4])
                .build())
                .toList();
    }

    @Override
    public void save(Cita entity) {
        citaJpaRepository.saveAndFlush(CitaJpa.fromEntity(entity)).toEntity();
    }


    @Override
    @SuppressWarnings("unchecked")
    public List<Catalogos> findFechas() {
        Stream<Object[]> result = entityManagerReading.createNativeQuery(QUERY_FIND_FECHAS)
                .getResultStream();
        return result.map(row->Catalogos.builder()
                        .idFecha((Integer) row[0])
                        .fecha(row[1] != null ? ((Date) row[1]).toLocalDate() : null)
                        .build())
                .toList();
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<Catalogos> findMedicos() {
        Stream<Object[]> result = entityManagerReading.createNativeQuery(QUERY_FIND_MEDICOS)
                .getResultStream();
        return result.map(row->Catalogos.builder()
                .idMedico((Integer) row[0])
                .nombreMedico((String)row[1])
                .build())
                .toList();
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<Catalogos> findHospital() {
        Stream<Object[]> result = entityManagerReading.createNativeQuery(QUERY_FIND_HOSPITAL)
                .getResultStream();
        return result.map(row->Catalogos.builder()
                        .idHospital((Integer) row[0])
                        .nombreHospital((String)row[1])
                        .build())
                .toList();
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<Catalogos> findPacientes() {
        Stream<Object[]> result = entityManagerReading.createNativeQuery(QUERY_FIND_PACIENTE)
                .getResultStream();
        return result.map(row->Catalogos.builder()
                        .idPaciente((Integer) row[0])
                        .nombrePaciente((String)row[1])
                        .build())
                .toList();
    }

    @Override
    public Boolean existWithIdCita(Integer idCita) {
        return (boolean) entityManagerReading.createNativeQuery(QUERY_EXISTS_ID_CITA)
                .setParameter(PARAM_ID_CITA,idCita)
                .getSingleResult();
    }
}
