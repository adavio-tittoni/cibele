import React from 'react';
import { Download, RefreshCw, Sun, Moon, FileSpreadsheet, Lightbulb } from 'lucide-react';
import { useCanvas } from '../context/CanvasContext';
import { exportToPDF, exportToXLS, exportInsightsToXLS, exportInsightsToPDF, exportCanvasToPDF } from '../utils/export';

const Header: React.FC = () => {
  const { resetFields, isDarkMode, toggleTheme, fields } = useCanvas();

  return (
    <>
      {/* Logo centralizado no topo - sempre usa a logo original */}
      <div className="w-full flex justify-center py-8">
        <img 
          src={isDarkMode ? "/logo-dark.png.png" : "/logo-light.png.png"} 
          alt="Logo da empresa" 
          className="max-h-32 max-w-96 object-contain"
        />
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
            onClick={() => exportCanvasToPDF('canvas-container', 'innov-ai-canvas')}
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
            onClick={() => exportToXLS('canvas-container', 'innov-ai-canvas')}
            className={`flex items-center px-3 py-2 rounded-md transition-colors ${
              isDarkMode 
                ? 'bg-purple-700 hover:bg-purple-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            <FileSpreadsheet size={16} className="mr-1" />
            XLS
          </button>
          
          <div className="relative group">
            <button
              className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                isDarkMode 
                  ? 'bg-green-700 hover:bg-green-600 text-white' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              <Lightbulb size={16} className="mr-1" />
              <span className="hidden md:inline">Exportar Insights</span>
              <span className="md:hidden">Insights</span>
            </button>
            
            {/* Dropdown menu */}
            <div className={`absolute right-0 mt-1 w-48 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 ${
              isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            }`}>
              <div className="py-1">
                <button
                  onClick={() => exportInsightsToXLS('canvas-container', 'innov-ai-canvas-insights')}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    isDarkMode 
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FileSpreadsheet size={14} className="inline mr-2" />
                  Exportar como XLS
                </button>
                <button
                  onClick={() => exportInsightsToPDF('canvas-container', 'innov-ai-canvas-insights')}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    isDarkMode 
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Download size={14} className="inline mr-2" />
                  Exportar como PDF
                </button>
              </div>
            </div>
          </div>
          
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