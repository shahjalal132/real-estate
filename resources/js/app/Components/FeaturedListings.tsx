import PropertyCard from "../../Components/PropertyCard";
import { useState } from "react";
import PropertyCard, { PropertyCardProps } from "./PropertyCard";
import Button from "./Button";
import FilterDropdown from "./FilterDropdown";
import SectionHeading from "./SectionHeading";
import SliderWithControls from "./SliderWithControls";
import SliderControls from "./SliderControls";
import { useSliderControls } from "./useSliderControls";
import { Property } from "../../types";

interface FeaturedListingsProps {
    listings?: Property[];
}

export default function FeaturedListings({
    listings = [],
}: FeaturedListingsProps) {
    const { sliderRef, handlePrev, handleNext } = useSliderControls();
    const [selectedFilter, setSelectedFilter] = useState<string>("all");

    const filteredListings = listings.filter((_, index) => {
        if (selectedFilter === "all") return true;
        if (selectedFilter === "option1") return index % 3 === 0;
        if (selectedFilter === "option2") return index % 3 === 1;
        if (selectedFilter === "option3") return index % 3 === 2;
        return true;
    });

    const viewMoreHref = `/properties?section=featured&filter=${encodeURIComponent(
        selectedFilter,
    )}`;

    if (listings.length === 0) {
        return null;
    }

    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-8">
            <header className="mb-2 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1 text-center sm:text-left">
                    <SectionHeading>Featured Listings Properties</SectionHeading>
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
                        <PropertyCard property={listing} />
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
