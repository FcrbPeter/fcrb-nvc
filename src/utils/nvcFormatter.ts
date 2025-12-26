
export const generateNvcMessage = (
    language: string,
    topic: string,
    emotions: string[],
    needs: string[],
    feedback?: string
): string => {
    // Basic list joining helper
    const joinList = (list: string[], separator: string, lastSeparator?: string): string => {
        if (list.length === 0) return '';
        if (list.length === 1) return list[0];
        if (!lastSeparator) return list.join(separator);

        const last = list[list.length - 1];
        const rest = list.slice(0, -1);
        return `${rest.join(separator)}${lastSeparator}${last}`;
    };

    const cleanFeedback = feedback?.trim() ? ` ${feedback.trim()}` : '';

    if (language === 'zh-TW') {
        const emotionsStr = joinList(emotions, '、');
        const needsStr = joinList(needs, '、');
        return `當 ${topic} 時，我感到 ${emotionsStr}，因為我需要 ${needsStr}。 ${cleanFeedback}${cleanFeedback ? '。' : ''}`;
    } else {
        // Default to English
        const emotionsStr = joinList(emotions, ', ', ' and ');
        const needsStr = joinList(needs, ', ', ' and ');
        return `When ${topic}, I feel ${emotionsStr} because I need ${needsStr}. ${cleanFeedback}${cleanFeedback ? '.' : ''}`;
    }
};
