package hospital.external.rest.controller;


import hospital.core.business.input.DatosService;
import hospital.external.rest.dto.*;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.enums.SchemaType;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import util.error.ErrorMapper;

@Path("Inicio")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class DatosController {

    private final DatosService datosService;

    @Inject
    public DatosController(DatosService datosService) {
        this.datosService = datosService;
    }

    @GET
    @Path("citas")
    @APIResponse(responseCode = "200", description = "Petición exitosa", content = @Content(schema = @Schema(type = SchemaType.ARRAY, implementation = CitasWithEstadoAndMesDTO.class)))
    public Response listCitasWithEstadoAndMes() {
        return Response.ok(datosService.listCitasWithEstadoAndMes().stream().map(CitasWithEstadoAndMesDTO::fromEntity)).build();
    }

    @GET
    @Path("hospitales")
    @APIResponse(responseCode = "200", description = "Petición exitosa", content = @Content(schema = @Schema(type = SchemaType.ARRAY, implementation = listHospitalWithCitasConteoDTO.class)))
    public Response listHospitalWithCitasConteo() {
        return Response.ok(datosService.listHospitalWithCitasConteo().stream().map(listHospitalWithCitasConteoDTO::fromEntity)).build();
    }


    @GET
    @Path("medicos")
    @APIResponse(responseCode = "200", description = "Petición exitosa", content = @Content(schema = @Schema(type = SchemaType.ARRAY, implementation = listMedicosWithEstadoCitasConteoDTO.class)))
    public Response listMedicosWithEstadoCitasConteo() {
        return Response.ok(datosService.listMedicosWithEstadoCitasConteo().stream().map(listMedicosWithEstadoCitasConteoDTO::fromEntity)).build();
    }

    @POST
    @Path("crear")
    @APIResponse(responseCode = "200", description = "Petición exitosa", content = @Content(schema = @Schema(implementation = Boolean.class)))
    public Response create(@Valid CitaDTO citaDTO) {
        return datosService.create(citaDTO.toEntity())
                .map(Response::ok).getOrElseGet(ErrorMapper::errorCodeToResponseBuilder).build();
    }

    @PUT
    @Path("actualizar")
    @APIResponse(responseCode = "200", description = "Petición exitosa", content = @Content(schema = @Schema(implementation = Boolean.class)))
    public Response update(@Valid UpdateCitaDTO updateCitaDTO) {
        return datosService.update(updateCitaDTO.toEntity()).map(Response::ok).getOrElseGet(ErrorMapper::errorCodeToResponseBuilder).build();
    }
}
