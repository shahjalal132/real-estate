import { usePage } from "@inertiajs/react";
import AppLayout from "../../Layouts/AppLayout";
import { Property } from "../../../types";
import {
    MapPin,
    DollarSign,
    Home,
    Building2,
    Camera,
    Video,
    FileText,
    Globe,
    Phone,
    Mail,
    ExternalLink,
    Star,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    Share2,
    Heart,
    ArrowLeft,
} from "lucide-react";
import { useState } from "react";
import { Link } from "@inertiajs/react";
import { PageProps as InertiaPageProps } from "../../../types";

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
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [mapViewType, setMapViewType] = useState<
        "roadmap" | "satellite" | "hybrid"
    >("roadmap");
    const [showMap, setShowMap] = useState(false);

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
            // Return placeholder image object
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

    // Build map URL with view type
    const getMapUrl = (
        viewType: "roadmap" | "satellite" | "hybrid" = "roadmap"
    ): string | null => {
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

        // Use t parameter for map type: k=satellite, h=hybrid, m=roadmap
        const tParam =
            viewType === "satellite"
                ? "&t=k"
                : viewType === "hybrid"
                ? "&t=h"
                : "&t=m";
        return `${standardUrl}?q=${standardQuery}${tParam}&output=embed`;
    };

    const mapUrl = getMapUrl(mapViewType);

    // Get full address
    const fullAddress =
        location?.full_address ||
        (location
            ? `${location.address}, ${location.city}, ${location.state_name} ${location.zip}`
            : "Address not available");

    const nextImage = () => {
        setSelectedImageIndex((prev) =>
            prev < images.length - 1 ? prev + 1 : 0
        );
    };

    const prevImage = () => {
        setSelectedImageIndex((prev) =>
            prev > 0 ? prev - 1 : images.length - 1
        );
    };

    // Get current image URL (with fallback)
    const getCurrentImageUrl = (): string => {
        const currentImage = images[selectedImageIndex];
        if (currentImage && !currentImage.isPlaceholder) {
            return currentImage.url;
        }
        if (currentImage?.isPlaceholder) {
            return "/assets/images/placeholder.png";
        }
        return property.thumbnail_url ?? "/assets/images/placeholder.png";
    };

    return (
        <AppLayout title={property.name}>
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                {/* Hero Section with Main Image or Map */}
                <div className="relative w-full h-[450px] sm:h-[550px] lg:h-[650px] bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
                    {!showMap ? (
                        // Image Slider View
                        <>
                            {images.length > 0 ? (
                                <>
                                    <div className="absolute inset-0">
                                        <img
                                            src={getCurrentImageUrl()}
                                            alt={property.name}
                                            className="w-full h-full object-cover transition-opacity duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                    </div>

                                    {/* Navigation Overlay */}
                                    {images.length > 1 && (
                                        <>
                                            <button
                                                onClick={prevImage}
                                                className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-3 shadow-xl transition-all hover:scale-110 z-10"
                                                aria-label="Previous image"
                                            >
                                                <ChevronLeft className="w-6 h-6 text-gray-900" />
                                            </button>
                                            <button
                                                onClick={nextImage}
                                                className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-3 shadow-xl transition-all hover:scale-110 z-10"
                                                aria-label="Next image"
                                            >
                                                <ChevronRight className="w-6 h-6 text-gray-900" />
                                            </button>

                                            {/* Image Counter */}
                                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
                                                {selectedImageIndex + 1} /{" "}
                                                {images.length}
                                            </div>

                                            {/* Dots Indicator */}
                                            <div className="absolute bottom-6 right-6 flex gap-2">
                                                {images
                                                    .slice(0, 5)
                                                    .map((_, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() =>
                                                                setSelectedImageIndex(
                                                                    index
                                                                )
                                                            }
                                                            className={`h-2 rounded-full transition-all ${
                                                                index ===
                                                                selectedImageIndex
                                                                    ? "w-8 bg-white"
                                                                    : "w-2 bg-white/50 hover:bg-white/75"
                                                            }`}
                                                            aria-label={`Go to image ${
                                                                index + 1
                                                            }`}
                                                        />
                                                    ))}
                                                {images.length > 5 && (
                                                    <span className="text-white text-xs px-2">
                                                        +{images.length - 5}
                                                    </span>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </>
                            ) : (
                                <div className="absolute inset-0">
                                    <img
                                        src={
                                            property.thumbnail_url ||
                                            "/assets/images/placeholder.png"
                                        }
                                        alt={property.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                </div>
                            )}

                            {/* Header Content Overlay */}
                            {/* <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12 text-white z-10">
                                <div className="w-[95%] max-w-full mx-auto px-4 sm:px-6 lg:px-2">
                                    <Link
                                        href="/properties"
                                        className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 text-sm font-medium transition-colors"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Back to Properties
                                    </Link>

                                    <div className="flex flex-wrap items-center gap-3 mb-4">
                                        {property.types?.map((type, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex rounded-full bg-[#1f93ff]/90 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold text-white shadow-lg"
                                            >
                                                {type}
                                            </span>
                                        ))}
                                        {property.status && (
                                            <span
                                                className={`inline-flex rounded-full px-4 py-1.5 text-sm font-semibold backdrop-blur-sm shadow-lg ${
                                                    property.status === "Sold"
                                                        ? "bg-red-500/90 text-white"
                                                        : property.status ===
                                                          "On-Market"
                                                        ? "bg-green-500/90 text-white"
                                                        : "bg-gray-500/90 text-white"
                                                }`}
                                            >
                                                {property.status}
                                            </span>
                                        )}
                                    </div>

                                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
                                        {property.name}
                                    </h1>

                                    <div className="flex flex-wrap items-center gap-4 text-white/90">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-5 w-5" />
                                            <span className="text-lg">
                                                {fullAddress}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </>
                    ) : (
                        // Map View
                        <>
                            {mapUrl && (
                                <div className="absolute inset-0">
                                    <iframe
                                        key={mapViewType}
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        style={{ border: 0 }}
                                        src={mapUrl}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Property Location"
                                        className="w-full h-full"
                                    />
                                </div>
                            )}
                            {/* Back button overlay */}
                            <div className="absolute top-6 left-6 z-10">
                                <button
                                    onClick={() => setShowMap(false)}
                                    className="inline-flex items-center gap-2 bg-white/90 hover:bg-white backdrop-blur-sm rounded-lg px-4 py-2 text-gray-900 text-sm font-medium transition-all shadow-lg"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Photos
                                </button>
                            </div>
                        </>
                    )}

                    {/* Option Cards at Bottom - Positioned above header content for visibility */}
                    <div className="absolute bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 z-30">
                        <div className="flex items-center gap-3 flex-wrap justify-center">
                            {/* Photos Count Card */}
                            <button
                                onClick={() => setShowMap(false)}
                                className={`bg-white rounded-lg px-4 py-3 shadow-xl transition-all hover:shadow-2xl hover:scale-105 ${
                                    !showMap
                                        ? "ring-2 ring-blue-500 ring-offset-2"
                                        : "hover:ring-2 hover:ring-gray-300"
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <Camera className="h-5 w-5 text-gray-600" />
                                    <span className="text-gray-700 font-medium text-sm whitespace-nowrap">
                                        {images.length}{" "}
                                        {images.length === 1
                                            ? "Photo"
                                            : "Photos"}
                                    </span>
                                </div>
                            </button>

                            {/* Map View Card */}
                            {mapUrl && (
                                <button
                                    onClick={() => {
                                        setMapViewType("roadmap");
                                        setShowMap(true);
                                    }}
                                    className={`bg-white rounded-lg px-4 py-3 shadow-xl transition-all hover:shadow-2xl hover:scale-105 ${
                                        showMap && mapViewType === "roadmap"
                                            ? "ring-2 ring-blue-500 ring-offset-2"
                                            : "hover:ring-2 hover:ring-gray-300"
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-gray-600" />
                                        <span className="text-gray-700 font-medium text-sm whitespace-nowrap">
                                            Map
                                        </span>
                                    </div>
                                </button>
                            )}

                            {/* Satellite View Card */}
                            {mapUrl && (
                                <button
                                    onClick={() => {
                                        setMapViewType("satellite");
                                        setShowMap(true);
                                    }}
                                    className={`bg-white rounded-lg px-4 py-3 shadow-xl transition-all hover:shadow-2xl hover:scale-105 ${
                                        showMap && mapViewType === "satellite"
                                            ? "ring-2 ring-blue-500 ring-offset-2"
                                            : "hover:ring-2 hover:ring-gray-300"
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <Globe className="h-5 w-5 text-gray-600" />
                                        <span className="text-gray-700 font-medium text-sm whitespace-nowrap">
                                            Satellite
                                        </span>
                                    </div>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="w-[95%] max-w-full mx-auto px-4 sm:px-6 lg:px-2 -mt-20 relative z-20">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Property Info Card */}
                            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                                <div className="flex flex-col gap-6">
                                    {/* Property Title and Location */}
                                    <div>
                                        <div className="flex flex-wrap items-center gap-3 mb-4">
                                            {property.types?.map(
                                                (type, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-flex rounded-full bg-blue-100 text-blue-800 px-4 py-1.5 text-sm font-semibold"
                                                    >
                                                        {type}
                                                    </span>
                                                )
                                            )}
                                            {property.status && (
                                                <span
                                                    className={`inline-flex rounded-full px-4 py-1.5 text-sm font-semibold ${
                                                        property.status ===
                                                        "Sold"
                                                            ? "bg-red-100 text-red-800"
                                                            : property.status ===
                                                              "On-Market"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-gray-100 text-gray-800"
                                                    }`}
                                                >
                                                    {property.status}
                                                </span>
                                            )}
                                        </div>
                                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                                            {property.name}
                                        </h1>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <MapPin className="h-5 w-5" />
                                            <span className="text-lg">
                                                {fullAddress}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Price and Actions */}
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-gray-200">
                                        <div>
                                            <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                                                Asking Price
                                            </p>
                                            <div className="text-5xl font-bold text-blue-900">
                                                {formattedPrice}
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold text-gray-700 transition-colors"
                                                aria-label="Share property"
                                            >
                                                <Share2 className="w-5 h-5" />
                                                Share
                                            </button>
                                            <button
                                                className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold text-gray-700 transition-colors"
                                                aria-label="Save property"
                                            >
                                                <Heart className="w-5 h-5" />
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Description */}
                            {(property.description ||
                                property.marketing_description) && (
                                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                        About This Property
                                    </h2>
                                    <div className="prose max-w-none prose-lg">
                                        {property.marketing_description ? (
                                            <div
                                                className="text-gray-700 leading-relaxed"
                                                dangerouslySetInnerHTML={{
                                                    __html: property.marketing_description,
                                                }}
                                            />
                                        ) : (
                                            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                                                {property.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Property Details */}
                            {details && (
                                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                        Property Details
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {details.lot_size_acres && (
                                            <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl">
                                                <div className="p-3 bg-blue-600 rounded-xl">
                                                    <Home className="h-6 w-6 text-white" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600 font-medium mb-1">
                                                        Lot Size
                                                    </p>
                                                    <p className="text-2xl font-bold text-gray-900">
                                                        {details.lot_size_acres}{" "}
                                                        acres
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                        {details.price_per_acre && (
                                            <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl">
                                                <div className="p-3 bg-green-600 rounded-xl">
                                                    <DollarSign className="h-6 w-6 text-white" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600 font-medium mb-1">
                                                        Price per Acre
                                                    </p>
                                                    <p className="text-2xl font-bold text-gray-900">
                                                        {details.price_per_acre}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                        {details.zoning && (
                                            <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl">
                                                <div className="p-3 bg-purple-600 rounded-xl">
                                                    <Building2 className="h-6 w-6 text-white" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600 font-medium mb-1">
                                                        Zoning
                                                    </p>
                                                    <p className="text-xl font-bold text-gray-900">
                                                        {details.zoning}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                        {property.is_in_opportunity_zone && (
                                            <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl">
                                                <div className="p-3 bg-amber-600 rounded-xl">
                                                    <CheckCircle className="h-6 w-6 text-white" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600 font-medium mb-1">
                                                        Opportunity Zone
                                                    </p>
                                                    <p className="text-xl font-bold text-gray-900">
                                                        Yes
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {details.summary_details &&
                                        Object.keys(details.summary_details)
                                            .length > 0 && (
                                            <div className="mt-8 pt-8 border-t border-gray-200">
                                                <h3 className="text-xl font-bold text-gray-900 mb-6">
                                                    Additional Details
                                                </h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    {Object.entries(
                                                        details.summary_details
                                                    ).map(([key, value]) => (
                                                        <div
                                                            key={key}
                                                            className="p-4 bg-gray-50 rounded-xl"
                                                        >
                                                            <p className="text-sm text-gray-500 font-medium capitalize mb-1">
                                                                {key.replace(
                                                                    /_/g,
                                                                    " "
                                                                )}
                                                            </p>
                                                            <p className="text-base font-semibold text-gray-900">
                                                                {String(value)}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                    {details.investment_highlights && (
                                        <div className="mt-8 pt-8 border-t border-gray-200">
                                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                                Investment Highlights
                                            </h3>
                                            <div
                                                className="text-gray-700 leading-relaxed prose max-w-none"
                                                dangerouslySetInnerHTML={{
                                                    __html: details.investment_highlights,
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Location Map Section (only show if not already displayed in hero) */}
                            {!showMap && mapUrl && (
                                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                                    <div className="p-6 border-b border-gray-200">
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            Location
                                        </h2>
                                        <p className="text-gray-600 mt-2">
                                            {fullAddress}
                                        </p>
                                    </div>
                                    <div className="w-full h-[500px] relative">
                                        <iframe
                                            key={mapViewType}
                                            width="100%"
                                            height="100%"
                                            frameBorder="0"
                                            style={{ border: 0 }}
                                            src={getMapUrl("roadmap") ?? ""}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title="Property Location"
                                            className="w-full h-full"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar - Sticky */}
                        <div className="lg:col-span-1">
                            <div className="lg:sticky lg:top-8 space-y-6">
                                {/* Quick Info Card */}
                                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                                        Quick Info
                                    </h3>
                                    <div className="space-y-5">
                                        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                                            <span className="text-gray-600 font-medium">
                                                Price
                                            </span>
                                            <span className="font-bold text-gray-900 text-lg">
                                                {formattedPrice}
                                            </span>
                                        </div>
                                        {details?.lot_size_acres && (
                                            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                                                <span className="text-gray-600 font-medium">
                                                    Lot Size
                                                </span>
                                                <span className="font-bold text-gray-900">
                                                    {details.lot_size_acres}{" "}
                                                    acres
                                                </span>
                                            </div>
                                        )}
                                        {property.status && (
                                            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                                                <span className="text-gray-600 font-medium">
                                                    Status
                                                </span>
                                                <span className="font-bold text-gray-900">
                                                    {property.status}
                                                </span>
                                            </div>
                                        )}
                                        {property.number_of_images > 0 && (
                                            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                                                <span className="text-gray-600 font-medium flex items-center gap-2">
                                                    <Camera className="h-4 w-4" />
                                                    Photos
                                                </span>
                                                <span className="font-bold text-gray-900">
                                                    {property.number_of_images}
                                                </span>
                                            </div>
                                        )}
                                        <div className="space-y-3">
                                            {property.has_video && (
                                                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                                                    <Video className="h-5 w-5 text-green-600" />
                                                    <span className="text-sm font-medium text-gray-700">
                                                        Video Available
                                                    </span>
                                                </div>
                                            )}
                                            {property.has_virtual_tour && (
                                                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                                                    <Globe className="h-5 w-5 text-blue-600" />
                                                    <span className="text-sm font-medium text-gray-700">
                                                        Virtual Tour Available
                                                    </span>
                                                </div>
                                            )}
                                            {property.has_flyer && (
                                                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                                                    <FileText className="h-5 w-5 text-purple-600" />
                                                    <span className="text-sm font-medium text-gray-700">
                                                        Flyer Available
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Brokers Card */}
                                {brokers.length > 0 && (
                                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-6">
                                            Listing Agents
                                        </h3>
                                        <div className="space-y-6">
                                            {brokers.map((broker) => (
                                                <div
                                                    key={broker.id}
                                                    className="pb-6 border-b border-gray-200 last:border-b-0 last:pb-0"
                                                >
                                                    <div className="flex items-start gap-4">
                                                        <div className="relative shrink-0">
                                                            <img
                                                                src={
                                                                    broker.thumbnail_url ??
                                                                    "/assets/images/broker.jpeg"
                                                                }
                                                                alt={
                                                                    broker.full_name
                                                                }
                                                                className="h-16 w-16 rounded-full object-cover ring-4 ring-gray-100"
                                                            />
                                                            {broker.is_platinum && (
                                                                <Star className="absolute -top-1 -right-1 h-6 w-6 fill-yellow-400 text-yellow-400 drop-shadow-lg" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="font-bold text-gray-900 text-lg mb-1">
                                                                {
                                                                    broker.full_name
                                                                }
                                                            </h4>
                                                            {broker.brokerage && (
                                                                <p className="text-sm text-gray-600 mb-3">
                                                                    {
                                                                        broker
                                                                            .brokerage
                                                                            .name
                                                                    }
                                                                </p>
                                                            )}
                                                            <div className="flex flex-col gap-2">
                                                                {broker.phone && (
                                                                    <a
                                                                        href={`tel:${broker.phone}`}
                                                                        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                                                    >
                                                                        <Phone className="h-4 w-4" />
                                                                        {
                                                                            broker.phone
                                                                        }
                                                                    </a>
                                                                )}
                                                                {broker.email && (
                                                                    <a
                                                                        href={`mailto:${broker.email}`}
                                                                        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                                                    >
                                                                        <Mail className="h-4 w-4" />
                                                                        {
                                                                            broker.email
                                                                        }
                                                                    </a>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* External Link */}
                                {property.external_url && (
                                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-6 text-white">
                                        <h3 className="text-xl font-bold mb-2">
                                            View on Crexi
                                        </h3>
                                        <p className="text-blue-100 text-sm mb-4">
                                            Get more details and contact
                                            information
                                        </p>
                                        <a
                                            href={property.external_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 w-full bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-4 rounded-xl transition-colors"
                                        >
                                            <ExternalLink className="h-5 w-5" />
                                            Visit Crexi
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
