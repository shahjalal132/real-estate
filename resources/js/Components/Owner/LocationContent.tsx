import { useRef } from "react";
import LocationFilters from "./Filters/LocationFilters";
import { LocationTabType, LocationFilterState } from "./types/filterState";
import { useScrollTracking, scrollToSection } from "./hooks/useScrollTracking";

interface LocationContentProps {
    activeTab: LocationTabType;
    onTabChange: (tab: LocationTabType) => void;
    filterState: LocationFilterState;
    onFilterStateChange: (updates: Partial<LocationFilterState>) => void;
}

const locationTabs: { id: LocationTabType; label: string }[] = [
    { id: "city", label: "City" },
    { id: "market", label: "Market" },
    { id: "country", label: "Country" },
];

export default function LocationContent({
    activeTab,
    onTabChange,
    filterState,
    onFilterStateChange,
}: LocationContentProps) {
    const cityRef = useRef<HTMLDivElement>(null);
    const marketRef = useRef<HTMLDivElement>(null);
    const countryRef = useRef<HTMLDivElement>(null);
    const locationScrollContainerRef = useRef<HTMLDivElement>(null);

    const sections = [
        { ref: cityRef, name: "city" as const },
        { ref: marketRef, name: "market" as const },
        { ref: countryRef, name: "country" as const },
    ];

    const refs = {
        city: cityRef,
        market: marketRef,
        country: countryRef,
    };

    useScrollTracking(
        sections,
        locationScrollContainerRef,
        activeTab,
        onTabChange,
        true
    );

    const handleScrollToSection = (section: LocationTabType) => {
        onTabChange(section);
        scrollToSection(section, refs, locationScrollContainerRef);
    };

    return (
        <>
            {/* Location Tabs */}
            <div className="border-b border-gray-200 bg-white px-4 shrink-0">
                <div className="flex items-center gap-1">
                    {locationTabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleScrollToSection(tab.id)}
                            className={`relative px-4 py-3 text-sm font-medium border-b-2 transition-all duration-300 ease-in-out ${
                                activeTab === tab.id
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                            }`}
                        >
                            <span className="relative z-10">{tab.label}</span>
                            {activeTab === tab.id && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 animate-pulse" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Vertically Scrollable Content */}
            <div
                ref={locationScrollContainerRef}
                className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50"
                style={{ scrollSnapType: "y mandatory" }}
            >
                <div className="flex flex-col gap-4 p-4">
                    {/* City Section */}
                    <div
                        ref={cityRef}
                        className="w-full shrink-0 bg-white rounded-lg border border-gray-200 shadow-sm"
                        style={{ scrollSnapAlign: "start" }}
                    >
                        <div className="p-6 space-y-4">
                            <LocationFilters
                                activeTab="city"
                                cities={filterState.cities}
                                markets={filterState.markets}
                                countries={filterState.countries}
                                onCitiesChange={(value) => {
                                    onFilterStateChange({ cities: value });
                                }}
                                onMarketsChange={(value) => {
                                    onFilterStateChange({ markets: value });
                                }}
                                onCountriesChange={(value) => {
                                    onFilterStateChange({ countries: value });
                                }}
                            />
                        </div>
                    </div>

                    {/* Market Section */}
                    <div
                        ref={marketRef}
                        className="w-full shrink-0 bg-white rounded-lg border border-gray-200 shadow-sm"
                        style={{ scrollSnapAlign: "start" }}
                    >
                        <div className="p-6 space-y-4">
                            <LocationFilters
                                activeTab="market"
                                cities={filterState.cities}
                                markets={filterState.markets}
                                countries={filterState.countries}
                                onCitiesChange={(value) => {
                                    onFilterStateChange({ cities: value });
                                }}
                                onMarketsChange={(value) => {
                                    onFilterStateChange({ markets: value });
                                }}
                                onCountriesChange={(value) => {
                                    onFilterStateChange({ countries: value });
                                }}
                            />
                        </div>
                    </div>

                    {/* Country Section */}
                    <div
                        ref={countryRef}
                        className="w-full shrink-0 bg-white rounded-lg border border-gray-200 shadow-sm"
                        style={{ scrollSnapAlign: "start" }}
                    >
                        <div className="p-6 space-y-4">
                            <LocationFilters
                                activeTab="country"
                                cities={filterState.cities}
                                markets={filterState.markets}
                                countries={filterState.countries}
                                onCitiesChange={(value) => {
                                    onFilterStateChange({ cities: value });
                                }}
                                onMarketsChange={(value) => {
                                    onFilterStateChange({ markets: value });
                                }}
                                onCountriesChange={(value) => {
                                    onFilterStateChange({ countries: value });
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

