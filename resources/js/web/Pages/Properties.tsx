import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import { usePage, router } from "@inertiajs/react";
import AppLayout from "../Layouts/AppLayout";
import PropertySearchHeader, {
    SearchFilters,
} from "../../Components/PropertySearchHeader";
import AllFiltersModal, {
    FilterValues,
} from "../../Components/AllFiltersModal";
import PropertyResultsHeader from "../../Components/Property/PropertyResultsHeader";
import PropertyGridView from "../../Components/Property/PropertyGridView";
import PropertyMapViewLayout from "../../Components/Property/PropertyMapViewLayout";
import ScrollToTop from "../../Components/ScrollToTop";
import { Property } from "../../types";
import { mapPropertyToCardProps, applyFilter } from "../../utils/propertyUtils";
import { usePropertyFilters } from "../../hooks/usePropertyFilters";
import { useActiveFilters } from "../../hooks/useActiveFilters";

interface PageProps {
    properties?: Property[];
    filter: string;
    section: string | null;
    listingTitle?: string;
    filters?: Record<string, any>;
    [key: string]: unknown;
}

export default function Properties() {
    const { props, url } = usePage<PageProps>();
    const {
        properties = [],
        filter,
        section,
        listingTitle,
        filters: initialFilters = {},
    } = props;

    // Determine section from current route or query parameters
    const currentSection = useMemo(() => {
        // Check URL path first (backward compatibility)
        if (url.includes("/properties/auctions")) return "auctions";
        if (url.includes("/properties/residential")) return "residentials";
        if (url.includes("/properties/commercial")) return "commercial";
        if (url.includes("/properties/rental")) return "rental";

        // Check query parameters from filters
        if (initialFilters?.category) {
            return initialFilters.category === "commercial"
                ? "commercial"
                : initialFilters.category === "residential"
                ? "residentials"
                : null;
        }

        // Fall back to section prop
        return section || null;
    }, [url, section, initialFilters]);

    const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
    const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(
        null
    );
    const [filtersExpanded, setFiltersExpanded] = useState(false);
    const [sortedProperties, setSortedProperties] =
        useState<Property[]>(properties);
    const [currentFilters, setCurrentFilters] = useState<FilterValues | null>(
        null
    );

    // Update sorted properties when properties change
    useEffect(() => {
        setSortedProperties(properties);
    }, [properties]);

    const filteredListings = useMemo(
        () => applyFilter(sortedProperties, filter),
        [sortedProperties, filter]
    );

    // Use listingTitle from server if available, otherwise generate from currentSection
    const sectionTitle =
        listingTitle ||
        (currentSection
            ? currentSection.charAt(0).toUpperCase() +
              currentSection.slice(1) +
              " Properties"
            : "All Properties");

    // Use custom hook for active filters
    const { activeFiltersCount, hasActiveFilters } = useActiveFilters({
        filter,
        currentSection,
        initialFilters,
        currentFilters,
    });

    // Use custom hook for filter management
    const { applyFilters, resetFilters } = usePropertyFilters({
        url,
        initialFilters,
    });

    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = useCallback(
        (searchFilters: SearchFilters) => {
            // Clear any pending search
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }

            // Set searching state immediately
            setIsSearching(true);

            // Debounce the search to prevent rapid-fire requests
            searchTimeoutRef.current = setTimeout(() => {
                const params: Record<string, any> = {};

                // Always use /properties as base path
                let basePath = "/properties";

                // Map status to URL parameters (type, category, status)
                if (searchFilters.status === "for-sale") {
                    params.type = "for-sale";
                } else if (searchFilters.status === "for-lease") {
                    params.type = "for-lease";
                } else if (searchFilters.status === "auctions") {
                    params.status = "auctions";
                    // Auctions are typically for-sale
                    params.type = "for-sale";
                } else if (searchFilters.status === "all") {
                    // Clear type and status filters
                    // Don't set them in params
                }

                // Property Type filter - map to property_types parameter
                if (
                    searchFilters.propertyType &&
                    searchFilters.propertyType !== "all"
                ) {
                    params.property_types = searchFilters.propertyType;
                }

                // Price Range filter
                if (
                    searchFilters.priceRange &&
                    searchFilters.priceRange !== "any"
                ) {
                    const rangeParts = searchFilters.priceRange.split("-");
                    if (rangeParts.length === 2) {
                        const minStr = rangeParts[0].trim();
                        const maxStr = rangeParts[1].trim();

                        // Convert to numeric values
                        let minValue = 0;
                        let maxValue = 0;

                        if (minStr.endsWith("k")) {
                            minValue =
                                parseFloat(minStr.replace("k", "")) * 1000;
                        } else if (minStr.endsWith("m")) {
                            minValue =
                                parseFloat(minStr.replace("m", "")) * 1000000;
                        } else {
                            minValue = parseFloat(minStr) || 0;
                        }

                        if (maxStr.endsWith("k")) {
                            maxValue =
                                parseFloat(maxStr.replace("k", "")) * 1000;
                        } else if (maxStr.endsWith("m")) {
                            maxValue =
                                parseFloat(maxStr.replace("m", "")) * 1000000;
                        } else if (maxStr.endsWith("+")) {
                            // For "10m+", set min only
                            params.min_price = minValue.toString();
                            params.min_rate = minValue.toString();
                        } else {
                            maxValue = parseFloat(maxStr) || 0;
                        }

                        if (minValue > 0) {
                            params.min_price = minValue.toString();
                            params.min_rate = minValue.toString();
                        }
                        if (maxValue > 0 && !maxStr.endsWith("+")) {
                            params.max_price = maxValue.toString();
                            params.max_rate = maxValue.toString();
                        }
                    } else if (searchFilters.priceRange.endsWith("+")) {
                        // Handle "10m+" case
                        const valueStr = searchFilters.priceRange.replace(
                            "+",
                            ""
                        );
                        let minValue = 0;
                        if (valueStr.endsWith("k")) {
                            minValue =
                                parseFloat(valueStr.replace("k", "")) * 1000;
                        } else if (valueStr.endsWith("m")) {
                            minValue =
                                parseFloat(valueStr.replace("m", "")) * 1000000;
                        }
                        if (minValue > 0) {
                            params.min_price = minValue.toString();
                            params.min_rate = minValue.toString();
                        }
                    }
                }

                // Cap Rate filter
                if (searchFilters.capRate && searchFilters.capRate !== "any") {
                    const rangeParts = searchFilters.capRate.split("-");
                    if (rangeParts.length === 2) {
                        const minCap = parseFloat(rangeParts[0].trim()) || 0;
                        const maxCap = parseFloat(rangeParts[1].trim()) || 0;
                        if (minCap >= 0) {
                            params.min_cap_rate = minCap.toString();
                        }
                        if (maxCap > 0) {
                            params.max_cap_rate = maxCap.toString();
                        }
                    } else if (searchFilters.capRate.endsWith("+")) {
                        // Handle "10+" case
                        const minCap =
                            parseFloat(
                                searchFilters.capRate.replace("+", "")
                            ) || 0;
                        if (minCap >= 0) {
                            params.min_cap_rate = minCap.toString();
                        }
                    }
                }

                // Preserve existing query parameters (category, listing_type) if they exist
                if (initialFilters?.category) {
                    params.category = initialFilters.category;
                }
                if (initialFilters?.listing_type) {
                    params.listing_type = initialFilters.listing_type;
                }

                router.get(basePath, params, {
                    preserveState: false,
                    preserveScroll: false,
                    onStart: () => {
                        setIsSearching(true);
                    },
                    onFinish: () => {
                        setIsSearching(false);
                    },
                    onError: () => {
                        setIsSearching(false);
                    },
                    onCancel: () => {
                        setIsSearching(false);
                    },
                });
            }, 300); // 300ms debounce delay
        },
        [initialFilters]
    );

    const handleClearFilters = () => {
        setCurrentFilters(null);
        resetFilters();
    };

    return (
        <AppLayout title={sectionTitle} footerClassName="pt-32">
            {/* Property Search Header */}
            <PropertySearchHeader
                onSearch={handleSearch}
                onFiltersClick={() => setFiltersExpanded(!filtersExpanded)}
                onSaveSearch={() => {
                    console.log("Hello");
                }}
                onClearFilters={handleClearFilters}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                activeFiltersCount={activeFiltersCount}
                currentFilters={currentFilters}
                hasActiveFilters={hasActiveFilters}
                isSearching={isSearching}
            />

            <section className="mx-auto w-[95%] max-w-full px-4 sm:px-6 lg:px-2 py-10">
                {/* Results Header */}
                <PropertyResultsHeader
                    title={sectionTitle}
                    resultsCount={filteredListings.length}
                    properties={properties}
                    section={currentSection}
                    onSortChange={setSortedProperties}
                />

                {/* All Filters Modal */}
                <AllFiltersModal
                    isOpen={filtersExpanded}
                    onClose={() => setFiltersExpanded(false)}
                    activeFiltersCount={activeFiltersCount}
                    listingsCount={filteredListings.length}
                    onApply={(filters: FilterValues) => {
                        // Store current filters for save search functionality
                        setCurrentFilters(filters);
                        // Apply filters using custom hook
                        applyFilters(filters);
                    }}
                    onReset={() => {
                        setCurrentFilters(null);
                        resetFilters();
                    }}
                />

                {/* Property Listings View */}
                {viewMode === "map" ? (
                    <PropertyMapViewLayout
                        properties={filteredListings}
                        selectedPropertyId={selectedPropertyId}
                        mapPropertyToCardProps={mapPropertyToCardProps}
                        onMarkerClick={(property) => {
                            setSelectedPropertyId(property.id);
                            // Scroll to the property card in the list
                            const element = document.getElementById(
                                `property-${property.id}`
                            );
                            element?.scrollIntoView({
                                behavior: "smooth",
                                block: "center",
                            });
                        }}
                    />
                ) : (
                    <PropertyGridView
                        properties={filteredListings}
                        mapPropertyToCardProps={mapPropertyToCardProps}
                    />
                )}
            </section>
            <ScrollToTop />
        </AppLayout>
    );
}
