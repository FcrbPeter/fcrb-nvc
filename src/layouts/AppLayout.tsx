import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Github, Mail } from "lucide-react";
import headerBg from '../assets/header-bg.png';
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { PageTitleUpdater } from "../components/PageTitleUpdater";
import { APP_CONSTANTS, APP_VERSION } from "../data/constants";
import { useEffect } from "react";

function AppLayout() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { lang } = useParams();

    useEffect(() => {
        if (lang && ['en-US', 'zh-TW'].includes(lang) && i18n.language !== lang) {
            i18n.changeLanguage(lang);
        }
    }, [lang, i18n]);

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <PageTitleUpdater />
            {/* Header with Gradient */}
            <header className="h-80 w-full flex flex-col items-center pt-[60px] text-white text-center relative print:hidden overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img src={headerBg} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-teal-900/40" />
                </div>

                <div className="absolute top-5 right-5 z-20">
                    <LanguageSwitcher />
                </div>

                <div className="relative z-10 flex flex-col items-center">
                    <button
                        onClick={() => navigate(`/${i18n.language}`)}
                        className="text-center group transition-transform active:scale-95"
                    >
                        <h1 className="text-4xl mb-2 font-bold drop-shadow-lg group-hover:opacity-90 transition-opacity">
                            {t('welcome.title')}
                        </h1>
                        <p className="opacity-95 text-lg drop-shadow-md group-hover:opacity-100 transition-opacity">
                            {t('welcome.subtitle')}
                        </p>
                    </button>
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
                <div className="max-w-xs mx-auto mb-6">
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={() => navigate(`/${i18n.language}/emotions`)}
                            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-600 rounded-xl shadow-sm border border-slate-100 transition-all text-sm font-medium hover:shadow-md"
                        >
                            {t('toolbox.emotions')}
                        </button>
                        <button
                            onClick={() => navigate(`/${i18n.language}/needs`)}
                            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-600 rounded-xl shadow-sm border border-slate-100 transition-all text-sm font-medium hover:shadow-md"
                        >
                            {t('toolbox.needs')}
                        </button>
                    </div>
                </div>

                <p className="mb-4">
                    <button onClick={() => navigate(`/${i18n.language}/disclaimer`)} className="mr-4 opacity-80 decoration-1 underline hover:opacity-100">
                        {t('legal.disclaimer')}
                    </button>
                    <button onClick={() => navigate(`/${i18n.language}/privacy`)} className="mr-4 opacity-80 decoration-1 underline hover:opacity-100">
                        {t('legal.privacy')}
                    </button>


                    <a
                        href={APP_CONSTANTS.FEEDBACK_FORM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-80 decoration-1 underline hover:opacity-100"
                    >
                        {t('legal.feedback_link')}
                    </a>
                </p>

                <div className="flex justify-center space-x-6 mb-6">
                    <a
                        href={APP_CONSTANTS.GITHUB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 hover:text-slate-700 transition-colors"
                        title="GitHub"
                    >
                        <Github size={20} />
                    </a>
                    <a
                        href={`mailto:${APP_CONSTANTS.CONTACT_EMAIL}`}
                        className="text-slate-500 hover:text-slate-700 transition-colors"
                        title="Email"
                    >
                        <Mail size={20} />
                    </a>
                </div>

                <div>
                    <p>
                        &copy; 2025 FcrbPeter
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono">
                        {APP_VERSION}
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default AppLayout;
