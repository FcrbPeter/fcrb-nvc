import { useTranslation } from 'react-i18next';

interface LegalViewsProps {
    view: string;
    onBack: () => void;
}

function LegalViews({ view, onBack }: LegalViewsProps) {
    const { t } = useTranslation();

    const renderContent = () => {
        if (view === 'disclaimer') {
            return (
                <>
                    <h2 style={{ marginBottom: '20px', color: 'var(--color-primary-dark)' }}>Disclaimer</h2>
                    <div style={{ textAlign: 'left', lineHeight: '1.6', color: 'var(--color-text-main)' }}>
                        <p><strong>The NVC Emotion Selector is for educational and self-help purposes only.</strong></p>
                        <h3 style={{ marginTop: '16px', fontSize: '1.1rem' }}>Not Medical Advice</h3>
                        <p>This application relates to topics of psychology, emotions, and mental well-being. However, the information and tools provided by this application are <strong>not medical advice</strong> and should not be treated as such.</p>
                        <p>The content is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician, psychologist, or other qualified health provider with any questions you may have regarding a medical condition or mental health concern.</p>
                        <h3 style={{ marginTop: '16px', fontSize: '1.1rem' }}>No Professional Relationship</h3>
                        <p>Use of this application does not create a doctor-patient or therapist-client relationship.</p>
                        <h3 style={{ marginTop: '16px', fontSize: '1.1rem' }}>Emergency</h3>
                        <p>If you think you may have a medical emergency or are in crisis, call your doctor or your local emergency number immediately.</p>
                    </div>
                </>
            );
        }

        if (view === 'privacy') {
            return (
                <>
                    <h2 style={{ marginBottom: '20px', color: 'var(--color-primary-dark)' }}>Privacy Policy</h2>
                    <div style={{ textAlign: 'left', lineHeight: '1.6', color: 'var(--color-text-main)' }}>
                        <p><strong>Last Updated: 2025</strong></p>
                        <p>Your privacy is important to us. It is the policy of the NVC Emotion Selector project to respect your privacy regarding any information we may collect from you across our application.</p>

                        <h3 style={{ marginTop: '16px', fontSize: '1.1rem' }}>1. Information We Collect</h3>
                        <p><strong>We do not collect any personal information.</strong></p>
                        <p>This application runs strictly in your web browser. Any data you enter (such as selected emotions or needs) is processed locally on your device and is not transmitted to any external server or database controlled by us.</p>

                        <h3 style={{ marginTop: '16px', fontSize: '1.1rem' }}>2. Local Storage</h3>
                        <p>This application may use your browser's local storage to save your preferences (such as language selection). This data stays on your device and is not shared with us.</p>

                        <h3 style={{ marginTop: '16px', fontSize: '1.1rem' }}>3. Third-Party Services</h3>
                        <p>We may use basic hosting services (like Firebase Hosting or GitHub Pages) to serve the application files. These services may collect standard server logs (IP addresses, request times) for security and operational purposes. We do not have control over, nor do we use, this data for tracking individual users.</p>
                    </div>
                </>
            );
        }
        return null;
    };

    return (
        <div className="fade-in-up">
            {renderContent()}
            <button
                onClick={onBack}
                className="primary-btn"
                style={{ marginTop: '32px' }}
            >
                {t('legal.back')}
            </button>
        </div>
    );
}

export default LegalViews;
