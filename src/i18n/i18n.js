import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enUS from './locales/en-US.json';
import zhTW from './locales/zh-TW.json';

const resources = {
  'en-US': {
    translation: enUS,
  },
  'zh-TW': {
    translation: zhTW,
  },
};

const getInitLanguage = () => {
  const path = window.location.pathname;
  if (path.includes('/en-US')) return 'en-US';
  if (path.includes('/zh-TW')) return 'zh-TW';

  // Fallback to browser detection if not in URL (e.g. at root)
  const browserLang = navigator.language || navigator.userLanguage || 'en-US';
  return browserLang.toLowerCase().includes('zh') ? 'zh-TW' : 'en-US';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitLanguage(),
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
