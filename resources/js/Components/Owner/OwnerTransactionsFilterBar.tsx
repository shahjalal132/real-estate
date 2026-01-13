import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Star, Download, Calendar } from "lucide-react";
import SpaceUseSelector from "../Tenant/SpaceUseSelector";
import PortfolioSizeSelector from "./PortfolioSizeSelector";

interface OwnerTransactionsFilterBarProps {
    searchValue: string;
    onSearchChange: (value: string) => void;
    spaceUse: string[];
    onSpaceUseChange: (value: string[]) => void;
    minLeaseSize?: number;
    maxLeaseSize?: number;
    onLeaseSizeChange?: (min: number | null, max: number | null) => void;
    signDate: string;
    onSignDateChange: (value: string) => void;
    rating: number | null;
    onRatingChange: (rating: number | null) => void;
    sortBy: string;
    onSortChange: (value: string) => void;
    transactionsCount: number;
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
        { value: "sign_date_desc", label: "Sign Date: Newest First" },
        { value: "sign_date_asc", label: "Sign Date: Oldest First" },
        { value: "address_asc", label: "Address: A to Z" },
        { value: "address_desc", label: "Address: Z to A" },
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

export default function OwnerTransactionsFilterBar({
    searchValue,
    onSearchChange,
    spaceUse,
    onSpaceUseChange,
    minLeaseSize,
    maxLeaseSize,
    onLeaseSizeChange,
    signDate,
    onSignDateChange,
    rating,
    onRatingChange,
    sortBy,
    onSortChange,
    transactionsCount,
}: OwnerTransactionsFilterBarProps) {
    return (
        <div className="bg-white border-b border-gray-200 shrink-0">
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
                <SpaceUseSelector
                    spaceUse={spaceUse}
                    onSpaceUseChange={onSpaceUseChange}
                />

                {/* Lease Size Selector */}
                <PortfolioSizeSelector
                    minValue={minLeaseSize ?? null}
                    maxValue={maxLeaseSize ?? null}
                    onChange={onLeaseSizeChange || (() => {})}
                />

                {/* Sign Date Input */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="After 1/10/2024"
                        value={signDate ? `After ${signDate}` : ""}
                        onChange={(e) => {
                            const inputValue = e.target.value;
                            // Extract date from "After [date]" format
                            if (inputValue.startsWith("After ")) {
                                const datePart = inputValue
                                    .replace("After ", "")
                                    .trim();
                                onSignDateChange(datePart);
                            } else if (inputValue === "") {
                                onSignDateChange("");
                            } else {
                                // If user just types a date without "After ", add it
                                onSignDateChange(inputValue);
                            }
                        }}
                        onFocus={(e) => {
                            // When focused, show just the date part for easier editing
                            if (
                                signDate &&
                                e.target.value.startsWith("After ")
                            ) {
                                e.target.value = signDate;
                            }
                        }}
                        onBlur={(e) => {
                            // When blurred, ensure format is "After [date]"
                            if (
                                signDate &&
                                !e.target.value.startsWith("After ")
                            ) {
                                e.target.value = `After ${signDate}`;
                            }
                        }}
                        className="rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 min-w-[150px]"
                    />
                    <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                {/* Star Rating */}
                <StarRating rating={rating} onChange={onRatingChange} />

                {/* Transactions Count */}
                <div className="text-sm font-medium text-gray-700 whitespace-nowrap">
                    {transactionsCount.toLocaleString()} Transactions
                </div>

                {/* Right-aligned actions */}
                <div className="flex items-center gap-3 ml-auto">
                    {/* Sort Dropdown */}
                    <SortDropdown value={sortBy} onChange={onSortChange} />

                    {/* Export Button */}
                    <button
                        type="button"
                        className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <Download className="h-4 w-4" />
                        <span>Export</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
