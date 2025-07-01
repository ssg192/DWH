package hospital.external.rest.dto;


import hospital.core.entity.Catalogos;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MedicosDTO {

    private Integer id;
    private String nombre;

    public static MedicosDTO fromEntity(Catalogos catalogos) {
        return MedicosDTO.builder()
                .id(catalogos.getIdMedico())
                .nombre(catalogos.getNombreMedico())
                .build();
    }
}
