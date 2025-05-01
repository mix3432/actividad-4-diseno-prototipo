import { useEffect, useMemo, useRef } from 'react';
import { useNavigate, useLocation }    from 'react-router-dom';
import { useCarrito }   from '../context/CarritoContext';
import { useVentas }    from '../context/VentasContext';

const currency = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

const COLOR_PRIMARY  = '#7555FF';
const COLOR_LAVENDER = '#F3F0FF';
const COLOR_TRASH    = '#6B7280';

export default function ResumenVenta() {
  const { carrito, clearCarrito, removeFromCart } = useCarrito();
  const { addVenta } = useVentas();
  const navigate     = useNavigate();
  const location     = useLocation();

  /* Flag para saber si estamos finalizando ahora mismo */
  const finalizandoRef = useRef(false);

  /* Redirige a /venta solo si NO estamos finalizando */
  useEffect(() => {
    if (
      carrito.length === 0 &&
      location.pathname === '/resumen' &&
      !finalizandoRef.current
    ) {
      navigate('/venta', { replace: true });
    }
  }, [carrito, location.pathname, navigate]);

  /* Normaliza items */
  const items = useMemo(
    () =>
      carrito.map((raw, idx) => ({
        id:        raw.codigo   ?? raw.id ?? idx,
        nombre:    raw.producto ?? raw.nombre ?? '—',
        cantidad:  raw.cantidad ?? raw.qty  ?? 0,
        precio:    raw.precio   ?? raw.price ?? 0
      })),
    [carrito]
  );

  const total = items.reduce((s, i) => s + i.cantidad * i.precio, 0);

  /* ------------ FINALIZAR ------------ */
  const finalizar = () => {
    finalizandoRef.current = true;              // evita redirección del useEffect

    const venta = {
      id:    crypto.randomUUID(),
      fecha: new Date().toISOString(),
      items,
      total
    };

    addVenta(venta);                            // persiste
    navigate(`/venta-exitosa/${venta.id}`, {
      state: venta                              // pasa la venta inmediatamente
    });
    clearCarrito();                             // ahora sí vacía
  };

  const cancelar   = () => { clearCarrito(); navigate('/venta-cancelada'); };
  const removeItem = codigo => removeFromCart(codigo);

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-4xl mx-auto px-8 py-10 space-y-8">
      <h1 className="text-2xl font-bold">Resumen del Carrito</h1>
      <p className="text-sm text-gray-500">
        Verifica los productos antes de finalizar la venta
      </p>

      {/* Tabla */}
      <div className="overflow-x-auto">
        {items.length === 0 ? (
          <p className="text-gray-500">El carrito está vacío…</p>
        ) : (
          <table className="min-w-full text-sm">
            <thead style={{ backgroundColor: COLOR_LAVENDER }}>
              <tr>
                <th className="p-3 text-left">Producto</th>
                <th className="p-3 text-center">Cantidad</th>
                <th className="p-3 text-right">Total</th>
                <th className="p-3 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {items.map(({ id, nombre, cantidad, precio }) => (
                <tr key={id} className="border-b last:border-none">
                  <td className="p-3">{nombre}</td>
                  <td className="p-3 text-center">{cantidad}</td>
                  <td className="p-3 text-right">
                    {currency.format(precio * cantidad)}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => removeItem(id)}
                      aria-label="Eliminar"
                      style={{ color: COLOR_TRASH }}
                      className="hover:text-red-600 transition-colors"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Total y botones */}
      <div className="text-right text-lg font-semibold">
        Total:&nbsp;{currency.format(total)}
      </div>

      <div className="flex gap-4">
        <button
          onClick={finalizar}
          disabled={!items.length}
          style={{ backgroundColor: COLOR_PRIMARY }}
          className="text-white px-5 py-2 rounded-lg disabled:opacity-50 hover:brightness-110"
        >
          Finalizar Venta
        </button>

        <button
          onClick={cancelar}
          style={{ backgroundColor: COLOR_LAVENDER, color: COLOR_PRIMARY }}
          className="px-5 py-2 rounded-lg hover:brightness-105"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
