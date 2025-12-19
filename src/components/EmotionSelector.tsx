import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { emotions } from '../data/emotions';
// import './EmotionSelector.css'; // Removed

interface EmotionSelectorProps {
    onNext: (selected: string[]) => void;
    initialSelection: string[];
}

type NeedState = 'satisfied' | 'unsatisfied';

function EmotionSelector({ onNext, initialSelection }: EmotionSelectorProps) {
    const { t } = useTranslation();
    const [needState, setNeedState] = useState<NeedState>('unsatisfied'); // 'satisfied' | 'unsatisfied'
    const [selectedEmotions, setSelectedEmotions] = useState<string[]>(initialSelection || []);

    const currentCategories = emotions[needState];
    const MAX_SELECTION = 3;

    const toggleEmotion = (key: string) => {
        if (selectedEmotions.includes(key)) {
            setSelectedEmotions(selectedEmotions.filter(e => e !== key));
        } else {
            if (selectedEmotions.length < MAX_SELECTION) {
                setSelectedEmotions([...selectedEmotions, key]);
            }
        }
    };

    const handleTabChange = (state: NeedState) => {
        if (needState !== state) {
            setNeedState(state);
            setSelectedEmotions([]); // Clear selection when switching tabs
        }
    };

    return (
        <div className="animate-in slide-in-from-bottom-5 fade-in duration-500">
            {/* Tabs */}
            <div className="flex mb-6 bg-slate-100 p-1 rounded-full shadow-inner relative">
                <button
                    onClick={() => handleTabChange('unsatisfied')}
                    className={`flex-1 p-2.5 rounded-full font-medium transition-all duration-300 relative z-10 border-none cursor-pointer outline-none ${needState === 'unsatisfied'
                        ? 'bg-secondary text-white shadow-[0_4px_12px_rgba(144,164,174,0.3)] font-semibold'
                        : 'text-slate-400 bg-transparent hover:text-slate-700'
                        }`}
                >
                    {t('emotions.unsatisfied')}
                </button>
                <button
                    onClick={() => handleTabChange('satisfied')}
                    className={`flex-1 p-2.5 rounded-full font-medium transition-all duration-300 relative z-10 border-none cursor-pointer outline-none ${needState === 'satisfied'
                        ? 'bg-rose-500 text-white shadow-[0_4px_12px_rgba(244,63,94,0.3)] font-semibold'
                        : 'text-slate-400 bg-transparent hover:text-slate-700'
                        }`}
                >
                    {t('emotions.satisfied')}
                </button>
            </div>

            {/* Categories & Chips */}
            <div className="flex flex-col gap-6">
                {currentCategories.map((cat) => (
                    <div key={cat.category} className="animate-in slide-in-from-bottom-2 fade-in duration-500">
                        <h3 className="text-base text-slate-400 mb-2 pl-1 font-medium">
                            {t(`emotions.${cat.category}`)}
                        </h3>
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-3">
                            {cat.items.map((key) => {
                                const selectionIndex = selectedEmotions.indexOf(key);
                                const isSelected = selectionIndex !== -1;
                                const isDisabled = !isSelected && selectedEmotions.length >= MAX_SELECTION;

                                let chipClass = "flex items-center justify-center py-3 px-4 rounded-xl border text-sm transition-all duration-200 w-full text-center min-h-[48px] cursor-pointer relative overflow-hidden focus:outline-none ";

                                if (isSelected) {
                                    chipClass += "border-transparent text-white shadow-md -translate-y-[1px] font-medium ";
                                    if (needState === 'satisfied') {
                                        chipClass += "bg-rose-500 hover:bg-rose-600";
                                    } else {
                                        chipClass += "bg-secondary hover:bg-slate-500";
                                    }
                                } else if (isDisabled) {
                                    chipClass += "opacity-40 cursor-not-allowed border-dashed border-slate-200 bg-slate-50 text-slate-300 ";
                                } else {
                                    chipClass += "border-border bg-card text-card-foreground hover:border-secondary hover:bg-slate-50 hover:-translate-y-[1px]";
                                }

                                return (
                                    <button
                                        key={key}
                                        onClick={() => !isDisabled && toggleEmotion(key)}
                                        disabled={isDisabled}
                                        className={chipClass}
                                    >
                                        {/* Order Badge */}
                                        {isSelected && (
                                            <span className="absolute left-2 w-5 h-5 bg-white/30 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                                                {selectionIndex + 1}
                                            </span>
                                        )}
                                        {t(`emotions.${key}`)}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Next Button */}
            <div className="mt-8 flex justify-center">
                <button
                    onClick={() => onNext(selectedEmotions)}
                    disabled={selectedEmotions.length === 0}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg text-base font-semibold min-w-[200px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {t('emotions.next')} ({selectedEmotions.length})
                </button>
            </div>
        </div>
    );
}

export default EmotionSelector;
