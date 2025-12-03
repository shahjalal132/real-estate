import { useState, useEffect } from "react";
import { SlidersHorizontal, X } from "lucide-react";
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

interface AllFiltersModalProps {
    isOpen: boolean;
    onClose: () => void;
    activeFiltersCount?: number;
    onApply?: (filters: FilterValues) => void;
    onReset?: () => void;
}

export interface FilterValues {
    location: string;
    keywords: string;
    propertyTypes: string[];
    tenantBrand: string;
    remainingTerm: [number, number];
    brokerAgent: string;
    brokerageShop: string;
    minSqft: string;
    maxSqft: string;
    minPricePerSqft: string;
    maxPricePerSqft: string;
    minAcres: string;
    maxAcres: string;
    tenantCredit: string[];
    listingStatus: string[];
    opportunityZone: boolean;
    propertyClass: string[];
}

export default function AllFiltersModal({
    isOpen,
    onClose,
    activeFiltersCount = 0,
    onApply,
    onReset,
}: AllFiltersModalProps) {
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
        onReset?.();
    };

    const handleApply = () => {
        const filters: FilterValues = {
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
        };
        onApply?.(filters);
        onClose();
    };

    // Lock body scroll and prevent horizontal scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.body.style.overflowX = "hidden";
            document.documentElement.style.overflowX = "hidden";
        } else {
            document.body.style.overflow = "";
            document.body.style.overflowX = "";
            document.documentElement.style.overflowX = "";
        }
        return () => {
            document.body.style.overflow = "";
            document.body.style.overflowX = "";
            document.documentElement.style.overflowX = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40 bg-black opacity-50 transition-opacity duration-300 ease-in-out"
                onClick={onClose}
            />

            {/* Modal - Slides in from right */}
            <div className="fixed right-0 top-0 z-50 h-full w-full max-w-[800px] bg-white shadow-xl transition-transform duration-300 ease-in-out translate-x-0 overflow-hidden">
                <div className="flex h-full flex-col overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                        <div className="flex items-center gap-3">
                            <SlidersHorizontal className="h-5 w-5 text-[#0066CC]" />
                            <h2 className="text-lg font-semibold text-gray-900">
                                All Filters
                            </h2>
                            {activeFiltersCount > 0 && (
                                <span className="bg-[#0066CC] text-white rounded-full px-2 py-0.5 text-xs font-bold min-w-[20px] text-center">
                                    {activeFiltersCount}
                                </span>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all"
                            aria-label="Close filters"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Scrollable Content - Two Columns */}
                    <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-6">
                        <div className="grid grid-cols-2 gap-6 min-w-0">
                            {/* Column 1 */}
                            <div className="space-y-6 min-w-0">
                                <LocationFilter
                                    value={location}
                                    onChange={setLocation}
                                />
                                <div className="max-h-[340px] overflow-y-auto overflow-x-hidden pr-2">
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
                                <TenantCreditFilter
                                    selectedCredits={tenantCredit}
                                    onChange={setTenantCredit}
                                />
                                <OpportunityZoneFilter
                                    value={opportunityZone}
                                    onChange={setOpportunityZone}
                                />
                            </div>

                            {/* Column 2 */}
                            <div className="space-y-6 min-w-0">
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
                                    onMinPricePerSqftChange={setMinPricePerSqft}
                                    onMaxPricePerSqftChange={setMaxPricePerSqft}
                                    onMinAcresChange={setMinAcres}
                                    onMaxAcresChange={setMaxAcres}
                                />
                                <ListingStatusFilter
                                    selectedStatuses={listingStatus}
                                    onChange={setListingStatus}
                                />
                                <BrokerAgentFilter
                                    value={brokerAgent}
                                    onChange={setBrokerAgent}
                                />
                                <RemainingTermFilter
                                    value={remainingTerm}
                                    onChange={setRemainingTerm}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Fixed Footer */}
                    <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-white px-6 py-4">
                        <button
                            type="button"
                            onClick={handleReset}
                            className="rounded-lg border-2 border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-[#0066CC] transition-all"
                        >
                            Clear All Filters
                        </button>
                        <button
                            type="button"
                            onClick={handleApply}
                            className="rounded-lg bg-[#0066CC] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#004C99] shadow-md hover:shadow-lg transition-all"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

