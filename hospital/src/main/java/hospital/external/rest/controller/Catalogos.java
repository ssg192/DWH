package hospital.external.rest.controller;


import hospital.core.business.input.DatosService;
import hospital.external.rest.dto.FechasDTO;
import hospital.external.rest.dto.HospitalesDTO;
import hospital.external.rest.dto.MedicosDTO;
import hospital.external.rest.dto.PacientesDTO;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("catalogos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class Catalogos {

    private final DatosService  datosService;
    @Inject
    public Catalogos(DatosService datosService) {
        this.datosService = datosService;
    }

    @GET
    @Path("medicos")
    public Response listMedicos() {
        return  Response.ok(datosService.listMedicos().stream().map(MedicosDTO::fromEntity)).build();
    }


    @GET
    @Path("pacientes")
    public Response listPacientes() {
        return  Response.ok(datosService.listPacientes().stream().map(PacientesDTO::fromEntity)).build();
    }

    @GET
    @Path("fechas")
    public Response listFechas() {
        return  Response.ok(datosService.listFechas().stream().map(FechasDTO::fromEntity)).build();
    }


    @GET
    @Path("hospitales")
    public Response listHospitales() {
        return Response.ok(datosService.listHospital().stream().map(HospitalesDTO::fromEntity)).build();
    }
}
