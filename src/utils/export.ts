import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const saveOriginalStyles = (element: HTMLElement) => {
  return {
    width: element.style.width,
    height: element.style.height,
    overflow: element.style.overflow,
  };
};

const setExportStyles = (element: HTMLElement, width: number, height: number) => {
  element.style.width = `${width}px`;
  element.style.height = `${height}px`;
  element.style.overflow = 'visible';
};

const restoreStyles = (element: HTMLElement, originalStyles: any) => {
  element.style.width = originalStyles.width;
  element.style.height = originalStyles.height;
  element.style.overflow = originalStyles.overflow;
};

export const exportToPDF = async (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    // Calcular tamanho total da viewport
    const width = Math.max(
      document.documentElement.scrollWidth, 
      window.innerWidth
    );
    const height = Math.max(
      document.documentElement.scrollHeight, 
      window.innerHeight
    );

    // Salvar estilos originais
    const originalStyles = saveOriginalStyles(element);
    setExportStyles(element, width, height);

    // Gerar canvas capturando o body inteiro
    const canvas = await html2canvas(document.body, {
      scale: 2,
      backgroundColor: '#1E1E2F',
      useCORS: true,
      allowTaint: true,
      scrollX: 0,
      scrollY: 0,
      windowWidth: width,
      windowHeight: height,
      width: width,
      height: height,
      onclone: (doc) => {
        const clonedElement = doc.getElementById(elementId);
        if (clonedElement) {
          setExportStyles(clonedElement, width, height);
        }
        doc.body.style.width = `${width}px`;
        doc.body.style.height = `${height}px`;
        doc.documentElement.style.width = `${width}px`;
        doc.documentElement.style.height = `${height}px`;
      }
    });

    // Restaurar estilos originais
    restoreStyles(element, originalStyles);

    // Gerar e salvar PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [width, height]
    });
    
    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save(`${filename}.pdf`);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Falha ao gerar PDF. Tente novamente.');
  }
};

export const exportToPNG = async (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    // Calcular tamanho total da viewport
    const width = Math.max(
      document.documentElement.scrollWidth, 
      window.innerWidth
    );
    const height = Math.max(
      document.documentElement.scrollHeight, 
      window.innerHeight
    );

    // Salvar estilos originais
    const originalStyles = saveOriginalStyles(element);
    setExportStyles(element, width, height);

    // Gerar canvas capturando o body inteiro
    const canvas = await html2canvas(document.body, {
      scale: 2,
      backgroundColor: '#1E1E2F',
      useCORS: true,
      allowTaint: true,
      scrollX: 0,
      scrollY: 0,
      windowWidth: width,
      windowHeight: height,
      width: width,
      height: height,
      onclone: (doc) => {
        const clonedElement = doc.getElementById(elementId);
        if (clonedElement) {
          setExportStyles(clonedElement, width, height);
        }
        doc.body.style.width = `${width}px`;
        doc.body.style.height = `${height}px`;
        doc.documentElement.style.width = `${width}px`;
        doc.documentElement.style.height = `${height}px`;
      }
    });

    // Restaurar estilos originais
    restoreStyles(element, originalStyles);

    // Gerar e salvar PNG
    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
  } catch (error) {
    console.error('Error generating PNG:', error);
    alert('Falha ao gerar PNG. Tente novamente.');
  }
};