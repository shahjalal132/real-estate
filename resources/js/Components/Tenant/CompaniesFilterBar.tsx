import {
    Search,
    Filter,
    ChevronDown,
    Plus,
    Download,
    Clock,
} from "lucide-react";

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
    numberOfLocations?: string;
    onNumberOfLocationsChange?: (value: string) => void;
    sizeOccupied?: string;
    onSizeOccupiedChange?: (value: string) => void;
}

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
    numberOfLocations = "",
    onNumberOfLocationsChange,
    sizeOccupied = "",
    onSizeOccupiedChange,
}: CompaniesFilterBarProps) {
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSearch?.();
        }
    };

    return (
        <div className="border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between gap-4 py-4">
                    {/* Left Group: Search and Quick Filters */}
                    <div className="flex items-center gap-4">
                        {/* Search Input */}
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={searchValue}
                                onChange={(e) =>
                                    onSearchChange?.(e.target.value)
                                }
                                onKeyPress={handleKeyPress}
                                placeholder="Tenant Name or Ticker"
                                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        {/* Number of Locations Dropdown */}
                        <button
                            onClick={() => {
                                // Handle dropdown click
                            }}
                            className="flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <span>{numberOfLocations || "5+ Locations"}</span>
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

                        {/* Retailers Only Toggle */}
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-700">
                                Retailers Only
                            </span>
                            <button
                                onClick={() =>
                                    onRetailersOnlyChange?.(!retailersOnly)
                                }
                                className={`relative h-6 w-11 rounded-full transition-colors ${
                                    retailersOnly
                                        ? "bg-blue-600"
                                        : "bg-gray-300"
                                }`}
                            >
                                <span
                                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                                        retailersOnly ? "translate-x-5" : ""
                                    }`}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Right Group: Action Buttons */}
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

                        {/* Save Button with Dropdown */}
                        <div className="relative">
                            <button
                                onClick={onSaveClick}
                                className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <span>Save</span>
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                            </button>
                        </div>

                        {/* Add Tenant Companies Button */}
                        <button
                            onClick={onAddClick}
                            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <Plus className="h-4 w-4" />
                            <span>Add Tenant Companies</span>
                        </button>

                        {/* Export Button */}
                        <button
                            onClick={onExportClick}
                            className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <Download className="h-4 w-4" />
                            <span>Export</span>
                        </button>

                        {/* Added/Removed Button */}
                        <button
                            onClick={onAddedRemovedClick}
                            className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <Clock className="h-4 w-4" />
                            <span>Added/Removed</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
