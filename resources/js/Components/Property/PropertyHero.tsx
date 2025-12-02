import { useState } from "react";
import {
    Camera,
    MapPin,
    Globe,
    ChevronLeft,
    ChevronRight,
    X,
} from "lucide-react";

interface ExtendedPropertyImage {
    id: number | string;
    url: string;
    position: number;
    is_thumbnail: boolean;
    isPlaceholder?: boolean;
}

interface PropertyHeroProps {
    images: ExtendedPropertyImage[];
    mapUrl: string | null;
    propertyName: string;
    thumbnailUrl?: string | null;
}

type ViewMode = "images" | "map" | "satellite";

export default function PropertyHero({
    images,
    mapUrl,
    propertyName,
    thumbnailUrl,
}: PropertyHeroProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [viewMode, setViewMode] = useState<ViewMode>("images");

    const getImageUrl = (index: number): string => {
        const image = images[index];
        if (image && !image.isPlaceholder) {
            return image.url;
        }
        if (image?.isPlaceholder) {
            return "/assets/images/placeholder.png";
        }
        return thumbnailUrl ?? "/assets/images/placeholder.png";
    };

    const getVisibleImages = () => {
        const total = images.length;
        if (total === 0) return [];
        if (total === 1) return [0];
        if (total === 2)
            return [selectedImageIndex, selectedImageIndex === 0 ? 1 : 0];

        const prev =
            selectedImageIndex === 0 ? total - 1 : selectedImageIndex - 1;
        const next =
            selectedImageIndex === total - 1 ? 0 : selectedImageIndex + 1;
        return [prev, selectedImageIndex, next];
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

    const getMapUrlWithType = (type: "roadmap" | "satellite") => {
        if (!mapUrl) return null;
        const baseUrl = mapUrl.includes("&t=")
            ? mapUrl.replace(/&t=[kmh]/, "")
            : mapUrl;
        const tParam = type === "satellite" ? "&t=k" : "&t=m";
        return baseUrl + tParam;
    };

    const visibleIndices = getVisibleImages();
    const hasMultipleImages = images.length > 1;

    return (
        <div className="relative w-full bg-white">
            {/* Content Area */}
            <div className="w-[95%] max-w-full mx-auto px-4 sm:px-6 lg:px-2 py-6">
                {viewMode === "images" ? (
                    <>
                        {images.length > 0 ? (
                            <div className="relative">
                                {/* Main Image Display */}
                                <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#0066CC]/20">
                                    <img
                                        src={getImageUrl(selectedImageIndex)}
                                        alt={`${propertyName} - Image ${
                                            selectedImageIndex + 1
                                        }`}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                                    {/* Navigation Arrows */}
                                    {hasMultipleImages && (
                                        <>
                                            <button
                                                onClick={prevImage}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/95 hover:bg-[#0066CC] text-[#0066CC] hover:text-white rounded-full p-3 shadow-xl transition-all hover:scale-110 border-2 border-[#0066CC]"
                                                aria-label="Previous image"
                                            >
                                                <ChevronLeft className="w-6 h-6" />
                                            </button>
                                            <button
                                                onClick={nextImage}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/95 hover:bg-[#0066CC] text-[#0066CC] hover:text-white rounded-full p-3 shadow-xl transition-all hover:scale-110 border-2 border-[#0066CC]"
                                                aria-label="Next image"
                                            >
                                                <ChevronRight className="w-6 h-6" />
                                            </button>
                                        </>
                                    )}

                                    {/* Image Counter */}
                                    {hasMultipleImages && (
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-full px-6 py-2 shadow-xl border-2 border-[#0066CC] z-20">
                                            <span className="text-sm font-semibold text-[#0066CC]">
                                                {selectedImageIndex + 1} /{" "}
                                                {images.length}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Thumbnail Strip */}
                                {hasMultipleImages && images.length > 1 && (
                                    <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                        {images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() =>
                                                    setSelectedImageIndex(index)
                                                }
                                                className={`relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                                                    index === selectedImageIndex
                                                        ? "border-[#0066CC] ring-2 ring-[#0066CC] ring-offset-2 scale-105"
                                                        : "border-gray-200 hover:border-[#0066CC]/50 opacity-70 hover:opacity-100"
                                                }`}
                                                aria-label={`View image ${
                                                    index + 1
                                                }`}
                                            >
                                                <img
                                                    src={getImageUrl(index)}
                                                    alt={`Thumbnail ${
                                                        index + 1
                                                    }`}
                                                    className="w-full h-full object-cover"
                                                />
                                                {index ===
                                                    selectedImageIndex && (
                                                    <div className="absolute inset-0 bg-[#0066CC]/20" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-xl border-2 border-[#0066CC]/20">
                                <img
                                    src={
                                        thumbnailUrl ||
                                        "/assets/images/placeholder.png"
                                    }
                                    alt={propertyName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="relative h-[500px] sm:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#0066CC]/20">
                        {mapUrl && (
                            <iframe
                                key={viewMode}
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                style={{ border: 0 }}
                                src={
                                    getMapUrlWithType(
                                        viewMode === "satellite"
                                            ? "satellite"
                                            : "roadmap"
                                    ) || ""
                                }
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Property Location"
                                className="w-full h-full"
                            />
                        )}
                    </div>
                )}
            </div>
            {/* View Mode Tabs - Always Visible at Top */}
            <div className="w-full py-4 bg-blue-600/95 backdrop-blur-sm border-t border-b ">
                <div className="w-[95%] max-w-full mx-auto px-4 sm:px-6 lg:px-2">
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                        <button
                            onClick={() => setViewMode("images")}
                            className={`flex items-center gap-2 rounded-lg px-6 py-2.5 font-semibold text-sm transition-all ${
                                viewMode === "images"
                                    ? "bg-white text-[#0066CC] shadow-lg scale-105"
                                    : "text-white/90 hover:text-white hover:bg-white/10"
                            }`}
                        >
                            <Camera className="h-5 w-5" />
                            <span className="whitespace-nowrap">
                                Photos ({images.length})
                            </span>
                        </button>

                        {mapUrl && (
                            <>
                                <button
                                    onClick={() => setViewMode("map")}
                                    className={`flex items-center gap-2 rounded-lg px-6 py-2.5 font-semibold text-sm transition-all ${
                                        viewMode === "map"
                                            ? "bg-white text-[#0066CC] shadow-lg scale-105"
                                            : "text-white/90 hover:text-white hover:bg-white/10"
                                    }`}
                                >
                                    <MapPin className="h-5 w-5" />
                                    <span className="whitespace-nowrap">
                                        Map View
                                    </span>
                                </button>

                                <button
                                    onClick={() => setViewMode("satellite")}
                                    className={`flex items-center gap-2 rounded-lg px-6 py-2.5 font-semibold text-sm transition-all ${
                                        viewMode === "satellite"
                                            ? "bg-white text-[#0066CC] shadow-lg scale-105"
                                            : "text-white/90 hover:text-white hover:bg-white/10"
                                    }`}
                                >
                                    <Globe className="h-5 w-5" />
                                    <span className="whitespace-nowrap">
                                        Satellite View
                                    </span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
