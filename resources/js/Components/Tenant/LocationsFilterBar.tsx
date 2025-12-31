import { useState } from "react";
import {
    Search,
    Filter,
    ChevronDown,
    Map,
    List,
    Grid3x3,
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
    onSpaceUseChange?: (value: string) => void;
    sizeOccupied?: string;
    onSizeOccupiedChange?: (value: string) => void;
    occupancy?: string;
    onOccupancyChange?: (value: string) => void;
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
    spaceUse = "",
    onSpaceUseChange,
    sizeOccupied = "",
    onSizeOccupiedChange,
    occupancy = "",
    onOccupancyChange,
}: LocationsFilterBarProps) {
    return (
        <div className="border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between gap-4 py-4">
                    {/* Left Group: Search and Quick Filters */}
                    <div className="flex items-center gap-4">
                        {/* Address Search */}
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={addressSearch}
                                onChange={(e) =>
                                    onAddressSearchChange?.(e.target.value)
                                }
                                placeholder="Address or Location"
                                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        {/* Tenant Name Search */}
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={tenantSearch}
                                onChange={(e) =>
                                    onTenantSearchChange?.(e.target.value)
                                }
                                placeholder="Tenant Name or Ticker"
                                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        {/* Space Use Dropdown */}
                        <button
                            onClick={() => {
                                // Handle dropdown click
                            }}
                            className="flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <span>{spaceUse || "Space Use"}</span>
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </button>

                        {/* Size Occupied Dropdown */}
                        <button
                            onClick={() => {
                                // Handle dropdown click
                            }}
                            className="flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <span>{sizeOccupied || "Size Occupied"}</span>
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </button>

                        {/* Occupancy Dropdown */}
                        <button
                            onClick={() => {
                                // Handle dropdown click
                            }}
                            className="flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <span>{occupancy || "Occupancy"}</span>
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </button>
                    </div>

                    {/* Right Group: Action Buttons and View Mode */}
                    <div className="flex items-center gap-2">
                        {activeFiltersCount > 0 && (
                            <button
                                onClick={onClearClick}
                                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                Clear
                            </button>
                        )}

                        {/* Filters Button with Badge */}
                        <button
                            onClick={onFiltersClick}
                            className="relative flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                            className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <span>Sort</span>
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </button>

                        {/* Save Button */}
                        <button
                            onClick={onSaveClick}
                            className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <span>Save</span>
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </button>

                        {/* Reports Button */}
                        <button
                            onClick={onReportsClick}
                            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            Reports
                        </button>

                        {/* More Dropdown */}
                        <button
                            onClick={onMoreClick}
                            className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <span>More</span>
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </button>

                        {/* View Mode Toggle */}
                        <div className="ml-2 flex items-center gap-1 border-l border-gray-200 pl-4">
                            <button
                                onClick={() => onViewModeChange?.("map")}
                                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
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
                                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
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
                                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
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

