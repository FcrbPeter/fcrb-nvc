import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { needs } from '../data/needs';
import { X } from 'lucide-react';

function AllNeedsPage() {
    const { t } = useTranslation();
    const [selectedNeed, setSelectedNeed] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl pb-32 animate-in slide-in-from-bottom-5 fade-in duration-500">
            <h1 className="text-3xl font-bold text-center mb-8 text-foreground text-primary">{t('toolbox.needs')}</h1>

            <div className="space-y-12">
                {needs.map((cat) => (
                    <div key={cat.category}>
                        <h2 className="text-xl font-semibold text-primary mb-4 border-b border-primary/20 pb-2 inline-block">
                            {t(`needs.${cat.category}`)}
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {cat.items.map((key) => (
                                <button
                                    key={key}
                                    onClick={() => setSelectedNeed(key)}
                                    className="p-3 md:p-4 rounded-xl border border-border bg-card hover:bg-primary/5 hover:border-primary/50 hover:shadow-md transition-all duration-200 text-sm md:text-base font-medium h-full flex items-center justify-center text-center leading-tight"
                                >
                                    {t(`needs.${key}`)}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Popup Modal */}
            {selectedNeed && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setSelectedNeed(null)}
                >
                    <div
                        className="bg-white rounded-3xl shadow-2xl p-8 relative w-full max-w-2xl min-h-[50vh] flex items-center justify-center animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedNeed(null)}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                        >
                            <X size={32} />
                        </button>
                        <div className="w-full h-full flex items-center justify-center p-4">
                            {(() => {
                                const text = t(`needs.${selectedNeed}`);
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
                                            className={"font-bold fill-primary"}
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

export default AllNeedsPage;
