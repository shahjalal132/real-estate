import { useMemo, useState, useEffect } from "react";
import { usePage, router } from "@inertiajs/react";
import AppLayout from "../Layouts/AppLayout";
import SectionHeading from "../../Components/SectionHeading";
import PropertyCard, { PropertyCardProps } from "../../Components/PropertyCard";
import PropertySearchHeader, {
    SearchFilters,
} from "../../Components/PropertySearchHeader";
import AllFiltersModal, {
    FilterValues,
} from "../../Components/AllFiltersModal";
import PropertySort from "../../Components/PropertySort";
import MapView from "../../Components/MapView";
import ScrollToTop from "../../Components/ScrollToTop";
import { Property } from "../../types";

interface PageProps {
    properties?: Property[];
    filter: string;
    section: string | null;
    filters?: Record<string, any>;
    [key: string]: unknown;
}

function mapPropertyToCardProps(property: Property): PropertyCardProps {
    const summaryDetails = property.details?.summary_details || {};
    const beds =
        summaryDetails["Bedrooms"] ||
        summaryDetails["Beds"] ||
        summaryDetails["Number of Bedrooms"] ||
        0;
    const baths =
        summaryDetails["Bathrooms"] ||
        summaryDetails["Baths"] ||
        summaryDetails["Number of Bathrooms"] ||
        0;
    const areaSqft =
        summaryDetails["Square Feet"] ||
        summaryDetails["Sqft"] ||
        summaryDetails["Square Footage"] ||
        null;
    const areaAcres = property.details?.lot_size_acres;

    let area: string | undefined;
    if (areaSqft) {
        area =
            typeof areaSqft === "number"
                ? `${areaSqft.toLocaleString()} Sqft`
                : `${areaSqft} Sqft`;
    } else if (areaAcres) {
        area = `${areaAcres} Acres`;
    }

    const locationString = property.location
        ? `${property.location.city}, ${property.location.state_code}`
        : "Location not available";

    const agentName =
        property.brokers && property.brokers.length > 0
            ? property.brokers[0].full_name
            : "No Agent";

    // Format price for display
    const formatPrice = (price: number | string | null | undefined): string => {
        if (!price && price !== 0) return "Undisclosed";

        let numValue: number;
        if (typeof price === "string") {
            // Remove $ and commas, then parse
            const cleaned = price.replace(/[$,\s]/g, "");
            numValue = parseFloat(cleaned);
        } else {
            numValue = price;
        }

        if (isNaN(numValue)) return "Undisclosed";

        // Format with commas, no decimals for large numbers
        return numValue.toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
    };

    // Get formatted price - remove $ if present since PropertyCard will add it
    let formattedPrice: string;
    if (property.formatted_price) {
        formattedPrice = property.formatted_price.replace(/^\$\s*/, "").trim();
    } else if (property.asking_price) {
        formattedPrice = formatPrice(property.asking_price);
    } else {
        formattedPrice = "Undisclosed";
    }

    return {
        title: property.name,
        category:
            property.types && property.types.length > 0
                ? property.types[0]
                : "Property",
        isFeatured: property.is_in_opportunity_zone || false,
        asking_price: formattedPrice,
        priceUnit: "/Sqft",
        description:
            property.marketing_description ||
            property.description ||
            "No description available",
        beds: typeof beds === "number" ? beds : parseInt(beds) || 0,
        baths:
            typeof baths === "number"
                ? baths
                : parseFloat(baths.toString()) || 0,
        area: area,
        agentName: agentName,
        photosCount: property.number_of_images || 0,
        image:
            property.thumbnail_url ||
            "https://via.placeholder.com/400x300?text=No+Image",
        location: locationString,
        href: `/properties/${property.id}/${property.url_slug}`,
    };
}

