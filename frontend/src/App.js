import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import Home from './pages/Home.tsx';
import Pacientes from './pages/Pacientes.tsx';
import Medicos from './pages/Medicos.tsx';
import Hospitales from './pages/Hospitales.tsx';
import Citas from './pages/Citas.tsx';
import FormularioCita from './pages/FormularioCita.tsx'; // Nueva importación
import ActualizarCita from './pages/ActualizarCita.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="pacientes" element={<Pacientes />} />
          <Route path="medicos" element={<Medicos />} />
          <Route path="hospitales" element={<Hospitales />} />
          <Route path="citas" element={<Citas />} />
          <Route path="crear-cita" element={<FormularioCita />} /> {/* Nueva ruta */}
          <Route path="actualizar-cita" element={<ActualizarCita />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
