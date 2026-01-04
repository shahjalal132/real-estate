import { TennentCompany, TennentLocation } from "../../types";
import { formatNumber, formatSF, formatCurrency } from "../../utils/formatting";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { useMemo, useEffect } from "react";

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

interface SummaryMetricsProps {
    company: TennentCompany;
    totalLocations: number;
    locations?: TennentLocation[];
}

// Static USA locations for design/demo purposes (50+ locations)
const STATIC_USA_LOCATIONS: Array<[number, number]> = [
    // Major cities - West Coast
    [34.0522, -118.2437], // Los Angeles, CA
    [37.7749, -122.4194], // San Francisco, CA
    [45.5152, -122.6784], // Portland, OR
    [47.6062, -122.3321], // Seattle, WA
    [32.7157, -117.1611], // San Diego, CA
    [36.1699, -115.1398], // Las Vegas, NV
    [33.4484, -112.074], // Phoenix, AZ
    [38.5816, -121.4944], // Sacramento, CA
    [33.9533, -117.3962], // Riverside, CA
    [35.4676, -97.5164], // Oklahoma City, OK

    // Major cities - Midwest
    [41.8781, -87.6298], // Chicago, IL
    [39.0997, -94.5786], // Kansas City, MO
    [44.9778, -93.265], // Minneapolis, MN
    [43.0389, -87.9065], // Milwaukee, WI
    [40.7128, -74.006], // New York, NY
    [42.3601, -71.0589], // Boston, MA
    [39.9526, -75.1652], // Philadelphia, PA
    [40.4406, -79.9959], // Pittsburgh, PA
    [42.8864, -78.8784], // Buffalo, NY
    [43.161, -77.6109], // Rochester, NY

    // Major cities - South
    [29.7604, -95.3698], // Houston, TX
    [32.7767, -96.797], // Dallas, TX
    [30.2672, -97.7431], // Austin, TX
    [29.4241, -98.4936], // San Antonio, TX
    [33.749, -84.388], // Atlanta, GA
    [25.7617, -80.1918], // Miami, FL
    [30.3322, -81.6557], // Jacksonville, FL
    [28.5383, -81.3792], // Orlando, FL
    [35.2271, -80.8431], // Charlotte, NC
    [35.1495, -90.049], // Memphis, TN

    // Major cities - Southeast
    [33.5207, -86.8025], // Birmingham, AL
    [30.4515, -91.1871], // Baton Rouge, LA
    [35.0456, -85.3097], // Chattanooga, TN
    [36.1627, -86.7816], // Nashville, TN
    [30.6954, -88.0399], // Mobile, AL
    [32.3792, -86.3077], // Montgomery, AL
    [27.9506, -82.4572], // Tampa, FL
    [26.1224, -80.1373], // Fort Lauderdale, FL

    // Major cities - Northeast
    [41.7658, -72.6734], // Hartford, CT
    [41.824, -71.4128], // Providence, RI
    [42.9956, -71.4548], // Manchester, NH
    [44.3106, -69.7795], // Augusta, ME

    // Major cities - Southwest
    [35.0844, -106.6504], // Albuquerque, NM
    [40.7608, -111.891], // Salt Lake City, UT
    [39.7392, -104.9903], // Denver, CO
    [41.2181, -111.9733], // Ogden, UT

    // Additional locations for variety
    [46.8772, -96.7898], // Fargo, ND
    [41.2565, -95.9345], // Omaha, NE
    [40.8136, -96.7026], // Lincoln, NE
    [39.7684, -86.1581], // Indianapolis, IN
    [38.2527, -85.7585], // Louisville, KY
    [39.1031, -84.512], // Cincinnati, OH
    [41.4993, -81.6944], // Cleveland, OH
    [39.9612, -82.9988], // Columbus, OH
    [42.3314, -83.0458], // Detroit, MI
    [43.0125, -83.6875], // Flint, MI
    [42.9634, -85.6681], // Grand Rapids, MI
];

