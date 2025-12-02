import { usePage } from "@inertiajs/react";
import AppLayout from "../../Layouts/AppLayout";
import { Property } from "../../../types";
import { PageProps as InertiaPageProps } from "../../../types";
import PropertyHero from "../../../Components/Property/PropertyHero";
import PropertyHeader from "../../../Components/Property/PropertyHeader";
import PropertyDescription from "../../../Components/Property/PropertyDescription";
import PropertyDetailsGrid from "../../../Components/Property/PropertyDetailsGrid";
import PropertyLocationMap from "../../../Components/Property/PropertyLocationMap";
import PropertyQuickInfo from "../../../Components/Property/PropertyQuickInfo";
import PropertyBrokers from "../../../Components/Property/PropertyBrokers";
import PropertyExternalLink from "../../../Components/Property/PropertyExternalLink";

interface PageProps extends InertiaPageProps {
    property: Property;
}

interface ExtendedPropertyImage {
    id: number | string;
    url: string;
    position: number;
    is_thumbnail: boolean;
    isPlaceholder?: boolean;
}

export default function PropertyShow() {
    const { props } = usePage<PageProps>();
    const { property } = props;

    const location = property.location;
    const details = property.details;
    const actualImages = property.images || [];
    const brokers = property.brokers || [];

    // Create image array with placeholders based on number_of_images
    const totalImages = property.number_of_images || actualImages.length || 1;
    const images: ExtendedPropertyImage[] = Array.from(
        { length: totalImages },
        (_, index) => {
            if (index < actualImages.length) {
                return {
                    ...actualImages[index],
                    isPlaceholder: false,
                };
            }
            return {
                id: `placeholder-${index}`,
                url: "/assets/images/placeholder.png",
                position: index,
                is_thumbnail: false,
                isPlaceholder: true,
            };
        }
    );

    // Format price
    const formattedPrice =
        property.formatted_price ||
        `$${Number(property.asking_price).toLocaleString()}`;

    // Build map URL
    const getMapUrl = (): string | null => {
        const standardUrl = "https://www.google.com/maps";
        let standardQuery = "";

        if (location?.latitude && location?.longitude) {
            standardQuery = `${location.latitude},${location.longitude}`;
        } else if (location?.full_address) {
            standardQuery = encodeURIComponent(location.full_address);
        } else if (location) {
            const address = `${location.address}, ${location.city}, ${location.state_code} ${location.zip}`;
            standardQuery = encodeURIComponent(address);
        } else {
            return null;
        }

        return `${standardUrl}?q=${standardQuery}&t=m&output=embed`;
    };

    const mapUrl = getMapUrl();

    // Get full address
    const fullAddress =
        location?.full_address ||
        (location
            ? `${location.address}, ${location.city}, ${location.state_name} ${location.zip}`
            : "Address not available");

    return (
        <AppLayout title={property.name}>
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <PropertyHero
                    images={images}
                    mapUrl={mapUrl}
                    propertyName={property.name}
                    thumbnailUrl={property.thumbnail_url}
                />

                {/* Main Content */}
                <div className="w-[95%] max-w-full mx-auto px-4 sm:px-6 lg:px-2  relative z-20">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* Main Content Column */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Property Header */}
                            <PropertyHeader
                                property={property}
                                fullAddress={fullAddress}
                                formattedPrice={formattedPrice}
                            />

                            {/* Description */}
                            <PropertyDescription
                                description={property.description}
                                marketingDescription={
                                    property.marketing_description
                                }
                            />

                            {/* Property Details */}
                            <PropertyDetailsGrid
                                details={details}
                                isInOpportunityZone={
                                    property.is_in_opportunity_zone
                                }
                            />

                            {/* Location Map */}
                            <PropertyLocationMap
                                mapUrl={mapUrl}
                                fullAddress={fullAddress}
                            />
                        </div>

                        {/* Sidebar Column */}
                        <div className="lg:col-span-1">
                            <div className="lg:sticky lg:top-8 space-y-6">
                                {/* Quick Info */}
                                <PropertyQuickInfo
                                    property={property}
                                    formattedPrice={formattedPrice}
                                    lotSizeAcres={details?.lot_size_acres}
                                />

                                {/* Brokers */}
                                <PropertyBrokers brokers={brokers} />

                                {/* External Link */}
                                {property.external_url && (
                                    <PropertyExternalLink
                                        externalUrl={property.external_url}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
