import { useState, useEffect } from "react";
import {
    Search,
    Filter,
    Map,
    List,
    Grid3x3,
    X,
    Bookmark,
    Trash2,
    Plus,
    ChevronDown,
} from "lucide-react";
import SizeOccupiedSelector from "./SizeOccupiedSelector";
import SpaceUseSelector from "./SpaceUseSelector";
import TenantSortSelector from "./TenantSortSelector";
import OccupancySelector from "./OccupancySelector";

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
    spaceUse?: string[];
    onSpaceUseChange?: (value: string[]) => void;
    minSfOccupied?: number | null;
    maxSfOccupied?: number | null;
    onSfOccupiedChange?: (min: number | null, max: number | null) => void;
    occupancy?: string[];
    onOccupancyChange?: (value: string[]) => void;
    sortBy?: string;
    sortDir?: "asc" | "desc";
    onSortChange?: (sortBy: string, sortDir: "asc" | "desc") => void;
    locationCount?: number;
}

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
    spaceUse = [],
    onSpaceUseChange,
    minSfOccupied,
    maxSfOccupied,
    onSfOccupiedChange,
    occupancy,
    onOccupancyChange,
    sortBy,
    sortDir,
    onSortChange,
    locationCount = 0,
}: LocationsFilterBarProps) {
    const [localAddressSearch, setLocalAddressSearch] = useState(addressSearch);
    const [localTenantSearch, setLocalTenantSearch] = useState(tenantSearch);
    const [showSaveDropdown, setShowSaveDropdown] = useState(false);

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

    // Close save dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const saveButton = document.querySelector(
                '[data-save-dropdown-button]'
            );
            const saveDropdown = document.querySelector(
                '[data-save-dropdown]'
            );
            if (
                saveButton &&
                saveDropdown &&
                !saveButton.contains(target) &&
                !saveDropdown.contains(target)
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

    const hasActiveFilters =
        activeFiltersCount > 0 ||
        (minSfOccupied !== null && minSfOccupied !== undefined) ||
        (maxSfOccupied !== null && maxSfOccupied !== undefined) ||
        (spaceUse && spaceUse.length > 0) ||
        (occupancy && occupancy.length > 0) ||
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

                        {/* Space Use Selector */}
                        <SpaceUseSelector
                            spaceUse={spaceUse}
                            onSpaceUseChange={(value) =>
                                onSpaceUseChange?.(value)
                            }
                        />

                        {/* Size Occupied Selector */}
                        <SizeOccupiedSelector
                            minValue={minSfOccupied ?? null}
                            maxValue={maxSfOccupied ?? null}
                            onChange={(min, max) => {
                                onSfOccupiedChange?.(min, max);
                            }}
                            label="Size Occupied"
                        />

                        {/* Occupancy Selector */}
                        {occupancy !== undefined && onOccupancyChange && (
                            <OccupancySelector
                                occupancy={occupancy}
                                onOccupancyChange={(value) =>
                                    onOccupancyChange(value)
                                }
                            />
                        )}
                    </div>

                    {/* Right Group: Action Buttons and View Mode */}
                    <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 shrink-0">
                        {/* Location Count */}
                        {locationCount > 0 && (
                            <div className="text-sm font-medium text-gray-700 whitespace-nowrap hidden sm:block">
                                {locationCount.toLocaleString()} Locations
                            </div>
                        )}

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

                        {/* Sort Selector */}
                        {sortBy !== undefined && onSortChange && (
                            <TenantSortSelector
                                sortBy={sortBy}
                                sortDir={sortDir}
                                onSortChange={(by, dir) => {
                                    onSortChange(by, dir);
                                    onSortClick?.();
                                }}
                            />
                        )}

                        {/* Save Button with Dropdown */}
                        <div className="relative">
                            <button
                                data-save-dropdown-button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowSaveDropdown(!showSaveDropdown);
                                    onSaveClick?.();
                                }}
                                className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                            >
                                <span className="hidden sm:inline">Save</span>
                                <Plus
                                    className={`h-4 w-4 text-gray-400 transition-transform ${
                                        showSaveDropdown ? "rotate-45" : ""
                                    }`}
                                />
                            </button>
                            {showSaveDropdown && (
                                <div
                                    data-save-dropdown
                                    className="absolute right-0 z-50 mt-1 w-[calc(100vw-2rem)] sm:w-72 max-w-[20rem] rounded-md border border-gray-200 bg-white shadow-lg max-h-[400px] overflow-y-auto"
                                >
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
