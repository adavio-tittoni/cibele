import React from 'react';
import CanvasBox from './CanvasBox';
import DividedBox from './DividedBox';
import CentralBox from './CentralBox';
import CompanyInfo from './CompanyInfo';
import EditModal from './EditModal';
import { useCanvas } from '../context/CanvasContext';

const Canvas: React.FC = () => {
  const { activeField } = useCanvas();

  return (
    <div className="relative">
      <div id="canvas-container" className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {/* Left Column */}
        <div className="flex flex-col gap-4">
          <DividedBox 
            number="1"
            title1="Estratégia Corporativa"
            title2="Objetivos e Proposta de Valor"
            id1="corporate-strategy"
            id2="objectives-value"
          />
          <CanvasBox 
            number="2"
            title="Atividades Chave da Empresa"
            subtitle="(com oportunidades de IA)"
            id="key-activities"
          />
          <DividedBox 
            number="3"
            title1="Equipe Interna"
            title2="Equipe Externa"
            id1="internal-team"
            id2="external-team"
          />
          <CanvasBox 
            number="4"
            title="Ferramentas e Modelos de IA"
            id="ai-tools-models"
          />
          <DividedBox 
            number="5"
            title1="Problemas e Dores"
            title2="Benefícios Esperados"
            id1="problems-pains"
            id2="expected-benefits"
          />
        </div>

        {/* Center Column */}
        <div className="flex flex-col gap-4 justify-between">
          <CompanyInfo 
            title="Nome e Logo da Empresa"
            id="company-name"
          />
          <CentralBox 
            title="Líder do projeto"
            id="project-leader"
          />
          <CentralBox 
            title="Equipe gestora"
            id="management-team"
          />
          <CentralBox 
            title="Ponto de contato"
            id="contact-point"
          />
          <DividedBox 
            title1="Data Início"
            title2="Data Fim"
            id1="start-date"
            id2="end-date"
            isCentral={true}
          />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          <CanvasBox 
            number="6"
            title="Skills"
            subtitle="(Hard, Soft and Sexy Skills)"
            id="skills"
          />
          <CanvasBox 
            number="7"
            title="Investimento"
            subtitle="(Disponível e Esperado)"
            id="investment"
          />
          <CanvasBox 
            number="8"
            title="MVP / POC"
            id="mvp-poc"
          />
          <CanvasBox 
            number="9"
            title="Métricas de Desempenho"
            id="performance-metrics"
          />
          <CanvasBox 
            number="10"
            title="Governança e Ética em IA"
            id="governance-ethics"
          />
        </div>
      </div>

      {activeField && <EditModal />}
    </div>
  );
};

export default Canvas;