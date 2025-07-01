import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Sistema de Gestión Hospitalaria
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Gestiona pacientes, doctores y citas médicas de manera eficiente
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* <Link to="/pacientes" className="card hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-blue-600 mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Pacientes</h3>
              <p className="text-gray-600">Gestionar información de pacientes</p>
            </div>
          </Link> */}
          
          <Link to="/medicos" className="card hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-green-600 mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Doctores</h3>
              <p className="text-gray-600">Administrar personal médico</p>
            </div>
          </Link>
          
          <Link to="/citas" className="card hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-purple-600 mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Citas</h3>
              <p className="text-gray-600">Programar y gestionar citas médicas</p>
            </div>
          </Link>
          <Link to="/hospitales" className="card hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-blue-600 mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Hospitales</h3>
              <p className="text-gray-600">Estadísticas y datos de hospitales</p>
            </div>
          </Link>
          <Link to="/crear-cita" className="card hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-green-600 mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Crear Cita</h3>
              <p className="text-gray-600">Programar nueva cita médica</p>
            </div>
          </Link>
          <Link to="/actualizar-cita" className="card hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-orange-600 mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Actualizar Cita</h3>
              <p className="text-gray-600">Modificar datos de cita existente</p>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Home;
