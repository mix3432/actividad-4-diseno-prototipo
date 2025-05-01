import React from 'react';
import { useInventario } from '../context/InventarioContext';

export default function Confirmaciones() {
  const { productos } = useInventario();
  const sin = productos.filter(p=>p.stock<=0);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Confirmaciones</h1>
      <h2 className="font-semibold mb-2">Últimos productos vendidos</h2>
      {/* Aquí podrías mapear un estado de movimientos recientes */}
      <h2 className="font-semibold mt-6">Productos sin stock</h2>
      <ul className="list-disc ml-6 text-red-600">
        {sin.map(p=> <li key={p.codigo}>{p.nombre}</li>)}
      </ul>
    </div>
  );
}
