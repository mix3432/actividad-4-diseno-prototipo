import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function VentaCancelada() {
  const nav = useNavigate();
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Venta cancelada</h1>
      <p>No se guardó ninguna venta.</p>
      <button onClick={()=>nav('/')} className="bg-indigo-600 text-white px-4 py-2 rounded">Ir al inicio</button>
    </div>
  );
}
