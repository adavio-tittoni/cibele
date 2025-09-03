import React from 'react';
import { CircleUserRound } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-4 px-4 md:px-8 border-t border-purple-800">
      <div className="flex items-center">
        <CircleUserRound size={20} className="text-purple-400 mr-2" />
        <span className="text-xs text-purple-300">Desenvolvido por Cibelle Ferreira Consulting</span>
      </div>
    </footer>
  );
};

export default Footer;