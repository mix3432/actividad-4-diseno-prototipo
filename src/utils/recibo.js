// src/utils/recibo.js
import jsPDF from 'jspdf';
import 'jspdf-autotable';             // IMPORTANTE: así muta jsPDF.prototype

export function generarReciboPDF({ ventaId, fecha, carrito, cliente }) {
  const doc = new jsPDF({ unit: 'pt', format: 'letter' });
  const margin = 40;
  let y = margin;

  // — Encabezado —
  doc.setFontSize(22).setFont('helvetica', 'bold');
  doc.text('FRUVER EL MANANTIAL', doc.internal.pageSize.getWidth()/2, y, { align: 'center' });
  y += 30;

  doc.setFontSize(10).setFont('helvetica', 'normal');
  doc.text('Tel: 687 6346', margin, y);
  doc.text('NIT: 900.625.411-1', margin, y+15);
  doc.text('Dirección: CLI 15 No. 18-89', margin, y+30);

  // FACTURA VENTA Nº ___
  const labelX = doc.internal.pageSize.getWidth() - margin - 200;
  doc.setFontSize(12).setFont('helvetica','normal');
  doc.text('FACTURA VENTA Nº', labelX, y);
  doc.setFont('helvetica','bold');
  doc.text(String(ventaId), labelX + 120, y);

  doc.setFont('helvetica','normal');
  doc.text(`FECHA: ${fecha}`, labelX, y+20);
  y += 50;

  // — Datos cliente —
  const boxH = 60;
  doc.setDrawColor(0).setLineWidth(0.5)
     .roundedRect(margin, y, doc.internal.pageSize.getWidth()-margin*2, boxH, 4,4);
  doc.setFontSize(10);
  doc.text(`SEÑORES: ${cliente}`, margin+5, y+15);
  doc.text(`Teléfonos: -`, margin+5, y+30);
  doc.text(`Dirección: -`, margin+5, y+45);
  doc.text(`Ciudad: -`, margin+250, y+30);
  doc.text(`NIT: -`, margin+480, y+15);
  y += boxH + 20;

  // — Tabla —
  const head = [['REFERENCIA','UNIDAD','CANTIDAD','VR UNIT.','VR TOTAL']];
  const body = carrito.map(i=> {
    const unit = i.precio || 0;
    const tot  = unit * (i.cantidad || 0);
    return [
      i.referencia || '',
      i.unidad    || '',
      String(i.cantidad || 0),
      unit.toFixed(2),
      tot.toFixed(2)
    ];
  });

  doc.autoTable({
    startY: y,
    head, body,
    theme: 'grid',
    headStyles: { fillColor: '#e0e7ff', textColor: 0, fontStyle: 'bold' },
    styles: { fontSize: 9, cellPadding: 5 },
    margin: { left: margin, right: margin }
  });

  // — Totales —
  const finalY = doc.lastAutoTable.finalY + 15;
  const totalX = doc.internal.pageSize.getWidth() - margin - 100;
  const lh = 16;

  const subtotal   = body.reduce((s,r)=> s + parseFloat(r[4]), 0);
  const descuento  = 0;
  const iva        = 0;
  const retefuente = 0;
  const total      = subtotal - descuento + iva - retefuente;

  doc.setFontSize(10).setFont('helvetica','bold');
  doc.text('SUBTOTAL', totalX, finalY);
  doc.text(subtotal.toFixed(2), totalX + 80, finalY, { align:'right' });

  doc.setFont('helvetica','normal');
  doc.text('DESCUENTO', totalX, finalY+lh);
  doc.text(descuento.toFixed(2), totalX + 80, finalY+lh, { align:'right' });

  doc.text('IVA', totalX, finalY+lh*2);
  doc.text(iva.toFixed(2), totalX + 80, finalY+lh*2, { align:'right' });

  doc.text('RETEFUENTE', totalX, finalY+lh*3);
  doc.text(retefuente.toFixed(2), totalX + 80, finalY+lh*3, { align:'right' });

  doc.setFont('helvetica','bold');
  doc.text('TOTAL', totalX, finalY+lh*4+2);
  doc.text(total.toFixed(2), totalX + 80, finalY+lh*4+2, { align:'right' });

  doc.save(`factura_venta_${ventaId}.pdf`);
}
