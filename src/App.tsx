import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import './index.css';
import TopicInput from './components/TopicInput';
import EmotionSelector from './components/EmotionSelector';
import NeedSelector from './components/NeedSelector';
import Feedback from './components/Feedback';
import Summary from './components/Summary';
import Stepper from './components/Stepper';
import LegalViews from './components/LegalViews';
import { emotions as emotionsData } from './data/emotions';

function App() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentView, setCurrentView] = useState('welcome'); // welcome, topic, emotions, needs, feedback, summary, disclaimer, privacy
  const [topic, setTopic] = useState('');
  const [emotions, setEmotions] = useState<string[]>([]);
  const [needs, setNeeds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');

  // Determine if satisfied based on emotions
  const isSatisfied = useMemo(() => {
    if (emotions.length === 0) return false;
    // Check if the first emotion exists in 'satisfied' list
    for (const cat of emotionsData.satisfied) {
      if (cat.items.includes(emotions[0])) return true;
    }
    return false;
  }, [emotions]);

  // Sync URL language with i18n
  useEffect(() => {
    if (lang && (lang === 'en-US' || lang === 'zh-TW') && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    } else if (lang && lang !== 'en-US' && lang !== 'zh-TW') {
      // Fallback for invalid language in URL
      navigate('/' + (i18n.language || 'en-US'), { replace: true });
    }
  }, [lang, i18n, navigate]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en-US' ? 'zh-TW' : 'en-US';
    navigate(`/${newLang}?${searchParams.toString()}`);
  };

  const handleStart = () => {
    setCurrentView('topic');
  };

  const handleTopicSubmit = (inputTopic: string) => {
    setTopic(inputTopic);
    setCurrentView('emotions');
  };

  const handleEmotionsSubmit = (selectedEmotions: string[]) => {
    setEmotions(selectedEmotions);
    setCurrentView('needs');
  };

  const handleNeedsSubmit = (selectedNeeds: string[]) => {
    setNeeds(selectedNeeds);
    setCurrentView('feedback'); // Go to feedback instead of summary
  };

  const handleFeedbackSubmit = (inputFeedback: string) => {
    setFeedback(inputFeedback);
    setCurrentView('summary');
  };

  const handleRestart = () => {
    setTopic('');
    setEmotions([]);
    setNeeds([]);
    setFeedback('');
    setCurrentView('welcome');
    setSearchParams(new URLSearchParams());
  };

  const getStep = () => {
    switch (currentView) {
      case 'topic': return 1;
      case 'emotions': return 2;
      case 'needs': return 3;
      case 'feedback': return 4;
      case 'summary': return 4;
      default: return 0;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header with Gradient */}
      <header className="h-80 w-full flex flex-col items-center pt-[60px] text-white text-center bg-gradient-to-br from-[#244e59] via-[#1d9d88] to-[#4fd1c5] relative">
        <div className="absolute top-5 right-5">
          <button onClick={toggleLanguage} className="text-white/80 text-sm hover:text-white transition-colors">
            {i18n.language === 'en-US' ? '中文' : 'English'}
          </button>
        </div>
        <h1 className="text-4xl mb-2 font-bold">{t('welcome.title')}</h1>
        <p className="opacity-90 text-lg">{t('welcome.subtitle')}</p>
      </header>

      {/* Main Card Container */}
      <main className="bg-card text-card-foreground rounded-2xl shadow-md p-12 max-w-[800px] w-[90%] mx-auto -mt-[100px] mb-8 relative z-10 min-h-[400px]">
        {currentView !== 'welcome' && currentView !== 'disclaimer' && currentView !== 'privacy' && (
          <Stepper currentStep={getStep()} />
        )}

        {currentView === 'welcome' && (
          <div className="animate-in slide-in-from-bottom-5 fade-in duration-500 text-center py-10">
            <p className="text-foreground mb-8 text-xl whitespace-pre-line">
              {t('welcome.steps_intro')}
            </p>
            <button
              onClick={handleStart}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-4 rounded-lg text-lg font-semibold transition-colors"
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

        {currentView === 'feedback' && (
          <Feedback
            onNext={handleFeedbackSubmit}
            initialFeedback={feedback}
            isSatisfied={isSatisfied}
          />
        )}

        {currentView === 'summary' && (
          <Summary
            topic={topic}
            emotions={emotions}
            needs={needs}
            feedback={feedback}
            isSatisfied={isSatisfied}
            onRestart={handleRestart}
          />
        )}

        {(currentView === 'disclaimer' || currentView === 'privacy') && (
          <LegalViews view={currentView} onBack={() => setCurrentView('welcome')} /> // simplified back
        )}
      </main>

      <div className="max-w-[800px] w-[90%] mx-auto p-6 bg-blue-50 text-blue-900 rounded-2xl text-sm mb-8 leading-relaxed">
        <h4 className="flex items-center mb-2 font-semibold">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-700 text-white mr-2 text-xs">i</span>
          {t('footer.title')}
        </h4>
        <p>
          {t('footer.content')}
        </p>
      </div>

      {/* Real Footer */}
      <footer className="text-center p-4 mt-auto text-xs opacity-70 w-full">
        <p className="mb-2">
          <button onClick={() => setCurrentView('disclaimer')} className="mr-4 opacity-80 decoration-1 underline hover:opacity-100">
            {t('legal.disclaimer')}
          </button>
          <button onClick={() => setCurrentView('privacy')} className="opacity-80 decoration-1 underline hover:opacity-100">
            {t('legal.privacy')}
          </button>
        </p>
        <p>
          &copy; 2025 FcrbPeter
        </p>
      </footer>
    </div>
  );
}

export default App;
