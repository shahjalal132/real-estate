import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

interface PropertyTypeDropdownProps {
    selectedTypes: string[];
    onChange: (types: string[]) => void;
    label?: string;
}

const PROPERTY_TYPE_OPTIONS = [
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

export default function PropertyTypeDropdown({
    selectedTypes = [],
    onChange,
    label = "Property Type",
}: PropertyTypeDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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

    const getPropertyTypeLabel = () => {
        if (selectedTypes.length === 0) {
            return label;
        }
        if (selectedTypes.length === 1) {
            return selectedTypes[0];
        }
        return `${selectedTypes.length} Selected`;
    };

    const handlePropertyTypeToggle = (type: string) => {
        if (type === "Select All") {
            if (selectedTypes.length === PROPERTY_TYPE_OPTIONS.length - 1) {
                // All selected, deselect all
                onChange([]);
            } else {
                // Select all (except "Select All" itself)
                onChange(
                    PROPERTY_TYPE_OPTIONS.filter((t) => t !== "Select All")
                );
            }
        } else {
            const newSelection = selectedTypes.includes(type)
                ? selectedTypes.filter((t) => t !== type)
                : [...selectedTypes, type];
            onChange(newSelection);
        }
    };

    const isAllPropertyTypesSelected =
        selectedTypes.length === PROPERTY_TYPE_OPTIONS.length - 1;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                    selectedTypes.length > 0
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
            >
                <span className="whitespace-nowrap">
                    {getPropertyTypeLabel()}
                </span>
                <ChevronDown
                    className={`h-4 w-4 text-gray-400 transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>
            {isOpen && (
                <div className="absolute left-0 z-50 mt-1 w-56 rounded-md border border-gray-200 bg-white shadow-lg">
                    <div
                        className="py-1 max-h-96 overflow-y-auto"
                        onClick={(e) => {
                            // Prevent dropdown from closing when clicking inside the menu
                            e.stopPropagation();
                        }}
                    >
                        {PROPERTY_TYPE_OPTIONS.map((type) => {
                            const isChecked =
                                type === "Select All"
                                    ? isAllPropertyTypesSelected
                                    : selectedTypes.includes(type);
                            return (
                                <label
                                    key={type}
                                    className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors"
                                >
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => {
                                            handlePropertyTypeToggle(type);
                                        }}
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
            )}
        </div>
    );
}

