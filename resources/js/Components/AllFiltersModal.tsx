import { useState, useEffect } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import LocationFilter from "./Filters/LocationFilter";
import SaveFilterModal from "./SaveFilterModal";
import { saveFilter } from "../utils/cookies";
import KeywordsFilter from "./Filters/KeywordsFilter";
import PropertyTypeFilter from "./Filters/PropertyTypeFilter";
import PriceFilter from "./Filters/PriceFilter";
import CapRateFilter from "./Filters/CapRateFilter";
import TenantBrandFilter from "./Filters/TenantBrandFilter";
import RemainingTermFilter from "./Filters/RemainingTermFilter";
import BrokerAgentFilter from "./Filters/BrokerAgentFilter";
import BrokerageShopFilter from "./Filters/BrokerageShopFilter";
import TenancyFilter from "./Filters/TenancyFilter";
import LeaseTypeFilter from "./Filters/LeaseTypeFilter";
import UnitMeasurementsFilter from "./Filters/UnitMeasurementsFilter";
import PropertyDetailsFilter from "./Filters/PropertyDetailsFilter";
import TenantCreditFilter from "./Filters/TenantCreditFilter";
import OccupancyFilter from "./Filters/OccupancyFilter";
import ListingTimelineFilter from "./Filters/ListingTimelineFilter";
import ListingStatusFilter from "./Filters/ListingStatusFilter";
import OpportunityZoneFilter from "./Filters/OpportunityZoneFilter";
import ClassFilter from "./Filters/ClassFilter";
import OtherOptionsFilter from "./Filters/OtherOptionsFilter";

interface AllFiltersModalProps {
    isOpen: boolean;
    onClose: () => void;
    activeFiltersCount?: number;
    onApply?: (filters: FilterValues) => void;
    onReset?: () => void;
    listingsCount?: number;
}

export interface FilterValues {
    location: string[];
    keywords: string;
    propertyTypes: string[];
    minPrice: string;
    maxPrice: string;
    excludeUnpriced: boolean;
    minCapRate: string;
    maxCapRate: string;
    tenantBrand: string;
    remainingTerm: [number, number];
    brokerAgent: string;
    brokerageShop: string;
    tenancy: "vacant" | "single" | "multi";
    leaseType: string;
    measurementType: "units" | "keys" | "beds" | "pads" | "pumps";
    minUnits: string;
    maxUnits: string;
    minSqft: string;
    maxSqft: string;
    minPricePerSqft: string;
    maxPricePerSqft: string;
    minAcres: string;
    maxAcres: string;
    tenantCredit: string;
    minOccupancy: string;
    maxOccupancy: string;
    timelineType: "timePeriod" | "custom";
    fromDate: string;
    toDate: string;
    timePeriod: string;
    listingStatus: string[];
    opportunityZone: boolean;
    propertyClass: string[];
    brokerAgentCoOp: boolean;
    ownerUser: boolean;
}

