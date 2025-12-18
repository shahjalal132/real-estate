import { Property } from "../types";
import { PropertyCardProps } from "../Components/PropertyCard";

export function mapPropertyToCardProps(property: Property): PropertyCardProps {
    const summaryDetails = property.details?.summary_details || {};
    const beds =
        summaryDetails["Bedrooms"] ||
        summaryDetails["Beds"] ||
        summaryDetails["Number of Bedrooms"] ||
        0;
    const baths =
        summaryDetails["Bathrooms"] ||
        summaryDetails["Baths"] ||
        summaryDetails["Number of Bathrooms"] ||
        0;
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
        ? `${property.location.city}, ${property.location.state_code}`
        : "Location not available";

    const agentName =
        property.brokers && property.brokers.length > 0
            ? property.brokers[0].full_name
            : "No Agent";

    // Format price for display
    const formatPrice = (price: number | string | null | undefined): string => {
        if (!price && price !== 0) return "Undisclosed";

        let numValue: number;
        if (typeof price === "string") {
            const cleaned = price.replace(/[$,\s]/g, "");
            numValue = parseFloat(cleaned);
        } else {
            numValue = price;
        }

        if (isNaN(numValue)) return "Undisclosed";

        return numValue.toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
    };

    // Get formatted price - remove $ if present since PropertyCard will add it
    let formattedPrice: string;
    if (property.formatted_price) {
        formattedPrice = property.formatted_price.replace(/^\$\s*/, "").trim();
    } else if (property.asking_price) {
        formattedPrice = formatPrice(property.asking_price);
    } else {
        formattedPrice = "Undisclosed";
    }

    return {
        title: property.name,
        category:
            property.types && property.types.length > 0
                ? property.types[0]
                : "Property",
        isFeatured: property.is_in_opportunity_zone || false,
        asking_price: formattedPrice,
        priceUnit: "/Sqft",
        description:
            property.marketing_description ||
            property.description ||
            "No description available",
        beds: typeof beds === "number" ? beds : parseInt(beds) || 0,
        baths:
            typeof baths === "number"
                ? baths
                : parseFloat(baths.toString()) || 0,
        area: area,
        agentName: agentName,
        photosCount: property.number_of_images || 0,
        image:
            property.thumbnail_url ||
            "https://via.placeholder.com/400x300?text=No+Image",
        location: locationString,
        href: `/properties/${property.id}/${property.url_slug}`,
    };
}

export function applyFilter(items: Property[], filter: string): Property[] {
    if (!filter || filter === "all") return items;

    return items.filter((_, index) => {
        if (filter === "option1") return index % 3 === 0;
        if (filter === "option2") return index % 3 === 1;
        if (filter === "option3") return index % 3 === 2;
        return true;
    });
}
