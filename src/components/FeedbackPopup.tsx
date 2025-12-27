import React from 'react';
import { useTranslation } from 'react-i18next';
import { X, MessageSquarePlus } from 'lucide-react';

interface FeedbackPopupProps {
    isOpen: boolean;
    onClose: () => void;
    feedbackUrl: string;
}

const FeedbackPopup: React.FC<FeedbackPopupProps> = ({ isOpen, onClose, feedbackUrl }) => {
    const { t } = useTranslation();

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-[90%] md:w-80 animate-in slide-in-from-bottom-5 fade-in duration-500">
            <div className="bg-card text-card-foreground rounded-2xl shadow-xl border border-border p-5 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={t('feedback_popup.close') || 'Close'}
                >
                    <X size={16} />
                </button>

                <div className="flex items-start space-x-3 mb-4">
                    <div className="p-2.5 bg-primary/10 text-primary rounded-xl shrink-0">
                        <MessageSquarePlus size={24} />
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground text-base mb-1">
                            {t('feedback_popup.title') || 'Enjoying the app?'}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {t('feedback_popup.message') || 'We would love to hear your thoughts to make this tool better for everyone.'}
                        </p>
                    </div>
                </div>

                <div className="flex justify-end space-x-3 mt-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground font-medium transition-colors"
                    >
                        {t('feedback_popup.dismiss') || 'Not now'}
                    </button>
                    <a
                        href={feedbackUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                        className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold rounded-xl shadow-sm transition-colors flex items-center"
                    >
                        {t('feedback_popup.action') || 'Give Feedback'}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FeedbackPopup;
