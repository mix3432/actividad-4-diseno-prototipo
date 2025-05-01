export function filtrarVentasPorFecha(ventas, filtro) {
  if (filtro === 'todas') return ventas;
  const ahora = new Date();
  const msDia = 24*60*60*1000;

  if (filtro === 'hoy') {
    return ventas.filter(v => new Date(v.fecha).toDateString()===ahora.toDateString());
  }
  if (filtro === 'semana') {
    const hace7 = new Date(ahora.getTime()-7*msDia);
    return ventas.filter(v=>new Date(v.fecha)>=hace7);
  }
  if (filtro === 'mes') {
    return ventas.filter(v=>{
      const d=new Date(v.fecha);
      return d.getMonth()===ahora.getMonth() && d.getFullYear()===ahora.getFullYear();
    });
  }
  return ventas;
}
