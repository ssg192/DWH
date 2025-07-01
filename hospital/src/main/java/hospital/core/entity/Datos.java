package hospital.core.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class Datos {
    private String mes;
    private String estadoCita;
    private Integer totalCitas;
    private String nombreHospital;
    private String nombreMedico;
    private Integer canceladas;
    private Integer atendidas;
    private Integer programadas;
    private Integer idFecha;

}
