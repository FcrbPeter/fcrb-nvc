import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface TopicInputProps {
    onNext: (topic: string) => void;
    initialValue: string;
}

function TopicInput({ onNext, initialValue }: TopicInputProps) {
    const { t } = useTranslation();
    const [topic, setTopic] = useState(initialValue || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext(topic);
    };

    return (
        <div className="animate-in slide-in-from-bottom-5 fade-in duration-500 px-4 sm:px-0">
            <h2 className="mb-2 text-center text-2xl font-bold text-foreground">
                {t('topic.question')}
            </h2>
            <p className="text-center text-muted-foreground mb-6 text-base whitespace-pre-line">
                {t('topic.instruction')}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder={t('topic.placeholder')}
                    className="w-full min-h-[200px] p-4 rounded-lg border border-input font-inherit text-base resize-none bg-slate-50 shadow-inner focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
                    autoFocus
                />
                <div className="flex justify-end mt-4">
                    <button
                        type="submit"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg text-base font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
