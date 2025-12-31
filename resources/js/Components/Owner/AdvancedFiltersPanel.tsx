import { useState } from "react";
import { X, Search, MapPin } from "lucide-react";

interface AdvancedFiltersPanelProps {
    isOpen: boolean;
    onClose: () => void;
    onClear: () => void;
    onDone: () => void;
    activeFiltersCount?: number;
}

export default function AdvancedFiltersPanel({
    isOpen,
    onClose,
    onClear,
    onDone,
    activeFiltersCount = 0,
}: AdvancedFiltersPanelProps) {
    const [topTab, setTopTab] = useState<"search" | "location">("search");
    const [mainTab, setMainTab] = useState<
        "portfolio" | "sales-transactions" | "sales-listings" | "funds"
    >("portfolio");

    if (!isOpen) return null;

    return (
        <div className="h-full w-full bg-white flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
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
                <div className="border-b border-gray-200 bg-white px-4">
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
                            onClick={() => setMainTab("sales-transactions")}
                            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                                mainTab === "sales-transactions"
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Sales Transactions
                        </button>
                        <button
                            onClick={() => setMainTab("sales-listings")}
                            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                                mainTab === "sales-listings"
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Sales Listings
                        </button>
                        <button
                            onClick={() => setMainTab("funds")}
                            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                                mainTab === "funds"
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Funds
                        </button>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50">
                    {/* Portfolio Tab */}
                    {mainTab === "portfolio" && (
                        <div className="space-y-4">
                            {/* Portfolio Size */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Portfolio Size
                                </label>
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

                            {/* Properties Owned */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Properties Owned
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="Min Properti..."
                                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-500 text-sm">–</span>
                                    <input
                                        type="text"
                                        placeholder="Max Propert..."
                                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <select className="w-32 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                        <option># of Properties</option>
                                    </select>
                                </div>
                            </div>

                            {/* Property meets the following criteria */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Property meets the following criteria:
                                </label>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="property-criteria"
                                            id="min-properties"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                        />
                                        <label
                                            htmlFor="min-properties"
                                            className="text-sm text-gray-700"
                                        >
                                            Minimum number of properties included in the
                                            portfolio:
                                        </label>
                                        <input
                                            type="text"
                                            className="ml-2 flex-1 max-w-32 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="property-criteria"
                                            id="percent-properties"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                        />
                                        <label
                                            htmlFor="percent-properties"
                                            className="text-sm text-gray-700"
                                        >
                                            % of properties included in the portfolio:
                                        </label>
                                        <input
                                            type="text"
                                            className="ml-2 flex-1 max-w-32 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Property Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Property Type
                                </label>
                                <select className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                    <option>Select</option>
                                    <option>Office</option>
                                    <option>Retail</option>
                                    <option>Industrial</option>
                                    <option>Multifamily</option>
                                </select>
                            </div>

                            {/* Secondary Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Secondary Type
                                </label>
                                <select className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                    <option>Select</option>
                                </select>
                            </div>

                            {/* Property Size */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Property Size
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

                            {/* CoStar Rating */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    CoStar Rating
                                </label>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            className="text-gray-300 hover:text-yellow-400 transition-colors"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </button>
                                    ))}
                                    <button className="ml-2 text-gray-400 hover:text-gray-600">
                                        <svg
                                            className="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
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
                        </div>
                    )}

                    {/* Sales Transactions Tab */}
                    {mainTab === "sales-transactions" && (
                        <div className="space-y-4">
                            {/* Minimum number of sales transactions */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Minimum number of sales transactions completed:{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    )}

                    {/* Sales Listings Tab */}
                    {mainTab === "sales-listings" && (
                        <div className="space-y-4">
                            {/* Sales Listings content - can be added later */}
                            <div className="text-sm text-gray-500">
                                Sales Listings filters coming soon...
                            </div>
                        </div>
                    )}

                    {/* Funds Tab */}
                    {mainTab === "funds" && (
                        <div className="space-y-4">
                            {/* Funds content - can be added later */}
                            <div className="text-sm text-gray-500">
                                Funds filters coming soon...
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 px-4 py-3 bg-white">
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

