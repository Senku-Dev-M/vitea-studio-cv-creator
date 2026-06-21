import { useState } from 'react';
import LandingPage from './components/LandingPage';
import CVCreator from './components/CVCreator';
import './data/templates.css';

export default function App() {
  const [view, setView] = useState('landing');
  const [initialTemplate, setInitialTemplate] = useState('');

  const handleStartCreator = (templateId = '') => {
    setInitialTemplate(templateId);
    setView('editor');
  };

  const handleBackToLanding = () => {
    setView('landing');
  };

  return (
    <div className="app-root">
      <div className={`view-transition ${view === 'landing' ? 'view-active' : 'view-exit'}`}>
        {view === 'landing' && <LandingPage onStartCreator={handleStartCreator} />}
      </div>
      <div className={`view-transition ${view === 'editor' ? 'view-active' : 'view-exit'}`}>
        {view === 'editor' && <CVCreator initialTemplate={initialTemplate} onBackToLanding={handleBackToLanding} />}
      </div>
    </div>
  );
}
