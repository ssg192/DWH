package hospital.core.entity;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Builder
@Getter
public class Catalogos {
    private Integer idFecha;
    private LocalDate fecha;
    private Integer idHospital;
    private String nombreHospital;
    private Integer idMedico;
    private String nombreMedico;
    private Integer idPaciente;
    private String nombrePaciente;
}
