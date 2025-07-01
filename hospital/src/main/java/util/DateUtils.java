package util;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.chrono.ChronoLocalDate;
import java.time.format.DateTimeFormatter;

public class DateUtils {

    public static final ZoneId DEFAULT_ZONE_ID = ZoneId.of("America/Mexico_City");
    public static final String LANGUAGE_TAG = "es-ES";

    private DateUtils() {
    }

    /**
     * Pasa de un object a un LocalDateTime
     *
     * @param fecha Objeto obtenido de la base de datos (timestamp)
     * @return Fecha transformada a LocalDateTime
     */
    public static LocalDateTime objectToLocalDateTime(Object fecha) {
        return ((Timestamp) fecha).toLocalDateTime();
    }

    /**
     * Pasa de un object a un LocalDateTime
     *
     * @param fecha Objeto obtenido de la base de datos (timestamp)
     * @return Fecha transformada a LocalDateTime
     */
    public static LocalDate objectToLocalDate(Object fecha) {
        return ((Timestamp) fecha).toLocalDateTime().toLocalDate();
    }

    public static LocalDate objectToLocalDateDate(Object fecha) {
        return ((Date) fecha).toLocalDate();
    }

    /**
     * Pasa de un object a un LocalDateTime
     *
     * @param fecha Objeto obtenido de la base de datos (timestamp)
     * @return Fecha transformada a LocalDateTime
     */
    public static LocalDate objectDateToLocalDate(Object fecha) {
        return ((Date) fecha).toLocalDate();
    }

    /**
     * Indica si una fecha se encuentra igual o antes que una otra fecha
     *
     * @param fechaReferencia Fecha referencia
     * @param fechaComparar
     * @return Si la fecha referencia se encuentra igual o antes que la fecha a comparar
     */
    public static boolean igualAntes(LocalDate fechaReferencia, LocalDate fechaComparar) {
        return fechaReferencia.isBefore(fechaComparar) || fechaReferencia.isEqual(fechaComparar);
    }

    /**
     * Indica si una fecha se encuentra igual o después que una otra fecha
     *
     * @param fechaReferencia Fecha referencia
     * @param fechaComparar
     * @return Si la fecha referencia se encuentra igual o después que la fecha a comparar
     */
    public static boolean igualDespues(ChronoLocalDate fechaReferencia, ChronoLocalDate fechaComparar) {
        return fechaReferencia.isAfter(fechaComparar) || fechaReferencia.isEqual(fechaComparar);
    }

    /**
     * Indica si una fecha se encuentra igual o antes que una otra fecha
     *
     * @param fechaReferencia Fecha referencia
     * @param fechaComparar
     * @return Si la fecha referencia se encuentra igual o antes que la fecha a comparar
     */
    public static boolean igualAntes(LocalDateTime fechaReferencia, LocalDateTime fechaComparar) {
        return fechaReferencia.isBefore(fechaComparar) || fechaReferencia.isEqual(fechaComparar);
    }

    /**
     * Indica si una fecha se encuentra igual o después que una otra fecha
     *
     * @param fechaReferencia Fecha referencia
     * @param fechaComparar
     * @return Si la fecha referencia se encuentra igual o después que la fecha a comparar
     */
    public static boolean igualDespues(LocalDateTime fechaReferencia, LocalDateTime fechaComparar) {
        return fechaReferencia.isAfter(fechaComparar) || fechaReferencia.isEqual(fechaComparar);
    }

    /**
     * Indica si una fecha se encuentra igual o antes que una otra fecha
     *
     * @param horaReferencia Fecha referencia
     * @param horaComparar
     * @return Si la fecha referencia se encuentra igual o antes que la fecha a comparar
     */
    public static boolean igualAntes(LocalTime horaReferencia, LocalTime horaComparar) {
        return horaReferencia.isBefore(horaComparar) || horaReferencia.equals(horaComparar);
    }

    /**
     * Indica si una fecha se encuentra igual o después que una otra fecha
     *
     * @param fechaReferencia Fecha referencia
     * @param fechaComparar
     * @return Si la fecha referencia se encuentra igual o después que la fecha a comparar
     */
    public static boolean igualDespues(LocalTime fechaReferencia, LocalTime fechaComparar) {
        return fechaReferencia.isAfter(fechaComparar) || fechaReferencia.equals(fechaComparar);
    }

    /**
     * Metodo cuya funcion es eliminar la parte de los segundo para un localDateTime.
     *
     * @param fechaParse
     * @return
     */
    public static LocalDateTime parseLocalDateTimeWithoutSeconds(LocalDateTime fechaParse) {
        var fechaString = fechaParse.format(DateTimeFormatter.ofPattern(StringConstants.LOCAL_DATE_TIME_FORMAT_WITHOUT_SECONDS));
        return LocalDateTime.parse(fechaString,
                DateTimeFormatter.ofPattern(StringConstants.LOCAL_DATE_TIME_FORMAT_WITHOUT_SECONDS));
    }

    public static String toStringFormat(LocalDateTime date, String localDateFormat) {
        return date.format(DateTimeFormatter.ofPattern(localDateFormat));
    }

    public static String toStringFormat(LocalDateTime date) {
        return date.format(DateTimeFormatter.ofPattern(StringConstants.LOCAL_DATE_FORMAT));
    }

    public static String toStringFormat(LocalDate date) {
        return date.format(DateTimeFormatter.ofPattern(StringConstants.LOCAL_DATE_FORMAT));
    }
}

