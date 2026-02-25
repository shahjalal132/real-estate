import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { usePage } from "@inertiajs/react";
import AllFiltersButton from "./AllFiltersButton";
import SaveFilterModal from "./SaveFilterModal";
import { saveFilter } from "../utils/cookies";
import { FilterValues } from "./AllFiltersModal";

interface PropertySearchHeaderProps {
    onSearch?: (filters: SearchFilters) => void;
    onFiltersClick?: () => void;
    onSaveSearch?: () => void;
    onClearFilters?: () => void;
    viewMode?: "grid" | "map";
    onViewModeChange?: (mode: "grid" | "map") => void;
    activeFiltersCount?: number;
    currentFilters?: FilterValues | null;
    hasActiveFilters?: boolean;
    isSearching?: boolean;
}

export interface SearchFilters {
    status: string;
    propertyType: string;
    priceRange: string;
    capRate: string;
}

const STATUS_OPTIONS = [
    { value: "for-sale", label: "For Sale" },
    { value: "for-lease", label: "For Lease" },
    { value: "auctions", label: "Auctions" },
    { value: "all", label: "All" },
];

const PROPERTY_TYPE_OPTIONS = [
    { value: "all", label: "All Types" },
    { value: "Retail", label: "Retail" },
    { value: "Multifamily", label: "Multifamily" },
    { value: "Office", label: "Office" },
    { value: "Industrial", label: "Industrial" },
    { value: "Land", label: "Land" },
    { value: "Commercial", label: "Commercial" },
    { value: "Residential", label: "Residential" },
    { value: "Hospitality", label: "Hospitality" },
    { value: "Mixed Use", label: "Mixed Use" },
];

const PRICE_RANGE_OPTIONS = [
    { value: "any", label: "Any Price" },
    { value: "0-500k", label: "$0 - $500K" },
    { value: "500k-1m", label: "$500K - $1M" },
    { value: "1m-5m", label: "$1M - $5M" },
    { value: "5m-10m", label: "$5M - $10M" },
    { value: "10m+", label: "$10M+" },
];

const CAP_RATE_OPTIONS = [
    { value: "any", label: "Any CAP Rate" },
    { value: "0-3", label: "0% - 3%" },
    { value: "3-5", label: "3% - 5%" },
    { value: "5-7", label: "5% - 7%" },
    { value: "7-10", label: "7% - 10%" },
    { value: "10+", label: "10%+" },
];

