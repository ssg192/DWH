package util.error;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

@Getter
@Setter
@Builder
@AllArgsConstructor
@Schema(name = "ErrorDetail", description = "Error generado")
public class ErrorDetailDto {
    @JsonProperty
    @Schema(description = "Codigo asociado con el error")
    private String code;
    @JsonProperty
    @Schema(description = "Tipo del error encontrado")
    private ErrorType type;
    @JsonProperty
    @Schema(description = "MensajeNacional del error")
    private String message;
    @JsonProperty
    @Schema(description = "Origen del error")
    private String path;

    public ErrorDetailDto() {
        // Si no lo dejo vacio da warning
    }
}
