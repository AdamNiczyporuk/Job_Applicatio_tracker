import { PDFDocument, rgb } from 'pdf-lib';

export async function generatePdf(cv) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const {  height } = page.getSize();
    const fontSize = 12;
  
    page.drawText(`Name: ${cv.Name}`, { x: 50, y: height - 50, size: fontSize, color: rgb(0, 0, 0) });
  page.drawText(`Email: ${cv.Email}`, { x: 50, y: height - 70, size: fontSize, color: rgb(0, 0, 0) });
  page.drawText(`Job Title: ${cv["Job Title"]}`, { x: 50, y: height - 90, size: fontSize, color: rgb(0, 0, 0) });

  let yPosition = height - 110;
  page.drawText(`Experience:`, { x: 50, y: yPosition, size: fontSize, color: rgb(0, 0, 0) });
  yPosition -= 20;
  page.drawText(cv.Experience, { x: 50, y: yPosition, size: fontSize, color: rgb(0, 0, 0) });
  yPosition -= 20;

  page.drawText(`Skills:`, { x: 50, y: yPosition, size: fontSize, color: rgb(0, 0, 0) });
  yPosition -= 20;
  page.drawText(`Programming Languages:`, { x: 50, y: yPosition, size: fontSize, color: rgb(0, 0, 0) });
  yPosition -= 20;
  cv.Skills["Programming Languages"].forEach(item => {
    page.drawText(`- ${item}`, { x: 70, y: yPosition, size: fontSize, color: rgb(0, 0, 0) });
    yPosition -= 20;
  });

  page.drawText(`Frameworks:`, { x: 50, y: yPosition, size: fontSize, color: rgb(0, 0, 0) });
  yPosition -= 20;
  cv.Skills.Frameworks.forEach(item => {
    page.drawText(`- ${item}`, { x: 70, y: yPosition, size: fontSize, color: rgb(0, 0, 0) });
    yPosition -= 20;
  });

  page.drawText(`Responsibilities:`, { x: 50, y: yPosition, size: fontSize, color: rgb(0, 0, 0) });
  yPosition -= 20;
  cv.Skills.Responsibilities.forEach(item => {
    page.drawText(`- ${item}`, { x: 70, y: yPosition, size: fontSize, color: rgb(0, 0, 0) });
    yPosition -= 20;
  });
  
    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
  }