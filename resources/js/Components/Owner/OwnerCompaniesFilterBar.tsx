import {
    Search,
    Filter,
    ChevronDown,
    Download,
    X,
    Bookmark,
    Trash2,
    Plus,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

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
    onOwnerTypeChange?: (value: string | null) => void;
    minPortfolioSf?: number;
    maxPortfolioSf?: number;
    onPortfolioSizeChange?: (min: number | null, max: number | null) => void;
    minProperties?: number;
    onPropertiesOwnedChange?: (value: number | null) => void;
    mainPropertyTypes?: string[];
    onMainPropertyTypeChange?: (values: string[]) => void;
}

const PORTFOLIO_SIZE_OPTIONS = [
    { label: "All Sizes", value: null, min: null, max: null },
    { label: "0 - 100K SF", value: "0-100k", min: 0, max: 100000 },
    { label: "100K - 500K SF", value: "100k-500k", min: 100000, max: 500000 },
    { label: "500K - 1M SF", value: "500k-1m", min: 500000, max: 1000000 },
    { label: "1M+ SF", value: "1m+", min: 1000000, max: null },
];

const PROPERTIES_OPTIONS = [
    { label: "All Properties", value: null },
    { label: "1+ Properties", value: 1 },
    { label: "5+ Properties", value: 5 },
    { label: "10+ Properties", value: 10 },
    { label: "25+ Properties", value: 25 },
    { label: "50+ Properties", value: 50 },
    { label: "100+ Properties", value: 100 },
];

const OWNER_TYPE_OPTIONS = [
    { label: "All Owner Types", value: null },
    { label: "REIT", value: "REIT" },
    { label: "Private", value: "Private" },
    { label: "Public", value: "Public" },
    { label: "Institutional", value: "Institutional" },
];

const PROPERTY_TYPE_OPTIONS = [
    "Select All",
    "Diversified",
    "Office",
    "Industrial",
    "Retail",
    "Flex",
    "Multifamily",
    "Student",
    "Hospitality",
    "Health Care",
    "Specialty",
    "Sports & Entertainment",
];

