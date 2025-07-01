package hospital.core.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
@Setter
public class Cita {
    private Integer idCita;
    private Integer idFecha;
    private Integer idMedico;
    private Integer idHospital;
    private Integer idPaciente;
    private Integer idEstado;
}
