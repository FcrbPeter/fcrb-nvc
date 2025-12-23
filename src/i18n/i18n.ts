import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';

const getInitLanguage = () => {
  const path = window.location.pathname;
  if (path.includes('/en-US')) return 'en-US';
  if (path.includes('/zh-TW')) return 'zh-TW';

  // Fallback to browser detection if not in URL (e.g. at root)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const browserLang = navigator.language || (navigator as any).userLanguage || 'en-US';
  return browserLang.toLowerCase().includes('zh') ? 'zh-TW' : 'en-US';
};

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: getInitLanguage(),
    fallbackLng: 'en-US',
    backend: {
      loadPath: '/locales/{{lng}}.json',
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
