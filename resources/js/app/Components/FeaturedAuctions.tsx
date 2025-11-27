import { useRef } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

    const sliderRef = useRef<Slider | null>(null);

    const sliderSettings = {
        dots: false,
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1280,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 1 },
            },
        ],
    };

    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-12">
            <header className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1 text-center sm:text-left">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">
                        Auctions
                    </p>
                    <h2 className="mt-2 text-3xl font-semibold text-gray-900 sm:text-4xl">
                        Discover Investment Opportunities
                    </h2>
                    <p className="mt-2 text-base text-gray-600">
                        Curated properties with exclusive access for qualified investors.
                    </p>
                </div>

                <div className="flex items-center justify-center gap-3">
                    <button
                        type="button"
                        aria-label="Previous auctions"
                        onClick={() => sliderRef.current?.slickPrev()}
                        className="rounded-full border border-gray-200 p-3 text-gray-600 transition hover:border-blue-500 hover:text-blue-600"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        type="button"
                        aria-label="Next auctions"
                        onClick={() => sliderRef.current?.slickNext()}
                        className="rounded-full border border-gray-200 p-3 text-gray-600 transition hover:border-blue-500 hover:text-blue-600"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            </header>

            <Slider ref={sliderRef} {...sliderSettings}>
                {auctions.map((auction) => (
                    <div key={auction.id} className="px-3">
                        <PropertyCard {...auction} />
                    </div>
                ))}
            </Slider>
        </section>
    );
}