// src/pages/Inventario.jsx
import { useState } from 'react';
import { useInventario } from '../context/InventarioContext';
import { leerInventarioExcel } from '../utils/leerInventarioExcel';
import Papa from 'papaparse';
import { Upload } from 'lucide-react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

export default function Inventario() {
  const { productos, setNuevoInventario } = useInventario();
  const [error, setError] = useState('');

  // Maneja subida de XLSX/XLS/CSV
  const handleFile = async e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split('.').pop().toLowerCase();
    try {
      let data = [];
      if (ext === 'csv') {
        const text = await file.text();
        const { data: rows } = Papa.parse(text, {
          header: true,
          skipEmptyLines: true
        });
        let contador = 1;
        const decode = txt => typeof txt === 'string'
          ? decodeURIComponent(escape(txt))
          : txt;

        data = rows.map(r => ({
          codigo: `P${String(contador++).padStart(4, '0')}`,
          producto: decode(r.Producto ?? r.producto ?? ''),
          categoria: decode(r.Categoría ?? r.Categoria ?? r.categoria ?? ''),
          stock: Number(r.Stock ?? r.stock ?? 0),
          precio: Number(r.Precio ?? r.precio ?? 0),
          ultimoMovimiento: decode(
            r.UltimoMovimiento ??
            r.ultimoMovimiento ??
            r['ÚltimoMovimiento'] ?? ''
          ),
        }));
      } else {
        const buffer = await file.arrayBuffer();
        data = leerInventarioExcel(buffer);
      }
      setNuevoInventario(data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Error al leer el archivo. Asegúrate de que tenga las columnas Producto, Categoría, Stock, Precio y ÚltimoMovimiento.');
    }
  };

  // Indicadores
  const total = productos.length;
  const enStock = productos.filter(p => p.stock > 0).length;
  const sinStock = productos.filter(p => p.stock === 0).length;

  // Datos para gráfica
  const chartData = productos.map(p => ({
    name: p.producto,
    stock: p.stock
  }));
  const barColor = stock =>
    stock === 0 ? '#F56565' : stock <= 4 ? '#ED8936' : '#48BB78';

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Inventario en Tiempo Real</h1>
        <label className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer">
          <Upload size={20} className="mr-2" />
          Subir Excel/CSV
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            className="hidden"
            onChange={handleFile}
          />
        </label>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Total productos</p>
          <p className="text-2xl font-semibold">{total}</p>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">En stock</p>
          <p className="text-2xl font-semibold">{enStock}</p>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Sin stock</p>
          <p className="text-2xl font-semibold">{sinStock}</p>
        </div>
      </div>

      <div className="h-64 bg-white rounded-lg shadow p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="stock" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, idx) => (
                <Cell key={idx} fill={barColor(entry.stock)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {sinStock > 0 && (
        <div className="space-y-2">
          <p className="text-red-600 font-medium">Productos sin stock</p>
          <ul className="list-disc list-inside text-gray-700">
            {productos
              .filter(p => p.stock === 0)
              .map(p => (
                <li key={p.codigo}>{p.producto}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
