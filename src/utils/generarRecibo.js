// src/utils/generarRecibo.js
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function generarRecibo(venta) {
  /* Hoja A4 vertical, unidades en pt */
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });

  /* ----------  Medidas base  ---------- */
  const pageWidth   = doc.internal.pageSize.getWidth(); // 595 pt
  const marginLeft  = 40;
  const marginRight = 140;                              // bloque derecho visible
  const rightX      = pageWidth - marginRight;          // 455 pt

  /* ----------  Cabecera  ---------- */
  doc.setFontSize(22).setFont('helvetica', 'bold');
  doc.text('FRUVER EL MANANTIAL', pageWidth / 2, 50, { align: 'center' });

  doc.setFontSize(11).setFont('helvetica', 'normal');
  doc.text(['TEL: 687 6346', 'NIT: 900.625.411-1', 'DIRECCIÓN: CLL 15 No. 18-89'],
           marginLeft, 80);

  doc.setFontSize(12).setFont('helvetica', 'bold');
  doc.text('FACTURA VENTA', rightX, 80, { align: 'right' });
  doc.setFontSize(11).setFont('helvetica', 'normal');
  doc.text(
    `FECHA: ${new Date(venta.fecha).toLocaleString('es-CO')}`,
    rightX,
    100,
    { align: 'right' }
  );

  /* ----------  Tabla de productos  ---------- */
  autoTable(doc, {
    startY: 135,
    margin: { left: marginLeft, right: marginRight },
    head: [['PRODUCTO', 'UNIDAD', 'CANT.', 'VR UNIT.', 'VR TOTAL']],
    body: venta.productos.map(p => [
      p.producto,
      p.unidad ?? '',
      p.cantidad,
      `$${p.precio.toLocaleString('es-CO')}`,
      `$${(p.precio * p.cantidad).toLocaleString('es-CO')}`
    ]),
    theme : 'grid',
    headStyles: { fillColor: [0, 175, 130], halign: 'center' },
    styles: { fontSize: 10, cellPadding: 4 }
  });

  /* ----------  Total  ---------- */
  const y = doc.lastAutoTable.finalY + 25;
  doc.setFontSize(12).setFont('helvetica', 'bold');
  doc.text('TOTAL:', rightX - 100, y, { align: 'right' });
  doc.text(`$${venta.total.toLocaleString('es-CO')}`, rightX, y, {
    align: 'right'
  });

  /* ----------  Guardar  ---------- */
  doc.save(`Factura_${venta.id}.pdf`);
}
