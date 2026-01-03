import { useState, useEffect, useRef } from "react";
import {
    Search,
    Filter,
    ChevronDown,
    Map,
    List,
    Grid3x3,
    X,
    Bookmark,
    Trash2,
    Check,
    Plus,
} from "lucide-react";

interface LocationsFilterBarProps {
    addressSearch?: string;
    tenantSearch?: string;
    onAddressSearchChange?: (value: string) => void;
    onTenantSearchChange?: (value: string) => void;
    onFiltersClick?: () => void;
    onSortClick?: () => void;
    onSaveClick?: () => void;
    onReportsClick?: () => void;
    onMoreClick?: () => void;
    onClearClick?: () => void;
    viewMode?: "map" | "list" | "gallery";
    onViewModeChange?: (mode: "map" | "list" | "gallery") => void;
    activeFiltersCount?: number;
    spaceUse?: string;
    onSpaceUseChange?: (value: string | null) => void;
    minSfOccupied?: number;
    maxSfOccupied?: number;
    onSfOccupiedChange?: (min: number | null, max: number | null) => void;
    occupancy?: string;
    onOccupancyChange?: (value: string | null) => void;
}

const SPACE_USE_OPTIONS = [
    { label: "All Space Uses", value: null },
    { label: "Retail", value: "Retail" },
    { label: "Office", value: "Office" },
    { label: "Industrial", value: "Industrial" },
    { label: "Warehouse", value: "Warehouse" },
    { label: "Mixed Use", value: "Mixed Use" },
    { label: "Restaurant", value: "Restaurant" },
    { label: "Medical", value: "Medical" },
    { label: "Auto", value: "Auto" },
    { label: "Other", value: "Other" },
];

const SF_OCCUPIED_OPTIONS = [
    { label: "All Sizes", value: null, min: null, max: null },
    { label: "0 - 1K SF", value: "0-1k", min: 0, max: 1000 },
    { label: "1K - 5K SF", value: "1k-5k", min: 1000, max: 5000 },
    { label: "5K - 10K SF", value: "5k-10k", min: 5000, max: 10000 },
    { label: "10K - 25K SF", value: "10k-25k", min: 10000, max: 25000 },
    { label: "25K - 50K SF", value: "25k-50k", min: 25000, max: 50000 },
    { label: "50K - 100K SF", value: "50k-100k", min: 50000, max: 100000 },
    { label: "100K+ SF", value: "100k+", min: 100000, max: null },
];

const OCCUPANCY_OPTIONS = [
    { label: "All Occupancies", value: null },
    { label: "0-25%", value: "0-25" },
    { label: "26-50%", value: "26-50" },
    { label: "51-75%", value: "51-75" },
    { label: "76-100%", value: "76-100" },
];

