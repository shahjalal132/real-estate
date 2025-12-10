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
            "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg",
    };

    const heroContent = content || defaultContent;

    const [activeTab, setActiveTab] = useState("For Sale");
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

    const tabs = [
        "For Sale",
        "For Lease",
        "Scout",
        "Comps",
        "Dispensaries",
        "Owner",
        "Tenant",
        "Research",
        "Records",
    ];

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
            <div className="absolute inset-0 bg-linear-to-b from-[#0066CC]/40 via-[#003366]/50 to-black/50" />

            {/* Content */}
            <div className="relative z-10 mx-auto w-[95%] max-w-6xl px-4 text-center sm:px-6">
                {/* Headline */}
                <h1 className="pt-7 sm:pt-0 mb-4 sm:mb-8  font-bold text-white text-4xl sm:text-5xl lg:text-6xl drop-shadow-lg">
                    {heroContent.title}
                </h1>

                {/* Tabs */}
                <div className="mb-4 sm:mb-6 w-full max-w-4xl mx-auto">
                    <div className="flex flex-row items-center justify-start sm:justify-center gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => setActiveTab(tab)}
                                className={`shrink-0 pb-2 text-sm sm:text-base font-medium transition-colors whitespace-nowrap ${
                                    activeTab === tab
                                        ? "border-b-2 border-white text-white"
                                        : "text-white/80 hover:text-white"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mb-7 sm:mb-0 mx-auto w-full max-w-4xl">
                    <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-0 rounded-lg bg-white shadow-lg ${propertyTypeOpen ? 'overflow-visible' : 'overflow-hidden'}`}>
                        {/* Property Type Dropdown */}
                        <div className="relative shrink-0 z-30">
                            <button
                                type="button"
                                onClick={() =>
                                    setPropertyTypeOpen(!propertyTypeOpen)
                                }
                                className="flex items-center justify-center sm:justify-start gap-2 border-b sm:border-b-0 sm:border-r border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors w-full sm:w-auto"
                            >
                                <span className="truncate">
                                    {selectedPropertyType}
                                </span>
                                <ChevronDown
                                    className={`h-3 w-3 sm:h-4 sm:w-4 shrink-0 transition-transform ${
                                        propertyTypeOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                            {propertyTypeOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() =>
                                            setPropertyTypeOpen(false)
                                        }
                                    />
                                    <div className="absolute left-0 top-full mt-1 z-50 w-full sm:w-48 rounded-md border border-gray-200 bg-white shadow-lg">
                                        <div className="py-1 max-h-60 overflow-y-auto">
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
                            className="flex-1 border-0 bg-transparent px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-0"
                            aria-label="Search location, broker, or description"
                        />

                        {/* Search Button */}
                        <button
                            type="button"
                            className="rounded-l-none md:rounded-r-[10px] bg-[#0066CC] md:mr-0.5 px-4 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-[#0052A3] focus:outline-none"
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
