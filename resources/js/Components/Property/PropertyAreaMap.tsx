import { useState } from "react";
import { X, HelpCircle, Maximize2 } from "lucide-react";

interface NearbyBusiness {
    id: string;
    name: string;
    type: string;
    lat: number;
    lng: number;
    logo?: string;
    visits?: string;
    visitors?: string;
    dwellTime?: string;
}

interface PropertyAreaMapProps {
    mapUrl?: string | null;
    fullAddress?: string;
    centerLat?: number;
    centerLng?: number;
}

const nearbyBusinesses: NearbyBusiness[] = [
    {
        id: "1",
        name: "Walmart",
        type: "Retail",
        lat: 40.0583,
        lng: -82.4014,
        visits: "210.8K",
        visitors: "81.5K",
        dwellTime: "32 Min",
    },
    {
        id: "2",
        name: "Steak 'n Shake",
        type: "Restaurant",
        lat: 40.059,
        lng: -82.402,
    },
    {
        id: "3",
        name: "Wendy's",
        type: "Restaurant",
        lat: 40.0575,
        lng: -82.4005,
    },
    {
        id: "4",
        name: "Hooters",
        type: "Restaurant",
        lat: 40.0595,
        lng: -82.401,
    },
    {
        id: "5",
        name: "Pet Supplies Plus",
        type: "Retail",
        lat: 40.058,
        lng: -82.4008,
    },
    {
        id: "6",
        name: "Tractor Supply Co",
        type: "Retail",
        lat: 40.0578,
        lng: -82.4018,
    },
];

const tabs = [
    { id: "explore", label: "Explore Nearby" },
    { id: "top", label: "Top Properties" },
    { id: "regional", label: "Regional Change" },
    { id: "trends", label: "Monthly Trends" },
];

export default function PropertyAreaMap({
    mapUrl,
    fullAddress,
    centerLat = 40.0583,
    centerLng = -82.4014,
}: PropertyAreaMapProps) {
    const [activeTab, setActiveTab] = useState("explore");
    const [selectedBusiness, setSelectedBusiness] =
        useState<NearbyBusiness | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleBusinessClick = (business: NearbyBusiness) => {
        setSelectedBusiness(business);
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    // Build enhanced map URL with markers
    const getEnhancedMapUrl = () => {
        if (!mapUrl) return null;
        // Add zoom and map type
        const baseUrl = mapUrl.split("&output=embed")[0];
        return `${baseUrl}&zoom=14&output=embed`;
    };

    return (
        <div
            className={`bg-white border border-gray-200 rounded-lg overflow-hidden ${
                isFullscreen ? "fixed inset-0 z-50 rounded-none" : ""
            }`}
        >
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Property Area Insights
                            </h2>
                            <button
                                type="button"
                                className="text-gray-400 hover:text-gray-600"
                                aria-label="Help"
                            >
                                <HelpCircle className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Oct 2025 vs. Oct 2024</span>
                            {fullAddress && (
                                <span className="font-medium">
                                    {fullAddress}
                                </span>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={toggleFullscreen}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Toggle fullscreen"
                    >
                        <Maximize2 className="w-5 h-5" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 border-b border-gray-200">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                                activeTab === tab.id
                                    ? "border-[#0066CC] text-[#0066CC]"
                                    : "border-transparent text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row h-[600px]">
                {/* Sidebar */}
                {selectedBusiness && (
                    <div className="w-full lg:w-96 border-r border-gray-200 bg-white overflow-y-auto">
                        <div className="p-4">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                                        {selectedBusiness.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Exact location will appear after unlock
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelectedBusiness(null)}
                                    className="text-gray-400 hover:text-gray-600"
                                    aria-label="Close"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Metrics Table */}
                            {selectedBusiness.visits && (
                                <div className="border border-gray-200 rounded-lg mb-4">
                                    <div className="grid grid-cols-3 gap-2 p-3 bg-gray-50 border-b border-gray-200">
                                        <div className="text-xs font-semibold text-gray-600">
                                            Metric
                                        </div>
                                        <div className="text-xs font-semibold text-gray-600 text-center">
                                            Oct 24
                                        </div>
                                        <div className="text-xs font-semibold text-gray-600 text-center">
                                            Oct 25
                                        </div>
                                    </div>
                                    <div className="p-3 space-y-3">
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="text-xs text-gray-600">
                                                Monthly Visits
                                            </div>
                                            <div className="text-xs font-semibold text-gray-900 text-center">
                                                {selectedBusiness.visits}
                                            </div>
                                            <div className="text-xs text-gray-400 text-center">
                                                Locked
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="text-xs text-gray-600">
                                                Monthly Visitors
                                            </div>
                                            <div className="text-xs font-semibold text-gray-900 text-center">
                                                {selectedBusiness.visitors}
                                            </div>
                                            <div className="text-xs text-gray-400 text-center">
                                                Locked
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="text-xs text-gray-600">
                                                Avg Dwell Time
                                            </div>
                                            <div className="text-xs font-semibold text-gray-900 text-center">
                                                {selectedBusiness.dwellTime}
                                            </div>
                                            <div className="text-xs text-gray-400 text-center">
                                                Locked
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* More About Section */}
                            <div className="mb-4">
                                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                                    More About This Property
                                </h4>
                                <div className="space-y-2">
                                    {[
                                        "Trade Area Demographics",
                                        "Visitor Journey",
                                        "Daily / Monthly Visitation Trends",
                                    ].map((item, idx) => (
                                        <label
                                            key={idx}
                                            className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                defaultChecked
                                                className="w-4 h-4 text-[#0066CC] border-gray-300 rounded focus:ring-[#0066CC]"
                                            />
                                            {item}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Unlock Button */}
                            <button className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                                Unlock Insights
                            </button>
                        </div>
                    </div>
                )}

                {/* Map Area */}
                <div className="flex-1 relative">
                    {getEnhancedMapUrl() ? (
                        <div className="relative w-full h-full">
                            <iframe
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                style={{ border: 0 }}
                                src={getEnhancedMapUrl() || ""}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Property Area Map"
                                className="w-full h-full"
                            />
                            {/* Overlay for business markers - would be implemented with actual map library */}
                            <div className="absolute inset-0 pointer-events-none">
                                {/* Radius Circle */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-4 border-purple-400/30 rounded-full bg-purple-200/10"></div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-gray-500">Map unavailable</p>
                                {fullAddress && (
                                    <p className="text-sm text-gray-400 mt-2">
                                        {fullAddress}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Business List Overlay (for mobile) */}
                    <div className="absolute bottom-4 left-4 right-4 lg:hidden">
                        <div className="bg-white rounded-lg shadow-lg p-3 max-h-40 overflow-y-auto">
                            <div className="text-xs font-semibold text-gray-600 mb-2">
                                Nearby Businesses
                            </div>
                            <div className="space-y-1">
                                {nearbyBusinesses
                                    .slice(0, 3)
                                    .map((business) => (
                                        <button
                                            key={business.id}
                                            onClick={() =>
                                                handleBusinessClick(business)
                                            }
                                            className="w-full text-left text-xs text-gray-700 hover:bg-gray-50 p-2 rounded"
                                        >
                                            {business.name}
                                        </button>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
