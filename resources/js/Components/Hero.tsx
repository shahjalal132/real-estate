import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface HeroContent {
    title: string;
    searchPlaceholder: string;
    backgroundImage: string;
}

interface HeroProps {
    content?: HeroContent;
}

export default function Hero({ content }: HeroProps) {
    const defaultContent: HeroContent = {
        title: "Your Next Deal Starts Here.",
        searchPlaceholder: "Enter Location, Broker/Agent, or Description",
        backgroundImage:
            "https://images.pexels.com/photos/772472/pexels-photo-772472.jpeg",
    };

    const heroContent = content || defaultContent;

    const [activeTab, setActiveTab] = useState("Sale");
    const [propertyTypeOpen, setPropertyTypeOpen] = useState(false);
    const [selectedPropertyType, setSelectedPropertyType] =
        useState("All Types");

    const propertyTypes = [
        "All Types",
        "Retail",
        "Office",
        "Industrial",
        "Multifamily",
        "Land",
        "Hospitality",
        "Mixed Use",
    ];

    const tabs = ["Sale", "Lease", "Auctions", "Comps & Records"];

    return (
        <section className="relative flex min-h-[500px] w-full items-center justify-center overflow-hidden sm:min-h-[600px] lg:min-h-[650px]">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('${heroContent.backgroundImage}')`,
                }}
            />

            {/* Gradient Overlay - Blue and black mixed effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0066CC]/40 via-[#003366]/50 to-black/60" />

            {/* Content */}
            <div className="relative z-10 mx-auto w-[95%] max-w-6xl px-4 text-center sm:px-6">
                {/* Headline */}
                <h1 className="mb-8 text-4xl font-bold text-white sm:text-5xl lg:text-6xl drop-shadow-lg">
                    {heroContent.title}
                </h1>

                {/* Tabs */}
                <div className="mb-6 flex items-center justify-center gap-8 pb-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(tab)}
                            className={`pb-2 text-base font-medium transition-colors ${
                                activeTab === tab
                                    ? "border-b-2 border-white text-white"
                                    : "text-white/80 hover:text-white"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Search Bar */}
                <div className="mx-auto w-full max-w-4xl">
                    <div className="flex items-center gap-0 rounded-lg bg-white shadow-lg">
                        {/* Property Type Dropdown */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() =>
                                    setPropertyTypeOpen(!propertyTypeOpen)
                                }
                                className="flex items-center gap-2 border-r border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <span>{selectedPropertyType}</span>
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform ${
                                        propertyTypeOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                            {propertyTypeOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() =>
                                            setPropertyTypeOpen(false)
                                        }
                                    />
                                    <div className="absolute left-0 z-20 mt-1 w-48 rounded-md border border-gray-200 bg-white shadow-lg">
                                        <div className="py-1">
                                            {propertyTypes.map((type) => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                                    onClick={() => {
                                                        setSelectedPropertyType(
                                                            type
                                                        );
                                                        setPropertyTypeOpen(
                                                            false
                                                        );
                                                    }}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Search Input */}
                        <input
                            type="text"
                            placeholder={heroContent.searchPlaceholder}
                            className="flex-1 border-0 bg-transparent px-4 py-3 text-base text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-0"
                            aria-label="Search location, broker, or description"
                        />

                        {/* Search Button */}
                        <button
                            type="button"
                            className="rounded-r-lg bg-[#0066CC] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0052A3] focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:ring-offset-2"
                            aria-label="Search"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
