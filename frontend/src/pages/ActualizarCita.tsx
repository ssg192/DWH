import React, { useState, useEffect } from 'react';
import {
  fechaService,
  hospitalCatalogoService,
  medicoCatalogoService,
  pacienteCatalogoService,
  actualizarCitaService,
  Fecha,
  HospitalCatalogo,
  MedicoCatalogo,
  PacienteCatalogo,
  ActualizarCitaRequest
} from '../services/api.ts';

const ActualizarCita: React.FC = () => {
  // Estados para los datos de los catálogos
  const [fechas, setFechas] = useState<Fecha[]>([]);
  const [hospitales, setHospitales] = useState<HospitalCatalogo[]>([]);
  const [medicos, setMedicos] = useState<MedicoCatalogo[]>([]);
  const [pacientes, setPacientes] = useState<PacienteCatalogo[]>([]);

  // Estados para el formulario
  const [formData, setFormData] = useState<ActualizarCitaRequest>({
    id: 0,
    idFecha: 0,
    idHospital: 0,
    idMedico: 0,
    idPaciente: 0,
  });

  // Estados para UI
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Cargar todos los catálogos
  const fetchCatalogos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [fechasRes, hospitalesRes, medicosRes, pacientesRes] = await Promise.all([
        fechaService.getAll(),
        hospitalCatalogoService.getAll(),
        medicoCatalogoService.getAll(),
        pacienteCatalogoService.getAll(),
      ]);

      setFechas(fechasRes.data);
      setHospitales(hospitalesRes.data);
      setMedicos(medicosRes.data);
      setPacientes(pacientesRes.data);
    } catch (err) {
      setError('Error al cargar los datos del formulario');
      console.error('Error fetching catalogos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalogos();
  }, []);

  // Manejar cambios en los selects
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value, 10) || 0,
    }));
  };

  // Manejar cambio en el input de ID
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      id: parseInt(value, 10) || 0,
    }));
  };

  // Formatear fecha para mostrar
  const formatFecha = (fechaString: string) => {
    const fecha = new Date(fechaString + 'T00:00:00');
    return fecha.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Validar formulario
  const isFormValid = () => {
    return formData.id > 0 && 
           formData.idFecha > 0 && 
           formData.idHospital > 0 && 
           formData.idMedico > 0 && 
           formData.idPaciente > 0;
  };

  // Limpiar formulario
  const limpiarFormulario = () => {
    setFormData({
      id: 0,
      idFecha: 0,
      idHospital: 0,
      idMedico: 0,
      idPaciente: 0,
    });
    setError(null);
    setSuccess(null);
  };

  // Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      setError('Por favor, completa todos los campos obligatorios');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      setSuccess(null);

      await actualizarCitaService.actualizar(formData);
      
      setSuccess('¡Cita actualizada exitosamente!');
      
      // Limpiar formulario después del éxito
      setTimeout(() => {
        limpiarFormulario();
      }, 2000);
      
    } catch (err) {
      setError('Error al actualizar la cita. Por favor, intenta nuevamente.');
      console.error('Error updating cita:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Actualizar Cita</h1>
            <p className="text-gray-600">Modifica los datos de una cita existente</p>
          </div>

          {/* Mensajes de estado */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo ID */}
            <div>
              <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
                ID de la Cita *
              </label>
              <input
                type="number"
                id="id"
                name="id"
                value={formData.id || ''}
                onChange={handleIdChange}
                placeholder="Ingrese el ID de la cita a actualizar"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
                min="1"
              />
            </div>

            {/* Select Fecha */}
            <div>
              <label htmlFor="idFecha" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha *
              </label>
              <select
                id="idFecha"
                name="idFecha"
                value={formData.idFecha}
                onChange={handleSelectChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Selecciona una fecha</option>
                {fechas.map((fecha) => (
                  <option key={fecha.id} value={fecha.id}>
                    {formatFecha(fecha.fecha)}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Hospital */}
            <div>
              <label htmlFor="idHospital" className="block text-sm font-medium text-gray-700 mb-1">
                Hospital *
              </label>
              <select
                id="idHospital"
                name="idHospital"
                value={formData.idHospital}
                onChange={handleSelectChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Selecciona un hospital</option>
                {hospitales.map((hospital) => (
                  <option key={hospital.id} value={hospital.id}>
                    {hospital.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Médico */}
            <div>
              <label htmlFor="idMedico" className="block text-sm font-medium text-gray-700 mb-1">
                Médico *
              </label>
              <select
                id="idMedico"
                name="idMedico"
                value={formData.idMedico}
                onChange={handleSelectChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Selecciona un médico</option>
                {medicos.map((medico) => (
                  <option key={medico.id} value={medico.id}>
                    {medico.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Paciente */}
            <div>
              <label htmlFor="idPaciente" className="block text-sm font-medium text-gray-700 mb-1">
                Paciente *
              </label>
              <select
                id="idPaciente"
                name="idPaciente"
                value={formData.idPaciente}
                onChange={handleSelectChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Selecciona un paciente</option>
                {pacientes.map((paciente) => (
                  <option key={paciente.id} value={paciente.id}>
                    {paciente.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={!isFormValid() || submitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition duration-200"
              >
                {submitting ? (
                  <>
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                    Actualizando...
                  </>
                ) : (
                  'Actualizar Cita'
                )}
              </button>
              
              <button
                type="button"
                onClick={limpiarFormulario}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
              >
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ActualizarCita;
