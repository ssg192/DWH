package hospital.external.rest.dto;

import hospital.core.entity.Catalogos;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class HospitalesDTO {
    private Integer id;
    private String nombre;

    public static HospitalesDTO fromEntity(Catalogos catalogos) {
        return HospitalesDTO.builder()
                .id(catalogos.getIdHospital())
                .nombre(catalogos.getNombreHospital())
                .build();
    }
}
