import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const initGA = () => {
    if (GA_MEASUREMENT_ID) {
        ReactGA.initialize(GA_MEASUREMENT_ID);
    } else {
        console.warn("GA_MEASUREMENT_ID is missing. Analytics will not be tracked.");
    }
};

export const logPageView = () => {
    if (GA_MEASUREMENT_ID) {
        ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });
    }
};

interface EventProps {
    category: string;
    action: string;
    label?: string;
    value?: number;
}

export const logEvent = ({ category, action, label, value }: EventProps) => {
    if (GA_MEASUREMENT_ID) {
        ReactGA.event({
            category,
            action,
            label,
            value,
        });
    }
};
