import React, { useState, useEffect } from 'react';
import { hospitalService, Hospital } from '../services/api.ts';

const Hospitales: React.FC = () => {
  const [hospitales, setHospitales] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener los datos de hospitales
  const fetchHospitales = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await hospitalService.getEstadisticas();
      setHospitales(response.data);
    } catch (err) {
      setError('Error al cargar los datos de los hospitales');
      console.error('Error fetching hospitales:', err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchHospitales();
  }, []);

  // Agrupar datos por hospital
  const hospitalesAgrupados = hospitales.reduce((acc, item) => {
    const hospital = acc.find(h => h.nombre === item.nombreHospital);
    if (hospital) {
      hospital.citas.push({
        estado: item.estadoCita,
        total: item.totalCitas
      });
      hospital.totalGeneral += item.totalCitas;
    } else {
      acc.push({
        nombre: item.nombreHospital,
        totalGeneral: item.totalCitas,
        citas: [{
          estado: item.estadoCita,
          total: item.totalCitas
        }]
      });
    }
    return acc;
  }, [] as Array<{
    nombre: string;
    totalGeneral: number;
    citas: Array<{ estado: string; total: number }>;
  }>);

  // Calcular estadísticas globales
  const totalHospitales = hospitalesAgrupados.length;
  const totalCitasGlobal = hospitales.reduce((sum, item) => sum + item.totalCitas, 0);
  const citasPorEstado = hospitales.reduce((acc, item) => {
    acc[item.estadoCita] = (acc[item.estadoCita] || 0) + item.totalCitas;
    return acc;
  }, {} as Record<string, number>);

  // Función para obtener color según el estado
  const getEstadoColor = (estado: string) => {
    switch (estado.toLowerCase()) {
      case 'atendida':
        return 'bg-green-100 text-green-800';
      case 'cancelada':
        return 'bg-red-100 text-red-800';
      case 'programada':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando hospitales...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchHospitales}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Hospitales</h1>
              <p className="mt-2 text-gray-600">
                Gestión y estadísticas de hospitales del sistema
              </p>
            </div>
            <button
              onClick={fetchHospitales}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Actualizar
            </button>
          </div>
        </div>

        {/* Estadísticas Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-sm">🏥</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Hospitales</p>
                <p className="text-2xl font-semibold text-gray-900">{totalHospitales}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-sm">📊</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Citas</p>
                <p className="text-2xl font-semibold text-gray-900">{totalCitasGlobal}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-sm">✅</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Citas Atendidas</p>
                <p className="text-2xl font-semibold text-gray-900">{citasPorEstado['Atendida'] || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-sm">❌</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Citas Canceladas</p>
                <p className="text-2xl font-semibold text-gray-900">{citasPorEstado['Cancelada'] || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de Hospitales */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Lista de Hospitales
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Información detallada de citas por hospital
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hospital
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado de Cita
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Citas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Porcentaje
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {hospitales.map((hospital, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium text-sm">
                              🏥
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {hospital.nombreHospital}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(hospital.estadoCita)}`}>
                        {hospital.estadoCita}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <span className="text-blue-600 font-semibold">
                        {hospital.totalCitas}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ 
                              width: `${(hospital.totalCitas / totalCitasGlobal) * 100}%` 
                            }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {((hospital.totalCitas / totalCitasGlobal) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {hospitales.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-4xl mb-4">🏥</div>
              <p className="text-gray-500">No hay hospitales registrados</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hospitales;
