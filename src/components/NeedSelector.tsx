import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { needs } from '../data/needs';

interface NeedSelectorProps {
    onNext: (selected: string[]) => void;
    initialSelection: string[];
}

function NeedSelector({ onNext, initialSelection }: NeedSelectorProps) {
    const { t } = useTranslation();
    const [selectedNeeds, setSelectedNeeds] = useState<string[]>(initialSelection || []);

    const MAX_SELECTION = 3;

    const toggleNeed = (key: string) => {
        if (selectedNeeds.includes(key)) {
            setSelectedNeeds(selectedNeeds.filter(n => n !== key));
        } else {
            if (selectedNeeds.length < MAX_SELECTION) {
                setSelectedNeeds([...selectedNeeds, key]);
            }
        }
    };

    return (
        <div className="animate-in slide-in-from-bottom-5 fade-in duration-500">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-1">{t('needs.title')}</h2>
                <p className="text-slate-500">{t('needs.subtitle')}</p>
            </div>

            <div className="flex flex-col gap-6">
                {needs.map((cat) => (
                    <div key={cat.category} className="animate-in slide-in-from-bottom-2 fade-in duration-500">
                        <h3 className="text-base text-slate-400 mb-2 pl-1 font-medium">
                            {t(`needs.${cat.category}`)}
                        </h3>
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-3">
                            {cat.items.map((key) => {
                                const selectionIndex = selectedNeeds.indexOf(key);
                                const isSelected = selectionIndex !== -1;
                                const isDisabled = !isSelected && selectedNeeds.length >= MAX_SELECTION;
                                return (
                                    <button
                                        key={key}
                                        onClick={() => !isDisabled && toggleNeed(key)}
                                        disabled={isDisabled}
                                        className={`flex items-center justify-center py-3 px-2 rounded-xl border text-sm transition-all duration-200 w-full text-center min-h-[48px] cursor-pointer relative ${isSelected
                                            ? 'bg-primary text-white border-primary shadow-sm'
                                            : isDisabled
                                                ? 'opacity-40 cursor-not-allowed border-dashed border-slate-200 bg-slate-50 text-slate-300'
                                                : 'bg-card text-card-foreground border-border hover:border-primary hover:bg-slate-50'
                                            }`}
                                    >
                                        {/* Order Badge */}
                                        {isSelected && (
                                            <span className="absolute left-2 w-5 h-5 bg-white/30 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                                                {selectionIndex + 1}
                                            </span>
                                        )}
                                        {t(`needs.${key}`)}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex justify-center">
                <button
                    onClick={() => onNext(selectedNeeds)}
                    disabled={selectedNeeds.length === 0}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg text-base font-semibold min-w-[200px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {t('needs.next')} ({selectedNeeds.length})
                </button>
            </div>
        </div>
    );
}

export default NeedSelector;
