import { useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Camera,
    Printer,
    Share2,
    Heart,
    MapPin,
    Eye,
} from "lucide-react";
import { Property } from "../../types";
import ImageGallery from "./ImageGallery";

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
    onViewMap: () => void;
    onViewStreetView: () => void;
}

export default function PropertyOverview({
    property,
    images,
    formattedPrice,
    fullAddress,
    onViewMap,
    onViewStreetView,
}: PropertyOverviewProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

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

    // Extract tenant/brand from property name or use dummy
    const tenantBrand = property.name.includes("-")
        ? property.name.split("-")[0].trim()
        : property.name;

    // Calculate remaining lease term (dummy for now)
    const leaseExpiration =
        property.details?.summary_details?.lease_expiration || "02/29/2028";
    const remainingTerm =
        property.details?.summary_details?.remaining_term || "3.8";

    return (
        <div className="mb-8">
            {/* Title Section */}
            <div className="flex items-start justify-between mb-6 pb-4 border-b border-gray-200">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                        {fullAddress}
                    </h1>
                    <p className="text-base text-gray-600">
                        {tenantBrand} - {property.location?.city || ""},{" "}
                        {property.location?.state_code || ""}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        className="p-2 text-gray-600 hover:text-[#0066CC] hover:bg-blue-50 rounded-lg transition-colors"
                        aria-label="Print"
                    >
                        <Printer className="w-5 h-5" />
                    </button>
                    <button
                        className="p-2 text-gray-600 hover:text-[#0066CC] hover:bg-blue-50 rounded-lg transition-colors"
                        aria-label="Share"
                    >
                        <Share2 className="w-5 h-5" />
                    </button>
                    <button
                        className="p-2 text-gray-600 hover:text-[#0066CC] hover:bg-blue-50 rounded-lg transition-colors"
                        aria-label="Save"
                    >
                        <Heart className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: Main Image */}
                <div className="flex flex-col">
                    <div className="relative h-[450px] rounded-lg overflow-hidden bg-gray-100 mb-4">
                        <img
                            src={getImageUrl(selectedImageIndex)}
                            alt={property.name}
                            className="w-full h-full object-cover"
                        />
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white rounded-full p-2.5 shadow-lg transition-all z-10"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white rounded-full p-2.5 shadow-lg transition-all z-10"
                                    aria-label="Next image"
                                >
                                    <ChevronRight className="w-5 h-5 text-gray-700" />
                                </button>
                            </>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onViewMap}
                            className="flex items-center gap-2 px-4 py-2 bg-[#0066CC] text-white rounded-lg hover:bg-[#0052A3] transition-colors text-sm font-medium shadow-sm hover:shadow-md"
                        >
                            <MapPin className="w-4 h-4" />
                            View Map
                        </button>
                        <button
                            onClick={onViewStreetView}
                            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors text-sm font-medium shadow-sm hover:shadow-md"
                        >
                            <Eye className="w-4 h-4" />
                            Street View
                        </button>
                        <button
                            onClick={() => setIsGalleryOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#0066CC] text-[#0066CC] rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium shadow-sm hover:shadow-md"
                        >
                            <Camera className="w-4 h-4" />
                            {images.length} Photos
                        </button>
                    </div>
                </div>

                {/* Right: Property Details */}
                <div className="flex flex-col">
                    {/* Price and Action Buttons Card */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-4 overflow-hidden">
                        {/* First Row: Price and Info */}
                        <div className="px-5 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="text-2xl font-bold text-gray-900">
                                    {formattedPrice}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">
                                            {daysOnMarket}
                                        </span>
                                        <span className="text-gray-400">
                                            days on market
                                        </span>
                                    </div>
                                    <div className="w-px h-4 bg-gray-300"></div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">
                                            Updated
                                        </span>
                                        <span>{daysSinceUpdate} days ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Second Row: Action Buttons */}
                        <div className="px-5 py-4 flex items-center gap-3">
                            <button className="flex-1 px-6 py-2.5 bg-[#0066CC] text-white rounded-lg hover:bg-[#0052A3] transition-colors text-sm font-medium shadow-sm hover:shadow-md">
                                Request Info
                            </button>
                            <button className="flex-1 px-6 py-2.5 bg-white border-2 border-[#0066CC] text-[#0066CC] rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium shadow-sm hover:shadow-md">
                                View OM
                            </button>
                        </div>
                    </div>

                    {/* At A Glance Section - Compact with Essential Info Only */}
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm flex-1 flex flex-col h-[450px]">
                        <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
                            <h3 className="text-base font-semibold text-gray-900">
                                At A Glance
                            </h3>
                        </div>

                        <div className="grid grid-cols-2 divide-x divide-gray-200 flex-1 overflow-hidden">
                            {/* Left Column */}
                            <div className="flex flex-col">
                                <div className="p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors flex-1 flex flex-col justify-center">
                                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                        Property Type
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900">
                                        {property.types?.[0] || "Retail"}
                                    </div>
                                </div>

                                <div className="p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors flex-1 flex flex-col justify-center">
                                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                        Square Footage
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900">
                                        {property.details?.summary_details
                                            ?.building_size ||
                                            property.details?.summary_details
                                                ?.square_footage ||
                                            "14,560"}{" "}
                                        SF
                                    </div>
                                </div>

                                <div className="p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors flex-1 flex flex-col justify-center">
                                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                        Cap Rate
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900">
                                        {property.details?.summary_details
                                            ?.cap_rate || "8.00"}
                                        %
                                    </div>
                                </div>

                                <div className="p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors flex-1 flex flex-col justify-center">
                                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                        NOI
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900">
                                        $
                                        {property.details?.summary_details
                                            ?.noi || "298,000"}
                                    </div>
                                </div>

                                <div className="p-3 hover:bg-gray-50 transition-colors flex-1 flex flex-col justify-center">
                                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                        Lease Type
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900">
                                        {property.details?.summary_details
                                            ?.lease_type || "NNN"}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="flex flex-col">
                                <div className="p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors flex-1 flex flex-col justify-center">
                                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                        Brand/Tenant
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900">
                                        {tenantBrand}
                                    </div>
                                </div>

                                <div className="p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors flex-1 flex flex-col justify-center">
                                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                        Remaining Term
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900">
                                        {remainingTerm} years
                                    </div>
                                </div>

                                <div className="p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors flex-1 flex flex-col justify-center">
                                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                        Lease Expiration
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900">
                                        {leaseExpiration}
                                    </div>
                                </div>

                                <div className="p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors flex-1 flex flex-col justify-center">
                                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                        Occupancy
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900">
                                        {property.details?.summary_details
                                            ?.occupancy || "100"}
                                        %
                                    </div>
                                </div>

                                <div className="p-3 hover:bg-gray-50 transition-colors flex-1 flex flex-col justify-center">
                                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                        Tenancy
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900">
                                        Single
                                    </div>
                                </div>
                            </div>
                        </div>
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
