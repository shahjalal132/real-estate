import { usePage } from "@inertiajs/react";
import { useRef } from "react";
import AppLayout from "../../Layouts/AppLayout";
import { Property } from "../../../types";
import { PageProps as InertiaPageProps } from "../../../types";
import PropertyOverview from "../../../Components/Property/PropertyOverview";
import PropertyTopTabs from "../../../Components/Property/PropertyTopTabs";
import PropertyTabs from "../../../Components/Property/PropertyTabs";
import PropertyDescription from "../../../Components/Property/PropertyDescription";
import PropertyInvestmentHighlights from "../../../Components/Property/PropertyInvestmentHighlights";
import PropertyDetailsGrid from "../../../Components/Property/PropertyDetailsGrid";
import PropertyLocationMap from "../../../Components/Property/PropertyLocationMap";
import PropertyBrokers from "../../../Components/Property/PropertyBrokers";
import PropertyHistory from "../../../Components/Property/PropertyHistory";
import TaxHistory from "../../../Components/Property/TaxHistory";
import ValuationCalculator from "../../../Components/Property/ValuationCalculator";
import ValuationMetrics from "../../../Components/Property/ValuationMetrics";
import Demographics from "../../../Components/Property/Demographics";
import ClimateRisk from "../../../Components/Property/ClimateRisk";
import LocationInsights from "../../../Components/Property/LocationInsights";
import SimilarProperties from "../../../Components/Property/SimilarProperties";

interface PageProps extends InertiaPageProps {
    property: Property;
    similarProperties?: Property[];
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
    const { property, similarProperties = [] } = props;

    // Refs for scrolling to sections
    const sectionRefs = {
        contacts: useRef<HTMLDivElement>(null),
        details: useRef<HTMLDivElement>(null),
        about: useRef<HTMLDivElement>(null),
        map: useRef<HTMLDivElement>(null),
        climate: useRef<HTMLDivElement>(null),
        history: useRef<HTMLDivElement>(null),
        tax: useRef<HTMLDivElement>(null),
        valuation: useRef<HTMLDivElement>(null),
        metrics: useRef<HTMLDivElement>(null),
        demographics: useRef<HTMLDivElement>(null),
        insights: useRef<HTMLDivElement>(null),
    };

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

    const handleViewMap = () => {
        sectionRefs.map.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const handleViewStreetView = () => {
        // Street view functionality
        window.open(
            `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${location?.latitude},${location?.longitude}`,
            "_blank"
        );
    };

    const handleTabClick = (tabId: string) => {
        const ref = sectionRefs[tabId as keyof typeof sectionRefs];
        if (ref?.current) {
            ref.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <AppLayout title={property.name}>
            <div className="min-h-screen bg-white">
                <div className="max-w-[95%] mx-auto px-3  py-4">
                    {/* Top Tabs */}
                    <PropertyTopTabs />

                    {/* Property Overview */}
                    <PropertyOverview
                        property={property}
                        images={images}
                        formattedPrice={formattedPrice}
                        fullAddress={fullAddress}
                        mapUrl={mapUrl}
                    />

                    {/* Tabs Navigation */}
                    <PropertyTabs
                        onTabClick={handleTabClick}
                        property={property}
                        formattedPrice={formattedPrice}
                        fullAddress={fullAddress}
                    />

                    {/* All Sections Displayed Serially */}
                    <div className="space-y-8 mb-8">
                        {/* Listing Contacts Section */}
                        <div
                            id="contacts"
                            ref={sectionRefs.contacts}
                            className="scroll-mt-20"
                        >
                            <PropertyBrokers brokers={brokers} />
                        </div>

                        {/* Details Section */}
                        <div
                            id="details"
                            ref={sectionRefs.details}
                            className="scroll-mt-20"
                        >
                            <PropertyDetailsGrid
                                details={details}
                                property={property}
                                isInOpportunityZone={
                                    property.is_in_opportunity_zone
                                }
                            />
                        </div>

                        {/* About Property Section */}
                        <div
                            id="about"
                            ref={sectionRefs.about}
                            className="scroll-mt-20"
                        >
                            <PropertyDescription
                                description={property.description}
                                marketingDescription={
                                    property.marketing_description
                                }
                            />
                        </div>

                        {/* Investment Highlights Section */}
                        <div id="highlights" className="scroll-mt-20">
                            <PropertyInvestmentHighlights
                                investmentHighlights={
                                    property.details?.investment_highlights
                                }
                            />
                        </div>

                        {/* Map Section */}
                        <div
                            id="map"
                            ref={sectionRefs.map}
                            className="scroll-mt-20"
                        >
                            <PropertyLocationMap
                                mapUrl={mapUrl}
                                fullAddress={fullAddress}
                            />
                        </div>

                        {/* Climate Risk Section */}
                        <div
                            id="climate"
                            ref={sectionRefs.climate}
                            className="scroll-mt-20"
                        >
                            <ClimateRisk />
                        </div>

                        {/* Property History Section */}
                        {/* <div
                            id="history"
                            ref={sectionRefs.history}
                            className="scroll-mt-20"
                        >
                            <PropertyHistory />
                        </div> */}

                        {/* Tax History Section */}
                        {/* <div
                            id="tax"
                            ref={sectionRefs.tax}
                            className="scroll-mt-20"
                        >
                            <TaxHistory />
                        </div> */}

                        {/* Demographics Section */}
                        <div
                            id="demographics"
                            ref={sectionRefs.demographics}
                            className="scroll-mt-20"
                        >
                            <Demographics />
                        </div>

                        {/* Valuation Metrics Section */}
                        {/* <div
                            id="metrics"
                            ref={sectionRefs.metrics}
                            className="scroll-mt-20"
                        >
                            <ValuationMetrics />
                        </div> */}

                        {/* Location Insights Section */}
                        <div
                            id="insights"
                            ref={sectionRefs.insights}
                            className="scroll-mt-20"
                        >
                            <LocationInsights
                                mapUrl={mapUrl}
                                fullAddress={fullAddress}
                                centerLat={location?.latitude ?? undefined}
                                centerLng={location?.longitude ?? undefined}
                            />
                        </div>
                        {/* Valuation Calculator Section */}
                        <div
                            id="valuation"
                            ref={sectionRefs.valuation}
                            className="scroll-mt-20"
                        >
                            <ValuationCalculator />
                        </div>

                        {/* Similar Properties Section */}
                        <div className="scroll-mt-20">
                            <SimilarProperties
                                properties={similarProperties}
                                currentPropertyId={property.id}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
