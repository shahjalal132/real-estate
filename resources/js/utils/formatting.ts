export const formatNumber = (num: number | null | undefined): string => {
    if (num === null || num === undefined) return "—";
    return num.toLocaleString();
};

export const formatSF = (sf: string | number | null | undefined): string => {
    if (sf === null || sf === undefined) return "—";
    const num = typeof sf === "string" ? parseFloat(sf) : sf;
    if (isNaN(num)) return "—";
    if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
};

export const formatCurrency = (amount: number | null | undefined): string => {
    if (amount === null || amount === undefined) return "—";
    if (amount >= 1000000000) {
        return `$${(amount / 1000000000).toFixed(2)}B`;
    }
    if (amount >= 1000000) {
        return `$${(amount / 1000000).toFixed(2)}M`;
    }
    if (amount >= 1000) {
        return `$${(amount / 1000).toFixed(2)}K`;
    }
    return `$${amount.toLocaleString()}`;
};

export const formatPercent = (percent: string | number | null | undefined): string => {
    if (percent === null || percent === undefined) return "—";
    const num = typeof percent === "string" ? parseFloat(percent) : percent;
    if (isNaN(num)) return "—";
    return `${num}%`;
};

export const formatPhone = (phone: string | null | undefined): string => {
    if (!phone) return "—";
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
};

export const formatDate = (date: string | null | undefined): string => {
    if (!date) return "—";
    try {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    } catch {
        return "—";
    }
};

