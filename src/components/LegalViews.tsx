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
                    <h2 className="mb-5 text-primary text-2xl font-bold">Disclaimer</h2>
                    <div className="text-left leading-relaxed text-foreground space-y-4">
                        <p><strong>The NVC Emotion Selector is for educational and self-help purposes only.</strong></p>
                        <h3 className="mt-4 text-lg font-semibold">Not Medical Advice</h3>
                        <p>This application relates to topics of psychology, emotions, and mental well-being. However, the information and tools provided by this application are <strong>not medical advice</strong> and should not be treated as such.</p>
                        <p>The content is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician, psychologist, or other qualified health provider with any questions you may have regarding a medical condition or mental health concern.</p>
                        <h3 className="mt-4 text-lg font-semibold">No Professional Relationship</h3>
                        <p>Use of this application does not create a doctor-patient or therapist-client relationship.</p>
                        <h3 className="mt-4 text-lg font-semibold">Emergency</h3>
                        <p>If you think you may have a medical emergency or are in crisis, call your doctor or your local emergency number immediately.</p>
                    </div>
                </>
            );
        }

        if (view === 'privacy') {
            return (
                <>
                    <h2 className="mb-5 text-primary text-2xl font-bold">Privacy Policy</h2>
                    <div className="text-left leading-relaxed text-foreground space-y-4">
                        <p><strong>Last Updated: 2025</strong></p>
                        <p>Your privacy is important to us. It is the policy of the NVC Emotion Selector project to respect your privacy regarding any information we may collect from you across our application.</p>

                        <h3 className="mt-4 text-lg font-semibold">1. Information We Collect</h3>
                        <p><strong>We do not collect any personal information.</strong></p>
                        <p>This application runs strictly in your web browser. Any data you enter (such as selected emotions or needs) is processed locally on your device and is not transmitted to any external server or database controlled by us.</p>

                        <h3 className="mt-4 text-lg font-semibold">2. Local Storage</h3>
                        <p>This application may use your browser's local storage to save your preferences (such as language selection). This data stays on your device and is not shared with us.</p>

                        <h3 className="mt-4 text-lg font-semibold">3. Third-Party Services</h3>
                        <p>We may use basic hosting services (like Firebase Hosting or GitHub Pages) to serve the application files. These services may collect standard server logs (IP addresses, request times) for security and operational purposes. We do not have control over, nor do we use, this data for tracking individual users.</p>
                    </div>
                </>
            );
        }
        return null;
    };

    return (
        <div className="animate-in slide-in-from-bottom-5 fade-in duration-500">
            {renderContent()}
            <button
                onClick={onBack}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg text-base font-semibold mt-8 transition-colors"
            >
                {t('legal.back')}
            </button>
        </div>
    );
}

export default LegalViews;
