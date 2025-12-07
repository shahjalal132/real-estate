import { useState, useEffect, useRef } from "react";
import { Search, X, ChevronDown, Loader2 } from "lucide-react";
import axios from "axios";

interface Broker {
    id: number;
    full_name: string;
    first_name: string;
    last_name: string;
    email: string;
    thumbnail_url: string | null;
    brokerage_name: string | null;
}

interface BrokerAgentFilterProps {
    value: string;
    onChange: (value: string) => void;
}

export default function BrokerAgentFilter({
    value,
    onChange,
}: BrokerAgentFilterProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [brokers, setBrokers] = useState<Broker[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedBroker, setSelectedBroker] = useState<Broker | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Debounce search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchQuery.length >= 2) {
                searchBrokers(searchQuery);
            } else if (searchQuery.length === 0) {
                // Load initial brokers when input is cleared
                searchBrokers("");
            } else {
                setBrokers([]);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    // Load selected broker if value exists
    useEffect(() => {
        if (value && !selectedBroker) {
            // Try to find broker by name match
            searchBrokers(value, true);
        }
    }, [value]);

    const searchBrokers = async (
        query: string,
        selectFirst: boolean = false
    ) => {
        setIsLoading(true);
        try {
            const response = await axios.get("/api/brokers/search", {
                params: { search: query, limit: 20 },
            });
            const results = response.data;
            setBrokers(results);

            // If we're searching for a specific value and found a match, select it
            if (selectFirst && results.length > 0 && value) {
                const match = results.find(
                    (broker: Broker) =>
                        broker.full_name.toLowerCase() === value.toLowerCase()
                );
                if (match) {
                    setSelectedBroker(match);
                }
            }
        } catch (error) {
            console.error("Error searching brokers:", error);
            setBrokers([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectBroker = (broker: Broker) => {
        setSelectedBroker(broker);
        setSearchQuery(broker.full_name);
        onChange(broker.full_name);
        setIsOpen(false);
    };

    const handleClear = () => {
        setSelectedBroker(null);
        setSearchQuery("");
        onChange("");
        setIsOpen(false);
        inputRef.current?.focus();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setSearchQuery(newValue);
        setIsOpen(true);

        // If user clears the input, clear selection
        if (!newValue) {
            setSelectedBroker(null);
            onChange("");
        }
    };

    const handleInputFocus = () => {
        setIsOpen(true);
        if (searchQuery.length >= 2 || searchQuery.length === 0) {
            searchBrokers(searchQuery);
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
                Broker/Agent
            </label>
            <div className="relative">
                <div className="relative">
                    <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search by name..."
                        value={searchQuery}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        className="w-full rounded border border-gray-300 bg-white pl-7 pr-7 py-1.5 text-xs text-gray-700 placeholder-gray-400 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-1 focus:ring-[#0066CC] focus:ring-opacity-20"
                    />
                    {selectedBroker && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                            aria-label="Clear selection"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    )}
                    {!selectedBroker && (
                        <ChevronDown className="absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    )}
                </div>

                {/* Dropdown */}
                {isOpen && (
                    <div className="absolute z-50 mt-2 w-full max-h-60 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="h-5 w-5 animate-spin text-[#0066CC]" />
                            </div>
                        ) : brokers.length > 0 ? (
                            <ul className="py-2">
                                {brokers.map((broker) => (
                                    <li key={broker.id}>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleSelectBroker(broker)
                                            }
                                            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                                                selectedBroker?.id === broker.id
                                                    ? "bg-[#F0F7FF] text-[#0066CC]"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                {broker.thumbnail_url && (
                                                    <img
                                                        src={
                                                            broker.thumbnail_url
                                                        }
                                                        alt={broker.full_name}
                                                        className="h-8 w-8 rounded-full object-cover"
                                                    />
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-medium truncate">
                                                        {broker.full_name}
                                                    </div>
                                                    {broker.brokerage_name && (
                                                        <div className="text-xs text-gray-500 truncate">
                                                            {
                                                                broker.brokerage_name
                                                            }
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : searchQuery.length >= 2 ? (
                            <div className="px-4 py-8 text-center text-sm text-gray-500">
                                No brokers found
                            </div>
                        ) : (
                            <div className="px-4 py-8 text-center text-sm text-gray-500">
                                Type at least 2 characters to search
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
