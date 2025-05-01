// src/context/CarritoContext.jsx
import React, { createContext, useContext, useState } from 'react';

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  /* ───────────── Añadimos el producto ───────────── */
  const addToCart = (item) => {
    console.log('[DEBUG] Item agregado al carrito:', item);
    setCarrito(prev => [...prev, item]);
  };

  /* ───────────── Elimina por “código” (o id de respaldo) ───────────── */
  const removeFromCart = (codigo) => {
    setCarrito(prev =>
      prev.filter(it =>
        (it.codigo ?? it.id ?? it.producto?.id) !== codigo
      )
    );
  };

  /* ───────────── Vacía todo el carrito ───────────── */
  const clearCarrito = () => setCarrito([]);

  return (
    <CarritoContext.Provider
      value={{ carrito, addToCart, removeFromCart, clearCarrito }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

/* Hook de conveniencia */
export const useCarrito = () => useContext(CarritoContext);
