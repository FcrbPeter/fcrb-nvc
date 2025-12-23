import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const PageTitleUpdater = () => {
    const { t } = useTranslation();
    const location = useLocation();

    useEffect(() => {
        const pathSegments = location.pathname.split('/').filter(Boolean);
        // pathSegments[0] is expected to be language code (e.g. 'en-US')
        // pathSegments[1] is the sub-page (e.g. 'emotions', 'needs', etc.)

        // If no sub-page (length 1), it's the home page
        const page = pathSegments[1];
        const baseTitle = t('welcome.title');

        let pageTitle = '';

        if (!page) {
            document.title = baseTitle;
            return;
        }

        switch (page) {
            case 'emotions':
                pageTitle = t('toolbox.emotions');
                break;
            case 'needs':
                pageTitle = t('toolbox.needs');
                break;
            case 'disclaimer':
                pageTitle = t('legal.disclaimer');
                break;
            case 'privacy':
                pageTitle = t('legal.privacy');
                break;
            default:
                // For unknown routes or root, fallback to base title
                pageTitle = '';
        }

        if (pageTitle) {
            document.title = `${pageTitle} | ${baseTitle}`;
        } else {
            document.title = baseTitle;
        }

    }, [location, t]);

    return null;
};
