package util;

public class StringConstants {
    public static final String ESPACIO_BLANCO = " ";
    public static final String DIAGONAL = "/";
    public static final String COMA_ESPACIO = ", ";
    public static final String LOCAL_DATE_TIME_FORMAT = "dd/MM/yyyy HH:mm:ss";
    public static final String LOCAL_DATE_TIME_FORMAT_WITHOUT_SECONDS = "dd/MM/yyyy HH:mm";
    public static final String LOCAL_DATE_TIME_FILES_FORMAT = "ddMMyyyyHHmmss";
    public static final String LOCAL_DATE_FORMAT = "dd/MM/yyyy";
    public static final String LOCAL_TIME_FORMAT = "HH:mm";
    public static final String LOCAL_TIME_COMPLETE_FORMAT = "HH:mm:ss";
    public static final String GUION_MEDIO = "-";
    public static final String GUION_MEDIO_ESPACIOS = " - ";
    public static final String GUION_BAJO = "_";
    public static final String OPERACION_EXITOSA = "Operación exitosa";
    public static final String OPERACION_ERRONEA = "Error en la operación";
    public static final String ZONED_DATE_TIME_FORMAT_LEGADO = "yyyy-MM-dd'T'HH:mm:ss.SSSZ";
    public static final String SUCCESS = "SUCCESS";
    public static final String VALIDATE_TOKEN_SERVICE = "validate-token-service";
    public static final String AUTH = "auth";
    public static final String NA = "N/A";
    public static final String SIN_DIRECCION = "Sin dirección registrada";
    public static final String ERROR_EN_S3 = "Error en S3";
    public static final String REGISTRO_SUSTENTANTES = "Registro_sustentantes";
    public static final String SIN_NUMERO_APROBACION = "Sin Número de Aplicación";
    public static final String PUNTO = ".";
    public static final String DIA_UNICO_ACTIVIDAD = " programada para el día ";
    public static final String MULTIPLE_DIAS_ACTIVIDAD = " programada del ";
    public static final String SIN_PROGRAMA_ASIGNADO = "Sin programa asignado";
    public static final String AL = " al ";
    public static final String AMARILLO = "#ed9d2a";
    public static final String VERDE = "#318914";
    public static final String MORADO = "#5c09c5";
    public static final String DOS_PUNTOS = ":";
    public static final String OBLIGATORIO = "Obligatorio";
    public static final String OPCIONAL = "Opcional";
    public static final String TODOS = "Todos";
    public static final String ERROR_S3_GATEWAY = "Error S3Gateway";
    public static final String CSV_EXTENSION = ".csv";
    public static final String PDF_EXTENSION = ".pdf";
    public static final String CSV_DELIMITER = "|";//No puede ser igual a CSV_SEPARATOR
    public static final String CSV_DELIMITER_REGEX = "\\|";//No puede ser igual a CSV_SEPARATOR
    public static final String CSV_SEPARATOR = "/";
    public static final String LOCAL_DATE_ISO_FORMAT= "dd/MM/yyyy";//No puede ser igual a CSV_DELIMITER

    private StringConstants() {
        super();
    }
}
