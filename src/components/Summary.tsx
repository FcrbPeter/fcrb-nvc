import { useTranslation } from 'react-i18next';
import { useRef, useMemo, useState } from 'react';
import { toPng } from 'html-to-image';
import { logEvent } from '../utils/analytics';
import { generateNvcMessage } from '../utils/nvcFormatter';
import { Copy, Check } from 'lucide-react';

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
    const [copied, setCopied] = useState(false);

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

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(sharingMessage);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            logEvent({ category: 'Engagement', action: 'Copy Sharing Message' });
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    };

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
            <h2 className="mb-6 text-2xl font-bold">{t('summary.title')}</h2>

            <div className="mb-8 print:p-0">
                <div ref={summaryCardRef}>
                    <div className="bg-card p-6 rounded-2xl shadow-md text-left bg-white print:shadow-none print:border print:border-slate-200">
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
                </div>

                {/* Sharing Message Section - Outside the capture area */}
                <div className="mt-8 text-left bg-blue-50/50 border border-blue-100 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-blue-800">
                            {t('summary.share_title')}
                        </h3>
                        <button
                            onClick={handleCopy}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${copied
                                    ? "bg-green-100 text-green-700 ring-1 ring-green-200"
                                    : "bg-white text-slate-600 shadow-sm hover:text-blue-600 hover:shadow ring-1 ring-slate-200"
                                }`}
                        >
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                            {copied ? t('summary.copied') : t('summary.copy')}
                        </button>
                    </div>
                    <div className="bg-white p-4 rounded-xl text-slate-700 leading-relaxed shadow-sm border border-blue-100/50">
                        {sharingMessage}
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
