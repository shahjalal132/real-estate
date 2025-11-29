import PropertyCard, { PropertyCardProps } from "./PropertyCard";
import SectionHeading from "./SectionHeading";
import SliderWithControls from "./SliderWithControls";
import SliderControls from "./SliderControls";
import { useSliderControls } from "./useSliderControls";

export default function ResidentialListings() {
    const listings: (PropertyCardProps & { id: number })[] = [
        {
            id: 1,
            title: "Marketplace Listing - Normandy",
            price: "Undisclosed",
            description: "REO: Leola 640 | 295 Unit Multifamily + Retail | Philadelphia, PA",
            location: "Philadelphia, Pennsylvania",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200",
            category: "Multifamily",
            beds: 295,
            baths: 0,
            area: "295 Units",
            agentName: "John Smith",
            photosCount: 15,
        },
        {
            id: 2,
            title: "Marketplace Listing - Normandy",
            price: "10,000,000",
            description: "REO Sale | Hillside Manor Apt Resort | 218 Units | 71% Occupied | Ph...",
            location: "Clinton, Pennsylvania",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200",
            category: "Multifamily",
            beds: 218,
            baths: 0,
            area: "218 Units",
            agentName: "Sarah Johnson",
            photosCount: 12,
        },
        {
            id: 3,
            title: "Marketplace Listing - Downtown Office",
            price: "5,500,000",
            description: "Prime downtown office space | 50,000 Sqft | Fully leased | Excellent location",
            location: "New York, New York",
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200",
            category: "Commercial",
            beds: 0,
            baths: 0,
            area: "50,000 Sqft",
            agentName: "Michael Chen",
            photosCount: 20,
        },
        {
            id: 4,
            title: "Marketplace Listing - Retail Plaza",
            price: "8,200,000",
            description: "Shopping center | 25 retail units | High traffic area | Strong tenant mix",
            location: "Los Angeles, California",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200",
            category: "Retail",
            beds: 0,
            baths: 0,
            area: "25 Units",
            agentName: "Emily Rodriguez",
            photosCount: 18,
        },
        {
            id: 5,
            title: "Marketplace Listing - Industrial Warehouse",
            price: "12,000,000",
            description: "Modern warehouse facility | 200,000 Sqft | Loading docks | Prime logistics location",
            location: "Chicago, Illinois",
            image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200",
            category: "Industrial",
            beds: 0,
            baths: 0,
            area: "200,000 Sqft",
            agentName: "David Thompson",
            photosCount: 22,
        },
        {
            id: 6,
            title: "Marketplace Listing - Mixed Use Building",
            price: "6,800,000",
            description: "Mixed-use development | Retail + Residential | Prime urban location",
            location: "Seattle, Washington",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200",
            category: "Mixed Use",
            beds: 24,
            baths: 24,
            area: "45,000 Sqft",
            agentName: "Lisa Anderson",
            photosCount: 16,
        },
    ];

    const { sliderRef, handlePrev, handleNext } = useSliderControls();

    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-8">
            <header className="mb-2 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1 text-center sm:text-left">
                    <SectionHeading>Residential Listings Properties</SectionHeading>
                </div>

                <SliderControls
                    onPrev={handlePrev}
                    onNext={handleNext}
                    prevButtonLabel="Previous listings"
                    nextButtonLabel="Next listings"
                />
            </header>

            <SliderWithControls
                sliderRef={sliderRef}
                onPrev={handlePrev}
                onNext={handleNext}
                prevButtonLabel="Previous listings"
                nextButtonLabel="Next listings"
                hideControls={true}
            >
                {listings.map((listing) => (
                    <div key={listing.id} className="px-3">
                        <PropertyCard {...listing} />
                    </div>
                ))}
            </SliderWithControls>
        </section>
    );
}

