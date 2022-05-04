import PDFKit from 'pdfkit';
import fs from 'fs';
import path from 'path';

export default function createPDF(qrcode_uri: string) {
  const pdf = new PDFKit();

  pdf.text('Ingresso 6º aniversário ABatCaverna');
  pdf.image(qrcode_uri);

  pdf.pipe(fs.createWriteStream(path.resolve(__dirname, 'abatcaverna.pdf')));
  pdf.end();
  console.log('[SERVER]: File created at', path.resolve(__dirname, 'abatcaverna.pdf'))
}