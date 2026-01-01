import { useState, useEffect, useRef } from "react";
import {
    Search,
    Filter,
    ChevronDown,
    Map,
    List,
    Grid3x3,
    X,
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
    const spaceUseRef = useRef<HTMLDivElement>(null);
    const sfRef = useRef<HTMLDivElement>(null);
    const occupancyRef = useRef<HTMLDivElement>(null);

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
                <div className="flex items-center justify-between gap-4 py-4">
                    {/* Left Group: Search and Quick Filters */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                        {/* Address Search */}
                        <div className="relative w-64 shrink-0">
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
                        <div className="relative w-64 shrink-0">
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
                        <div className="relative" ref={spaceUseRef}>
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
                        <div className="relative" ref={occupancyRef}>
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

                        {/* Sort Button */}
                        <button
                            onClick={onSortClick}
                            className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                        >
                            <span>Sort</span>
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </button>

                        {/* Save Button */}
                        <button
                            onClick={onSaveClick}
                            className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                        >
                            <span>Save</span>
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </button>

                        {/* Reports Button */}
                        <button
                            onClick={onReportsClick}
                            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                        >
                            Reports
                        </button>

                        {/* More Dropdown */}
                        <button
                            onClick={onMoreClick}
                            className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                        >
                            <span>More</span>
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </button>

                        {/* View Mode Toggle */}
                        <div className="ml-2 flex items-center gap-1 border-l border-gray-200 pl-4">
                            <button
                                onClick={() => onViewModeChange?.("map")}
                                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    viewMode === "map"
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-500 hover:bg-gray-50"
                                }`}
                            >
                                <Map className="h-4 w-4" />
                                MAP
                            </button>
                            <button
                                onClick={() => onViewModeChange?.("list")}
                                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    viewMode === "list"
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-500 hover:bg-gray-50"
                                }`}
                            >
                                <List className="h-4 w-4" />
                                LIST
                            </button>
                            <button
                                onClick={() => onViewModeChange?.("gallery")}
                                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    viewMode === "gallery"
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-500 hover:bg-gray-50"
                                }`}
                            >
                                <Grid3x3 className="h-4 w-4" />
                                GALLERY
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
