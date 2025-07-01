package hospital.external.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import hospital.core.entity.Datos;
import lombok.Builder;

@Builder
public class listMedicosWithEstadoCitasConteoDTO {
    @JsonProperty
    private String nombreMedico;
    @JsonProperty
    private Integer totalCitas;
    @JsonProperty
    private Integer canceladas;
    @JsonProperty
    private Integer atendidas;
    @JsonProperty
    private Integer programadas;

    public static listMedicosWithEstadoCitasConteoDTO fromEntity (Datos datos){
        return listMedicosWithEstadoCitasConteoDTO.builder()
                .nombreMedico(datos.getNombreMedico())
                .totalCitas(datos.getTotalCitas())
                .canceladas(datos.getCanceladas())
                .atendidas(datos.getAtendidas())
                .programadas(datos.getProgramadas())
                .build();
    }
}
