package util.annotations;

import java.lang.annotation.*;

/**
 * Anotación personalizada para formatear fechas en parámetros tipo LocalDate desde query params.
 */
@Target({ElementType.PARAMETER, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface ParamLocalDateFormat {
    /**
     * Define el patrón que se usará para parsear la fecha desde el query param.
     * <p>
     * Formatos permitidos por defecto:
     * <ul>
     *     <li>dd/MM/yyyy</li>
     *     <li>dd-MM-yyyy</li>
     *     <li>yyyy-MM-dd</li>
     * </ul>
     * Si no se especifica, se usará {@code dd/MM/yyyy} como valor por defecto.
     */
    String value();
}