export default function PropertySearchHeader({
    onSearch,
    onFiltersClick,
    onSaveSearch,
    onClearFilters,
    viewMode = "grid",
    onViewModeChange,
    activeFiltersCount = 0,
    currentFilters = null,
    hasActiveFilters = false,
    isSearching = false,
}: PropertySearchHeaderProps) {
    const { url } = usePage();
    const [status, setStatus] = useState("for-sale");
    const [propertyType, setPropertyType] = useState("all");
    const [priceRange, setPriceRange] = useState("any");
    const [capRate, setCapRate] = useState("any");
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [saving, setSaving] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize from URL parameters (only once on mount)
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const pageUrl = url || window.location.pathname;

        // Determine status from URL query parameters first, then path
        const urlType = urlParams.get("type");
        const urlStatus = urlParams.get("status");

        let initialStatus = "for-sale";
        if (urlStatus === "auctions") {
            initialStatus = "auctions";
        } else if (urlType === "for-lease") {
            initialStatus = "for-lease";
        } else if (urlType === "for-sale") {
            initialStatus = "for-sale";
        } else {
            // Fallback to path-based detection
            if (pageUrl.includes("/auctions")) {
                initialStatus = "auctions";
            } else if (pageUrl.includes("/commercial")) {
                initialStatus = "commercial";
            } else if (
                pageUrl.includes("/rental") ||
                pageUrl.includes("/for-lease")
            ) {
                initialStatus = "for-lease";
            } else if (
                pageUrl.includes("/residential") ||
                pageUrl.includes("/for-sale")
            ) {
                initialStatus = "for-sale";
            }
        }

        let initialPropertyType = "all";
        // Get property type from URL
        const typeParam = urlParams.get("property_types");
        if (typeParam) {
            const types = typeParam.split(",");
            if (types.length > 0) {
                initialPropertyType = types[0];
            }
        }

        let initialPriceRange = "any";
        // Get price range from URL
        const minPrice =
            urlParams.get("min_price") || urlParams.get("min_rate");
        const maxPrice =
            urlParams.get("max_price") || urlParams.get("max_rate");
        if (minPrice || maxPrice) {
            // Convert to price range format
            const min = minPrice
                ? parseFloat(minPrice.replace(/[^0-9.]/g, ""))
                : 0;
            const max = maxPrice
                ? parseFloat(maxPrice.replace(/[^0-9.]/g, ""))
                : Infinity;

            if (min === 0 && max <= 500000) {
                initialPriceRange = "0-500k";
            } else if (min >= 500000 && max <= 1000000) {
                initialPriceRange = "500k-1m";
            } else if (min >= 1000000 && max <= 5000000) {
                initialPriceRange = "1m-5m";
            } else if (min >= 5000000 && max <= 10000000) {
                initialPriceRange = "5m-10m";
            } else if (min >= 10000000) {
                initialPriceRange = "10m+";
            }
        }

        let initialCapRate = "any";
        // Get cap rate from URL
        const minCapRate = urlParams.get("min_cap_rate");
        const maxCapRate = urlParams.get("max_cap_rate");
        if (minCapRate || maxCapRate) {
            const min = minCapRate ? parseFloat(minCapRate) : 0;
            const max = maxCapRate ? parseFloat(maxCapRate) : Infinity;

            if (min === 0 && max <= 3) {
                initialCapRate = "0-3";
            } else if (min >= 3 && max <= 5) {
                initialCapRate = "3-5";
            } else if (min >= 5 && max <= 7) {
                initialCapRate = "5-7";
            } else if (min >= 7 && max <= 10) {
                initialCapRate = "7-10";
            } else if (min >= 10) {
                initialCapRate = "10+";
            }
        }

        // Set all initial values at once
        setStatus(initialStatus);
        setPropertyType(initialPropertyType);
        setPriceRange(initialPriceRange);
        setCapRate(initialCapRate);

        // Store initial values and mark as initialized
        previousFiltersRef.current = {
            status: initialStatus,
            propertyType: initialPropertyType,
            priceRange: initialPriceRange,
            capRate: initialCapRate,
        };
        setIsInitialized(true);
    }, [url]);

    const [statusOpen, setStatusOpen] = useState(false);
    const [typeOpen, setTypeOpen] = useState(false);
    const [priceOpen, setPriceOpen] = useState(false);
    const [capRateOpen, setCapRateOpen] = useState(false);
    const previousFiltersRef = useRef<{
        status: string;
        propertyType: string;
        priceRange: string;
        capRate: string;
    } | null>(null);

    const selectedStatus =
        STATUS_OPTIONS.find((opt) => opt.value === status)?.label || "For Sale";
    const selectedType =
        PROPERTY_TYPE_OPTIONS.find((opt) => opt.value === propertyType)
            ?.label || "All Types";
    const selectedPrice =
        PRICE_RANGE_OPTIONS.find((opt) => opt.value === priceRange)?.label ||
        "Any Price";
    const selectedCapRate =
        CAP_RATE_OPTIONS.find((opt) => opt.value === capRate)?.label ||
        "Any CAP Rate";

    // Auto-trigger search when filters change (after initial load)
    useEffect(() => {
        // Skip if not initialized yet (waiting for URL params to load)
        if (!isInitialized) {
            return;
        }

        // Only trigger search if values actually changed
        const currentFilters = { status, propertyType, priceRange, capRate };
        const previousFilters = previousFiltersRef.current;

        if (
            previousFilters &&
            (previousFilters.status !== currentFilters.status ||
                previousFilters.propertyType !== currentFilters.propertyType ||
                previousFilters.priceRange !== currentFilters.priceRange ||
                previousFilters.capRate !== currentFilters.capRate)
        ) {
            // Update previous filters
            previousFiltersRef.current = currentFilters;

            // Trigger search automatically when any filter changes
            if (onSearch) {
                onSearch({
                    status,
                    propertyType,
                    priceRange,
                    capRate,
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, propertyType, priceRange, capRate, isInitialized]);

    const handleStatusChange = useCallback((value: string) => {
        setStatus(value);
    }, []);

    const handlePropertyTypeChange = useCallback((value: string) => {
        setPropertyType(value);
    }, []);

    const handlePriceRangeChange = useCallback((value: string) => {
        setPriceRange(value);
    }, []);

    const handleCapRateChange = useCallback((value: string) => {
        setCapRate(value);
    }, []);

    // Get default filter name based on current filters
    const getDefaultFilterName = (): string => {
        if (!currentFilters) {
            return "My Search";
        }

        if (
            currentFilters.propertyTypes &&
            currentFilters.propertyTypes.length > 0 &&
            !currentFilters.propertyTypes.includes("All")
        ) {
            const mainTypes = currentFilters.propertyTypes
                .filter((type) => type !== "All" && !type.includes(" - "))
                .slice(0, 3);
            if (mainTypes.length > 0) {
                return mainTypes.join(", ");
            }
        }

        if (currentFilters.location && currentFilters.location.length > 0) {
            return currentFilters.location[0];
        }

        return "My Search";
    };

    const handleSaveFilter = (name: string, duration: string) => {
        if (!currentFilters) return;

        setSaving(true);
        try {
            saveFilter(name, duration, currentFilters);
            setShowSaveModal(false);
            onSaveSearch?.();
            // Optionally show a success message
        } catch (error) {
            console.error("Error saving filter:", error);
            alert("Failed to save search. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const handleSaveSearchClick = () => {
        if (hasActiveFilters && currentFilters) {
            setShowSaveModal(true);
        }
    };

    const DropdownButton = ({
        label,
        isOpen,
        onClick,
        className = "",
        disabled = false,
    }: {
        label: string;
        isOpen: boolean;
        onClick: () => void;
        className?: string;
        disabled?: boolean;
    }) => (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`inline-flex items-center justify-between gap-2 rounded-lg border border-[#0066CC] cursor-pointer bg-white px-3 py-2.5 text-sm font-medium text-[#0066CC] hover:bg-[#F0F7FF] transition-colors min-w-0 w-full min-h-[44px] ${
                disabled ? "opacity-60 cursor-not-allowed hover:bg-white" : ""
            } ${className}`}
        >
            <span className="truncate text-left">{label}</span>
            {isSearching && !isOpen ? (
                <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
            ) : (
                <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            )}
        </button>
    );

    const DropdownMenu = ({
        isOpen,
        onClose,
        options,
        onSelect,
        className = "",
    }: {
        isOpen: boolean;
        onClose: () => void;
        options: { value: string; label: string }[];
        onSelect: (value: string) => void;
        className?: string;
    }) => {
        if (!isOpen) return null;
        return (
            <>
                <div className="fixed inset-0 z-10" onClick={onClose} />
                <div
                    className={`absolute left-0 z-20 mt-1.5 w-full min-w-[160px] rounded-lg border border-gray-200 bg-white shadow-lg ${className}`}
                >
                    <div className="py-1 max-h-[min(60vh,320px)] overflow-y-auto">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 min-h-[40px] flex items-center rounded-md"
                                onClick={() => {
                                    onSelect(option.value);
                                    onClose();
                                }}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            </>
        );
    };

    return (
        <div className="w-full bg-white border-b border-gray-200 shadow-sm relative">
            {/* Loading overlay */}
            {isSearching && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="flex items-center gap-2 text-[#0066CC]">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span className="text-sm font-medium">
                            Searching...
                        </span>
                    </div>
                </div>
            )}
            <div className="mx-auto max-w-[1600px] px-4 sm:px-6 py-4">
                {/* Medium: two rows. Large: one row (dropdowns + Save Search + All Filters + Map) */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:gap-6">
                {/* Row 1 (medium) / Left block (large): Filter dropdowns */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full lg:w-auto lg:flex-1 lg:grid-cols-4">
                        {/* Status Dropdown */}
                        <div className="relative min-w-0">
                            <DropdownButton
                                label={selectedStatus}
                                isOpen={statusOpen}
                                disabled={isSearching}
                                onClick={() => {
                                    if (!isSearching) {
                                        setStatusOpen(!statusOpen);
                                        setTypeOpen(false);
                                        setPriceOpen(false);
                                        setCapRateOpen(false);
                                    }
                                }}
                            />
                            <DropdownMenu
                                isOpen={statusOpen && !isSearching}
                                onClose={() => setStatusOpen(false)}
                                options={STATUS_OPTIONS}
                                onSelect={handleStatusChange}
                            />
                        </div>

                        {/* Property Type Dropdown */}
                        <div className="relative min-w-0">
                            <DropdownButton
                                label={selectedType}
                                isOpen={typeOpen}
                                disabled={isSearching}
                                onClick={() => {
                                    if (!isSearching) {
                                        setTypeOpen(!typeOpen);
                                        setStatusOpen(false);
                                        setPriceOpen(false);
                                        setCapRateOpen(false);
                                    }
                                }}
                            />
                            <DropdownMenu
                                isOpen={typeOpen && !isSearching}
                                onClose={() => setTypeOpen(false)}
                                options={PROPERTY_TYPE_OPTIONS}
                                onSelect={handlePropertyTypeChange}
                            />
                        </div>

                        {/* Price Range Dropdown */}
                        <div className="relative min-w-0">
                            <DropdownButton
                                label={selectedPrice}
                                isOpen={priceOpen}
                                disabled={isSearching}
                                onClick={() => {
                                    if (!isSearching) {
                                        setPriceOpen(!priceOpen);
                                        setStatusOpen(false);
                                        setTypeOpen(false);
                                        setCapRateOpen(false);
                                    }
                                }}
                            />
                            <DropdownMenu
                                isOpen={priceOpen && !isSearching}
                                onClose={() => setPriceOpen(false)}
                                options={PRICE_RANGE_OPTIONS}
                                onSelect={handlePriceRangeChange}
                            />
                        </div>

                        {/* CAP Rate Dropdown */}
                        <div className="relative min-w-0">
                            <DropdownButton
                                label={selectedCapRate}
                                isOpen={capRateOpen}
                                disabled={isSearching}
                                onClick={() => {
                                    if (!isSearching) {
                                        setCapRateOpen(!capRateOpen);
                                        setStatusOpen(false);
                                        setTypeOpen(false);
                                        setPriceOpen(false);
                                    }
                                }}
                            />
                            <DropdownMenu
                                isOpen={capRateOpen && !isSearching}
                                onClose={() => setCapRateOpen(false)}
                                options={CAP_RATE_OPTIONS}
                                onSelect={handleCapRateChange}
                            />
                        </div>
                </div>

                {/* Row 2 (medium) / Right block (large): Save Search | All Filters | Show Map */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-gray-200 lg:pt-0 lg:border-t-0 lg:shrink-0 lg:gap-4">
                    <button
                        type="button"
                        onClick={handleSaveSearchClick}
                        disabled={!hasActiveFilters}
                        className={`w-full sm:w-auto px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors min-h-[44px] sm:min-h-0 order-first sm:order-0 ${
                            hasActiveFilters
                                ? "bg-[#0066CC] hover:bg-[#0052A3] text-white shadow-sm cursor-pointer"
                                : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                        Save Search
                    </button>
                    <div className="flex items-center justify-between sm:justify-end gap-4">
                        <AllFiltersButton
                            onClick={onFiltersClick || (() => {})}
                            activeFiltersCount={activeFiltersCount}
                        />
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Show Map</span>
                            <button
                                type="button"
                                onClick={() =>
                                    onViewModeChange?.(
                                        viewMode === "map" ? "grid" : "map"
                                    )
                                }
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:ring-offset-2 cursor-pointer ${
                                    viewMode === "map"
                                        ? "bg-[#0066CC]"
                                        : "bg-gray-300"
                                }`}
                                role="switch"
                                aria-checked={viewMode === "map"}
                                aria-label={viewMode === "map" ? "Hide map" : "Show map"}
                            >
                                <span
                                    className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                                        viewMode === "map"
                                            ? "translate-x-6"
                                            : "translate-x-1"
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>
                </div>
            </div>

            {/* Save Filter Modal */}
            <SaveFilterModal
                isOpen={showSaveModal}
                onClose={() => setShowSaveModal(false)}
                onSave={handleSaveFilter}
                defaultName={getDefaultFilterName()}
                saving={saving}
            />
        </div>
    );
}
