import React, { useState, useEffect } from 'react';
import { citaService, CitaEstadistica } from '../services/api.ts';

interface CitasPorMes {
  mes: string;
  atendidas: number;
  canceladas: number;
  programadas: number;
  total: number;
}

const Citas: React.FC = () => {
  const [citas, setCitas] = useState<CitaEstadistica[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener los datos de citas
  const fetchCitas = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await citaService.getEstadisticas();
      setCitas(response.data);
    } catch (err) {
      setError('Error al cargar los datos de las citas');
      console.error('Error fetching citas:', err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchCitas();
  }, []);

  // Agrupar citas por mes
  const citasPorMes: CitasPorMes[] = citas.reduce((acc, cita) => {
    const mesExistente = acc.find(item => item.mes === cita.mes);
    
    if (mesExistente) {
      // Actualizar el mes existente
      switch (cita.estadoCita.toLowerCase()) {
        case 'atendida':
          mesExistente.atendidas = cita.totalCitas;
          break;
        case 'cancelada':
          mesExistente.canceladas = cita.totalCitas;
          break;
        case 'programada':
          mesExistente.programadas = cita.totalCitas;
          break;
      }
      mesExistente.total = mesExistente.atendidas + mesExistente.canceladas + mesExistente.programadas;
    } else {
      // Crear nuevo mes
      const nuevoMes: CitasPorMes = {
        mes: cita.mes,
        atendidas: 0,
        canceladas: 0,
        programadas: 0,
        total: 0
      };
      
      switch (cita.estadoCita.toLowerCase()) {
        case 'atendida':
          nuevoMes.atendidas = cita.totalCitas;
          break;
        case 'cancelada':
          nuevoMes.canceladas = cita.totalCitas;
          break;
        case 'programada':
          nuevoMes.programadas = cita.totalCitas;
          break;
      }
      
      nuevoMes.total = nuevoMes.atendidas + nuevoMes.canceladas + nuevoMes.programadas;
      acc.push(nuevoMes);
    }
    
    return acc;
  }, [] as CitasPorMes[]);

  // Calcular estadísticas globales
  const totalCitasGlobal = citasPorMes.reduce((sum, mes) => sum + mes.total, 0);
  const totalAtendidas = citasPorMes.reduce((sum, mes) => sum + mes.atendidas, 0);
  const totalCanceladas = citasPorMes.reduce((sum, mes) => sum + mes.canceladas, 0);
  const totalProgramadas = citasPorMes.reduce((sum, mes) => sum + mes.programadas, 0);

  // Función para obtener el porcentaje
  const getPorcentaje = (valor: number, total: number) => {
    return total > 0 ? ((valor / total) * 100).toFixed(1) : '0.0';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando estadísticas de citas...</p>
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
            onClick={fetchCitas}
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
              <h1 className="text-3xl font-bold text-gray-900">Citas Médicas</h1>
              <p className="mt-2 text-gray-600">
                Estadísticas mensuales de citas del sistema
              </p>
            </div>
            <button
              onClick={fetchCitas}
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
                  <span className="text-white text-sm">📅</span>
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
                  <span className="text-white text-sm">✅</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Atendidas</p>
                <p className="text-2xl font-semibold text-gray-900">{totalAtendidas}</p>
                <p className="text-xs text-green-600">{getPorcentaje(totalAtendidas, totalCitasGlobal)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">⏱️</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Programadas</p>
                <p className="text-2xl font-semibold text-gray-900">{totalProgramadas}</p>
                <p className="text-xs text-yellow-600">{getPorcentaje(totalProgramadas, totalCitasGlobal)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">❌</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Canceladas</p>
                <p className="text-2xl font-semibold text-gray-900">{totalCanceladas}</p>
                <p className="text-xs text-red-600">{getPorcentaje(totalCanceladas, totalCitasGlobal)}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cards por Mes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {citasPorMes.map((mesCitas, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{mesCitas.mes}</h3>
                <span className="text-2xl font-bold text-blue-600">{mesCitas.total}</span>
              </div>
              
              <div className="space-y-3">
                {/* Atendidas */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Atendidas</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 mr-2">{mesCitas.atendidas}</span>
                    <span className="text-xs text-green-600">
                      {getPorcentaje(mesCitas.atendidas, mesCitas.total)}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${getPorcentaje(mesCitas.atendidas, mesCitas.total)}%` }}
                  ></div>
                </div>

                {/* Programadas */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Programadas</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 mr-2">{mesCitas.programadas}</span>
                    <span className="text-xs text-yellow-600">
                      {getPorcentaje(mesCitas.programadas, mesCitas.total)}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full" 
                    style={{ width: `${getPorcentaje(mesCitas.programadas, mesCitas.total)}%` }}
                  ></div>
                </div>

                {/* Canceladas */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Canceladas</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 mr-2">{mesCitas.canceladas}</span>
                    <span className="text-xs text-red-600">
                      {getPorcentaje(mesCitas.canceladas, mesCitas.total)}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full" 
                    style={{ width: `${getPorcentaje(mesCitas.canceladas, mesCitas.total)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabla Detallada */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Resumen Detallado por Mes
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Información completa de citas agrupada por mes
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Atendidas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Programadas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Canceladas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Efectividad
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {citasPorMes.map((mesCitas, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium text-sm">
                              📅
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {mesCitas.mes}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {mesCitas.atendidas}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {mesCitas.programadas}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {mesCitas.canceladas}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <span className="text-blue-600 font-semibold">
                        {mesCitas.total}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ 
                              width: `${getPorcentaje(mesCitas.atendidas, mesCitas.total)}%` 
                            }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {getPorcentaje(mesCitas.atendidas, mesCitas.total)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {citasPorMes.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-4xl mb-4">📅</div>
              <p className="text-gray-500">No hay datos de citas disponibles</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Citas;
