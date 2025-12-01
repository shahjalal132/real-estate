import { useEffect, useMemo } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Tooltip,
    useMap,
} from "react-leaflet";
import L from "leaflet";
import { Property } from "../types";
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

interface MapViewProps {
    properties: Property[];
    selectedPropertyId?: number | null;
    onMarkerClick?: (property: Property) => void;
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
                        // Handle both number and string types from database
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

export default function MapView({
    properties,
    selectedPropertyId,
    onMarkerClick,
}: MapViewProps) {
    // Filter properties with valid coordinates
    const propertiesWithLocation = useMemo(
        () =>
            properties.filter((p) => {
                if (!p.location) return false;
                // Handle both number and string types from database
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
        if (propertiesWithLocation.length === 0) {
            return [39.8283, -98.5795] as [number, number]; // Center of USA
        }

        const validCoords = propertiesWithLocation
            .map((p) => {
                // Handle both number and string types from database
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
            .filter((coord): coord is [number, number] => coord !== null);

        if (validCoords.length === 0) {
            return [39.8283, -98.5795] as [number, number]; // Center of USA
        }

        const avgLat =
            validCoords.reduce((sum, [lat]) => sum + lat, 0) /
            validCoords.length;
        const avgLng =
            validCoords.reduce((sum, [, lng]) => sum + lng, 0) /
            validCoords.length;

        // Final validation to ensure center is valid
        if (!isValidCoordinate(avgLat) || !isValidLongitude(avgLng)) {
            return [39.8283, -98.5795] as [number, number]; // Center of USA
        }

        return [avgLat, avgLng] as [number, number];
    }, [propertiesWithLocation]);

    if (propertiesWithLocation.length === 0) {
        return (
            <div className="flex h-full items-center justify-center bg-gray-100">
                <p className="text-gray-500">
                    No properties with location data available
                </p>
            </div>
        );
    }

    // Final safety check - ensure center is valid before rendering map
    const [centerLat, centerLng] = center;
    if (!isValidCoordinate(centerLat) || !isValidLongitude(centerLng)) {
        return (
            <div className="flex h-full items-center justify-center bg-gray-100">
                <p className="text-gray-500">
                    Unable to display map: Invalid location data
                </p>
            </div>
        );
    }

    const formatPrice = (price: string | null | undefined): string => {
        if (!price) return "Undisclosed";
        const numValue = parseFloat(price.replace(/[$,\s]/g, ""));
        if (isNaN(numValue)) return "Undisclosed";
        return `$${numValue.toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        })}`;
    };

    return (
        <MapContainer
            center={center}
            zoom={6}
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
                // Handle both number and string types from database
                const lat =
                    typeof property.location!.latitude === "string"
                        ? parseFloat(property.location!.latitude)
                        : Number(property.location!.latitude);
                const lng =
                    typeof property.location!.longitude === "string"
                        ? parseFloat(property.location!.longitude)
                        : Number(property.location!.longitude);

                // Double-check coordinates are valid before rendering marker
                if (!isValidCoordinate(lat) || !isValidLongitude(lng)) {
                    return null;
                }

                const price = formatPrice(
                    property.formatted_price || property.asking_price
                );

                // Create simple lollipop/pin marker
                const icon = L.divIcon({
                    className: `lollipop-marker ${
                        isSelected ? "selected" : ""
                    }`,
                    html: `
                        <div class="lollipop-marker-container ${
                            isSelected ? "selected" : ""
                        }">
                            <div class="lollipop-pin"></div>
                        </div>
                    `,
                    iconSize: [32, 40],
                    iconAnchor: [16, 40],
                    popupAnchor: [0, -40],
                });

                return (
                    <Marker
                        key={property.id}
                        position={[lat, lng]}
                        icon={icon}
                        eventHandlers={{
                            click: () => {
                                onMarkerClick?.(property);
                            },
                        }}
                    >
                        {/* Hover Tooltip */}
                        <Tooltip
                            permanent={false}
                            direction="top"
                            offset={[0, -40]}
                            className="property-tooltip"
                        >
                            <div className="property-tooltip-content">
                                <h4 className="font-semibold text-sm mb-1 text-gray-900">
                                    {property.name}
                                </h4>
                                <p className="text-xs font-bold text-blue-600 mb-1">
                                    {price}
                                </p>
                                {property.location && (
                                    <p className="text-xs text-gray-600">
                                        {property.location.city},{" "}
                                        {property.location.state_code}
                                    </p>
                                )}
                            </div>
                        </Tooltip>

                        {/* Click Popup */}
                        <Popup className="property-popup">
                            <div className="min-w-[250px] max-w-[300px]">
                                <Link
                                    href={`/properties/${property.id}/${property.url_slug}`}
                                    className="block"
                                >
                                    <h3 className="font-semibold text-base mb-2 hover:text-blue-600 transition-colors">
                                        {property.name}
                                    </h3>
                                </Link>
                                <p className="text-sm font-semibold text-blue-600 mb-2">
                                    {price}
                                </p>
                                {property.location && (
                                    <p className="text-xs text-gray-600 mb-2">
                                        <span className="font-medium">
                                            Location:
                                        </span>{" "}
                                        {property.location.city},{" "}
                                        {property.location.state_code}
                                    </p>
                                )}
                                {property.thumbnail_url && (
                                    <img
                                        src={property.thumbnail_url}
                                        alt={property.name}
                                        className="w-full h-32 object-cover rounded mt-2"
                                    />
                                )}
                                <Link
                                    href={`/properties/${property.id}/${property.url_slug}`}
                                    className="mt-3 inline-block text-sm text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    View Details →
                                </Link>
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
}
