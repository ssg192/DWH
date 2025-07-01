package util.error;

import com.google.gson.Gson;
import jakarta.validation.ConstraintViolation;
import jakarta.ws.rs.core.Response;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ErrorMapper {
    private ErrorMapper() {
    }

    public static <T> ErrorDetailDto constraintToError(ConstraintViolation<T> ve) {
        String msg = ErrorCodesEnum.ERROR.getDetail();
        try {
            ErrorCodesEnum temp = ErrorCodesEnum.valueOf(ve.getMessage());
            msg = temp.getDetail();
        } catch (IllegalArgumentException e) {
            log.error("Enum del error no encontrado", e);
        }
        return ErrorDetailDto.builder().type(ErrorType.FIELD)
                .code(ve.getMessage())
                .message(msg)
                .path(ve.getPropertyPath().toString()).build();
    }

    /**
     * De vuelve una respuesta de error con base en el codigo del error
     *
     * @param error Codigo del error de tipo {@link ErrorCodesEnum}
     * @return Un objeto de la clase de tipo {@link ErrorResponseDto}
     */
    public static ErrorResponseDto errorCodeToErrorResponse(ErrorCodesEnum error) {
        ErrorResponseDto response = new ErrorResponseDto();
        response.addDetail(ErrorDetailDto.builder()
                .code(error.getName())
                .message(error.getDetail())
                .type(ErrorType.REQUEST).build());
        return response;
    }

    /**
     * Devuelve una respuesta de error con base en un codigo de error
     *
     * @param code código que indica la regla violada
     * @return respuesta con el codigo 400 o 404 según corresponda
     */
    public static Response.ResponseBuilder errorCodeToResponseBuilder(ErrorCodesEnum code) {
        var respuesta = Response.status(Response.Status.BAD_REQUEST).entity(errorCodeToErrorResponse(code));
        if (ErrorCodesEnum.NOT_FOUND.equals(code)) {
            respuesta = Response.status(Response.Status.NOT_FOUND).entity(errorCodeToErrorResponse(code));
        }
        return respuesta;
    }
    /**
     * Devuelve una respuesta de error con el estado http indicado con base en un codigo de error
     *
     * @param code   código que indica la regla violada
     * @param status estado http a utilizar en la respuesta
     * @return respuesta con el codigo status que se indico y el error construido
     */
    public static Response.ResponseBuilder errorCodeToResponseBuilder(ErrorCodesEnum code, Response.Status status) {
        return Response.status(status).entity(errorCodeToErrorResponse(code));
    }

    public static ErrorResponseDto reponseBodyToErrorCodeDetail(String responseBody){
        return new Gson().fromJson(responseBody,ErrorResponseDto.class);
    }
}
