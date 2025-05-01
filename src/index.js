// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

/* Enrutador y contextos globales */
import { BrowserRouter }      from 'react-router-dom';
import { InventarioProvider } from './context/InventarioContext';
import { VentasProvider }     from './context/VentasContext';
import { CarritoProvider }    from './context/CarritoContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <InventarioProvider>
      <VentasProvider>
        <CarritoProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CarritoProvider>
      </VentasProvider>
    </InventarioProvider>
  </React.StrictMode>
);
