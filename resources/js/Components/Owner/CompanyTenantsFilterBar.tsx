import { useState, useEffect, useRef } from "react";
import { Search, ChevronDown, X } from "lucide-react";
import LocationMinMaxSelector from "../LocationMinMaxSelector";
import SizeOccupiedSelector from "../Tenant/SizeOccupiedSelector";

interface CompanyTenantsFilterBarProps {
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    onSearch?: () => void;
    companiesCount?: number;
    // Filter values
    minLocations?: number | null;
    maxLocations?: number | null;
    onLocationsChange?: (min: number | null, max: number | null) => void;
    minSfOccupied?: number | null;
    maxSfOccupied?: number | null;
    onSfOccupiedChange?: (min: number | null, max: number | null) => void;
    // Sort
    sortBy?: string;
    sortDir?: "asc" | "desc";
    onSortChange?: (by: string, dir: "asc" | "desc") => void;
}

const SORT_OPTIONS = [
    { value: "company", label: "Company Name" },
    { value: "locations", label: "Locations" },
    { value: "sf_occupied", label: "Size Occupied" },
    { value: "ticker", label: "Ticker" },
];

export default function CompanyTenantsFilterBar({
    searchValue = "",
    onSearchChange,
    onSearch,
    companiesCount = 0,
    minLocations,
    maxLocations,
    onLocationsChange,
    minSfOccupied,
    maxSfOccupied,
    onSfOccupiedChange,
    sortBy = "company",
    sortDir = "asc",
    onSortChange,
}: CompanyTenantsFilterBarProps) {
    const [localSearchValue, setLocalSearchValue] = useState(searchValue);
    const [sortOpen, setSortOpen] = useState(false);
    const sortRef = useRef<HTMLDivElement>(null);

    // Update local search when prop changes
    useEffect(() => {
        setLocalSearchValue(searchValue);
    }, [searchValue]);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onSearchChange && localSearchValue !== searchValue) {
                onSearchChange(localSearchValue);
                onSearch?.();
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [localSearchValue, searchValue, onSearchChange, onSearch]);

    // Close sort dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                sortRef.current &&
                !sortRef.current.contains(event.target as Node)
            ) {
                setSortOpen(false);
            }
        };

        if (sortOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () =>
                document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [sortOpen]);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSearchChange?.(localSearchValue);
            onSearch?.();
        }
    };

    const handleClearSearch = () => {
        setLocalSearchValue("");
        onSearchChange?.("");
        onSearch?.();
    };

    const currentSortOption = SORT_OPTIONS.find(
        (opt) => opt.value === sortBy
    ) || { value: "company", label: "Company Name" };

    const handleSortSelect = (value: string) => {
        const newSortBy = value;
        const newSortDir =
            sortBy === newSortBy && sortDir === "asc" ? "desc" : "asc";
        onSortChange?.(newSortBy, newSortDir);
        setSortOpen(false);
    };

    return (
        <div className="border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between gap-4 py-4">
                    {/* Left Side - Filters */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        {/* Tenant Name or Ticker Search */}
                        <div className="relative min-w-[200px] shrink-0">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            <input
                                type="text"
                                value={localSearchValue}
                                onChange={(e) =>
                                    setLocalSearchValue(e.target.value)
                                }
                                onKeyPress={handleKeyPress}
                                placeholder="Tenant Name or Ticker"
                                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-10 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            {localSearchValue && (
                                <button
                                    onClick={handleClearSearch}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>

                        {/* Locations Min/Max Selector */}
                        <LocationMinMaxSelector
                            label="Locations"
                            minValue={minLocations}
                            maxValue={maxLocations}
                            onChange={(min, max) =>
                                onLocationsChange?.(min, max)
                            }
                            minPlaceholder="Min"
                            maxPlaceholder="Max"
                        />

                        {/* Size Occupied Selector */}
                        <SizeOccupiedSelector
                            minValue={minSfOccupied}
                            maxValue={maxSfOccupied}
                            onChange={(min, max) =>
                                onSfOccupiedChange?.(min, max)
                            }
                        />
                    </div>

                    {/* Right Side - Count and Sort */}
                    <div className="flex items-center gap-4 shrink-0">
                        {/* Companies Count */}
                        <span className="text-sm text-gray-700 whitespace-nowrap">
                            {companiesCount.toLocaleString()}{" "}
                            {companiesCount === 1 ? "Company" : "Companies"}
                        </span>

                        {/* Sort Dropdown */}
                        <div className="relative" ref={sortRef}>
                            <button
                                onClick={() => setSortOpen(!sortOpen)}
                                className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                            >
                                <span>Sort</span>
                                <ChevronDown
                                    className={`h-4 w-4 text-gray-400 transition-transform ${
                                        sortOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                            {sortOpen && (
                                <div className="absolute right-0 z-50 mt-1 w-56 rounded-md border border-gray-200 bg-white shadow-lg">
                                    <div className="py-1">
                                        {SORT_OPTIONS.map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() =>
                                                    handleSortSelect(option.value)
                                                }
                                                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                                                    sortBy === option.value
                                                        ? "bg-blue-50 text-blue-600 font-medium"
                                                        : "text-gray-700 hover:bg-gray-50"
                                                }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span>{option.label}</span>
                                                    {sortBy === option.value && (
                                                        <span className="text-xs text-blue-600">
                                                            {sortDir === "asc"
                                                                ? "↑"
                                                                : "↓"}
                                                        </span>
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

