import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Map, List, Star, Download } from "lucide-react";
import PropertyTypeDropdown from "./PropertyTypeDropdown";
import PortfolioSizeSelector from "./PortfolioSizeSelector";
import LocationMinMaxSelector from "../LocationMinMaxSelector";

interface OwnerPropertiesFilterBarProps {
    searchValue: string;
    onSearchChange: (value: string) => void;
    propertyType: string[];
    onPropertyTypeChange: (value: string[]) => void;
    secondaryType: string[];
    onSecondaryTypeChange: (value: string[]) => void;
    minPropertySize?: number;
    maxPropertySize?: number;
    onPropertySizeChange?: (min: number | null, max: number | null) => void;
    minPercentLeased?: number;
    maxPercentLeased?: number;
    onPercentLeasedChange?: (min: number | null, max: number | null) => void;
    locationType: string[];
    onLocationTypeChange: (value: string[]) => void;
    existingPlus: string[];
    onExistingPlusChange: (value: string[]) => void;
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

// Multiselect dropdown component with checkboxes
function MultiSelectDropdown({
    label,
    selectedValues,
    options,
    onChange,
}: {
    label: string;
    selectedValues: string[];
    options: { value: string; label: string }[];
    onChange: (values: string[]) => void;
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

    const handleToggle = (value: string) => {
        if (selectedValues.includes(value)) {
            onChange(selectedValues.filter((v) => v !== value));
        } else {
            onChange([...selectedValues, value]);
        }
    };

    const getDisplayLabel = () => {
        if (selectedValues.length === 0) return label;
        if (selectedValues.length === 1) {
            const option = options.find(
                (opt) => opt.value === selectedValues[0]
            );
            return option ? option.label : label;
        }
        return `${selectedValues.length} selected`;
    };

    const isActive = selectedValues.length > 0;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 min-w-[140px] justify-between transition-colors ${
                    isActive
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
            >
                <span className="truncate">{getDisplayLabel()}</span>
                <ChevronDown
                    className={`h-4 w-4 text-gray-400 shrink-0 transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {isOpen && (
                <div className="absolute left-0 z-50 mt-1 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-y-auto">
                    <div className="py-1">
                        {options
                            .filter((opt) => opt.value !== "")
                            .map((option) => (
                                <label
                                    key={option.value}
                                    className="flex cursor-pointer items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedValues.includes(
                                            option.value
                                        )}
                                        onChange={() =>
                                            handleToggle(option.value)
                                        }
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span>{option.label}</span>
                                </label>
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
        { value: "address", label: "Address" },
        { value: "building_name", label: "Building Name" },
        { value: "type", label: "Type" },
        { value: "rba_gla", label: "RBA/GLA" },
        { value: "city", label: "City" },
        { value: "market", label: "Market" },
        { value: "country", label: "Country" },
        { value: "last_sale_price", label: "Last Sale Price" },
        { value: "last_sale_date", label: "Last Sale Date" },
        { value: "costar_rating", label: "CoStar Rating" },
        { value: "green_rating", label: "Green Rating" },
        { value: "class", label: "Class" },
        { value: "constr_status", label: "Constr Status" },
        { value: "year_built", label: "Year Built" },
        { value: "sf_avail", label: "SF Avail" },
        { value: "rent_sf_yr", label: "Rent/SF/yr" },
        { value: "tmi", label: "TMI" },
        { value: "secondary_type", label: "Secondary Type" },
        { value: "submarket", label: "Submarket" },
        { value: "location_type", label: "Location Type" },
        { value: "landlord_representative", label: "Landlord Representative" },
        { value: "landlord_rep_contact", label: "Landlord Rep Contact" },
        { value: "submarket_cluster", label: "Submarket Cluster" },
        { value: "postal_code", label: "Postal Code" },
        { value: "state", label: "State" },
        { value: "county", label: "County" },
        { value: "continent", label: "Continent" },
        { value: "subcontinent", label: "Subcontinent" },
        { value: "sales_company", label: "Sales Company" },
        { value: "sales_contact", label: "Sales Contact" },
        { value: "sale_price", label: "Sale Price" },
        { value: "price_sf", label: "Price/SF" },
        { value: "sale_status", label: "Sale Status" },
        { value: "land_ac", label: "Land(AC)" },
        { value: "percent_leased", label: "% Leased" },
        { value: "built_renov", label: "Built/Renov" },
        { value: "typ_fl_sf", label: "Typ Fl(SF)" },
        { value: "property_id", label: "Property ID" },
        { value: "parking_ratio", label: "Parking Ratio" },
        { value: "tenancy", label: "Tenancy" },
        { value: "building_park", label: "Building Park" },
        { value: "zoning", label: "Zoning" },
        { value: "asking_rent_yr", label: "Asking Rent/yr" },
        { value: "true_owner", label: "True Owner" },
        { value: "recorded_owner", label: "Recorded Owner" },
        { value: "stories", label: "Stories" },
        { value: "ceiling_ht", label: "Ceiling Ht" },
        { value: "col_spacing", label: "Col Spacing" },
        { value: "crane", label: "Crane" },
        { value: "docks", label: "Docks" },
        { value: "drive_ins", label: "Drive Ins" },
        { value: "heavy_power", label: "Heavy Power" },
        { value: "rail", label: "Rail" },
        { value: "sewer", label: "Sewer" },
        { value: "units", label: "Units" },
        { value: "style", label: "Style" },
        { value: "total_buildings", label: "Total Buildings" },
        { value: "price_unit", label: "Price/Unit" },
        { value: "vacancy_percent", label: "Vacancy %" },
        { value: "average_unit_sf", label: "Average Unit SF" },
        { value: "avg_asking_unit", label: "Avg Asking/Unit" },
        { value: "avg_asking_sf", label: "Avg Asking/SF" },
        { value: "avg_effective_unit", label: "Avg Effective/Unit" },
        { value: "avg_effective_sf", label: "Avg Effective/SF" },
        { value: "avg_concessions_percent", label: "Avg Concessions %" },
        { value: "percent_studios_units", label: "% Studios Units" },
        { value: "percent_1bed_units", label: "% 1-bed Units" },
        { value: "percent_2bed_units", label: "% 2-bed Units" },
        { value: "percent_3bed_units", label: "% 3-bed Units" },
        { value: "percent_4bed_units", label: "% 4-bed Units" },
        { value: "rent_type", label: "Rent Type" },
        { value: "affordable_type", label: "Affordable Type" },
        { value: "market_segment", label: "Market Segment" },
        { value: "parking_spaces_room", label: "Parking Spaces/Room" },
        { value: "parking_spaces_unit", label: "Parking Spaces/Unit" },
        { value: "parking_spaces", label: "Parking Spaces" },
        { value: "days_on_market", label: "Days On Market" },
        { value: "flood_zone", label: "Flood Zone" },
        { value: "fema_map_date", label: "FEMA Map Date" },
        { value: "fema_map_identifier", label: "FEMA Map Identifier" },
        { value: "fund", label: "Fund" },
        { value: "beds", label: "Beds" },
        { value: "avg_asking_bed", label: "Avg Asking/Bed" },
        { value: "price_land_ac", label: "Price/Land AC" },
        { value: "min_lot_ac", label: "Min Lot(AC)" },
        { value: "hotel_grade", label: "Hotel Grade" },
        { value: "rooms", label: "Rooms" },
        { value: "hotel_price_room", label: "Hotel Price/Room" },
        { value: "brand", label: "Brand" },
        { value: "hotel_class", label: "Hotel Class" },
        { value: "hotel_scale", label: "Hotel Scale" },
        { value: "operation_type", label: "Operation Type" },
        { value: "operation_status", label: "Operation Status" },
        { value: "hotel_open_date", label: "Hotel Open Date" },
        { value: "mtg_rooms", label: "Mtg Rooms" },
        { value: "total_mtg_space", label: "Total Mtg Space" },
        { value: "max_contig_mtg_space", label: "Max Contig Mtg Space" },
        { value: "hotel_location_type", label: "Hotel Location Type" },
        { value: "all_inclusive_rate", label: "All Inclusive Rate" },
        { value: "all_suites", label: "All-Suites" },
        { value: "primary_corridors", label: "Primary Corridors" },
        { value: "parent_company", label: "Parent Company" },
        { value: "hotel_operator", label: "Hotel Operator" },
        { value: "university", label: "University" },
        { value: "cap_rate", label: "Cap Rate" },
        { value: "sfha", label: "SFHA" },
        { value: "floodplain_area", label: "Floodplain Area" },
        { value: "firm_id", label: "FIRM Id" },
        { value: "firm_panel_number", label: "FIRM Panel Number" },
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
    const displayLabel = selectedOption ? selectedOption.label : "Sort";

    const handleClearSort = () => {
        onChange("");
        setIsOpen(false);
    };

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
                <div className="absolute right-0 z-50 mt-1 w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-[600px] overflow-y-auto">
                    <div className="py-1">
                        {/* Clear Sort Button */}
                        <div className="px-4 py-2">
                            <button
                                type="button"
                                onClick={handleClearSort}
                                className="w-full text-left text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-2 py-1.5 rounded"
                            >
                                CLEAR SORT
                            </button>
                        </div>

                        {/* Divider */}
                        <hr className="my-1 border-gray-200" />

                        {/* Sort Options */}
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
                                        ? "bg-blue-50 text-blue-700 font-medium"
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

const LOCATION_TYPE_OPTIONS = [
    { value: "", label: "Location Type" },
    { value: "CBD", label: "CBD" },
    { value: "Urban", label: "Urban" },
    { value: "Suburban", label: "Suburban" },
];

const EXISTING_PLUS_OPTIONS = [
    { value: "", label: "Existing +5" },
    { value: "Existing", label: "Existing" },
    { value: "Under Construction", label: "Under Construction" },
    { value: "Under Renovation", label: "Under Renovation" },
    { value: "Proposed", label: "Proposed" },
    { value: "Final Planning", label: "Final Planning" },
    { value: "Deferred", label: "Deferred" },
];

export default function OwnerPropertiesFilterBar({
    searchValue,
    onSearchChange,
    propertyType,
    onPropertyTypeChange,
    secondaryType,
    onSecondaryTypeChange,
    minPropertySize,
    maxPropertySize,
    onPropertySizeChange,
    minPercentLeased,
    maxPercentLeased,
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
            <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-2">
                <div className="flex flex-wrap items-center gap-4 py-4">
                    {/* First Group */}
                    <div className="flex flex-wrap items-center gap-3 border-r border-gray-200">
                        {/* Search Input */}
                        <div className="relative w-[240px] shrink-0">
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

                        {/* Secondary Type Multiselect */}
                        <MultiSelectDropdown
                            label="Secondary Type"
                            selectedValues={secondaryType}
                            options={SECONDARY_TYPE_OPTIONS}
                            onChange={onSecondaryTypeChange}
                        />

                        {/* Property Size Selector */}
                        <PortfolioSizeSelector
                            minValue={minPropertySize ?? null}
                            maxValue={maxPropertySize ?? null}
                            onChange={onPropertySizeChange || (() => {})}
                        />

                        {/* % Leased Selector */}
                        <LocationMinMaxSelector
                            label="% Leased"
                            minValue={minPercentLeased ?? null}
                            maxValue={maxPercentLeased ?? null}
                            onChange={onPercentLeasedChange || (() => {})}
                            minPlaceholder="Min %"
                            maxPlaceholder="Max %"
                        />
                    </div>

                    {/* Second Group */}
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Location Type Multiselect */}
                        <MultiSelectDropdown
                            label="Location Type"
                            selectedValues={locationType}
                            options={LOCATION_TYPE_OPTIONS}
                            onChange={onLocationTypeChange}
                        />

                        {/* Existing +5 Multiselect */}
                        <MultiSelectDropdown
                            label="Existing +5"
                            selectedValues={existingPlus}
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
        </div>
    );
}
