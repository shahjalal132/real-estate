import { useState } from "react";
import {
    Search,
    SlidersHorizontal,
    ChevronDown,
    Grid3x3,
    Map,
    X,
} from "lucide-react";
import LocationFilter from "./Filters/LocationFilter";
import KeywordsFilter from "./Filters/KeywordsFilter";
import PropertyTypeFilter from "./Filters/PropertyTypeFilter";
import ListingStatusFilter from "./Filters/ListingStatusFilter";
import TenantBrandFilter from "./Filters/TenantBrandFilter";
import RemainingTermFilter from "./Filters/RemainingTermFilter";
import BrokerAgentFilter from "./Filters/BrokerAgentFilter";
import BrokerageShopFilter from "./Filters/BrokerageShopFilter";
import PropertyDetailsFilter from "./Filters/PropertyDetailsFilter";
import TenantCreditFilter from "./Filters/TenantCreditFilter";
import OpportunityZoneFilter from "./Filters/OpportunityZoneFilter";
import ClassFilter from "./Filters/ClassFilter";

interface FilterBarProps {
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    auctionValue?: string;
    onAuctionChange?: (value: string) => void;
    onFiltersClick?: () => void;
    viewMode?: "grid" | "map";
    onViewModeChange?: (mode: "grid" | "map") => void;
    showExpandedOnly?: boolean;
    listingsCount?: number;
}

