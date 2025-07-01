package hospital.external.rest.dto;

import hospital.core.entity.Catalogos;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PacientesDTO {
    private Integer id;
    private String nombre;

    public static PacientesDTO fromEntity(Catalogos catalogos) {
        return PacientesDTO.builder()
                .id(catalogos.getIdPaciente())
                .nombre(catalogos.getNombrePaciente())
                .build();
    }
}
