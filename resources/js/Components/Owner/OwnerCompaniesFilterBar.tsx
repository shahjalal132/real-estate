import { Search, Filter, ChevronDown, Download } from "lucide-react";
import { useState } from "react";

interface OwnerCompaniesFilterBarProps {
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    onSearch?: () => void;
    onFiltersClick?: () => void;
    onSaveClick?: () => void;
    onExportClick?: () => void;
    onClearClick?: () => void;
    activeFiltersCount?: number;
    // Filter values
    ownerType?: string;
    onOwnerTypeChange?: (value: string) => void;
    portfolioSize?: string;
    onPortfolioSizeChange?: (value: string) => void;
    propertiesOwned?: string;
    onPropertiesOwnedChange?: (value: string) => void;
    mainPropertyType?: string;
    onMainPropertyTypeChange?: (value: string) => void;
}

export default function OwnerCompaniesFilterBar({
    searchValue = "",
    onSearchChange,
    onSearch,
    onFiltersClick,
    onSaveClick,
    onExportClick,
    onClearClick,
    activeFiltersCount = 0,
    ownerType = "",
    onOwnerTypeChange,
    portfolioSize = "",
    onPortfolioSizeChange,
    propertiesOwned = "",
    onPropertiesOwnedChange,
    mainPropertyType = "",
    onMainPropertyTypeChange,
}: OwnerCompaniesFilterBarProps) {
    const [showPortfolioSizeMenu, setShowPortfolioSizeMenu] = useState(false);
    const [showPropertiesMenu, setShowPropertiesMenu] = useState(false);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSearch?.();
        }
    };

    const portfolioSizeOptions = [
        { label: "All", value: "" },
        { label: "0 - 100K SF", value: "0-100k" },
        { label: "100K - 500K SF", value: "100k-500k" },
        { label: "500K - 1M SF", value: "500k-1m" },
        { label: "1M+ SF", value: "1m+" },
    ];

    const propertiesOptions = [
        { label: "All", value: "" },
        { label: "5+ Properties", value: "5" },
        { label: "10+ Properties", value: "10" },
        { label: "25+ Properties", value: "25" },
        { label: "50+ Properties", value: "50" },
        { label: "100+ Properties", value: "100" },
    ];

    const getPortfolioSizeLabel = () => {
        const option = portfolioSizeOptions.find(
            (opt) => opt.value === portfolioSize
        );
        return option ? option.label : "Portfolio SF";
    };

    const getPropertiesLabel = () => {
        const option = propertiesOptions.find(
            (opt) => opt.value === propertiesOwned
        );
        return option ? option.label : "Properties";
    };

    return (
        <div className="border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between gap-4 py-4">
                    {/* Left Side - Filters */}
                    <div className="flex items-center gap-3 flex-1">
                        {/* Owner Name or Ticker Search */}
                        <div className="relative min-w-[200px]">
                            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            <input
                                type="text"
                                value={searchValue}
                                onChange={(e) =>
                                    onSearchChange?.(e.target.value)
                                }
                                onKeyPress={handleKeyPress}
                                placeholder="Owner Name or Ticker"
                                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        {/* Owner Type Select */}
                        <div className="relative">
                            <select
                                value={ownerType}
                                onChange={(e) =>
                                    onOwnerTypeChange?.(e.target.value)
                                }
                                className="appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-8 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                            >
                                <option value="">Owner Type</option>
                                <option value="REIT">REIT</option>
                                <option value="Private">Private</option>
                                <option value="Public">Public</option>
                                <option value="Institutional">
                                    Institutional
                                </option>
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Portfolio Size Button with Dropdown */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() =>
                                    setShowPortfolioSizeMenu(
                                        !showPortfolioSizeMenu
                                    )
                                }
                                className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <span>{getPortfolioSizeLabel()}</span>
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                            </button>
                            {showPortfolioSizeMenu && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() =>
                                            setShowPortfolioSizeMenu(false)
                                        }
                                    />
                                    <div className="absolute left-0 top-full z-20 mt-1 w-48 rounded-md border border-gray-200 bg-white shadow-lg">
                                        {portfolioSizeOptions.map((option) => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => {
                                                    onPortfolioSizeChange?.(
                                                        option.value
                                                    );
                                                    setShowPortfolioSizeMenu(
                                                        false
                                                    );
                                                }}
                                                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                                                    portfolioSize ===
                                                    option.value
                                                        ? "bg-blue-50 text-blue-700"
                                                        : "text-gray-700"
                                                }`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Properties Owned Button with Dropdown */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() =>
                                    setShowPropertiesMenu(!showPropertiesMenu)
                                }
                                className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <span>{getPropertiesLabel()}</span>
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                            </button>
                            {showPropertiesMenu && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() =>
                                            setShowPropertiesMenu(false)
                                        }
                                    />
                                    <div className="absolute left-0 top-full z-20 mt-1 w-48 rounded-md border border-gray-200 bg-white shadow-lg">
                                        {propertiesOptions.map((option) => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => {
                                                    onPropertiesOwnedChange?.(
                                                        option.value
                                                    );
                                                    setShowPropertiesMenu(
                                                        false
                                                    );
                                                }}
                                                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                                                    propertiesOwned ===
                                                    option.value
                                                        ? "bg-blue-50 text-blue-700"
                                                        : "text-gray-700"
                                                }`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Main Property Type Select */}
                        <div className="relative">
                            <select
                                value={mainPropertyType}
                                onChange={(e) =>
                                    onMainPropertyTypeChange?.(e.target.value)
                                }
                                className="appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-8 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                            >
                                <option value="">Main Property Type</option>
                                <option value="Office">Office</option>
                                <option value="Retail">Retail</option>
                                <option value="Industrial">Industrial</option>
                                <option value="Multifamily">Multifamily</option>
                                <option value="Mixed Use">Mixed Use</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Right Side - Action Buttons */}
                    <div className="flex items-center gap-2">
                        {/* Clear Button */}
                        {activeFiltersCount > 0 && (
                            <button
                                onClick={onClearClick}
                                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
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

                        {/* Export Button */}
                        <button
                            onClick={onExportClick}
                            className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <Download className="h-4 w-4" />
                            <span>Export</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
