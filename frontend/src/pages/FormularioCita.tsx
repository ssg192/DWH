import React, { useState, useEffect } from 'react';
import {
  fechaService,
  hospitalCatalogoService,
  medicoCatalogoService,
  pacienteCatalogoService,
  crearCitaService,
  Fecha,
  HospitalCatalogo,
  MedicoCatalogo,
  PacienteCatalogo,
  CrearCitaRequest
} from '../services/api.ts';

const FormularioCita: React.FC = () => {
  // Estados para los datos de los catálogos
  const [fechas, setFechas] = useState<Fecha[]>([]);
  const [hospitales, setHospitales] = useState<HospitalCatalogo[]>([]);
  const [medicos, setMedicos] = useState<MedicoCatalogo[]>([]);
  const [pacientes, setPacientes] = useState<PacienteCatalogo[]>([]);

  // Estados para el formulario
  const [formData, setFormData] = useState<CrearCitaRequest>({
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

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value, 10) || 0,
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
    return formData.idFecha > 0 && 
           formData.idHospital > 0 && 
           formData.idMedico > 0 && 
           formData.idPaciente > 0;
  };

  // Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      setError('Por favor, selecciona todos los campos obligatorios');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      setSuccess(null);

      await crearCitaService.crear(formData);
      
      setSuccess('¡Cita creada exitosamente!');
      setFormData({
        idFecha: 0,
        idHospital: 0,
        idMedico: 0,
        idPaciente: 0,
      });
    } catch (err) {
      setError('Error al crear la cita. Por favor, intenta nuevamente.');
      console.error('Error creating cita:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Limpiar mensajes después de un tiempo
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando formulario...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 bg-blue-600 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-white">Crear Nueva Cita</h1>
            <p className="text-blue-100 mt-1">Completa todos los campos para programar una cita médica</p>
          </div>

          {/* Mensajes de estado */}
          {error && (
            <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="mx-6 mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-800">{success}</p>
                </div>
              </div>
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Seleccionar Fecha */}
            <div>
              <label htmlFor="idFecha" className="block text-sm font-medium text-gray-700 mb-2">
                Fecha *
              </label>
              <select
                id="idFecha"
                name="idFecha"
                value={formData.idFecha}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value={0}>Selecciona una fecha</option>
                {fechas.map((fecha) => (
                  <option key={fecha.id} value={fecha.id}>
                    {formatFecha(fecha.fecha)}
                  </option>
                ))}
              </select>
            </div>

            {/* Seleccionar Hospital */}
            <div>
              <label htmlFor="idHospital" className="block text-sm font-medium text-gray-700 mb-2">
                Hospital *
              </label>
              <select
                id="idHospital"
                name="idHospital"
                value={formData.idHospital}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value={0}>Selecciona un hospital</option>
                {hospitales.map((hospital) => (
                  <option key={hospital.id} value={hospital.id}>
                    {hospital.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Seleccionar Médico */}
            <div>
              <label htmlFor="idMedico" className="block text-sm font-medium text-gray-700 mb-2">
                Médico *
              </label>
              <select
                id="idMedico"
                name="idMedico"
                value={formData.idMedico}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value={0}>Selecciona un médico</option>
                {medicos.map((medico) => (
                  <option key={medico.id} value={medico.id}>
                    {medico.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Seleccionar Paciente */}
            <div>
              <label htmlFor="idPaciente" className="block text-sm font-medium text-gray-700 mb-2">
                Paciente *
              </label>
              <select
                id="idPaciente"
                name="idPaciente"
                value={formData.idPaciente}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value={0}>Selecciona un paciente</option>
                {pacientes.map((paciente) => (
                  <option key={paciente.id} value={paciente.id}>
                    {paciente.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    idFecha: 0,
                    idHospital: 0,
                    idMedico: 0,
                    idPaciente: 0,
                  });
                  setError(null);
                  setSuccess(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={submitting}
              >
                Limpiar
              </button>
              <button
                type="submit"
                disabled={!isFormValid() || submitting}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <span className="animate-spin inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                    Creando...
                  </>
                ) : (
                  'Crear Cita'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioCita;
