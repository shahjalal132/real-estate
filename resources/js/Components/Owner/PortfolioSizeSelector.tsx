import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

interface PortfolioSizeSelectorProps {
    minValue: number | null;
    maxValue: number | null;
    onChange: (min: number | null, max: number | null) => void;
}

const PORTFOLIO_SF_OPTIONS = [
    { label: "No Min", min: null, max: null },
    { label: "10,000 SF", min: null, max: 10000 },
    { label: "50,000 SF", min: null, max: 50000 },
    { label: "100,000 SF", min: null, max: 100000 },
    { label: "500,000 SF", min: null, max: 500000 },
    { label: "1,000,000 SF", min: null, max: 1000000 },
    { label: "5,000,000 SF", min: null, max: 5000000 },
    { label: "10,000,000 SF", min: null, max: 10000000 },
    { label: "50,000,000 SF", min: null, max: 50000000 },
];

export default function PortfolioSizeSelector({
    minValue,
    maxValue,
    onChange,
}: PortfolioSizeSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [localMin, setLocalMin] = useState<string>(
        minValue?.toString() || ""
    );
    const [localMax, setLocalMax] = useState<string>(
        maxValue?.toString() || ""
    );
    const selectorRef = useRef<HTMLDivElement>(null);

    // Sync local state with props
    useEffect(() => {
        setLocalMin(minValue?.toString() || "");
    }, [minValue]);

    useEffect(() => {
        setLocalMax(maxValue?.toString() || "");
    }, [maxValue]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                selectorRef.current &&
                !selectorRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const formatNumber = (num: number | null): string => {
        if (num === null || num === undefined) return "";
        return num.toLocaleString();
    };

    const getDisplayLabel = () => {
        if (minValue !== null && minValue !== undefined) {
            if (maxValue !== null && maxValue !== undefined) {
                return `${formatNumber(minValue)} - ${formatNumber(maxValue)}`;
            }
            return `${formatNumber(minValue)}+`;
        }
        return "Size Occupied";
    };

    const handleInputChange = (min: string, max: string) => {
        const minParsed = min === "" ? null : parseInt(min, 10);
        const maxParsed = max === "" ? null : parseInt(max, 10);
        const minNum =
            minParsed !== null && !isNaN(minParsed) ? minParsed : null;
        const maxNum =
            maxParsed !== null && !isNaN(maxParsed) ? maxParsed : null;

        // Validate: min should be <= max if both are set
        if (minNum !== null && maxNum !== null && minNum > maxNum) {
            return; // Don't update if invalid
        }

        onChange(minNum, maxNum);
    };

    const handleQuickSelect = (option: typeof PORTFOLIO_SF_OPTIONS[0]) => {
        // Parse current localMin to preserve user's typed min value
        const currentMinParsed = localMin === "" ? null : parseInt(localMin, 10);
        const currentMinNum = currentMinParsed !== null && !isNaN(currentMinParsed) ? currentMinParsed : null;
        
        // Preserve existing min if user has typed one, otherwise use option's min
        const newMin = currentMinNum !== null ? currentMinNum : (option.min ?? null);
        const newMax = option.max ?? null;
        
        // Update local state to reflect the selected option
        setLocalMin(newMin?.toString() || "");
        setLocalMax(newMax?.toString() || "");
        // Call onChange to update parent component
        onChange(newMin, newMax);
    };

    const isQuickSelectActive = (option: typeof PORTFOLIO_SF_OPTIONS[0]): boolean => {
        return (
            minValue === option.min &&
            maxValue === option.max
        );
    };

    const isActive = minValue !== null || maxValue !== null;

    return (
        <div className="relative" ref={selectorRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                    isActive
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
            >
                <span className="whitespace-nowrap">
                    {getDisplayLabel()} SF
                </span>
                <ChevronDown
                    className={`h-4 w-4 text-gray-400 transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div
                        className={`absolute left-0 z-50 mt-1 rounded-md border border-gray-200 bg-white shadow-lg ${
                            localMin !== "" ? "w-96" : "w-72"
                        }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Input Fields */}
                        <div
                            className={`p-3 ${
                                localMin === "" ? "border-b border-gray-200" : ""
                            }`}
                        >
                            <div className="flex items-start gap-3">
                                <div className="flex items-center gap-2 flex-1">
                                    <input
                                        type="number"
                                        placeholder="Min SF"
                                        value={localMin}
                                        onChange={(e) => {
                                            setLocalMin(e.target.value);
                                            handleInputChange(
                                                e.target.value,
                                                localMax
                                            );
                                        }}
                                        className="w-full rounded border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-700 placeholder-gray-400 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-1 focus:ring-[#0066CC] focus:ring-opacity-20"
                                        min="0"
                                    />
                                </div>
                                <div className="flex items-start gap-2 flex-1 relative">
                                    <input
                                        type="number"
                                        placeholder="Max SF"
                                        value={localMax}
                                        onChange={(e) => {
                                            setLocalMax(e.target.value);
                                            handleInputChange(
                                                localMin,
                                                e.target.value
                                            );
                                        }}
                                        className="w-full rounded border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-700 placeholder-gray-400 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-1 focus:ring-[#0066CC] focus:ring-opacity-20"
                                        min="0"
                                    />
                                    {/* Quick Select Options - Right Side when min is typed */}
                                    {localMin !== "" && (
                                        <div className="absolute left-0 top-full mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg z-50 max-h-60 overflow-y-auto">
                                            {PORTFOLIO_SF_OPTIONS.map(
                                                (option, index) => (
                                                    <button
                                                        key={index}
                                                        type="button"
                                                        onClick={() =>
                                                            handleQuickSelect(
                                                                option
                                                            )
                                                        }
                                                        className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                                                            isQuickSelectActive(
                                                                option
                                                            )
                                                                ? "bg-blue-600 text-white font-medium"
                                                                : "text-gray-700 hover:bg-gray-100"
                                                        }`}
                                                    >
                                                        {option.label}
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Quick Select Options - Full Width when min is not typed */}
                        {localMin === "" && (
                            <div className="py-1 max-h-60 overflow-y-auto border-t border-gray-200">
                                {PORTFOLIO_SF_OPTIONS.map((option, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() =>
                                            handleQuickSelect(option)
                                        }
                                        className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                                            isQuickSelectActive(option)
                                                ? "bg-blue-600 text-white font-medium"
                                                : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

