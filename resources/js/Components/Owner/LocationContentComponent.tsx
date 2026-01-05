import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

type LocationTab = "submarket" | "market" | "postcode" | "city" | "country" | "country-divisions";

export default function LocationContentComponent() {
    const [activeTab, setActiveTab] = useState<LocationTab>("submarket");
    const [selectedSubmarkets, setSelectedSubmarkets] = useState<string[]>([]);
    const [availableSubmarkets, setAvailableSubmarkets] = useState<string[]>([]);
    const [highlightedAvailable, setHighlightedAvailable] = useState<string | null>(null);
    const [highlightedSelected, setHighlightedSelected] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Filter available submarkets based on search
    const filteredAvailable = availableSubmarkets.filter((submarket) =>
        submarket.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleMoveRight = () => {
        if (highlightedAvailable) {
            setSelectedSubmarkets([...selectedSubmarkets, highlightedAvailable]);
            setAvailableSubmarkets(
                availableSubmarkets.filter((s) => s !== highlightedAvailable)
            );
            setHighlightedAvailable(null);
        }
    };

    const handleMoveAllRight = () => {
        setSelectedSubmarkets([...selectedSubmarkets, ...filteredAvailable]);
        setAvailableSubmarkets(
            availableSubmarkets.filter((s) => !filteredAvailable.includes(s))
        );
        setHighlightedAvailable(null);
    };

    const handleMoveLeft = () => {
        if (highlightedSelected) {
            setAvailableSubmarkets([...availableSubmarkets, highlightedSelected]);
            setSelectedSubmarkets(
                selectedSubmarkets.filter((s) => s !== highlightedSelected)
            );
            setHighlightedSelected(null);
        }
    };

    const handleMoveAllLeft = () => {
        setAvailableSubmarkets([...availableSubmarkets, ...selectedSubmarkets]);
        setSelectedSubmarkets([]);
        setHighlightedSelected(null);
    };

    const handleDoubleClickAvailable = (submarket: string) => {
        setSelectedSubmarkets([...selectedSubmarkets, submarket]);
        setAvailableSubmarkets(
            availableSubmarkets.filter((s) => s !== submarket)
        );
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
            {/* Location Tabs */}
            <div className="border-b border-gray-200 bg-white px-4 shrink-0">
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setActiveTab("submarket")}
                        className={`relative px-4 py-3 text-sm font-medium border-b-2 transition-all duration-300 ease-in-out ${
                            activeTab === "submarket"
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                        }`}
                    >
                        <span className="relative z-10">Submarket</span>
                        {activeTab === "submarket" && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 animate-pulse" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab("market")}
                        className={`relative px-4 py-3 text-sm font-medium border-b-2 transition-all duration-300 ease-in-out ${
                            activeTab === "market"
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                        }`}
                    >
                        <span className="relative z-10">Market</span>
                        {activeTab === "market" && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 animate-pulse" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab("postcode")}
                        className={`relative px-4 py-3 text-sm font-medium border-b-2 transition-all duration-300 ease-in-out ${
                            activeTab === "postcode"
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                        }`}
                    >
                        <span className="relative z-10">Postcode</span>
                        {activeTab === "postcode" && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 animate-pulse" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab("city")}
                        className={`relative px-4 py-3 text-sm font-medium border-b-2 transition-all duration-300 ease-in-out ${
                            activeTab === "city"
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                        }`}
                    >
                        <span className="relative z-10">City</span>
                        {activeTab === "city" && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 animate-pulse" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab("country")}
                        className={`relative px-4 py-3 text-sm font-medium border-b-2 transition-all duration-300 ease-in-out ${
                            activeTab === "country"
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                        }`}
                    >
                        <span className="relative z-10">Country</span>
                        {activeTab === "country" && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 animate-pulse" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab("country-divisions")}
                        className={`relative px-4 py-3 text-sm font-medium border-b-2 transition-all duration-300 ease-in-out ${
                            activeTab === "country-divisions"
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                        }`}
                    >
                        <span className="relative z-10">Country Divisions</span>
                        {activeTab === "country-divisions" && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 animate-pulse" />
                        )}
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4">
                {activeTab === "submarket" && (
                    <div className="max-w-6xl mx-auto space-y-4">
                        {/* Filter Criteria */}
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                            <div className="grid grid-cols-4 gap-4">
                                {/* Country */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Country
                                    </label>
                                    <div className="relative">
                                        <select className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10">
                                            <option>United States</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Property Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Property Type
                                    </label>
                                    <div className="relative">
                                        <select className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10">
                                            <option>Office</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Market */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Market
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Abilene - TX"
                                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                                        />
                                        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Submarket Cluster */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Submarket Cluster
                                    </label>
                                    <div className="relative">
                                        <select className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10">
                                            <option>All Clusters</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submarket Selection */}
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                            <div className="grid grid-cols-12 gap-4">
                                {/* Available Submarkets */}
                                <div className="col-span-5 flex flex-col">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Available Submarkets
                                    </label>
                                    <div className="relative mb-2">
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                    <div className="flex-1 border border-gray-300 rounded-md bg-white min-h-[300px] max-h-[400px] overflow-y-auto">
                                        {filteredAvailable.length > 0 ? (
                                            <ul className="divide-y divide-gray-200">
                                                {filteredAvailable.map((submarket) => (
                                                    <li
                                                        key={submarket}
                                                        onClick={() =>
                                                            setHighlightedAvailable(
                                                                highlightedAvailable === submarket
                                                                    ? null
                                                                    : submarket
                                                            )
                                                        }
                                                        onDoubleClick={() =>
                                                            handleDoubleClickAvailable(
                                                                submarket
                                                            )
                                                        }
                                                        className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 transition-colors ${
                                                            highlightedAvailable === submarket
                                                                ? "bg-blue-50 text-blue-700 font-medium"
                                                                : "text-gray-700"
                                                        }`}
                                                    >
                                                        {submarket}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className="p-4 text-center text-sm text-gray-500">
                                                No submarkets available
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Selection Controls */}
                                <div className="col-span-2 flex flex-col items-center justify-center gap-2">
                                    <button
                                        type="button"
                                        onClick={handleMoveAllRight}
                                        disabled={filteredAvailable.length === 0}
                                        className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        &gt;&gt;
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleMoveRight}
                                        disabled={!highlightedAvailable}
                                        className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        &gt;
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleMoveLeft}
                                        disabled={!highlightedSelected}
                                        className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        &lt;
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleMoveAllLeft}
                                        disabled={selectedSubmarkets.length === 0}
                                        className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        &lt;&lt;
                                    </button>
                                </div>

                                {/* Selected Submarkets */}
                                <div className="col-span-5 flex flex-col">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Selected Submarkets
                                    </label>
                                    <div className="flex-1 border border-gray-300 rounded-md bg-white min-h-[300px] max-h-[400px] overflow-y-auto">
                                        {selectedSubmarkets.length > 0 ? (
                                            <ul className="divide-y divide-gray-200">
                                                {selectedSubmarkets.map((submarket) => (
                                                    <li
                                                        key={submarket}
                                                        onClick={() =>
                                                            setHighlightedSelected(
                                                                highlightedSelected === submarket
                                                                    ? null
                                                                    : submarket
                                                            )
                                                        }
                                                        className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 transition-colors ${
                                                            highlightedSelected === submarket
                                                                ? "bg-blue-50 text-blue-700 font-medium"
                                                                : "text-gray-700"
                                                        }`}
                                                    >
                                                        {submarket}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className="p-4 text-center text-sm text-gray-400">
                                                <p className="mb-2">
                                                    Select Submarkets from the list on the left
                                                    by double clicking.
                                                </p>
                                                <p className="mb-2">Or</p>
                                                <p>
                                                    Single click to highlight and use the arrow
                                                    buttons to add to the list of Selected
                                                    Submarkets.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Other tabs - Coming soon */}
                {activeTab !== "submarket" && (
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace("-", " ")} Filters
                            </h3>
                            <p className="text-sm text-gray-500">
                                Coming soon...
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

