import React, { useState } from 'react';
import { useCanvas } from '../context/CanvasContext';
import { Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import VideoModal from './VideoModal';

interface CompanyInfoProps {
  title: string;
  id: string;
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({ title, id }) => {
  const { fields, setActiveField, updateField, isDarkMode } = useCanvas();
  const logoId = `${id}-logo`;
  const [isInternalApp, setIsInternalApp] = useState(false);
  const [isExternalApp, setIsExternalApp] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isExternalVideoModalOpen, setIsExternalVideoModalOpen] = useState(false);

  const getTextColorClass = (color?: string) => {
    switch (color) {
      case 'blue': return 'text-blue-500';
      case 'red': return 'text-red-500';
      case 'purple': return 'text-purple-500';
      default: return isDarkMode ? 'text-white' : 'text-gray-900';
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        updateField(logoId, result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInternalAppClick = () => {
    setIsInternalApp(!isInternalApp);
    if (!isInternalApp) {
      setIsVideoModalOpen(true);
    }
  };

  const handleExternalAppClick = () => {
    setIsExternalApp(!isExternalApp);
    if (!isExternalApp) {
      setIsExternalVideoModalOpen(true);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1
  });

  return (
    <div className="flex flex-col items-center" style={{ gap: '16px' }}>
      {/* Checkboxes para Aplicação Interna e Externa */}
      <div 
        className="flex justify-center" 
        style={{ 
          gap: '24px', 
          marginBottom: '8px',
          width: '100%',
          position: 'relative'
        }}
      >
        <label 
          className={`flex items-center cursor-pointer ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
          style={{ 
            gap: '8px',
            fontSize: '14px',
            lineHeight: '1.2'
          }}
        >
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={isInternalApp}
              onChange={handleInternalAppClick}
              style={{ display: 'none' }}
            />
            <div 
              style={{
                width: '16px',
                height: '16px',
                border: `2px solid ${
                  isInternalApp
                    ? '#8b5cf6'
                    : isDarkMode
                    ? '#ffffff'
                    : '#9ca3af'
                }`,
                borderRadius: '3px',
                backgroundColor: isInternalApp ? '#8b5cf6' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              {isInternalApp && (
                <svg 
                  style={{ width: '12px', height: '12px', color: '#ffffff' }} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
          <span style={{ whiteSpace: 'nowrap' }}>Aplicação Interna</span>
        </label>

        <label 
          className={`flex items-center cursor-pointer ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
          style={{ 
            gap: '8px',
            fontSize: '14px',
            lineHeight: '1.2'
          }}
        >
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={isExternalApp}
              onChange={handleExternalAppClick}
              style={{ display: 'none' }}
            />
            <div 
              style={{
                width: '16px',
                height: '16px',
                border: `2px solid ${
                  isExternalApp
                    ? '#8b5cf6'
                    : isDarkMode
                    ? '#ffffff'
                    : '#9ca3af'
                }`,
                borderRadius: '3px',
                backgroundColor: isExternalApp ? '#8b5cf6' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              {isExternalApp && (
                <svg 
                  style={{ width: '12px', height: '12px', color: '#ffffff' }} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
          <span style={{ whiteSpace: 'nowrap' }}>Aplicação Externa</span>
        </label>
      </div>

      <div className="grid grid-cols-2 w-full gap-4">
        <div 
          className={`border rounded-xl p-4 min-h-[80px] transition-all cursor-pointer ${
            isDarkMode 
              ? 'border-white hover:border-purple-300' 
              : 'border-purple-400 hover:border-purple-600'
          }`}
          onClick={() => setActiveField(id)}
        >
          <div className="h-full flex items-center justify-center">
            {fields[id]?.bulletPoints && fields[id].bulletPoints!.length > 0 ? (
              <div className="space-y-2 w-full">
                {fields[id].bulletPoints!.map((bullet) => (
                  <div key={bullet.id} className="flex items-start gap-2 justify-center">
                    <div 
                      className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                        bullet.color === 'blue' ? 'bg-blue-500' :
                        bullet.color === 'red' ? 'bg-red-500' :
                        bullet.color === 'purple' ? 'bg-purple-500' :
                        'bg-gray-400'
                      }`}
                    />
                    <span className={`text-xs text-center font-bold ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}>
                      {bullet.text}
                    </span>
                  </div>
                ))}
              </div>
            ) : fields[id]?.content ? (
              <p className={`text-center whitespace-pre-wrap text-xs break-words overflow-y-auto max-h-[100px] scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-purple-900 ${getTextColorClass(fields[id]?.color)}`}>
                {fields[id].content}
              </p>
            ) : (
              <p className={`text-center italic text-xs ${isDarkMode ? 'text-purple-400' : 'text-purple-500'}`}>Digite o nome</p>
            )}
          </div>
        </div>

        <div 
          {...getRootProps()} 
          className={`border rounded-xl p-4 min-h-[80px] transition-all cursor-pointer flex items-center justify-center ${
            isDarkMode 
              ? `border-white hover:border-purple-300 ${isDragActive ? 'border-purple-400 bg-purple-900/30' : ''}` 
              : `border-purple-400 hover:border-purple-600 ${isDragActive ? 'border-purple-600 bg-purple-100' : ''}`
          }`}
        >
          <input {...getInputProps()} />
          {fields[logoId]?.content ? (
            <img 
              src={fields[logoId].content} 
              alt="Logo da empresa" 
              className="max-h-[60px] max-w-full object-contain"
            />
          ) : (
            <div className={`flex flex-col items-center ${isDarkMode ? 'text-purple-400' : 'text-purple-500'}`}>
              <Upload size={20} className="mb-1" />
              <p className="text-xs text-center italic">Upload do logo</p>
            </div>
          )}
        </div>
      </div>
      <h3 className={`font-bold text-center text-sm ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`}>{title}</h3>
      
      {/* Modal de Vídeo - Aplicação Interna */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoSrc="/video-aplicacao-interna.mp4"
        title="Vídeo - Aplicação Interna"
      />
      
      {/* Modal de Vídeo - Aplicação Externa */}
      <VideoModal
        isOpen={isExternalVideoModalOpen}
        onClose={() => setIsExternalVideoModalOpen(false)}
        videoSrc="/video-aplicacao-externa.mp4"
        title="Vídeo - Aplicação Externa"
      />
    </div>
  );
};

export default CompanyInfo;