import React from 'react';
import { Download, RefreshCw, Sun, Moon } from 'lucide-react';
import { useCanvas } from '../context/CanvasContext';
import { exportToPDF, exportToPNG } from '../utils/export';

const Header: React.FC = () => {
  const { resetFields, isDarkMode, toggleTheme, fields } = useCanvas();

  return (
    <>
      {/* Logo centralizado no topo */}
      <div className="w-full flex justify-center py-8">
        {fields['company-name-logo']?.content ? (
          <img 
            src={fields['company-name-logo'].content} 
            alt="Logo da empresa" 
            className="max-h-32 max-w-96 object-contain"
          />
        ) : (
          <img 
            src={isDarkMode ? "/logo-dark.png.png" : "/logo-light.png.png"} 
            alt="Logo da empresa" 
            className="max-h-32 max-w-96 object-contain"
          />
        )}
      </div>
      
      <header className={`py-6 px-4 md:px-8 flex flex-col md:flex-row items-center justify-end ${
        isDarkMode ? 'border-purple-800' : 'border-gray-200'
      }`}>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button
            onClick={toggleTheme}
            className={`flex items-center px-3 py-2 rounded-md transition-colors ${
              isDarkMode 
                ? 'bg-purple-700 hover:bg-purple-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          
          <button
            onClick={() => exportToPDF('canvas-container', 'innov-ai-canvas')}
            className={`flex items-center px-3 py-2 rounded-md transition-colors ${
              isDarkMode 
                ? 'bg-purple-700 hover:bg-purple-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            <Download size={16} className="mr-1" />
            PDF
          </button>
          
          <button
            onClick={() => exportToPNG('canvas-container', 'innov-ai-canvas')}
            className={`flex items-center px-3 py-2 rounded-md transition-colors ${
              isDarkMode 
                ? 'bg-purple-700 hover:bg-purple-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            <Download size={16} className="mr-1" />
            PNG
          </button>
          
          <button
            onClick={resetFields}
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
              isDarkMode 
                ? 'bg-red-700 hover:bg-red-600 text-white' 
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            <RefreshCw size={16} />
            <span className="hidden md:inline">Reset</span>
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;