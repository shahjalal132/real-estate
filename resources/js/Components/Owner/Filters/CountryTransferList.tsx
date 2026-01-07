import { useState, useEffect } from "react";
import { Search, ChevronRight, ChevronsRight, ChevronLeft, ChevronsLeft, ChevronDown } from "lucide-react";

interface CountryTransferListProps {
    selectedCountries?: string[];
    onChange?: (values: string[]) => void;
}

// Sample countries list - same as CountryFocusSelector
const ALL_COUNTRIES = [
    "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola",
    "Anguilla", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Ascension",
    "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh",
    "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan",
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
    "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde",
    "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Colombia",
    "Comoros", "Congo", "Cook Islands", "Costa Rica", "Croatia", "Cuba", "Cyprus",
    "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia",
    "Ethiopia", "Fiji", "Finland", "France", "French Polynesia", "Gabon", "Gambia",
    "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guam", "Guatemala",
    "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong",
    "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
    "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
    "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
    "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau",
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
    "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
    "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal",
    "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea",
    "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama",
    "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
    "Puerto Rico", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
    "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Sao Tome and Principe",
    "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
    "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea",
    "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
    "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo",
    "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
    "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
    "Yemen", "Zambia", "Zimbabwe"
];

const CONTINENTS = [
    "All Continents",
    "Africa",
    "Asia",
    "Europe",
    "North America",
    "South America",
    "Oceania",
    "Antarctica"
];

const SUBCONTINENTS = [
    "All Subcontinents",
    "Eastern Africa",
    "Middle Africa",
    "Northern Africa",
    "Southern Africa",
    "Western Africa",
    "Central Asia",
    "Eastern Asia",
    "Southern Asia",
    "Southeast Asia",
    "Western Asia",
    "Eastern Europe",
    "Northern Europe",
    "Southern Europe",
    "Western Europe",
    "Caribbean",
    "Central America",
    "Northern America",
    "South America",
    "Australia and New Zealand",
    "Melanesia",
    "Micronesia",
    "Polynesia"
];

export default function CountryTransferList({
    selectedCountries = [],
    onChange,
}: CountryTransferListProps) {
    const [availableCountries, setAvailableCountries] = useState<string[]>(ALL_COUNTRIES);
    const [selected, setSelected] = useState<string[]>(selectedCountries);
    const [searchQuery, setSearchQuery] = useState("");
    const [highlightedAvailable, setHighlightedAvailable] = useState<string | null>(null);
    const [highlightedSelected, setHighlightedSelected] = useState<string | null>(null);
    const [selectedContinent, setSelectedContinent] = useState("All Continents");
    const [selectedSubcontinent, setSelectedSubcontinent] = useState("All Subcontinents");

    // Filter available countries based on search
    const filteredAvailable = availableCountries.filter((country) =>
        country.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Update selected when prop changes
    useEffect(() => {
        setSelected(selectedCountries);
        setAvailableCountries(ALL_COUNTRIES.filter(country => !selectedCountries.includes(country)));
    }, [selectedCountries]);

    const handleMoveRight = () => {
        if (highlightedAvailable) {
            const newSelected = [...selected, highlightedAvailable];
            setSelected(newSelected);
            setAvailableCountries(availableCountries.filter((c) => c !== highlightedAvailable));
            setHighlightedAvailable(null);
            onChange?.(newSelected);
        }
    };

    const handleMoveAllRight = () => {
        const newSelected = [...selected, ...filteredAvailable];
        setSelected(newSelected);
        setAvailableCountries(availableCountries.filter((c) => !filteredAvailable.includes(c)));
        setHighlightedAvailable(null);
        onChange?.(newSelected);
    };

    const handleMoveLeft = () => {
        if (highlightedSelected) {
            const newSelected = selected.filter((c) => c !== highlightedSelected);
            setSelected(newSelected);
            setAvailableCountries([...availableCountries, highlightedSelected]);
            setHighlightedSelected(null);
            onChange?.(newSelected);
        }
    };

    const handleMoveAllLeft = () => {
        setAvailableCountries([...availableCountries, ...selected]);
        setSelected([]);
        setHighlightedSelected(null);
        onChange?.([]);
    };

    const handleDoubleClickAvailable = (country: string) => {
        const newSelected = [...selected, country];
        setSelected(newSelected);
        setAvailableCountries(availableCountries.filter((c) => c !== country));
        onChange?.(newSelected);
    };

    return (
        <div className="space-y-4">
            {/* Continent and Subcontinent Filters */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Continent Area
                    </label>
                    <div className="relative">
                        <select
                            value={selectedContinent}
                            onChange={(e) => setSelectedContinent(e.target.value)}
                            className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                        >
                            {CONTINENTS.map(continent => (
                                <option key={continent} value={continent}>
                                    {continent}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subcontinents
                    </label>
                    <div className="relative">
                        <select
                            value={selectedSubcontinent}
                            onChange={(e) => setSelectedSubcontinent(e.target.value)}
                            className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                        >
                            {SUBCONTINENTS.map(subcontinent => (
                                <option key={subcontinent} value={subcontinent}>
                                    {subcontinent}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Transfer List */}
            <div className="grid grid-cols-12 gap-4">
                {/* Available Countries */}
                <div className="col-span-5 flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Available Countries
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
                                {filteredAvailable.map((country) => (
                                    <li
                                        key={country}
                                        onClick={() =>
                                            setHighlightedAvailable(
                                                highlightedAvailable === country ? null : country
                                            )
                                        }
                                        onDoubleClick={() => handleDoubleClickAvailable(country)}
                                        className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 transition-colors ${
                                            highlightedAvailable === country
                                                ? "bg-blue-50 text-blue-700 font-medium"
                                                : "text-gray-700"
                                        }`}
                                    >
                                        {country}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="p-4 text-center text-sm text-gray-500">
                                No countries available
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

                {/* Selected Countries */}
                <div className="col-span-5 flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Selected Countries
                    </label>
                    <div className="flex-1 border border-gray-300 rounded-md bg-white min-h-[300px] max-h-[400px] overflow-y-auto">
                        {selected.length > 0 ? (
                            <ul className="divide-y divide-gray-200">
                                {selected.map((country) => (
                                    <li
                                        key={country}
                                        onClick={() =>
                                            setHighlightedSelected(
                                                highlightedSelected === country ? null : country
                                            )
                                        }
                                        className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 transition-colors ${
                                            highlightedSelected === country
                                                ? "bg-blue-50 text-blue-700 font-medium"
                                                : "text-gray-700"
                                        }`}
                                    >
                                        {country}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="p-4 text-center text-sm text-gray-400">
                                <p className="mb-2">
                                    Select Countries from the list on the left by double clicking.
                                </p>
                                <p className="mb-2">Or</p>
                                <p>
                                    Single click to highlight and use the arrow buttons to add to
                                    the list of Selected Countries.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

