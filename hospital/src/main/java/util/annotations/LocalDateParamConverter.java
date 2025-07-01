package util.annotations;

import jakarta.ws.rs.BadRequestException;
import jakarta.ws.rs.ext.ParamConverter;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;


public class LocalDateParamConverter implements ParamConverter<LocalDate> {


    private final DateTimeFormatter formatter ;
    private final String pattern;

    public LocalDateParamConverter(String pattern) {
        this.pattern = pattern;
        this.formatter = DateTimeFormatter.ofPattern(pattern);
    }
    @Override
    public LocalDate fromString(String value) {
        if (value == null || value.trim().isEmpty()) return null;
        try {
            return LocalDate.parse(value, formatter);
        } catch (DateTimeParseException e) {
            throw new BadRequestException("CDA-RN-N0XX: La fecha debe tener el formato " + pattern);
        }
    }

    @Override
    public String toString(LocalDate value) {
        return (value == null) ? null : formatter.format(value);
    }
}
