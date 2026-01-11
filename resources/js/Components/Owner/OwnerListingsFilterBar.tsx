import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Star } from "lucide-react";
import PropertyFocusSelector from "./PropertyFocusSelector";
import PortfolioSizeSelector from "./PortfolioSizeSelector";

interface OwnerListingsFilterBarProps {
    searchValue: string;
    onSearchChange: (value: string) => void;
    spaceUse: string[];
    onSpaceUseChange: (value: string[]) => void;
    minAvailableSpace?: number;
    maxAvailableSpace?: number;
    onAvailableSpaceChange?: (min: number | null, max: number | null) => void;
    rating: number | null;
    onRatingChange: (rating: number | null) => void;
    sortBy: string;
    onSortChange: (value: string) => void;
    listingsCount: number;
}

// Sort dropdown
function SortDropdown({
    value,
    onChange,
}: {
    value: string;
    onChange: (value: string) => void;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const sortOptions = [
        { value: "", label: "Sort" },
        { value: "address_asc", label: "Address: A to Z" },
        { value: "address_desc", label: "Address: Z to A" },
        { value: "market_asc", label: "Market: A to Z" },
        { value: "market_desc", label: "Market: Z to A" },
        { value: "rba_gla_asc", label: "RBA/GLA: Low to High" },
        { value: "rba_gla_desc", label: "RBA/GLA: High to Low" },
        { value: "sf_avail_asc", label: "SF Avail: Low to High" },
        { value: "sf_avail_desc", label: "SF Avail: High to Low" },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () =>
                document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isOpen]);

    const selectedOption = sortOptions.find((opt) => opt.value === value);
    const displayLabel =
        selectedOption && selectedOption.value !== ""
            ? selectedOption.label
            : "Sort";

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
                <span>{displayLabel}</span>
                <ChevronDown
                    className={`h-4 w-4 text-gray-400 transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 z-50 mt-1 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {sortOptions.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                className={`block w-full px-4 py-2 text-left text-sm ${
                                    value === option.value
                                        ? "bg-blue-50 text-blue-700"
                                        : "text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// Star rating component
function StarRating({
    rating,
    onChange,
}: {
    rating: number | null;
    onChange: (rating: number | null) => void;
}) {
    const handleStarClick = (value: number) => {
        if (rating === value) {
            onChange(null); // Toggle off if clicking the same rating
        } else {
            onChange(value);
        }
    };

    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(star)}
                    className="text-gray-300 hover:text-yellow-400 transition-colors focus:outline-none"
                >
                    <Star
                        className={`h-5 w-5 ${
                            rating !== null && star <= rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-none"
                        }`}
                    />
                </button>
            ))}
        </div>
    );
}

export default function OwnerListingsFilterBar({
    searchValue,
    onSearchChange,
    spaceUse,
    onSpaceUseChange,
    minAvailableSpace,
    maxAvailableSpace,
    onAvailableSpaceChange,
    rating,
    onRatingChange,
    sortBy,
    onSortChange,
    listingsCount,
}: OwnerListingsFilterBarProps) {
    return (
        <div className="bg-white border-b border-gray-200 shrink-0">
            <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center gap-3 py-4">
                    {/* Search Input */}
                    <div className="relative w-64">
                        <input
                            type="text"
                            placeholder="Address or Location"
                            value={searchValue}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>

                    {/* Space Use Selector */}
                    <PropertyFocusSelector
                        selectedTypes={spaceUse}
                        onChange={onSpaceUseChange}
                    />

                    {/* Available Space Selector */}
                    <PortfolioSizeSelector
                        minValue={minAvailableSpace ?? null}
                        maxValue={maxAvailableSpace ?? null}
                        onChange={onAvailableSpaceChange || (() => {})}
                    />

                    {/* Star Rating */}
                    <StarRating rating={rating} onChange={onRatingChange} />

                    {/* Listings Count */}
                    <div className="text-sm font-medium text-gray-700 whitespace-nowrap">
                        {listingsCount.toLocaleString()} Listings
                    </div>

                    {/* Right-aligned actions */}
                    <div className="flex items-center gap-3 ml-auto">
                        {/* Sort Dropdown */}
                        <SortDropdown value={sortBy} onChange={onSortChange} />
                    </div>
                </div>
            </div>
        </div>
    );
}