export default function LocationsFilterBar({
    addressSearch = "",
    tenantSearch = "",
    onAddressSearchChange,
    onTenantSearchChange,
    onFiltersClick,
    onSortClick,
    onSaveClick,
    onReportsClick,
    onMoreClick,
    onClearClick,
    viewMode = "map",
    onViewModeChange,
    activeFiltersCount = 0,
    spaceUse,
    onSpaceUseChange,
    minSfOccupied,
    maxSfOccupied,
    onSfOccupiedChange,
    occupancy,
    onOccupancyChange,
}: LocationsFilterBarProps) {
    const [localAddressSearch, setLocalAddressSearch] = useState(addressSearch);
    const [localTenantSearch, setLocalTenantSearch] = useState(tenantSearch);
    const [showSpaceUseDropdown, setShowSpaceUseDropdown] = useState(false);
    const [showSfDropdown, setShowSfDropdown] = useState(false);
    const [showOccupancyDropdown, setShowOccupancyDropdown] = useState(false);
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [showSaveDropdown, setShowSaveDropdown] = useState(false);
    const spaceUseRef = useRef<HTMLDivElement>(null);
    const sfRef = useRef<HTMLDivElement>(null);
    const occupancyRef = useRef<HTMLDivElement>(null);
    const sortRef = useRef<HTMLDivElement>(null);
    const saveRef = useRef<HTMLDivElement>(null);

    // Dummy saved searches data - will be replaced with actual data later
    const [savedSearches] = useState([
        {
            id: 1,
            name: "Retail Locations in NYC",
            createdAt: "2025-01-10",
        },
        {
            id: 2,
            name: "Large Spaces (50K+ SF)",
            createdAt: "2025-01-08",
        },
        {
            id: 3,
            name: "High Occupancy Locations",
            createdAt: "2025-01-05",
        },
    ]);

    // Sort options
    const [selectedSort, setSelectedSort] = useState<string | null>(null);

    // Update local search when props change
    useEffect(() => {
        setLocalAddressSearch(addressSearch);
    }, [addressSearch]);

    useEffect(() => {
        setLocalTenantSearch(tenantSearch);
    }, [tenantSearch]);

    // Debounced search for address
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onAddressSearchChange && localAddressSearch !== addressSearch) {
                onAddressSearchChange(localAddressSearch);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [localAddressSearch, addressSearch, onAddressSearchChange]);

    // Debounced search for tenant
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onTenantSearchChange && localTenantSearch !== tenantSearch) {
                onTenantSearchChange(localTenantSearch);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [localTenantSearch, tenantSearch, onTenantSearchChange]);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                spaceUseRef.current &&
                !spaceUseRef.current.contains(event.target as Node)
            ) {
                setShowSpaceUseDropdown(false);
            }
            if (
                sfRef.current &&
                !sfRef.current.contains(event.target as Node)
            ) {
                setShowSfDropdown(false);
            }
            if (
                occupancyRef.current &&
                !occupancyRef.current.contains(event.target as Node)
            ) {
                setShowOccupancyDropdown(false);
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

    const handleAddressKeyPress = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Enter") {
            onAddressSearchChange?.(localAddressSearch);
        }
    };

    const handleTenantKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onTenantSearchChange?.(localTenantSearch);
        }
    };

    const handleClearAddressSearch = () => {
        setLocalAddressSearch("");
        onAddressSearchChange?.("");
    };

    const handleClearTenantSearch = () => {
        setLocalTenantSearch("");
        onTenantSearchChange?.("");
    };

    const getSpaceUseLabel = () => {
        const option = SPACE_USE_OPTIONS.find((opt) => opt.value === spaceUse);
        return option?.label || "Space Use";
    };

    const getSfLabel = () => {
        const option = SF_OCCUPIED_OPTIONS.find(
            (opt) => opt.min === minSfOccupied && opt.max === maxSfOccupied
        );
        return option?.label || "Size Occupied";
    };

    const getOccupancyLabel = () => {
        const option = OCCUPANCY_OPTIONS.find((opt) => opt.value === occupancy);
        return option?.label || "Occupancy";
    };

    const hasActiveFilters =
        activeFiltersCount > 0 ||
        minSfOccupied !== null ||
        maxSfOccupied !== null ||
        spaceUse !== null ||
        occupancy !== null ||
        localAddressSearch ||
        localTenantSearch;

    return (
        <div className="border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 py-4">
                    {/* Left Group: Search and Quick Filters */}
                    <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 sm:gap-4 flex-1 min-w-0">
                        {/* Address Search */}
                        <div className="relative w-full sm:w-44 lg:w-48 shrink-0">
                            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            <input
                                type="text"
                                value={localAddressSearch}
                                onChange={(e) =>
                                    setLocalAddressSearch(e.target.value)
                                }
                                onKeyPress={handleAddressKeyPress}
                                placeholder="Address or Location"
                                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            {localAddressSearch && (
                                <button
                                    onClick={handleClearAddressSearch}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>

                        {/* Tenant Name Search */}
                        <div className="relative w-full sm:w-44 lg:w-48 shrink-0">
                            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            <input
                                type="text"
                                value={localTenantSearch}
                                onChange={(e) =>
                                    setLocalTenantSearch(e.target.value)
                                }
                                onKeyPress={handleTenantKeyPress}
                                placeholder="Tenant Name or Ticker"
                                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            {localTenantSearch && (
                                <button
                                    onClick={handleClearTenantSearch}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>

                        {/* Space Use Dropdown */}
                        <div className="relative shrink-0" ref={spaceUseRef}>
                            <button
                                onClick={() =>
                                    setShowSpaceUseDropdown(
                                        !showSpaceUseDropdown
                                    )
                                }
                                className={`flex items-center gap-1 rounded-md border px-3 py-2 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                                    spaceUse !== null && spaceUse !== ""
                                        ? "border-blue-500 bg-blue-50 text-blue-700"
                                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                <span className="whitespace-nowrap">
                                    {getSpaceUseLabel()}
                                </span>
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform ${
                                        showSpaceUseDropdown ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                            {showSpaceUseDropdown && (
                                <div className="absolute left-0 z-50 mt-1 w-48 rounded-md border border-gray-200 bg-white shadow-lg max-h-60 overflow-y-auto">
                                    <div className="py-1">
                                        {SPACE_USE_OPTIONS.map((option) => (
                                            <button
                                                key={option.value ?? "all"}
                                                onClick={() => {
                                                    onSpaceUseChange?.(
                                                        option.value
                                                    );
                                                    setShowSpaceUseDropdown(
                                                        false
                                                    );
                                                }}
                                                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                                                    spaceUse === option.value
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
                        <div className="relative shrink-0" ref={sfRef}>
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
                                <div className="absolute left-0 z-50 mt-1 w-52 rounded-md border border-gray-200 bg-white shadow-lg max-h-60 overflow-y-auto">
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

                        {/* Occupancy Dropdown */}
                        <div className="relative shrink-0" ref={occupancyRef}>
                            <button
                                onClick={() =>
                                    setShowOccupancyDropdown(
                                        !showOccupancyDropdown
                                    )
                                }
                                className={`flex items-center gap-1 rounded-md border px-3 py-2 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                                    occupancy !== null && occupancy !== ""
                                        ? "border-blue-500 bg-blue-50 text-blue-700"
                                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                <span className="whitespace-nowrap">
                                    {getOccupancyLabel()}
                                </span>
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform ${
                                        showOccupancyDropdown
                                            ? "rotate-180"
                                            : ""
                                    }`}
                                />
                            </button>
                            {showOccupancyDropdown && (
                                <div className="absolute left-0 z-50 mt-1 w-40 rounded-md border border-gray-200 bg-white shadow-lg">
                                    <div className="py-1">
                                        {OCCUPANCY_OPTIONS.map((option) => (
                                            <button
                                                key={option.value ?? "all"}
                                                onClick={() => {
                                                    onOccupancyChange?.(
                                                        option.value
                                                    );
                                                    setShowOccupancyDropdown(
                                                        false
                                                    );
                                                }}
                                                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                                                    occupancy === option.value
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
                    </div>

                    {/* Right Group: Action Buttons and View Mode */}
                    <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 shrink-0">
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
                            <span className="hidden sm:inline">Filters</span>
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
                                <span className="hidden sm:inline">Sort</span>
                                <ChevronDown
                                    className={`h-4 w-4 text-gray-400 transition-transform ${
                                        showSortDropdown ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                            {showSortDropdown && (
                                <div className="absolute right-0 sm:left-0 z-50 mt-1 w-56 rounded-md border border-gray-200 bg-white shadow-lg">
                                    <div className="py-1">
                                        <button
                                            onClick={() => {
                                                setSelectedSort("address-asc");
                                                setShowSortDropdown(false);
                                            }}
                                            className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                                                selectedSort === "address-asc"
                                                    ? "bg-blue-50 text-blue-700 font-medium"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            <span>Address (A-Z)</span>
                                            {selectedSort === "address-asc" && (
                                                <Check className="h-4 w-4" />
                                            )}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedSort("address-desc");
                                                setShowSortDropdown(false);
                                            }}
                                            className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                                                selectedSort === "address-desc"
                                                    ? "bg-blue-50 text-blue-700 font-medium"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            <span>Address (Z-A)</span>
                                            {selectedSort ===
                                                "address-desc" && (
                                                <Check className="h-4 w-4" />
                                            )}
                                        </button>
                                        <div className="my-1 border-t border-gray-200"></div>
                                        <button
                                            onClick={() => {
                                                setSelectedSort("tenant-asc");
                                                setShowSortDropdown(false);
                                            }}
                                            className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                                                selectedSort === "tenant-asc"
                                                    ? "bg-blue-50 text-blue-700 font-medium"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            <span>Tenant Name (A-Z)</span>
                                            {selectedSort === "tenant-asc" && (
                                                <Check className="h-4 w-4" />
                                            )}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedSort("tenant-desc");
                                                setShowSortDropdown(false);
                                            }}
                                            className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                                                selectedSort === "tenant-desc"
                                                    ? "bg-blue-50 text-blue-700 font-medium"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            <span>Tenant Name (Z-A)</span>
                                            {selectedSort === "tenant-desc" && (
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
                                        <div className="my-1 border-t border-gray-200"></div>
                                        <button
                                            onClick={() => {
                                                setSelectedSort(
                                                    "occupancy-desc"
                                                );
                                                setShowSortDropdown(false);
                                            }}
                                            className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                                                selectedSort ===
                                                "occupancy-desc"
                                                    ? "bg-blue-50 text-blue-700 font-medium"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            <span>Occupancy (High to Low)</span>
                                            {selectedSort ===
                                                "occupancy-desc" && (
                                                <Check className="h-4 w-4" />
                                            )}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedSort(
                                                    "occupancy-asc"
                                                );
                                                setShowSortDropdown(false);
                                            }}
                                            className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                                                selectedSort === "occupancy-asc"
                                                    ? "bg-blue-50 text-blue-700 font-medium"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            <span>Occupancy (Low to High)</span>
                                            {selectedSort ===
                                                "occupancy-asc" && (
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
                                <span className="hidden sm:inline">Save</span>
                                <ChevronDown
                                    className={`h-4 w-4 text-gray-400 transition-transform ${
                                        showSaveDropdown ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                            {showSaveDropdown && (
                                <div className="absolute right-0 z-50 mt-1 w-[calc(100vw-2rem)] sm:w-72 max-w-[20rem] rounded-md border border-gray-200 bg-white shadow-lg max-h-[400px] overflow-y-auto">
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
                                                            <Bookmark className="h-4 w-4 text-gray-400 group-hover:text-blue-500 shrink-0" />
                                                            <div className="flex-1 min-w-0">
                                                                <div className="font-medium truncate">
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
                                                            className="ml-2 rounded p-1 text-gray-400 opacity-0 hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 transition-all shrink-0"
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

                        {/* Reports Button */}
                        <button
                            onClick={onReportsClick}
                            className="hidden sm:inline-block rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                        >
                            Reports
                        </button>

                        {/* More Dropdown */}
                        <button
                            onClick={onMoreClick}
                            className="hidden sm:flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                        >
                            <span>More</span>
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </button>

                        {/* View Mode Toggle */}
                        <div className="w-full sm:w-auto flex items-center gap-1 sm:ml-2 sm:border-l sm:border-gray-200 sm:pl-4 pt-2 sm:pt-0 border-t border-gray-200 sm:border-t-0">
                            <button
                                onClick={() => onViewModeChange?.("map")}
                                className={`flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    viewMode === "map"
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-500 hover:bg-gray-50"
                                }`}
                            >
                                <Map className="h-4 w-4" />
                                <span className="hidden sm:inline">MAP</span>
                            </button>
                            <button
                                onClick={() => onViewModeChange?.("list")}
                                className={`flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    viewMode === "list"
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-500 hover:bg-gray-50"
                                }`}
                            >
                                <List className="h-4 w-4" />
                                <span className="hidden sm:inline">LIST</span>
                            </button>
                            <button
                                onClick={() => onViewModeChange?.("gallery")}
                                className={`flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    viewMode === "gallery"
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-500 hover:bg-gray-50"
                                }`}
                            >
                                <Grid3x3 className="h-4 w-4" />
                                <span className="hidden sm:inline">
                                    GALLERY
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
