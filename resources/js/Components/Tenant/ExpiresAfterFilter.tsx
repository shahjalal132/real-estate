import { useState, useRef, useEffect } from "react";
import { CalendarDays, ChevronDown } from "lucide-react";

interface ExpiresAfterFilterProps {
    expiresWithinLast?: string;
    onExpiresWithinLastChange?: (value: string) => void;
    expiresAfterStartDate?: string;
    onExpiresAfterStartDateChange?: (value: string) => void;
    expiresAfterEndDate?: string;
    onExpiresAfterEndDateChange?: (value: string) => void;
    displayValue?: string;
    onDisplayValueChange?: (value: string) => void;
    label?: string;
    placeholder?: string;
}

const EXPIRES_WITHIN_OPTIONS = [
    "Last 7 days",
    "Last 30 days",
    "Last 90 days",
    "Last 6 months",
    "Last year",
    "Last 2 years",
    "Last 5 years",
];

export default function ExpiresAfterFilter({
    expiresWithinLast = "",
    onExpiresWithinLastChange,
    expiresAfterStartDate = "",
    onExpiresAfterStartDateChange,
    expiresAfterEndDate = "",
    onExpiresAfterEndDateChange,
    displayValue = "",
    onDisplayValueChange,
    placeholder = "Expires After",
}: ExpiresAfterFilterProps) {
    const [isOpen, setIsOpen] = useState(false);
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

    // Format date for display (MM/DD/YY or MM/DD/YYYY)
    const formatDateForDisplay = (dateString: string): string => {
        if (!dateString) return "";
        // If already in MM/DD/YY or MM/DD/YYYY format, return as is
        if (/^\d{2}\/\d{2}\/\d{2,4}$/.test(dateString)) return dateString;
        // If in YYYY-MM-DD format, convert to MM/DD/YY
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
            const parts = dateString.split("-");
            const year = parts[0];
            const shortYear = year.length === 4 ? year.slice(-2) : year;
            return `${parts[1]}/${parts[2]}/${shortYear}`;
        }
        // Try to parse as Date
        const date = new Date(dateString);
        if (!isNaN(date.getTime())) {
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const year = date.getFullYear();
            const shortYear = String(year).slice(-2);
            return `${month}/${day}/${shortYear}`;
        }
        return dateString;
    };

    // Get display text for the input field
    const getDisplayText = (): string => {
        if (displayValue) return displayValue;
        if (expiresWithinLast) return expiresWithinLast;
        if (expiresAfterStartDate && expiresAfterEndDate) {
            return `${formatDateForDisplay(
                expiresAfterStartDate
            )} - ${formatDateForDisplay(expiresAfterEndDate)}`;
        }
        if (expiresAfterStartDate)
            return `From ${formatDateForDisplay(expiresAfterStartDate)}`;
        if (expiresAfterEndDate)
            return `Until ${formatDateForDisplay(expiresAfterEndDate)}`;
        return "";
    };

    const handleExpiresWithinLastChange = (value: string) => {
        onExpiresWithinLastChange?.(value);
        // Clear date range when selecting relative date
        if (value) {
            onExpiresAfterStartDateChange?.("");
            onExpiresAfterEndDateChange?.("");
        }
        onDisplayValueChange?.(value);
    };

    // Convert YYYY-MM-DD to format suitable for date input (YYYY-MM-DD)
    const getDateInputValue = (dateString: string): string => {
        if (!dateString) return "";
        // If already in YYYY-MM-DD format, return as is
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return dateString;
        // Try to parse MM/DD/YY or MM/DD/YYYY
        const parts = dateString.split("/").filter((p) => p.length > 0);
        if (parts.length === 3) {
            const month = parts[0].padStart(2, "0");
            const day = parts[1].padStart(2, "0");
            let year = parts[2];
            // Convert 2-digit year to 4-digit (assuming 2000s)
            if (year.length === 2) {
                const yearNum = parseInt(year, 10);
                year = yearNum < 50 ? `20${year}` : `19${year}`;
            }
            if (month && day && year && year.length === 4) {
                return `${year}-${month}-${day}`;
            }
        }
        return "";
    };

    const isActive =
        expiresWithinLast || expiresAfterStartDate || expiresAfterEndDate;

    return (
        <div className="relative shrink-0" ref={filterRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between rounded-md border py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white min-w-[160px] ${
                    isActive
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
            >
                <span className="truncate">
                    {getDisplayText() || placeholder}
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
                            {/* Expires within the last section */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-900 mb-2">
                                    Expires within the last
                                </label>
                                <div className="relative">
                                    <select
                                        value={expiresWithinLast}
                                        onChange={(e) =>
                                            handleExpiresWithinLastChange(
                                                e.target.value
                                            )
                                        }
                                        className="appearance-none w-full rounded-md border border-gray-300 py-2 pl-3 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                                    >
                                        <option value="">Select</option>
                                        {EXPIRES_WITHIN_OPTIONS.map(
                                            (option) => (
                                                <option
                                                    key={option}
                                                    value={option}
                                                >
                                                    {option}
                                                </option>
                                            )
                                        )}
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

                            {/* Expires After Date Range section */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-900 mb-2">
                                    Date Range
                                </label>
                                <div className="flex items-center gap-2">
                                    <div className="relative flex-1">
                                        <input
                                            type="date"
                                            value={getDateInputValue(
                                                expiresAfterStartDate
                                            )}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                onExpiresAfterStartDateChange?.(
                                                    value
                                                );
                                                // Clear relative date when selecting date range
                                                if (value) {
                                                    onExpiresWithinLastChange?.(
                                                        ""
                                                    );
                                                }
                                                if (
                                                    value &&
                                                    expiresAfterEndDate
                                                ) {
                                                    onDisplayValueChange?.(
                                                        `${formatDateForDisplay(
                                                            value
                                                        )} - ${formatDateForDisplay(
                                                            expiresAfterEndDate
                                                        )}`
                                                    );
                                                } else if (value) {
                                                    onDisplayValueChange?.(
                                                        `From ${formatDateForDisplay(
                                                            value
                                                        )}`
                                                    );
                                                } else {
                                                    onDisplayValueChange?.("");
                                                }
                                            }}
                                            className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                                        />
                                    </div>
                                    <span className="text-gray-400 text-sm font-medium">
                                        –
                                    </span>
                                    <div className="relative flex-1">
                                        <input
                                            type="date"
                                            value={getDateInputValue(
                                                expiresAfterEndDate
                                            )}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                onExpiresAfterEndDateChange?.(
                                                    value
                                                );
                                                // Clear relative date when selecting date range
                                                if (value) {
                                                    onExpiresWithinLastChange?.(
                                                        ""
                                                    );
                                                }
                                                if (
                                                    expiresAfterStartDate &&
                                                    value
                                                ) {
                                                    onDisplayValueChange?.(
                                                        `${formatDateForDisplay(
                                                            expiresAfterStartDate
                                                        )} - ${formatDateForDisplay(
                                                            value
                                                        )}`
                                                    );
                                                } else if (value) {
                                                    onDisplayValueChange?.(
                                                        `Until ${formatDateForDisplay(
                                                            value
                                                        )}`
                                                    );
                                                } else {
                                                    onDisplayValueChange?.("");
                                                }
                                            }}
                                            className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
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
