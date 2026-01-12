import { useState, useEffect, useRef } from "react";
import { Search, ChevronDown } from "lucide-react";

interface PostcodeTransferListProps {
    selectedPostcodes?: string[];
    onChange?: (values: string[]) => void;
}

// Sample postcodes list with city names - you can replace this with actual data
const SAMPLE_POSTCODES = [
    "30002, Avondale Estates",
    "30004, Alpharetta",
    "30005, Alpharetta",
    "30008, Marietta",
    "30009, Alpharetta",
    "30011, Auburn",
    "30012, Conyers",
    "30013, Conyers",
    "30014, Covington",
    "30016, Covington",
    "30017, Grayson",
    "30019, Dacula",
    "30021, Clarkston",
    "30022, Alpharetta",
    "30024, Suwanee",
    "30025, Social Circle",
    "30028, Cumming",
    "30030, Decatur",
    "30032, Decatur",
    "30033, Decatur",
    "30034, Decatur",
    "30035, Decatur",
    "30038, Lithonia",
    "30039, Snellville",
    "30040, Cumming",
    "30041, Cumming",
    "30043, Lawrenceville",
    "30044, Lawrenceville",
    "30045, Lawrenceville",
    "30046, Lawrenceville",
    "30047, Lilburn",
    "30052, Loganville",
    "30054, Oxford",
    "30055, Mansfield",
    "30056, Newborn",
    "30058, Norcross",
    "30060, Marietta",
    "30061, Marietta",
    "30062, Marietta",
    "30063, Marietta",
    "30064, Marietta",
    "30065, Marietta",
    "30066, Marietta",
    "30067, Marietta",
    "30068, Marietta",
    "30069, Marietta",
    "30070, Powder Springs",
    "30071, Hiram",
    "30072, Roswell",
    "30073, Roswell",
    "30074, Roswell",
    "30075, Roswell",
    "30076, Roswell",
    "30077, Roswell",
    "30078, Snellville",
    "30079, Snellville",
    "30080, Stone Mountain",
    "30082, Stone Mountain",
    "30083, Tucker",
    "30084, Tucker",
    "30085, Tucker",
    "30086, Tucker",
    "30087, Tucker",
    "30088, Tucker",
    "30090, Douglasville",
    "30091, Douglasville",
    "30092, Douglasville",
    "30093, Douglasville",
    "30094, Villa Rica",
    "30095, Winston",
    "30096, Winston",
    "30097, Winston",
    "30098, Winston",
    "30099, Winston",
];

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

export default function PostcodeTransferList({
    selectedPostcodes = [],
    onChange,
}: PostcodeTransferListProps) {
    const [availablePostcodes, setAvailablePostcodes] =
        useState<string[]>(SAMPLE_POSTCODES);
    const [selected, setSelected] = useState<string[]>(selectedPostcodes);
    const [highlightedAvailable, setHighlightedAvailable] = useState<
        string | null
    >(null);
    const [highlightedSelected, setHighlightedSelected] = useState<
        string | null
    >(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("United States");
    const [selectedState, setSelectedState] = useState("Georgia");
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

    // Update selected when prop changes
    useEffect(() => {
        setSelected(selectedPostcodes);
        setAvailablePostcodes(
            SAMPLE_POSTCODES.filter(
                (postcode) => !selectedPostcodes.includes(postcode)
            )
        );
    }, [selectedPostcodes]);

    // Filter available postcodes based on search
    const filteredAvailable = availablePostcodes.filter((postcode) =>
        postcode.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleMoveRight = () => {
        if (highlightedAvailable) {
            const newSelected = [...selected, highlightedAvailable];
            setSelected(newSelected);
            setAvailablePostcodes(
                availablePostcodes.filter((p) => p !== highlightedAvailable)
            );
            setHighlightedAvailable(null);
            onChange?.(newSelected);
        }
    };

    const handleMoveAllRight = () => {
        const newSelected = [...selected, ...filteredAvailable];
        setSelected(newSelected);
        setAvailablePostcodes(
            availablePostcodes.filter((p) => !filteredAvailable.includes(p))
        );
        setHighlightedAvailable(null);
        onChange?.(newSelected);
    };

    const handleMoveLeft = () => {
        if (highlightedSelected) {
            const newAvailable = [...availablePostcodes, highlightedSelected];
            setAvailablePostcodes(newAvailable);
            setSelected(selected.filter((p) => p !== highlightedSelected));
            setHighlightedSelected(null);
            const newSelected = selected.filter(
                (p) => p !== highlightedSelected
            );
            onChange?.(newSelected);
        }
    };

    const handleMoveAllLeft = () => {
        setAvailablePostcodes([...availablePostcodes, ...selected]);
        setSelected([]);
        setHighlightedSelected(null);
        onChange?.([]);
    };

    const handleDoubleClickAvailable = (postcode: string) => {
        const newSelected = [...selected, postcode];
        setSelected(newSelected);
        setAvailablePostcodes(availablePostcodes.filter((p) => p !== postcode));
        onChange?.(newSelected);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-4">
            {/* Country and State Filters */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                <div className="grid grid-cols-2 gap-4">
                    {/* Country */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Country
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={selectedCountry}
                                onChange={(e) =>
                                    setSelectedCountry(e.target.value)
                                }
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

                    {/* State */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            State
                        </label>
                        <div className="relative" ref={stateDropdownRef}>
                            <input
                                type="text"
                                value={selectedState}
                                onChange={(e) =>
                                    setSelectedState(e.target.value)
                                }
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
            </div>

            {/* Postcode Selection */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                <div className="grid grid-cols-12 gap-4">
                    {/* Available Postcodes */}
                    <div className="col-span-5 flex flex-col">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Available Postcodes
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
                                    {filteredAvailable.map((postcode) => (
                                        <li
                                            key={postcode}
                                            onClick={() =>
                                                setHighlightedAvailable(
                                                    highlightedAvailable ===
                                                        postcode
                                                        ? null
                                                        : postcode
                                                )
                                            }
                                            onDoubleClick={() =>
                                                handleDoubleClickAvailable(
                                                    postcode
                                                )
                                            }
                                            className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 transition-colors ${
                                                highlightedAvailable ===
                                                postcode
                                                    ? "bg-blue-50 text-blue-700 font-medium"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            {postcode}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="p-4 text-center text-sm text-gray-500">
                                    No postcodes available
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

                    {/* Selected Postcodes */}
                    <div className="col-span-5 flex flex-col">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Selected Postcodes
                        </label>
                        <div className="flex-1 border border-gray-300 rounded-md bg-white min-h-[300px] max-h-[400px] overflow-y-auto">
                            {selected.length > 0 ? (
                                <ul className="divide-y divide-gray-200">
                                    {selected.map((postcode) => (
                                        <li
                                            key={postcode}
                                            onClick={() =>
                                                setHighlightedSelected(
                                                    highlightedSelected ===
                                                        postcode
                                                        ? null
                                                        : postcode
                                                )
                                            }
                                            className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 transition-colors ${
                                                highlightedSelected === postcode
                                                    ? "bg-blue-50 text-blue-700 font-medium"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            {postcode}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="p-4 text-center text-sm text-gray-400 space-y-1">
                                    <p>
                                        Single click to highlight and use the
                                        arrow buttons to add to the list of
                                        Selected Postcodes.
                                    </p>
                                    <p>Or</p>
                                    <p>
                                        Select Postcodes from the list on the
                                        left by double clicking.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
