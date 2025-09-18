import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

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

// Função para extrair textos com tag [[purple]]
export const extractPurpleTexts = (elementId: string): string[] => {
  const element = document.getElementById(elementId);
  if (!element) return [];

  const purpleTexts: string[] = [];
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    null
  );

  let node;
  while (node = walker.nextNode()) {
    const textContent = node.textContent || '';
    const purpleMatches = textContent.match(/\[\[purple\]\](.*?)\[\[\/purple\]\]/g);
    
    if (purpleMatches) {
      purpleMatches.forEach(match => {
        const text = match.replace(/\[\[purple\]\]|\[\[\/purple\]\]/g, '');
        if (text.trim()) {
          purpleTexts.push(text.trim());
        }
      });
    }
  }

  return purpleTexts;
};

// Função para exportar dados para XLS
export const exportToXLS = async (elementId: string, filename: string) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error('Elemento canvas-container não encontrado');
      return;
    }

    // Mapeamento de IDs para títulos legíveis
    const fieldTitles: Record<string, string> = {
      'company-name': 'Nome da Empresa',
      'project-leader': 'Líder do projeto',
      'management-team': 'Equipe gestora',
      'contact-point': 'Ponto de contato',
      'start-date': 'Data Início',
      'end-date': 'Data Fim',
      'corporate-strategy': 'Estratégia Corporativa',
      'objectives-value': 'Objetivos e Proposta de Valor',
      'key-activities': 'Atividades Chave da Empresa',
      'internal-team': 'Equipe Interna',
      'external-team': 'Equipe Externa',
      'ai-tools-models': 'Ferramentas e Modelos de IA',
      'problems-pains': 'Problemas e Dores',
      'expected-benefits': 'Benefícios Esperados',
      'skills': 'Skills',
      'investment': 'Investimento',
      'mvp-poc': 'MVP / POC',
      'performance-metrics': 'Métricas de Desempenho',
      'governance-ethics': 'Governança e Ética em IA'
    };

    // Extrair dados do contexto React (localStorage)
    const savedFields = localStorage.getItem('innovAI-canvas');
    let fieldsData: Record<string, any> = {};
    
    if (savedFields) {
      try {
        fieldsData = JSON.parse(savedFields);
        console.log('Dados carregados do localStorage:', fieldsData);
        console.log('Total de campos encontrados:', Object.keys(fieldsData).length);
      } catch (e) {
        console.error('Error parsing saved data', e);
      }
    } else {
      console.warn('Nenhum dado encontrado no localStorage');
    }

    // Criar dados para a planilha
    const data: any[] = [];
    
    // Adicionar cabeçalhos
    data.push(['Campo', 'Conteúdo']);
    
    let fieldsWithContent = 0;
    let fieldsEmpty = 0;
    
    // Adicionar dados de cada campo
    Object.keys(fieldTitles).forEach(fieldId => {
      const title = fieldTitles[fieldId];
      let content = fieldsData[fieldId]?.content || '';
      
      console.log(`Campo ${fieldId}:`, content ? `"${content}"` : 'VAZIO');
      
      if (content && content.trim()) {
        fieldsWithContent++;
        // Limpar tags de formatação do conteúdo
        content = content.replace(/\[\[blue\]\]|\[\[\/blue\]\]/g, '');
        content = content.replace(/\[\[red\]\]|\[\[\/red\]\]/g, '');
        content = content.replace(/\[\[purple\]\]|\[\[\/purple\]\]/g, '');
        data.push([title, content]);
      } else {
        fieldsEmpty++;
        data.push([title, 'Clique para editar']);
      }
    });

    console.log(`Resumo da exportação: ${fieldsWithContent} campos com conteúdo, ${fieldsEmpty} campos vazios`);

    // Criar workbook e worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    
    // Ajustar largura das colunas
    const colWidths = [
      { wch: 35 }, // Campo
      { wch: 60 }  // Conteúdo
    ];
    ws['!cols'] = colWidths;
    
    // Estilizar cabeçalhos
    if (ws['A1']) ws['A1'].s = { font: { bold: true }, fill: { fgColor: { rgb: "CCCCCC" } } };
    if (ws['B1']) ws['B1'].s = { font: { bold: true }, fill: { fgColor: { rgb: "CCCCCC" } } };
    
    XLSX.utils.book_append_sheet(wb, ws, 'Canvas');
    XLSX.writeFile(wb, `${filename}.xlsx`);
    
    console.log('Arquivo XLS gerado com sucesso!');
    
  } catch (error) {
    console.error('Error generating XLS:', error);
    alert('Falha ao gerar XLS. Tente novamente.');
  }
};

