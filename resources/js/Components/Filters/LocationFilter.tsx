import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";

interface LocationFilterProps {
    value: string;
    onChange: (value: string) => void;
}

interface Location {
    city: string;
    state: string;
    stateName: string;
    county: string;
}

export default function LocationFilter({
    value,
    onChange,
}: LocationFilterProps) {
    const [searchQuery, setSearchQuery] = useState(value);
    const [allLocations, setAllLocations] = useState<Location[]>([]);
    const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Load locations from JSON file
    useEffect(() => {
        const loadLocations = async () => {
            try {
                const response = await fetch("/data/us-locations.json");
                const data = await response.json();
                setAllLocations(data);
            } catch (error) {
                console.error("Error loading locations:", error);
            }
        };
        loadLocations();
    }, []);

    // Filter locations based on search query
    useEffect(() => {
        if (searchQuery.length >= 2 && allLocations.length > 0) {
            setIsLoading(true);
            const filtered = allLocations.filter(
                (loc) =>
                    loc.city
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    loc.state
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    loc.stateName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    loc.county.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredLocations(filtered.slice(0, 10)); // Limit to 10 results
            setIsOpen(true);
            setIsLoading(false);
        } else if (searchQuery.length === 0) {
            setIsOpen(false);
            setFilteredLocations([]);
        }
    }, [searchQuery, allLocations]);

    // Sync searchQuery with value prop
    useEffect(() => {
        setSearchQuery(value);
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setSearchQuery(newValue);
        onChange(newValue);
        setIsOpen(newValue.length >= 2);
    };

    const handleSelectLocation = (location: Location) => {
        const locationString = `${location.city}, ${location.state}`;
        setSearchQuery(locationString);
        onChange(locationString);
        setIsOpen(false);
        inputRef.current?.focus();
    };

    const handleInputFocus = () => {
        if (searchQuery.length >= 2) {
            setIsOpen(true);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <label className="mb-2 block text-xs font-semibold text-gray-900">
                Location(s)
            </label>
            <div className="relative">
                <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400" />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="City, State, County, Zip Code"
                    value={searchQuery}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    className="w-full rounded border border-gray-300 bg-white pl-7 pr-2.5 py-1.5 text-xs text-gray-700 placeholder-gray-400 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-1 focus:ring-[#0066CC] focus:ring-opacity-20"
                />

                {/* Dropdown */}
                {isOpen && searchQuery.length >= 2 && (
                    <div className="absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded border border-gray-200 bg-white shadow-lg">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-4">
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#0066CC] border-t-transparent"></div>
                            </div>
                        ) : filteredLocations.length > 0 ? (
                            <ul className="py-1">
                                {filteredLocations.map((location, index) => (
                                    <li key={index}>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleSelectLocation(location)
                                            }
                                            className="w-full px-3 py-2 text-left text-xs hover:bg-gray-50 transition-colors text-gray-700"
                                        >
                                            <div className="font-medium">
                                                {location.city},{" "}
                                                {location.state}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {location.county},{" "}
                                                {location.stateName}
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="px-3 py-4 text-center text-xs text-gray-500">
                                No locations found
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
