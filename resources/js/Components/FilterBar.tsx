import { useState } from "react";
import { Search, SlidersHorizontal, ChevronDown, Grid3x3, Map } from "lucide-react";

interface FilterBarProps {
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    auctionValue?: string;
    onAuctionChange?: (value: string) => void;
    onFiltersClick?: () => void;
    viewMode?: "grid" | "map";
    onViewModeChange?: (mode: "grid" | "map") => void;
}

const AUCTION_OPTIONS = [
    { value: "all", label: "All Auctions" },
    { value: "classic", label: "Classic Auction" },
    { value: "signature", label: "Signature Auction" },
];

const REGION_OPTIONS = [
    { value: "all", label: "All" },
    { value: "north", label: "North" },
    { value: "south", label: "South" },
    { value: "east", label: "East" },
    { value: "west", label: "West" },
];

const AUCTION_EVENT_OPTIONS = [
    { value: "all", label: "All" },
    { value: "classic", label: "Classic Auction" },
    { value: "signature", label: "Signature Auction" },
];

const ASSET_TYPES = ["Real Estate", "Note", "Other"];

const OTHER_OPTIONS = [
    "Financing Available",
    "Opportunity Zone",
    "Broker Co-Op Available",
];

const PROPERTY_TYPES = [
    "Retail",
    "Multifamily",
    "Other",
    "Senior Housing",
    "Office",
    "Hospitality",
    "Land",
    "Parking",
    "Manufactured Housing",
    "Self Storage",
    "Commercial",
    "Operating Business",
    "Industrial",
    "Mixed Use",
    "Residential",
];

