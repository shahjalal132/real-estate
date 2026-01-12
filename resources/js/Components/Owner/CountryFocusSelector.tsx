import { useState, useEffect, useRef } from "react";
import {
    ChevronDown,
    X,
    Search,
    ChevronRight,
    ChevronsRight,
    ChevronLeft,
    ChevronsLeft,
} from "lucide-react";

interface CountryFocusSelectorProps {
    selectedCountries: string[];
    onChange: (values: string[]) => void;
}

// Sample countries list - you can replace this with actual data
const ALL_COUNTRIES = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Ascension",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Cayman Islands",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Cook Islands",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "French Polynesia",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guam",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macau",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
];

const CONTINENTS = [
    "All Continents",
    "Africa",
    "Asia",
    "Europe",
    "North America",
    "South America",
    "Oceania",
    "Antarctica",
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
    "Polynesia",
];

export default function CountryFocusSelector({
    selectedCountries = [],
    onChange,
}: CountryFocusSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [availableCountries, setAvailableCountries] =
        useState<string[]>(ALL_COUNTRIES);
    const [selected, setSelected] = useState<string[]>(selectedCountries);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedContinent, setSelectedContinent] =
        useState("All Continents");
    const [selectedSubcontinent, setSelectedSubcontinent] =
        useState("All Subcontinents");
    const [highlightedAvailable, setHighlightedAvailable] = useState<string[]>(
        []
    );
    const [highlightedSelected, setHighlightedSelected] = useState<string[]>(
        []
    );
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const selectorRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    // Initialize available countries (exclude selected ones)
    useEffect(() => {
        setAvailableCountries(
            ALL_COUNTRIES.filter((c) => !selected.includes(c))
        );
    }, [selected]);

    // Sync selected with prop changes
    useEffect(() => {
        setSelected(selectedCountries);
    }, [selectedCountries]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                selectorRef.current &&
                !selectorRef.current.contains(event.target as Node) &&
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
                setIsModalOpen(false);
            }
        };

        if (isOpen || isModalOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () =>
                document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isOpen, isModalOpen]);

    const getDisplayLabel = () => {
        if (selected.length === 0) {
            return "Country Focus";
        }
        if (selected.length === 1) {
            return selected[0];
        }
        return `${selected.length} Selected`;
    };

    const filteredAvailable = availableCountries.filter((country) =>
        country.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleMoveRight = () => {
        const toMove =
            highlightedAvailable.length > 0
                ? highlightedAvailable
                : filteredAvailable;
        const newSelected = [...selected, ...toMove];
        const newAvailable = availableCountries.filter(
            (c) => !toMove.includes(c)
        );
        setSelected(newSelected);
        setAvailableCountries(newAvailable);
        setHighlightedAvailable([]);
        onChange(newSelected);
    };

    const handleMoveAllRight = () => {
        const newSelected = [...selected, ...filteredAvailable];
        setSelected(newSelected);
        setAvailableCountries([]);
        setHighlightedAvailable([]);
        onChange(newSelected);
    };

    const handleMoveLeft = () => {
        const toMove =
            highlightedSelected.length > 0 ? highlightedSelected : selected;
        const newSelected = selected.filter((c) => !toMove.includes(c));
        const newAvailable = [...availableCountries, ...toMove];
        setSelected(newSelected);
        setAvailableCountries(newAvailable);
        setHighlightedSelected([]);
        onChange(newSelected);
    };

    const handleMoveAllLeft = () => {
        setAvailableCountries([...availableCountries, ...selected]);
        setSelected([]);
        setHighlightedSelected([]);
        onChange([]);
    };

    const handleDoubleClickAvailable = (country: string) => {
        const newSelected = [...selected, country];
        const newAvailable = availableCountries.filter((c) => c !== country);
        setSelected(newSelected);
        setAvailableCountries(newAvailable);
        onChange(newSelected);
    };

    const handleDoubleClickSelected = (country: string) => {
        const newSelected = selected.filter((c) => c !== country);
        const newAvailable = [...availableCountries, country];
        setSelected(newSelected);
        setAvailableCountries(newAvailable);
        onChange(newSelected);
    };

    const handleClear = () => {
        setSelected([]);
        setAvailableCountries(ALL_COUNTRIES);
        setHighlightedAvailable([]);
        setHighlightedSelected([]);
        onChange([]);
    };

    const handleDone = () => {
        setIsModalOpen(false);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={selectorRef}>
            <button
                type="button"
                onClick={() => {
                    setIsOpen(!isOpen);
                    setIsModalOpen(true);
                    // Calculate position for modal
                    if (selectorRef.current) {
                        const rect =
                            selectorRef.current.getBoundingClientRect();
                        setModalPosition({
                            top: rect.bottom + 4,
                            left: rect.left,
                        });
                    }
                }}
                className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                    selected.length > 0
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
            >
                <span className="whitespace-nowrap">{getDisplayLabel()}</span>
                <ChevronDown
                    className={`h-4 w-4 text-gray-400 transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {/* Dropdown Modal */}
            {isModalOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => {
                            setIsModalOpen(false);
                            setIsOpen(false);
                        }}
                    />
                    <div
                        ref={modalRef}
                        className="fixed z-50 w-[700px] max-h-[600px] rounded-lg border border-gray-200 bg-white shadow-xl overflow-hidden flex flex-col"
                        style={{
                            padding: "20px",
                            top: `${modalPosition.top}px`,
                            left: `${modalPosition.left}px`,
                        }}
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-xl font-normal text-[#103060]">
                                Country Focus
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="cursor-pointer text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Continent and Subcontinent Filters */}
                        <div className="mb-3 flex flex-col gap-3">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Continent Area
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedContinent}
                                        onChange={(e) =>
                                            setSelectedContinent(e.target.value)
                                        }
                                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    >
                                        {CONTINENTS.map((continent) => (
                                            <option
                                                key={continent}
                                                value={continent}
                                            >
                                                {continent}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Subcontinents
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedSubcontinent}
                                        onChange={(e) =>
                                            setSelectedSubcontinent(
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    >
                                        {SUBCONTINENTS.map((subcontinent) => (
                                            <option
                                                key={subcontinent}
                                                value={subcontinent}
                                            >
                                                {subcontinent}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Transfer List */}
                        <div className="mb-3 flex gap-3 flex-1 min-h-0">
                            {/* Available Countries */}
                            <div className="flex-1">
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Available Countries
                                </label>
                                <div className="border border-gray-300 rounded-md">
                                    {/* Search */}
                                    <div className="border-b border-gray-200 p-2">
                                        <div className="relative">
                                            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Search"
                                                value={searchQuery}
                                                onChange={(e) =>
                                                    setSearchQuery(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded border border-gray-300 bg-white pl-8 pr-2 py-1.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                    {/* List */}
                                    <div className="max-h-[280px] overflow-y-auto">
                                        {filteredAvailable.length === 0 ? (
                                            <div className="p-4 text-center text-sm text-gray-500">
                                                No countries available
                                            </div>
                                        ) : (
                                            filteredAvailable.map((country) => (
                                                <div
                                                    key={country}
                                                    onDoubleClick={() =>
                                                        handleDoubleClickAvailable(
                                                            country
                                                        )
                                                    }
                                                    onClick={() => {
                                                        setHighlightedAvailable(
                                                            highlightedAvailable.includes(
                                                                country
                                                            )
                                                                ? highlightedAvailable.filter(
                                                                      (c) =>
                                                                          c !==
                                                                          country
                                                                  )
                                                                : [
                                                                      ...highlightedAvailable,
                                                                      country,
                                                                  ]
                                                        );
                                                    }}
                                                    className={`cursor-pointer px-4 py-1.5 text-sm hover:bg-gray-100 transition-colors ${
                                                        highlightedAvailable.includes(
                                                            country
                                                        )
                                                            ? "bg-blue-100"
                                                            : ""
                                                    }`}
                                                >
                                                    {country}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Arrow Buttons */}
                            <div className="flex flex-col justify-center gap-2">
                                <button
                                    onClick={handleMoveAllRight}
                                    disabled={filteredAvailable.length === 0}
                                    className="rounded border border-gray-300 bg-white p-2 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Move all right"
                                >
                                    <ChevronsRight className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={handleMoveRight}
                                    disabled={
                                        highlightedAvailable.length === 0 &&
                                        filteredAvailable.length === 0
                                    }
                                    className="rounded border border-gray-300 bg-white p-2 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Move selected right"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={handleMoveLeft}
                                    disabled={
                                        highlightedSelected.length === 0 &&
                                        selected.length === 0
                                    }
                                    className="rounded border border-gray-300 bg-white p-2 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Move selected left"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={handleMoveAllLeft}
                                    disabled={selected.length === 0}
                                    className="rounded border border-gray-300 bg-white p-2 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Move all left"
                                >
                                    <ChevronsLeft className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Selected Countries */}
                            <div className="flex-1">
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Selected Countries
                                </label>
                                <div className="border border-gray-300 rounded-md">
                                    <div className="max-h-[280px] overflow-y-auto p-2">
                                        {selected.length === 0 ? (
                                            <div className="p-4 text-center text-sm text-gray-500">
                                                <div className="space-y-1">
                                                    <p>
                                                        Select Countries from
                                                        the list on the left by
                                                        double clicking.
                                                    </p>
                                                    <p>Or</p>
                                                    <p>
                                                        Single click to
                                                        highlight and use the
                                                        arrow buttons to add to
                                                        the list of Selected
                                                        Countries.
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            selected.map((country) => (
                                                <div
                                                    key={country}
                                                    onDoubleClick={() =>
                                                        handleDoubleClickSelected(
                                                            country
                                                        )
                                                    }
                                                    onClick={() => {
                                                        setHighlightedSelected(
                                                            highlightedSelected.includes(
                                                                country
                                                            )
                                                                ? highlightedSelected.filter(
                                                                      (c) =>
                                                                          c !==
                                                                          country
                                                                  )
                                                                : [
                                                                      ...highlightedSelected,
                                                                      country,
                                                                  ]
                                                        );
                                                    }}
                                                    className={`cursor-pointer px-4 py-1.5 text-sm hover:bg-gray-100 transition-colors ${
                                                        highlightedSelected.includes(
                                                            country
                                                        )
                                                            ? "bg-blue-100"
                                                            : ""
                                                    }`}
                                                >
                                                    {country}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-2 text-right border-t border-gray-200 pt-2">
                            <button
                                onClick={handleClear}
                                className="mr-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Clear
                            </button>
                            <button
                                onClick={handleDone}
                                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
