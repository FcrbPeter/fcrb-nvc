import { Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
            <header className="h-80 w-full flex flex-col items-center pt-[60px] text-white text-center bg-gradient-to-br from-[#244e59] via-[#1d9d88] to-[#4fd1c5] relative">
                <div className="absolute top-5 right-5">
                    <button onClick={toggleLanguage} className="text-white/80 text-sm hover:text-white transition-colors">
                        {i18n.language === 'en-US' ? '中文' : 'English'}
                    </button>
                </div>
                <h1 className="text-4xl mb-2 font-bold">{t('welcome.title')}</h1>
                <p className="opacity-90 text-lg">{t('welcome.subtitle')}</p>
            </header>

            <main className="bg-card text-card-foreground rounded-2xl shadow-md p-12 max-w-[800px] w-[90%] mx-auto -mt-[100px] mb-8 relative z-10 min-h-[400px]">
                <Outlet />
            </main>

            <div className="max-w-[800px] w-[90%] mx-auto p-6 bg-blue-50 text-blue-900 rounded-2xl text-sm mb-8 leading-relaxed">
                <h4 className="flex items-center mb-2 font-semibold">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-700 text-white mr-2 text-xs">i</span>
                    {t('footer.title')}
                </h4>
                <p>
                    {t('footer.content')}
                </p>
            </div>

            {/* Real Footer */}
            <footer className="text-center p-4 mt-auto text-xs opacity-70 w-full">
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
