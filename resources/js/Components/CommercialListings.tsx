import { useState } from "react";
import PropertyCard, { PropertyCardProps } from "./PropertyCard";
import Button from "./Button";
import SectionHeading from "./SectionHeading";
import SliderWithControls from "./SliderWithControls";
import SliderControls from "./SliderControls";
import FilterDropdown from "./FilterDropdown";
import { useSliderControls } from "./useSliderControls";
import { Property } from "../types";

interface CommercialListingsProps {
    listings?: Property[];
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

    return {
        title: property.name,
        category:
            property.types && property.types.length > 0
                ? property.types[0]
                : "Property",
        isFeatured: property.is_in_opportunity_zone || false,
        price: property.formatted_price || "Undisclosed",
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

export default function CommercialListings({
    listings = [],
}: CommercialListingsProps) {
    const { sliderRef, handlePrev, handleNext } = useSliderControls();
    const [selectedFilter, setSelectedFilter] = useState<string>("all");

    const filteredListings = listings.filter((_, index) => {
        if (selectedFilter === "all") return true;
        if (selectedFilter === "option1") return index % 3 === 0;
        if (selectedFilter === "option2") return index % 3 === 1;
        if (selectedFilter === "option3") return index % 3 === 2;
        return true;
    });

    const viewMoreHref = `/properties?section=commercial&filter=${encodeURIComponent(
        selectedFilter
    )}`;

    if (listings.length === 0) {
        return null;
    }

    return (
        <section className="mx-auto w-[95%] max-w-full px-4 sm:px-6 lg:px-2 py-8">
            <header className="mb-2 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1 text-center sm:text-left">
                    <SectionHeading>
                        Commercial Listings Properties
                    </SectionHeading>
                </div>

                <div className="flex flex-col items-center gap-2 sm:items-end">
                    <SliderControls
                        onPrev={handlePrev}
                        onNext={handleNext}
                        prevButtonLabel="Previous listings"
                        nextButtonLabel="Next listings"
                    />
                    <FilterDropdown
                        value={selectedFilter}
                        onChange={setSelectedFilter}
                    />
                </div>
            </header>

            <SliderWithControls
                sliderRef={sliderRef}
                onPrev={handlePrev}
                onNext={handleNext}
                prevButtonLabel="Previous listings"
                nextButtonLabel="Next listings"
                hideControls={true}
            >
                {filteredListings.map((listing) => (
                    <div key={listing.id} className="px-3">
                        <PropertyCard {...mapPropertyToCardProps(listing)} />
                    </div>
                ))}
            </SliderWithControls>

            <div className="mt-6 flex justify-center">
                <Button
                    href={viewMoreHref}
                    className="px-6 py-2 text-xs font-semibold uppercase tracking-[0.15em]"
                >
                    View More
                </Button>
            </div>
        </section>
    );
}
