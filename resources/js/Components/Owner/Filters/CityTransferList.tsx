import { useState, useEffect, useRef } from "react";
import { Search, ChevronDown } from "lucide-react";

interface CityTransferListProps {
    selectedCities?: string[];
    onChange?: (values: string[]) => void;
}

// Sample cities list - you can replace this with actual data
const SAMPLE_CITIES = [
    "Abbeville, AL",
    "Abernant, AL",
    "Adamsville, AL",
    "Addison, AL",
    "Adger, AL",
    "Akron, AL",
    "Alabama Port, AL",
    "Alabaster, AL",
    "Albertville, AL",
    "Alexander City, AL",
    "Aliceville, AL",
    "Allgood, AL",
    "Altoona, AL",
    "Andalusia, AL",
    "Anniston, AL",
    "Arab, AL",
    "Ardmore, AL",
    "Argo, AL",
    "Ariton, AL",
    "Arley, AL",
    "Ashford, AL",
    "Ashland, AL",
    "Ashville, AL",
    "Athens, AL",
    "Atmore, AL",
    "Attalla, AL",
    "Auburn, AL",
    "Autaugaville, AL",
    "Bay Minette, AL",
    "Bayou La Batre, AL",
    "Bear Creek, AL",
    "Beatrice, AL",
    "Beaverton, AL",
    "Belk, AL",
    "Benton, AL",
    "Berry, AL",
    "Bessemer, AL",
    "Billingsley, AL",
    "Birmingham, AL",
    "Blountsville, AL",
    "Blue Springs, AL",
    "Boaz, AL",
    "Boligee, AL",
    "Bon Air, AL",
    "Brantley, AL",
    "Brent, AL",
    "Brewton, AL",
    "Bridgeport, AL",
    "Brighton, AL",
    "Brilliant, AL",
    "Brundidge, AL",
    "Butler, AL",
    "Calera, AL",
    "Camden, AL",
    "Camp Hill, AL",
    "Carbon Hill, AL",
    "Cardiff, AL",
    "Carolina, AL",
    "Carrollton, AL",
    "Castleberry, AL",
    "Cedar Bluff, AL",
    "Center Point, AL",
    "Centre, AL",
    "Centreville, AL",
    "Chatom, AL",
    "Chelsea, AL",
    "Cherokee, AL",
    "Chickasaw, AL",
    "Childersburg, AL",
    "Citronelle, AL",
    "Clanton, AL",
    "Clay, AL",
    "Clayhatchee, AL",
    "Clayton, AL",
    "Cleveland, AL",
    "Clio, AL",
    "Coaling, AL",
    "Coffeeville, AL",
    "Coker, AL",
    "Collinsville, AL",
    "Columbia, AL",
    "Columbiana, AL",
    "Coosada, AL",
    "Cordova, AL",
    "Cottonwood, AL",
    "County Line, AL",
    "Courtland, AL",
    "Crossville, AL",
    "Cullman, AL",
    "Dadeville, AL",
    "Daleville, AL",
    "Daphne, AL",
    "Dauphin Island, AL",
    "Daviston, AL",
    "Dayton, AL",
    "Deatsville, AL",
    "Decatur, AL",
    "Demopolis, AL",
    "Detroit, AL",
    "Dodge City, AL",
    "Dora, AL",
    "Dothan, AL",
    "Double Springs, AL",
    "Douglas, AL",
    "Dozier, AL",
    "Dutton, AL",
    "East Brewton, AL",
    "Eclectic, AL",
    "Edgewater, AL",
    "Elba, AL",
    "Enterprise, AL",
    "Epes, AL",
    "Ethelsville, AL",
    "Eufaula, AL",
    "Eutaw, AL",
    "Eva, AL",
    "Evergreen, AL",
    "Excel, AL",
    "Fairfield, AL",
    "Fairhope, AL",
    "Fairview, AL",
    "Falkville, AL",
    "Faunsdale, AL",
    "Fayette, AL",
    "Five Points, AL",
    "Flomaton, AL",
    "Florala, AL",
    "Florence, AL",
    "Foley, AL",
    "Forkland, AL",
    "Fort Deposit, AL",
    "Fort Payne, AL",
    "Franklin, AL",
    "Frisco City, AL",
    "Fruithurst, AL",
    "Fulton, AL",
    "Fultondale, AL",
    "Fyffe, AL",
    "Gadsden, AL",
    "Gainesville, AL",
    "Gantt, AL",
    "Garden City, AL",
    "Gardendale, AL",
    "Gaylesville, AL",
    "Geiger, AL",
    "Geneva, AL",
    "Georgiana, AL",
    "Geraldine, AL",
    "Gilbertown, AL",
    "Glen Allen, AL",
    "Glencoe, AL",
    "Glenwood, AL",
    "Goldville, AL",
    "Good Hope, AL",
    "Goodwater, AL",
    "Gordo, AL",
    "Gordon, AL",
    "Goshen, AL",
    "Grant, AL",
    "Graysville, AL",
    "Greensboro, AL",
    "Greenville, AL",
    "Grove Hill, AL",
    "Guin, AL",
    "Gulf Shores, AL",
    "Guntersville, AL",
    "Gurley, AL",
    "Gu-Win, AL",
    "Hackleburg, AL",
    "Haleburg, AL",
    "Haleyville, AL",
    "Hamilton, AL",
    "Hammondville, AL",
    "Hanceville, AL",
    "Harperville, AL",
    "Hartford, AL",
    "Hartselle, AL",
    "Hayden, AL",
    "Hayneville, AL",
    "Headland, AL",
    "Heath, AL",
    "Heflin, AL",
    "Helena, AL",
    "Henagar, AL",
    "Highland Lake, AL",
    "Hillsboro, AL",
    "Hobson City, AL",
    "Hodges, AL",
    "Hokes Bluff, AL",
    "Holly Pond, AL",
    "Hollywood, AL",
    "Homewood, AL",
    "Hoover, AL",
    "Horn Hill, AL",
    "Hueytown, AL",
    "Huguley, AL",
    "Huntsville, AL",
    "Hurtsboro, AL",
    "Hytop, AL",
    "Indian Springs Village, AL",
    "Ingram, AL",
    "Ironton, AL",
    "Irondale, AL",
    "Jackson, AL",
    "Jackson's Gap, AL",
    "Jacksonville, AL",
    "Jasper, AL",
    "Jemison, AL",
    "Kansas, AL",
    "Kennedy, AL",
    "Killen, AL",
    "Kimberly, AL",
    "Kinsey, AL",
    "Kinston, AL",
    "La Fayette, AL",
    "Lake View, AL",
    "Lakeview, AL",
    "Lanett, AL",
    "Langston, AL",
    "Leeds, AL",
    "Leesburg, AL",
    "Leighton, AL",
    "Lester, AL",
    "Level Plains, AL",
    "Lexington, AL",
    "Libertyville, AL",
    "Lincoln, AL",
    "Linden, AL",
    "Lineville, AL",
    "Lipscomb, AL",
    "Lisman, AL",
    "Littleville, AL",
    "Livingston, AL",
    "Loachapoka, AL",
    "Lockhart, AL",
    "Locust Fork, AL",
    "Louisville, AL",
    "Lowndesboro, AL",
    "Loxley, AL",
    "Luverne, AL",
    "Lynn, AL",
    "Madison, AL",
    "Madrid, AL",
    "Magnolia Springs, AL",
    "Malvern, AL",
    "Maplesville, AL",
    "Margaret, AL",
    "Marion, AL",
    "Maytown, AL",
    "McIntosh, AL",
    "McKenzie, AL",
    "McMullen, AL",
    "Memphis, AL",
    "Mentone, AL",
    "Midfield, AL",
    "Midland City, AL",
    "Midway, AL",
    "Millbrook, AL",
    "Millport, AL",
    "Millry, AL",
    "Mobile, AL",
    "Monroeville, AL",
    "Montevallo, AL",
    "Montgomery, AL",
    "Moody, AL",
    "Mooresville, AL",
    "Morris, AL",
    "Mosses, AL",
    "Moulton, AL",
    "Moundville, AL",
    "Mount Vernon, AL",
    "Mountain Brook, AL",
    "Mount Olive, AL",
    "Mountville, AL",
    "Mulga, AL",
    "Munford, AL",
    "Muscle Shoals, AL",
    "Myrtlewood, AL",
    "Napier Field, AL",
    "Natural Bridge, AL",
    "Nauvoo, AL",
    "Nectar, AL",
    "Needham, AL",
    "New Brockton, AL",
    "New Hope, AL",
    "New Site, AL",
    "Newbern, AL",
    "Newton, AL",
    "Newville, AL",
    "North Courtland, AL",
    "North Johns, AL",
    "Northport, AL",
    "Notasulga, AL",
    "Oak Grove, AL",
    "Oak Hill, AL",
    "Oakman, AL",
    "Odenville, AL",
    "Ohatchee, AL",
    "Oneonta, AL",
    "Onycha, AL",
    "Opelika, AL",
    "Opp, AL",
    "Orange Beach, AL",
    "Orrville, AL",
    "Owens Cross Roads, AL",
    "Oxford, AL",
    "Ozark, AL",
    "Paint Rock, AL",
    "Parrish, AL",
    "Pelham, AL",
    "Pell City, AL",
    "Pennington, AL",
    "Perdido Beach, AL",
    "Petrey, AL",
    "Phenix City, AL",
    "Phil Campbell, AL",
    "Pickensville, AL",
    "Piedmont, AL",
    "Pike Road, AL",
    "Pinckard, AL",
    "Pine Apple, AL",
    "Pine Hill, AL",
    "Pine Ridge, AL",
    "Pinson, AL",
    "Pisgah, AL",
    "Pleasant Grove, AL",
    "Pleasant Groves, AL",
    "Pollard, AL",
    "Powell, AL",
    "Prattville, AL",
    "Priceville, AL",
    "Prichard, AL",
    "Providence, AL",
    "Ragland, AL",
    "Rainbow City, AL",
    "Rainsville, AL",
    "Ramer, AL",
    "Ranburne, AL",
    "Red Bay, AL",
    "Red Level, AL",
    "Reece City, AL",
    "Reform, AL",
    "Rehobeth, AL",
    "Repton, AL",
    "Ridgeville, AL",
    "River Falls, AL",
    "Riverside, AL",
    "Riverview, AL",
    "Roanoke, AL",
    "Robertsdale, AL",
    "Rockford, AL",
    "Rogersville, AL",
    "Rosa, AL",
    "Russellville, AL",
    "Rutledge, AL",
    "Samson, AL",
    "Sand Rock, AL",
    "Sanford, AL",
    "Saraland, AL",
    "Sardis City, AL",
    "Satsuma, AL",
    "Scottsboro, AL",
    "Section, AL",
    "Selma, AL",
    "Sheffield, AL",
    "Shiloh, AL",
    "Shorter, AL",
    "Silas, AL",
    "Silverhill, AL",
    "Sipsey, AL",
    "Skyline, AL",
    "Slocomb, AL",
    "Smiths Station, AL",
    "Snead, AL",
    "Somerville, AL",
    "Southside, AL",
    "Spanish Fort, AL",
    "Sparkman, AL",
    "Speake, AL",
    "Springville, AL",
    "Steele, AL",
    "Stevenson, AL",
    "Sulligent, AL",
    "Sumiton, AL",
    "Summerdale, AL",
    "Susan Moore, AL",
    "Sweet Water, AL",
    "Sylacauga, AL",
    "Sylvania, AL",
    "Sylvan Springs, AL",
    "Talladega, AL",
    "Tallassee, AL",
    "Tarrant, AL",
    "Taylor, AL",
    "Thomaston, AL",
    "Thomasville, AL",
    "Thorsby, AL",
    "Town Creek, AL",
    "Toxey, AL",
    "Trafford, AL",
    "Triana, AL",
    "Trinity, AL",
    "Troy, AL",
    "Trussville, AL",
    "Tuscaloosa, AL",
    "Tuscumbia, AL",
    "Tuskegee, AL",
    "Twin, AL",
    "Union Grove, AL",
    "Union Springs, AL",
    "Uniontown, AL",
    "Valley, AL",
    "Valley Head, AL",
    "Vance, AL",
    "Vernon, AL",
    "Vestavia Hills, AL",
    "Vina, AL",
    "Vincent, AL",
    "Vredenburgh, AL",
    "Wadley, AL",
    "Waldo, AL",
    "Walnut Grove, AL",
    "Warrior, AL",
    "Waterloo, AL",
    "Waverly, AL",
    "Weaver, AL",
    "Webb, AL",
    "Wedowee, AL",
    "West Blocton, AL",
    "West Jefferson, AL",
    "West Point, AL",
    "Westover, AL",
    "Wetumpka, AL",
    "White Hall, AL",
    "Wilsonville, AL",
    "Wilton, AL",
    "Winfield, AL",
    "Woodland, AL",
    "Woodstock, AL",
    "Woodville, AL",
    "Yellow Bluff, AL",
    "York, AL",
];

