import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App'
import './i18n/i18n';

// Redirect based on browser language
const RootRedirect = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const browserLang = navigator.language || (navigator as any).userLanguage || 'en-US';
  // Default to zh-TW if Chinese is detected, otherwise en-US
  const targetLang = browserLang.toLowerCase().includes('zh') ? 'zh-TW' : 'en-US';
  return <Navigate to={`/${targetLang}`} replace />;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        {/* Make sure to capture all subpaths if needed, but App is currently single page. 
            Using /:lang ensures App receives the language param. */}
        <Route path="/:lang/*" element={<App />} />
        <Route path="*" element={<RootRedirect />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
