import LocationFilters from "./Filters/LocationFilters";
import { LocationTabType, LocationFilterState } from "./types/filterState";

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
    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Location Tabs */}
            <div className="border-b border-gray-200 bg-white px-4 shrink-0">
                <div className="flex items-center gap-1">
                    {locationTabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
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

            {/* Tab Content */}
            <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-gray-50">
                <div className="p-4">
                    <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm">
                        <div className="p-6 space-y-4">
                            <LocationFilters
                                activeTab={activeTab}
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
        </div>
    );
}
