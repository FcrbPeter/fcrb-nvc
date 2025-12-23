import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { emotions } from '../data/emotions';
import { X } from 'lucide-react';

function AllEmotionsPage() {
    const { t } = useTranslation();
    const [selectedSection, setSelectedSection] = useState<string | null>(null);
    const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl pb-32">
            <h1 className="text-3xl font-bold text-center mb-8 text-primary">{t('toolbox.emotions')}</h1>

            <div className="space-y-12">
                {/* Unsatisfied Section */}
                <section>
                    <h2 className="text-2xl font-semibold mb-6 text-slate-600 bg-slate-100 p-3 rounded-lg inline-block">
                        {t('emotions.unsatisfied')}
                    </h2>
                    <div className="space-y-8">
                        {emotions.unsatisfied.map((cat) => (
                            <div key={cat.category}>
                                <h3 className="text-lg font-medium text-slate-500 mb-3 border-b pb-1">
                                    {t(`emotions.${cat.category}`)}
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                    {cat.items.map((key) => (
                                        <button
                                            key={key}
                                            onClick={() => { setSelectedSection('unsatisfied'); setSelectedEmotion(key) }}
                                            className="p-4 rounded-xl border border-border bg-card hover:bg-slate-50 hover:border-secondary hover:shadow-md transition-all duration-200 text-sm md:text-base font-medium"
                                        >
                                            {t(`emotions.${key}`)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Satisfied Section */}
                <section>
                    <h2 className="text-2xl font-semibold mb-6 text-rose-600 bg-rose-50 p-3 rounded-lg inline-block">
                        {t('emotions.satisfied')}
                    </h2>
                    <div className="space-y-8">
                        {emotions.satisfied.map((cat) => (
                            <div key={cat.category}>
                                <h3 className="text-lg font-medium text-rose-400 mb-3 border-b border-rose-100 pb-1">
                                    {t(`emotions.${cat.category}`)}
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                    {cat.items.map((key) => (
                                        <button
                                            key={key}
                                            onClick={() => { setSelectedSection('satisfied'); setSelectedEmotion(key) }}
                                            className="p-4 rounded-xl text-rose-700 border border-rose-100 bg-white hover:bg-rose-50 hover:border-rose-300 hover:shadow-md transition-all duration-200 text-sm md:text-base font-medium"
                                        >
                                            {t(`emotions.${key}`)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Popup Modal */}
            {selectedEmotion && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setSelectedEmotion(null)}
                >
                    <div
                        className="bg-white rounded-3xl shadow-2xl p-8 relative w-full max-w-2xl min-h-[50vh] flex items-center justify-center animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedEmotion(null)}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                        >
                            <X size={32} />
                        </button>
                        <div className="w-full h-full flex items-center justify-center p-4">
                            {(() => {
                                const text = t(`emotions.${selectedEmotion}`);
                                const minWidth = 100;
                                const charWidth = 12;
                                const width = Math.max(minWidth, text.length * charWidth);
                                return (
                                    <svg viewBox={`0 0 ${width} 24`} className="w-full h-auto max-h-[200px]">
                                        <text
                                            x="50%"
                                            y="50%"
                                            dominantBaseline="middle"
                                            textAnchor="middle"
                                            className={"font-bold " + (selectedSection === 'unsatisfied' ? 'fill-slate-800' : 'fill-rose-400')}
                                            fontSize="20"
                                        >
                                            {text}
                                        </text>
                                    </svg>
                                );
                            })()}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AllEmotionsPage;
