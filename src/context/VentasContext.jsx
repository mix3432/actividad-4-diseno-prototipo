import React, { createContext, useContext, useState, useEffect } from 'react';

const VentasContext = createContext();
const KEY = 'banani:ventas';                      // ← localStorage

export function VentasProvider({ children }) {
  /* Carga inicial desde localStorage - siempre arreglo */
  const [ventas, setVentas] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }
  });

  /* Persiste cada cambio */
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(ventas));
  }, [ventas]);

  /* Guarda venta y devuelve el id generado */
  const addVenta = (venta) => {
    setVentas(prev => [...prev, venta]);
    return venta.id;
  };

  return (
    <VentasContext.Provider value={{ ventas, addVenta }}>
      {children}
    </VentasContext.Provider>
  );
}

export const useVentas = () => useContext(VentasContext);
