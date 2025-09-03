import React from 'react';
import { useCanvas } from '../context/CanvasContext';
import { getTextColorClass } from '../utils/colors';

interface CanvasBoxProps {
  title: string;
  id: string;
  number?: string;
  subtitle?: string;
}

const CanvasBox: React.FC<CanvasBoxProps> = ({ title, id, number, subtitle }) => {
  const { fields, setActiveField, isDarkMode } = useCanvas();

  return (
    <div 
      className={`border rounded-xl p-6 min-h-[140px] relative transition-all cursor-pointer ${
        isDarkMode 
          ? 'border-white hover:border-purple-300' 
          : 'border-purple-400 hover:border-purple-600'
      }`}
      onClick={() => setActiveField(id)}
    >
      {number && (
        <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-lg border-2 border-white z-10 leading-none">
          {number}
        </div>
      )}
      <div className="mb-3 mt-6">
        <h3 className="font-bold text-center text-sm">{title}</h3>
        {subtitle && <p className={`text-[10px] text-center italic ${isDarkMode ? 'text-purple-300' : 'text-purple-500'}`}>{subtitle}</p>}
      </div>
      <div className="pt-2">
        {fields[id]?.content ? (
          <p className={`text-xs whitespace-pre-wrap break-words overflow-y-auto max-h-[150px] scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-purple-900 ${getTextColorClass(fields[id]?.color, isDarkMode)}`}>
            {fields[id].content}
          </p>
        ) : (
          <p className={`text-center italic text-xs ${isDarkMode ? 'text-purple-400' : 'text-purple-500'}`}>Clique para editar</p>
        )}
      </div>
    </div>
  );
};

export default CanvasBox;