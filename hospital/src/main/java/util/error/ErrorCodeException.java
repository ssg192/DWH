package util.error;

import lombok.Getter;

import java.io.Serializable;

@Getter
public final class ErrorCodeException extends RuntimeException implements Serializable {

    private final transient ErrorCodesEnum errorCode;

    public ErrorCodeException(ErrorCodesEnum errorCode) {
        super(errorCode.getDetail());
        this.errorCode = errorCode;
    }

    public ErrorCodeException(String message) {
        super(message);
        this.errorCode = null;
    }

    public ErrorCodeException(String message, Throwable cause) {
        super(message, cause);
        this.errorCode = null;
    }

    public ErrorCodeException(Throwable cause) {
        super(cause);
        this.errorCode = null;
    }

}
