import axios from 'axios';

// Configurar la base URL de tu API Quarkus
const API_BASE_URL = 'http://localhost:8080'; // Cambié el puerto a 8080 que es el de Quarkus

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tipos de datos (ajusta según tu backend)
export interface Paciente {
  id?: number;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  email: string;
  fechaNacimiento: string;
}

export interface Medico {
  nombreMedico: string;
  totalCitas: number;
  canceladas: number;
  atendidas: number;
  programadas: number;
}

export interface Cita {
  mes: string;
  estadoCita: string;
  totalCitas: number;
}

// Agregar esta interfaz junto con las otras
export interface Hospital {
  estadoCita: string;
  nombreHospital: string;
  totalCitas: number;
}

export interface Fecha {
  id: number;
  fecha: string;
}

export interface HospitalCatalogo {
  id: number;
  nombre: string;
}

export interface MedicoCatalogo {
  id: number;
  nombre: string;
}

export interface PacienteCatalogo {
  id: number;
  nombre: string;
}

export interface CrearCitaRequest {
  idFecha: number;
  idHospital: number;
  idMedico: number;
  idPaciente: number;
}

export interface ActualizarCitaRequest {
  id: number;
  idFecha: number;
  idHospital: number;
  idMedico: number;
  idPaciente: number;
}

// Servicios para Pacientes
export const pacienteService = {
  getAll: () => api.get<Paciente[]>('/api/pacientes'),
  getById: (id: number) => api.get<Paciente>(`/api/pacientes/${id}`),
  create: (paciente: Paciente) => api.post<Paciente>('/api/pacientes', paciente),
  update: (id: number, paciente: Paciente) => api.put<Paciente>(`/api/pacientes/${id}`, paciente),
  delete: (id: number) => api.delete(`/api/pacientes/${id}`),
};

// Servicios para Médicos
export const medicoService = {
  // Endpoint específico que mencionaste
  getEstadisticas: () => api.get<Medico[]>('/Inicio/medicos'),
  getAll: () => api.get<Medico[]>('/api/medicos'),
  getById: (id: number) => api.get<Medico>(`/api/medicos/${id}`),
  create: (medico: Medico) => api.post<Medico>('/api/medicos', medico),
  update: (id: number, medico: Medico) => api.put<Medico>(`/api/medicos/${id}`, medico),
  delete: (id: number) => api.delete(`/api/medicos/${id}`),
};

// Servicios para Citas
export const citaService = {
  getAll: () => api.get<Cita[]>('/citas'),
  getById: (id: number) => api.get<Cita>(`/citas/${id}`),
  create: (cita: Cita) => api.post<Cita>('/citas', cita),
  update: (id: number, cita: Cita) => api.put<Cita>(`/citas/${id}`, cita),
  delete: (id: number) => api.delete(`/citas/${id}`),
  // Nuevo método para estadísticas
  getEstadisticas: () => api.get<Cita[]>('/Inicio/citas'),
};

// Agregar este servicio junto con los otros
export const hospitalService = {
  getEstadisticas: () => api.get<Hospital[]>('/Inicio/hospitales'),
};

export const fechaService = {
  getAll: () => api.get<Fecha[]>('/catalogos/fechas'),
};

export const hospitalCatalogoService = {
  getAll: () => api.get<HospitalCatalogo[]>('/catalogos/hospitales'),
};

export const medicoCatalogoService = {
  getAll: () => api.get<MedicoCatalogo[]>('/catalogos/medicos'),
};

export const pacienteCatalogoService = {
  getAll: () => api.get<PacienteCatalogo[]>('/catalogos/pacientes'),
};

export const crearCitaService = {
  crear: (data: CrearCitaRequest) => api.post('/Inicio/crear', data),
};

export const actualizarCitaService = {
  actualizar: (data: ActualizarCitaRequest) => api.put('/Inicio/actualizar', data),
};

export default api;
