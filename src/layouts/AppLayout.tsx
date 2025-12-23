import { Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import headerBg from '../assets/header-bg.png';

function AppLayout() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en-US' ? 'zh-TW' : 'en-US';
        navigate(`/${newLang}`);
    };

    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Header with Gradient */}
            <header className="h-80 w-full flex flex-col items-center pt-[60px] text-white text-center relative print:hidden overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img src={headerBg} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-teal-900/40" />
                </div>

                <div className="absolute top-5 right-5 z-20">
                    <button onClick={toggleLanguage} className="text-white/90 text-sm hover:text-white transition-colors drop-shadow-md">
                        {i18n.language === 'en-US' ? '中文' : 'English'}
                    </button>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                    <h1 className="text-4xl mb-2 font-bold drop-shadow-lg">{t('welcome.title')}</h1>
                    <p className="opacity-95 text-lg drop-shadow-md">{t('welcome.subtitle')}</p>
                </div>
            </header>

            <main className="bg-card text-card-foreground rounded-2xl shadow-md p-12 max-w-[800px] w-[90%] mx-auto -mt-[100px] mb-8 relative z-10 min-h-[400px] print:mt-0 print:shadow-none print:p-0 print:w-full print:max-w-none">
                <Outlet />
            </main>

            <div className="max-w-[800px] w-[90%] mx-auto p-6 bg-blue-50 text-blue-900 rounded-2xl text-sm mb-8 leading-relaxed print:hidden">
                <h4 className="flex items-center mb-2 font-semibold">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-700 text-white mr-2 text-xs">i</span>
                    {t('tips.what_is_nvc.title')}
                </h4>
                <p>
                    {t('tips.what_is_nvc.content')}
                </p>
            </div>

            {/* Real Footer */}
            <footer className="text-center p-4 mt-auto text-xs opacity-70 w-full print:hidden">
                <p className="mb-2">
                    <button onClick={() => navigate(`/${i18n.language}/disclaimer`)} className="mr-4 opacity-80 decoration-1 underline hover:opacity-100">
                        {t('legal.disclaimer')}
                    </button>
                    <button onClick={() => navigate(`/${i18n.language}/privacy`)} className="opacity-80 decoration-1 underline hover:opacity-100">
                        {t('legal.privacy')}
                    </button>
                </p>
                <p>
                    &copy; 2025 FcrbPeter
                </p>
            </footer>
        </div>
    );
}

export default AppLayout;
