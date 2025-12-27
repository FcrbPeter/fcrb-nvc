function DisclaimerPage() {
    return (
        <div className="animate-in slide-in-from-bottom-5 fade-in duration-500">
            <h2 className="mb-5 text-primary text-2xl font-bold">Disclaimer</h2>
            <div className="text-left leading-relaxed text-foreground space-y-4">
                <p><strong>The NVC four steps is for educational and self-help purposes only.</strong></p>
                <h3 className="mt-4 text-lg font-semibold">Not Medical Advice</h3>
                <p>This application relates to topics of psychology, emotions, and mental well-being. However, the information and tools provided by this application are <strong>not medical advice</strong> and should not be treated as such.</p>
                <p>The content is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician, psychologist, or other qualified health provider with any questions you may have regarding a medical condition or mental health concern.</p>
                <h3 className="mt-4 text-lg font-semibold">No Professional Relationship</h3>
                <p>Use of this application does not create a doctor-patient or therapist-client relationship.</p>
                <h3 className="mt-4 text-lg font-semibold">Emergency</h3>
                <p>If you think you may have a medical emergency or are in crisis, call your doctor or your local emergency number immediately.</p>
            </div>
        </div>
    );
}

export default DisclaimerPage;
