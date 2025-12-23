import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const toggleLanguage = () => {
        const currentLang = i18n.language;
        const newLang = currentLang === 'en-US' ? 'zh-TW' : 'en-US';

        // Get the current path (e.g. "/en-US/emotions" or "/en-US")
        const currentPath = location.pathname;

        // Remove the current language prefix if it exists
        // This regex replaces /en-US or /zh-TW at the start of the string
        const pathWithoutLang = currentPath.replace(/^\/(en-US|zh-TW)/, '');

        // Construct new path
        const newPath = `/${newLang}${pathWithoutLang}`;

        navigate(newPath);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="text-white/90 text-sm hover:text-white transition-colors drop-shadow-md"
        >
            {i18n.language === 'en-US' ? '中文' : 'English'}
        </button>
    );
}