export default function AllFiltersModal({
    isOpen,
    onClose,
    activeFiltersCount = 0,
    onApply,
    onReset,
    listingsCount = 0,
}: AllFiltersModalProps) {
    // Filter states - Left Column
    const [location, setLocation] = useState<string[]>([]);
    const [keywords, setKeywords] = useState("");
    const [propertyTypes, setPropertyTypes] = useState<string[]>(["All"]);
    const [minPrice, setMinPrice] = useState("$0");
    const [maxPrice, setMaxPrice] = useState("$10,000,000+");
    const [excludeUnpriced, setExcludeUnpriced] = useState(false);
    const [minCapRate, setMinCapRate] = useState("0%");
    const [maxCapRate, setMaxCapRate] = useState("15%+");

    // Filter states - Middle Column
    const [tenantBrand, setTenantBrand] = useState("");
    const [remainingTerm, setRemainingTerm] = useState<[number, number]>([
        0, 100,
    ]);
    const [brokerAgent, setBrokerAgent] = useState("");
    const [brokerageShop, setBrokerageShop] = useState("");
    const [tenancy, setTenancy] = useState<"vacant" | "single" | "multi">(
        "single"
    );
    const [leaseType, setLeaseType] = useState("");
    const [measurementType, setMeasurementType] = useState<
        "units" | "keys" | "beds" | "pads" | "pumps"
    >("units");
    const [minUnits, setMinUnits] = useState("");
    const [maxUnits, setMaxUnits] = useState("");

    // Filter states - Right Column
    const [minSqft, setMinSqft] = useState("");
    const [maxSqft, setMaxSqft] = useState("");
    const [minPricePerSqft, setMinPricePerSqft] = useState("");
    const [maxPricePerSqft, setMaxPricePerSqft] = useState("");
    const [minAcres, setMinAcres] = useState("");
    const [maxAcres, setMaxAcres] = useState("");
    const [tenantCredit, setTenantCredit] = useState("");
    const [minOccupancy, setMinOccupancy] = useState("0%");
    const [maxOccupancy, setMaxOccupancy] = useState("100%");
    const [timelineType, setTimelineType] = useState<"timePeriod" | "custom">(
        "timePeriod"
    );
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [timePeriod, setTimePeriod] = useState("Any");
    const [listingStatus, setListingStatus] = useState<string[]>([
        "Active Listings",
        "On-Market",
        "Auction",
        "Highest & Best",
    ]);
    const [opportunityZone, setOpportunityZone] = useState(false);
    const [propertyClass, setPropertyClass] = useState<string[]>([]);
    const [brokerAgentCoOp, setBrokerAgentCoOp] = useState(false);
    const [ownerUser, setOwnerUser] = useState(false);

    // Save Search state
    const [saveSearch, setSaveSearch] = useState(false);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [savingSearch, setSavingSearch] = useState(false);

    const handleReset = () => {
        setLocation([]);
        setKeywords("");
        setPropertyTypes(["All"]);
        setMinPrice("$0");
        setMaxPrice("$10,000,000+");
        setExcludeUnpriced(false);
        setMinCapRate("0%");
        setMaxCapRate("15%+");
        setTenantBrand("");
        setRemainingTerm([0, 100]);
        setBrokerAgent("");
        setBrokerageShop("");
        setTenancy("single");
        setLeaseType("");
        setMeasurementType("units");
        setMinUnits("");
        setMaxUnits("");
        setMinSqft("");
        setMaxSqft("");
        setMinPricePerSqft("");
        setMaxPricePerSqft("");
        setMinAcres("");
        setMaxAcres("");
        setTenantCredit("");
        setMinOccupancy("0%");
        setMaxOccupancy("100%");
        setTimelineType("timePeriod");
        setFromDate("");
        setToDate("");
        setTimePeriod("Any");
        setListingStatus([
            "Active Listings",
            "On-Market",
            "Auction",
            "Highest & Best",
        ]);
        setOpportunityZone(false);
        setPropertyClass([]);
        setBrokerAgentCoOp(false);
        setOwnerUser(false);
        setSaveSearch(false);
        onReset?.();
    };

    const handleApply = () => {
        const filters: FilterValues = {
            location,
            keywords,
            propertyTypes,
            minPrice,
            maxPrice,
            excludeUnpriced,
            minCapRate,
            maxCapRate,
            tenantBrand,
            remainingTerm,
            brokerAgent,
            brokerageShop,
            tenancy,
            leaseType,
            measurementType,
            minUnits,
            maxUnits,
            minSqft,
            maxSqft,
            minPricePerSqft,
            maxPricePerSqft,
            minAcres,
            maxAcres,
            tenantCredit,
            minOccupancy,
            maxOccupancy,
            timelineType,
            fromDate,
            toDate,
            timePeriod,
            listingStatus,
            opportunityZone,
            propertyClass,
            brokerAgentCoOp,
            ownerUser,
        };

        // Show save modal if checkbox is checked
        if (saveSearch) {
            setShowSaveModal(true);
        } else {
            onApply?.(filters);
            onClose();
        }
    };

    // Get default filter name based on selected property types
    const getDefaultFilterName = (): string => {
        if (propertyTypes.length === 0 || propertyTypes.includes("All")) {
            return "All Properties";
        }
        // Filter out "All" and subtypes, get main types
        const mainTypes = propertyTypes
            .filter((type) => type !== "All" && !type.includes(" - "))
            .slice(0, 3); // Take first 3 types
        return mainTypes.length > 0 ? mainTypes.join(", ") : "Custom Search";
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

    const handleSaveFilter = (name: string, duration: string) => {
        setSavingSearch(true);
        try {
            const filters: FilterValues = {
                location,
                keywords,
                propertyTypes,
                minPrice,
                maxPrice,
                excludeUnpriced,
                minCapRate,
                maxCapRate,
                tenantBrand,
                remainingTerm,
                brokerAgent,
                brokerageShop,
                tenancy,
                leaseType,
                measurementType,
                minUnits,
                maxUnits,
                minSqft,
                maxSqft,
                minPricePerSqft,
                maxPricePerSqft,
                minAcres,
                maxAcres,
                tenantCredit,
                minOccupancy,
                maxOccupancy,
                timelineType,
                fromDate,
                toDate,
                timePeriod,
                listingStatus,
                opportunityZone,
                propertyClass,
                brokerAgentCoOp,
                ownerUser,
            };

            // Save to cookies
            saveFilter(name, duration, filters);

            // Close modals and apply filters
            setShowSaveModal(false);
            setSaveSearch(false);
            onApply?.(filters);
            onClose();
        } catch (error: any) {
            console.error("Error saving filter:", error);
            alert("Failed to save search. Please try again.");
        } finally {
            setSavingSearch(false);
        }
    };

    const handleCancelSave = () => {
        setShowSaveModal(false);
        setSaveSearch(false);
        // Still apply the filters even if user cancels saving
        const filters: FilterValues = {
            location,
            keywords,
            propertyTypes,
            minPrice,
            maxPrice,
            excludeUnpriced,
            minCapRate,
            maxCapRate,
            tenantBrand,
            remainingTerm,
            brokerAgent,
            brokerageShop,
            tenancy,
            leaseType,
            measurementType,
            minUnits,
            maxUnits,
            minSqft,
            maxSqft,
            minPricePerSqft,
            maxPricePerSqft,
            minAcres,
            maxAcres,
            tenantCredit,
            minOccupancy,
            maxOccupancy,
            timelineType,
            fromDate,
            toDate,
            timePeriod,
            listingStatus,
            opportunityZone,
            propertyClass,
            brokerAgentCoOp,
            ownerUser,
        };
        onApply?.(filters);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Save Filter Modal */}
            <SaveFilterModal
                isOpen={showSaveModal}
                onClose={handleCancelSave}
                onSave={handleSaveFilter}
                defaultName={getDefaultFilterName()}
                saving={savingSearch}
            />

            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40 bg-black opacity-50 transition-opacity duration-300 ease-in-out"
                onClick={onClose}
            />

            {/* Modal - Full Page */}
            <div className="fixed left-0 top-0 z-50 h-full w-full lg:max-w-[95%] bg-white rounded-none lg:rounded-r-2xl shadow-xl transition-transform duration-300 ease-in-out translate-x-0 overflow-hidden">
                <div className="flex h-full flex-col overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 lg:px-6 lg:py-4">
                        <div className="flex items-center gap-2 lg:gap-3">
                            <SlidersHorizontal className="h-4 w-4 lg:h-5 lg:w-5 text-[#0066CC]" />
                            <h2 className="text-base lg:text-lg font-semibold text-gray-900">
                                Sales Filters
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
                            className="rounded-full p-1.5 lg:p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all"
                            aria-label="Close filters"
                        >
                            <X className="h-4 w-4 lg:h-5 lg:w-5" />
                        </button>
                    </div>

                    {/* Scrollable Content - Responsive Columns */}
                    <div className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-3 lg:px-4 lg:py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 min-w-0">
                            {/* Column 1 */}
                            <div className="space-y-4 min-w-0 bg-slate-50 rounded-lg p-3 lg:p-4">
                                <LocationFilter
                                    value={location}
                                    onChange={setLocation}
                                />
                                <KeywordsFilter
                                    value={keywords}
                                    onChange={setKeywords}
                                />
                                <div className="max-h-[280px] overflow-y-auto overflow-x-hidden pr-1">
                                    <PropertyTypeFilter
                                        selectedTypes={propertyTypes}
                                        onChange={setPropertyTypes}
                                    />
                                </div>
                                <PriceFilter
                                    minPrice={minPrice}
                                    maxPrice={maxPrice}
                                    onMinPriceChange={setMinPrice}
                                    onMaxPriceChange={setMaxPrice}
                                    excludeUnpriced={excludeUnpriced}
                                    onExcludeUnpricedChange={setExcludeUnpriced}
                                />
                                <CapRateFilter
                                    minCapRate={minCapRate}
                                    maxCapRate={maxCapRate}
                                    onMinCapRateChange={setMinCapRate}
                                    onMaxCapRateChange={setMaxCapRate}
                                />
                            </div>

                            {/* Column 2 */}
                            <div className="space-y-4 w-full">
                                <TenantBrandFilter
                                    value={tenantBrand}
                                    onChange={setTenantBrand}
                                />
                                <RemainingTermFilter
                                    value={remainingTerm}
                                    onChange={setRemainingTerm}
                                />
                                <BrokerAgentFilter
                                    value={brokerAgent}
                                    onChange={setBrokerAgent}
                                />
                                <BrokerageShopFilter
                                    value={brokerageShop}
                                    onChange={setBrokerageShop}
                                />
                                <TenancyFilter
                                    tenancy={tenancy}
                                    onChange={setTenancy}
                                />
                                <LeaseTypeFilter
                                    selectedLeaseType={leaseType}
                                    onChange={setLeaseType}
                                />
                                <UnitMeasurementsFilter
                                    measurementType={measurementType}
                                    onMeasurementTypeChange={setMeasurementType}
                                    minUnits={minUnits}
                                    maxUnits={maxUnits}
                                    onMinUnitsChange={setMinUnits}
                                    onMaxUnitsChange={setMaxUnits}
                                />
                            </div>

                            {/* Column 3 */}
                            <div className="space-y-4 w-full">
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
                                <TenantCreditFilter
                                    selectedCredit={tenantCredit}
                                    onChange={setTenantCredit}
                                />
                                <OccupancyFilter
                                    minOccupancy={minOccupancy}
                                    maxOccupancy={maxOccupancy}
                                    onMinOccupancyChange={setMinOccupancy}
                                    onMaxOccupancyChange={setMaxOccupancy}
                                />
                                <ListingTimelineFilter
                                    timelineType={timelineType}
                                    onTimelineTypeChange={setTimelineType}
                                    fromDate={fromDate}
                                    toDate={toDate}
                                    onFromDateChange={setFromDate}
                                    onToDateChange={setToDate}
                                    timePeriod={timePeriod}
                                    onTimePeriodChange={setTimePeriod}
                                />
                            </div>

                            {/* Column 4 */}
                            <div className="space-y-4 w-full">
                                <ListingStatusFilter
                                    selectedStatuses={listingStatus}
                                    onChange={setListingStatus}
                                />
                                <OpportunityZoneFilter
                                    value={opportunityZone}
                                    onChange={setOpportunityZone}
                                />
                                <ClassFilter
                                    selectedClasses={propertyClass}
                                    onChange={setPropertyClass}
                                />
                                <OtherOptionsFilter
                                    brokerAgentCoOp={brokerAgentCoOp}
                                    ownerUser={ownerUser}
                                    onBrokerAgentCoOpChange={setBrokerAgentCoOp}
                                    onOwnerUserChange={setOwnerUser}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Fixed Footer */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 border-t border-gray-200 bg-white px-4 py-3 lg:px-6 lg:py-4">
                        {/* Left: Clear All Filters */}
                        <button
                            type="button"
                            onClick={handleReset}
                            className="text-sm font-semibold cursor-pointer text-[#0066CC] hover:text-[#004C99] transition-colors whitespace-nowrap text-center sm:text-left"
                        >
                            Clear All Filters
                        </button>

                        {/* Right: Show Button */}
                        <button
                            type="button"
                            onClick={handleApply}
                            className="rounded-lg cursor-pointer bg-[#0066CC] px-4 py-2.5 lg:px-6 text-sm font-semibold text-white hover:bg-[#004C99] shadow-md hover:shadow-lg transition-all whitespace-nowrap w-full sm:w-auto"
                        >
                            Show{" "}
                            {listingsCount > 0
                                ? `${listingsCount.toLocaleString()}+`
                                : ""}{" "}
                            Listings
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
