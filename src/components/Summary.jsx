import React from 'react';
import { useTranslation } from 'react-i18next';

function Summary({ topic, emotions, needs, onRestart }) {
    const { t } = useTranslation();

    return (
        <div className="fade-in-up" style={{ textAlign: 'center' }}>
            <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>{t('summary.title')}</h2>

            <div style={{
                backgroundColor: 'var(--color-surface)',
                padding: 'var(--spacing-lg)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-md)',
                marginBottom: 'var(--spacing-xl)',
                textAlign: 'left'
            }}>
                <p style={{
                    fontSize: '1.1rem',
                    marginBottom: 'var(--spacing-md)',
                    color: 'var(--color-text-main)',
                    lineHeight: '1.6'
                }}>
                    "{topic}"
                </p>

                <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: 'var(--spacing-md) 0' }} />

                <p style={{ color: 'var(--color-text-sub)', marginBottom: 'var(--spacing-sm)' }}>
                    {t('summary.because')}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: 'var(--spacing-lg)' }}>
                    {emotions.map(emotion => (
                        <span key={emotion} style={{
                            padding: '6px 12px',
                            backgroundColor: 'var(--color-bg)',
                            borderRadius: '8px',
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            color: 'var(--color-text-main)'
                        }}>
                            {emotion}
                        </span>
                    ))}
                </div>

                {/* Needs Section */}
                {needs && needs.length > 0 && (
                    <>
                        <p style={{ color: 'var(--color-text-sub)', marginBottom: 'var(--spacing-sm)' }}>
                            {t('summary.my_needs')}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {needs.map(need => (
                                <span key={need} style={{
                                    padding: '6px 12px',
                                    backgroundColor: '#e6f7ff',
                                    color: '#006d9e',
                                    borderRadius: '8px',
                                    fontSize: '0.9rem',
                                    fontWeight: 500
                                }}>
                                    {need}
                                </span>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <button
                onClick={onRestart}
                style={{
                    border: '1px solid var(--color-text-main)',
                    color: 'var(--color-text-main)',
                    padding: '12px 32px',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: '1rem',
                    fontWeight: 600
                }}
            >
                {t('summary.restart')}
            </button>
        </div>
    );
}

export default Summary;
