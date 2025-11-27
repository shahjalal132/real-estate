import PropertyCard, { PropertyCardProps } from "./PropertyCard";

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
    ];

    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-12">
            <header className="mb-8 flex flex-col gap-3 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">
                    Featured Auctions
                </p>
                <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
                    Discover Investment Opportunities
                </h2>
                <p className="text-base text-gray-600">
                    Curated properties with exclusive access for qualified investors.
                </p>
            </header>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {auctions.map((auction) => (
                    <PropertyCard key={auction.id} {...auction} />
                ))}
            </div>
        </section>
    );
}