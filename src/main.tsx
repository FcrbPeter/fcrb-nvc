import { Suspense } from 'react';
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import './i18n/i18n';

import { SplashScreen } from './components/SplashScreen';

createRoot(document.getElementById('root')!).render(
    <Suspense fallback={<SplashScreen />}>
        <App />
    </Suspense>
)
