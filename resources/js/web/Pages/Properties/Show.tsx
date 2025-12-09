import { usePage } from "@inertiajs/react";
import { useRef, useState, useMemo } from "react";
import AppLayout from "../../Layouts/AppLayout";
import PrintHeaderBar from "../../../Components/Property/PrintHeaderBar";
import PrintCustomizeSidebar, {
    PrintSection,
} from "../../../Components/Property/PrintCustomizeSidebar";
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
// import PropertyHistory from "../../../Components/Property/PropertyHistory";
// import TaxHistory from "../../../Components/Property/TaxHistory";
// import ValuationCalculator from "../../../Components/Property/ValuationCalculator";
// import ValuationMetrics from "../../../Components/Property/ValuationMetrics";
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

    // Print mode state
    const [isPrintMode, setIsPrintMode] = useState(false);
    const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
    const [selectedPrintSections, setSelectedPrintSections] = useState<
        string[]
    >([
        "at-a-glance",
        "listing-contacts",
        "details",
        "description",
        "highlights",
        "map",
        "climate-risk",
        "property-history",
        "valuation-calculator",
        "demographics",
        "property-photos",
        "similar-properties",
        "additional-information",
    ]);

    // Define print sections
    const printSections: PrintSection[] = useMemo(
        () => [
            { id: "at-a-glance", label: "At a Glance" },
            { id: "listing-contacts", label: "Listing Contacts" },
            { id: "details", label: "Detail" },
            {
                id: "about-property",
                label: "About This Property",
                children: [
                    { id: "description", label: "Description" },
                    { id: "highlights", label: "Highlights" },
                ],
            },
            { id: "map", label: "Map" },
            { id: "climate-risk", label: "Climate Risk" },
            { id: "property-history", label: "Property History" },
            { id: "valuation-calculator", label: "Valuation Calculator" },
            { id: "demographics", label: "Demographics" },
            { id: "property-photos", label: "Property Photos" },
            { id: "similar-properties", label: "Similar Properties" },
            {
                id: "additional-information",
                label: "Additional Information",
            },
        ],
        []
    );

    // Toggle section selection
    const handleToggleSection = (sectionId: string) => {
        setSelectedPrintSections((prev) =>
            prev.includes(sectionId)
                ? prev.filter((id) => id !== sectionId)
                : [...prev, sectionId]
        );
    };

    // Handle print - ensure content is loaded before printing
    const handlePrint = () => {
        // Wait for images and iframes to load
        const images = document.querySelectorAll("img");
        const iframes = document.querySelectorAll("iframe");

        const imagePromises = Array.from(images).map((img) => {
            if ((img as HTMLImageElement).complete) {
                return Promise.resolve();
            }
            return new Promise((resolve) => {
                (img as HTMLImageElement).onload = resolve;
                (img as HTMLImageElement).onerror = resolve;
            });
        });

        const iframePromises = Array.from(iframes).map((iframe) => {
            return new Promise((resolve) => {
                (iframe as HTMLIFrameElement).onload = resolve;
                // Timeout after 2 seconds to prevent hanging
                setTimeout(resolve, 2000);
            });
        });

        // Wait for all content to load, then print
        Promise.all([...imagePromises, ...iframePromises]).then(() => {
            // Small delay to ensure rendering is complete
            setTimeout(() => {
                window.print();
            }, 500);
        });
    };

    // Handle customize toggle
    const handleCustomize = () => {
        setIsCustomizeOpen(!isCustomizeOpen);
    };

    // Handle back from print mode
    const handleBackFromPrint = () => {
        setIsPrintMode(false);
        setIsCustomizeOpen(false);
    };

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
        <AppLayout title={property.name} hideHeader={isPrintMode}>
            <div className="min-h-screen bg-white">
                {/* Print Header Bar */}
                {isPrintMode && (
                    <PrintHeaderBar
                        onBack={handleBackFromPrint}
                        onCustomize={handleCustomize}
                        onPrint={handlePrint}
                    />
                )}

                {/* Print Customize Sidebar */}
                {isPrintMode && (
                    <PrintCustomizeSidebar
                        isOpen={isCustomizeOpen}
                        onClose={() => setIsCustomizeOpen(false)}
                        sections={printSections}
                        selectedSections={selectedPrintSections}
                        onToggleSection={handleToggleSection}
                    />
                )}

                {/* Top Tabs */}
                {!isPrintMode && <PropertyTopTabs />}
                <div
                    data-print-content
                    className={`max-w-[95%] mx-auto px-3 ${
                        isPrintMode ? "pt-16 print:pt-0" : ""
                    }`}
                >
                    {/* Property Overview */}
                    <PropertyOverview
                        property={property}
                        images={images}
                        formattedPrice={formattedPrice}
                        fullAddress={fullAddress}
                        mapUrl={mapUrl}
                        onPrintClick={() => setIsPrintMode(true)}
                        showAtAGlance={
                            !isPrintMode ||
                            selectedPrintSections.includes("at-a-glance")
                        }
                    />

                    {/* Tabs Navigation */}
                    <PropertyTabs
                        onTabClick={handleTabClick}
                        property={property}
                        formattedPrice={formattedPrice}
                        fullAddress={fullAddress}
                    />

                    {/* All Sections Displayed Serially */}
                    <div
                        className={`space-y-8 mb-8 ${
                            isPrintMode && isCustomizeOpen
                                ? "lg:ml-80 print:ml-0"
                                : ""
                        }`}
                    >
                        {/* Listing Contacts Section */}
                        {(!isPrintMode ||
                            selectedPrintSections.includes(
                                "listing-contacts"
                            )) && (
                            <div
                                id="contacts"
                                ref={sectionRefs.contacts}
                                className="scroll-mt-20 print-section"
                                data-print-section
                            >
                                <PropertyBrokers brokers={brokers} />
                            </div>
                        )}

                        {/* Details Section */}
                        {(!isPrintMode ||
                            selectedPrintSections.includes("details")) && (
                            <div
                                id="details"
                                ref={sectionRefs.details}
                                className="scroll-mt-20"
                            >
                                <PropertyDetailsGrid
                                    details={details ?? null}
                                    property={property}
                                    isInOpportunityZone={
                                        property.is_in_opportunity_zone
                                    }
                                />
                            </div>
                        )}

                        {/* About Property Section */}
                        {(!isPrintMode ||
                            selectedPrintSections.includes("description")) && (
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
                        )}

                        {/* Investment Highlights Section */}
                        {(!isPrintMode ||
                            selectedPrintSections.includes("highlights")) && (
                            <div id="highlights" className="scroll-mt-20">
                                <PropertyInvestmentHighlights
                                    investmentHighlights={
                                        property.details?.investment_highlights
                                    }
                                />
                            </div>
                        )}

                        {/* Map Section */}
                        {(!isPrintMode ||
                            selectedPrintSections.includes("map")) && (
                            <div
                                id="map"
                                ref={sectionRefs.map}
                                className="scroll-mt-20 print-section"
                                data-print-section
                            >
                                <PropertyLocationMap
                                    mapUrl={mapUrl}
                                    fullAddress={fullAddress}
                                />
                            </div>
                        )}

                        {/* Climate Risk Section */}
                        {(!isPrintMode ||
                            selectedPrintSections.includes("climate-risk")) && (
                            <div
                                id="climate"
                                ref={sectionRefs.climate}
                                className="scroll-mt-20"
                            >
                                <ClimateRisk />
                            </div>
                        )}

                        {/* Property History Section */}
                        {(!isPrintMode ||
                            selectedPrintSections.includes(
                                "property-history"
                            )) && (
                            <div
                                id="history"
                                ref={sectionRefs.history}
                                className="scroll-mt-20"
                            >
                                {/* <PropertyHistory /> */}
                            </div>
                        )}

                        {/* Demographics Section */}
                        {(!isPrintMode ||
                            selectedPrintSections.includes("demographics")) && (
                            <div
                                id="demographics"
                                ref={sectionRefs.demographics}
                                className="scroll-mt-20"
                            >
                                <Demographics />
                            </div>
                        )}

                        {/* Valuation Calculator Section */}
                        {(!isPrintMode ||
                            selectedPrintSections.includes(
                                "valuation-calculator"
                            )) && (
                            <div
                                id="valuation"
                                ref={sectionRefs.valuation}
                                className="scroll-mt-20"
                            >
                                {/* <ValuationCalculator /> */}
                            </div>
                        )}

                        {/* Location Insights Section */}
                        {(!isPrintMode ||
                            selectedPrintSections.includes(
                                "additional-information"
                            )) && (
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
                        )}

                        {/* Similar Properties Section */}
                        {(!isPrintMode ||
                            selectedPrintSections.includes(
                                "similar-properties"
                            )) && (
                            <div className="scroll-mt-20">
                                <SimilarProperties
                                    properties={similarProperties}
                                    currentPropertyId={property.id}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
