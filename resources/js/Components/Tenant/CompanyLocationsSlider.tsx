import { useState, useRef } from "react";
import { Link } from "@inertiajs/react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TennentLocation } from "../../types";
import { formatNumber, formatSF } from "../../utils/formatting";

interface CompanyLocationsSliderProps {
    locations: TennentLocation[];
    totalCount: number;
}

export default function CompanyLocationsSlider({
    locations,
    totalCount,
}: CompanyLocationsSliderProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;

        const { scrollLeft, scrollWidth, clientWidth } =
            scrollContainerRef.current;

        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    };

    const scroll = (direction: "left" | "right") => {
        if (!scrollContainerRef.current) return;

        const scrollAmount = 400;
        const currentScroll = scrollContainerRef.current.scrollLeft;
        const newScroll =
            direction === "left"
                ? currentScroll - scrollAmount
                : currentScroll + scrollAmount;

        scrollContainerRef.current.scrollTo({
            left: newScroll,
            behavior: "smooth",
        });
    };

    // Format address
    const formatAddress = (location: TennentLocation): string => {
        const parts = [
            location.address,
            location.city,
            location.state,
            location.zip,
        ].filter(Boolean);
        return parts.join(", ") || "Address not available";
    };

    // Format location details
    const formatLocationDetails = (location: TennentLocation): string => {
        let sfFormatted = null;
        if (location.sf_occupied) {
            // Try to parse and format with commas
            const num = parseFloat(
                location.sf_occupied.toString().replace(/,/g, "")
            );
            if (!isNaN(num)) {
                sfFormatted = num.toLocaleString();
            } else {
                sfFormatted = location.sf_occupied.toString();
            }
        }

        const parts = [
            sfFormatted ? `${sfFormatted} SF` : null,
            location.property_type || "Industrial",
            location.floor
                ? location.floor === "GRND"
                    ? "Floor GRND"
                    : `Floor ${location.floor}`
                : "Floor 1",
        ].filter(Boolean);
        return parts.join(" · ");
    };

    // Get star rating component
    const renderStars = (rating: number | null) => {
        const stars = rating || 0;
        return (
            <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, index) => (
                    <Star
                        key={index}
                        className={`h-3.5 w-3.5 ${
                            index < stars
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-none text-gray-300"
                        }`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="bg-white rounded-lg">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                    Company Locations
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                    {formatNumber(totalCount)} Locations
                </p>
            </div>

            {/* Slider Container */}
            <div className="relative">
                {/* Left Arrow */}
                {showLeftArrow && (
                    <button
                        onClick={() => scroll("left")}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="h-5 w-5 text-gray-700" />
                    </button>
                )}

                {/* Right Arrow */}
                {showRightArrow && (
                    <button
                        onClick={() => scroll("right")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="h-5 w-5 text-gray-700" />
                    </button>
                )}

                {/* Scrollable Cards Container */}
                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="flex gap-4 overflow-x-auto scrollbar-hide px-6 py-6 scroll-smooth"
                    style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                >
                    {locations.map((location) => (
                        <Link
                            key={location.id}
                            href={`/contacts/tenants/locations/${location.id}`}
                            className="shrink-0 w-80 bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                        >
                            {/* Image */}
                            <div className="relative h-48 bg-gray-200 overflow-hidden">
                                <img
                                    src="/assets/images/placeholder.png"
                                    alt={
                                        location.building_name ||
                                        formatAddress(location)
                                    }
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            "/assets/images/placeholder.png";
                                    }}
                                />
                            </div>

                            {/* Content */}
                            <div className="p-4 space-y-3">
                                {/* Address */}
                                <div>
                                    <p className="text-sm font-medium text-gray-900 line-clamp-2">
                                        {formatAddress(location)}
                                    </p>
                                </div>

                                {/* Building Name & Rating */}
                                <div className="flex items-start justify-between gap-2">
                                    <p className="text-sm font-semibold text-gray-900">
                                        {location.building_name ||
                                            location.center_name ||
                                            "Building"}
                                    </p>
                                    {renderStars(location.star_rating)}
                                </div>

                                {/* Details */}
                                <div>
                                    <p className="text-xs text-gray-600">
                                        {formatLocationDetails(location)}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Hide scrollbar for webkit browsers */}
                <style
                    dangerouslySetInnerHTML={{
                        __html: `
                    .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                    }
                `,
                    }}
                />
            </div>
        </div>
    );
}
