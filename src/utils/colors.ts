import { FieldColor } from '../types';

export function getTextColorClass(color?: FieldColor, isDark?: boolean) {
  if (isDark) {
    switch (color) {
      case 'blue': return 'color: #60A5FA'; // Azul claro para tema escuro
      case 'red': return 'color: #F87171'; // Vermelho claro para tema escuro
      case 'purple': return 'color: #B794F4'; // Roxo claro para tema escuro
      default: return 'color: white';
    }
  } else {
    switch (color) {
      case 'blue': return 'color: #2563EB'; // Azul escuro para tema claro
      case 'red': return 'color: #DC2626'; // Vermelho escuro para tema claro
      case 'purple': return 'color: #805AD5'; // Roxo escuro para tema claro
      default: return 'color: #1F2937';
    }
  }
}

// Opções de cores para o tema escuro
export const darkModeColorOptions = [
  { value: 'blue' as const, label: 'Azul - Estado atual', bgClass: 'bg-blue-600' },
  { value: 'red' as const, label: 'Vermelho - Gaps', bgClass: 'bg-red-600' },
  { value: 'purple' as const, label: 'Roxo - Insights para os Gaps', bgClass: 'bg-purple-600' }
] as const;

// Opções de cores para o tema claro
export const lightModeColorOptions = [
  { value: 'blue' as const, label: 'Azul - Estado atual', bgClass: 'bg-blue-500' },
  { value: 'red' as const, label: 'Vermelho - Gaps', bgClass: 'bg-red-500' },
  { value: 'purple' as const, label: 'Roxo - Insights para os Gaps', bgClass: 'bg-purple-500' }
] as const;

// Função para obter as opções de cores com base no tema
export function getColorOptions(isDark: boolean) {
  return isDark ? darkModeColorOptions : lightModeColorOptions;
}

// Adicionar esta função ao arquivo colors.ts

// Função para sugerir cor com base no texto
export function suggestColorFromText(text: string): FieldColor {
  // Palavras-chave para cada cor
  const blueKeywords = ['atual', 'presente', 'existente', 'disponível', 'implementado'];
  const redKeywords = ['gap', 'problema', 'desafio', 'dificuldade', 'obstáculo', 'falta'];
  const purpleKeywords = ['solução', 'insight', 'ideia', 'proposta', 'sugestão', 'melhoria'];
  
  // Converter para minúsculas para comparação
  const lowerText = text.toLowerCase();
  
  // Verificar palavras-chave
  for (const keyword of blueKeywords) {
    if (lowerText.includes(keyword)) return 'blue';
  }
  
  for (const keyword of redKeywords) {
    if (lowerText.includes(keyword)) return 'red';
  }
  
  for (const keyword of purpleKeywords) {
    if (lowerText.includes(keyword)) return 'purple';
  }
  
  // Se não encontrar palavras-chave, retorna undefined
  return undefined;
}

// Função para aplicar cor a um trecho de texto
export function applyColorToText(text: string, selection: TextSelection, color: FieldColor): string {
  if (selection.start === selection.end) return text;
  
  // Divide o texto em três partes: antes da seleção, seleção e depois da seleção
  const beforeSelection = text.substring(0, selection.start);
  const selectedText = text.substring(selection.start, selection.end);
  const afterSelection = text.substring(selection.end);
  
  // Adiciona marcação especial que será processada posteriormente
  return `${beforeSelection}[[${color}]]${selectedText}[[/${color}]]${afterSelection}`;
}

// Função para renderizar texto com marcações de cor
export function renderColoredText(text: string, isDark: boolean): string {
  if (!text) return '';
  
  // Substitui as marcações especiais por tags HTML com estilos inline
  let processedText = text
    .replace(/\[\[blue\]\]/g, `<span style="${getTextColorClass('blue', isDark)}">`) 
    .replace(/\[\[red\]\]/g, `<span style="${getTextColorClass('red', isDark)}">`) 
    .replace(/\[\[purple\]\]/g, `<span style="${getTextColorClass('purple', isDark)}">`) 
    .replace(/\[\[\/blue\]\]/g, '</span>') 
    .replace(/\[\[\/red\]\]/g, '</span>') 
    .replace(/\[\[\/purple\]\]/g, '</span>');
    
  // Remove TODOS os marcadores restantes (incluindo malformados)
  processedText = processedText.replace(/\[\[[^\]]*\]\]/g, '');
  
  return processedText;
}