package hospital.external.rest.dto;

import hospital.core.entity.Catalogos;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Builder
@Getter
public class FechasDTO {
    private Integer id;
    private LocalDate fecha;

    public static FechasDTO fromEntity(Catalogos catalogos) {
        return FechasDTO.builder()
                .id(catalogos.getIdFecha())
                .fecha(catalogos.getFecha())
                .build();
    }
}
