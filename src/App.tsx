import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Canvas from './components/Canvas';
import { CanvasProvider, useCanvas } from './context/CanvasContext';

const AppContent = () => {
  const { isDarkMode } = useCanvas();
  
  return (
    <div className={`min-h-screen flex flex-col ${
      isDarkMode 
        ? 'bg-deep-purple text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <Header />
      <main className="flex-grow py-4 px-4 md:px-6 lg:px-8 overflow-x-hidden">
        <Canvas />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <CanvasProvider>
      <AppContent />
    </CanvasProvider>
  );
}

export default App;