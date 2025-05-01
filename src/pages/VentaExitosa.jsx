// src/pages/VentaExitosa.jsx
import { useNavigate, useLocation } from 'react-router-dom';
import { generarRecibo } from '../utils/generarRecibo';

const currency = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0
});

export default function VentaExitosa() {
  const navigate         = useNavigate();
  const { state: venta } = useLocation();   // llega desde /resumen

  /* Si alguien entra directo sin state */
  if (!venta) {
    return (
      <div className="p-8 text-center space-y-4">
        <h1 className="text-2xl font-semibold text-red-600">
          Venta no encontrada
        </h1>
        <button onClick={() => navigate('/venta')} className="btn-primary">
          Ir a ventas
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-12 px-4 sm:px-0">
      <h1 className="text-4xl font-bold text-green-600 mb-8">
        ¡Venta completada!
      </h1>

      {/* Tarjeta */}
      <div className="w-full max-w-md bg-indigo-50 rounded-lg p-6 shadow-sm space-y-2">
        <p>
          <span className="font-semibold">Fecha:</span>&nbsp;
          {new Date(venta.fecha).toLocaleString('es-CO')}
        </p>
        <p>
          <span className="font-semibold">Total:</span>&nbsp;
          {currency.format(venta.total)}
        </p>
        <p>
          <span className="font-semibold">Productos:</span>&nbsp;
          {venta.items.length}
        </p>

        {/* Botones */}
        <div className="pt-4 flex gap-4">
          <button
            onClick={() =>
              generarRecibo({ ...venta, productos: venta.items })
            }
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:brightness-110 transition"
          >
            Ver recibo
          </button>

          <button
            onClick={() => navigate('/venta')}
            className="bg-purple-50 text-purple-600 px-4 py-2 rounded-lg hover:brightness-110 transition"
          >
            Nueva venta
          </button>
        </div>
      </div>
    </div>
  );
}
