import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './index.css';
import TopicInput from './components/TopicInput';
import EmotionSelector from './components/EmotionSelector';
import NeedSelector from './components/NeedSelector';
import Summary from './components/Summary';
import Stepper from './components/Stepper';

function App() {
  const { t, i18n } = useTranslation();
  const [currentView, setCurrentView] = useState('welcome'); // welcome, topic, emotions, needs, summary
  const [topic, setTopic] = useState('');
  const [emotions, setEmotions] = useState([]);
  const [needs, setNeeds] = useState([]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en-US' ? 'zh-TW' : 'en-US';
    i18n.changeLanguage(newLang);
  };

  const handleStart = () => {
    setCurrentView('topic');
  };

  const handleTopicSubmit = (inputTopic) => {
    setTopic(inputTopic);
    setCurrentView('emotions');
  };

  const handleEmotionsSubmit = (selectedEmotions) => {
    setEmotions(selectedEmotions);
    setCurrentView('needs');
  };

  const handleNeedsSubmit = (selectedNeeds) => {
    setNeeds(selectedNeeds);
    setCurrentView('summary');
  };

  const handleRestart = () => {
    setTopic('');
    setEmotions([]);
    setNeeds([]);
    setCurrentView('welcome');
  };

  const getStep = () => {
    switch (currentView) {
      case 'topic': return 1;
      case 'emotions': return 2;
      case 'needs': return 3;
      case 'summary': return 3; // Keep at 3 or hide stepper? Let's keep at 3 to show completion
      default: return 0;
    }
  };

  return (
    <div className="app-container">
      {/* Header with Gradient */}
      <header className="header-bg">
        <div style={{ position: 'absolute', top: 20, right: 20 }}>
          <button onClick={toggleLanguage} style={{ color: 'white', opacity: 0.8, fontSize: '0.9rem' }}>
            {i18n.language === 'en-US' ? '中文' : 'English'}
          </button>
        </div>
        <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>{t('welcome.title')}</h1>
        <p style={{ opacity: 0.9, fontSize: '1.1rem' }}>{t('welcome.subtitle')}</p>
      </header>

      {/* Main Card Container */}
      <main className="card-container">
        {currentView !== 'welcome' && (
          <Stepper currentStep={getStep()} />
        )}

        {currentView === 'welcome' && (
          <div className="fade-in-up" style={{ textAlign: 'center', padding: '40px 0' }}>
            <p style={{ color: 'var(--color-text-main)', marginBottom: 'var(--spacing-xl)', fontSize: '1.2rem', whiteSpace: 'pre-line' }}>
              {t('welcome.steps_intro')}
            </p>
            <button
              onClick={handleStart}
              className="primary-btn"
              style={{ padding: '16px 48px', fontSize: '1.1rem' }}
            >
              {t('welcome.start')}
            </button>
          </div>
        )}

        {currentView === 'topic' && (
          <TopicInput onNext={handleTopicSubmit} initialValue={topic} />
        )}

        {currentView === 'emotions' && (
          <EmotionSelector onNext={handleEmotionsSubmit} initialSelection={emotions} />
        )}

        {currentView === 'needs' && (
          <NeedSelector onNext={handleNeedsSubmit} initialSelection={needs} />
        )}

        {currentView === 'summary' && (
          <Summary topic={topic} emotions={emotions} needs={needs} onRestart={handleRestart} />
        )}
      </main>

      {/* Footer Info */}
      <div className="info-footer">
        <h4 style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--color-info-text)', color: 'white', marginRight: '8px', fontSize: '12px'
          }}>i</span>
          {t('footer.title')}
        </h4>
        <p>
          {t('footer.content')}
        </p>
      </div>
    </div>
  );
}

export default App;
