import { useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { Property } from "../../types";
import { Link } from "@inertiajs/react";

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

interface OwnerPropertiesMapViewProps {
    properties: Property[];
    selectedPropertyId?: number | null;
    onPropertyClick?: (propertyId: number | null) => void;
}

// Helper function to validate coordinates
function isValidCoordinate(value: number | null | undefined): value is number {
    return (
        typeof value === "number" &&
        !isNaN(value) &&
        isFinite(value) &&
        value >= -90 &&
        value <= 90
    );
}

function isValidLongitude(value: number | null | undefined): value is number {
    return (
        typeof value === "number" &&
        !isNaN(value) &&
        isFinite(value) &&
        value >= -180 &&
        value <= 180
    );
}

// Component to fit map bounds to show all markers
function FitBounds({ properties }: { properties: Property[] }) {
    const map = useMap();
    const validProperties = properties.filter(
        (p) =>
            p.location &&
            isValidCoordinate(p.location.latitude) &&
            isValidLongitude(p.location.longitude)
    );

    useEffect(() => {
        if (validProperties.length > 0) {
            try {
                const coordinates = validProperties
                    .map((p) => {
                        const lat =
                            typeof p.location!.latitude === "string"
                                ? parseFloat(p.location!.latitude)
                                : Number(p.location!.latitude);
                        const lng =
                            typeof p.location!.longitude === "string"
                                ? parseFloat(p.location!.longitude)
                                : Number(p.location!.longitude);
                        if (isValidCoordinate(lat) && isValidLongitude(lng)) {
                            return [lat, lng] as [number, number];
                        }
                        return null;
                    })
                    .filter(
                        (coord): coord is [number, number] => coord !== null
                    );

                if (coordinates.length > 0) {
                    const bounds = L.latLngBounds(coordinates);
                    map.fitBounds(bounds, { padding: [50, 50] });
                }
            } catch (error) {
                console.error("Error fitting bounds:", error);
            }
        }
    }, [map, validProperties]);

    return null;
}

export default function OwnerPropertiesMapView({
    properties,
    selectedPropertyId,
    onPropertyClick,
}: OwnerPropertiesMapViewProps) {
    const propertiesWithLocation = useMemo(
        () =>
            properties.filter((p) => {
                if (!p.location) return false;
                const lat =
                    typeof p.location.latitude === "string"
                        ? parseFloat(p.location.latitude)
                        : Number(p.location.latitude);
                const lng =
                    typeof p.location.longitude === "string"
                        ? parseFloat(p.location.longitude)
                        : Number(p.location.longitude);
                return isValidCoordinate(lat) && isValidLongitude(lng);
            }),
        [properties]
    );

    // Calculate center point from all properties
    const center = useMemo(() => {
        if (propertiesWithLocation.length === 0)
            return [40.7128, -74.006] as [number, number];
        const avgLat =
            propertiesWithLocation.reduce(
                (sum, p) =>
                    sum +
                    (typeof p.location!.latitude === "string"
                        ? parseFloat(p.location!.latitude)
                        : Number(p.location!.latitude)),
                0
            ) / propertiesWithLocation.length;
        const avgLng =
            propertiesWithLocation.reduce(
                (sum, p) =>
                    sum +
                    (typeof p.location!.longitude === "string"
                        ? parseFloat(p.location!.longitude)
                        : Number(p.location!.longitude)),
                0
            ) / propertiesWithLocation.length;
        return [avgLat, avgLng] as [number, number];
    }, [propertiesWithLocation]);

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
        if (!date) return "";
        try {
            return new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
            });
        } catch {
            return "";
        }
    };

    const formatPrice = (price: string | number | null | undefined): string => {
        if (!price) return "";
        const num =
            typeof price === "string"
                ? parseFloat(price.replace(/[$,]/g, ""))
                : price;
        if (isNaN(num)) return "";
        if (num >= 1000000) {
            return `$${(num / 1000000).toFixed(1)}M`;
        }
        return `$${num.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        })}`;
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
                    <FitBounds properties={propertiesWithLocation} />
                    {propertiesWithLocation.map((property) => {
                        const isSelected = property.id === selectedPropertyId;
                        const lat =
                            typeof property.location!.latitude === "string"
                                ? parseFloat(property.location!.latitude)
                                : Number(property.location!.latitude);
                        const lng =
                            typeof property.location!.longitude === "string"
                                ? parseFloat(property.location!.longitude)
                                : Number(property.location!.longitude);

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
                                key={property.id}
                                position={[lat, lng]}
                                icon={icon}
                                eventHandlers={{
                                    click: () => onPropertyClick?.(property.id),
                                }}
                            />
                        );
                    })}
                </MapContainer>
            </div>

            {/* Property List Section - Right */}
            <div className="w-96 bg-white border-l border-gray-200 overflow-y-auto">
                <div className="divide-y divide-gray-200">
                    {properties.length > 0 ? (
                        properties.map((property) => {
                            const isSelected =
                                property.id === selectedPropertyId;
                            const summaryDetails =
                                property.details?.summary_details || {};
                            const sqft =
                                property.details?.net_rentable_sqft ||
                                summaryDetails.SquareFootage ||
                                summaryDetails["Square Footage"];
                            const occupancy = summaryDetails.Occupancy;
                            const askingPrice =
                                property.formatted_price ||
                                property.asking_price;
                            const propertyType =
                                property.types?.[0] || "Property";

                            const fullAddress = property.location
                                ? [
                                      property.location.address,
                                      property.location.city,
                                      property.location.state_code,
                                      property.location.zip,
                                  ]
                                      .filter(Boolean)
                                      .join(", ")
                                : "";

                            // Format details string
                            const detailsParts: string[] = [];
                            if (sqft) {
                                detailsParts.push(`${formatSF(sqft)} SF`);
                            }
                            if (occupancy !== null && occupancy !== undefined) {
                                const occNum =
                                    typeof occupancy === "number"
                                        ? occupancy
                                        : parseFloat(occupancy.toString());
                                if (!isNaN(occNum)) {
                                    detailsParts.push(`${occNum}% Occupancy`);
                                }
                            }
                            if (askingPrice) {
                                detailsParts.push(formatPrice(askingPrice));
                            }

                            return (
                                <div
                                    key={property.id}
                                    className={`flex gap-4 p-4 cursor-pointer transition-all hover:bg-gray-50 ${
                                        isSelected
                                            ? "bg-blue-50 border-l-4 border-blue-500"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        onPropertyClick?.(property.id)
                                    }
                                >
                                    {/* Image Section - Left */}
                                    <div className="relative w-32 h-32 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
                                        <img
                                            src={
                                                property.thumbnail_url ||
                                                "/assets/images/placeholder.png"
                                            }
                                            alt={property.name || "Property"}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Content Section - Right */}
                                    <div className="flex-1 min-w-0">
                                        <Link
                                            href={`/properties/${property.id}/${property.url_slug}`}
                                            className="block font-semibold text-gray-900 mb-0.5 text-sm hover:text-blue-600 hover:underline"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {property.name || "Property"}
                                        </Link>
                                        {fullAddress && (
                                            <p className="text-xs text-gray-600 mb-1.5">
                                                {fullAddress}
                                            </p>
                                        )}

                                        {/* Star Rating - Placeholder */}
                                        <div className="flex gap-0.5 mb-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span
                                                    key={star}
                                                    className="text-xs text-gray-300"
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>

                                        {/* Property Type */}
                                        <p className="text-xs font-medium text-gray-900 mb-1">
                                            {propertyType}
                                        </p>

                                        {/* Property Details */}
                                        <div className="space-y-0.5 text-xs text-gray-600">
                                            {detailsParts.length > 0 && (
                                                <p>{detailsParts.join(", ")}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            No properties found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
