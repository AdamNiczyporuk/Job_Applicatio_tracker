import { PDFDocument, rgb } from 'pdf-lib';

export async function generatePdf(cv) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const {  height } = page.getSize();
    const fontSize = 12;
  
    page.drawText(`Full Name: ${cv["Full Name"]}`, { x: 50, y: height - 50, size: fontSize, color: rgb(0, 0, 0) });
    page.drawText(`Email: ${cv.Email}`, { x: 50, y: height - 70, size: fontSize, color: rgb(0, 0, 0) });
    page.drawText(`Job Title: ${cv["Job Title"]}`, { x: 50, y: height - 90, size: fontSize, color: rgb(0, 0, 0) });
  
    let yPosition = height - 110;
    page.drawText(`Experience:`, { x: 50, y: yPosition, size: fontSize, color: rgb(0, 0, 0) });
    yPosition -= 20;
    cv.Experience.forEach(item => {
      page.drawText(`- ${item}`, { x: 50, y: yPosition, size: fontSize, color: rgb(0, 0, 0) });
      yPosition -= 20;
    });
  
    page.drawText(`Skills:`, { x: 50, y: yPosition, size: fontSize, color: rgb(0, 0, 0) });
    yPosition -= 20;
    cv.Skills.forEach(item => {
      page.drawText(`- ${item}`, { x: 50, y: yPosition, size: fontSize, color: rgb(0, 0, 0) });
      yPosition -= 20;
    });
  
    page.drawText(`Achievements:`, { x: 50, y: yPosition, size: fontSize, color: rgb(0, 0, 0) });
    yPosition -= 20;
    cv.Achievements.forEach(item => {
      page.drawText(`- ${item}`, { x: 50, y: yPosition, size: fontSize, color: rgb(0, 0, 0) });
      yPosition -= 20;
    });
  
    page.drawText(`Education:`, { x: 50, y: yPosition, size: fontSize, color: rgb(0, 0, 0) });
    yPosition -= 20;
    page.drawText(`Degree: ${cv.Education.Degree}`, { x: 50, y: yPosition, size: fontSize, color: rgb(0, 0, 0) });
    yPosition -= 20;
    page.drawText(`University: ${cv.Education.University}`, { x: 50, y: yPosition, size: fontSize, color: rgb(0, 0, 0) });
    yPosition -= 20;
    page.drawText(`Year: ${cv.Education.Year}`, { x: 50, y: yPosition, size: fontSize, color: rgb(0, 0, 0) });
    yPosition -= 20;
  
    page.drawText(`Certifications:`, { x: 50, y: yPosition, size: fontSize, color: rgb(0, 0, 0) });
    yPosition -= 20;
    cv.Certifications.forEach(item => {
      page.drawText(`- ${item}`, { x: 50, y: yPosition, size: fontSize, color: rgb(0, 0, 0) });
      yPosition -= 20;
    });
  
    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
  }