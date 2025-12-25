import { Search, Filter, ChevronDown, Plus, Download, Clock } from "lucide-react";

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
    activeFiltersCount?: number;
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
    activeFiltersCount = 0,
}: CompaniesFilterBarProps) {
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSearch?.();
        }
    };

    return (
        <div className="border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4 py-4">
                    {/* Search Input */}
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={searchValue}
                                onChange={(e) => onSearchChange?.(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Tenant Name or Ticker"
                                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Dropdown Filters */}
                    <select className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option>5+ Locations</option>
                        <option>10+ Locations</option>
                        <option>25+ Locations</option>
                        <option>50+ Locations</option>
                    </select>

                    <select className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option>Size Occupied</option>
                        <option>0 - 100K SF</option>
                        <option>100K - 500K SF</option>
                        <option>500K - 1M SF</option>
                        <option>1M+ SF</option>
                    </select>

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

                    {/* Action Buttons */}
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

                    <button
                        onClick={onSortClick}
                        className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Sort
                        <ChevronDown className="h-4 w-4" />
                    </button>

                    <button
                        onClick={onSaveClick}
                        className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Save
                        <ChevronDown className="h-4 w-4" />
                    </button>

                    <button
                        onClick={onAddClick}
                        className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        <Plus className="h-4 w-4" />
                        Add Tenant Companies
                    </button>

                    <button
                        onClick={onExportClick}
                        className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        <Download className="h-4 w-4" />
                        Export
                    </button>

                    <button
                        onClick={onAddedRemovedClick}
                        className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-400"
                    >
                        <Clock className="h-4 w-4" />
                        Added/Removed
                    </button>
                </div>
            </div>
        </div>
    );
}

