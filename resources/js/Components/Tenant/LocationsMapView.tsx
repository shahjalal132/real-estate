import { useState, useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { TennentLocation } from "../../types";
import {
    Heart,
    CheckSquare,
    Minus,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface LocationsMapViewProps {
    locations: TennentLocation[];
    selectedLocationId?: number | null;
    onLocationClick?: (location: TennentLocation) => void;
    showAdvancedFilters?: boolean;
}

// Helper to get coordinates from address (placeholder - would use geocoding in production)
function getCoordinates(location: TennentLocation): [number, number] | null {
    // For now, use a default NYC area coordinate
    // In production, you'd geocode the address
    if (location.city && location.state) {
        // Simple hash-based positioning for demo
        const hash = location.id * 0.001;
        return [40.7128 + hash, -74.006 + hash];
    }
    return null;
}

function FitBounds({ locations }: { locations: TennentLocation[] }) {
    const map = useMap();
    const coordinates = useMemo(() => {
        return locations
            .map((loc) => getCoordinates(loc))
            .filter((coord): coord is [number, number] => coord !== null);
    }, [locations]);

    useEffect(() => {
        if (coordinates.length > 0) {
            try {
                const bounds = L.latLngBounds(coordinates);
                map.fitBounds(bounds, { padding: [50, 50] });
            } catch (error) {
                console.error("Error fitting bounds:", error);
            }
        }
    }, [map, coordinates]);

    return null;
}

// Map Controls Component
function MapControls() {
    return (
        <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2 bg-white rounded-lg shadow-lg p-2">
            <button className="p-2 hover:bg-gray-100 rounded" title="Zoom In">
                <span className="text-lg font-bold">+</span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded" title="Zoom Out">
                <span className="text-lg font-bold">−</span>
            </button>
            <div className="border-t my-1"></div>
            <button className="p-2 hover:bg-gray-100 rounded" title="Location">
                📍
            </button>
            <button className="p-2 hover:bg-gray-100 rounded" title="Polygon">
                ⬟
            </button>
            <button className="p-2 hover:bg-gray-100 rounded" title="Radius">
                ⭕
            </button>
            <button className="p-2 hover:bg-gray-100 rounded" title="Travel">
                🚗
            </button>
            <button className="p-2 hover:bg-gray-100 rounded" title="Corridor">
                🛣️
            </button>
            <div className="border-t my-1"></div>
            <button className="p-2 hover:bg-gray-100 rounded" title="Layers">
                ☰
            </button>
            <button className="p-2 hover:bg-gray-100 rounded" title="Map">
                🗺️
            </button>
        </div>
    );
}

export default function LocationsMapView({
    locations,
    selectedLocationId,
    onLocationClick,
    showAdvancedFilters = false,
}: LocationsMapViewProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState<
        Record<number, number>
    >({});

    const locationsWithCoords = useMemo(() => {
        return locations
            .map((loc) => {
                const coords = getCoordinates(loc);
                return coords ? { location: loc, coords } : null;
            })
            .filter(
                (
                    item
                ): item is {
                    location: TennentLocation;
                    coords: [number, number];
                } => item !== null
            );
    }, [locations]);

    const center = useMemo(() => {
        if (locationsWithCoords.length === 0)
            return [40.7128, -74.006] as [number, number];
        const avgLat =
            locationsWithCoords.reduce((sum, item) => sum + item.coords[0], 0) /
            locationsWithCoords.length;
        const avgLng =
            locationsWithCoords.reduce((sum, item) => sum + item.coords[1], 0) /
            locationsWithCoords.length;
        return [avgLat, avgLng] as [number, number];
    }, [locationsWithCoords]);

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

    const getImageIndex = (locationId: number) =>
        currentImageIndex[locationId] || 0;
    const setImageIndex = (locationId: number, index: number) => {
        setCurrentImageIndex((prev) => ({ ...prev, [locationId]: index }));
    };

    return (
        <div className="flex h-full">
            {/* Map Section - Left */}
            <div className="flex-1 relative">
                <MapContainer
                    center={center}
                    zoom={10}
                    style={{ height: "100%", width: "100%" }}
                    className="z-0"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <FitBounds locations={locations} />
                    {locationsWithCoords.map(({ location, coords }) => {
                        const isSelected = location.id === selectedLocationId;
                        const icon = L.divIcon({
                            className: `custom-marker ${
                                isSelected ? "selected" : ""
                            }`,
                            html: `<div style="
                                width: 20px;
                                height: 20px;
                                background-color: ${
                                    isSelected ? "#3B82F6" : "#2563EB"
                                };
                                border: 2px solid white;
                                border-radius: 50% 50% 50% 0;
                                transform: rotate(-45deg);
                                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                            "></div>`,
                            iconSize: [20, 20],
                            iconAnchor: [10, 20],
                        });

                        return (
                            <Marker
                                key={location.id}
                                position={coords}
                                icon={icon}
                                eventHandlers={{
                                    click: () => onLocationClick?.(location),
                                }}
                            />
                        );
                    })}
                </MapContainer>
                <MapControls />
            </div>

            {/* Property List Section - Right (only when filters are not shown) */}
            {!showAdvancedFilters && (
                <div className="w-96 bg-white border-l border-gray-200 overflow-y-auto">
                    <div className="divide-y divide-gray-200">
                        {locations.map((location) => {
                            const imageIndex = getImageIndex(location.id);
                            const imageCount = 5; // Placeholder
                            const imageUrl = "/assets/images/placeholder.png";

                            // Format floors display
                            const formatFloors = () => {
                                if (!location.floor) return "";
                                const floor = location.floor;
                                if (
                                    floor.includes(",") ||
                                    floor.includes("-")
                                ) {
                                    return `Floors ${floor}`;
                                }
                                return `Floor ${floor}`;
                            };

                            // Format full date for expiration
                            const formatFullDate = (
                                date: string | null | undefined
                            ): string => {
                                if (!date) return "";
                                try {
                                    return new Date(date).toLocaleDateString(
                                        "en-US",
                                        {
                                            year: "numeric",
                                            month: "short",
                                        }
                                    );
                                } catch {
                                    return "";
                                }
                            };

                            const fullAddress = [
                                location.address,
                                location.city,
                                location.state,
                                location.zip,
                            ]
                                .filter(Boolean)
                                .join(" ");

                            return (
                                <div
                                    key={location.id}
                                    className={`flex gap-4 p-4 cursor-pointer transition-all hover:bg-gray-50 ${
                                        selectedLocationId === location.id
                                            ? "bg-blue-50 border-l-4 border-blue-500"
                                            : ""
                                    }`}
                                    onClick={() => onLocationClick?.(location)}
                                >
                                    {/* Image Section - Left */}
                                    <div className="relative w-32 h-32 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
                                        <img
                                            src={imageUrl}
                                            alt={
                                                location.building_name ||
                                                location.address ||
                                                "Location"
                                            }
                                            className="w-full h-full object-cover"
                                        />

                                        {/* Image Counter */}
                                        <div className="absolute bottom-1 left-1 text-white text-[10px] font-medium bg-black/60 px-1.5 py-0.5 rounded">
                                            {imageIndex + 1}/{imageCount}
                                        </div>
                                    </div>

                                    {/* Content Section - Middle */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 mb-0.5 text-sm">
                                            {(location as any).company_id ? (
                                                <a
                                                    href={`/contacts/tenants/${
                                                        (location as any)
                                                            .company_id
                                                    }`}
                                                    className="text-blue-600 hover:text-blue-800 hover:underline"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                    }}
                                                >
                                                    {location.tenant_name ||
                                                        location.building_name ||
                                                        "Location"}
                                                </a>
                                            ) : (
                                                location.tenant_name ||
                                                location.building_name ||
                                                "Location"
                                            )}
                                        </h3>
                                        {fullAddress && (
                                            <p className="text-xs text-gray-600 mb-1.5">
                                                {fullAddress}
                                            </p>
                                        )}

                                        {/* Star Rating */}
                                        {location.star_rating && (
                                            <div className="flex gap-0.5 mb-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span
                                                        key={star}
                                                        className={`text-xs ${
                                                            star <=
                                                            location.star_rating!
                                                                ? "text-blue-500"
                                                                : "text-gray-300"
                                                        }`}
                                                    >
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Building Name */}
                                        {location.building_name && (
                                            <p className="text-xs font-medium text-gray-900 mb-1">
                                                {location.building_name}
                                            </p>
                                        )}

                                        {/* Property Details */}
                                        <div className="space-y-0.5 text-xs text-gray-600">
                                            <p>
                                                {formatSF(location.sf_occupied)}{" "}
                                                SF ·{" "}
                                                {location.property_type ||
                                                    "Property"}
                                                {location.floor &&
                                                    ` · ${formatFloors()}`}
                                            </p>
                                            <p>
                                                {(() => {
                                                    const occupancy =
                                                        location.occupancy_type ||
                                                        "Leased";
                                                    if (occupancy === "Owned") {
                                                        return location.moved_in
                                                            ? `Owned · Moved ${formatFullDate(
                                                                  location.moved_in
                                                              )}`
                                                            : "Owned";
                                                    } else {
                                                        return location.expiration
                                                            ? `Leased · Expires ${formatFullDate(
                                                                  location.expiration
                                                              )}`
                                                            : location.moved_in
                                                            ? `Leased · Moved ${formatFullDate(
                                                                  location.moved_in
                                                              )}`
                                                            : "Leased";
                                                    }
                                                })()}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Icons - Right */}
                                    <div className="flex flex-col gap-2.5 flex-shrink-0 pt-1">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Heart
                                                className="h-5 w-5"
                                                strokeWidth={1.5}
                                                fill="none"
                                            />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            className="hover:opacity-80 transition-opacity"
                                        >
                                            <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center">
                                                <CheckSquare
                                                    className="h-3 w-3 text-white"
                                                    fill="white"
                                                    stroke="white"
                                                />
                                            </div>
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            className="hover:opacity-80 transition-opacity"
                                        >
                                            <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center">
                                                <Minus
                                                    className="h-3 w-3 text-white"
                                                    strokeWidth={2.5}
                                                />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
