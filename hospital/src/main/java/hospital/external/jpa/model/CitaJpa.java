package hospital.external.jpa.model;

import hospital.core.entity.Cita;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "th07_cita")
public class CitaJpa {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "th07_cita_seq_gen")
    @SequenceGenerator(name = "th07_cita_seq_gen", sequenceName = "th07_cita_seq", allocationSize = 1)
    @Column(name = "id_cita")
    private Integer id;
    @Column(name = "fk_id_fecha")
    private Integer idFecha;
    @Column(name = "fk_id_medico")
    private Integer idMedico;
    @Column(name = "fk_id_paciente")
    private Integer idPaciente;
    @Column(name = "fk_id_hospital")
    private Integer idHospital;
    @Column(name = "fk_id_estado")
    private Integer  idEstado;


    public static CitaJpa fromEntity (Cita cita) {
        return CitaJpa.builder()
                .id(cita.getIdCita())
                .idFecha(cita.getIdFecha())
                .idMedico(cita.getIdMedico())
                .idPaciente(cita.getIdPaciente())
                .idEstado(cita.getIdEstado())
                .idHospital(cita.getIdHospital())
                .build();
    }

    public Cita toEntity() {
        return Cita.builder()
                .idCita(id)
                .idFecha(idFecha)
                .idMedico(idMedico)
                .idPaciente(idPaciente)
                .idEstado(idEstado)
                .idHospital(idHospital)
                .build();
    }
}