export default function OwnerCompaniesFilterBar({
    searchValue = "",
    onSearchChange,
    onSearch,
    onFiltersClick,
    onSaveClick,
    onExportClick,
    onClearClick,
    activeFiltersCount = 0,
    ownerType,
    onOwnerTypeChange,
    minPortfolioSf,
    maxPortfolioSf,
    onPortfolioSizeChange,
    minProperties,
    onPropertiesOwnedChange,
    mainPropertyTypes = [],
    onMainPropertyTypeChange,
}: OwnerCompaniesFilterBarProps) {
    const [localSearchValue, setLocalSearchValue] = useState(searchValue);
    const [showPortfolioSizeMenu, setShowPortfolioSizeMenu] = useState(false);
    const [showPropertiesMenu, setShowPropertiesMenu] = useState(false);
    const [showPropertyTypeMenu, setShowPropertyTypeMenu] = useState(false);
    const [showSaveDropdown, setShowSaveDropdown] = useState(false);
    const portfolioSizeRef = useRef<HTMLDivElement>(null);
    const propertiesRef = useRef<HTMLDivElement>(null);
    const propertyTypeRef = useRef<HTMLDivElement>(null);
    const saveRef = useRef<HTMLDivElement>(null);

    // Dummy saved searches data - will be replaced with actual data later
    const [savedSearches] = useState([
        {
            id: 1,
            name: "Large REITs (1M+ SF)",
            createdAt: "2025-01-10",
        },
        {
            id: 2,
            name: "Private Owners with 25+ Properties",
            createdAt: "2025-01-08",
        },
        {
            id: 3,
            name: "Office Focus Owners",
            createdAt: "2025-01-05",
        },
    ]);

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
                portfolioSizeRef.current &&
                !portfolioSizeRef.current.contains(event.target as Node)
            ) {
                setShowPortfolioSizeMenu(false);
            }
            if (
                propertiesRef.current &&
                !propertiesRef.current.contains(event.target as Node)
            ) {
                setShowPropertiesMenu(false);
            }
            if (
                propertyTypeRef.current &&
                !propertyTypeRef.current.contains(event.target as Node)
            ) {
                setShowPropertyTypeMenu(false);
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

    const getPortfolioSizeLabel = () => {
        const option = PORTFOLIO_SIZE_OPTIONS.find(
            (opt) => opt.min === minPortfolioSf && opt.max === maxPortfolioSf
        );
        return option?.label || "Portfolio SF";
    };

    const getPropertiesLabel = () => {
        const option = PROPERTIES_OPTIONS.find(
            (opt) => opt.value === minProperties
        );
        return option?.label || "Properties";
    };

    const getPropertyTypeLabel = () => {
        if (mainPropertyTypes.length === 0) {
            return "Main Property Type";
        }
        if (mainPropertyTypes.length === 1) {
            return mainPropertyTypes[0];
        }
        return `${mainPropertyTypes.length} Selected`;
    };

    const handlePropertyTypeToggle = (type: string) => {
        if (type === "Select All") {
            if (mainPropertyTypes.length === PROPERTY_TYPE_OPTIONS.length - 1) {
                // All selected, deselect all
                onMainPropertyTypeChange?.([]);
            } else {
                // Select all (except "Select All" itself)
                onMainPropertyTypeChange?.(
                    PROPERTY_TYPE_OPTIONS.filter((t) => t !== "Select All")
                );
            }
        } else {
            const newSelection = mainPropertyTypes.includes(type)
                ? mainPropertyTypes.filter((t) => t !== type)
                : [...mainPropertyTypes, type];
            onMainPropertyTypeChange?.(newSelection);
        }
    };

    const isAllPropertyTypesSelected =
        mainPropertyTypes.length === PROPERTY_TYPE_OPTIONS.length - 1;

    const hasActiveFilters =
        activeFiltersCount > 0 ||
        minPortfolioSf !== null ||
        maxPortfolioSf !== null ||
        minProperties !== null ||
        ownerType !== null ||
        mainPropertyTypes.length > 0 ||
        localSearchValue;

    return (
        <div className="border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between gap-4 py-4">
                    {/* Left Side - Filters */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        {/* Owner Name or Ticker Search */}
                        <div className="relative min-w-[200px] shrink-0">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            <input
                                type="text"
                                value={localSearchValue}
                                onChange={(e) =>
                                    setLocalSearchValue(e.target.value)
                                }
                                onKeyPress={handleKeyPress}
                                placeholder="Fund or Owner Name"
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

                        {/* Owner Type Dropdown */}
                        <div className="relative shrink-0">
                            <select
                                value={ownerType || ""}
                                onChange={(e) =>
                                    onOwnerTypeChange?.(e.target.value || null)
                                }
                                className={`appearance-none rounded-md border px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer transition-colors ${
                                    ownerType
                                        ? "border-blue-500 bg-blue-50 text-blue-700"
                                        : "border-gray-300 bg-white text-gray-700"
                                }`}
                            >
                                {OWNER_TYPE_OPTIONS.map((option) => (
                                    <option
                                        key={option.value ?? "all"}
                                        value={option.value ?? ""}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Portfolio Size Button with Dropdown */}
                        <div className="relative" ref={portfolioSizeRef}>
                            <button
                                type="button"
                                onClick={() =>
                                    setShowPortfolioSizeMenu(
                                        !showPortfolioSizeMenu
                                    )
                                }
                                className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                                    minPortfolioSf !== null ||
                                    maxPortfolioSf !== null
                                        ? "border-blue-500 bg-blue-50 text-blue-700"
                                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                <span className="whitespace-nowrap">
                                    {getPortfolioSizeLabel()}
                                </span>
                                <ChevronDown
                                    className={`h-4 w-4 text-gray-400 transition-transform ${
                                        showPortfolioSizeMenu
                                            ? "rotate-180"
                                            : ""
                                    }`}
                                />
                            </button>
                            {showPortfolioSizeMenu && (
                                <div className="absolute left-0 z-50 mt-1 w-48 rounded-md border border-gray-200 bg-white shadow-lg">
                                    <div className="py-1">
                                        {PORTFOLIO_SIZE_OPTIONS.map(
                                            (option) => (
                                                <button
                                                    key={option.value ?? "all"}
                                                    type="button"
                                                    onClick={() => {
                                                        onPortfolioSizeChange?.(
                                                            option.min ?? null,
                                                            option.max ?? null
                                                        );
                                                        setShowPortfolioSizeMenu(
                                                            false
                                                        );
                                                    }}
                                                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                                                        minPortfolioSf ===
                                                            option.min &&
                                                        maxPortfolioSf ===
                                                            option.max
                                                            ? "bg-blue-50 text-blue-700 font-medium"
                                                            : "text-gray-700"
                                                    }`}
                                                >
                                                    {option.label}
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Properties Owned Button with Dropdown */}
                        <div className="relative" ref={propertiesRef}>
                            <button
                                type="button"
                                onClick={() =>
                                    setShowPropertiesMenu(!showPropertiesMenu)
                                }
                                className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                                    minProperties !== null
                                        ? "border-blue-500 bg-blue-50 text-blue-700"
                                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                <span className="whitespace-nowrap">
                                    {getPropertiesLabel()}
                                </span>
                                <ChevronDown
                                    className={`h-4 w-4 text-gray-400 transition-transform ${
                                        showPropertiesMenu ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                            {showPropertiesMenu && (
                                <div className="absolute left-0 z-50 mt-1 w-48 rounded-md border border-gray-200 bg-white shadow-lg">
                                    <div className="py-1">
                                        {PROPERTIES_OPTIONS.map((option) => (
                                            <button
                                                key={option.value ?? "all"}
                                                type="button"
                                                onClick={() => {
                                                    onPropertiesOwnedChange?.(
                                                        option.value
                                                    );
                                                    setShowPropertiesMenu(
                                                        false
                                                    );
                                                }}
                                                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                                                    minProperties ===
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

                        {/* Main Property Type Button with Dropdown */}
                        <div className="relative" ref={propertyTypeRef}>
                            <button
                                type="button"
                                onClick={() =>
                                    setShowPropertyTypeMenu(
                                        !showPropertyTypeMenu
                                    )
                                }
                                className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                                    mainPropertyTypes.length > 0
                                        ? "border-blue-500 bg-blue-50 text-blue-700"
                                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                <span className="whitespace-nowrap">
                                    {getPropertyTypeLabel()}
                                </span>
                                <ChevronDown
                                    className={`h-4 w-4 text-gray-400 transition-transform ${
                                        showPropertyTypeMenu ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                            {showPropertyTypeMenu && (
                                <div className="absolute left-0 z-50 mt-1 w-56 rounded-md border border-gray-200 bg-white shadow-lg">
                                    <div
                                        className="py-1 max-h-96 overflow-y-auto"
                                        onClick={(e) => {
                                            // Prevent dropdown from closing when clicking inside the menu
                                            e.stopPropagation();
                                        }}
                                    >
                                        {PROPERTY_TYPE_OPTIONS.map((type) => {
                                            const isChecked =
                                                type === "Select All"
                                                    ? isAllPropertyTypesSelected
                                                    : mainPropertyTypes.includes(
                                                          type
                                                      );
                                            return (
                                                <label
                                                    key={type}
                                                    className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={isChecked}
                                                        onChange={() => {
                                                            handlePropertyTypeToggle(
                                                                type
                                                            );
                                                        }}
                                                        className="h-3.5 w-3.5 rounded border-gray-300 text-[#0066CC] focus:ring-[#0066CC] accent-[#0066CC] cursor-pointer"
                                                    />
                                                    <span className="text-gray-700">
                                                        {type}
                                                    </span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side - Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                        {/* Clear Button */}
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

                        {/* Save Button with Dropdown */}
                        <div className="relative" ref={saveRef}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowSaveDropdown(!showSaveDropdown);
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
                                <div className="absolute right-0 z-50 mt-1 w-72 rounded-md border border-gray-200 bg-white shadow-lg max-h-[400px] overflow-y-auto">
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

                        {/* Export Button */}
                        <button
                            onClick={onExportClick}
                            className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
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
