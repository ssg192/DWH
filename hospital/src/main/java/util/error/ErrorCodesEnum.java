package util.error;

public enum ErrorCodesEnum {

    RNS001("Campo Obligatorio"),
    RNS002("Formato de correo no valido con el formato"),
    RNS003("Formato de contraseña no valido con el formato"),
    RNS004("Rol no encontrado"),
    RNS005("Usuario no encontrado"),
    RNS006("Correo no encontrado"),
    RNS007("Contraseña no valida"),

    RNN001("Unicidad de elementos"),
    ERROR("Error inesperado"),

    INVALID_LINK("Liga no vigente"),
    BAD_REQUEST("Error en la petición"),
    NOT_FOUND("Recurso no encontrado"),
    NEW_LINK("Nueva liga para registrar contraseña"),
    CAPA_PERSISTENCIA("Error en la capa de persistencia"),
    ERROR_EN_COMUNICACIONES("Error en la capa de comunicaciones");

    private final String detail;

    ErrorCodesEnum(String detail) {
        this.detail = detail;
    }

    public String getName() {
        return this.name();
    }

    public String getDetail() {
        return detail;
    }

}
