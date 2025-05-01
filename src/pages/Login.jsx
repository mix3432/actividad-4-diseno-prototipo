import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const nav = useNavigate();

  const entrar = () => {
    // Simula login
    nav('/');
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80 space-y-4">
        <h1 className="text-xl font-bold">Iniciar sesión</h1>
        <input
          type="email"
          placeholder="Correo"
          className="w-full border p-2 rounded"
          value={email} onChange={e=>setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full border p-2 rounded"
          value={pw} onChange={e=>setPw(e.target.value)}
        />
        <button onClick={entrar} className="w-full bg-indigo-600 text-white p-2 rounded">Entrar</button>
      </div>
    </div>
  );
}
