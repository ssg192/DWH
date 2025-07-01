package util.annotations;

import jakarta.ws.rs.ext.ParamConverter;
import jakarta.ws.rs.ext.ParamConverterProvider;
import jakarta.ws.rs.ext.Provider;
import util.StringConstants;

import java.lang.annotation.Annotation;
import java.lang.reflect.Type;
import java.time.LocalDate;

@Provider
public class LocalDateConverterProvider implements ParamConverterProvider {

    @Override
    @SuppressWarnings("unchecked")
    public <T> ParamConverter<T> getConverter(Class<T> rawType, Type genericType, Annotation[] annotations) {
        if (!rawType.equals(LocalDate.class)) {
            return null;
        }

        for (Annotation annotation : annotations) {
            if (annotation.annotationType().equals(ParamLocalDateFormat.class)) {
                String pattern = ((ParamLocalDateFormat) annotation).value();

                if (!esFormatoValido(pattern)) {
                    throw new IllegalArgumentException("Formato de fecha no permitido: " + pattern +
                                                       ". Usa uno de: " + StringConstants.LOCAL_DATE_FORMAT + ", " +
                                                       StringConstants.LOCAL_DATE_ISO_FORMAT);
                }

                return (ParamConverter<T>) new LocalDateParamConverter(pattern);
            }
        }

        return null;
    }


    private boolean esFormatoValido(String pattern) {
        return pattern.equals(StringConstants.LOCAL_DATE_FORMAT)
                || pattern.equals(StringConstants.LOCAL_DATE_ISO_FORMAT);
    }
    private boolean tieneFormatoPersonalizado(Annotation[] annotations) {
        for (Annotation annotation : annotations) {
            if (annotation.annotationType().equals(ParamLocalDateFormat.class)) {
                return true;
            }
        }
        return false;
    }
}
