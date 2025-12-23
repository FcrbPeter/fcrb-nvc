import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppPage from './pages/AppPage'
import AppLayout from './layouts/AppLayout';
import DisclaimerPage from './pages/DisclaimerPage';
import PrivacyPage from './pages/PrivacyPage';
import AllEmotionsPage from './pages/AllEmotionsPage';
import AllNeedsPage from './pages/AllNeedsPage';
import AnalyticsTracker from './components/AnalyticsTracker';

// Redirect based on browser language
const RootRedirect = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const browserLang = navigator.language || (navigator as any).userLanguage || 'en-US';
    // Default to zh-TW if Chinese is detected, otherwise en-US
    const targetLang = browserLang.toLowerCase().includes('zh') ? 'zh-TW' : 'en-US';
    return <Navigate to={`/${targetLang}`} replace />;
}

function App() {
    return (
        <BrowserRouter>
            <AnalyticsTracker />
            <Routes>
                <Route path="/" element={<RootRedirect />} />
                {/* Make sure to capture all subpaths if needed, but App is currently single page. 
                    Using /:lang ensures App receives the language param. */}
                <Route path="/:lang" element={<AppLayout />}>
                    <Route index element={<AppPage />} />
                    <Route path="disclaimer" element={<DisclaimerPage />} />
                    <Route path="privacy" element={<PrivacyPage />} />
                    <Route path="emotions" element={<AllEmotionsPage />} />
                    <Route path="needs" element={<AllNeedsPage />} />
                </Route>

                <Route path="*" element={<RootRedirect />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
