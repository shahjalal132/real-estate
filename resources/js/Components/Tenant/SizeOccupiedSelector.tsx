import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

interface SizeOccupiedSelectorProps {
    minValue: number | null;
    maxValue: number | null;
    onChange: (min: number | null, max: number | null) => void;
}

const SIZE_OCCUPIED_MIN_OPTIONS = [
    { label: "No Min", value: null },
    { label: "10,000 SF", value: 10000 },
    { label: "50,000 SF", value: 50000 },
    { label: "100,000 SF", value: 100000 },
    { label: "500,000 SF", value: 500000 },
    { label: "1,000,000 SF", value: 1000000 },
    { label: "5,000,000 SF", value: 5000000 },
    { label: "10,000,000 SF", value: 10000000 },
    { label: "50,000,000 SF", value: 50000000 },
];

const SIZE_OCCUPIED_MAX_OPTIONS = [
    { label: "No Max", value: null },
    { label: "10,000 SF", value: 10000 },
    { label: "50,000 SF", value: 50000 },
    { label: "100,000 SF", value: 100000 },
    { label: "500,000 SF", value: 500000 },
    { label: "1,000,000 SF", value: 1000000 },
    { label: "5,000,000 SF", value: 5000000 },
    { label: "10,000,000 SF", value: 10000000 },
    { label: "50,000,000 SF", value: 50000000 },
];

export default function SizeOccupiedSelector({
    minValue,
    maxValue,
    onChange,
}: SizeOccupiedSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [localMin, setLocalMin] = useState<string>(
        minValue?.toString() || ""
    );
    const [localMax, setLocalMax] = useState<string>(
        maxValue?.toString() || ""
    );
    const [showMinOptions, setShowMinOptions] = useState(false);
    const [showMaxOptions, setShowMaxOptions] = useState(false);
    const selectorRef = useRef<HTMLDivElement>(null);
    const minInputRef = useRef<HTMLInputElement>(null);
    const maxInputRef = useRef<HTMLInputElement>(null);

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
                setShowMinOptions(false);
                setShowMaxOptions(false);
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
                return `${formatNumber(minValue)} - ${formatNumber(
                    maxValue
                )} SF`;
            }
            return `${formatNumber(minValue)}+ SF`;
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

    const handleMinSelect = (value: number | null) => {
        const newMin = value;
        const currentMax = maxValue;

        // Validate: min should be <= max if both are set
        if (newMin !== null && currentMax !== null && newMin > currentMax) {
            return; // Don't update if invalid
        }

        setLocalMin(newMin?.toString() || "");
        onChange(newMin, currentMax);
        setShowMinOptions(false);
    };

    const handleMaxSelect = (value: number | null) => {
        const currentMin = minValue;
        const newMax = value;

        // Validate: min should be <= max if both are set
        if (currentMin !== null && newMax !== null && currentMin > newMax) {
            return; // Don't update if invalid
        }

        setLocalMax(newMax?.toString() || "");
        onChange(currentMin, newMax);
        setShowMaxOptions(false);
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
                <span className="whitespace-nowrap">{getDisplayLabel()}</span>
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
                        className="absolute left-0 z-50 mt-1 w-[420px] rounded-md border border-gray-200 bg-white shadow-lg overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Input Fields */}
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex items-center gap-2">
                                {/* Min Input */}
                                <input
                                    ref={minInputRef}
                                    type="text"
                                    placeholder="Min SF"
                                    value={
                                        localMin !== "" &&
                                        !isNaN(parseInt(localMin, 10))
                                            ? formatNumber(
                                                  parseInt(localMin, 10)
                                              )
                                            : localMin
                                    }
                                    onChange={(e) => {
                                        // Remove commas and non-numeric characters
                                        const numericValue =
                                            e.target.value.replace(
                                                /[^0-9]/g,
                                                ""
                                            );
                                        setLocalMin(numericValue);
                                        handleInputChange(
                                            numericValue,
                                            localMax
                                        );
                                    }}
                                    onFocus={() => {
                                        setShowMinOptions(true);
                                        setShowMaxOptions(false);
                                    }}
                                    className={`flex-1 rounded border border-gray-300 bg-white px-2 py-2 text-sm placeholder-gray-400 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-1 focus:ring-[#0066CC] focus:ring-opacity-20 ${
                                        localMin !== ""
                                            ? "text-gray-900 font-medium"
                                            : "text-gray-700"
                                    }`}
                                />
                                <span className="text-gray-400 text-sm font-medium">
                                    –
                                </span>
                                {/* Max Input */}
                                <input
                                    ref={maxInputRef}
                                    type="text"
                                    placeholder="Max SF"
                                    value={
                                        localMax !== "" &&
                                        !isNaN(parseInt(localMax, 10))
                                            ? formatNumber(
                                                  parseInt(localMax, 10)
                                              )
                                            : localMax
                                    }
                                    onChange={(e) => {
                                        // Remove commas and non-numeric characters
                                        const numericValue =
                                            e.target.value.replace(
                                                /[^0-9]/g,
                                                ""
                                            );
                                        setLocalMax(numericValue);
                                        handleInputChange(
                                            localMin,
                                            numericValue
                                        );
                                    }}
                                    onFocus={() => {
                                        setShowMaxOptions(true);
                                        setShowMinOptions(false);
                                    }}
                                    className={`flex-1 rounded border border-gray-300 bg-white px-2 py-2 text-sm placeholder-gray-400 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-1 focus:ring-[#0066CC] focus:ring-opacity-20 ${
                                        localMax !== ""
                                            ? "text-red-600 font-medium"
                                            : "text-gray-700"
                                    }`}
                                />
                            </div>
                        </div>

                        {/* Options List - Inside the card */}
                        {(showMinOptions || showMaxOptions) && (
                            <div className="max-h-60 overflow-y-auto">
                                {showMinOptions &&
                                    SIZE_OCCUPIED_MIN_OPTIONS.map(
                                        (option, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() =>
                                                    handleMinSelect(
                                                        option.value
                                                    )
                                                }
                                                className={`w-full px-4 py-2 text-left text-sm transition-colors border-b border-gray-100 last:border-b-0 ${
                                                    minValue === option.value
                                                        ? "bg-blue-600 text-white font-medium"
                                                        : "text-gray-700 hover:bg-gray-100"
                                                }`}
                                            >
                                                {option.label}
                                            </button>
                                        )
                                    )}
                                {showMaxOptions &&
                                    SIZE_OCCUPIED_MAX_OPTIONS.map(
                                        (option, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() =>
                                                    handleMaxSelect(
                                                        option.value
                                                    )
                                                }
                                                className={`w-full px-4 py-2 text-right text-sm transition-colors border-b border-gray-100 last:border-b-0 ${
                                                    maxValue === option.value
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
                </>
            )}
        </div>
    );
}