export default function FilterBar({
    searchValue = "",
    onSearchChange,
    auctionValue = "all",
    onAuctionChange,
    onFiltersClick,
    viewMode = "grid",
    onViewModeChange,
    showExpandedOnly = false,
    listingsCount = 0,
}: FilterBarProps) {
    const [auctionOpen, setAuctionOpen] = useState(false);
    const [filtersExpanded, setFiltersExpanded] = useState(
        showExpandedOnly || false
    );

    // Filter states
    const [location, setLocation] = useState("");
    const [keywords, setKeywords] = useState("");
    const [propertyTypes, setPropertyTypes] = useState<string[]>(["All"]);
    const [tenantBrand, setTenantBrand] = useState("");
    const [remainingTerm, setRemainingTerm] = useState<[number, number]>([
        0, 100,
    ]);
    const [brokerAgent, setBrokerAgent] = useState("");
    const [brokerageShop, setBrokerageShop] = useState("");
    const [minSqft, setMinSqft] = useState("");
    const [maxSqft, setMaxSqft] = useState("");
    const [minPricePerSqft, setMinPricePerSqft] = useState("");
    const [maxPricePerSqft, setMaxPricePerSqft] = useState("");
    const [minAcres, setMinAcres] = useState("");
    const [maxAcres, setMaxAcres] = useState("");
    const [tenantCredit, setTenantCredit] = useState<string[]>([]);
    const [listingStatus, setListingStatus] = useState<string[]>([
        "Active Listings",
        "On-Market",
        "Auction",
        "Highest & Best",
        "Call For Offers",
    ]);
    const [opportunityZone, setOpportunityZone] = useState(false);
    const [propertyClass, setPropertyClass] = useState<string[]>([]);

    const handleReset = () => {
        setLocation("");
        setKeywords("");
        setPropertyTypes(["All"]);
        setTenantBrand("");
        setRemainingTerm([0, 100]);
        setBrokerAgent("");
        setBrokerageShop("");
        setMinSqft("");
        setMaxSqft("");
        setMinPricePerSqft("");
        setMaxPricePerSqft("");
        setMinAcres("");
        setMaxAcres("");
        setTenantCredit([]);
        setListingStatus([
            "Active Listings",
            "On-Market",
            "Auction",
            "Highest & Best",
            "Call For Offers",
        ]);
        setOpportunityZone(false);
        setPropertyClass([]);
    };

    const handleApply = () => {
        // Handle filter application here
        console.log("Applied filters:", {
            location,
            keywords,
            propertyTypes,
            tenantBrand,
            remainingTerm,
            brokerAgent,
            brokerageShop,
            minSqft,
            maxSqft,
            minPricePerSqft,
            maxPricePerSqft,
            minAcres,
            maxAcres,
            tenantCredit,
            listingStatus,
            opportunityZone,
            propertyClass,
        });
        setFiltersExpanded(false);
        onFiltersClick?.();
    };

    // If showExpandedOnly is true, show as sidebar
    if (showExpandedOnly) {
        return (
            <>
                {/* Backdrop */}
                <div
                    className="fixed inset-0 z-40 bg-black opacity-50 transition-opacity duration-300 ease-in-out"
                    onClick={() => {
                        setFiltersExpanded(false);
                        onFiltersClick?.();
                    }}
                />

                {/* Sidebar */}
                <div className="fixed left-0 top-0 z-50 h-full w-full bg-[#F5F5F5] shadow-lg transition-transform duration-300 ease-in-out translate-x-0 overflow-hidden">
                    <div className="flex h-full flex-col">
                        {/* Close Button - Top Right */}
                        <div className="flex justify-end p-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setFiltersExpanded(false);
                                    onFiltersClick?.();
                                }}
                                className="rounded-full p-2 text-[#0066CC] hover:bg-white transition-all"
                                aria-label="Close filters"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto px-8 py-4 pb-32">
                            <div className="mx-auto max-w-7xl">
                                <div className="grid grid-cols-3 gap-6 items-start">
                                    {/* Column 1 */}
                                    <div className="space-y-6">
                                        <LocationFilter
                                            value={location}
                                            onChange={setLocation}
                                        />
                                        <div className="max-h-[340px] overflow-y-auto pr-2">
                                            <PropertyTypeFilter
                                                selectedTypes={propertyTypes}
                                                onChange={setPropertyTypes}
                                            />
                                        </div>
                                        <TenantBrandFilter
                                            value={tenantBrand}
                                            onChange={setTenantBrand}
                                        />
                                        <BrokerageShopFilter
                                            value={brokerageShop}
                                            onChange={setBrokerageShop}
                                        />
                                    </div>

                                    {/* Column 2 */}
                                    <div className="space-y-6">
                                        <KeywordsFilter
                                            value={keywords}
                                            onChange={setKeywords}
                                        />
                                        <ClassFilter
                                            selectedClasses={propertyClass}
                                            onChange={setPropertyClass}
                                        />
                                        <PropertyDetailsFilter
                                            minSqft={minSqft}
                                            maxSqft={maxSqft}
                                            minPricePerSqft={minPricePerSqft}
                                            maxPricePerSqft={maxPricePerSqft}
                                            minAcres={minAcres}
                                            maxAcres={maxAcres}
                                            onMinSqftChange={setMinSqft}
                                            onMaxSqftChange={setMaxSqft}
                                            onMinPricePerSqftChange={
                                                setMinPricePerSqft
                                            }
                                            onMaxPricePerSqftChange={
                                                setMaxPricePerSqft
                                            }
                                            onMinAcresChange={setMinAcres}
                                            onMaxAcresChange={setMaxAcres}
                                        />
                                        <ListingStatusFilter
                                            selectedStatuses={listingStatus}
                                            onChange={setListingStatus}
                                        />
                                    </div>

                                    {/* Column 3 */}
                                    <div className="space-y-6">
                                        <TenantCreditFilter
                                            selectedCredits={tenantCredit}
                                            onChange={setTenantCredit}
                                        />
                                        <BrokerAgentFilter
                                            value={brokerAgent}
                                            onChange={setBrokerAgent}
                                        />
                                        <RemainingTermFilter
                                            value={remainingTerm}
                                            onChange={setRemainingTerm}
                                        />
                                        <OpportunityZoneFilter
                                            value={opportunityZone}
                                            onChange={setOpportunityZone}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Fixed Footer */}
                        <div className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-end gap-4 border-t-2 border-[#CCCCCC] bg-white px-8 py-5 shadow-lg">
                            <button
                                type="button"
                                onClick={handleReset}
                                className="rounded-lg border-2 border-[#CCCCCC] bg-white px-8 py-3 text-sm font-semibold text-[#666666] hover:bg-[#F5F5F5] hover:border-[#0066CC] transition-all"
                            >
                                Clear All Filters
                            </button>
                            <button
                                type="button"
                                onClick={handleApply}
                                className="rounded-lg bg-[#0066CC] px-8 py-3 text-sm font-semibold text-white hover:bg-[#004C99] shadow-md hover:shadow-lg transition-all"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

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
                        <span>Auctions</span>
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
                                    <button
                                        type="button"
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => {
                                            onAuctionChange?.("all");
                                            setAuctionOpen(false);
                                        }}
                                    >
                                        All Auctions
                                    </button>
                                    <button
                                        type="button"
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => {
                                            onAuctionChange?.("classic");
                                            setAuctionOpen(false);
                                        }}
                                    >
                                        Classic Auction
                                    </button>
                                    <button
                                        type="button"
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => {
                                            onAuctionChange?.("signature");
                                            setAuctionOpen(false);
                                        }}
                                    >
                                        Signature Auction
                                    </button>
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

            {/* Sidebar Toggle */}
            {filtersExpanded && (
                <>
                    <div
                        className="fixed inset-0 z-40 bg-black opacity-50 transition-opacity duration-300 ease-in-out"
                        onClick={() => {
                            setFiltersExpanded(false);
                            onFiltersClick?.();
                        }}
                    />

                    {/* Sidebar */}
                    <div className="fixed left-0 top-0 z-50 h-full w-full bg-[#F5F5F5] shadow-lg transition-transform duration-300 ease-in-out overflow-hidden">
                        <div className="flex h-full flex-col">
                            {/* Close Button - Top Right */}
                            <div className="flex justify-end p-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFiltersExpanded(false);
                                        onFiltersClick?.();
                                    }}
                                    className="rounded-full p-2 text-[#0066CC] hover:bg-white transition-all"
                                    aria-label="Close filters"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto px-8 py-4 pb-32">
                                <div className="mx-auto max-w-7xl">
                                    <div className="grid grid-cols-3 gap-6 items-start">
                                        {/* Column 1 */}
                                        <div className="space-y-6">
                                            <LocationFilter
                                                value={location}
                                                onChange={setLocation}
                                            />
                                            <div className="max-h-[340px] overflow-y-auto pr-2">
                                                <PropertyTypeFilter
                                                    selectedTypes={
                                                        propertyTypes
                                                    }
                                                    onChange={setPropertyTypes}
                                                />
                                            </div>
                                            <TenantBrandFilter
                                                value={tenantBrand}
                                                onChange={setTenantBrand}
                                            />
                                            <BrokerageShopFilter
                                                value={brokerageShop}
                                                onChange={setBrokerageShop}
                                            />
                                        </div>

                                        {/* Column 2 */}
                                        <div className="space-y-6">
                                            <KeywordsFilter
                                                value={keywords}
                                                onChange={setKeywords}
                                            />
                                            <ClassFilter
                                                selectedClasses={propertyClass}
                                                onChange={setPropertyClass}
                                            />
                                            <PropertyDetailsFilter
                                                minSqft={minSqft}
                                                maxSqft={maxSqft}
                                                minPricePerSqft={
                                                    minPricePerSqft
                                                }
                                                maxPricePerSqft={
                                                    maxPricePerSqft
                                                }
                                                minAcres={minAcres}
                                                maxAcres={maxAcres}
                                                onMinSqftChange={setMinSqft}
                                                onMaxSqftChange={setMaxSqft}
                                                onMinPricePerSqftChange={
                                                    setMinPricePerSqft
                                                }
                                                onMaxPricePerSqftChange={
                                                    setMaxPricePerSqft
                                                }
                                                onMinAcresChange={setMinAcres}
                                                onMaxAcresChange={setMaxAcres}
                                            />
                                            <ListingStatusFilter
                                                selectedStatuses={listingStatus}
                                                onChange={setListingStatus}
                                            />
                                        </div>

                                        {/* Column 3 */}
                                        <div className="space-y-6">
                                            <TenantCreditFilter
                                                selectedCredits={tenantCredit}
                                                onChange={setTenantCredit}
                                            />
                                            <BrokerAgentFilter
                                                value={brokerAgent}
                                                onChange={setBrokerAgent}
                                            />
                                            <RemainingTermFilter
                                                value={remainingTerm}
                                                onChange={setRemainingTerm}
                                            />
                                            <OpportunityZoneFilter
                                                value={opportunityZone}
                                                onChange={setOpportunityZone}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Fixed Footer */}
                            <div className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-end gap-3 border-t-2 border-[#CCCCCC] bg-white px-8 py-5 shadow-lg">
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="rounded-lg border-2 border-[#CCCCCC] bg-white px-8 py-3 text-sm font-semibold text-[#666666] hover:bg-[#F5F5F5] hover:border-[#0066CC] transition-all"
                                >
                                    Clear All Filters
                                </button>
                                <button
                                    type="button"
                                    onClick={handleApply}
                                    className="rounded-lg bg-[#0066CC] px-8 py-3 text-sm font-semibold text-white hover:bg-[#004C99] shadow-md hover:shadow-lg transition-all"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
