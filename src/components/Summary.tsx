import { useTranslation } from 'react-i18next';

interface SummaryProps {
    topic: string;
    emotions: string[];
    needs: string[];
    onRestart: () => void;
}

function Summary({ topic, emotions, needs, onRestart }: SummaryProps) {
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
                    {emotions.map(emotionKey => (
                        <span key={emotionKey} className="px-3 py-1.5 bg-slate-100 rounded-lg text-sm font-medium text-foreground">
                            {t(`emotions.${emotionKey}`)}
                        </span>
                    ))}
                </div>

                {/* Needs Section */}
                {needs && needs.length > 0 && (
                    <>
                        <p className="text-muted-foreground mb-2 text-sm font-medium uppercase tracking-wide">
                            {t('summary.my_needs')}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {needs.map(needKey => (
                                <span key={needKey} className="px-3 py-1.5 bg-sky-50 text-sky-700 rounded-lg text-sm font-medium">
                                    {t(`needs.${needKey}`)}
                                </span>
                            ))}
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
