import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { emotions } from '../data/emotions';
import './EmotionSelector.css';

function EmotionSelector({ onNext, initialSelection }) {
    const { t } = useTranslation();
    const [needState, setNeedState] = useState('unsatisfied'); // 'satisfied' | 'unsatisfied'
    const [selectedEmotions, setSelectedEmotions] = useState(initialSelection || []);

    const currentCategories = emotions[needState];

    const toggleEmotion = (key) => {
        if (selectedEmotions.includes(key)) {
            setSelectedEmotions(selectedEmotions.filter(e => e !== key));
        } else {
            setSelectedEmotions([...selectedEmotions, key]);
        }
    };

    return (
        <div className="fade-in-up">
            {/* Tabs */}
            <div className="emotion-tabs-container">
                <button
                    onClick={() => setNeedState('unsatisfied')}
                    className={`emotion-tab ${needState === 'unsatisfied' ? 'emotion-tab--active' : ''}`}
                    data-need="unsatisfied"
                >
                    {t('emotions.unsatisfied')}
                </button>
                <button
                    onClick={() => setNeedState('satisfied')}
                    className={`emotion-tab ${needState === 'satisfied' ? 'emotion-tab--active' : ''}`}
                    data-need="satisfied"
                >
                    {t('emotions.satisfied')}
                </button>
            </div>

            {/* Categories & Chips */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                {currentCategories.map((cat) => (
                    <div key={cat.category} className="fade-in-up">
                        <h3 style={{
                            fontSize: '1rem',
                            color: 'var(--color-text-sub)',
                            marginBottom: 'var(--spacing-sm)',
                            paddingLeft: 'var(--spacing-xs)'
                        }}>
                            {t(`emotions.${cat.category}`)}
                        </h3>
                        <div className="emotion-grid">
                            {cat.items.map((key) => {
                                const isSelected = selectedEmotions.includes(key);
                                return (
                                    <button
                                        key={key}
                                        onClick={() => toggleEmotion(key)}
                                        className={`emotion-chip 
                                            ${isSelected ? 'emotion-chip--selected' : ''} 
                                            ${needState === 'satisfied' ? 'emotion-chip--satisfied' : 'emotion-chip--unsatisfied'}
                                        `}
                                    >
                                        {t(`emotions.${key}`)}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Next Button */}
            <div className="next-button-container">
                <button
                    onClick={() => onNext(selectedEmotions)}
                    disabled={selectedEmotions.length === 0}
                    className="primary-btn"
                    style={{
                        minWidth: '200px',
                        fontSize: '1rem'
                    }}
                >
                    {t('emotions.next')} ({selectedEmotions.length})
                </button>
            </div>
        </div>
    );
}

export default EmotionSelector;
