import { useState } from 'react';
import LandingPage from './components/LandingPage';
import CVCreator from './components/CVCreator';
import './data/templates.css';

export default function App() {
  const [view, setView] = useState('landing');
  const [initialTemplate, setInitialTemplate] = useState('');
  const [lang, setLang] = useState(() => localStorage.getItem('app_lang') || 'es');

  const handleLanguageChange = (newLang) => {
    setLang(newLang);
    localStorage.setItem('app_lang', newLang);
  };

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
        {view === 'landing' && (
          <LandingPage
            onStartCreator={handleStartCreator}
            lang={lang}
            onLanguageChange={handleLanguageChange}
          />
        )}
      </div>
      <div className={`view-transition ${view === 'editor' ? 'view-active' : 'view-exit'}`}>
        {view === 'editor' && (
          <CVCreator
            initialTemplate={initialTemplate}
            onBackToLanding={handleBackToLanding}
            lang={lang}
            onLanguageChange={handleLanguageChange}
          />
        )}
      </div>
    </div>
  );
}
