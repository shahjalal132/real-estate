import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Map, List, Star, Download } from "lucide-react";
import PropertyTypeFilter from "../Filters/PropertyTypeFilter";

interface OwnerPropertiesFilterBarProps {
    searchValue: string;
    onSearchChange: (value: string) => void;
    propertyType: string[];
    onPropertyTypeChange: (value: string[]) => void;
    secondaryType: string;
    onSecondaryTypeChange: (value: string) => void;
    propertySize: string;
    onPropertySizeChange: (value: string) => void;
    percentLeased: string;
    onPercentLeasedChange: (value: string) => void;
    locationType: string;
    onLocationTypeChange: (value: string) => void;
    existingPlus: string;
    onExistingPlusChange: (value: string) => void;
    rating: number | null;
    onRatingChange: (rating: number | null) => void;
    sortBy: string;
    onSortChange: (value: string) => void;
    viewMode: "map" | "list";
    onViewModeChange: (mode: "map" | "list") => void;
    propertiesCount: number;
}

// Simple dropdown component
function SimpleDropdown({
    label,
    value,
    options,
    onChange,
}: {
    label: string;
    value: string;
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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

    const selectedOption = options.find((opt) => opt.value === value);
    const displayLabel = selectedOption ? selectedOption.label : label;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 min-w-[140px] justify-between"
            >
                <span className="truncate">{displayLabel}</span>
                <ChevronDown
                    className={`h-4 w-4 text-gray-400 shrink-0 transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {isOpen && (
                <div className="absolute left-0 z-50 mt-1 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-y-auto">
                    <div className="py-1">
                        {options.map((option) => (
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
        { value: "price_asc", label: "Price: Low to High" },
        { value: "price_desc", label: "Price: High to Low" },
        { value: "name_asc", label: "Name: A to Z" },
        { value: "name_desc", label: "Name: Z to A" },
        { value: "date_asc", label: "Date: Oldest First" },
        { value: "date_desc", label: "Date: Newest First" },
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
    const displayLabel = selectedOption ? selectedOption.label : "Sort ↓";

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

// Property Type Dropdown wrapper
function PropertyTypeDropdown({
    selectedTypes,
    onChange,
}: {
    selectedTypes: string[];
    onChange: (types: string[]) => void;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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

    const getDisplayLabel = () => {
        const filteredTypes = selectedTypes.filter((t) => t !== "All");
        if (filteredTypes.length === 0) {
            return "Property Type";
        }
        if (filteredTypes.length === 1) {
            // Extract main type (before " - " if it's a subtype)
            const type = filteredTypes[0];
            return type.includes(" - ") ? type.split(" - ")[0] : type;
        }
        return `${filteredTypes.length} Selected`;
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                    selectedTypes.length > 0 && !selectedTypes.includes("All")
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
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div
                        className="absolute left-0 z-50 mt-1 w-80 rounded-md border border-gray-200 bg-white shadow-lg max-h-[500px] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        <div className="p-4">
                            <PropertyTypeFilter
                                selectedTypes={selectedTypes}
                                onChange={onChange}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

const SECONDARY_TYPE_OPTIONS = [
    { value: "", label: "Secondary Ty..." },
    { value: "Bank", label: "Bank" },
    { value: "Restaurant", label: "Restaurant" },
    { value: "Shopping Center", label: "Shopping Center" },
    { value: "Traditional Office", label: "Traditional Office" },
    { value: "Medical Office", label: "Medical Office" },
    { value: "Warehouse", label: "Warehouse" },
    { value: "Distribution", label: "Distribution" },
];

const PROPERTY_SIZE_OPTIONS = [
    { value: "", label: "Property Size" },
    { value: "0-5000", label: "0 - 5,000 SF" },
    { value: "5000-10000", label: "5,000 - 10,000 SF" },
    { value: "10000-25000", label: "10,000 - 25,000 SF" },
    { value: "25000-50000", label: "25,000 - 50,000 SF" },
    { value: "50000-100000", label: "50,000 - 100,000 SF" },
    { value: "100000+", label: "100,000+ SF" },
];

const PERCENT_LEASED_OPTIONS = [
    { value: "", label: "% Leased" },
    { value: "0-25", label: "0% - 25%" },
    { value: "25-50", label: "25% - 50%" },
    { value: "50-75", label: "50% - 75%" },
    { value: "75-100", label: "75% - 100%" },
];

const LOCATION_TYPE_OPTIONS = [
    { value: "", label: "Location Type" },
    { value: "Urban", label: "Urban" },
    { value: "Suburban", label: "Suburban" },
    { value: "Rural", label: "Rural" },
];

const EXISTING_PLUS_OPTIONS = [
    { value: "", label: "Existing +5" },
    { value: "1", label: "Existing +1" },
    { value: "2", label: "Existing +2" },
    { value: "3", label: "Existing +3" },
    { value: "4", label: "Existing +4" },
    { value: "5", label: "Existing +5" },
    { value: "10", label: "Existing +10" },
];

export default function OwnerPropertiesFilterBar({
    searchValue,
    onSearchChange,
    propertyType,
    onPropertyTypeChange,
    secondaryType,
    onSecondaryTypeChange,
    propertySize,
    onPropertySizeChange,
    percentLeased,
    onPercentLeasedChange,
    locationType,
    onLocationTypeChange,
    existingPlus,
    onExistingPlusChange,
    rating,
    onRatingChange,
    sortBy,
    onSortChange,
    viewMode,
    onViewModeChange,
    propertiesCount,
}: OwnerPropertiesFilterBarProps) {
    return (
        <div className="bg-white border-b border-gray-200">
            <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center gap-3 py-4">
                    {/* Search Input */}
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Address or Location"
                            value={searchValue}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Property Type Dropdown */}
                    <PropertyTypeDropdown
                        selectedTypes={propertyType}
                        onChange={onPropertyTypeChange}
                    />

                    {/* Secondary Type Dropdown */}
                    <SimpleDropdown
                        label="Secondary Ty..."
                        value={secondaryType}
                        options={SECONDARY_TYPE_OPTIONS}
                        onChange={onSecondaryTypeChange}
                    />

                    {/* Property Size Dropdown */}
                    <SimpleDropdown
                        label="Property Size"
                        value={propertySize}
                        options={PROPERTY_SIZE_OPTIONS}
                        onChange={onPropertySizeChange}
                    />

                    {/* % Leased Dropdown */}
                    <SimpleDropdown
                        label="% Leased"
                        value={percentLeased}
                        options={PERCENT_LEASED_OPTIONS}
                        onChange={onPercentLeasedChange}
                    />

                    {/* Location Type Dropdown */}
                    <SimpleDropdown
                        label="Location Type"
                        value={locationType}
                        options={LOCATION_TYPE_OPTIONS}
                        onChange={onLocationTypeChange}
                    />

                    {/* Existing +5 Dropdown */}
                    <SimpleDropdown
                        label="Existing +5"
                        value={existingPlus}
                        options={EXISTING_PLUS_OPTIONS}
                        onChange={onExistingPlusChange}
                    />

                    {/* Star Rating */}
                    <StarRating rating={rating} onChange={onRatingChange} />

                    {/* Properties Count */}
                    <div className="text-sm font-medium text-gray-700 whitespace-nowrap">
                        {propertiesCount.toLocaleString()} Properties
                    </div>

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

                    {/* View Mode Toggle */}
                    <div className="flex items-center gap-1 border-l border-gray-200 pl-3">
                        <button
                            type="button"
                            onClick={() => onViewModeChange("map")}
                            className={`flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                viewMode === "map"
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-500 hover:bg-gray-50"
                            }`}
                        >
                            <Map className="h-4 w-4" />
                            <span>MAP</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => onViewModeChange("list")}
                            className={`flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                viewMode === "list"
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-500 hover:bg-gray-50"
                            }`}
                        >
                            <List className="h-4 w-4" />
                            <span>LIST</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
