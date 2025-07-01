package util.error;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class ErrorCodeExceptionMapper implements ExceptionMapper<ErrorCodeException> {

    @Override
    public Response toResponse(ErrorCodeException errorCodeException) {
        return ErrorMapper.errorCodeToResponseBuilder(errorCodeException.getErrorCode()).build();
    }

}
