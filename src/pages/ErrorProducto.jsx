import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ErrorProducto() {
  const nav = useNavigate();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Error de producto</h1>
      <div className="bg-red-50 p-4 rounded space-y-2">
        <p>No se pudo procesar el producto o la cantidad es inválida.</p>
        <button onClick={()=>nav('/venta')} className="bg-indigo-600 text-white px-4 py-2 rounded">Volver a venta</button>
      </div>
    </div>
  );
}
