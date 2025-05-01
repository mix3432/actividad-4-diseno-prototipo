import { useVentas } from '../context/VentasContext';

export default function Historial() {
  const { ventas = [] } = useVentas() || {};   // evita undefined

  if (!ventas.length) {
    return (
      <div className="p-6 text-gray-500">
        Aún no hay ventas registradas…
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Historial de Ventas</h1>

      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 font-medium">
          <tr>
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Fecha</th>
            <th className="p-2 text-right">Total</th>
            <th className="p-2 text-right"># Productos</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map(v => (
            <tr key={v.id} className="border-b last:border-none">
              <td className="p-2">{v.id}</td>
              <td className="p-2">
                {new Date(v.fecha).toLocaleString('es-CO')}
              </td>
              <td className="p-2 text-right">
                {new Intl.NumberFormat('es-CO', {
                  style: 'currency', currency: 'COP', minimumFractionDigits: 0
                }).format(v.total)}
              </td>
              <td className="p-2 text-right">{v.items.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
