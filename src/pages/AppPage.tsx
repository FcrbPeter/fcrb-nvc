import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import TopicInput from '../components/TopicInput';
import EmotionSelector from '../components/EmotionSelector';
import NeedSelector from '../components/NeedSelector';
import Feedback from '../components/Feedback';
import Summary from '../components/Summary';
import Stepper from '../components/Stepper';
import { emotions as emotionsData } from '../data/emotions';
import { logEvent } from '../utils/analytics';

function AppPage() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const navigate = useNavigate();

  const [currentView, setCurrentView] = useState('welcome'); // welcome, topic, emotions, needs, feedback, summary
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
    setCurrentView('feedback');
  };

  const handleFeedbackSubmit = (inputFeedback: string) => {
    setFeedback(inputFeedback);
    setCurrentView('summary');
    logEvent({ category: 'Flow', action: 'Complete' });
  };

  const handleRestart = () => {
    setTopic('');
    setEmotions([]);
    setNeeds([]);
    setFeedback('');
    setCurrentView('welcome');
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
    <>
      {currentView !== 'welcome' && (
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
    </>
  );
}

export default AppPage;
