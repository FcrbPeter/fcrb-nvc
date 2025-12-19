import { useTranslation } from 'react-i18next';

interface SummaryProps {
    topic: string;
    emotions: string[];
    needs: string[];
    feedback?: string;
    isSatisfied?: boolean;
    onRestart: () => void;
}

function Summary({ topic, emotions, needs, feedback, isSatisfied, onRestart }: SummaryProps) {
    const { t } = useTranslation();

    return (
        <div className="animate-in slide-in-from-bottom-5 fade-in duration-500 text-center">
            <h2 className="mb-6 text-2xl font-bold">{t('summary.title')}</h2>

            <div className="bg-card p-6 rounded-2xl shadow-md mb-8 text-left bg-white">
                <p className="text-lg mb-4 text-foreground leading-relaxed italic">
                    "{topic}"
                </p>

                <hr className="border-t border-border my-4" />

                <p className="text-muted-foreground mb-2 text-sm font-medium uppercase tracking-wide">
                    {t('summary.because')}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {emotions.map((emotionKey, index) => {
                        // Dynamic class based on satisfied state
                        const containerClass = isSatisfied
                            ? "flex items-center gap-2 bg-pink-50 px-3 py-1.5 rounded-lg text-sm font-medium text-pink-700 shadow-sm"
                            : "flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg text-sm font-medium text-foreground";

                        const badgeClass = isSatisfied
                            ? "flex items-center justify-center w-5 h-5 bg-pink-100 rounded-full text-xs text-pink-600"
                            : "flex items-center justify-center w-5 h-5 bg-slate-200 rounded-full text-xs text-slate-600";

                        return (
                            <div key={emotionKey} className={containerClass}>
                                <span className={badgeClass}>
                                    {index + 1}
                                </span>
                                {t(`emotions.${emotionKey}`)}
                            </div>
                        );
                    })}
                </div>

                {/* Needs Section */}
                {needs && needs.length > 0 && (
                    <>
                        <p className="text-muted-foreground mb-2 text-sm font-medium uppercase tracking-wide">
                            {t('summary.my_needs')}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {needs.map((needKey, index) => (
                                <div key={needKey} className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-lg text-sm font-medium text-emerald-700">
                                    <span className="flex items-center justify-center w-5 h-5 bg-emerald-100 rounded-full text-xs text-emerald-600">
                                        {index + 1}
                                    </span>
                                    {t(`needs.${needKey}`)}
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* Feedback Section */}
                {feedback && feedback.trim().length > 0 && (
                    <>
                        <hr className="border-t border-border my-4" />
                        <p className="text-muted-foreground mb-2 text-sm font-medium uppercase tracking-wide">
                            {t('feedback.title')}
                        </p>
                        <div className="text-foreground whitespace-pre-line leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                            {feedback}
                        </div>
                    </>
                )}
            </div>

            <button
                onClick={onRestart}
                className="border border-foreground text-foreground px-8 py-3 rounded-xl text-base font-semibold hover:bg-slate-50 transition-colors"
            >
                {t('summary.restart')}
            </button>
        </div>
    );
}

export default Summary;
