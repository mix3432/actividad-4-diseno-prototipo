// src/context/InventarioContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const InventarioContext = createContext();

/* Clave única para localStorage (puedes cambiarla si lo prefieres) */
const KEY = 'inventario';

export function InventarioProvider({ children }) {
  /* Estado local: siempre comienza como arreglo */
  const [productos, setProductos] = useState([]);

  /* 1. Cargar inventario al montar (solo una vez) */
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(KEY)) || [];
      setProductos(stored);
    } catch {
      setProductos([]); // fallback seguro
    }
  }, []);

  /* 2. Persistir cada cambio de productos */
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(productos));
  }, [productos]);

  /* ------- API pública ------- */

  /** Descuenta stock de un producto según su código */
  const descontarStock = (codigo, cantidad) => {
    setProductos(prev =>
      prev.map(p =>
        p.codigo === codigo
          ? { ...p, stock: (p.stock || 0) - cantidad }
          : p
      )
    );
  };

  /** Reemplaza todo el inventario con un nuevo arreglo */
  const setNuevoInventario = (data) => setProductos(data);

  return (
    <InventarioContext.Provider
      value={{ productos, descontarStock, setNuevoInventario }}
    >
      {children}
    </InventarioContext.Provider>
  );
}

/* Hook seguro: evita crashes si el provider no está envuelto */
export const useInventario = () =>
  useContext(InventarioContext) ?? {
    productos: [],
    descontarStock: () => {},
    setNuevoInventario: () => {}
  };
