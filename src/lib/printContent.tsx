//printing functionality for data table
'use client';
export function printContent(tableElement: HTMLElement) {
  const printWindow = window.open('', '', 'width=800,height=600');
  if (!printWindow) return;

  printWindow.document.write(
    '<html><head><title>MoodFlow Mood Data Table</title>'
  );
  const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
  styles.forEach((style) => {
    printWindow.document.write(style.outerHTML);
  });
  printWindow.document.write('</head><body>');
  printWindow.document.write(tableElement.outerHTML);
  printWindow.document.write(
    '<p class="mt-auto text-center text-sm">© 2024 All rights reserved by smllns</p>'
  );
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.addEventListener('afterprint', () => {
    printWindow.close();
  });
  printWindow.print();
}
