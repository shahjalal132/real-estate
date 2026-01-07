import CityTransferList from "./CityTransferList";
import MarketTransferList from "./MarketTransferList";
import CountryTransferList from "./CountryTransferList";

interface LocationFiltersProps {
    activeTab?: "city" | "market" | "country";
    cities?: string[];
    markets?: string[];
    countries?: string[];
    onCitiesChange?: (values: string[]) => void;
    onMarketsChange?: (values: string[]) => void;
    onCountriesChange?: (values: string[]) => void;
}

export default function LocationFilters({
    activeTab = "city",
    cities = [],
    markets = [],
    countries = [],
    onCitiesChange,
    onMarketsChange,
    onCountriesChange,
}: LocationFiltersProps) {
    return (
        <>
            {activeTab === "city" && (
                <CityTransferList
                    selectedCities={cities}
                    onChange={(values) => onCitiesChange?.(values)}
                />
            )}
            {activeTab === "market" && (
                <MarketTransferList
                    selectedMarkets={markets}
                    onChange={(values) => onMarketsChange?.(values)}
                />
            )}
            {activeTab === "country" && (
                <CountryTransferList
                    selectedCountries={countries}
                    onChange={(values) => onCountriesChange?.(values)}
                />
            )}
        </>
    );
}

