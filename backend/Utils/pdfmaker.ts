import PDFKit from 'pdfkit';
import fs from 'fs';
import path from 'path';

export default function createPDF() {
  const pdf = new PDFKit();

  pdf.text('Hello ABatCaverna PDF');

  pdf.pipe(fs.createWriteStream(path.resolve(__dirname, 'abatcaverna.pdf')));
  pdf.end();
  console.log('[SERVER]: File created at', path.resolve(__dirname, 'abatcaverna.pdf'))
}