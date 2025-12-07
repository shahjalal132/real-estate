import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

interface LocationFilterProps {
    value: string[];
    onChange: (value: string[]) => void;
}

const states = [
    { label: "Alaska", value: "Alaska" },
    { label: "Alabama", value: "Alabama" },
    { label: "Arkansas", value: "Arkansas" },
    { label: "Arizona", value: "Arizona" },
    { label: "California", value: "California" },
    { label: "Colorado", value: "Colorado" },
    { label: "Connecticut", value: "Connecticut" },
    { label: "District of Columbia", value: "District of Columbia" },
    { label: "Delaware", value: "Delaware" },
    { label: "Florida", value: "Florida" },
    { label: "Georgia", value: "Georgia" },
    { label: "Hawaii", value: "Hawaii" },
    { label: "Iowa", value: "Iowa" },
    { label: "Idaho", value: "Idaho" },
    { label: "Illinois", value: "Illinois" },
    { label: "Indiana", value: "Indiana" },
    { label: "Kansas", value: "Kansas" },
    { label: "Kentucky", value: "Kentucky" },
    { label: "Louisiana", value: "Louisiana" },
    { label: "Massachusetts", value: "Massachusetts" },
    { label: "Maryland", value: "Maryland" },
    { label: "Maine", value: "Maine" },
    { label: "Michigan", value: "Michigan" },
    { label: "Minnesota", value: "Minnesota" },
    { label: "Missouri", value: "Missouri" },
    { label: "Mississippi", value: "Mississippi" },
    { label: "Montana", value: "Montana" },
    { label: "North Carolina", value: "North Carolina" },
    { label: "North Dakota", value: "North Dakota" },
    { label: "Nebraska", value: "Nebraska" },
    { label: "New Hampshire", value: "New Hampshire" },
    { label: "New Jersey", value: "New Jersey" },
    { label: "New Mexico", value: "New Mexico" },
    { label: "Nevada", value: "Nevada" },
    { label: "New York", value: "New York" },
    { label: "Ohio", value: "Ohio" },
    { label: "Oklahoma", value: "Oklahoma" },
    { label: "Oregon", value: "Oregon" },
    { label: "Pennsylvania", value: "Pennsylvania" },
    { label: "Rhode Island", value: "Rhode Island" },
    { label: "South Carolina", value: "South Carolina" },
    { label: "South Dakota", value: "South Dakota" },
    { label: "Tennessee", value: "Tennessee" },
    { label: "Texas", value: "Texas" },
    { label: "Utah", value: "Utah" },
    { label: "Virginia", value: "Virginia" },
    { label: "Vermont", value: "Vermont" },
    { label: "Washington", value: "Washington" },
    { label: "Wisconsin", value: "Wisconsin" },
    { label: "West Virginia", value: "West Virginia" },
    { label: "Wyoming", value: "Wyoming" },
];

export default function LocationFilter({
    value = [],
    onChange,
}: LocationFilterProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState<
        typeof states
    >([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Filter states based on search query
    useEffect(() => {
        if (searchQuery.length >= 1) {
            const filtered = states.filter(
                (state) =>
                    state.label
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    state.value
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
            );
            setFilteredSuggestions(filtered.slice(0, 10)); // Limit to 10 results
            setIsOpen(true);
        } else {
            setIsOpen(false);
            setFilteredSuggestions([]);
        }
    }, [searchQuery]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setSearchQuery(newValue);
        setIsOpen(newValue.length >= 1);
    };

    const handleSelectSuggestion = (state: (typeof states)[0]) => {
        const locationValue = state.value;
        if (!value.includes(locationValue)) {
            onChange([...value, locationValue]);
        }
        setSearchQuery("");
        setIsOpen(false);
        inputRef.current?.focus();
    };

    const handleAddCustomLocation = () => {
        const trimmedQuery = searchQuery.trim();
        if (trimmedQuery && !value.includes(trimmedQuery)) {
            onChange([...value, trimmedQuery]);
            setSearchQuery("");
            setIsOpen(false);
            inputRef.current?.focus();
        }
    };

    const handleRemoveLocation = (locationToRemove: string) => {
        onChange(value.filter((loc) => loc !== locationToRemove));
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchQuery.trim()) {
            e.preventDefault();
            handleAddCustomLocation();
        } else if (e.key === "Escape") {
            setIsOpen(false);
        } else if (
            e.key === "Backspace" &&
            searchQuery === "" &&
            value.length > 0
        ) {
            // Remove last location when backspace is pressed on empty input
            handleRemoveLocation(value[value.length - 1]);
        }
    };

    const handleInputFocus = () => {
        if (searchQuery.length >= 1) {
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

            {/* Selected Locations as Chips */}
            {value.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-1.5">
                    {value.map((location) => (
                        <span
                            key={location}
                            className="inline-flex items-center gap-1 rounded bg-[#0066CC]/10 px-2 py-1 text-xs font-medium text-[#0066CC]"
                        >
                            {location}
                            <button
                                type="button"
                                onClick={() => handleRemoveLocation(location)}
                                className="rounded-full p-0.5 hover:bg-[#0066CC]/20 transition-colors"
                                aria-label={`Remove ${location}`}
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </span>
                    ))}
                </div>
            )}

            {/* Input Field */}
            <div className="relative">
                <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400" />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Type state, city, or zip code..."
                    value={searchQuery}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    onFocus={handleInputFocus}
                    className="w-full rounded border border-gray-300 bg-white pl-7 pr-2.5 py-1.5 text-xs text-gray-700 placeholder-gray-400 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-1 focus:ring-[#0066CC] focus:ring-opacity-20"
                />

                {/* Dropdown Suggestions */}
                {isOpen && searchQuery.length >= 1 && (
                    <div className="absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded border border-gray-200 bg-white shadow-lg">
                        {filteredSuggestions.length > 0 ? (
                            <>
                                <ul className="py-1">
                                    {filteredSuggestions.map((state, index) => (
                                        <li key={index}>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleSelectSuggestion(
                                                        state
                                                    )
                                                }
                                                disabled={value.includes(
                                                    state.value
                                                )}
                                                className={`w-full px-3 py-2 text-left text-xs transition-colors ${
                                                    value.includes(state.value)
                                                        ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                                                        : "hover:bg-gray-50 text-gray-700"
                                                }`}
                                            >
                                                {state.label}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                {searchQuery.trim() &&
                                    !filteredSuggestions.some(
                                        (s) =>
                                            s.value
                                                .toLowerCase()
                                                .includes(
                                                    searchQuery.toLowerCase()
                                                ) ||
                                            s.label
                                                .toLowerCase()
                                                .includes(
                                                    searchQuery.toLowerCase()
                                                )
                                    ) && (
                                        <div className="border-t border-gray-200">
                                            <button
                                                type="button"
                                                onClick={
                                                    handleAddCustomLocation
                                                }
                                                className="w-full px-3 py-2 text-left text-xs text-[#0066CC] hover:bg-gray-50 transition-colors"
                                            >
                                                Add "{searchQuery.trim()}"
                                            </button>
                                        </div>
                                    )}
                            </>
                        ) : (
                            searchQuery.trim() && (
                                <div className="border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={handleAddCustomLocation}
                                        className="w-full px-3 py-2 text-left text-xs text-[#0066CC] hover:bg-gray-50 transition-colors"
                                    >
                                        Add "{searchQuery.trim()}"
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
