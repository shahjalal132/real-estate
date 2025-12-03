import { useState, useEffect } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import LocationFilter from "./Filters/LocationFilter";
import KeywordsFilter from "./Filters/KeywordsFilter";
import PropertyTypeFilter from "./Filters/PropertyTypeFilter";
import RateFilter from "./Filters/RateFilter";
import SizeFilter from "./Filters/SizeFilter";
import BrokerAgentFilter from "./Filters/BrokerAgentFilter";
import BrokerageShopFilter from "./Filters/BrokerageShopFilter";
import TenancyFilter from "./Filters/TenancyFilter";
import ListingTimelineFilter from "./Filters/ListingTimelineFilter";
import ClassFilter from "./Filters/ClassFilter";

interface AllFiltersModalProps {
    isOpen: boolean;
    onClose: () => void;
    activeFiltersCount?: number;
    onApply?: (filters: FilterValues) => void;
    onReset?: () => void;
    listingsCount?: number;
}

export interface FilterValues {
    location: string;
    keywords: string;
    propertyTypes: string[];
    rateType: "yearly" | "monthly";
    minRate: string;
    maxRate: string;
    excludeUndisclosedRate: boolean;
    sizeType: "sqft" | "acreage";
    minSize: string;
    maxSize: string;
    brokerAgent: string;
    brokerageShop: string;
    tenancy: "single" | "multiple";
    timelineType: "timePeriod" | "custom";
    fromDate: string;
    toDate: string;
    timePeriod: string;
    propertyClass: string[];
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
    const [location, setLocation] = useState("");
    const [keywords, setKeywords] = useState("");
    const [propertyTypes, setPropertyTypes] = useState<string[]>(["All"]);
    const [rateType, setRateType] = useState<"yearly" | "monthly">("yearly");
    const [minRate, setMinRate] = useState("$0");
    const [maxRate, setMaxRate] = useState("$20,000+");
    const [excludeUndisclosedRate, setExcludeUndisclosedRate] = useState(false);
    const [sizeType, setSizeType] = useState<"sqft" | "acreage">("sqft");
    const [minSize, setMinSize] = useState("0");
    const [maxSize, setMaxSize] = useState("15,000+");

    // Update max rate when rate type changes
    useEffect(() => {
        if (rateType === "yearly") {
            setMaxRate("$20,000+");
        } else {
            setMaxRate("$2,000+");
        }
    }, [rateType]);

    // Update max size when size type changes
    useEffect(() => {
        if (sizeType === "sqft") {
            setMaxSize("15,000+");
        } else {
            setMaxSize("100+");
        }
    }, [sizeType]);

    // Filter states - Right Column
    const [brokerAgent, setBrokerAgent] = useState("");
    const [brokerageShop, setBrokerageShop] = useState("");
    const [tenancy, setTenancy] = useState<"single" | "multiple">("single");
    const [timelineType, setTimelineType] = useState<"timePeriod" | "custom">(
        "timePeriod"
    );
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [timePeriod, setTimePeriod] = useState("Any");
    const [propertyClass, setPropertyClass] = useState<string[]>([]);

    // Save Search state
    const [saveSearch, setSaveSearch] = useState(false);

    const handleReset = () => {
        setLocation("");
        setKeywords("");
        setPropertyTypes(["All"]);
        setRateType("yearly");
        setMinRate("$0");
        setMaxRate("$20,000+");
        setExcludeUndisclosedRate(false);
        setSizeType("sqft");
        setMinSize("0");
        setMaxSize("15,000+");
        setBrokerAgent("");
        setBrokerageShop("");
        setTenancy("single");
        setTimelineType("timePeriod");
        setFromDate("");
        setToDate("");
        setTimePeriod("Any");
        setPropertyClass([]);
        setSaveSearch(false);
        onReset?.();
    };

    const handleApply = () => {
        const filters: FilterValues = {
            location,
            keywords,
            propertyTypes,
            rateType,
            minRate,
            maxRate,
            excludeUndisclosedRate,
            sizeType,
            minSize,
            maxSize,
            brokerAgent,
            brokerageShop,
            tenancy,
            timelineType,
            fromDate,
            toDate,
            timePeriod,
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

            {/* Modal - Slides in from left */}
            <div className="fixed left-0 top-0 z-50 h-full w-full max-w-[800px] bg-white shadow-xl transition-transform duration-300 ease-in-out translate-x-0 overflow-hidden">
                <div className="flex h-full flex-col overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                        <div className="flex items-center gap-3">
                            <SlidersHorizontal className="h-5 w-5 text-[#0066CC]" />
                            <h2 className="text-lg font-semibold text-gray-900">
                                Filters
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
                            {/* Left Column */}
                            <div className="space-y-6 min-w-0">
                                <LocationFilter
                                    value={location}
                                    onChange={setLocation}
                                />
                                <KeywordsFilter
                                    value={keywords}
                                    onChange={setKeywords}
                                />
                                <div className="max-h-[340px] overflow-y-auto overflow-x-hidden pr-2">
                                    <PropertyTypeFilter
                                        selectedTypes={propertyTypes}
                                        onChange={setPropertyTypes}
                                    />
                                </div>
                                <RateFilter
                                    rateType={rateType}
                                    onRateTypeChange={setRateType}
                                    minRate={minRate}
                                    maxRate={maxRate}
                                    onMinRateChange={setMinRate}
                                    onMaxRateChange={setMaxRate}
                                    excludeUndisclosed={excludeUndisclosedRate}
                                    onExcludeUndisclosedChange={
                                        setExcludeUndisclosedRate
                                    }
                                />
                                <SizeFilter
                                    sizeType={sizeType}
                                    onSizeTypeChange={setSizeType}
                                    minSize={minSize}
                                    maxSize={maxSize}
                                    onMinSizeChange={setMinSize}
                                    onMaxSizeChange={setMaxSize}
                                />
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6 w-full">
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
                                <ClassFilter
                                    selectedClasses={propertyClass}
                                    onChange={setPropertyClass}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Fixed Footer */}
                    <div className="flex items-center justify-between gap-4 border-t border-gray-200 bg-white px-6 py-4">
                        {/* Left: Clear All Filters */}
                        <button
                            type="button"
                            onClick={handleReset}
                            className="text-sm font-semibold text-[#0066CC] hover:text-[#004C99] transition-colors whitespace-nowrap"
                        >
                            Clear All Filters
                        </button>

                        {/* Center: Save Search */}
                        <label className="flex cursor-pointer items-center gap-2 flex-1 max-w-md">
                            <input
                                type="checkbox"
                                checked={saveSearch}
                                onChange={(e) =>
                                    setSaveSearch(e.target.checked)
                                }
                                className="h-4 w-4 rounded border-gray-300 text-[#0066CC] focus:ring-[#0066CC] accent-[#0066CC] shrink-0"
                            />
                            <span className="text-sm text-gray-700 whitespace-nowrap">
                                Save Search
                            </span>
                            <span className="text-xs text-gray-500">
                                Receive email alerts when new properties hit the
                                market.
                            </span>
                        </label>

                        {/* Right: Show Button */}
                        <button
                            type="button"
                            onClick={handleApply}
                            className="rounded-lg bg-[#0066CC] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#004C99] shadow-md hover:shadow-lg transition-all whitespace-nowrap"
                        >
                            Show{" "}
                            {listingsCount > 0 ? `${listingsCount}+` : "999+"}{" "}
                            Spaces
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
