import { useState } from "react";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import PropertyCard, { PropertyCardProps } from "../PropertyCard";
import SliderWithControls from "../SliderWithControls";
import { useSliderControls } from "../useSliderControls";

export default function PropertiesSlider() {
    const { sliderRef, handlePrev, handleNext } = useSliderControls();
    const [sortBy, setSortBy] = useState("recommended");
    const [lastSale, setLastSale] = useState("all");

    // Static property data matching the screenshot
    const properties: PropertyCardProps[] = [
        {
            title: "1050 E Broadway Ave",
            category: "Multifamily",
            isFeatured: false,
            asking_price: "12,800,000",
            description: "The Palm MHC - Mobile home park with numerous units",
            beds: 0,
            baths: 0,
            area: "89 Units • Built 1962",
            agentName: "Agent Name",
            photosCount: 15,
            image: "/assets/images/placeholder.png",
            location: "Apache Junction, AZ 85119",
            href: "/properties/1/property-slug",
        },
        {
            title: "1925 Atlanta Hwy",
            category: "Industrial",
            isFeatured: false,
            asking_price: "14,200,000",
            description: "Forsyth Business Center - Modern industrial building",
            beds: 0,
            baths: 0,
            area: "90,869 SF • 100% Occupancy",
            agentName: "Agent Name",
            photosCount: 20,
            image: "/assets/images/placeholder.png",
            location: "Cumming, GA 30040",
            href: "/properties/2/property-slug",
        },
        {
            title: "1021 W McDermott Dr",
            category: "Retail",
            isFeatured: false,
            asking_price: "Undisclosed",
            description: "Allen Veterinary Centre - Retail space",
            beds: 0,
            baths: 0,
            area: "4,424 SF • 100% Occupancy",
            agentName: "Agent Name",
            photosCount: 12,
            image: "/assets/images/placeholder.png",
            location: "Allen, TX 75013",
            href: "/properties/3/property-slug",
        },
        {
            title: "208 Chadwick Ave",
            category: "Retail",
            isFeatured: false,
            asking_price: "Undisclosed",
            description: "Commercial building with parking",
            beds: 0,
            baths: 0,
            area: "3,400 SF • 100% Occupancy",
            agentName: "Agent Name",
            photosCount: 10,
            image: "/assets/images/placeholder.png",
            location: "Hendersonville, NC 28792",
            href: "/properties/4/property-slug",
        },
        {
            title: "2240 E County Road 540A",
            category: "Retail",
            isFeatured: false,
            asking_price: "Undisclosed",
            description: "Modern commercial building",
            beds: 0,
            baths: 0,
            area: "3,613 SF • 100% Occupancy",
            agentName: "Agent Name",
            photosCount: 14,
            image: "/assets/images/placeholder.png",
            location: "Lakeland, FL 33813",
            href: "/properties/5/property-slug",
        },
    ];

    const sliderSettings = {
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: false,
        responsive: [
            {
                breakpoint: 1920,
                settings: { slidesToShow: 5, slidesToScroll: 1 },
            },
            {
                breakpoint: 1536,
                settings: { slidesToShow: 4, slidesToScroll: 1 },
            },
            {
                breakpoint: 1280,
                settings: { slidesToShow: 3, slidesToScroll: 1 },
            },
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2, slidesToScroll: 1 },
            },
            {
                breakpoint: 640,
                settings: { slidesToShow: 1, slidesToScroll: 1 },
            },
        ],
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Properties
                    </h3>
                    <span className="text-sm text-gray-600">
                        12,478 Properties
                    </span>
                    <button className="text-blue-500 hover:text-blue-600">
                        <Info className="h-4 w-4" />
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <div>
                        <label className="sr-only">Sort by</label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="recommended">Sort by</option>
                            <option value="newest">Newest</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="price-low">Price: Low to High</option>
                        </select>
                    </div>
                    <div>
                        <label className="sr-only">Last Sale</label>
                        <select
                            value={lastSale}
                            onChange={(e) => setLastSale(e.target.value)}
                            className="px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">Last Sale</option>
                            <option value="24h">Last 24 Hours</option>
                            <option value="7d">Last 7 Days</option>
                            <option value="30d">Last 30 Days</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Slider Container */}
            <div className="relative">
                {/* Left Arrow */}
                <button
                    onClick={handlePrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
                    aria-label="Previous properties"
                >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>

                {/* Slider */}
                <SliderWithControls
                    sliderRef={sliderRef}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    settings={sliderSettings}
                    hideControls={true}
                    className="properties-slider"
                >
                    {properties.map((property, index) => (
                        <div key={index} className="px-2">
                            <PropertyCard {...property} />
                        </div>
                    ))}
                </SliderWithControls>

                {/* Right Arrow */}
                <button
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
                    aria-label="Next properties"
                >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
            </div>
        </div>
    );
}

