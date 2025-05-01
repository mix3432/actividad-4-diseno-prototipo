// src/pages/NuevaVenta.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useInventario } from '../context/InventarioContext';
import { useCarrito } from '../context/CarritoContext';

export default function NuevaVenta() {
  const { productos } = useInventario();        // <-- correcto
  const { carrito, addToCart } = useCarrito();  // <-- carrito y addToCart
  const [codigo, setCodigo] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const agregar = () => {
    // Buscamos en 'productos', no en 'products'
    const prod = productos.find(
      p =>
        p.codigo.toLowerCase() === codigo.trim().toLowerCase() ||
        p.producto.toLowerCase() === codigo.trim().toLowerCase()
    );
    if (!prod) {
      setError('Producto no encontrado');
      return;
    }
    if (cantidad <= 0) {
      setError('Cantidad debe ser mayor que cero');
      return;
    }
    if (cantidad > prod.stock) {
      setError('No hay stock suficiente');
      return;
    }

    addToCart({
      codigo: prod.codigo,
      producto: prod.producto,
      cantidad,
      precio: prod.precio,
    });

    setCodigo('');
    setCantidad(1);
    setError('');
  };

  const continuar = () => {
    if (carrito.length === 0) {
      setError('Agrega al menos un producto');
      return;
    }
    navigate('/resumen');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Nueva Venta</h1>

      <div className="space-y-6">
        {/* Input Producto */}
        <div>
          <label className="block text-sm font-medium mb-1">Producto</label>
          <div className="relative">
            <input
              type="text"
              value={codigo}
              onChange={e => setCodigo(e.target.value)}
              placeholder="Nombre o código"
              className="w-full bg-gray-100 rounded-2xl py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <Search
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* Input Cantidad */}
        <div>
          <label className="block text-sm font-medium mb-1">Cantidad</label>
          <div className="relative">
            <input
              type="number"
              min="1"
              value={cantidad}
              onChange={e => setCantidad(Number(e.target.value))}
              placeholder="Cantidad"
              className="w-full bg-gray-100 rounded-2xl py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              #
            </span>
          </div>
        </div>

        {/* Botón Agregar */}
        <button
          onClick={agregar}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold shadow"
        >
          Agregar al carrito
        </button>

        {/* Error */}
        {error && <p className="text-red-600">{error}</p>}
      </div>

      {/* Vista previa del carrito */}
      {carrito.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Carrito ({carrito.length})</h2>
          <table className="w-full text-sm bg-white rounded-xl shadow overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Producto</th>
                <th className="p-3 text-center">Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item, idx) => (
                <tr key={idx} className="border-b last:border-0">
                  <td className="p-3">{item.producto}</td>
                  <td className="p-3 text-center">{item.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Botón Continuar */}
          <button
            onClick={continuar}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-semibold shadow"
          >
            Continuar a Resumen
          </button>
        </div>
      )}
    </div>
  );
}
