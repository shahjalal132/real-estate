import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

interface StatusSelectorProps {
    selectedStatuses: string[];
    onChange: (values: string[]) => void;
}

const STATUS_OPTIONS = [
    "Select All",
    "Announced/Estimated",
    "Closed",
    "Evergreen",
    "First Close",
    "Second Close",
    "Third Close",
    "Fourth Close",
    "Fifth Close",
    "Sixth Close",
    "Liquidated",
    "Listed",
    "Semi-open ended",
    "Raising",
];

export default function StatusSelector({
    selectedStatuses = [],
    onChange,
}: StatusSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const selectorRef = useRef<HTMLDivElement>(null);

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

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () =>
                document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isOpen]);

    const isAllStatusesSelected =
        selectedStatuses.length === STATUS_OPTIONS.length - 1;

    const handleStatusToggle = (status: string) => {
        if (status === "Select All") {
            if (isAllStatusesSelected) {
                onChange([]);
            } else {
                onChange(STATUS_OPTIONS.filter((s) => s !== "Select All"));
            }
        } else {
            const newSelection = selectedStatuses.includes(status)
                ? selectedStatuses.filter((s) => s !== status)
                : [...selectedStatuses, status];
            onChange(newSelection);
        }
    };

    const getDisplayLabel = () => {
        if (selectedStatuses.length === 0) {
            return "Status";
        }
        if (selectedStatuses.length === 1) {
            return selectedStatuses[0];
        }
        return `${selectedStatuses.length} Selected`;
    };

    return (
        <div className="relative" ref={selectorRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                    selectedStatuses.length > 0
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
                        className="absolute left-0 z-50 mt-1 w-56 rounded-md border border-gray-200 bg-white shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        <div className="py-1 max-h-96 overflow-y-auto">
                            {STATUS_OPTIONS.map((status) => {
                                const isChecked =
                                    status === "Select All"
                                        ? isAllStatusesSelected
                                        : selectedStatuses.includes(status);
                                return (
                                    <label
                                        key={status}
                                        className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                        onMouseDown={(e) => e.stopPropagation()}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                handleStatusToggle(status);
                                            }}
                                            onClick={(e) => e.stopPropagation()}
                                            className="h-3.5 w-3.5 rounded border-gray-300 text-[#0066CC] focus:ring-[#0066CC] accent-[#0066CC] cursor-pointer"
                                        />
                                        <span className="text-gray-700">
                                            {status}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
