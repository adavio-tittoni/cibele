import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useCanvas } from '../context/CanvasContext';
import { getTextColorClass, colorOptions } from '../utils/colors';
import { FieldColor } from '../types';

const EditModal: React.FC = () => {
  const { fields, updateField, updateFieldColor, activeField, setActiveField, isDarkMode } = useCanvas();
  const [value, setValue] = useState('');
  const [selectedColor, setSelectedColor] = useState<FieldColor>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  const handleSave = () => {
    if (activeField) {
      console.log('Saving field:', activeField, 'content:', value, 'color:', selectedColor);
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
              <button
                onClick={() => setSelectedColor(undefined)}
                className={`flex-1 px-2 py-1 rounded text-xs ${
                  isDarkMode ? 'text-white bg-gray-700' : 'text-gray-900 bg-gray-200'
                } ${!selectedColor ? 'ring-2 ring-offset-2' : 'opacity-70 hover:opacity-100'}`}
              >
                Cor Padrão
              </button>
              {colorOptions.map(({ value, label, bgClass }) => (
                <button
                  key={value}
                  onClick={() => setSelectedColor(value)}
                  className={`flex-1 px-2 py-1 rounded text-xs text-white ${bgClass} ${
                    selectedColor === value ? 'ring-2 ring-offset-2' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`w-full h-40 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none ${
            isDarkMode ? 'bg-purple-900 border-purple-700' : 'bg-white border-purple-200'
          } border ${getTextColorClass(isCentralField ? undefined : selectedColor, isDarkMode)}`}
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