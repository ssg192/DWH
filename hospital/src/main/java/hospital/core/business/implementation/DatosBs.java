package hospital.core.business.implementation;

import hospital.core.business.input.DatosService;
import hospital.core.business.output.DatosRepository;
import hospital.core.entity.Catalogos;
import hospital.core.entity.Cita;
import hospital.core.entity.Datos;
import io.vavr.control.Either;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import util.error.ErrorCodesEnum;

import java.util.List;

@ApplicationScoped
public class DatosBs implements DatosService {

    private final DatosRepository datosRepository;

    @Inject
    public DatosBs(DatosRepository datosRepository) {
        this.datosRepository = datosRepository;
    }

    @Override
    public List<Datos> listCitasWithEstadoAndMes() {
       return datosRepository.findCitasWithEstadoAndMes();
    }

    @Override
    public List<Datos> listHospitalWithCitasConteo() {
        return datosRepository.findHospitalWithCitasConteo();
    }

    @Override
    public List<Datos> listMedicosWithEstadoCitasConteo() {
        return datosRepository.findMedicosWithEstadoCitasConteo();
    }

    @Override
    public Either<ErrorCodesEnum, Boolean> create(Cita entity) {
        if (entity == null) {
            return Either.left(ErrorCodesEnum.RNS001);
        }
        entity.setIdEstado(1);
        datosRepository.save(entity);
        return Either.right(true);
    }

    @Override
    public List<Catalogos> listFechas() {
        return datosRepository.findFechas();
    }

    @Override
    public List<Catalogos> listMedicos() {
        return datosRepository.findMedicos();
    }

    @Override
    public List<Catalogos> listHospital() {
        return datosRepository.findHospital();
    }

    @Override
    public List<Catalogos> listPacientes() {
        return datosRepository.findPacientes();
    }

    @Override
    public Either<ErrorCodesEnum, Boolean> update(Cita entity) {
        if (Boolean.FALSE.equals(datosRepository.existWithIdCita(entity.getIdCita()))){
            return Either.left(ErrorCodesEnum.NOT_FOUND);
        }
        datosRepository.save(entity);
        return Either.right(true);
    }

}
