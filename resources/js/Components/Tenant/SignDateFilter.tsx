import { useState, useRef, useEffect } from "react";
import { CalendarDays, ChevronDown } from "lucide-react";

interface SignDateFilterProps {
    signedWithinLast?: string;
    onSignedWithinLastChange?: (value: string) => void;
    startDate?: string;
    onStartDateChange?: (value: string) => void;
    endDate?: string;
    onEndDateChange?: (value: string) => void;
    displayValue?: string;
    onDisplayValueChange?: (value: string) => void;
}

const SIGNED_WITHIN_OPTIONS = [
    "Last 7 days",
    "Last 30 days",
    "Last 90 days",
    "Last 6 months",
    "Last year",
    "Last 2 years",
    "Last 5 years",
];

export default function SignDateFilter({
    signedWithinLast = "",
    onSignedWithinLastChange,
    startDate = "",
    onStartDateChange,
    endDate = "",
    onEndDateChange,
    displayValue = "",
    onDisplayValueChange,
}: SignDateFilterProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [localStartDate, setLocalStartDate] = useState("");
    const [localEndDate, setLocalEndDate] = useState("");
    const filterRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                filterRef.current &&
                !filterRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Format date for display (MM/DD/YYYY)
    const formatDateForDisplay = (dateString: string): string => {
        if (!dateString) return "";
        // If already in MM/DD/YYYY format, return as is
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) return dateString;
        // If in YYYY-MM-DD format, convert to MM/DD/YYYY
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
            const parts = dateString.split("-");
            return `${parts[1]}/${parts[2]}/${parts[0]}`;
        }
        // Try to parse as Date
        const date = new Date(dateString);
        if (!isNaN(date.getTime())) {
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const year = date.getFullYear();
            return `${month}/${day}/${year}`;
        }
        return dateString;
    };

    // Format input value for MM/DD/YYYY display
    const getInputValue = (dateString: string): string => {
        return formatDateForDisplay(dateString);
    };

    // Parse MM/DD/YYYY input to store in YYYY-MM-DD format
    const parseInputValue = (inputValue: string): string => {
        if (!inputValue) return "";
        // If already in YYYY-MM-DD format, return as is
        if (/^\d{4}-\d{2}-\d{2}$/.test(inputValue)) return inputValue;
        // Parse MM/DD/YYYY
        const parts = inputValue.split("/").filter((p) => p.length > 0);
        if (parts.length === 3) {
            const month = parts[0].padStart(2, "0");
            const day = parts[1].padStart(2, "0");
            const year = parts[2];
            // Validate date
            if (month && day && year && year.length === 4) {
                const date = new Date(`${year}-${month}-${day}`);
                if (!isNaN(date.getTime())) {
                    return `${year}-${month}-${day}`;
                }
            }
        }
        // If incomplete but valid format, return empty to allow user to continue typing
        return "";
    };

    // Get display text for the input field
    const getDisplayText = (): string => {
        if (displayValue) return displayValue;
        if (signedWithinLast) return signedWithinLast;
        if (startDate && endDate) {
            return `${formatDateForDisplay(startDate)} - ${formatDateForDisplay(endDate)}`;
        }
        if (startDate) return `From ${formatDateForDisplay(startDate)}`;
        if (endDate) return `Until ${formatDateForDisplay(endDate)}`;
        return "";
    };

    const handleSignedWithinLastChange = (value: string) => {
        onSignedWithinLastChange?.(value);
        // Clear date range when selecting relative date
        if (value) {
            onStartDateChange?.("");
            onEndDateChange?.("");
        }
        onDisplayValueChange?.(value);
    };

    // Auto-format date input as user types (MM/DD/YYYY)
    const formatDateInput = (value: string): string => {
        // Remove all non-numeric characters
        const numbers = value.replace(/\D/g, "");
        // Limit to 8 digits (MMDDYYYY)
        const limited = numbers.slice(0, 8);
        // Format with slashes
        if (limited.length <= 2) {
            return limited;
        } else if (limited.length <= 4) {
            return `${limited.slice(0, 2)}/${limited.slice(2)}`;
        } else {
            return `${limited.slice(0, 2)}/${limited.slice(2, 4)}/${limited.slice(4)}`;
        }
    };

    // Sync local state with props
    useEffect(() => {
        setLocalStartDate(getInputValue(startDate));
    }, [startDate]);

    useEffect(() => {
        setLocalEndDate(getInputValue(endDate));
    }, [endDate]);

    const handleStartDateInput = (value: string) => {
        // Auto-format the input
        const formatted = formatDateInput(value);
        setLocalStartDate(formatted);
        
        // Only parse and update if we have a complete date
        const parsed = parseInputValue(formatted);
        if (parsed || formatted.length === 0) {
            onStartDateChange?.(parsed);
            // Clear relative date when selecting date range
            if (parsed) {
                onSignedWithinLastChange?.("");
            }
            if (parsed && endDate) {
                onDisplayValueChange?.(
                    `${formatDateForDisplay(parsed)} - ${formatDateForDisplay(endDate)}`
                );
            } else if (parsed) {
                onDisplayValueChange?.(`From ${formatDateForDisplay(parsed)}`);
            } else {
                onDisplayValueChange?.("");
            }
        }
    };

    const handleEndDateInput = (value: string) => {
        // Auto-format the input
        const formatted = formatDateInput(value);
        setLocalEndDate(formatted);
        
        // Only parse and update if we have a complete date
        const parsed = parseInputValue(formatted);
        if (parsed || formatted.length === 0) {
            onEndDateChange?.(parsed);
            // Clear relative date when selecting date range
            if (parsed) {
                onSignedWithinLastChange?.("");
            }
            if (startDate && parsed) {
                onDisplayValueChange?.(
                    `${formatDateForDisplay(startDate)} - ${formatDateForDisplay(parsed)}`
                );
            } else if (parsed) {
                onDisplayValueChange?.(`Until ${formatDateForDisplay(parsed)}`);
            } else {
                onDisplayValueChange?.("");
            }
        }
    };

    const isActive = signedWithinLast || startDate || endDate;

    return (
        <div className="relative shrink-0" ref={filterRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between rounded-md border py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white min-w-[140px] ${
                    isActive
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
            >
                <span className="truncate">
                    {getDisplayText() || "Sign Date"}
                </span>
                <CalendarDays className="absolute right-3 h-4 w-4 text-gray-400 pointer-events-none" />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div
                        className="absolute left-0 z-50 mt-1 w-80 rounded-md border border-gray-200 bg-white shadow-lg overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 space-y-4">
                            {/* Signed within the last section */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-900 mb-2">
                                    Signed within the last
                                </label>
                                <div className="relative">
                                    <select
                                        value={signedWithinLast}
                                        onChange={(e) =>
                                            handleSignedWithinLastChange(
                                                e.target.value
                                            )
                                        }
                                        className="appearance-none w-full rounded-md border border-gray-300 py-2 pl-3 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                                    >
                                        <option value="">Select</option>
                                        {SIGNED_WITHIN_OPTIONS.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Separator with "or" */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-xs">
                                    <span className="bg-white px-2 text-gray-500">
                                        or
                                    </span>
                                </div>
                            </div>

                            {/* Date Range section */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-900 mb-2">
                                    Date Range
                                </label>
                                <div className="flex items-center gap-2">
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            value={localStartDate}
                                            onChange={(e) =>
                                                handleStartDateInput(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="MM/DD/YYYY"
                                            maxLength={10}
                                            className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white placeholder-gray-400"
                                        />
                                    </div>
                                    <span className="text-gray-400 text-sm font-medium">
                                        –
                                    </span>
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            value={localEndDate}
                                            onChange={(e) =>
                                                handleEndDateInput(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="MM/DD/YYYY"
                                            maxLength={10}
                                            className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white placeholder-gray-400"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

