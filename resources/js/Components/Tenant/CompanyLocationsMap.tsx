import { useState, useMemo, useEffect } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    useMap,
} from "react-leaflet";
import L from "leaflet";
import { TennentLocation } from "../../types";

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

interface CompanyLocationsMapProps {
    locations: TennentLocation[];
    selectedLocationId?: number | null;
    onLocationClick?: (location: TennentLocation) => void;
}

// Helper to get coordinates from address (placeholder - would use geocoding in production)
function getCoordinates(location: TennentLocation): [number, number] | null {
    // For now, use a default NYC area coordinate
    // In production, you'd geocode the address
    if (location.city && location.state) {
        // Simple hash-based positioning for demo
        const hash = location.id * 0.001;
        return [40.7128 + hash, -74.0060 + hash];
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

export default function CompanyLocationsMap({
    locations,
    selectedLocationId,
    onLocationClick,
}: CompanyLocationsMapProps) {
    const locationsWithCoords = useMemo(() => {
        return locations
            .map((loc) => {
                const coords = getCoordinates(loc);
                return coords ? { location: loc, coords } : null;
            })
            .filter((item): item is { location: TennentLocation; coords: [number, number] } => item !== null);
    }, [locations]);

    const center = useMemo(() => {
        if (locationsWithCoords.length === 0) return [40.7128, -74.0060] as [number, number];
        const avgLat = locationsWithCoords.reduce((sum, item) => sum + item.coords[0], 0) / locationsWithCoords.length;
        const avgLng = locationsWithCoords.reduce((sum, item) => sum + item.coords[1], 0) / locationsWithCoords.length;
        return [avgLat, avgLng] as [number, number];
    }, [locationsWithCoords]);

    return (
        <div className="w-full h-full relative">
            <MapContainer
                center={center}
                zoom={10}
                style={{ height: "100%", width: "100%" }}
                className="z-0 rounded-lg"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <FitBounds locations={locations} />
                {locationsWithCoords.map(({ location, coords }) => {
                    const isSelected = location.id === selectedLocationId;
                    const icon = L.divIcon({
                        className: `custom-marker ${isSelected ? "selected" : ""}`,
                        html: `<div style="
                            width: 24px;
                            height: 24px;
                            background-color: ${isSelected ? "#EF4444" : "#2563EB"};
                            border: 3px solid white;
                            border-radius: 50% 50% 50% 0;
                            transform: rotate(-45deg);
                            box-shadow: 0 2px 6px rgba(0,0,0,0.4);
                        "></div>`,
                        iconSize: [24, 24],
                        iconAnchor: [12, 24],
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
        </div>
    );
}

