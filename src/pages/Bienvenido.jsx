// src/pages/Bienvenido.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, List } from 'lucide-react';

export default function Bienvenido() {
  const nav = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Bienvenido</h1>
      <p className="text-gray-600 mb-6">Selecciona una opción</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Card Realizar Venta */}
        <div
          onClick={() => nav('/venta')}
          className="flex flex-col items-start bg-indigo-50 p-6 rounded-2xl cursor-pointer hover:shadow-lg transition"
        >
          <div className="bg-indigo-100 p-3 rounded-lg mb-4">
            <ShoppingCart className="text-indigo-600" size={24} />
          </div>
          <h2 className="text-xl font-semibold mb-3">Realizar Venta</h2>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            Ir a Venta
          </button>
        </div>

        {/* Card Ver Historial */}
        <div
          onClick={() => nav('/historial')}
          className="flex flex-col items-start bg-indigo-50 p-6 rounded-2xl cursor-pointer hover:shadow-lg transition"
        >
          <div className="bg-indigo-100 p-3 rounded-lg mb-4">
            <List className="text-indigo-600" size={24} />
          </div>
          <h2 className="text-xl font-semibold mb-3">Ver Historial</h2>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            Ver Historial
          </button>
        </div>
      </div>
    </div>
  );
}
