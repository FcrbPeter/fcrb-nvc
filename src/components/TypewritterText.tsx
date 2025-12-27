import { useState, useEffect, useRef } from "react";

// Typewriter component for the typing animation
const TypewriterText = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
    const [displayedText, setDisplayedText] = useState('');
    const indexRef = useRef(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (indexRef.current < text.length) {
                setDisplayedText((prev) => prev + text.charAt(indexRef.current));
                indexRef.current += 1;
            } else {
                clearInterval(intervalId);
                if (onComplete) {
                    onComplete();
                }
            }
        }, 30); // Adjust typing speed here (ms per char)

        return () => clearInterval(intervalId);
    }, [text, onComplete]);

    return <span>{displayedText}</span>;
};

export default TypewriterText;