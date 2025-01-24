import { PDFDocument, rgb } from 'pdf-lib';

export async function generatePdf(cv){ 
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    
    
}