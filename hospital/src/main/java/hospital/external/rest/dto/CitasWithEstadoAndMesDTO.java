package hospital.external.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import hospital.core.entity.Datos;
import lombok.Builder;

@Builder
public class CitasWithEstadoAndMesDTO {
    @JsonProperty
    private String mes;
    @JsonProperty
    private String estadoCita;
    @JsonProperty
    private Integer totalCitas;

    public static CitasWithEstadoAndMesDTO fromEntity (Datos datos) {
        return CitasWithEstadoAndMesDTO.builder()
                .mes(datos.getMes())
                .estadoCita(datos.getEstadoCita())
                .totalCitas(datos.getTotalCitas())
                .build();
    }
}
