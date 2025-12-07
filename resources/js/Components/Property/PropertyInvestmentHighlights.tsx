import { useState, useRef, useEffect } from "react";

interface PropertyInvestmentHighlightsProps {
    investmentHighlights?: string | null;
}

// Strip HTML tags to get plain text length
const getTextLength = (html: string): number => {
    if (typeof document === "undefined") {
        // SSR fallback
        return html.replace(/<[^>]*>/g, "").length;
    }
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent?.length || 0;
};

export default function PropertyInvestmentHighlights({
    investmentHighlights,
}: PropertyInvestmentHighlightsProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [shouldShowButton, setShouldShowButton] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    if (!investmentHighlights) {
        return null;
    }

    const isHTML = investmentHighlights.includes("<");

    // Determine if we should show the button based on text length
    useEffect(() => {
        if (isHTML) {
            const textLength = getTextLength(investmentHighlights);
            setShouldShowButton(textLength > 300);
        } else {
            setShouldShowButton(investmentHighlights.length > 300);
        }
    }, [investmentHighlights, isHTML]);

    // For HTML content, we'll use CSS to handle truncation visually
    // For plain text, we'll truncate the string
    const displayContent =
        isExpanded || !shouldShowButton
            ? investmentHighlights
            : isHTML
            ? investmentHighlights
            : investmentHighlights.substring(0, 300) + "...";

    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Investment Highlights
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Investment highlights
                </h3>
                {isHTML ? (
                    <div
                        ref={contentRef}
                        className={`text-sm text-gray-700 leading-relaxed prose prose-sm max-w-none ${
                            !isExpanded && shouldShowButton
                                ? "line-clamp-6"
                                : ""
                        }`}
                        style={{
                            WebkitLineClamp:
                                !isExpanded && shouldShowButton ? 6 : "none",
                        }}
                        dangerouslySetInnerHTML={{
                            __html: displayContent,
                        }}
                    />
                ) : (
                    <div
                        className={`text-sm text-gray-700 leading-relaxed whitespace-pre-line ${
                            !isExpanded && shouldShowButton
                                ? "line-clamp-6"
                                : ""
                        }`}
                    >
                        {displayContent}
                    </div>
                )}
                {shouldShowButton && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mt-4 px-4 py-2 text-sm font-medium text-[#0066CC] border-2 border-[#0066CC] rounded-lg hover:bg-blue-50 transition-colors"
                    >
                        {isExpanded ? "Show Less" : "Show More"}
                    </button>
                )}
            </div>
        </div>
    );
}