export default function CityTransferList({
    selectedCities = [],
    onChange,
}: CityTransferListProps) {
    const [availableCities, setAvailableCities] =
        useState<string[]>(SAMPLE_CITIES);
    const [selected, setSelected] = useState<string[]>(selectedCities);
    const [searchQuery, setSearchQuery] = useState("");
    const [highlightedAvailable, setHighlightedAvailable] = useState<
        string | null
    >(null);
    const [highlightedSelected, setHighlightedSelected] = useState<
        string | null
    >(null);
    const [selectedCountry, setSelectedCountry] = useState("United States");
    const [selectedState, setSelectedState] = useState("Alabama");
    const [showStateDropdown, setShowStateDropdown] = useState(false);
    const stateDropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                stateDropdownRef.current &&
                !stateDropdownRef.current.contains(event.target as Node)
            ) {
                setShowStateDropdown(false);
            }
        };

        if (showStateDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showStateDropdown]);

    const US_STATES = [
        "All Subdivisions",
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
    ];

    const getStateAbbr = (stateName: string): string => {
        const stateMap: { [key: string]: string } = {
            Alabama: "AL",
            Alaska: "AK",
            Arizona: "AZ",
            Arkansas: "AR",
            California: "CA",
            Colorado: "CO",
            Connecticut: "CT",
            Delaware: "DE",
            Florida: "FL",
            Georgia: "GA",
            Hawaii: "HI",
            Idaho: "ID",
            Illinois: "IL",
            Indiana: "IN",
            Iowa: "IA",
            Kansas: "KS",
            Kentucky: "KY",
            Louisiana: "LA",
            Maine: "ME",
            Maryland: "MD",
            Massachusetts: "MA",
            Michigan: "MI",
            Minnesota: "MN",
            Mississippi: "MS",
            Missouri: "MO",
            Montana: "MT",
            Nebraska: "NE",
            Nevada: "NV",
            "New Hampshire": "NH",
            "New Jersey": "NJ",
            "New Mexico": "NM",
            "New York": "NY",
            "North Carolina": "NC",
            "North Dakota": "ND",
            Ohio: "OH",
            Oklahoma: "OK",
            Oregon: "OR",
            Pennsylvania: "PA",
            "Rhode Island": "RI",
            "South Carolina": "SC",
            "South Dakota": "SD",
            Tennessee: "TN",
            Texas: "TX",
            Utah: "UT",
            Vermont: "VT",
            Virginia: "VA",
            Washington: "WA",
            "West Virginia": "WV",
            Wisconsin: "WI",
            Wyoming: "WY",
        };
        return stateMap[stateName] || stateName;
    };

    // Filter cities by selected state
    const getCitiesByState = (stateName: string): string[] => {
        if (!stateName || stateName === "All Subdivisions") {
            return SAMPLE_CITIES;
        }
        const stateAbbr = getStateAbbr(stateName);
        return SAMPLE_CITIES.filter((city) => city.endsWith(`, ${stateAbbr}`));
    };

    // Update available cities when state or selectedCities changes
    useEffect(() => {
        const citiesForState = getCitiesByState(selectedState);
        const unselectedCities = citiesForState.filter(
            (city) => !selectedCities.includes(city)
        );
        setAvailableCities(unselectedCities);
    }, [selectedState, selectedCities]);

    // Update selected when prop changes
    useEffect(() => {
        setSelected(selectedCities);
    }, [selectedCities]);

    // Filter available cities based on search
    const filteredAvailable = availableCities.filter((city) =>
        city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleMoveRight = () => {
        if (highlightedAvailable) {
            const newSelected = [...selected, highlightedAvailable];
            setSelected(newSelected);
            setAvailableCities(
                availableCities.filter((c) => c !== highlightedAvailable)
            );
            setHighlightedAvailable(null);
            onChange?.(newSelected);
        }
    };

    const handleMoveAllRight = () => {
        const newSelected = [...selected, ...filteredAvailable];
        setSelected(newSelected);
        setAvailableCities(
            availableCities.filter((c) => !filteredAvailable.includes(c))
        );
        setHighlightedAvailable(null);
        onChange?.(newSelected);
    };

    const handleMoveLeft = () => {
        if (highlightedSelected) {
            const newSelected = selected.filter(
                (c) => c !== highlightedSelected
            );
            setSelected(newSelected);
            setAvailableCities([...availableCities, highlightedSelected]);
            setHighlightedSelected(null);
            onChange?.(newSelected);
        }
    };

    const handleMoveAllLeft = () => {
        setAvailableCities([...availableCities, ...selected]);
        setSelected([]);
        setHighlightedSelected(null);
        onChange?.([]);
    };

    const handleDoubleClickAvailable = (city: string) => {
        const newSelected = [...selected, city];
        setSelected(newSelected);
        setAvailableCities(availableCities.filter((c) => c !== city));
        onChange?.(newSelected);
    };

    return (
        <div className="space-y-4">
            {/* Country and State Filters */}
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                            placeholder="Select"
                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        >
                            <ChevronDown className="h-4 w-4" />
                        </button>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                    </label>
                    <div className="relative" ref={stateDropdownRef}>
                        <input
                            type="text"
                            value={selectedState}
                            onChange={(e) => setSelectedState(e.target.value)}
                            onFocus={() => setShowStateDropdown(true)}
                            placeholder="All Subdivisions"
                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setShowStateDropdown(!showStateDropdown)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                            <ChevronDown className="h-4 w-4" />
                        </button>
                        {showStateDropdown && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                {US_STATES.map((state) => (
                                    <button
                                        key={state}
                                        type="button"
                                        onClick={() => {
                                            setSelectedState(state);
                                            setShowStateDropdown(false);
                                        }}
                                        className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${
                                            selectedState === state
                                                ? "bg-blue-50 text-blue-700"
                                                : "text-gray-700"
                                        }`}
                                    >
                                        {state}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Transfer List */}
            <div className="grid grid-cols-12 gap-4">
                {/* Available Cities */}
                <div className="col-span-5 flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Available Cities
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
                                {filteredAvailable.map((city) => (
                                    <li
                                        key={city}
                                        onClick={() =>
                                            setHighlightedAvailable(
                                                highlightedAvailable === city
                                                    ? null
                                                    : city
                                            )
                                        }
                                        onDoubleClick={() =>
                                            handleDoubleClickAvailable(city)
                                        }
                                        className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 transition-colors ${
                                            highlightedAvailable === city
                                                ? "bg-blue-50 text-blue-700 font-medium"
                                                : "text-gray-700"
                                        }`}
                                    >
                                        {city}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="p-4 text-center text-sm text-gray-500">
                                No cities available
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
                        aria-label="move all right"
                    >
                        <svg
                            className="h-4 w-4 mx-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M3,5.88 L4.90283401,4 L13,12 L4.90283401,20 L3,18.12 L9.18083671,12 L3,5.88 L3,5.88 Z M11,5.88 L12.902834,4 L21,12 L12.902834,20 L11,18.12 L17.1808367,12 L11,5.88 Z" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={handleMoveRight}
                        disabled={!highlightedAvailable}
                        className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="move selected right"
                    >
                        <svg
                            className="h-4 w-4 mx-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <polygon points="8.90283401 4 7 5.88 13.1808367 12 7 18.12 8.90283401 20 17 12" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={handleMoveLeft}
                        disabled={!highlightedSelected}
                        className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="move selected left"
                    >
                        <svg
                            className="h-4 w-4 mx-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <polygon points="15.097166 4 17 5.88 10.8191633 12 17 18.12 15.097166 20 7 12" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={handleMoveAllLeft}
                        disabled={selected.length === 0}
                        className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="move all left"
                    >
                        <svg
                            className="h-4 w-4 mx-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path
                                d="M3,5.88 L4.90283401,4 L13,12 L4.90283401,20 L3,18.12 L9.18083671,12 L3,5.88 L3,5.88 Z M11,5.88 L12.902834,4 L21,12 L12.902834,20 L11,18.12 L17.1808367,12 L11,5.88 Z"
                                transform="translate(12.000000, 12.000000) scale(-1, 1) translate(-12.000000, -12.000000)"
                            />
                        </svg>
                    </button>
                </div>

                {/* Selected Cities */}
                <div className="col-span-5 flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Selected Cities
                    </label>
                    <div className="flex-1 border border-gray-300 rounded-md bg-white min-h-[300px] max-h-[400px] overflow-y-auto">
                        {selected.length > 0 ? (
                            <ul className="divide-y divide-gray-200">
                                {selected.map((city) => (
                                    <li
                                        key={city}
                                        onClick={() =>
                                            setHighlightedSelected(
                                                highlightedSelected === city
                                                    ? null
                                                    : city
                                            )
                                        }
                                        className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 transition-colors ${
                                            highlightedSelected === city
                                                ? "bg-blue-50 text-blue-700 font-medium"
                                                : "text-gray-700"
                                        }`}
                                    >
                                        {city}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="p-4 text-center text-sm text-gray-400 space-y-1">
                                <p>
                                    Select Cities from the list on the left by
                                    double clicking.
                                </p>
                                <p>Or</p>
                                <p>
                                    Single click to highlight and use the arrow
                                    buttons to add to the list of Selected
                                    Cities.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
