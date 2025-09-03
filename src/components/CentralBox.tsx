import React from 'react';
import { useCanvas } from '../context/CanvasContext';

interface CentralBoxProps {
  title: string;
  id: string;
}

const CentralBox: React.FC<CentralBoxProps> = ({ title, id }) => {
  const { fields, setActiveField, isDarkMode } = useCanvas();

  const getTextColorClass = (color?: string) => {
    switch (color) {
      case 'blue': return 'text-blue-500';
      case 'red': return 'text-red-500';
      case 'purple': return 'text-purple-500';
      default: return isDarkMode ? 'text-white' : 'text-gray-900';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className={`font-bold text-center mb-3 text-sm leading-tight ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`}>{title}</h3>
      <div 
        className={`border rounded-xl p-4 w-full min-h-[80px] transition-all cursor-pointer ${
          isDarkMode 
            ? 'border-white hover:border-purple-300' 
            : 'border-purple-400 hover:border-purple-600'
        }`}
        onClick={() => setActiveField(id)}
      >
        <div className="h-full flex items-center justify-center px-2">
          {fields[id]?.content ? (
            <p className={`text-center whitespace-pre-wrap text-xs break-words overflow-y-auto max-h-[100px] scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-purple-900 leading-relaxed ${getTextColorClass(fields[id]?.color)}`}>
              {fields[id].content}
            </p>
          ) : (
            <p className={`text-center italic text-xs ${isDarkMode ? 'text-purple-400' : 'text-purple-500'}`}>Clique para editar</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CentralBox;