import {
    Search,
    Filter,
    ChevronDown,
    Plus,
    Download,
    Clock,
    X,
    Bookmark,
    Trash2,
    Check,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface CompaniesFilterBarProps {
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    onSearch?: () => void;
    retailersOnly?: boolean;
    onRetailersOnlyChange?: (value: boolean) => void;
    onFiltersClick?: () => void;
    onSortClick?: () => void;
    onSaveClick?: () => void;
    onAddClick?: () => void;
    onExportClick?: () => void;
    onAddedRemovedClick?: () => void;
    onClearClick?: () => void;
    activeFiltersCount?: number;
    minLocations?: number;
    onMinLocationsChange?: (value: number | null) => void;
    minSfOccupied?: number;
    maxSfOccupied?: number;
    onSfOccupiedChange?: (min: number | null, max: number | null) => void;
}

const LOCATION_OPTIONS = [
    { label: "All Locations", value: null },
    { label: "1+ Locations", value: 1 },
    { label: "5+ Locations", value: 5 },
    { label: "10+ Locations", value: 10 },
    { label: "25+ Locations", value: 25 },
    { label: "50+ Locations", value: 50 },
    { label: "100+ Locations", value: 100 },
];

const SF_OCCUPIED_OPTIONS = [
    { label: "All Sizes", value: null, min: null, max: null },
    { label: "0 - 10K SF", value: "0-10k", min: 0, max: 10000 },
    { label: "10K - 50K SF", value: "10k-50k", min: 10000, max: 50000 },
    { label: "50K - 100K SF", value: "50k-100k", min: 50000, max: 100000 },
    { label: "100K - 500K SF", value: "100k-500k", min: 100000, max: 500000 },
    { label: "500K - 1M SF", value: "500k-1m", min: 500000, max: 1000000 },
    { label: "1M+ SF", value: "1m+", min: 1000000, max: null },
];

export default function CompaniesFilterBar({
    searchValue = "",
    onSearchChange,
    onSearch,
    retailersOnly = false,
    onRetailersOnlyChange,
    onFiltersClick,
    onSortClick,
    onSaveClick,
    onAddClick,
    onExportClick,
    onAddedRemovedClick,
    onClearClick,
    activeFiltersCount = 0,
    minLocations,
    onMinLocationsChange,
    minSfOccupied,
    maxSfOccupied,
    onSfOccupiedChange,
}: CompaniesFilterBarProps) {
    const [localSearchValue, setLocalSearchValue] = useState(searchValue);
    const [showLocationsDropdown, setShowLocationsDropdown] = useState(false);
    const [showSfDropdown, setShowSfDropdown] = useState(false);
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [showSaveDropdown, setShowSaveDropdown] = useState(false);
    const locationsRef = useRef<HTMLDivElement>(null);
    const sfRef = useRef<HTMLDivElement>(null);
    const sortRef = useRef<HTMLDivElement>(null);
    const saveRef = useRef<HTMLDivElement>(null);

    // Dummy saved searches data - will be replaced with actual data later
    const [savedSearches] = useState([
        {
            id: 1,
            name: "Retailers with 10+ Locations",
            createdAt: "2025-01-10",
        },
        {
            id: 2,
            name: "Large SF Occupied (500K+)",
            createdAt: "2025-01-08",
        },
        {
            id: 3,
            name: "Top Retail Companies",
            createdAt: "2025-01-05",
        },
    ]);

    // Sort options
    const [selectedSort, setSelectedSort] = useState<string | null>(null);

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

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                locationsRef.current &&
                !locationsRef.current.contains(event.target as Node)
            ) {
                setShowLocationsDropdown(false);
            }
            if (
                sfRef.current &&
                !sfRef.current.contains(event.target as Node)
            ) {
                setShowSfDropdown(false);
            }
            if (
                sortRef.current &&
                !sortRef.current.contains(event.target as Node)
            ) {
                setShowSortDropdown(false);
            }
            if (
                saveRef.current &&
                !saveRef.current.contains(event.target as Node)
            ) {
                setShowSaveDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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

    const getLocationLabel = () => {
        const option = LOCATION_OPTIONS.find(
            (opt) => opt.value === minLocations
        );
        return option?.label || "Number of Locations";
    };

    const getSfLabel = () => {
        const option = SF_OCCUPIED_OPTIONS.find(
            (opt) => opt.min === minSfOccupied && opt.max === maxSfOccupied
        );
        return option?.label || "Size Occupied";
    };

    const hasActiveFilters =
        activeFiltersCount > 0 ||
        minLocations !== null ||
        minSfOccupied !== null ||
        maxSfOccupied !== null ||
        retailersOnly ||
        localSearchValue;

    return (
        <div className="border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between gap-4 py-4">
                    {/* Left Group: Search and Quick Filters */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                        {/* Search Input */}
                        <div className="relative w-64 shrink-0">
                            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            <input
                                type="text"
                                value={localSearchValue}
                                onChange={(e) =>
                                    setLocalSearchValue(e.target.value)
                                }
                                onKeyPress={handleKeyPress}
                                placeholder="Tenant Name or Ticker"
                                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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

                        {/* Number of Locations Dropdown */}
                        <div className="relative" ref={locationsRef}>
                            <button
                                onClick={() =>
                                    setShowLocationsDropdown(
                                        !showLocationsDropdown
                                    )
                                }
                                className={`flex items-center gap-1 rounded-md border px-3 py-2 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                                    minLocations !== null
                                        ? "border-blue-500 bg-blue-50 text-blue-700"
                                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                <span className="whitespace-nowrap">
                                    {getLocationLabel()}
                                </span>
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform ${
                                        showLocationsDropdown
                                            ? "rotate-180"
                                            : ""
                                    }`}
                                />
                            </button>
                            {showLocationsDropdown && (
                                <div className="absolute left-0 z-50 mt-1 w-48 rounded-md border border-gray-200 bg-white shadow-lg">
                                    <div className="py-1">
                                        {LOCATION_OPTIONS.map((option) => (
                                            <button
                                                key={option.value ?? "all"}
                                                onClick={() => {
                                                    onMinLocationsChange?.(
                                                        option.value
                                                    );
                                                    setShowLocationsDropdown(
                                                        false
                                                    );
                                                }}
                                                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                                                    minLocations ===
                                                    option.value
                                                        ? "bg-blue-50 text-blue-700 font-medium"
                                                        : "text-gray-700"
                                                }`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Size Occupied Dropdown */}
                        <div className="relative" ref={sfRef}>
                            <button
                                onClick={() =>
                                    setShowSfDropdown(!showSfDropdown)
                                }
                                className={`flex items-center gap-1 rounded-md border px-3 py-2 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                                    minSfOccupied !== null ||
                                    maxSfOccupied !== null
                                        ? "border-blue-500 bg-blue-50 text-blue-700"
                                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                <span className="whitespace-nowrap">
                                    {getSfLabel()}
                                </span>
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform ${
                                        showSfDropdown ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                            {showSfDropdown && (
                                <div className="absolute left-0 z-50 mt-1 w-52 rounded-md border border-gray-200 bg-white shadow-lg">
                                    <div className="py-1">
                                        {SF_OCCUPIED_OPTIONS.map((option) => (
                                            <button
                                                key={option.value ?? "all"}
                                                onClick={() => {
                                                    onSfOccupiedChange?.(
                                                        option.min ?? null,
                                                        option.max ?? null
                                                    );
                                                    setShowSfDropdown(false);
                                                }}
                                                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                                                    minSfOccupied ===
                                                        option.min &&
                                                    maxSfOccupied === option.max
                                                        ? "bg-blue-50 text-blue-700 font-medium"
                                                        : "text-gray-700"
                                                }`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Retailers Only Toggle */}
                        <div className="flex items-center space-x-2 shrink-0">
                            <span className="text-sm text-gray-700 whitespace-nowrap">
                                Retailers Only
                            </span>
                            <button
                                onClick={() =>
                                    onRetailersOnlyChange?.(!retailersOnly)
                                }
                                className={`relative h-6 w-11 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                    retailersOnly
                                        ? "bg-blue-600"
                                        : "bg-gray-300"
                                }`}
                                role="switch"
                                aria-checked={retailersOnly}
                            >
                                <span
                                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform shadow-sm ${
                                        retailersOnly ? "translate-x-5" : ""
                                    }`}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Right Group: Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                        {hasActiveFilters && (
                            <button
                                onClick={onClearClick}
                                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                Clear
                            </button>
                        )}

                        {/* Filters Button with Badge */}
                        <button
                            onClick={onFiltersClick}
                            className="relative flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                        >
                            <Filter className="h-4 w-4" />
                            <span>Filters</span>
                            {activeFiltersCount > 0 && (
                                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-blue-600 px-1.5 text-xs font-medium text-white">
                                    {activeFiltersCount
                                        .toString()
                                        .padStart(2, "0")}
                                </span>
                            )}
                        </button>

                        {/* Sort Button with Dropdown */}
                        <div className="relative" ref={sortRef}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowSortDropdown(!showSortDropdown);
                                    setShowSaveDropdown(false);
                                    onSortClick?.();
                                }}
                                className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                                    selectedSort !== null
                                        ? "border-blue-500 bg-blue-50 text-blue-700"
                                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                <span>Sort</span>
                                <ChevronDown
                                    className={`h-4 w-4 text-gray-400 transition-transform ${
                                        showSortDropdown ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                            {showSortDropdown && (
                                <div className="absolute right-0 z-50 mt-1 w-56 rounded-md border border-gray-200 bg-white shadow-lg">
                                    <div className="py-1">
                                        <button
                                            onClick={() => {
                                                setSelectedSort("name-asc");
                                                setShowSortDropdown(false);
                                            }}
                                            className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                                                selectedSort === "name-asc"
                                                    ? "bg-blue-50 text-blue-700 font-medium"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            <span>Name (A-Z)</span>
                                            {selectedSort === "name-asc" && (
                                                <Check className="h-4 w-4" />
                                            )}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedSort("name-desc");
                                                setShowSortDropdown(false);
                                            }}
                                            className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                                                selectedSort === "name-desc"
                                                    ? "bg-blue-50 text-blue-700 font-medium"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            <span>Name (Z-A)</span>
                                            {selectedSort === "name-desc" && (
                                                <Check className="h-4 w-4" />
                                            )}
                                        </button>
                                        <div className="my-1 border-t border-gray-200"></div>
                                        <button
                                            onClick={() => {
                                                setSelectedSort(
                                                    "locations-desc"
                                                );
                                                setShowSortDropdown(false);
                                            }}
                                            className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                                                selectedSort ===
                                                "locations-desc"
                                                    ? "bg-blue-50 text-blue-700 font-medium"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            <span>Locations (High to Low)</span>
                                            {selectedSort ===
                                                "locations-desc" && (
                                                <Check className="h-4 w-4" />
                                            )}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedSort(
                                                    "locations-asc"
                                                );
                                                setShowSortDropdown(false);
                                            }}
                                            className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                                                selectedSort === "locations-asc"
                                                    ? "bg-blue-50 text-blue-700 font-medium"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            <span>Locations (Low to High)</span>
                                            {selectedSort ===
                                                "locations-asc" && (
                                                <Check className="h-4 w-4" />
                                            )}
                                        </button>
                                        <div className="my-1 border-t border-gray-200"></div>
                                        <button
                                            onClick={() => {
                                                setSelectedSort("sf-desc");
                                                setShowSortDropdown(false);
                                            }}
                                            className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                                                selectedSort === "sf-desc"
                                                    ? "bg-blue-50 text-blue-700 font-medium"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            <span>
                                                SF Occupied (High to Low)
                                            </span>
                                            {selectedSort === "sf-desc" && (
                                                <Check className="h-4 w-4" />
                                            )}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedSort("sf-asc");
                                                setShowSortDropdown(false);
                                            }}
                                            className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                                                selectedSort === "sf-asc"
                                                    ? "bg-blue-50 text-blue-700 font-medium"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            <span>
                                                SF Occupied (Low to High)
                                            </span>
                                            {selectedSort === "sf-asc" && (
                                                <Check className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Save Button with Dropdown */}
                        <div className="relative" ref={saveRef}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowSaveDropdown(!showSaveDropdown);
                                    setShowSortDropdown(false);
                                    onSaveClick?.();
                                }}
                                className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                            >
                                <span>Save</span>
                                <ChevronDown
                                    className={`h-4 w-4 text-gray-400 transition-transform ${
                                        showSaveDropdown ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                            {showSaveDropdown && (
                                <div className="absolute right-0 z-50 mt-1 w-72 rounded-md border border-gray-200 bg-white shadow-lg">
                                    <div className="py-1">
                                        {/* Save New Search Option */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // TODO: Implement save new search functionality
                                                setShowSaveDropdown(false);
                                            }}
                                            className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                                        >
                                            <Plus className="h-4 w-4" />
                                            <span>Save New Search</span>
                                        </button>

                                        {/* Saved Searches List */}
                                        {savedSearches.length > 0 && (
                                            <>
                                                <div className="my-1 border-t border-gray-200"></div>
                                                <div className="px-4 py-2">
                                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                        Saved Searches
                                                    </p>
                                                </div>
                                                {savedSearches.map((search) => (
                                                    <div
                                                        key={search.id}
                                                        className="group flex items-center justify-between px-4 py-2 hover:bg-gray-50"
                                                    >
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                // TODO: Implement load saved search functionality
                                                                setShowSaveDropdown(
                                                                    false
                                                                );
                                                            }}
                                                            className="flex flex-1 items-center gap-2 text-left text-sm text-gray-700 hover:text-blue-600 transition-colors"
                                                        >
                                                            <Bookmark className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                                                            <div className="flex-1">
                                                                <div className="font-medium">
                                                                    {
                                                                        search.name
                                                                    }
                                                                </div>
                                                                <div className="text-xs text-gray-500">
                                                                    {new Date(
                                                                        search.createdAt
                                                                    ).toLocaleDateString(
                                                                        "en-US",
                                                                        {
                                                                            month: "short",
                                                                            day: "numeric",
                                                                            year: "numeric",
                                                                        }
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                // TODO: Implement delete saved search functionality
                                                            }}
                                                            className="ml-2 rounded p-1 text-gray-400 opacity-0 hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 transition-all"
                                                            title="Delete saved search"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </>
                                        )}

                                        {savedSearches.length === 0 && (
                                            <div className="px-4 py-8 text-center text-sm text-gray-500">
                                                <Bookmark className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                                                <p>No saved searches yet</p>
                                                <p className="mt-1 text-xs">
                                                    Save your current filters
                                                    for quick access
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Add Tenant Companies Button */}
                        <button
                            onClick={onAddClick}
                            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        >
                            <Plus className="h-4 w-4" />
                            <span className="whitespace-nowrap">
                                Add Tenant Companies
                            </span>
                        </button>

                        {/* Export Button */}
                        <button
                            onClick={onExportClick}
                            className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                        >
                            <Download className="h-4 w-4" />
                            <span>Export</span>
                        </button>

                        {/* Added/Removed Button */}
                        <button
                            onClick={onAddedRemovedClick}
                            className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                        >
                            <Clock className="h-4 w-4" />
                            <span className="whitespace-nowrap">
                                Added/Removed
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
