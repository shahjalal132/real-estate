import PropertyCard, { PropertyCardProps } from "./PropertyCard";
import SectionHeading from "./SectionHeading";
import SliderWithControls from "./SliderWithControls";
import SliderControls from "./SliderControls";
import { useSliderControls } from "./useSliderControls";

export default function FeaturedAuctions() {
    const auctions: (PropertyCardProps & { id: number })[] = [
        {
            id: 1,
            title: "Classic Auction - Fairfield",
            price: "1,250,000",
            description: "Institutional Seller | Fairfield Inn & Suites Greeley",
            location: "Greeley, Colorado",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200",
            category: "Hospitality",
            beds: 2,
            baths: 3,
            area: "2000 Yd²",
            agentName: "Salman Ghouri Dev",
            photosCount: 10,
        },
        {
            id: 2,
            title: "Classic Auction - Holiday",
            price: "2,900,000",
            description: "Institutional Seller | Holiday Inn Express & Suites Terrell",
            location: "Terrell, Texas",
            image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1200",
            category: "Residential",
            beds: 4,
            baths: 4,
            area: "3200 Sqft",
            agentName: "Jordan Wells",
            photosCount: 12,
        },
        {
            id: 3,
            title: "Signature Auction - Scottsdale Estate",
            price: "3,200,000",
            description: "Award-winning architecture with mountain views and resort amenities.",
            location: "Scottsdale, Arizona",
            image: "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=1200",
            category: "Luxury",
            beds: 6,
            baths: 5,
            area: "5,400 Sqft",
            agentName: "Alexandra Poe",
            photosCount: 18,
        },
        {
            id: 4,
            title: "Signature Auction - Scottsdale Estate",
            price: "3,200,000",
            description: "Award-winning architecture with mountain views and resort amenities.",
            location: "Scottsdale, Arizona",
            image: "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=1200",
            category: "Luxury",
            beds: 6,
            baths: 5,
            area: "5,400 Sqft",
            agentName: "Alexandra Poe",
            photosCount: 18,
        },
        {
            id: 5,
            title: "Signature Auction - Scottsdale Estate",
            price: "3,200,000",
            description: "Award-winning architecture with mountain views and resort amenities.",
            location: "Scottsdale, Arizona",
            image: "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=1200",
            category: "Luxury",
            beds: 6,
            baths: 5,
            area: "5,400 Sqft",
            agentName: "Alexandra Poe",
            photosCount: 18,
        },
        {
            id: 6,
            title: "Signature Auction - Scottsdale Estate",
            price: "3,200,000",
            description: "Award-winning architecture with mountain views and resort amenities.",
            location: "Scottsdale, Arizona",
            image: "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=1200",
            category: "Luxury",
            beds: 6,
            baths: 5,
            area: "5,400 Sqft",
            agentName: "Alexandra Poe",
            photosCount: 18,
        },
        {
            id: 7,
            title: "Signature Auction - Scottsdale Estate",
            price: "3,200,000",
            description: "Award-winning architecture with mountain views and resort amenities.",
            location: "Scottsdale, Arizona",
            image: "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=1200",
            category: "Luxury",
            beds: 6,
            baths: 5,
            area: "5,400 Sqft",
            agentName: "Alexandra Poe",
            photosCount: 18,
        },
        {
            id: 3,
            title: "Signature Auction - Scottsdale Estate",
            price: "3,200,000",
            description: "Award-winning architecture with mountain views and resort amenities.",
            location: "Scottsdale, Arizona",
            image: "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=1200",
            category: "Luxury",
            beds: 6,
            baths: 5,
            area: "5,400 Sqft",
            agentName: "Alexandra Poe",
            photosCount: 18,
        },
    ];

    const { sliderRef, handlePrev, handleNext } = useSliderControls();

    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-8">
            <header className="mb-2 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1 text-center sm:text-left">
                    <SectionHeading>Featured Auctions Properties</SectionHeading>
                </div>

                <SliderControls
                    onPrev={handlePrev}
                    onNext={handleNext}
                    prevButtonLabel="Previous auctions"
                    nextButtonLabel="Next auctions"
                />
            </header>

            <SliderWithControls
                sliderRef={sliderRef}
                onPrev={handlePrev}
                onNext={handleNext}
                prevButtonLabel="Previous auctions"
                nextButtonLabel="Next auctions"
                hideControls={true}
            >
                {auctions.map((auction) => (
                    <div key={auction.id} className="px-3">
                        <PropertyCard {...auction} />
                    </div>
                ))}
            </SliderWithControls>
        </section>
    );
}