package hospital.external.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import hospital.core.entity.Cita;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CitaDTO {
    @JsonProperty
    @NotNull
    @Positive
    private Integer idFecha;
    @JsonProperty
    @NotNull
    @Positive
    private Integer idHospital;
    @JsonProperty
    @NotNull
    @Positive
    private Integer idMedico;
    @JsonProperty
    @NotNull
    @Positive
    private Integer idPaciente;

    public Cita toEntity() {
        return Cita.builder()
                .idFecha(idFecha)
                .idMedico(idMedico)
                .idPaciente(idPaciente)
                .idHospital(idHospital)
                .build();
    }
}
