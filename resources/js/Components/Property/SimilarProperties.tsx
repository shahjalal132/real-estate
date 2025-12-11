import { useState } from "react";
import { ChevronRight, LayoutGrid, Table } from "lucide-react";
import { Link } from "@inertiajs/react";
import PropertyCard, { PropertyCardProps } from "../PropertyCard";
import SliderWithControls from "../SliderWithControls";
import { useSliderControls } from "../useSliderControls";
import { Property } from "../../types";

interface SimilarPropertiesProps {
    properties?: Property[];
    currentPropertyId?: number;
}

// Helper function to map Property to PropertyCardProps
function mapPropertyToCardProps(property: Property): PropertyCardProps {
    const summaryDetails = property.details?.summary_details || {};
    const areaSqft =
        summaryDetails["Square Feet"] ||
        summaryDetails["Sqft"] ||
        summaryDetails["Square Footage"] ||
        null;
    const areaAcres = property.details?.lot_size_acres;

    let area: string | undefined;
    if (areaSqft) {
        area =
            typeof areaSqft === "number"
                ? `${areaSqft.toLocaleString()} Sqft`
                : `${areaSqft} Sqft`;
    } else if (areaAcres) {
        area = `${areaAcres} Acres`;
    }

    const locationString = property.location
        ? property.location.full_address ||
          `${property.location.address || ""}, ${
              property.location.city || ""
          }, ${property.location.state_code || ""} ${
              property.location.zip || ""
          }`.trim()
        : "Location not available";

    const agentName =
        property.brokers && property.brokers.length > 0
            ? property.brokers[0].full_name
            : "No Agent";

    // Format price - PropertyCard adds $ sign, so pass number without $
    let asking_price = "Undisclosed";
    if (property.formatted_price) {
        // Remove $ and commas, PropertyCard will format it
        const numValue = property.formatted_price.replace(/[$,]/g, "");
        if (!isNaN(parseFloat(numValue))) {
            asking_price = parseFloat(numValue).toLocaleString();
        }
    } else if (property.asking_price) {
        asking_price = parseFloat(
            property.asking_price.toString().replace(/[^0-9.]/g, "")
        ).toLocaleString();
    }

    // Get property type/subtype for subtitle
    const propertyType =
        property.types && property.types.length > 0 ? property.types[0] : "";
    const propertySubtype =
        property.subtypes && property.subtypes.length > 0
            ? property.subtypes[0]
            : "";
    const subtitle = property.is_in_opportunity_zone
        ? `Opportunity Zone${propertyType ? ` • ${propertyType}` : ""}${
              propertySubtype ? ` • ${propertySubtype}` : ""
          }`
        : propertyType
        ? `${propertyType}${propertySubtype ? ` • ${propertySubtype}` : ""}`
        : "";

    return {
        title: property.name,
        category:
            property.types && property.types.length > 0
                ? property.types[0]
                : "Property",
        isFeatured: property.is_in_opportunity_zone || false,
        asking_price: asking_price,
        priceUnit: "",
        description:
            property.marketing_description ||
            property.description ||
            "No description available",
        beds: 0,
        baths: 0,
        area: area,
        agentName: agentName,
        photosCount: property.number_of_images || 0,
        image: property.thumbnail_url || "/assets/images/placeholder.png",
        location: locationString,
        href: `/properties/${property.id}/${property.url_slug}`,
    };
}

export default function SimilarProperties({
    properties = [],
    currentPropertyId,
}: SimilarPropertiesProps) {
    const { sliderRef, handlePrev, handleNext } = useSliderControls();
    const [viewMode, setViewMode] = useState<"card" | "table">("card");

    // Filter out current property and limit to 10
    const filteredProperties = properties
        .filter((p) => p.id !== currentPropertyId)
        .slice(0, 10);

    if (filteredProperties.length === 0) {
        return null;
    }

    const sliderSettings = {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
        responsive: [
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
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                    Similar Properties
                </h2>
                <div className="flex items-center gap-4">
                    <Link
                        href="/properties"
                        className="text-sm font-medium text-[#0066CC] hover:text-[#0052a3] transition-colors"
                    >
                        View All
                    </Link>
                    <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1">
                        <button
                            onClick={() => setViewMode("card")}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                                viewMode === "card"
                                    ? "bg-[#0066CC] text-white"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            <LayoutGrid className="w-4 h-4" />
                            Card
                        </button>
                        <button
                            onClick={() => setViewMode("table")}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                                viewMode === "table"
                                    ? "bg-[#0066CC] text-white"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            <Table className="w-4 h-4" />
                            Table
                        </button>
                    </div>
                </div>
            </div>

            {/* Slider */}
            {viewMode === "card" ? (
                <div className="relative">
                    <SliderWithControls
                        sliderRef={sliderRef}
                        onPrev={handlePrev}
                        onNext={handleNext}
                        settings={sliderSettings}
                        hideControls={true}
                        className="similar-properties-slider pb-4"
                    >
                        {filteredProperties.map((property) => (
                            <div key={property.id} className="px-2 py-4">
                                <PropertyCard
                                    {...mapPropertyToCardProps(property)}
                                />
                            </div>
                        ))}
                    </SliderWithControls>
                    {/* Right arrow indicator */}
                    <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
                        aria-label="Next properties"
                    >
                        <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                                    Property
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                                    Location
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                                    Price
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                                    Type
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProperties.map((property) => {
                                const cardProps =
                                    mapPropertyToCardProps(property);
                                return (
                                    <tr
                                        key={property.id}
                                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="py-4 px-4">
                                            <Link
                                                href={cardProps.href || "#"}
                                                className="font-medium text-gray-900 hover:text-[#0066CC]"
                                            >
                                                {cardProps.title}
                                            </Link>
                                        </td>
                                        <td className="py-4 px-4 text-sm text-gray-600">
                                            {cardProps.location}
                                        </td>
                                        <td className="py-4 px-4 font-semibold text-gray-900">
                                            {cardProps.asking_price}
                                        </td>
                                        <td className="py-4 px-4 text-sm text-gray-600">
                                            {cardProps.category}
                                        </td>
                                        <td className="py-4 px-4">
                                            <Link
                                                href={cardProps.href || "#"}
                                                className="text-sm text-[#0066CC] hover:underline"
                                            >
                                                View Flyer
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
