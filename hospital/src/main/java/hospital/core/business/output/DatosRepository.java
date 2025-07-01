package hospital.core.business.output;

import hospital.core.entity.Catalogos;
import hospital.core.entity.Cita;
import hospital.core.entity.Datos;

import java.util.List;
import java.util.Optional;

public interface DatosRepository {
    List<Datos> findCitasWithEstadoAndMes();
    List<Datos> findHospitalWithCitasConteo();
    List<Datos> findMedicosWithEstadoCitasConteo();
    void save(Cita entity);
    List<Catalogos>findFechas();
    List<Catalogos>findMedicos();
    List<Catalogos>findHospital();
    List<Catalogos>findPacientes();
    Boolean existWithIdCita(Integer idCita);
}
