import { useState, useEffect } from "react";
import { Search, ChevronRight, ChevronsRight, ChevronLeft, ChevronsLeft, ChevronDown } from "lucide-react";

interface MarketTransferListProps {
    selectedMarkets?: string[];
    onChange?: (values: string[]) => void;
}

// Sample markets list - you can replace this with actual data
const SAMPLE_MARKETS = [
    "Abilene - TX", "Akron - OH", "Albany - GA", "Albany - NY", "Albuquerque - NM",
    "Alexandria - LA", "Allentown - PA", "Amarillo - TX", "Anaheim - CA", "Anchorage - AK",
    "Ann Arbor - MI", "Annapolis - MD", "Appleton - WI", "Asheville - NC", "Athens - GA",
    "Atlanta - GA", "Atlantic City - NJ", "Augusta - GA", "Austin - TX", "Bakersfield - CA",
    "Baltimore - MD", "Baton Rouge - LA", "Beaumont - TX", "Bellingham - WA", "Bend - OR",
    "Billings - MT", "Birmingham - AL", "Bismarck - ND", "Bloomington - IN", "Boise - ID",
    "Boston - MA", "Boulder - CO", "Bridgeport - CT", "Brownsville - TX", "Buffalo - NY",
    "Burlington - VT", "Canton - OH", "Cape Coral - FL", "Cedar Rapids - IA", "Charleston - SC",
    "Charleston - WV", "Charlotte - NC", "Chattanooga - TN", "Cheyenne - WY", "Chicago - IL",
    "Chico - CA", "Cincinnati - OH", "Clarksville - TN", "Cleveland - OH", "Colorado Springs - CO",
    "Columbia - MO", "Columbia - SC", "Columbus - GA", "Columbus - OH", "Corpus Christi - TX",
    "Dallas - TX", "Davenport - IA", "Dayton - OH", "Daytona Beach - FL", "Denver - CO",
    "Des Moines - IA", "Detroit - MI", "Dover - DE", "Durham - NC", "El Paso - TX",
    "Erie - PA", "Eugene - OR", "Evansville - IN", "Fargo - ND", "Fayetteville - AR",
    "Fayetteville - NC", "Fort Collins - CO", "Fort Lauderdale - FL", "Fort Myers - FL", "Fort Wayne - IN",
    "Fort Worth - TX", "Fresno - CA", "Gainesville - FL", "Grand Rapids - MI", "Greensboro - NC",
    "Greenville - SC", "Gulfport - MS", "Hagerstown - MD", "Harrisburg - PA", "Hartford - CT",
    "Honolulu - HI", "Houston - TX", "Huntington - WV", "Huntsville - AL", "Indianapolis - IN",
    "Iowa City - IA", "Jackson - MS", "Jacksonville - FL", "Jefferson City - MO", "Kansas City - MO",
    "Killeen - TX", "Knoxville - TN", "Lafayette - LA", "Lakeland - FL", "Lancaster - PA",
    "Lansing - MI", "Las Vegas - NV", "Lexington - KY", "Lincoln - NE", "Little Rock - AR",
    "Los Angeles - CA", "Louisville - KY", "Lubbock - TX", "Madison - WI", "Manchester - NH",
    "McAllen - TX", "Memphis - TN", "Miami - FL", "Milwaukee - WI", "Minneapolis - MN",
    "Mobile - AL", "Modesto - CA", "Montgomery - AL", "Nashville - TN", "New Haven - CT",
    "New Orleans - LA", "New York - NY", "Newark - NJ", "Norfolk - VA", "North Las Vegas - NV",
    "Oklahoma City - OK", "Olympia - WA", "Omaha - NE", "Orlando - FL", "Oxnard - CA",
    "Palm Bay - FL", "Pensacola - FL", "Peoria - IL", "Philadelphia - PA", "Phoenix - AZ",
    "Pittsburgh - PA", "Plano - TX", "Portland - ME", "Portland - OR", "Providence - RI",
    "Provo - UT", "Raleigh - NC", "Reno - NV", "Richmond - VA", "Riverside - CA",
    "Rochester - NY", "Rockford - IL", "Sacramento - CA", "Saint Louis - MO", "Saint Paul - MN",
    "Salem - OR", "Salinas - CA", "Salt Lake City - UT", "San Antonio - TX", "San Diego - CA",
    "San Francisco - CA", "San Jose - CA", "Santa Ana - CA", "Santa Barbara - CA", "Santa Rosa - CA",
    "Sarasota - FL", "Savannah - GA", "Scranton - PA", "Seattle - WA", "Shreveport - LA",
    "Sioux Falls - SD", "South Bend - IN", "Spokane - WA", "Springfield - IL", "Springfield - MA",
    "Springfield - MO", "St. Petersburg - FL", "Stockton - CA", "Syracuse - NY", "Tallahassee - FL",
    "Tampa - FL", "Toledo - OH", "Topeka - KS", "Trenton - NJ", "Tucson - AZ",
    "Tulsa - OK", "Tuscaloosa - AL", "Virginia Beach - VA", "Washington - DC", "Wichita - KS",
    "Wilmington - DE", "Wilmington - NC", "Winston-Salem - NC", "Worcester - MA", "Yonkers - NY",
    "Youngstown - OH", "Yuma - AZ"
];

