package hospital.external.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import hospital.core.entity.Cita;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class UpdateCitaDTO {
    @NotNull
    @Positive
    @JsonProperty
    private Integer id;
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
                .idCita(id)
                .idFecha(idFecha)
                .idMedico(idMedico)
                .idPaciente(idPaciente)
                .idHospital(idHospital)
                .build();
    }
}
