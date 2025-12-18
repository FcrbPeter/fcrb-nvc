import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function NeedSelector({ onNext, initialSelection }) {
    const { t } = useTranslation();
    const [selectedNeeds, setSelectedNeeds] = useState(initialSelection || []);

    const categories = t('needs.list', { returnObjects: true });

    const toggleNeed = (word) => {
        if (selectedNeeds.includes(word)) {
            setSelectedNeeds(selectedNeeds.filter(n => n !== word));
        } else {
            setSelectedNeeds([...selectedNeeds, word]);
        }
    };

    return (
        <div className="fade-in-up" style={{ paddingBottom: '40px' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-text-main)' }}>{t('needs.title')}</h2>
                <p style={{ color: 'var(--color-text-sub)' }}>{t('needs.subtitle')}</p>
            </div>

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
                                const isSelected = selectedNeeds.includes(word);
                                return (
                                    <button
                                        key={word}
                                        onClick={() => toggleNeed(word)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '12px 8px',
                                            borderRadius: '12px',
                                            border: `1px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                                            backgroundColor: isSelected ? 'var(--color-primary)' : 'var(--color-surface)',
                                            color: isSelected ? 'white' : 'var(--color-text-main)',
                                            fontSize: '0.9rem',
                                            transition: 'all 0.2s',
                                            boxShadow: isSelected ? 'var(--shadow-sm)' : 'none',
                                            width: '100%',
                                            textAlign: 'center',
                                            minHeight: '48px',
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

            <div style={{
                marginTop: 'var(--spacing-xl)',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <button
                    onClick={() => onNext(selectedNeeds)}
                    disabled={selectedNeeds.length === 0}
                    className="primary-btn"
                    style={{
                        minWidth: '200px',
                        fontSize: '1rem'
                    }}
                >
                    {t('needs.next')} ({selectedNeeds.length})
                </button>
            </div>
        </div>
    );
}

export default NeedSelector;
