import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA, logPageView } from '../utils/analytics';

const AnalyticsTracker = () => {
    const location = useLocation();

    useEffect(() => {
        initGA();
    }, []);

    useEffect(() => {
        logPageView();
    }, [location]);

    return null;
};

export default AnalyticsTracker;
