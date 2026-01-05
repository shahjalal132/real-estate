import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, ChevronDown as SortDown } from "lucide-react";

interface TenantSortSelectorProps {
    sortBy?: string;
    sortDir?: "asc" | "desc";
    onSortChange?: (sortBy: string, sortDir: "asc" | "desc") => void;
}

const SORT_OPTIONS = [
    { label: "Tenant Name", value: "tenant_name" },
    { label: "Industry", value: "industry" },
    { label: "Territory", value: "territory" },
    { label: "HQ Market", value: "hq_market" },
    { label: "Locations", value: "locations" },
    { label: "SF Occupied", value: "sf_occupied" },
    { label: "Highest Use By SF", value: "highest_use_by_sf" },
    { label: "Employees", value: "employees" },
    { label: "Growth", value: "growth" },
    { label: "Revenue", value: "revenue" },
    { label: "Credit Rating", value: "credit_rating" },
    { label: "Established", value: "established" },
    { label: "Parent Company", value: "parent_company" },
    { label: "HQ City", value: "hq_city" },
    { label: "HQ State", value: "hq_state" },
    { label: "HQ Postal Code", value: "hq_postal_code" },
    { label: "HQ Country", value: "hq_country" },
    { label: "NAICS", value: "naics" },
    { label: "SIC", value: "sic" },
];

export default function TenantSortSelector({
    sortBy,
    sortDir = "asc",
    onSortChange,
}: TenantSortSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const selectorRef = useRef<HTMLDivElement>(null);
    const [hasUserSelectedSort, setHasUserSelectedSort] = useState(false);

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

    // Track if user has explicitly selected a sort (not just default)
    useEffect(() => {
        if (sortBy && sortBy !== "tenant_name") {
            setHasUserSelectedSort(true);
        } else if (sortBy === "tenant_name" && sortDir !== "asc") {
            // If default sort but different direction, user has selected
            setHasUserSelectedSort(true);
        }
    }, [sortBy, sortDir]);

    const handleSortClick = (optionValue: string) => {
        setHasUserSelectedSort(true);
        if (sortBy === optionValue) {
            // Toggle direction if same option is clicked
            const newDir = sortDir === "asc" ? "desc" : "asc";
            onSortChange?.(optionValue, newDir);
        } else {
            // Set new sort option with ascending direction
            onSortChange?.(optionValue, "asc");
        }
    };

    const getDisplayLabel = () => {
        if (sortBy && hasUserSelectedSort) {
            const option = SORT_OPTIONS.find((opt) => opt.value === sortBy);
            if (option) {
                const direction = sortDir === "asc" ? "↑" : "↓";
                return `${option.label} ${direction}`;
            }
        }
        return "Sort";
    };

    const isActive = hasUserSelectedSort && sortBy !== undefined && sortBy !== null;

    return (
        <div className="relative" ref={selectorRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                    isActive
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
            >
                <span>{getDisplayLabel()}</span>
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
                        className="absolute right-0 z-50 mt-1 w-64 rounded-md border border-gray-200 bg-white shadow-xl max-h-96 overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="py-1">
                            {SORT_OPTIONS.map((option) => {
                                const isSelected = hasUserSelectedSort && sortBy === option.value;
                                const isAscending =
                                    isSelected && sortDir === "asc";
                                const isDescending =
                                    isSelected && sortDir === "desc";

                                return (
                                    <div
                                        key={option.value}
                                        className={`group flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                                            isSelected
                                                ? "bg-blue-50"
                                                : "hover:bg-gray-50"
                                        }`}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => handleSortClick(option.value)}
                                            className={`flex-1 text-left transition-colors ${
                                                isSelected
                                                    ? "text-blue-700 font-medium"
                                                    : "text-gray-700 group-hover:text-gray-900"
                                            }`}
                                        >
                                            {option.label}
                                        </button>
                                        <div className="flex items-center gap-1 ml-2">
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setHasUserSelectedSort(true);
                                                    onSortChange?.(
                                                        option.value,
                                                        "asc"
                                                    );
                                                    setIsOpen(false);
                                                }}
                                                className={`p-1 rounded transition-all ${
                                                    isAscending
                                                        ? "bg-blue-600 text-white shadow-sm"
                                                        : "bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
                                                }`}
                                                title="Sort ascending"
                                            >
                                                <ChevronUp className="h-3.5 w-3.5" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setHasUserSelectedSort(true);
                                                    onSortChange?.(
                                                        option.value,
                                                        "desc"
                                                    );
                                                    setIsOpen(false);
                                                }}
                                                className={`p-1 rounded transition-all ${
                                                    isDescending
                                                        ? "bg-blue-600 text-white shadow-sm"
                                                        : "bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
                                                }`}
                                                title="Sort descending"
                                            >
                                                <SortDown className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