export default function MarketTransferList({
    selectedMarkets = [],
    onChange,
}: MarketTransferListProps) {
    const [availableMarkets, setAvailableMarkets] = useState<string[]>(SAMPLE_MARKETS);
    const [selected, setSelected] = useState<string[]>(selectedMarkets);
    const [searchQuery, setSearchQuery] = useState("");
    const [highlightedAvailable, setHighlightedAvailable] = useState<string | null>(null);
    const [highlightedSelected, setHighlightedSelected] = useState<string | null>(null);
    const [selectedCountry, setSelectedCountry] = useState("United States");

    // Filter available markets based on search
    const filteredAvailable = availableMarkets.filter((market) =>
        market.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Update selected when prop changes
    useEffect(() => {
        setSelected(selectedMarkets);
        setAvailableMarkets(SAMPLE_MARKETS.filter(market => !selectedMarkets.includes(market)));
    }, [selectedMarkets]);

    const handleMoveRight = () => {
        if (highlightedAvailable) {
            const newSelected = [...selected, highlightedAvailable];
            setSelected(newSelected);
            setAvailableMarkets(availableMarkets.filter((m) => m !== highlightedAvailable));
            setHighlightedAvailable(null);
            onChange?.(newSelected);
        }
    };

    const handleMoveAllRight = () => {
        const newSelected = [...selected, ...filteredAvailable];
        setSelected(newSelected);
        setAvailableMarkets(availableMarkets.filter((m) => !filteredAvailable.includes(m)));
        setHighlightedAvailable(null);
        onChange?.(newSelected);
    };

    const handleMoveLeft = () => {
        if (highlightedSelected) {
            const newSelected = selected.filter((m) => m !== highlightedSelected);
            setSelected(newSelected);
            setAvailableMarkets([...availableMarkets, highlightedSelected]);
            setHighlightedSelected(null);
            onChange?.(newSelected);
        }
    };

    const handleMoveAllLeft = () => {
        setAvailableMarkets([...availableMarkets, ...selected]);
        setSelected([]);
        setHighlightedSelected(null);
        onChange?.([]);
    };

    const handleDoubleClickAvailable = (market: string) => {
        const newSelected = [...selected, market];
        setSelected(newSelected);
        setAvailableMarkets(availableMarkets.filter((m) => m !== market));
        onChange?.(newSelected);
    };

    return (
        <div className="space-y-4">
            {/* Country Filter */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                </label>
                <div className="relative">
                    <select
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                    >
                        <option>United States</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {/* Transfer List */}
            <div className="grid grid-cols-12 gap-4">
                {/* Available Markets */}
                <div className="col-span-5 flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Available Markets
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
                                {filteredAvailable.map((market) => (
                                    <li
                                        key={market}
                                        onClick={() =>
                                            setHighlightedAvailable(
                                                highlightedAvailable === market ? null : market
                                            )
                                        }
                                        onDoubleClick={() => handleDoubleClickAvailable(market)}
                                        className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 transition-colors ${
                                            highlightedAvailable === market
                                                ? "bg-blue-50 text-blue-700 font-medium"
                                                : "text-gray-700"
                                        }`}
                                    >
                                        {market}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="p-4 text-center text-sm text-gray-500">
                                No markets available
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
                        <ChevronsRight className="h-4 w-4 mx-auto" />
                    </button>
                    <button
                        type="button"
                        onClick={handleMoveRight}
                        disabled={!highlightedAvailable}
                        className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight className="h-4 w-4 mx-auto" />
                    </button>
                    <button
                        type="button"
                        onClick={handleMoveLeft}
                        disabled={!highlightedSelected}
                        className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft className="h-4 w-4 mx-auto" />
                    </button>
                    <button
                        type="button"
                        onClick={handleMoveAllLeft}
                        disabled={selected.length === 0}
                        className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronsLeft className="h-4 w-4 mx-auto" />
                    </button>
                </div>

                {/* Selected Markets */}
                <div className="col-span-5 flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Selected Markets
                    </label>
                    <div className="flex-1 border border-gray-300 rounded-md bg-white min-h-[300px] max-h-[400px] overflow-y-auto">
                        {selected.length > 0 ? (
                            <ul className="divide-y divide-gray-200">
                                {selected.map((market) => (
                                    <li
                                        key={market}
                                        onClick={() =>
                                            setHighlightedSelected(
                                                highlightedSelected === market ? null : market
                                            )
                                        }
                                        className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 transition-colors ${
                                            highlightedSelected === market
                                                ? "bg-blue-50 text-blue-700 font-medium"
                                                : "text-gray-700"
                                        }`}
                                    >
                                        {market}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="p-4 text-center text-sm text-gray-400">
                                <p className="mb-2">
                                    Select Markets from the list on the left by double clicking.
                                </p>
                                <p className="mb-2">Or</p>
                                <p>
                                    Single click to highlight and use the arrow buttons to add to
                                    the list of Selected Markets.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

