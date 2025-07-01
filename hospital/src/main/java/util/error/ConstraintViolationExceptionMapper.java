package util.error;

import jakarta.validation.ConstraintViolationException;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

import java.util.List;
import java.util.stream.Collectors;

@Provider
public class ConstraintViolationExceptionMapper implements ExceptionMapper<ConstraintViolationException> {
    /**
     * Interceptor para el mapeo de errores de formato en los dto
     *
     * @param e Validación que no se cumplio
     * @return Devuelve una respuesta con codigo 400 y la lista de campos no validos
     */
    @Override
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response toResponse(ConstraintViolationException e) {
        var response = new ErrorResponseDto();
        List<ErrorDetailDto> errores = e.getConstraintViolations().stream()
                .map(ErrorMapper::constraintToError).collect(Collectors.toList());
        response.setDetails(errores);
        return Response.status(Response.Status.BAD_REQUEST).entity(response).build();
    }
}
