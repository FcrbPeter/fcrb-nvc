import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FeedbackProps {
    onNext: (feedback: string) => void;
    initialFeedback: string;
    isSatisfied: boolean;
}

function Feedback({ onNext, initialFeedback, isSatisfied }: FeedbackProps) {
    const { t } = useTranslation();
    const [feedback, setFeedback] = useState(initialFeedback);

    const handleSubmit = () => {
        onNext(feedback);
    };

    return (
        <div className="animate-in slide-in-from-bottom-5 fade-in duration-500">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">{t('feedback.title')}</h2>
                <h3 className="text-lg text-primary font-medium">
                    {isSatisfied ? t('feedback.subtitle_satisfied') : t('feedback.subtitle_unsatisfied')}
                </h3>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm mb-8">
                <p className="text-slate-700 text-lg leading-relaxed mb-6 whitespace-pre-line">
                    {isSatisfied ? t('feedback.prompt_satisfied') : t('feedback.prompt_unsatisfied')}
                </p>

                <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder={isSatisfied ? t('feedback.placeholder_satisfied') : t('feedback.placeholder_unsatisfied')}
                    className="w-full p-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 min-h-[150px] resize-none text-base transition-all outline-none"
                    autoFocus
                />
            </div>

            <div className="flex justify-center">
                <button
                    onClick={handleSubmit}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg text-base font-semibold min-w-[200px] transition-colors"
                >
                    {t('feedback.next')}
                </button>
            </div>
        </div>
    );
}

export default Feedback;
