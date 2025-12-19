import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA, logPageView } from '../utils/analytics';

const AnalyticsTracker = () => {
    const location = useLocation();
    const initializedRef = useRef(false);

    useEffect(() => {
        if (!initializedRef.current) {
            initGA();
            initializedRef.current = true;
        }
        logPageView();
    }, [location]);

    return null;
};

export default AnalyticsTracker;
