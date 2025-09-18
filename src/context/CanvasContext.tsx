import React, { createContext, useState, useContext, useEffect } from 'react';

interface FieldData {
  content: string;
  color?: 'blue' | 'red' | 'purple';
}

interface CanvasContextType {
  fields: Record<string, FieldData>;
  updateField: (id: string, content: string) => void;
  updateFieldColor: (id: string, color?: 'blue' | 'red' | 'purple') => void;
  activeField: string | null;
  setActiveField: (id: string | null) => void;
  resetFields: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const defaultFields: Record<string, FieldData> = {
  'company-name': { content: '' },
  'project-leader': { content: '' },
  'management-team': { content: '' },
  'contact-point': { content: '' },
  'start-date': { content: '' },
  'end-date': { content: '' },
  'corporate-strategy': { content: '' },
  'objectives-value': { content: '' },
  'key-activities': { content: '' },
  'internal-team': { content: '' },
  'external-team': { content: '' },
  'ai-tools-models': { content: '' },
  'problems-pains': { content: '' },
  'expected-benefits': { content: '' },
  'skills': { content: '' },
  'investment': { content: '' },
  'mvp-poc': { content: '' },
  'performance-metrics': { content: '' },
  'governance-ethics': { content: '' },
};

const CanvasContext = createContext<CanvasContextType>({
  fields: defaultFields,
  updateField: () => {},
  updateFieldColor: () => {},
  activeField: null,
  setActiveField: () => {},
  resetFields: () => {},
  isDarkMode: true,
  toggleTheme: () => {},
});

export const useCanvas = () => useContext(CanvasContext);

export const CanvasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fields, setFields] = useState<Record<string, FieldData>>({
    ...defaultFields,
    'corporate-strategy': {
      content: 'Esta é uma [[blue]]estratégia atual[[/blue]] da empresa. Temos alguns [[red]]gaps importantes[[/red]] que precisam ser resolvidos. Aqui estão algumas [[purple]]soluções propostas[[/purple]] para melhorar.',
      color: undefined
    },
    'objectives-value': {
      content: 'Objetivos [[blue]]já implementados[[/blue]] incluem automação. [[red]]Problemas identificados[[/red]]: falta de integração. [[purple]]Insights para melhoria[[/purple]]: usar IA.',
      color: undefined
    }
  });
  const [activeField, setActiveField] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedFields = localStorage.getItem('innovAI-canvas');
    if (savedFields) {
      try {
        const parsedFields = JSON.parse(savedFields);
        setFields(parsedFields);
      } catch (e) {
        console.error('Error loading saved data', e);
      }
    }

    const savedTheme = localStorage.getItem('innovAI-theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('innovAI-canvas', JSON.stringify(fields));
  }, [fields]);

  useEffect(() => {
    localStorage.setItem('innovAI-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const updateField = (id: string, content: string) => {
    setFields(prev => ({
      ...prev,
      [id]: { ...prev[id], content },
    }));
  };

  const updateFieldColor = (id: string, color?: 'blue' | 'red' | 'purple') => {
    setFields(prev => ({
      ...prev,
      [id]: { ...prev[id], color },
    }));
  };

  const resetFields = () => {
    setFields(defaultFields);
    localStorage.removeItem('innovAI-canvas');
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <CanvasContext.Provider value={{ 
      fields, 
      updateField,
      updateFieldColor, 
      activeField, 
      setActiveField, 
      resetFields,
      isDarkMode,
      toggleTheme
    }}>
      {children}
    </CanvasContext.Provider>
  );
};