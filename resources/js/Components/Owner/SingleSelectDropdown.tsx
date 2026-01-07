import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

interface SingleSelectDropdownProps {
    selectedValues: string[];
    placeholder: string;
    options: string[];
    onChange: (values: string[]) => void;
    className?: string;
}

export default function SingleSelectDropdown({
    selectedValues = [],
    placeholder,
    options,
    onChange,
    className,
}: SingleSelectDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Add "Select All" as the first option if not already present
    const allOptions = options.includes("Select All")
        ? options
        : ["Select All", ...options];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
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

    const isAllSelected = selectedValues.length === allOptions.length - 1;

    const handleToggle = (option: string) => {
        if (option === "Select All") {
            if (isAllSelected) {
                onChange([]);
            } else {
                onChange(allOptions.filter((o) => o !== "Select All"));
            }
        } else {
            const newSelection = selectedValues.includes(option)
                ? selectedValues.filter((v) => v !== option)
                : [...selectedValues, option];
            onChange(newSelection);
        }
    };

    const getDisplayLabel = () => {
        if (selectedValues.length === 0) {
            return placeholder;
        }
        if (selectedValues.length === 1) {
            return selectedValues[0];
        }
        // Show format like "Value Added +1" (first item name + count of additional items)
        const firstItem = selectedValues[0];
        const additionalCount = selectedValues.length - 1;
        return `${firstItem} +${additionalCount}`;
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                    selectedValues.length > 0
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                } ${className || ""}`}
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
                            {allOptions.map((option) => {
                                const isChecked =
                                    option === "Select All"
                                        ? isAllSelected
                                        : selectedValues.includes(option);
                                return (
                                    <label
                                        key={option}
                                        className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                        onMouseDown={(e) => e.stopPropagation()}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                handleToggle(option);
                                            }}
                                            onClick={(e) => e.stopPropagation()}
                                            className="h-3.5 w-3.5 rounded border-gray-300 text-[#0066CC] focus:ring-[#0066CC] accent-[#0066CC] cursor-pointer"
                                        />
                                        <span className="text-gray-700">
                                            {option}
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
