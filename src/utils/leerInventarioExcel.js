// src/utils/leerInventarioExcel.js
import * as XLSX from 'xlsx';

/**
 * Lee un buffer de Excel y devuelve array de productos:
 * { codigo, producto, categoria, stock, precio, ultimoMovimiento }
 */
export function leerInventarioExcel(buffer) {
  const wb = XLSX.read(buffer, { type: 'array' });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const raw = XLSX.utils.sheet_to_json(sheet, { defval: '' });

  let contador = 1;
  const decode = txt =>
    typeof txt === 'string' ? decodeURIComponent(escape(txt)) : txt;

  return raw.map(row => ({
    codigo: `P${String(contador++).padStart(4, '0')}`,
    producto: decode(row.Producto ?? row.producto ?? ''),
    categoria: decode(row.Categoría ?? row.Categoria ?? row.categoria ?? ''),
    stock: Number(row.Stock ?? row.stock ?? 0),
    precio: Number(row.Precio ?? row.precio ?? 0),
    ultimoMovimiento: decode(
      row.UltimoMovimiento ??
      row.ultimoMovimiento ??
      row['ÚltimoMovimiento'] ??
      ''
    ),
  }));
}
