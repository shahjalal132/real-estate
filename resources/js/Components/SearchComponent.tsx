import { useState, useEffect, useRef } from "react";
import { Search, MapPin, Clock, Target, X } from "lucide-react";
import { router } from "@inertiajs/react";
import { getSavedFilters, SavedFilter } from "../utils/cookies";

interface SearchComponentProps {
    onClose?: () => void;
}

interface RecentSearch {
    id: string;
    query: string;
    type: "For Sale" | "For Lease";
    timestamp: number;
}

export default function SearchComponent({ onClose }: SearchComponentProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
    const [savedSearches, setSavedSearches] = useState<SavedFilter[]>([]);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Load recent searches from localStorage
    useEffect(() => {
        const stored = localStorage.getItem("recent_searches");
        if (stored) {
            try {
                setRecentSearches(JSON.parse(stored));
            } catch (error) {
                console.error("Error loading recent searches:", error);
            }
        }
    }, []);

    // Load saved searches from cookies
    useEffect(() => {
        setSavedSearches(getSavedFilters());
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Focus input when dropdown opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSearch = (
        query: string,
        type: "For Sale" | "For Lease" = "For Sale"
    ) => {
        if (!query.trim()) return;

        // Add to recent searches
        const newRecent: RecentSearch = {
            id: Date.now().toString(),
            query: query.trim(),
            type,
            timestamp: Date.now(),
        };

        const updated = [
            newRecent,
            ...recentSearches.filter((s) => s.query !== query.trim()),
        ].slice(0, 10); // Keep only last 10

        setRecentSearches(updated);
        localStorage.setItem("recent_searches", JSON.stringify(updated));

        // Navigate to search results
        const route =
            type === "For Sale" ? "/properties" : "/properties/rental";
        router.get(
            route,
            { search: query.trim() },
            {
                preserveState: false,
            }
        );

        setIsOpen(false);
        onClose?.();
    };

    const handleCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    // You can reverse geocode here or use coordinates
                    handleSearch(`${latitude}, ${longitude}`);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    alert(
                        "Unable to get your location. Please enter a location manually."
                    );
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };

    const handleRemoveRecent = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const updated = recentSearches.filter((s) => s.id !== id);
        setRecentSearches(updated);
        localStorage.setItem("recent_searches", JSON.stringify(updated));
    };

    const handleSavedSearchClick = (savedSearch: SavedFilter) => {
        // Navigate with saved filter parameters
        const filters = savedSearch.filters;
        const params: Record<string, any> = {};

        if (
            filters.location &&
            Array.isArray(filters.location) &&
            filters.location.length > 0
        ) {
            params.location = filters.location.join(",");
        }
        if (filters.keywords) params.keywords = filters.keywords;
        if (filters.propertyTypes && filters.propertyTypes.length > 0) {
            params.property_types = filters.propertyTypes.join(",");
        }
        // Add other filter params as needed

        router.get("/properties", params, {
            preserveState: false,
        });

        setIsOpen(false);
        onClose?.();
    };

    return (
        <div className="relative w-full" ref={searchRef}>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Enter a location or keyword"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && searchQuery.trim()) {
                            handleSearch(searchQuery);
                        }
                    }}
                    className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-2 text-sm text-gray-700 placeholder-gray-400 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:ring-opacity-20"
                />
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-[600px] overflow-y-auto">
                    {/* Current Location Button */}
                    <button
                        type="button"
                        onClick={handleCurrentLocation}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100"
                    >
                        <Target className="h-5 w-5 text-[#0066CC]" />
                        <span className="text-sm font-medium text-gray-700">
                            Current Location
                        </span>
                    </button>

                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                        <div className="border-b border-gray-100">
                            <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50">
                                <Clock className="h-4 w-4 text-gray-500" />
                                <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                                    Recent Searches
                                </h3>
                            </div>
                            <div className="py-1">
                                {recentSearches.map((search) => (
                                    <div
                                        key={search.id}
                                        className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors group"
                                    >
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <span className="text-sm text-gray-700 truncate">
                                                {search.query}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleSearch(
                                                        search.query,
                                                        search.type
                                                    )
                                                }
                                                className="px-3 py-1 rounded bg-[#0066CC] text-white text-xs font-semibold hover:bg-[#004C99] transition-colors whitespace-nowrap flex-shrink-0"
                                            >
                                                {search.type}
                                            </button>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={(e) =>
                                                handleRemoveRecent(search.id, e)
                                            }
                                            className="ml-2 p-1 rounded-full hover:bg-gray-200 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
                                            aria-label="Remove search"
                                        >
                                            <X className="h-4 w-4 text-gray-500" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Saved Searches */}
                    {savedSearches.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50">
                                <Search className="h-4 w-4 text-gray-500" />
                                <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                                    Saved Searches
                                </h3>
                            </div>
                            <div className="py-1">
                                {savedSearches.map((savedSearch) => (
                                    <div
                                        key={savedSearch.id}
                                        className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors group"
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleSavedSearchClick(
                                                    savedSearch
                                                )
                                            }
                                            className="flex items-center gap-3 flex-1 min-w-0 text-left"
                                        >
                                            <span className="text-sm text-gray-700 truncate">
                                                {savedSearch.name}
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSavedSearchClick(
                                                    savedSearch
                                                );
                                            }}
                                            className="px-3 py-1 rounded bg-[#0066CC] text-white text-xs font-semibold hover:bg-[#004C99] transition-colors whitespace-nowrap flex-shrink-0"
                                        >
                                            For Sale
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* No results message */}
                    {recentSearches.length === 0 &&
                        savedSearches.length === 0 && (
                            <div className="px-4 py-8 text-center text-sm text-gray-500">
                                No recent or saved searches
                            </div>
                        )}
                </div>
            )}
        </div>
    );
}