export default function FilterBar({
    searchValue = "",
    onSearchChange,
    auctionValue = "all",
    onAuctionChange,
    onFiltersClick,
    viewMode = "grid",
    onViewModeChange,
}: FilterBarProps) {
    const [auctionOpen, setAuctionOpen] = useState(false);
    const [filtersExpanded, setFiltersExpanded] = useState(false);
    
    // Filter states
    const [region, setRegion] = useState("all");
    const [auctionEvent, setAuctionEvent] = useState("all");
    const [assetType, setAssetType] = useState("Real Estate");
    const [other, setOther] = useState<string[]>([]);
    const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
    const [regionOpen, setRegionOpen] = useState(false);
    const [auctionEventOpen, setAuctionEventOpen] = useState(false);

    const selectedAuction = AUCTION_OPTIONS.find(
        (opt) => opt.value === auctionValue,
    )?.label || "Auctions";

    const selectedRegion = REGION_OPTIONS.find((opt) => opt.value === region)
        ?.label || "All";
    const selectedAuctionEvent = AUCTION_EVENT_OPTIONS.find(
        (opt) => opt.value === auctionEvent,
    )?.label || "All";

    const handleOtherToggle = (option: string) => {
        setOther((prev) =>
            prev.includes(option)
                ? prev.filter((item) => item !== option)
                : [...prev, option],
        );
    };

    const handlePropertyTypeToggle = (type: string) => {
        setPropertyTypes((prev) =>
            prev.includes(type)
                ? prev.filter((item) => item !== type)
                : [...prev, type],
        );
    };

    const handleReset = () => {
        setRegion("all");
        setAuctionEvent("all");
        setAssetType("Real Estate");
        setOther([]);
        setPropertyTypes([]);
    };

    const handleApply = () => {
        // Handle filter application here
        console.log("Applied filters:", {
            region,
            auctionEvent,
            assetType,
            other,
            propertyTypes,
        });
        setFiltersExpanded(false);
        onFiltersClick?.();
    };

    return (
        <div className="w-full">
            <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search"
                    value={searchValue}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                    className="w-full rounded border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            {/* Auctions Dropdown */}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setAuctionOpen((prev) => !prev)}
                    className="inline-flex items-center gap-2 rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                >
                    <span>{selectedAuction}</span>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>

                {auctionOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setAuctionOpen(false)}
                        />
                        <div className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                {AUCTION_OPTIONS.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => {
                                            onAuctionChange?.(option.value);
                                            setAuctionOpen(false);
                                        }}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* FILTERS Button */}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => {
                        setFiltersExpanded((prev) => !prev);
                        onFiltersClick?.();
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-[#0d6efd] px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-sm hover:bg-[#0b5ed7] focus:outline-none"
                >
                    <SlidersHorizontal className="h-4 w-4" />
                    <span>FILTERS</span>
                    <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                            filtersExpanded ? "rotate-180" : ""
                        }`}
                    />
                </button>
            </div>

            {/* View Mode Toggles */}
            <div className="flex items-center gap-1">
                <button
                    type="button"
                    onClick={() => onViewModeChange?.("grid")}
                    className={`flex items-center justify-center rounded p-2 transition-colors ${
                        viewMode === "grid"
                            ? "bg-[#0d6efd] text-white"
                            : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                    aria-label="Grid view"
                >
                    <Grid3x3 className="h-4 w-4" />
                </button>
                <button
                    type="button"
                    onClick={() => onViewModeChange?.("map")}
                    className={`flex items-center justify-center rounded p-2 transition-colors ${
                        viewMode === "map"
                            ? "bg-[#0d6efd] text-white"
                            : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                    aria-label="Map view"
                >
                    <Map className="h-4 w-4" />
                </button>
            </div>
        </div>

            {/* Expanded Filters Section */}
            {filtersExpanded && (
                <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="px-6 py-6">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            {/* Left Section */}
                            <div className="space-y-6">
                                {/* Region */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Region
                                    </label>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setRegionOpen((prev) => !prev);
                                                setAuctionEventOpen(false);
                                            }}
                                            className="flex w-full items-center justify-between rounded border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            <span>{selectedRegion}</span>
                                            <ChevronDown className="h-4 w-4 text-gray-400" />
                                        </button>
                                        {regionOpen && (
                                            <>
                                                <div
                                                    className="fixed inset-0 z-10"
                                                    onClick={() =>
                                                        setRegionOpen(false)
                                                    }
                                                />
                                                <div className="absolute z-20 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
                                                    {REGION_OPTIONS.map(
                                                        (option) => (
                                                            <button
                                                                key={
                                                                    option.value
                                                                }
                                                                type="button"
                                                                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                                                onClick={() => {
                                                                    setRegion(
                                                                        option.value,
                                                                    );
                                                                    setRegionOpen(
                                                                        false,
                                                                    );
                                                                }}
                                                            >
                                                                {option.label}
                                                            </button>
                                                        ),
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Auction Event */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Auction Event
                                    </label>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setAuctionEventOpen(
                                                    (prev) => !prev,
                                                );
                                                setRegionOpen(false);
                                            }}
                                            className="flex w-full items-center justify-between rounded border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            <span>{selectedAuctionEvent}</span>
                                            <ChevronDown className="h-4 w-4 text-gray-400" />
                                        </button>
                                        {auctionEventOpen && (
                                            <>
                                                <div
                                                    className="fixed inset-0 z-10"
                                                    onClick={() =>
                                                        setAuctionEventOpen(
                                                            false,
                                                        )
                                                    }
                                                />
                                                <div className="absolute z-20 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
                                                    {AUCTION_EVENT_OPTIONS.map(
                                                        (option) => (
                                                            <button
                                                                key={
                                                                    option.value
                                                                }
                                                                type="button"
                                                                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                                                onClick={() => {
                                                                    setAuctionEvent(
                                                                        option.value,
                                                                    );
                                                                    setAuctionEventOpen(
                                                                        false,
                                                                    );
                                                                }}
                                                            >
                                                                {option.label}
                                                            </button>
                                                        ),
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Asset Type */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Asset Type
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {ASSET_TYPES.map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() =>
                                                    setAssetType(type)
                                                }
                                                className={`rounded border px-4 py-2 text-sm font-medium transition-colors ${
                                                    assetType === type
                                                        ? "border-[#0d6efd] bg-[#0d6efd] text-white"
                                                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                                }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Middle Section */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="mb-3 text-sm font-medium text-gray-700">
                                        Other
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {OTHER_OPTIONS.map((option) => (
                                            <button
                                                key={option}
                                                type="button"
                                                onClick={() =>
                                                    handleOtherToggle(option)
                                                }
                                                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                                                    other.includes(option)
                                                        ? "border-[#0d6efd] bg-[#0d6efd] text-white"
                                                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                                }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Section */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="mb-3 text-sm font-medium text-gray-700">
                                        Property Type
                                    </h3>
                                    <div className="max-h-[400px] overflow-y-auto">
                                        <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
                                            {PROPERTY_TYPES.map((type) => (
                                                <label
                                                    key={type}
                                                    className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-gray-50"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={propertyTypes.includes(
                                                            type,
                                                        )}
                                                        onChange={() =>
                                                            handlePropertyTypeToggle(
                                                                type,
                                                            )
                                                        }
                                                        className="h-4 w-4 rounded border-gray-300 text-[#0d6efd] focus:ring-[#0d6efd]"
                                                    />
                                                    <span className="text-sm text-gray-700">
                                                        {type}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">
                        <button
                            type="button"
                            onClick={handleReset}
                            className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Reset
                        </button>
                        <button
                            type="button"
                            onClick={handleApply}
                            className="rounded bg-[#0d6efd] px-4 py-2 text-sm font-medium text-white hover:bg-[#0b5ed7]"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

