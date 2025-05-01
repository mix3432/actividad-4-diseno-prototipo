// src/App.js
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout          from './components/Layout';
import Bienvenido      from './pages/Bienvenido';
import NuevaVenta      from './pages/NuevaVenta';
import ResumenVenta    from './pages/ResumenVenta';
import VentaExitosa    from './pages/VentaExitosa';
import VentaCancelada  from './pages/VentaCancelada';
import Historial       from './pages/Historial';
import Inventario      from './pages/Inventario';
import ErrorProducto   from './pages/ErrorProducto';
import Confirmaciones  from './pages/Confirmaciones';
import Login           from './pages/Login';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Bienvenido />} />
        <Route path="venta"            element={<NuevaVenta />} />
        <Route path="resumen"          element={<ResumenVenta />} />
        <Route path="venta-exitosa/:id" element={<VentaExitosa />} />
        <Route path="venta-cancelada"  element={<VentaCancelada />} />
        <Route path="historial"        element={<Historial />} />
        <Route path="inventario"       element={<Inventario />} />
        <Route path="errores"          element={<ErrorProducto />} />
        <Route path="confirmaciones"   element={<Confirmaciones />} />
        {/* 404 → redirige a inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      {/* Ruta pública de login (fuera del layout principal) */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
