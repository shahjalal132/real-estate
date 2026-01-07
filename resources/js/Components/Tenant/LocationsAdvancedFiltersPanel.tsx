import { useState } from "react";
import { X, Search, MapPin, Info } from "lucide-react";

interface LocationsAdvancedFiltersPanelProps {
    isOpen: boolean;
    onClose: () => void;
    onClear: () => void;
    onDone: () => void;
    activeFiltersCount?: number;
}

export default function LocationsAdvancedFiltersPanel({
    isOpen,
    onClose,
    onClear,
    onDone,
    activeFiltersCount = 0,
}: LocationsAdvancedFiltersPanelProps) {
    const [topTab, setTopTab] = useState<"search" | "location">("search");
    const [mainTab, setMainTab] = useState<
        | "portfolio"
        | "leases"
        | "property"
        | "contacts"
    >("portfolio");

    // Helper for star rating
    const StarRating = ({ rating }: { rating: number }) => (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    className={`w-4 h-4 ${
                        star <= rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );

    if (!isOpen) return null;

    return (
        <div className="h-full w-full bg-white flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3 shrink-0">
                <div className="flex items-center gap-1">
                    {/* Top Tabs */}
                    <button
                        onClick={() => setTopTab("search")}
                        className={`flex items-center gap-2 px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                            topTab === "search"
                                ? "border-blue-600 text-blue-600 bg-white"
                                : "border-transparent text-gray-600 hover:text-gray-900"
                        }`}
                    >
                        <Search className="h-4 w-4" />
                        Search
                    </button>
                    <button
                        onClick={() => setTopTab("location")}
                        className={`flex items-center gap-2 px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                            topTab === "location"
                                ? "border-blue-600 text-blue-600 bg-white"
                                : "border-transparent text-gray-600 hover:text-gray-900"
                        }`}
                    >
                        <MapPin className="h-4 w-4" />
                        Location
                    </button>
                </div>
                <button
                    onClick={onClose}
                    className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded hover:bg-gray-200"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>

            {/* Main Content Tabs */}
            <div className="border-b border-gray-200 bg-white px-4 shrink-0">
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setMainTab("portfolio")}
                        className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                            mainTab === "portfolio"
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-600 hover:text-gray-900"
                        }`}
                    >
                        Portfolio
                    </button>
                    <button
                        onClick={() => setMainTab("leases")}
                        className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                            mainTab === "leases"
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-600 hover:text-gray-900"
                        }`}
                    >
                        Leases
                    </button>
                    <button
                        onClick={() => setMainTab("property")}
                        className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                            mainTab === "property"
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-600 hover:text-gray-900"
                        }`}
                    >
                        Property
                    </button>
                    <button
                        onClick={() => setMainTab("contacts")}
                        className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                            mainTab === "contacts"
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-600 hover:text-gray-900"
                        }`}
                    >
                        Contacts
                    </button>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 min-h-0 overflow-y-auto p-6 bg-gray-50">
                {/* Portfolio Tab */}
                {mainTab === "portfolio" && (
                    <div className="space-y-6">
                        {/* Space Use */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Space Use
                            </label>
                            <select className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                <option>Select</option>
                                <option>Retail</option>
                                <option>Office</option>
                                <option>Industrial</option>
                                <option>Warehouse</option>
                                <option>Mixed Use</option>
                            </select>
                        </div>

                        {/* Size Occupied */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Size Occupied
                                </label>
                                <select className="w-16 rounded-md border border-gray-300 bg-white px-2 py-1 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                    <option>SF</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="Min SF"
                                    className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <span className="text-gray-500 text-sm">–</span>
                                <input
                                    type="text"
                                    placeholder="Max SF"
                                    className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Occupancy */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Occupancy
                            </label>
                            <div className="flex items-center gap-2">
                                {["Occupied", "Vacant", "Partial"].map((type) => (
                                    <button
                                        key={type}
                                        className="px-4 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Leases Tab */}
                {mainTab === "leases" && (
                    <div className="space-y-6">
                        {/* Lease Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Lease Date
                            </label>
                            <button className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-left focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                Select Date
                            </button>
                        </div>

                        {/* Lease Term */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Lease Term
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="Min Years"
                                    className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <span className="text-gray-500 text-sm">–</span>
                                <input
                                    type="text"
                                    placeholder="Max Years"
                                    className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Annual Rent */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Annual Rent
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="$ Min"
                                    className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <span className="text-gray-500 text-sm">–</span>
                                <input
                                    type="text"
                                    placeholder="$ Max"
                                    className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Property Tab */}
                {mainTab === "property" && (
                    <div className="space-y-6">
                        {/* Property Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Property Type
                            </label>
                            <select className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                <option>Select</option>
                            </select>
                        </div>

                        {/* Location Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Location Type
                            </label>
                            <div className="flex items-center gap-2">
                                {["CBD", "Urban", "Suburban"].map((type) => (
                                    <button
                                        key={type}
                                        className="px-4 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* CoStar Rating */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                CoStar Rating
                            </label>
                            <div className="flex items-center gap-1">
                                <StarRating rating={0} />
                                <button className="ml-2 text-gray-400 hover:text-gray-600">
                                    <Info className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Contacts Tab */}
                {mainTab === "contacts" && (
                    <div className="space-y-6">
                        {/* Tenant Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tenant Name
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Tenant Name or Ticker"
                                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        {/* HQ Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                HQ Location
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="City, State or Country"
                                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        {/* Contacts by Role */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contacts by Role
                            </label>
                            <select className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                <option>Select</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-4 bg-white shrink-0">
                <div className="flex items-center justify-between">
                    <button
                        onClick={onClear}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                        Show Criteria
                    </button>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onClear}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                        >
                            Clear
                        </button>
                        <button
                            onClick={onDone}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

