import { useState } from "react";
import SubmarketTransferList from "./Filters/SubmarketTransferList";
import MarketTransferList from "./Filters/MarketTransferList";
import PostcodeTransferList from "./Filters/PostcodeTransferList";
import CityTransferList from "./Filters/CityTransferList";
import CountryTransferList from "./Filters/CountryTransferList";

type LocationTab =
    | "submarket"
    | "market"
    | "postcode"
    | "city"
    | "country"
    | "country-divisions";

export default function LocationContentComponent() {
    const [activeTab, setActiveTab] = useState<LocationTab>("submarket");
    const [selectedSubmarkets, setSelectedSubmarkets] = useState<string[]>([]);
    const [selectedMarkets, setSelectedMarkets] = useState<string[]>([]);
    const [selectedPostcodes, setSelectedPostcodes] = useState<string[]>([]);
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
    const [selectedCountryDivisions, setSelectedCountryDivisions] = useState<
        string[]
    >([]);

    return (
        <div className="flex flex-col h-full overflow-hidden bg-gray-50">
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
                    <SubmarketTransferList
                        selectedSubmarkets={selectedSubmarkets}
                        onChange={setSelectedSubmarkets}
                    />
                )}

                {activeTab === "market" && (
                    <MarketTransferList
                        selectedMarkets={selectedMarkets}
                        onChange={setSelectedMarkets}
                    />
                )}

                {activeTab === "postcode" && (
                    <PostcodeTransferList
                        selectedPostcodes={selectedPostcodes}
                        onChange={setSelectedPostcodes}
                    />
                )}

                {activeTab === "city" && (
                    <CityTransferList
                        selectedCities={selectedCities}
                        onChange={setSelectedCities}
                    />
                )}

                {activeTab === "country" && (
                    <CountryTransferList
                        selectedCountries={selectedCountries}
                        onChange={setSelectedCountries}
                    />
                )}

                {activeTab === "country-divisions" && (
                    <CountryTransferList
                        selectedCountries={selectedCountryDivisions}
                        onChange={setSelectedCountryDivisions}
                    />
                )}
            </div>
        </div>
    );
}