// Fit bounds to show all locations (for USA view)
function FitBounds({ coordinates }: { coordinates: Array<[number, number]> }) {
    const map = useMap();

    useEffect(() => {
        if (coordinates.length > 0) {
            try {
                const bounds = L.latLngBounds(coordinates);
                map.fitBounds(bounds, { padding: [80, 80] });
            } catch (error) {
                // Fallback to USA center view
                map.setView([39.8283, -98.5795], 4);
            }
        } else {
            // Default USA view to show country names
            map.setView([39.8283, -98.5795], 4);
        }
    }, [map, coordinates]);

    return null;
}

export default function SummaryMetrics({
    company,
    totalLocations,
    locations: _locations = [],
}: SummaryMetricsProps) {
    // Calculate metrics
    const sfOccupied = company.sf_occupied
        ? parseFloat(company.sf_occupied.replace(/,/g, ""))
        : 0;
    const employees = company.employees || 0;
    const revenue = company.revenue
        ? parseFloat(company.revenue.replace(/[^0-9.]/g, ""))
        : 0;
    const highestUsePercent = company.highest_use_by_sf || "83%";

    // Format values
    const formattedLocations = formatNumber(totalLocations);
    const formattedSF = formatSF(sfOccupied.toString());
    const formattedEmployees = formatNumber(employees);
    const formattedRevenue = formatCurrency(revenue);
    const creditRating = company.credit_rating || "B - 65";

    // Use static USA locations for design/demo
    const mapLocations = useMemo(() => {
        // Use static locations (at least 50)
        return STATIC_USA_LOCATIONS;
    }, []);

    // Create diamond-shaped marker icons (orange and purple)
    const createDiamondIcon = (index: number) => {
        const isOrange = index % 3 !== 0; // Mix of orange and purple (roughly 2:1 ratio)
        const color = isOrange ? "#F97316" : "#9333EA"; // Orange or Purple

        return L.divIcon({
            className: "diamond-marker",
            html: `<div style="
                width: 14px;
                height: 14px;
                background-color: ${color};
                border: 2px solid white;
                transform: rotate(45deg);
                box-shadow: 0 2px 6px rgba(0,0,0,0.4);
            "></div>`,
            iconSize: [14, 14],
            iconAnchor: [7, 7],
        });
    };

    return (
        <div className="space-y-0">
            {/* Top Metrics Bar */}
            <div className="bg-white border-b border-gray-200 py-4 px-6">
                <div className="flex items-center justify-between gap-8 flex-wrap">
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-gray-900">
                            {formattedLocations}
                        </span>
                        <span className="text-sm text-gray-600">Locations</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-gray-900">
                            {formattedSF}
                        </span>
                        <span className="text-sm text-gray-600">
                            SF Occupied
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-gray-900">
                            {highestUsePercent}
                        </span>
                        <span className="text-sm text-gray-600">
                            Retail Highest Use By SF
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-gray-900">
                            {formattedEmployees}
                        </span>
                        <span className="text-sm text-gray-600">Employees</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-gray-900">
                            {formattedRevenue}
                        </span>
                        <span className="text-sm text-gray-600">Revenue</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-gray-900">
                            {creditRating}
                        </span>
                        <span className="text-sm text-gray-600">
                            Credit Rating
                        </span>
                    </div>
                </div>
            </div>

            {/* World Map */}
            <div className="bg-white relative" style={{ height: "600px" }}>
                <MapContainer
                    center={[39.8283, -98.5795]}
                    zoom={4}
                    minZoom={3}
                    maxZoom={18}
                    style={{ height: "100%", width: "100%" }}
                    className="z-0"
                    zoomControl={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map data ©2026 Google, INEGI'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <FitBounds coordinates={mapLocations} />
                    {mapLocations.map(
                        (coords: [number, number], index: number) => (
                            <Marker
                                key={`location-${index}`}
                                position={coords}
                                icon={createDiamondIcon(index)}
                            />
                        )
                    )}
                </MapContainer>

                {/* Map Controls Overlay */}
                <div className="absolute top-4 left-4 z-50 bg-white rounded shadow-lg p-1">
                    <button className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded">
                        Map
                    </button>
                </div>

                {/* Space Use Label */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50">
                    <span className="text-sm font-semibold text-gray-700 bg-white/90 px-4 py-2 rounded shadow">
                        Space Use
                    </span>
                </div>
            </div>
        </div>
    );
}
