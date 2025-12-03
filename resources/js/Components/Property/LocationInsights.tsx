import { MapPin, TrendingUp, Users, Building2 } from "lucide-react";
import BarChart from "./Charts/BarChart";
import PieChart from "./Charts/PieChart";
import LineChart from "./Charts/LineChart";
import PropertyAreaMap from "./PropertyAreaMap";

interface LocationInsightsProps {
    mapUrl?: string | null;
    fullAddress?: string;
    centerLat?: number;
    centerLng?: number;
}

export default function LocationInsights({
    mapUrl,
    fullAddress,
    centerLat,
    centerLng,
}: LocationInsightsProps) {
    const nearbyProperties = [
        { label: "Retail", value: 45, color: "#0066CC" },
        { label: "Office", value: 28, color: "#0052A3" },
        { label: "Industrial", value: 15, color: "#004080" },
        { label: "Mixed Use", value: 12, color: "#003366" },
    ];

    const trafficData = [
        { label: "Mon", value: 12500 },
        { label: "Tue", value: 13200 },
        { label: "Wed", value: 12800 },
        { label: "Thu", value: 14000 },
        { label: "Fri", value: 15000 },
        { label: "Sat", value: 11000 },
        { label: "Sun", value: 8500 },
    ];

    const walkabilityScore = [
        { label: "Walk Score", value: 78 },
        { label: "Transit Score", value: 65 },
        { label: "Bike Score", value: 82 },
    ];

    const populationGrowth = [
        { label: "2020", value: 125000 },
        { label: "2021", value: 128500 },
        { label: "2022", value: 132000 },
        { label: "2023", value: 135800 },
        { label: "2024", value: 139500 },
    ];

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
                Location Insights for 43055
            </h2>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 rounded-lg p-6 border-2 border-[#0066CC]">
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-6 h-6 text-[#0066CC]" />
                        <div className="text-sm text-gray-600">Growth Rate</div>
                    </div>
                    <div className="text-3xl font-bold text-[#0066CC]">
                        4.2%
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                        Annual population growth
                    </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-6 border-2 border-[#0066CC]">
                    <div className="flex items-center gap-3 mb-2">
                        <Users className="w-6 h-6 text-[#0066CC]" />
                        <div className="text-sm text-gray-600">
                            Population Density
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-[#0066CC]">
                        2,450
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                        People per sq mile
                    </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-6 border-2 border-[#0066CC]">
                    <div className="flex items-center gap-3 mb-2">
                        <Building2 className="w-6 h-6 text-[#0066CC]" />
                        <div className="text-sm text-gray-600">
                            Nearby Properties
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-[#0066CC]">100</div>
                    <div className="text-xs text-gray-500 mt-1">
                        Within 1 mile radius
                    </div>
                </div>
            </div>

            {/* Enhanced Map View */}
            <div className="mb-8">
                <PropertyAreaMap
                    mapUrl={mapUrl}
                    fullAddress={fullAddress}
                    centerLat={centerLat}
                    centerLng={centerLng}
                />
            </div>

            {/* Nearby Properties Distribution */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Nearby Properties by Type
                </h3>
                <div className="bg-gray-50 rounded-lg p-6">
                    <PieChart data={nearbyProperties} size={220} />
                </div>
            </div>

            {/* Traffic Pattern, Walkability Scores, and Population Growth - Combined Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Weekly Traffic Pattern */}
                <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Weekly Traffic Pattern
                    </h3>
                    <BarChart data={trafficData} height={220} />
                </div>

                {/* Walkability Scores */}
                <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Walkability Scores
                    </h3>
                    <BarChart data={walkabilityScore} height={220} />
                </div>

                {/* Population Growth */}
                <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Population Growth
                    </h3>
                    <BarChart
                        data={populationGrowth.map((item) => ({
                            ...item,
                            value: item.value / 1000, // Convert to thousands
                            label: item.label.slice(-2), // Show last 2 digits
                        }))}
                        height={220}
                        color="#0066CC"
                    />
                    <div className="text-xs text-gray-500 mt-2 text-center">
                        Values in thousands
                    </div>
                </div>
            </div>
        </div>
    );
}
