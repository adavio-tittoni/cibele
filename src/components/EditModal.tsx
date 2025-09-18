import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useCanvas } from '../context/CanvasContext';
// Adicionar à importação
import { getTextColorClass, getColorOptions, suggestColorFromText, applyColorToText, renderColoredText } from '../utils/colors';
import { FieldColor } from '../types';
import DOMPurify from 'dompurify';

const EditModal: React.FC = () => {
  const { fields, updateField, updateFieldColor, activeField, setActiveField, isDarkMode } = useCanvas();
  const [value, setValue] = useState('');
  const [selectedColor, setSelectedColor] = useState<FieldColor>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selection, setSelection] = useState<{start: number, end: number}>({start: 0, end: 0});

  useEffect(() => {
    if (activeField && textareaRef.current) {
      setValue(fields[activeField]?.content || '');
      setSelectedColor(fields[activeField]?.color);
      textareaRef.current.focus();
    }
  }, [activeField, fields]);

  // Campos centrais que não devem ter alteração de cor
  const centralFields = ['company-name', 'project-leader', 'management-team', 'contact-point', 'start-date', 'end-date'];
  const isCentralField = activeField ? centralFields.includes(activeField) : false;

  // Modificar a função handleSave para processar o texto antes de salvar
  const handleSave = () => {
    if (activeField) {
      console.log('Saving field:', activeField, 'content:', value);
      // Salva o texto com as marcações especiais
      updateField(activeField, value);
      // Só atualiza a cor se não for um campo central
      if (!isCentralField) {
        updateFieldColor(activeField, selectedColor);
      }
      setActiveField(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setActiveField(null);
    } else if (e.key === 'Enter' && e.ctrlKey) {
      handleSave();
    }
  };

  const handleTextSelection = () => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      setSelection({start, end});
    }
  };

  const applyColorToSelection = (color: FieldColor) => {
    if (selection.start !== selection.end && !isCentralField) {
      const newText = applyColorToText(value, selection, color);
      setValue(newText);
      // Resetar a seleção após aplicar a cor
      setSelection({start: 0, end: 0});
    } else {
      // Se não houver seleção, define a cor para todo o campo
      setSelectedColor(color);
    }
  };

  if (!activeField) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 pt-16">
      <div className={`${isDarkMode ? 'bg-deep-purple border-purple-500' : 'bg-white border-purple-400'} border rounded-xl max-w-md w-full p-5 animate-fadeIn`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg">Editar Campo</h3>
          <button 
            onClick={() => setActiveField(null)}
            className={`${isDarkMode ? 'text-purple-300 hover:text-white' : 'text-purple-500 hover:text-purple-700'} transition-colors`}
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Só mostra as opções de cor se não for um campo central */}
        {!isCentralField && (
          <div className="mb-6">
            <div className="flex gap-2 mb-2">
              {getColorOptions(isDarkMode).map(({ value, label, bgClass }) => (
                <button
                  key={value}
                  onClick={() => {
                    // Se houver texto selecionado, aplica a cor apenas à seleção
                    if (selection.start !== selection.end) {
                      applyColorToSelection(value);
                    } else {
                      setSelectedColor(value);
                    }
                  }}
                  className={`flex-1 px-2 py-1 rounded text-xs text-white ${bgClass} ${
                    selectedColor === value && selection.start === selection.end ? 'ring-2 ring-offset-2' : 'opacity-80 hover:opacity-100'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {selection.start !== selection.end 
                ? "Selecione uma cor para aplicar ao texto selecionado" 
                : "Selecione uma cor para todo o texto ou selecione um trecho específico"}
            </p>
          </div>
        )}

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            // Sugerir cor com base no texto se não for um campo central
            if (!isCentralField && !selectedColor) {
              const suggestedColor = suggestColorFromText(e.target.value);
              if (suggestedColor) setSelectedColor(suggestedColor);
            }
          }}
          onSelect={handleTextSelection}
          onKeyDown={handleKeyDown}
          className={`w-full h-40 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none ${
            isDarkMode ? 'bg-purple-900 border-purple-700' : 'bg-white border-purple-200'
          } border`}
          placeholder="Digite seu conteúdo aqui..."
        />
        
        <div className="flex justify-end mt-4 gap-3">
          <p className={`text-xs ${isDarkMode ? 'text-purple-400' : 'text-purple-500'} self-center mr-auto`}>
            Ctrl+Enter para salvar, Esc para cancelar
          </p>
          <button 
            onClick={() => setActiveField(null)} 
            className={`px-4 py-2 rounded-md transition-colors ${
              isDarkMode 
                ? 'border border-purple-600 hover:bg-purple-800' 
                : 'border border-purple-400 hover:bg-purple-50'
            }`}
          >
            Cancelar
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-500 transition-colors"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;