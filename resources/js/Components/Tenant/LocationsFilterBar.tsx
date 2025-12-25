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
    viewMode?: "map" | "list" | "gallery";
    onViewModeChange?: (mode: "map" | "list" | "gallery") => void;
    activeFiltersCount?: number;
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
    viewMode = "map",
    onViewModeChange,
    activeFiltersCount = 0,
}: LocationsFilterBarProps) {
    const [spaceUse, setSpaceUse] = useState("");
    const [sizeOccupied, setSizeOccupied] = useState("");
    const [occupancy, setOccupancy] = useState("");

    return (
        <div className="border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4 py-4">
                    {/* Address Search */}
                    <div className="flex-1 max-w-xs">
                        <div className="relative">
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
                    </div>

                    {/* Tenant Name Search */}
                    <div className="flex-1 max-w-xs">
                        <div className="relative">
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
                    </div>

                    {/* Space Use Dropdown */}
                    <select
                        value={spaceUse}
                        onChange={(e) => setSpaceUse(e.target.value)}
                        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="">Space Use</option>
                        <option value="retail">Retail</option>
                        <option value="office">Office</option>
                        <option value="industrial">Industrial</option>
                        <option value="warehouse">Warehouse</option>
                        <option value="mixed">Mixed Use</option>
                    </select>

                    {/* Size Occupied Dropdown */}
                    <select
                        value={sizeOccupied}
                        onChange={(e) => setSizeOccupied(e.target.value)}
                        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="">Size Occupied</option>
                        <option value="0-100k">0 - 100K SF</option>
                        <option value="100k-500k">100K - 500K SF</option>
                        <option value="500k-1m">500K - 1M SF</option>
                        <option value="1m+">1M+ SF</option>
                    </select>

                    {/* Occupancy Dropdown */}
                    <select
                        value={occupancy}
                        onChange={(e) => setOccupancy(e.target.value)}
                        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="">Occupancy</option>
                        <option value="occupied">Occupied</option>
                        <option value="vacant">Vacant</option>
                        <option value="partial">Partial</option>
                    </select>

                    {/* Filters Button */}
                    <button
                        onClick={onFiltersClick}
                        className="relative flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        <Filter className="h-4 w-4" />
                        Filters
                        {activeFiltersCount > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-medium text-white">
                                {activeFiltersCount}
                            </span>
                        )}
                    </button>

                    {/* Sort Dropdown */}
                    <button
                        onClick={onSortClick}
                        className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Sort
                        <ChevronDown className="h-4 w-4" />
                    </button>

                    {/* Save Button */}
                    <button
                        onClick={onSaveClick}
                        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Save
                    </button>

                    {/* Reports Button */}
                    <button
                        onClick={onReportsClick}
                        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Reports
                    </button>

                    {/* More Dropdown */}
                    <button
                        onClick={onMoreClick}
                        className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        More
                        <ChevronDown className="h-4 w-4" />
                    </button>

                    {/* View Mode Toggle */}
                    <div className="ml-auto flex items-center gap-1 border-l border-gray-200 pl-4">
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
    );
}

