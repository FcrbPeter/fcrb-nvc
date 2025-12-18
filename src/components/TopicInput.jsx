import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function TopicInput({ onNext, initialValue }) {
    const { t } = useTranslation();
    const [topic, setTopic] = useState(initialValue || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext(topic);
    };

    return (
        <div className="fade-in-up">
            <h2 style={{
                marginBottom: '8px',
                textAlign: 'center',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: 'var(--color-text-main)'
            }}>
                {t('topic.question')}
            </h2>
            <p style={{
                textAlign: 'center',
                color: 'var(--color-text-sub)',
                marginBottom: '24px',
                fontSize: '0.95rem',
                whiteSpace: 'pre-line' // Allow newlines from JSON
            }}>
                {t('topic.instruction')}
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder={t('topic.placeholder')}
                    style={{
                        width: '100%',
                        minHeight: '200px',
                        padding: '16px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                        fontFamily: 'inherit',
                        fontSize: '1rem',
                        resize: 'none',
                        backgroundColor: '#f8f9fa',
                        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
                    }}
                    autoFocus
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                    <button
                        type="submit"
                        className="primary-btn"
                        disabled={!topic.trim()}
                    >
                        {t('topic.next')} →
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TopicInput;
