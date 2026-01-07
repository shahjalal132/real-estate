import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

interface PropertyFocusSelectorProps {
    selectedTypes: string[];
    onChange: (values: string[]) => void;
}

const PROPERTY_FOCUS_OPTIONS = [
    "Select All",
    "Diversified",
    "Office",
    "Industrial",
    "Retail",
    "Flex",
    "Multifamily",
    "Student",
    "Hospitality",
    "Health Care",
    "Specialty",
    "Sports & Entertainment",
];

export default function PropertyFocusSelector({
    selectedTypes = [],
    onChange,
}: PropertyFocusSelectorProps) {
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

    const isAllTypesSelected =
        selectedTypes.length === PROPERTY_FOCUS_OPTIONS.length - 1;

    const handleTypeToggle = (type: string) => {
        if (type === "Select All") {
            if (isAllTypesSelected) {
                onChange([]);
            } else {
                onChange(
                    PROPERTY_FOCUS_OPTIONS.filter((t) => t !== "Select All")
                );
            }
        } else {
            const newSelection = selectedTypes.includes(type)
                ? selectedTypes.filter((t) => t !== type)
                : [...selectedTypes, type];
            onChange(newSelection);
        }
    };

    const getDisplayLabel = () => {
        if (selectedTypes.length === 0) {
            return "Property Focus";
        }
        if (selectedTypes.length === 1) {
            return selectedTypes[0];
        }
        return `${selectedTypes.length} Selected`;
    };

    return (
        <div className="relative" ref={selectorRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                    selectedTypes.length > 0
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
                            {PROPERTY_FOCUS_OPTIONS.map((type) => {
                                const isChecked =
                                    type === "Select All"
                                        ? isAllTypesSelected
                                        : selectedTypes.includes(type);
                                return (
                                    <label
                                        key={type}
                                        className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                        onMouseDown={(e) => e.stopPropagation()}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                handleTypeToggle(type);
                                            }}
                                            onClick={(e) => e.stopPropagation()}
                                            className="h-3.5 w-3.5 rounded border-gray-300 text-[#0066CC] focus:ring-[#0066CC] accent-[#0066CC] cursor-pointer"
                                        />
                                        <span className="text-gray-700">
                                            {type}
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