// Função para exportar apenas insights (textos roxos) para XLS
export const exportInsightsToXLS = async (elementId: string, filename: string) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Mapeamento de IDs para títulos legíveis
    const fieldTitles: Record<string, string> = {
      'company-name': 'Nome da Empresa',
      'project-leader': 'Líder do projeto',
      'management-team': 'Equipe gestora',
      'contact-point': 'Ponto de contato',
      'start-date': 'Data Início',
      'end-date': 'Data Fim',
      'corporate-strategy': 'Estratégia Corporativa',
      'objectives-value': 'Objetivos e Proposta de Valor',
      'key-activities': 'Atividades Chave da Empresa',
      'internal-team': 'Equipe Interna',
      'external-team': 'Equipe Externa',
      'ai-tools-models': 'Ferramentas e Modelos de IA',
      'problems-pains': 'Problemas e Dores',
      'expected-benefits': 'Benefícios Esperados',
      'skills': 'Skills',
      'investment': 'Investimento',
      'mvp-poc': 'MVP / POC',
      'performance-metrics': 'Métricas de Desempenho',
      'governance-ethics': 'Governança e Ética em IA'
    };

    // Extrair dados do contexto React (localStorage)
    const savedFields = localStorage.getItem('innovAI-canvas');
    let fieldsData: Record<string, any> = {};
    
    if (savedFields) {
      try {
        fieldsData = JSON.parse(savedFields);
        console.log('Dados carregados do localStorage (Insights):', fieldsData);
      } catch (e) {
        console.error('Error parsing saved data', e);
      }
    } else {
      console.warn('Nenhum dado encontrado no localStorage (Insights)');
    }

    // Criar dados para a planilha
    const data: any[] = [];
    
    // Adicionar cabeçalhos
    data.push(['Campo', 'Insights']);
    
    // Adicionar dados apenas dos campos que contêm insights roxos
    let hasInsights = false;
    
    Object.keys(fieldTitles).forEach(fieldId => {
      const title = fieldTitles[fieldId];
      const content = fieldsData[fieldId]?.content || '';
      
      // Extrair apenas textos com tag [[purple]]
      const purpleMatches = content.match(/\[\[purple\]\](.*?)\[\[\/purple\]\]/g);
      
      if (purpleMatches && purpleMatches.length > 0) {
        const insights = purpleMatches.map(match => 
          match.replace(/\[\[purple\]\]|\[\[\/purple\]\]/g, '').trim()
        ).filter(text => text.length > 0);
        
        if (insights.length > 0) {
          data.push([title, insights.join(' | ')]);
          hasInsights = true;
        }
      }
    });

    if (!hasInsights) {
      alert('Nenhum insight encontrado. Adicione textos com formatação roxa [[purple]]texto[[/purple]] para exportar.');
      return;
    }

    // Criar workbook e worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    
    // Ajustar largura das colunas
    const colWidths = [
      { wch: 35 }, // Campo
      { wch: 70 }  // Insights
    ];
    ws['!cols'] = colWidths;
    
    // Estilizar cabeçalhos
    if (ws['A1']) ws['A1'].s = { font: { bold: true }, fill: { fgColor: { rgb: "CCCCCC" } } };
    if (ws['B1']) ws['B1'].s = { font: { bold: true }, fill: { fgColor: { rgb: "CCCCCC" } } };
    
    XLSX.utils.book_append_sheet(wb, ws, 'Insights');
    XLSX.writeFile(wb, `${filename}.xlsx`);
    
  } catch (error) {
    console.error('Error generating Insights XLS:', error);
    alert('Falha ao gerar XLS de Insights. Tente novamente.');
  }
};

