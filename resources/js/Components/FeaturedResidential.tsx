import { useState } from "react";
import { router } from "@inertiajs/react";
import SectionHeading from "./SectionHeading";
import SliderWithControls from "./SliderWithControls";
import SliderControls from "./SliderControls";
import AllFiltersButton from "./AllFiltersButton";
import AllFiltersModal, { FilterValues } from "./AllFiltersModal";
import Button from "./Button";
import { useSliderControls } from "./useSliderControls";
import { Property } from "../types";
import PropertyCard, { PropertyCardProps } from "./PropertyCard";

interface FeaturedResidentialProps {
    properties?: Property[];
}

// Helper function to map Property to PropertyCardProps
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

export default function FeaturedResidential({
    properties = [],
}: FeaturedResidentialProps) {
    const { sliderRef, handlePrev, handleNext } = useSliderControls();
    const [filtersExpanded, setFiltersExpanded] = useState(false);
    const residentialProperties = Array.isArray(properties) ? properties : [];

    // Show all properties in the slider (filtering will be done on the properties page)
    const filteredListings = residentialProperties;

    const viewMoreHref = `/properties/residential`;

    // Handle filter apply - navigate to properties page with filters
    const handleApplyFilters = (filters: FilterValues) => {
        // Build query parameters from filter values
        const params: Record<string, any> = {
            section: "residential",
        };

        // Add location
        if (filters.location) {
            params.location = filters.location;
        }

        // Add keywords
        if (filters.keywords) {
            params.keywords = filters.keywords;
        }

        // Add property types
        if (filters.propertyTypes && filters.propertyTypes.length > 0) {
            if (!filters.propertyTypes.includes("All")) {
                params.property_types = filters.propertyTypes.join(",");
            }
        }

        // Add rate range
        if (filters.minRate && filters.minRate !== "$0") {
            const minRateValue = filters.minRate.replace(/[$,]/g, "");
            if (filters.rateType === "yearly") {
                params.min_yearly_rate = minRateValue;
            } else {
                params.min_monthly_rate = minRateValue;
            }
        }
        if (filters.maxRate && !filters.maxRate.includes("+")) {
            const maxRateValue = filters.maxRate.replace(/[$,+]/g, "");
            if (filters.rateType === "yearly") {
                params.max_yearly_rate = maxRateValue;
            } else {
                params.max_monthly_rate = maxRateValue;
            }
        }

        // Add size range
        if (filters.minSize && filters.minSize !== "0") {
            if (filters.sizeType === "sqft") {
                params.min_sqft = filters.minSize.replace(/[,+]/g, "");
            } else {
                params.min_acres = filters.minSize.replace(/[,+]/g, "");
            }
        }
        if (filters.maxSize && !filters.maxSize.includes("+")) {
            if (filters.sizeType === "sqft") {
                params.max_sqft = filters.maxSize.replace(/[,+]/g, "");
            } else {
                params.max_acres = filters.maxSize.replace(/[,+]/g, "");
            }
        }

        // Add broker/agent
        if (filters.brokerAgent) {
            params.broker_agent = filters.brokerAgent;
        }

        // Add brokerage shop
        if (filters.brokerageShop) {
            params.brokerage_shop = filters.brokerageShop;
        }

        // Add tenancy
        if (filters.tenancy) {
            params.tenancy = filters.tenancy;
        }

        // Add property class
        if (filters.propertyClass && filters.propertyClass.length > 0) {
            params.property_class = filters.propertyClass.join(",");
        }

        // Add listing timeline
        if (
            filters.timelineType === "timePeriod" &&
            filters.timePeriod !== "Any"
        ) {
            params.time_period = filters.timePeriod;
        } else if (filters.timelineType === "custom") {
            if (filters.fromDate) params.from_date = filters.fromDate;
            if (filters.toDate) params.to_date = filters.toDate;
        }

        // Navigate to properties page with filters
        router.get("/properties", params, {
            preserveState: false,
        });
    };

    // Show section only if we have properties
    if (!residentialProperties || residentialProperties.length === 0) {
        return null;
    }

    return (
        <section className="w-full overflow-hidden py-6 sm:py-8">
            <div className="mx-auto w-[95%] max-w-full px-2 sm:px-4 md:px-6 lg:px-2 mb-4!">
                <header className="mb-4 sm:mb-2 flex flex-col gap-4 sm:gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1 text-center sm:text-left">
                        <SectionHeading>Featured Residential</SectionHeading>
                    </div>

                    <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-end">
                        <div className="flex items-center gap-3">
                            <SliderControls
                                onPrev={handlePrev}
                                onNext={handleNext}
                                prevButtonLabel="Previous properties"
                                nextButtonLabel="Next properties"
                            />
                            <AllFiltersButton
                                onClick={() => setFiltersExpanded(true)}
                                activeFiltersCount={0}
                                className="whitespace-nowrap"
                            />
                        </div>
                    </div>
                </header>
            </div>

            <div className="w-full overflow-hidden -mx-2 sm:-mx-4 md:-mx-6 lg:w-[95%] lg:mx-auto">
                <SliderWithControls
                    sliderRef={sliderRef}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    prevButtonLabel="Previous properties"
                    nextButtonLabel="Next properties"
                    className="ml-5 md:ml-0"
                    hideControls={true}
                >
                    {filteredListings.map((property) => (
                        <div
                            key={property.id}
                            className="px-1 sm:px-2 md:px-3 pb-4 lg:px-3 h-full"
                        >
                            <PropertyCard
                                {...mapPropertyToCardProps(property)}
                            />
                        </div>
                    ))}
                </SliderWithControls>
            </div>

            <div className="mx-auto w-[95%] max-w-full px-2 sm:px-4 md:px-6 lg:px-2">
                <div className="mt-4 sm:mt-6 flex justify-center">
                    <Button
                        href={viewMoreHref}
                        className="px-5 sm:px-6 py-2 text-xs font-semibold uppercase tracking-[0.15em]"
                    >
                        View More
                    </Button>
                </div>
            </div>

            {/* All Filters Modal */}
            <AllFiltersModal
                isOpen={filtersExpanded}
                onClose={() => setFiltersExpanded(false)}
                activeFiltersCount={0}
                listingsCount={filteredListings.length}
                onApply={handleApplyFilters}
                onReset={() => {
                    // Reset handled by modal internally
                }}
            />
        </section>
    );
}
