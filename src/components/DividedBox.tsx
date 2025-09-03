import React from 'react';
import { useCanvas } from '../context/CanvasContext';

interface DividedBoxProps {
  title1: string;
  title2: string;
  id1: string;
  id2: string;
  number?: string;
  isCentral?: boolean;
}

const DividedBox: React.FC<DividedBoxProps> = ({ 
  title1, 
  title2, 
  id1, 
  id2, 
  number, 
  isCentral = false 
}) => {
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
    <div className={`border rounded-xl p-6 min-h-[140px] relative transition-all ${
      isDarkMode 
        ? 'border-white hover:border-purple-300' 
        : 'border-purple-400 hover:border-purple-600'
    }`}>
      {number && (
        <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-lg border-2 border-white z-10 leading-none">
          {number}
        </div>
      )}
      <div className="flex h-full pt-3">
        <div 
          className="flex-1 pr-4 flex flex-col cursor-pointer overflow-hidden"
          onClick={() => setActiveField(id1)}
        >
          <h3 className={`font-bold ${isCentral ? 'text-center' : ''} mb-4 mt-4 text-sm leading-tight px-1`}>{title1}</h3>
          <div className="flex-grow pt-1 text-xs px-1">
            {fields[id1]?.content ? (
              <p className={`whitespace-pre-wrap break-words overflow-y-auto max-h-[150px] scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-purple-900 leading-relaxed ${getTextColorClass(fields[id1]?.color)}`}>
                {fields[id1].content}
              </p>
            ) : (
              <p className={`text-center italic ${isDarkMode ? 'text-purple-400' : 'text-purple-500'}`}>Clique para editar</p>
            )}
          </div>
        </div>
        
        <div className={`border-r border-dashed h-full mx-3 ${isDarkMode ? 'border-white' : 'border-purple-400'}`}></div>
        
        <div 
          className="flex-1 pl-3 flex flex-col cursor-pointer overflow-hidden"
          onClick={() => setActiveField(id2)}
        >
          <h3 className={`font-bold ${isCentral ? 'text-center' : ''} mb-3 mt-6 text-sm leading-tight px-1`}>{title2}</h3>
          <div className="flex-grow pt-1 text-xs px-1">
            {fields[id2]?.content ? (
              <p className={`whitespace-pre-wrap break-words overflow-y-auto max-h-[150px] scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-purple-900 leading-relaxed ${getTextColorClass(fields[id2]?.color)}`}>
                {fields[id2].content}
              </p>
            ) : (
              <p className={`text-center italic ${isDarkMode ? 'text-purple-400' : 'text-purple-500'}`}>Clique para editar</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DividedBox;