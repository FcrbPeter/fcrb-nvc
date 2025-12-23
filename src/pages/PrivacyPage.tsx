function PrivacyPage() {
    return (
        <div className="animate-in slide-in-from-bottom-5 fade-in duration-500">
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
        </div>
    );
}

export default PrivacyPage;