function applyFilter(items: Property[], filter: string): Property[] {
    if (!filter || filter === "all") return items;

    return items.filter((_, index) => {
        if (filter === "option1") return index % 3 === 0;
        if (filter === "option2") return index % 3 === 1;
        if (filter === "option3") return index % 3 === 2;
        return true;
    });
}

export default function Properties() {
    const { props, url } = usePage<PageProps>();
    const {
        properties = [],
        filter,
        section,
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

    const sectionTitle = currentSection
        ? currentSection.charAt(0).toUpperCase() +
          currentSection.slice(1) +
          " Properties"
        : "All Properties";

    // Calculate active filters count and check if any filters are active
    const activeFiltersData = useMemo(() => {
        let count = 0;
        let hasActive = false;

        if (filter && filter !== "all") {
            count++;
            hasActive = true;
        }
        if (currentSection) {
            count++;
            hasActive = true;
        }

        // Check current filters or initial filters
        if (currentFilters) {
            // Check currentFilters (FilterValues type)
            if (currentFilters.location && currentFilters.location.length > 0) {
                count++;
                hasActive = true;
            }
            if (currentFilters.keywords) {
                count++;
                hasActive = true;
            }
            if (
                currentFilters.propertyTypes &&
                currentFilters.propertyTypes.length > 0 &&
                !currentFilters.propertyTypes.includes("All")
            ) {
                count++;
                hasActive = true;
            }
            if (currentFilters.minPrice || currentFilters.maxPrice) {
                count++;
                hasActive = true;
            }
            if (currentFilters.brokerAgent || currentFilters.brokerageShop) {
                count++;
                hasActive = true;
            }
        } else {
            // Check initialFilters (from URL params)
            if (initialFilters.location) {
                count++;
                hasActive = true;
            }
            if (initialFilters.keywords) {
                count++;
                hasActive = true;
            }
            if (
                initialFilters.property_types &&
                Array.isArray(initialFilters.property_types) &&
                initialFilters.property_types.length > 0 &&
                !initialFilters.property_types.includes("All")
            ) {
                count++;
                hasActive = true;
            }
            if (initialFilters.min_rate || initialFilters.max_rate) {
                count++;
                hasActive = true;
            }
            if (initialFilters.broker_agent || initialFilters.brokerage_shop) {
                count++;
                hasActive = true;
            }
        }

        return { activeFiltersCount: count, hasActiveFilters: hasActive };
    }, [filter, currentSection, initialFilters, currentFilters]);

    const activeFiltersCount = activeFiltersData.activeFiltersCount;
    const hasActiveFilters = activeFiltersData.hasActiveFilters;

    const handleSearch = (searchFilters: SearchFilters) => {
        const params: Record<string, any> = {};

        // Map status to route path
        let basePath = "/properties";
        if (searchFilters.status === "auctions") {
            basePath = "/properties/auctions";
        } else if (searchFilters.status === "commercial") {
            basePath = "/properties/commercial";
        } else if (
            searchFilters.status === "residential" ||
            searchFilters.status === "for-sale"
        ) {
            basePath = "/properties/residentials";
        } else if (searchFilters.status === "for-lease") {
            basePath = "/properties/rental";
        }

        // Property Type filter
        if (
            searchFilters.propertyType &&
            searchFilters.propertyType !== "all"
        ) {
            params.property_types = searchFilters.propertyType;
            // Also set 'type' for backward compatibility
            params.type = searchFilters.propertyType;
        }

        // Price Range filter
        if (searchFilters.priceRange && searchFilters.priceRange !== "any") {
            const rangeParts = searchFilters.priceRange.split("-");
            if (rangeParts.length === 2) {
                const minStr = rangeParts[0].trim();
                const maxStr = rangeParts[1].trim();

                // Convert to numeric values
                let minValue = 0;
                let maxValue = 0;

                if (minStr.endsWith("k")) {
                    minValue = parseFloat(minStr.replace("k", "")) * 1000;
                } else if (minStr.endsWith("m")) {
                    minValue = parseFloat(minStr.replace("m", "")) * 1000000;
                } else {
                    minValue = parseFloat(minStr) || 0;
                }

                if (maxStr.endsWith("k")) {
                    maxValue = parseFloat(maxStr.replace("k", "")) * 1000;
                } else if (maxStr.endsWith("m")) {
                    maxValue = parseFloat(maxStr.replace("m", "")) * 1000000;
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
                const valueStr = searchFilters.priceRange.replace("+", "");
                let minValue = 0;
                if (valueStr.endsWith("k")) {
                    minValue = parseFloat(valueStr.replace("k", "")) * 1000;
                } else if (valueStr.endsWith("m")) {
                    minValue = parseFloat(valueStr.replace("m", "")) * 1000000;
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
                    parseFloat(searchFilters.capRate.replace("+", "")) || 0;
                if (minCap >= 0) {
                    params.min_cap_rate = minCap.toString();
                }
            }
        }

        router.get(basePath, params, {
            preserveState: false,
            preserveScroll: false,
        });
    };

    const handleClearFilters = () => {
        router.get(
            "/properties",
            {},
            {
                preserveState: false,
            }
        );
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
            />

            <section className="mx-auto w-[95%] max-w-full px-4 sm:px-6 lg:px-2 py-10">
                {/* Results Header */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                        <SectionHeading>{sectionTitle}</SectionHeading>
                    </div>

                    {/* Tabs and Results Count */}
                    <div className="flex items-center gap-6">
                        {/* Results Count */}
                        <div className="text-sm text-gray-600">
                            <strong>Results: </strong>
                            <span className="font-semibold">
                                {filteredListings.length}
                            </span>{" "}
                            results
                        </div>

                        {/* Sort Dropdown */}
                        <PropertySort
                            properties={properties}
                            section={currentSection}
                            onSortChange={setSortedProperties}
                        />
                    </div>
                </div>

                {/* All Filters Modal */}
                <AllFiltersModal
                    isOpen={filtersExpanded}
                    onClose={() => setFiltersExpanded(false)}
                    activeFiltersCount={activeFiltersCount}
                    listingsCount={filteredListings.length}
                    onApply={(filters: FilterValues) => {
                        // Store current filters for save search functionality
                        setCurrentFilters(filters);

                        // Build query parameters from filter values
                        const params: Record<string, any> = {};

                        // Location and Keywords
                        if (filters.location && filters.location.length > 0) {
                            params.location = filters.location.join(",");
                        }
                        if (filters.keywords)
                            params.keywords = filters.keywords;

                        // Property Types
                        if (
                            filters.propertyTypes &&
                            filters.propertyTypes.length > 0 &&
                            !filters.propertyTypes.includes("All")
                        ) {
                            params.property_types =
                                filters.propertyTypes.join(",");
                        }

                        // Price filters (minPrice, maxPrice)
                        if (
                            filters.minPrice &&
                            filters.minPrice !== "$0" &&
                            filters.minPrice !== "0"
                        ) {
                            params.min_price = filters.minPrice;
                            params.min_rate = filters.minPrice; // Also set min_rate for backward compatibility
                        }
                        if (
                            filters.maxPrice &&
                            !filters.maxPrice.endsWith("+")
                        ) {
                            params.max_price = filters.maxPrice;
                            params.max_rate = filters.maxPrice; // Also set max_rate for backward compatibility
                        }
                        if (filters.excludeUnpriced) {
                            params.exclude_unpriced = "1";
                            params.exclude_undisclosed_rate = "1"; // Also set for backward compatibility
                        }

                        // Cap Rate filters
                        if (filters.minCapRate && filters.minCapRate !== "0") {
                            params.min_cap_rate = filters.minCapRate;
                        }
                        if (
                            filters.maxCapRate &&
                            !filters.maxCapRate.endsWith("+")
                        ) {
                            params.max_cap_rate = filters.maxCapRate;
                        }

                        // Tenant Brand filter
                        if (filters.tenantBrand) {
                            params.tenant_brand = filters.tenantBrand;
                        }

                        // Remaining Term filter (array format)
                        if (
                            filters.remainingTerm &&
                            Array.isArray(filters.remainingTerm)
                        ) {
                            params.remaining_term = filters.remainingTerm;
                        }

                        // Broker filters
                        if (filters.brokerAgent) {
                            params.broker_agent = filters.brokerAgent;
                        }
                        if (filters.brokerageShop) {
                            params.brokerage_shop = filters.brokerageShop;
                        }

                        // Tenancy filter
                        if (filters.tenancy) {
                            params.tenancy = filters.tenancy;
                        }

                        // Lease Type filter
                        if (filters.leaseType) {
                            params.lease_type = filters.leaseType;
                        }

                        // Unit Measurements filter
                        if (filters.measurementType) {
                            params.measurement_type = filters.measurementType;
                        }
                        if (filters.minUnits && filters.minUnits !== "0") {
                            params.min_units = filters.minUnits;
                        }
                        if (
                            filters.maxUnits &&
                            !filters.maxUnits.endsWith("+")
                        ) {
                            params.max_units = filters.maxUnits;
                        }

                        // Property Details filters
                        if (filters.minSqft && filters.minSqft !== "0") {
                            params.min_sqft = filters.minSqft;
                        }
                        if (filters.maxSqft && !filters.maxSqft.endsWith("+")) {
                            params.max_sqft = filters.maxSqft;
                        }
                        if (
                            filters.minPricePerSqft &&
                            filters.minPricePerSqft !== "0"
                        ) {
                            params.min_price_per_sqft = filters.minPricePerSqft;
                        }
                        if (
                            filters.maxPricePerSqft &&
                            !filters.maxPricePerSqft.endsWith("+")
                        ) {
                            params.max_price_per_sqft = filters.maxPricePerSqft;
                        }
                        if (filters.minAcres && filters.minAcres !== "0") {
                            params.min_acres = filters.minAcres;
                        }
                        if (
                            filters.maxAcres &&
                            !filters.maxAcres.endsWith("+")
                        ) {
                            params.max_acres = filters.maxAcres;
                        }

                        // Tenant Credit filter
                        if (filters.tenantCredit) {
                            params.tenant_credit = filters.tenantCredit;
                        }

                        // Occupancy filter
                        if (
                            filters.minOccupancy &&
                            filters.minOccupancy !== "0"
                        ) {
                            params.min_occupancy = filters.minOccupancy;
                        }
                        if (
                            filters.maxOccupancy &&
                            !filters.maxOccupancy.endsWith("+")
                        ) {
                            params.max_occupancy = filters.maxOccupancy;
                        }

                        // Timeline filters
                        if (filters.timelineType) {
                            params.timeline_type = filters.timelineType;
                        }
                        if (filters.fromDate) {
                            params.from_date = filters.fromDate;
                        }
                        if (filters.toDate) {
                            params.to_date = filters.toDate;
                        }
                        if (
                            filters.timePeriod &&
                            filters.timePeriod !== "Any"
                        ) {
                            params.time_period = filters.timePeriod;
                        }

                        // Listing Status filter
                        if (
                            filters.listingStatus &&
                            filters.listingStatus.length > 0
                        ) {
                            params.listing_status =
                                filters.listingStatus.join(",");
                        }

                        // Opportunity Zone filter
                        if (filters.opportunityZone) {
                            params.opportunity_zone = "1";
                        }

                        // Property class filter
                        if (
                            filters.propertyClass &&
                            filters.propertyClass.length > 0
                        ) {
                            params.property_class =
                                filters.propertyClass.join(",");
                        }

                        // Other Options filters (if controller supports them)
                        if (filters.brokerAgentCoOp) {
                            params.broker_agent_co_op = "1";
                        }
                        if (filters.ownerUser) {
                            params.owner_user = "1";
                        }

                        // Always use /properties as base path and preserve query parameters
                        let basePath = "/properties";

                        // Preserve existing query parameters (type, category, listing_type, status)
                        if (initialFilters?.type) {
                            params.type = initialFilters.type;
                        }
                        if (initialFilters?.category) {
                            params.category = initialFilters.category;
                        }
                        if (initialFilters?.listing_type) {
                            params.listing_type = initialFilters.listing_type;
                        }
                        if (initialFilters?.status) {
                            params.status = initialFilters.status;
                        }

                        // Backward compatibility: check URL path for old routes
                        if (url.includes("/properties/auctions")) {
                            basePath = "/properties/auctions";
                        } else if (url.includes("/properties/residential")) {
                            basePath = "/properties/residential";
                        } else if (url.includes("/properties/commercial")) {
                            basePath = "/properties/commercial";
                        } else if (url.includes("/properties/rental")) {
                            basePath = "/properties/rental";
                        }

                        router.get(basePath, params, {
                            preserveState: false,
                            preserveScroll: false,
                        });
                    }}
                    onReset={() => {
                        // Always use /properties as base path
                        let basePath = "/properties";
                        const params: Record<string, any> = {};

                        // Preserve existing query parameters (type, category, listing_type, status)
                        if (initialFilters?.type) {
                            params.type = initialFilters.type;
                        }
                        if (initialFilters?.category) {
                            params.category = initialFilters.category;
                        }
                        if (initialFilters?.listing_type) {
                            params.listing_type = initialFilters.listing_type;
                        }
                        if (initialFilters?.status) {
                            params.status = initialFilters.status;
                        }

                        // Backward compatibility: check URL path for old routes
                        if (url.includes("/properties/auctions")) {
                            basePath = "/properties/auctions";
                        } else if (url.includes("/properties/residential")) {
                            basePath = "/properties/residential";
                        } else if (url.includes("/properties/commercial")) {
                            basePath = "/properties/commercial";
                        } else if (url.includes("/properties/rental")) {
                            basePath = "/properties/rental";
                        }

                        router.get(
                            basePath,
                            Object.keys(params).length > 0 ? params : {},
                            {
                                preserveState: false,
                            }
                        );
                    }}
                />

                {/* Split View: Listings + Map */}
                {viewMode === "map" ? (
                    <div className="my-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Side: Listings */}
                        <div className="space-y-4 lg:space-y-6 order-2 lg:order-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Properties List
                            </h3>
                            {filteredListings.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 max-h-[600px] lg:max-h-[800px] overflow-y-auto pr-2">
                                    {filteredListings.map((property) => (
                                        <div
                                            key={property.id}
                                            id={`property-${property.id}`}
                                            className={
                                                selectedPropertyId ===
                                                property.id
                                                    ? "ring-2 ring-blue-500 rounded-lg p-1 transition-all"
                                                    : ""
                                            }
                                        >
                                            <PropertyCard
                                                {...mapPropertyToCardProps(
                                                    property
                                                )}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 text-lg">
                                        No properties found matching your
                                        criteria.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Right Side: Map */}
                        <div className="space-y-4 order-1 lg:order-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Map View
                            </h3>
                            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200 h-[400px] sm:h-[500px] lg:h-[800px]">
                                <MapView
                                    properties={filteredListings}
                                    selectedPropertyId={selectedPropertyId}
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
                            </div>
                        </div>
                    </div>
                ) : /* Grid View Only */
                filteredListings.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {filteredListings.map((property) => (
                            <PropertyCard
                                key={property.id}
                                {...mapPropertyToCardProps(property)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            No properties found matching your criteria.
                        </p>
                    </div>
                )}
            </section>
            <ScrollToTop />
        </AppLayout>
    );
}
