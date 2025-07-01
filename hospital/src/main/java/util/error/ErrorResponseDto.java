package util.error;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@Schema(name = "ErrorResponse", description = "Entidad devuelta en caso de que al aplicar un conjunto de reglas de negocio o validaciones no se satisfagan las condiciones esperadas. Con esta entidad se busca el objetivo que un sólo llamado de pueda determinar todos los errores asociados a la entidad en la operación requerida")
public class ErrorResponseDto {
    @NotNull
    @JsonProperty
    @Schema(description = "Código del error")
    private String code;
    @NotNull
    @JsonProperty
    @Schema(description = "MensajeNacional del error")
    private String message;
    @JsonProperty
    private List<ErrorDetailDto> details;

    public ErrorResponseDto() {
        code = ErrorCodesEnum.ERROR.name();
        message = ErrorCodesEnum.ERROR.getDetail();
        details = new ArrayList<>();
    }

    public void addDetail(ErrorDetailDto e) {
        details.add(e);
    }
}
