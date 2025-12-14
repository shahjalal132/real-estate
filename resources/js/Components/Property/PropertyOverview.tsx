import { useState, useEffect } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Camera,
    MapPin,
    Eye,
    Loader2,
    ChevronRight as ChevronRightIcon,
} from "lucide-react";
import { Property } from "../../types";
import ImageGallery from "./ImageGallery";
import AtAGlance from "./AtAGlance";
import MokAiFacts from "./MokAiFacts";
import NotesButton from "./NotesButton";
import ShareButton from "./ShareButton";
import SaveButton from "./SaveButton";
import PrintButton from "./PrintButton";

interface ExtendedPropertyImage {
    id: number | string;
    url: string;
    position: number;
    is_thumbnail: boolean;
    isPlaceholder?: boolean;
}

interface PropertyOverviewProps {
    property: Property;
    images: ExtendedPropertyImage[];
    formattedPrice: string;
    fullAddress: string;
    onViewMap?: () => void;
    onViewStreetView?: () => void;
    mapUrl?: string | null;
    onPrintClick?: () => void;
    showAtAGlance?: boolean;
}

export default function PropertyOverview({
    property,
    images,
    formattedPrice,
    fullAddress,
    onViewMap,
    onViewStreetView,
    mapUrl,
    onPrintClick,
    showAtAGlance = true,
}: PropertyOverviewProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [viewMode, setViewMode] = useState<"image" | "map" | "street">(
        "image"
    );
    const [isMapLoading, setIsMapLoading] = useState(false);
    const [isStreetViewLoading, setIsStreetViewLoading] = useState(false);
    const [mapError, setMapError] = useState(false);
    const [streetViewError, setStreetViewError] = useState(false);

    const getImageUrl = (index: number): string => {
        const image = images[index];
        if (image && !image.isPlaceholder) {
            return image.url;
        }
        return property.thumbnail_url ?? "/assets/images/placeholder.png";
    };

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

    const daysOnMarket = property.activated_on
        ? Math.floor(
              (new Date().getTime() -
                  new Date(property.activated_on).getTime()) /
                  (1000 * 60 * 60 * 24)
          )
        : 0;

    const daysSinceUpdate = property.external_updated_on
        ? Math.floor(
              (new Date().getTime() -
                  new Date(property.external_updated_on).getTime()) /
                  (1000 * 60 * 60 * 24)
          )
        : 0;

    // Extract property name (business name or property name)
    const propertyName = property.name || "Property";

    // Get map URL if not provided
    const getMapUrl = (): string | null => {
        if (mapUrl) return mapUrl;

        const location = property.location;
        if (!location) return null;

        const standardUrl = "https://www.google.com/maps";
        let standardQuery = "";

        if (location.latitude && location.longitude) {
            standardQuery = `${location.latitude},${location.longitude}`;
        } else if (location.full_address) {
            standardQuery = encodeURIComponent(location.full_address);
        } else {
            const address = `${location.address}, ${location.city}, ${location.state_code} ${location.zip}`;
            standardQuery = encodeURIComponent(address);
        }

        return `${standardUrl}?q=${standardQuery}&t=m&output=embed`;
    };

    const currentMapUrl = getMapUrl();

    // Get street view URL for iframe
    const getStreetViewUrl = (): string | null => {
        const location = property.location;
        if (!location || !location.latitude || !location.longitude) return null;

        // Use Google Street View embed URL
        return `https://www.google.com/maps/embed/v1/streetview?key=AIzaSyBFw0Qbyq9zTFTd-tUY6d-s6M4&location=${location.latitude},${location.longitude}`;
    };

    const streetViewUrl = getStreetViewUrl();

    // Set loading state when switching to map or street view
    useEffect(() => {
        if (viewMode === "map" && currentMapUrl) {
            setIsMapLoading(true);
            setMapError(false);
        } else if (viewMode === "street" && streetViewUrl) {
            setIsStreetViewLoading(true);
            setStreetViewError(false);
        }
    }, [viewMode, currentMapUrl, streetViewUrl]);

    const handleViewMap = () => {
        setViewMode("map");
        setIsMapLoading(true);
        setMapError(false);
        onViewMap?.();
    };

    const handleViewStreetView = () => {
        setViewMode("street");
        setIsStreetViewLoading(true);
        setStreetViewError(false);
        onViewStreetView?.();
    };

    const handleViewImage = () => {
        setViewMode("image");
    };

    return (
        <div className="mb-2">
            {/* Title Section */}
            <div className="flex items-start justify-between pt-3 md:py-[15px]">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900 font-literata">
                        {fullAddress}
                    </h1>
                    <p className="text-[15px] font-normal text-gray-700">{propertyName}</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <NotesButton propertyId={property.id} />
                    <PrintButton onPrintClick={onPrintClick || (() => {})} />
                    <ShareButton
                        property={property}
                        propertyImage={getImageUrl(selectedImageIndex)}
                    />
                    <SaveButton
                        property={property}
                        propertyImage={getImageUrl(selectedImageIndex)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Left: Main Image/Map/Street View */}
                <div className="flex flex-col">
                    <div className="relative h-[450px] rounded-xl overflow-hidden bg-gray-100 mb-4">
                        {/* Image View */}
                        {viewMode === "image" && (
                            <>
                                <img
                                    src={getImageUrl(selectedImageIndex)}
                                    alt={property.name}
                                    className="w-full h-full object-cover"
                                />
                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white rounded-full p-2.5 shadow-lg transition-all z-10 print:hidden"
                                            aria-label="Previous image"
                                        >
                                            <ChevronLeft className="w-5 h-5 text-gray-700" />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white rounded-full p-2.5 shadow-lg transition-all z-10 print:hidden"
                                            aria-label="Next image"
                                        >
                                            <ChevronRight className="w-5 h-5 text-gray-700" />
                                        </button>
                                        {/* Large right arrow indicator */}
                                    </>
                                )}
                            </>
                        )}

                        {/* Map View */}
                        {viewMode === "map" && currentMapUrl && (
                            <>
                                {isMapLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                                        <div className="flex flex-col items-center gap-3">
                                            <Loader2 className="w-8 h-8 text-[#0066CC] animate-spin" />
                                            <p className="text-sm text-gray-600">
                                                Loading map...
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {mapError && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                                        <div className="flex flex-col items-center gap-3">
                                            <MapPin className="w-8 h-8 text-gray-400" />
                                            <p className="text-sm text-gray-600">
                                                Unable to load map
                                            </p>
                                        </div>
                                    </div>
                                )}
                                <iframe
                                    src={currentMapUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="eager"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="w-full h-full print-section"
                                    data-print-keep
                                    onLoad={() => setIsMapLoading(false)}
                                    onError={() => {
                                        setIsMapLoading(false);
                                        setMapError(true);
                                    }}
                                />
                            </>
                        )}

                        {/* Street View */}
                        {viewMode === "street" && streetViewUrl && (
                            <>
                                {isStreetViewLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                                        <div className="flex flex-col items-center gap-3">
                                            <Loader2 className="w-8 h-8 text-[#0066CC] animate-spin" />
                                            <p className="text-sm text-gray-600">
                                                Loading street view...
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {streetViewError && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                                        <div className="flex flex-col items-center gap-3">
                                            <Eye className="w-8 h-8 text-gray-400" />
                                            <p className="text-sm text-gray-600">
                                                Unable to load street view
                                            </p>
                                        </div>
                                    </div>
                                )}
                                <iframe
                                    src={streetViewUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="eager"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="w-full h-full print-section"
                                    data-print-keep
                                    onLoad={() => setIsStreetViewLoading(false)}
                                    onError={() => {
                                        setIsStreetViewLoading(false);
                                        setStreetViewError(true);
                                    }}
                                />
                            </>
                        )}

                        {/* Buttons Overlay - Bottom */}
                        <div className="absolute bottom-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 z-20 print:hidden">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleViewMap}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium shadow-sm hover:shadow-md ${
                                        viewMode === "map"
                                            ? "bg-[#0066CC] text-white"
                                            : "bg-white/90 hover:bg-white text-gray-700"
                                    }`}
                                >
                                    <MapPin className="w-4 h-4" />
                                    View Map
                                </button>
                                <button
                                    onClick={handleViewStreetView}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium shadow-sm hover:shadow-md ${
                                        viewMode === "street"
                                            ? "bg-[#0066CC] text-white"
                                            : "bg-white/90 hover:bg-white text-gray-700"
                                    }`}
                                >
                                    <Eye className="w-4 h-4" />
                                    Street View
                                </button>
                                <button
                                    onClick={() => {
                                        setIsGalleryOpen(true);
                                        setViewMode("image");
                                    }}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium shadow-sm hover:shadow-md ${
                                        viewMode === "image"
                                            ? "bg-[#0066CC] text-white"
                                            : "bg-white/90 hover:bg-white text-[#0066CC] border-2 border-[#0066CC]"
                                    }`}
                                >
                                    <Camera className="w-4 h-4" />
                                    {images.length} Photos
                                    <ChevronRightIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Back to Image button when viewing map/street */}
                        {viewMode !== "image" && (
                            <button
                                onClick={handleViewImage}
                                className="absolute top-4 left-4 bg-white/95 hover:bg-white rounded-lg px-4 py-2 shadow-lg transition-all z-30 flex items-center gap-2 text-sm font-medium text-gray-700 print:hidden"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Back to Photos
                            </button>
                        )}
                    </div>
                </div>

                {/* Right: Property Details */}
                <div className="flex flex-col">
                    {/* Price and Action Buttons Card */}
                    <div className="bg-white border border-gray-200 rounded-lg mb-2 overflow-hidden">
                        {/* First Row: Price and Info */}
                        <div className="px-5 py-2">
                            <div className="flex items-center justify-start gap-4">
                                <div className="text-lg font-normal text-gray-900 border-r border-gray-300 pr-4">
                                    {formattedPrice}
                                </div>
                                <div className="flex items-center gap-3 text-[15px] font-normal text-gray-800">
                                    <span>{daysOnMarket} days on market</span>
                                    <div className="w-px h-4 bg-gray-300"></div>
                                    <span>
                                        Updated {daysSinceUpdate} days ago
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* Second Row: Action Buttons */}
                        <div className="px-5 py-3 flex items-center gap-2">
                            <button className="px-2 py-2 border border-transparent bg-[#0066CC] text-white rounded-sm text-xs font-medium cursor-pointer ">
                                Request Info
                            </button>
                            <button className="px-2 py-2 bg-white border border-[#0066CC] text-[#0066CC] rounded-sm hover:bg-blue-50 transition-colors text-xs font-medium cursor-pointer">
                                View Flyer
                            </button>
                        </div>
                    </div>

                    {/* At A Glance Section */}
                    {showAtAGlance && <AtAGlance property={property} />}
                    <div className="my-2">
                    {/* Mok.Ai Facts Section */}
                    {showAtAGlance && <MokAiFacts property={property} />}
                    </div>
                </div>
            </div>

            {/* Image Gallery Modal */}
            <ImageGallery
                images={images}
                isOpen={isGalleryOpen}
                initialIndex={selectedImageIndex}
                onClose={() => setIsGalleryOpen(false)}
                getImageUrl={getImageUrl}
                propertyName={property.name}
            />
        </div>
    );
}
