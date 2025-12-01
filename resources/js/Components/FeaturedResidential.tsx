import { useState } from "react";
import SectionHeading from "./SectionHeading";
import SliderWithControls from "./SliderWithControls";
import SliderControls from "./SliderControls";
import ChoseView from "./ChoseView";
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
    const [selectedFilter, setSelectedFilter] = useState<string>("all");
    const residentialProperties = Array.isArray(properties) ? properties : [];

    // Get dynamic section heading based on filter selection
    const getSectionHeading = (filter: string): string => {
        switch (filter) {
            case "residential":
                return "Featured Residential";
            case "auctions":
                return "Featured Auctions";
            case "commercial":
                return "Featured Commercial";
            case "all":
            default:
                return "Featured Residential";
        }
    };

    // Filter by property type based on selected filter
    let typeFilteredProperties = residentialProperties;

    if (selectedFilter === "all") {
        // Show all residential properties (default)
        typeFilteredProperties = residentialProperties;
    } else if (selectedFilter === "residential") {
        // Show only residential properties (already filtered, but ensure they're residential)
        typeFilteredProperties = residentialProperties.filter((property) => {
            if (!property.types || property.types.length === 0) return false;
            return property.types.some(
                (type) =>
                    type.toLowerCase().includes("residential") ||
                    type.toLowerCase().includes("multifamily")
            );
        });
    } else if (selectedFilter === "commercial") {
        // Filter to show commercial properties from the list
        typeFilteredProperties = residentialProperties.filter((property) => {
            if (!property.types || property.types.length === 0) return false;
            const commercialTypes = [
                "Commercial",
                "Land",
                "Office",
                "Retail",
                "Industrial",
            ];
            const hasCommercialType = property.types.some((type) =>
                commercialTypes.some((commercialType) =>
                    type.toLowerCase().includes(commercialType.toLowerCase())
                )
            );
            const hasResidentialType = property.types.some((type) =>
                type.toLowerCase().includes("residential")
            );
            return hasCommercialType && !hasResidentialType;
        });
    } else if (selectedFilter === "auctions") {
        // Filter to show auction properties (On-Market status)
        typeFilteredProperties = residentialProperties.filter(
            (property) => property.status === "On-Market"
        );
    }

    // Apply index-based filtering if needed (for option1, option2, option3)
    const filteredListings = typeFilteredProperties.filter((_, index) => {
        if (selectedFilter === "option1") return index % 3 === 0;
        if (selectedFilter === "option2") return index % 3 === 1;
        if (selectedFilter === "option3") return index % 3 === 2;
        return true; // For "all", "residential", "commercial", "auctions" - show all filtered
    });

    const viewMoreHref = `/properties?section=residential&filter=${encodeURIComponent(
        selectedFilter
    )}`;

    // Show section only if we have properties
    if (!residentialProperties || residentialProperties.length === 0) {
        return null;
    }

    return (
        <section className="w-full overflow-hidden py-6 sm:py-8">
            <div className="mx-auto w-[95%] max-w-full px-2 sm:px-4 md:px-6 lg:px-2 mb-4!">
                <header className="mb-4 sm:mb-2 flex flex-col gap-4 sm:gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1 text-center sm:text-left">
                        <SectionHeading>
                            {getSectionHeading(selectedFilter)}
                        </SectionHeading>
                    </div>

                    <div className="flex flex-col items-center gap-2 sm:items-end">
                        <SliderControls
                            onPrev={handlePrev}
                            onNext={handleNext}
                            prevButtonLabel="Previous properties"
                            nextButtonLabel="Next properties"
                        />
                        <ChoseView
                            value={selectedFilter}
                            onChange={setSelectedFilter}
                        />
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
        </section>
    );
}
