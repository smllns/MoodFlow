// // Function to export data table as a PDF
'use client';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function exportInPdf(tableElement: HTMLElement) {
  // Opening the new window right away
  const printWindow = window.open('', '', 'width=800,height=600');
  if (!printWindow) return;
  // Writing the basic HTML structure for the print window
  printWindow.document.write(
    `<html><head><title>Download MoodFlow PDF</title></head><body>
    <h1 style="text-align:center;">MoodFlow Data</h1>
    <p style="text-align:center;">Generating PDF, please wait...</p>
    </body></html>`
  );
  printWindow.document.close();

  // Now proceed with generating the PDF
  const originalStyle = tableElement.style.cssText; // Storing the original styles
  tableElement.style.cssText += 'color: black !important;'; // Forcing black text color for pdf

  html2canvas(tableElement as HTMLElement, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // Adding the image to the PDF, creating new pages if needed
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    while (heightLeft > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Generating the PDF file and creating a Blob URL to display in the new window
    const pdfOutput = pdf.output('blob');
    const blobURL = URL.createObjectURL(pdfOutput);

    // Opening the PDF in the iframe within the new window
    printWindow.document.write(
      `<html><head><title>Download MoodFlow PDF</title></head><body>
      <h1 style="text-align:center;">MoodFlow Data</h1>
      <iframe src="${blobURL}" width="100%" height="100%" style="border: none;"></iframe>
      <p style="text-align:center;">Click below to download the PDF:</p>
      <a href="${blobURL}" download="MoodFlow_Data.pdf" style="display: block; text-align: center; font-size: 18px; padding: 10px; background-color: #4CAF50; color: white; text-decoration: none;">Download PDF</a>
      </body></html>`
    );

    // Restoring the original styles of the table after rendering
    tableElement.style.cssText = originalStyle;
  });
}
