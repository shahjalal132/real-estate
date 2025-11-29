import PropertyCard from "../../Components/PropertyCard";
import SectionHeading from "./SectionHeading";
import SliderWithControls from "./SliderWithControls";
import SliderControls from "./SliderControls";
import { useSliderControls } from "./useSliderControls";
import { Property } from "../../types";

interface FeaturedResidentialProps {
    properties?: Property[];
}

export default function FeaturedResidential({
    properties = [],
}: FeaturedResidentialProps) {
    const { sliderRef, handlePrev, handleNext } = useSliderControls();

    if (properties.length === 0) {
        return null;
    }

    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-8">
            <header className="mb-2 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1 text-center sm:text-left">
                    <SectionHeading>Featured Residential</SectionHeading>
                </div>

                <SliderControls
                    onPrev={handlePrev}
                    onNext={handleNext}
                    prevButtonLabel="Previous properties"
                    nextButtonLabel="Next properties"
                />
            </header>

            <SliderWithControls
                sliderRef={sliderRef}
                onPrev={handlePrev}
                onNext={handleNext}
                prevButtonLabel="Previous properties"
                nextButtonLabel="Next properties"
                hideControls={true}
            >
                {properties.map((property) => (
                    <div key={property.id} className="px-3">
                        <PropertyCard property={property} />
                    </div>
                ))}
            </SliderWithControls>
        </section>
    );
}
