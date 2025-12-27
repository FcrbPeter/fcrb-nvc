import { useTranslation } from 'react-i18next';
import { useRef, useMemo } from 'react';
import { toPng } from 'html-to-image';
import { generateNvcMessage } from '../utils/nvcFormatter';
import { logEvent } from '@/utils/analytics';

interface SummaryProps {
    topic: string;
    emotions: string[];
    needs: string[];
    feedback?: string;
    isSatisfied?: boolean;
    onRestart: () => void;
}

function Summary({ topic, emotions, needs, feedback, isSatisfied, onRestart }: SummaryProps) {
    const { t, i18n } = useTranslation();
    const summaryCardRef = useRef<HTMLDivElement>(null);

    const sharingMessage = useMemo(() => {
        // Map emotion/need keys to translated strings
        const translatedEmotions = emotions.map(k => t(`emotions.${k}`));
        const translatedNeeds = needs.map(k => t(`needs.${k}`));

        return generateNvcMessage(
            i18n.language,
            topic,
            translatedEmotions,
            translatedNeeds,
            feedback
        );
    }, [i18n.language, topic, emotions, needs, feedback, t]);

    const handleSaveImage = async () => {
        if (summaryCardRef.current) {
            try {
                const element = summaryCardRef.current;
                const padding = 40;
                // Calculate dimensions including padding
                const width = element.offsetWidth + (padding * 2);
                const height = element.offsetHeight + (padding * 2);

                const dataUrl = await toPng(element, {
                    cacheBust: true,
                    width: width,
                    height: height,
                    style: {
                        backgroundImage: 'linear-gradient(to bottom right, #244e59, #1d9d88, #4fd1c5)',
                        padding: `${padding}px`,
                        margin: '0',
                        borderRadius: '0',
                        boxSizing: 'border-box',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }
                });
                const link = document.createElement('a');
                link.download = `nvc-summary-${new Date().toISOString().split('T')[0]}.png`;
                link.href = dataUrl;
                link.click();
                logEvent({ category: 'Engagement', action: 'Save Image' });
            } catch (err) {
                console.error('Failed to save image:', err);
            }
        }
    };

    return (
        <div className="animate-in slide-in-from-bottom-5 fade-in duration-500 text-center">
            {/* <h2 className="mb-6 text-2xl font-bold">{t('summary.title')}</h2> */}
            <div className="text-slate-700 leading-relaxed text-xl pb-8">
                {sharingMessage}
            </div>

            <div className="mb-8 print:p-0">
                <div ref={summaryCardRef}>
                    <div className="bg-card p-6 rounded-2xl shadow-md text-left bg-white print:shadow-none print:border print:border-slate-200">

                        {/* Topic Section */}
                        <div className="mb-6">
                            <p className="text-muted-foreground mb-3 text-sm font-bold uppercase tracking-wider text-slate-400">
                                {t('summary.when')}
                            </p>
                            <p className="text-lg text-foreground leading-relaxed italic font-medium">
                                "{topic}"
                            </p>
                        </div>

                        {/* Emotions Section */}
                        <div className="mb-6">
                            <p className="text-muted-foreground mb-3 text-sm font-bold uppercase tracking-wider text-slate-400">
                                {t('summary.because')}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {emotions.map((emotionKey, index) => {
                                    const containerClass = isSatisfied
                                        ? "flex items-center gap-2 bg-pink-50 px-3 py-1.5 rounded-lg text-sm font-medium text-pink-700 shadow-sm border border-pink-100"
                                        : "flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-700 border border-slate-200";

                                    const badgeClass = isSatisfied
                                        ? "flex items-center justify-center w-5 h-5 bg-pink-100 rounded-full text-[10px] text-pink-600 font-bold"
                                        : "flex items-center justify-center w-5 h-5 bg-slate-200 rounded-full text-[10px] text-slate-600 font-bold";

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
                        </div>

                        {/* Needs Section */}
                        {needs && needs.length > 0 && (
                            <div className="mb-8">
                                <p className="text-muted-foreground mb-3 text-sm font-bold uppercase tracking-wider text-slate-400">
                                    {t('summary.my_needs')}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {needs.map((needKey, index) => (
                                        <div key={needKey} className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-lg text-sm font-medium text-emerald-700 border border-emerald-100 shadow-sm">
                                            <span className="flex items-center justify-center w-5 h-5 bg-emerald-100 rounded-full text-[10px] text-emerald-600 font-bold">
                                                {index + 1}
                                            </span>
                                            {t(`needs.${needKey}`)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Feedback Section */}
                        {feedback && feedback.trim().length > 0 && (
                            <div className="mt-6 pt-2">
                                <p className="text-muted-foreground mb-3 text-sm font-bold uppercase tracking-wider text-slate-400">
                                    {t('summary.so_my_actions')}
                                </p>
                                <div className="text-slate-600 whitespace-pre-line leading-relaxed pl-1">
                                    {feedback}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 print:hidden">
                <button
                    onClick={handleSaveImage}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-xl text-base font-medium hover:bg-emerald-700 transition-colors shadow-sm"
                >
                    {t('summary.save_image')}
                </button>
                <button
                    onClick={onRestart}
                    className="border border-slate-300 text-slate-700 px-6 py-3 rounded-xl text-base font-medium hover:bg-slate-50 transition-colors"
                >
                    {t('summary.restart')}
                </button>
            </div>
        </div>
    );
}

export default Summary;
