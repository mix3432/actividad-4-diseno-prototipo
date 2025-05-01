// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="flex min-h-screen">
      {/* Tu sidebar */}
      <Sidebar />

      {/* Área principal */}
      <main className="flex-1 bg-gray-50 p-6">
        {/* Aquí salen todas las páginas hijas */}
        <Outlet />
      </main>
    </div>
  );
}
