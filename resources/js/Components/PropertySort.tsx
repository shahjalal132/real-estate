import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Property } from "../types";

interface PropertySortProps {
    properties: Property[];
    section: string | null;
    onSortChange: (sortedProperties: Property[]) => void;
}

// Helper function to get numeric value from property details
const getNumericValue = (property: Property, key: string): number => {
    const summaryDetails = property.details?.summary_details || {};
    const value = summaryDetails[key] || summaryDetails[key.toLowerCase()] || 0;
    if (typeof value === "number") return value;
    if (typeof value === "string") {
        const cleaned = value.replace(/[$,]/g, "");
        const parsed = parseFloat(cleaned);
        return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
};

// Helper function to get asking price as number
const getAskingPrice = (property: Property): number => {
    if (typeof property.asking_price === "number") return property.asking_price;
    if (typeof property.asking_price === "string") {
        const cleaned = property.asking_price.replace(/[$,]/g, "");
        const parsed = parseFloat(cleaned);
        return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
};

// Helper function to get square footage
const getSquareFeet = (property: Property): number => {
    return (
        getNumericValue(property, "Square Feet") ||
        getNumericValue(property, "Sqft") ||
        getNumericValue(property, "Square Footage") ||
        0
    );
};

// Helper function to get bedroom count
const getBedroomCount = (property: Property): number => {
    return (
        getNumericValue(property, "Bedrooms") ||
        getNumericValue(property, "Bedroom Count") ||
        getNumericValue(property, "Bedroom") ||
        0
    );
};

// Sort function
const sortProperties = (
    properties: Property[],
    sortValue: string
): Property[] => {
    const sorted = [...properties];

    switch (sortValue) {
        case "recommended":
            // Default: sort by created_at desc (newest first)
            return sorted.sort((a, b) => {
                const dateA = new Date(a.created_at).getTime();
                const dateB = new Date(b.created_at).getTime();
                return dateB - dateA;
            });

        case "new-listings":
            return sorted.sort((a, b) => {
                const dateA = new Date(a.created_at).getTime();
                const dateB = new Date(b.created_at).getTime();
                return dateB - dateA;
            });

        case "recently-updated":
            return sorted.sort((a, b) => {
                const dateA = new Date(a.updated_at).getTime();
                const dateB = new Date(b.updated_at).getTime();
                return dateB - dateA;
            });

        case "sq-ft-high-to-low":
            return sorted.sort((a, b) => {
                const sqftA = getSquareFeet(a);
                const sqftB = getSquareFeet(b);
                return sqftB - sqftA;
            });

        case "sq-ft-low-to-high":
            return sorted.sort((a, b) => {
                const sqftA = getSquareFeet(a);
                const sqftB = getSquareFeet(b);
                return sqftA - sqftB;
            });

        case "rate-per-sq-ft-high-to-low":
            return sorted.sort((a, b) => {
                const sqftA = getSquareFeet(a);
                const sqftB = getSquareFeet(b);
                const priceA = getAskingPrice(a);
                const priceB = getAskingPrice(b);
                const rateA = sqftA > 0 ? priceA / sqftA : 0;
                const rateB = sqftB > 0 ? priceB / sqftB : 0;
                return rateB - rateA;
            });

        case "rate-per-sq-ft-low-to-high":
            return sorted.sort((a, b) => {
                const sqftA = getSquareFeet(a);
                const sqftB = getSquareFeet(b);
                const priceA = getAskingPrice(a);
                const priceB = getAskingPrice(b);
                const rateA = sqftA > 0 ? priceA / sqftA : 0;
                const rateB = sqftB > 0 ? priceB / sqftB : 0;
                return rateA - rateB;
            });

        case "spaces-most-to-least":
            return sorted.sort((a, b) => {
                const spacesA =
                    getNumericValue(a, "Spaces") ||
                    getNumericValue(a, "Units") ||
                    0;
                const spacesB =
                    getNumericValue(b, "Spaces") ||
                    getNumericValue(b, "Units") ||
                    0;
                return spacesB - spacesA;
            });

        case "spaces-least-to-most":
            return sorted.sort((a, b) => {
                const spacesA =
                    getNumericValue(a, "Spaces") ||
                    getNumericValue(a, "Units") ||
                    0;
                const spacesB =
                    getNumericValue(b, "Spaces") ||
                    getNumericValue(b, "Units") ||
                    0;
                return spacesA - spacesB;
            });

        // Commercial/Auctions specific sorts
        case "noi-high-to-low":
            return sorted.sort((a, b) => {
                const noiA =
                    getNumericValue(a, "NOI") ||
                    getNumericValue(a, "Net Operating Income") ||
                    0;
                const noiB =
                    getNumericValue(b, "NOI") ||
                    getNumericValue(b, "Net Operating Income") ||
                    0;
                return noiB - noiA;
            });

        case "noi-low-to-high":
            return sorted.sort((a, b) => {
                const noiA =
                    getNumericValue(a, "NOI") ||
                    getNumericValue(a, "Net Operating Income") ||
                    0;
                const noiB =
                    getNumericValue(b, "NOI") ||
                    getNumericValue(b, "Net Operating Income") ||
                    0;
                return noiA - noiB;
            });

        case "units-high-to-low":
            return sorted.sort((a, b) => {
                const unitsA = getNumericValue(a, "Units") || 0;
                const unitsB = getNumericValue(b, "Units") || 0;
                return unitsB - unitsA;
            });

        case "units-low-to-high":
            return sorted.sort((a, b) => {
                const unitsA = getNumericValue(a, "Units") || 0;
                const unitsB = getNumericValue(b, "Units") || 0;
                return unitsA - unitsB;
            });

        case "price-high-to-low":
            return sorted.sort((a, b) => {
                const priceA = getAskingPrice(a);
                const priceB = getAskingPrice(b);
                return priceB - priceA;
            });

        case "price-low-to-high":
            return sorted.sort((a, b) => {
                const priceA = getAskingPrice(a);
                const priceB = getAskingPrice(b);
                return priceA - priceB;
            });

        case "cap-rate-high-to-low":
            return sorted.sort((a, b) => {
                const capRateA =
                    getNumericValue(a, "Cap Rate") ||
                    getNumericValue(a, "CapRate") ||
                    0;
                const capRateB =
                    getNumericValue(b, "Cap Rate") ||
                    getNumericValue(b, "CapRate") ||
                    0;
                return capRateB - capRateA;
            });

        case "cap-rate-low-to-high":
            return sorted.sort((a, b) => {
                const capRateA =
                    getNumericValue(a, "Cap Rate") ||
                    getNumericValue(a, "CapRate") ||
                    0;
                const capRateB =
                    getNumericValue(b, "Cap Rate") ||
                    getNumericValue(b, "CapRate") ||
                    0;
                return capRateA - capRateB;
            });

        case "bsf-high-to-low":
            return sorted.sort((a, b) => {
                const bsfA =
                    getNumericValue(a, "BSF") ||
                    getNumericValue(a, "Building Square Feet") ||
                    0;
                const bsfB =
                    getNumericValue(b, "BSF") ||
                    getNumericValue(b, "Building Square Feet") ||
                    0;
                return bsfB - bsfA;
            });

        case "bsf-low-to-high":
            return sorted.sort((a, b) => {
                const bsfA =
                    getNumericValue(a, "BSF") ||
                    getNumericValue(a, "Building Square Feet") ||
                    0;
                const bsfB =
                    getNumericValue(b, "BSF") ||
                    getNumericValue(b, "Building Square Feet") ||
                    0;
                return bsfA - bsfB;
            });

        case "time-ending-soonest":
            // Sort by activated_on or external_updated_on, ascending (soonest first)
            return sorted.sort((a, b) => {
                const dateA = a.activated_on
                    ? new Date(a.activated_on).getTime()
                    : a.external_updated_on
                    ? new Date(a.external_updated_on).getTime()
                    : Number.MAX_SAFE_INTEGER;
                const dateB = b.activated_on
                    ? new Date(b.activated_on).getTime()
                    : b.external_updated_on
                    ? new Date(b.external_updated_on).getTime()
                    : Number.MAX_SAFE_INTEGER;
                return dateA - dateB;
            });

        case "bedroom-count-high-to-low":
            return sorted.sort((a, b) => {
                const bedroomsA = getBedroomCount(a);
                const bedroomsB = getBedroomCount(b);
                return bedroomsB - bedroomsA;
            });

        case "bedroom-count-low-to-high":
            return sorted.sort((a, b) => {
                const bedroomsA = getBedroomCount(a);
                const bedroomsB = getBedroomCount(b);
                return bedroomsA - bedroomsB;
            });

        default:
            return sorted;
    }
};

export default function PropertySort({
    properties,
    section,
    onSortChange,
}: PropertySortProps) {
    const [sortOpen, setSortOpen] = useState(false);
    const [sortBy, setSortBy] = useState("recommended");

    // Check URL parameters to determine if commercial for-lease (should use residential sort)
    const urlParams = new URLSearchParams(
        typeof window !== "undefined" ? window.location.search : ""
    );
    const urlType = urlParams.get("type");
    const urlCategory = urlParams.get("category");
    const isCommercialForLease =
        section === "commercial" && urlType === "for-lease";
    const isCommercialForSale =
        (section === "commercial" && urlType === "for-sale") ||
        (urlCategory === "all-commercial" && urlType === "for-sale");
    const isResidentialForSale =
        (urlCategory === "residential" && urlType === "for-sale") ||
        (urlCategory === "all-residential" && urlType === "for-sale");

    // Determine if this is commercial/auctions or residential
    // Exception: commercial + for-lease should use residential sort options
    const isCommercialOrAuctions =
        (section === "commercial" || section === "auctions") &&
        !isCommercialForLease;

    // Sort options based on property type
    const residentialSortOptions = [
        "Recommended",
        "New Listings",
        "Recently Updated",
        "Sq Ft (High to Low)",
        "Sq Ft (Low to High)",
        "Rate per Sq Ft (High to Low)",
        "Rate per Sq Ft (Low to High)",
        "Spaces (Most to Least)",
        "Spaces (Least to Most)",
        "Bedroom Count (High to Low)",
        "Bedroom Count (Low to High)",
    ];

    const commercialSortOptions = [
        "Recommended",
        "New Listings",
        "Recently Updated",
        "Sq Ft (High to Low)",
        "Sq Ft (Low to High)",
        "NOI (High to Low)",
        "NOI (Low to High)",
        "Units (High to Low)",
        "Units (Low to High)",
        "Price (High to Low)",
        "Price (Low to High)",
        "Cap Rate (High to Low)",
        "Cap Rate (Low to High)",
        "BSF (High to Low)",
        "BSF (Low to High)",
        "Time (Ending Soonest)",
    ];

    // Commercial sort options with bedroom count for for-sale
    const commercialForSaleSortOptions = [
        "Recommended",
        "New Listings",
        "Recently Updated",
        "Sq Ft (High to Low)",
        "Sq Ft (Low to High)",
        "NOI (High to Low)",
        "NOI (Low to High)",
        "Units (High to Low)",
        "Units (Low to High)",
        "Price (High to Low)",
        "Price (Low to High)",
        "Cap Rate (High to Low)",
        "Cap Rate (Low to High)",
        "BSF (High to Low)",
        "Time (Ending Soonest)",
    ];

    // Bedroom count only options for residential for-sale
    const residentialForSaleSortOptions = [
        "Recommended",
        "New Listings",
        "Recently Updated",
        "Sq Ft (High to Low)",
        "Sq Ft (Low to High)",
        "NOI (High to Low)",
        "NOI (Low to High)",
        "Units (High to Low)",
        "Units (Low to High)",
        "Price (High to Low)",
        "Price (Low to High)",
        "Cap Rate (High to Low)",
        "Cap Rate (Low to High)",
        "BSF (High to Low)",
        "BSF (Low to High)",
        "Bedroom Count (High to Low)",
        "Bedroom Count (Low to High)",
        "Time (Ending Soonest)",
    ];

    const sortOptions = isResidentialForSale
        ? residentialForSaleSortOptions
        : isCommercialForSale
        ? commercialForSaleSortOptions
        : isCommercialOrAuctions
        ? commercialSortOptions
        : residentialSortOptions;

    const getSortValue = (label: string) => {
        return label.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "");
    };

    const getSortLabel = (value: string) => {
        const option = sortOptions.find((opt) => getSortValue(opt) === value);
        return option || value;
    };

    const handleSortChange = (sortValue: string) => {
        setSortBy(sortValue);
        setSortOpen(false);
        const sorted = sortProperties(properties, sortValue);
        onSortChange(sorted);
    };

    // Sort properties whenever properties change (with current sortBy)
    useEffect(() => {
        const sorted = sortProperties(properties, sortBy);
        onSortChange(sorted);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [properties]);

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setSortOpen(!sortOpen)}
                className={`inline-flex items-center gap-2 rounded border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
                    isCommercialOrAuctions ? "min-w-[200px]" : "min-w-[180px]"
                }`}
            >
                <span className="truncate">↑↓ {getSortLabel(sortBy)}</span>
                <ChevronDown className="h-4 w-4 shrink-0" />
            </button>
            {sortOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setSortOpen(false)}
                    />
                    <div
                        className={`absolute right-0 z-20 mt-2 rounded-md bg-white shadow-lg border border-gray-200 ${
                            isCommercialOrAuctions ? "w-72" : "w-64"
                        }`}
                    >
                        <div className="py-1 max-h-96 overflow-y-auto">
                            {sortOptions.map((option) => {
                                const optionValue = getSortValue(option);
                                return (
                                    <button
                                        key={option}
                                        type="button"
                                        className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors whitespace-nowrap ${
                                            sortBy === optionValue
                                                ? "bg-gray-50 text-[#0066CC] font-medium"
                                                : "text-gray-700"
                                        }`}
                                        onClick={() =>
                                            handleSortChange(optionValue)
                                        }
                                    >
                                        {option}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

// Export the sort function for use in other components
export { sortProperties };
