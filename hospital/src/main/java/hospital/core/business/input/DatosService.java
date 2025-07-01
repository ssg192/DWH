package hospital.core.business.input;

import hospital.core.entity.Catalogos;
import hospital.core.entity.Cita;
import hospital.core.entity.Datos;
import io.vavr.control.Either;
import util.error.ErrorCodesEnum;

import java.util.List;

public interface DatosService {
    List<Datos> listCitasWithEstadoAndMes();
    List<Datos> listHospitalWithCitasConteo();
    List<Datos> listMedicosWithEstadoCitasConteo();
    Either<ErrorCodesEnum, Boolean> create(Cita entity);
    List<Catalogos>listFechas();
    List<Catalogos>listMedicos();
    List<Catalogos>listHospital();
    List<Catalogos>listPacientes();
    Either<ErrorCodesEnum, Boolean> update(Cita entity);

}
