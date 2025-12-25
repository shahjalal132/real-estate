import { Heart, CheckSquare, Info, Star } from "lucide-react";
import { Link } from "@inertiajs/react";
import { TennentLocation } from "../../types";

interface LocationsGalleryViewProps {
    locations: TennentLocation[];
    onLocationClick?: (location: TennentLocation) => void;
}

export default function LocationsGalleryView({
    locations,
    onLocationClick,
}: LocationsGalleryViewProps) {
    const formatSF = (sf: string | number | null | undefined): string => {
        if (sf === null || sf === undefined) return "—";
        const num = typeof sf === "string" ? parseFloat(sf) : sf;
        if (isNaN(num)) return "—";
        if (num >= 1000000) {
            return `${(num / 1000000).toFixed(1)}M`;
        }
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}K`;
        }
        return num.toLocaleString();
    };

    const formatDate = (date: string | null | undefined): string => {
        if (!date) return "—";
        try {
            return new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
            });
        } catch {
            return "—";
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
            {locations.map((location) => {
                const imageUrl = `https://via.placeholder.com/400x300?text=${encodeURIComponent(location.building_name || location.address || "Location")}`;

                return (
                    <div
                        key={location.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                        onClick={() => onLocationClick?.(location)}
                    >
                        {/* Image Section */}
                        <div className="relative h-64 bg-gray-200">
                            <img
                                src={imageUrl}
                                alt={location.building_name || location.address || "Location"}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                            {/* Action Icons */}
                            <div className="absolute top-3 right-3 flex gap-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                    className="bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-colors"
                                >
                                    <Heart className="h-4 w-4 text-gray-700" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                    className="bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-colors"
                                >
                                    <CheckSquare className="h-4 w-4 text-gray-700" />
                                </button>
                            </div>

                            {/* Image Counter */}
                            <div className="absolute bottom-3 left-3 text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">
                                1/5
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                                {location.building_name || location.address || "Location"}
                            </h3>
                            {location.address && (
                                <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                                    {location.address}
                                    {location.city && `, ${location.city}`}
                                    {location.state && ` ${location.state}`}
                                </p>
                            )}

                            {/* Star Rating */}
                            {location.star_rating && (
                                <div className="flex gap-0.5 mb-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`h-4 w-4 ${
                                                star <= location.star_rating!
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "fill-gray-300 text-gray-300"
                                            }`}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Details */}
                            <div className="space-y-1 text-sm text-gray-600">
                                {location.building_park && (
                                    <p className="font-medium text-gray-900 line-clamp-1">
                                        {location.building_park}
                                        {location.tenant_name && (
                                            <>
                                                {" - "}
                                                {(location as any).company_id ? (
                                                    <Link
                                                        href={`/contacts/tenants/${(location as any).company_id}`}
                                                        className="text-blue-600 hover:text-blue-800 hover:underline"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                        }}
                                                    >
                                                        {location.tenant_name}
                                                    </Link>
                                                ) : (
                                                    location.tenant_name
                                                )}
                                            </>
                                        )}
                                    </p>
                                )}
                                <p className="line-clamp-1">
                                    {formatSF(location.sf_occupied)} SF · {location.property_type || "Property"}
                                    {location.floor && ` · Floor ${location.floor}`}
                                </p>
                                <p className="line-clamp-1">
                                    {location.occupancy_type || "Leased"} ·{" "}
                                    {location.moved_in
                                        ? `Moved ${formatDate(location.moved_in)}`
                                        : location.expiration
                                        ? `Expires ${formatDate(location.expiration)}`
                                        : "—"}
                                </p>
                            </div>

                            {/* Info Button */}
                            <div className="mt-3 pt-3 border-t border-gray-200">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                                >
                                    <Info className="h-4 w-4" />
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

