package hospital.external.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import hospital.core.entity.Datos;
import lombok.Builder;

@Builder
public class listHospitalWithCitasConteoDTO {
    @JsonProperty
    private String estadoCita;
    @JsonProperty
    private String nombreHospital;
    @JsonProperty
    private Integer totalCitas;

    public static listHospitalWithCitasConteoDTO fromEntity(Datos datos){
        return listHospitalWithCitasConteoDTO.builder()
                .estadoCita(datos.getEstadoCita())
                .nombreHospital(datos.getNombreHospital())
                .totalCitas(datos.getTotalCitas())
                .build();
    }
}
