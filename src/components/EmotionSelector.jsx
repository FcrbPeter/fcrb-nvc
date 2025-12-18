import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function EmotionSelector({ onNext, initialSelection }) {
    const { t } = useTranslation();
    const [needState, setNeedState] = useState('unsatisfied'); // 'satisfied' | 'unsatisfied'
    const [selectedEmotions, setSelectedEmotions] = useState(initialSelection || []);

    const categories = t(`emotions.categories.${needState}`, { returnObjects: true });

    const toggleEmotion = (word) => {
        if (selectedEmotions.includes(word)) {
            setSelectedEmotions(selectedEmotions.filter(e => e !== word));
        } else {
            setSelectedEmotions([...selectedEmotions, word]);
        }
    };

    return (
        <div className="fade-in-up">
            {/* Tabs */}
            <div style={{
                display: 'flex',
                marginBottom: 'var(--spacing-lg)',
                backgroundColor: 'var(--color-surface)',
                padding: '4px',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-sm)'
            }}>
                <button
                    onClick={() => setNeedState('unsatisfied')}
                    style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: needState === 'unsatisfied' ? 'var(--color-secondary)' : 'transparent',
                        color: needState === 'unsatisfied' ? 'white' : 'var(--color-text-sub)',
                        fontWeight: 600,
                        transition: 'all 0.3s ease'
                    }}
                >
                    {t('emotions.unsatisfied')}
                </button>
                <button
                    onClick={() => setNeedState('satisfied')}
                    style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: needState === 'satisfied' ? 'var(--color-primary)' : 'transparent',
                        color: needState === 'satisfied' ? 'white' : 'var(--color-text-sub)',
                        fontWeight: 600,
                        transition: 'all 0.3s ease'
                    }}
                >
                    {t('emotions.satisfied')}
                </button>
            </div>

            {/* Categories & Chips */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                {categories.map((cat) => (
                    <div key={cat.id} className="fade-in-up">
                        <h3 style={{
                            fontSize: '1rem',
                            color: 'var(--color-text-sub)',
                            marginBottom: 'var(--spacing-sm)',
                            paddingLeft: 'var(--spacing-xs)'
                        }}>
                            {cat.label}
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '12px' }}>
                            {cat.words.map((word) => {
                                const isSelected = selectedEmotions.includes(word);
                                return (
                                    <button
                                        key={word}
                                        onClick={() => toggleEmotion(word)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '12px 8px',
                                            borderRadius: '12px',
                                            border: `1px solid ${isSelected ? (needState === 'satisfied' ? 'var(--color-primary)' : 'var(--color-secondary)') : 'var(--color-border)'}`,
                                            backgroundColor: isSelected ? (needState === 'satisfied' ? 'var(--color-primary)' : 'var(--color-secondary)') : 'var(--color-surface)',
                                            color: isSelected ? 'white' : 'var(--color-text-main)',
                                            fontSize: '0.95rem',
                                            transition: 'all 0.2s',
                                            boxShadow: isSelected ? 'var(--shadow-sm)' : 'none',
                                            width: '100%',
                                            textAlign: 'center',
                                            minHeight: '48px', // Ensure consistent height
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {word}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Fixed Next Button REMOVED, now inline */}
            <div style={{
                marginTop: 'var(--spacing-xl)',
                display: 'flex',
                justifyContent: 'center'
            }}>
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