// Função para exportar insights para PDF (otimizada para impressão)
export const exportInsightsToPDF = async (elementId: string, filename: string) => {
  try {
    // Mapeamento de IDs para títulos legíveis
    const fieldTitles: Record<string, string> = {
      'company-name': 'Nome da Empresa',
      'project-leader': 'Líder do projeto',
      'management-team': 'Equipe gestora',
      'contact-point': 'Ponto de contato',
      'start-date': 'Data Início',
      'end-date': 'Data Fim',
      'corporate-strategy': 'Estratégia Corporativa',
      'objectives-value': 'Objetivos e Proposta de Valor',
      'key-activities': 'Atividades Chave da Empresa',
      'internal-team': 'Equipe Interna',
      'external-team': 'Equipe Externa',
      'ai-tools-models': 'Ferramentas e Modelos de IA',
      'problems-pains': 'Problemas e Dores',
      'expected-benefits': 'Benefícios Esperados',
      'skills': 'Skills',
      'investment': 'Investimento',
      'mvp-poc': 'MVP / POC',
      'performance-metrics': 'Métricas de Desempenho',
      'governance-ethics': 'Governança e Ética em IA'
    };

    // Extrair dados do localStorage
    const savedFields = localStorage.getItem('innovAI-canvas');
    let fieldsData: Record<string, any> = {};
    
    if (savedFields) {
      try {
        fieldsData = JSON.parse(savedFields);
        console.log('Dados carregados do localStorage (Insights PDF):', fieldsData);
      } catch (e) {
        console.error('Error parsing saved data', e);
        return;
      }
    } else {
      console.warn('Nenhum dado encontrado no localStorage (Insights PDF)');
      alert('Nenhum dado encontrado para exportar.');
      return;
    }

    // Coletar insights
    const insights: Array<{field: string, content: string}> = [];
    
    Object.keys(fieldTitles).forEach(fieldId => {
      const title = fieldTitles[fieldId];
      const content = fieldsData[fieldId]?.content || '';
      
      // Extrair apenas textos com tag [[purple]]
      const purpleMatches = content.match(/\[\[purple\]\](.*?)\[\[\/purple\]\]/g);
      
      if (purpleMatches && purpleMatches.length > 0) {
        const insightTexts = purpleMatches.map(match => 
          match.replace(/\[\[purple\]\]|\[\[\/purple\]\]/g, '').trim()
        ).filter(text => text.length > 0);
        
        if (insightTexts.length > 0) {
          insights.push({
            field: title,
            content: insightTexts.join(' | ')
          });
        }
      }
    });

    if (insights.length === 0) {
      alert('Nenhum insight encontrado. Adicione textos com formatação roxa [[purple]]texto[[/purple]] para exportar.');
      return;
    }

    console.log(`Encontrados ${insights.length} insights para exportar`);

    // Criar PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    
    let currentY = margin;

    // Título do documento
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Insights do Canvas InnovAI', margin, currentY);
    currentY += 15;

    // Data de geração
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const currentDate = new Date().toLocaleDateString('pt-BR');
    pdf.text(`Gerado em: ${currentDate}`, margin, currentY);
    currentY += 20;

    // Processar cada insight
    pdf.setFontSize(12);
    
    insights.forEach((insight, index) => {
      // Verificar se precisa de nova página
      if (currentY > pageHeight - 40) {
        pdf.addPage();
        currentY = margin;
      }

      // Título do campo
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${index + 1}. ${insight.field}`, margin, currentY);
      currentY += 8;

      // Conteúdo do insight
      pdf.setFont('helvetica', 'normal');
      
      // Quebrar texto em linhas para caber na página
      const lines = pdf.splitTextToSize(insight.content, contentWidth);
      
      // Verificar se as linhas cabem na página atual
      const linesHeight = lines.length * 6;
      if (currentY + linesHeight > pageHeight - margin) {
        pdf.addPage();
        currentY = margin;
      }
      
      // Adicionar as linhas
      lines.forEach((line: string) => {
        pdf.text(line, margin, currentY);
        currentY += 6;
      });
      
      currentY += 8; // Espaço entre insights
    });

    // Rodapé
    const totalPages = pdf.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Página ${i} de ${totalPages}`, pageWidth - margin - 20, pageHeight - 10);
    }

    // Salvar PDF
    pdf.save(`${filename}.pdf`);
    console.log('PDF de insights gerado com sucesso!');
    
  } catch (error) {
    console.error('Error generating Insights PDF:', error);
    alert('Falha ao gerar PDF de Insights. Tente novamente.');
  }
};

// Função para exportar canvas completo para PDF (captura da tela real)
export const exportCanvasToPDF = async (elementId: string, filename: string) => {
  try {
    // Encontrar o elemento principal da aplicação (incluindo header com logo)
    const appElement = document.querySelector('#root') || document.body;
    
    if (!appElement) {
      console.error('Elemento da aplicação não encontrado');
      alert('Erro ao encontrar a página para exportar');
      return;
    }

    // Configurações do html2canvas para captura de alta qualidade
    const canvas = await html2canvas(appElement as HTMLElement, {
      scale: 2, // Alta resolução
      useCORS: true, // Permitir imagens de outras origens
      allowTaint: true, // Permitir elementos "tainted"
      backgroundColor: null, // Manter fundo transparente se necessário
      logging: false, // Desabilitar logs
      width: appElement.scrollWidth,
      height: appElement.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      ignoreElements: (element) => {
        // Ignorar modais e elementos flutuantes
        return element.classList.contains('modal') || 
               element.classList.contains('tooltip') ||
               element.getAttribute('role') === 'dialog';
      }
    });

    // Criar PDF em formato paisagem A4
    const pdf = new jsPDF('l', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Calcular dimensões da imagem para caber na página
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
    
    const scaledWidth = imgWidth * ratio;
    const scaledHeight = imgHeight * ratio;
    
    // Centralizar a imagem na página
    const x = (pageWidth - scaledWidth) / 2;
    const y = (pageHeight - scaledHeight) / 2;
    
    // Converter canvas para imagem e adicionar ao PDF
    const imgData = canvas.toDataURL('image/png', 1.0);
    pdf.addImage(imgData, 'PNG', x, y, scaledWidth, scaledHeight);
    
    // Salvar PDF
    pdf.save(`${filename}.pdf`);
    console.log('PDF da página completa gerado com sucesso!');
    
  } catch (error) {
    console.error('Error generating page PDF:', error);
    alert('Falha ao gerar PDF da página. Tente novamente.');
  }
};