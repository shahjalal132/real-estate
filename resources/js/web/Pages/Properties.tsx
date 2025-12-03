import { useMemo, useState } from "react";
import { usePage, router } from "@inertiajs/react";
import AppLayout from "../Layouts/AppLayout";
import SectionHeading from "../../Components/SectionHeading";
import PropertyCard, { PropertyCardProps } from "../../Components/PropertyCard";
import PropertySearchHeader, {
    SearchFilters,
} from "../../Components/PropertySearchHeader";
import FilterBar from "../../Components/FilterBar";
import MapView from "../../Components/MapView";
import ScrollToTop from "../../Components/ScrollToTop";
import { Property } from "../../types";
import { ChevronDown } from "lucide-react";

interface PageProps {
    properties?: Property[];
    filter: string;
    section: string | null;
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
    const { props } = usePage<PageProps>();
    const { properties = [], filter, section } = props;

    const [searchValue, setSearchValue] = useState("");
    const [auctionValue, setAuctionValue] = useState("all");
    const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
    const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(
        null
    );
    const [filtersExpanded, setFiltersExpanded] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);
    const [sortBy, setSortBy] = useState("recommended");

    const sortOptions = [
        "Recommended",
        "New Listings",
        "Recently Updated",
        "Sq Ft (High to Low)",
        "Sq Ft (Low to High)",
        "Rate per Sq Ft (High to Low)",
        "Rate per Sq Ft (Low to High)",
        "Spaces (Most to Least)",
        "Spaces (Least to Most)",
    ];

    const getSortValue = (label: string) => {
        return label.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "");
    };

    const getSortLabel = (value: string) => {
        const option = sortOptions.find((opt) => getSortValue(opt) === value);
        return option || value;
    };

    const filteredListings = useMemo(
        () => applyFilter(properties, filter),
        [properties, filter]
    );

    const sectionTitle = section
        ? section.charAt(0).toUpperCase() + section.slice(1) + " Properties"
        : "All Properties";

    // Calculate active filters count
    const activeFiltersCount = useMemo(() => {
        let count = 0;
        if (filter && filter !== "all") count++;
        if (section) count++;
        return count;
    }, [filter, section]);

    const handleSearch = (searchFilters: SearchFilters) => {
        const params: Record<string, string> = {};

        if (searchFilters.status !== "all") {
            params.section = searchFilters.status;
        }
        if (searchFilters.propertyType !== "all") {
            params.type = searchFilters.propertyType;
        }
        if (searchFilters.priceRange !== "any") {
            const [min, max] = searchFilters.priceRange.split("-");
            if (min)
                params.min_price = min
                    .replace("k", "000")
                    .replace("m", "000000");
            if (max)
                params.max_price = max
                    .replace("k", "000")
                    .replace("m", "000000");
        }

        router.get("/properties", params, {
            preserveState: true,
            preserveScroll: true,
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
                    // TODO: Implement save search functionality
                    console.log("Save search");
                }}
                onClearFilters={handleClearFilters}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                activeFiltersCount={activeFiltersCount}
            />

            <section className="mx-auto w-[95%] max-w-full px-4 sm:px-6 lg:px-2 py-10">
                {/* Results Header */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                        <SectionHeading>{sectionTitle}</SectionHeading>
                    </div>

                    {/* Tabs and Results Count */}
                    <div className="flex items-center gap-6">
                        {/* Tabs */}
                        <div className="flex items-center gap-1 border-b border-gray-200">
                            <button className="px-4 py-2 text-sm font-medium text-[#0066CC] border-b-2 border-[#0066CC]">
                                Results
                            </button>
                            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#0066CC]">
                                Insights
                            </button>
                        </div>

                        {/* Results Count */}
                        <div className="text-sm text-gray-600">
                            <span className="font-semibold">
                                {filteredListings.length}
                            </span>{" "}
                            results
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setSortOpen(!sortOpen)}
                                className="inline-flex items-center gap-2 rounded border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                <span>↑↓ {getSortLabel(sortBy)}</span>
                                <ChevronDown className="h-4 w-4" />
                            </button>
                            {sortOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setSortOpen(false)}
                                    />
                                    <div className="absolute right-0 z-20 mt-2 w-64 rounded-md bg-white shadow-lg border border-gray-200">
                                        <div className="py-1">
                                            {sortOptions.map((option) => {
                                                const optionValue =
                                                    getSortValue(option);
                                                return (
                                                    <button
                                                        key={option}
                                                        type="button"
                                                        className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors ${
                                                            sortBy ===
                                                            optionValue
                                                                ? "bg-gray-50 text-[#0066CC] font-medium"
                                                                : "text-gray-700"
                                                        }`}
                                                        onClick={() => {
                                                            setSortBy(
                                                                optionValue
                                                            );
                                                            setSortOpen(false);
                                                        }}
                                                    >
                                                        {option}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Expanded Filters Section (when All Filters is clicked) */}
                {filtersExpanded && (
                    <div className="mb-6">
                        <FilterBar
                            searchValue={searchValue}
                            onSearchChange={setSearchValue}
                            auctionValue={auctionValue}
                            onAuctionChange={setAuctionValue}
                            viewMode={viewMode}
                            onViewModeChange={setViewMode}
                            onFiltersClick={() => setFiltersExpanded(false)}
                            showExpandedOnly={true}
                            listingsCount={filteredListings.length}
                        />
                    </div>
                )}

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
