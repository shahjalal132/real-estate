import { useState } from "react";
import { ChevronDown } from "lucide-react";
import AllFiltersButton from "./AllFiltersButton";

interface PropertySearchHeaderProps {
    onSearch?: (filters: SearchFilters) => void;
    onFiltersClick?: () => void;
    onSaveSearch?: () => void;
    onClearFilters?: () => void;
    viewMode?: "grid" | "map";
    onViewModeChange?: (mode: "grid" | "map") => void;
    activeFiltersCount?: number;
}

export interface SearchFilters {
    status: string;
    propertyType: string;
    priceRange: string;
    capRate: string;
}

const STATUS_OPTIONS = [
    { value: "for-sale", label: "For Sale" },
    { value: "for-lease", label: "For Lease" },
    { value: "auctions", label: "Auctions" },
    { value: "all", label: "All" },
];

const PROPERTY_TYPE_OPTIONS = [
    { value: "all", label: "All Types" },
    { value: "Retail", label: "Retail" },
    { value: "Multifamily", label: "Multifamily" },
    { value: "Office", label: "Office" },
    { value: "Industrial", label: "Industrial" },
    { value: "Land", label: "Land" },
    { value: "Commercial", label: "Commercial" },
    { value: "Residential", label: "Residential" },
    { value: "Hospitality", label: "Hospitality" },
    { value: "Mixed Use", label: "Mixed Use" },
];

const PRICE_RANGE_OPTIONS = [
    { value: "any", label: "Any Price" },
    { value: "0-500k", label: "$0 - $500K" },
    { value: "500k-1m", label: "$500K - $1M" },
    { value: "1m-5m", label: "$1M - $5M" },
    { value: "5m-10m", label: "$5M - $10M" },
    { value: "10m+", label: "$10M+" },
];

const CAP_RATE_OPTIONS = [
    { value: "any", label: "Any CAP Rate" },
    { value: "0-3", label: "0% - 3%" },
    { value: "3-5", label: "3% - 5%" },
    { value: "5-7", label: "5% - 7%" },
    { value: "7-10", label: "7% - 10%" },
    { value: "10+", label: "10%+" },
];

export default function PropertySearchHeader({
    onSearch,
    onFiltersClick,
    onSaveSearch,
    onClearFilters,
    viewMode = "grid",
    onViewModeChange,
    activeFiltersCount = 0,
}: PropertySearchHeaderProps) {
    const [status, setStatus] = useState("for-sale");
    const [propertyType, setPropertyType] = useState("all");
    const [priceRange, setPriceRange] = useState("any");
    const [capRate, setCapRate] = useState("any");

    const [statusOpen, setStatusOpen] = useState(false);
    const [typeOpen, setTypeOpen] = useState(false);
    const [priceOpen, setPriceOpen] = useState(false);
    const [capRateOpen, setCapRateOpen] = useState(false);

    const selectedStatus =
        STATUS_OPTIONS.find((opt) => opt.value === status)?.label || "For Sale";
    const selectedType =
        PROPERTY_TYPE_OPTIONS.find((opt) => opt.value === propertyType)
            ?.label || "All Types";
    const selectedPrice =
        PRICE_RANGE_OPTIONS.find((opt) => opt.value === priceRange)?.label ||
        "Any Price";
    const selectedCapRate =
        CAP_RATE_OPTIONS.find((opt) => opt.value === capRate)?.label ||
        "Any CAP Rate";

    const handleSearch = () => {
        onSearch?.({
            status,
            propertyType,
            priceRange,
            capRate,
        });
    };

    const DropdownButton = ({
        label,
        isOpen,
        onClick,
        className = "",
    }: {
        label: string;
        isOpen: boolean;
        onClick: () => void;
        className?: string;
    }) => (
        <button
            type="button"
            onClick={onClick}
            className={`inline-flex items-center justify-between gap-2 rounded-md border-2 border-[#0066CC] cursor-pointer bg-white px-4 py-2.5 text-sm font-semibold text-[#0066CC] hover:bg-[#F0F7FF] transition-colors min-w-[140px] shadow-sm ${className}`}
        >
            <span>{label}</span>
            <ChevronDown
                className={`h-4 w-4 transition-transform ${
                    isOpen ? "rotate-180" : ""
                }`}
            />
        </button>
    );

    const DropdownMenu = ({
        isOpen,
        onClose,
        options,
        onSelect,
        className = "",
    }: {
        isOpen: boolean;
        onClose: () => void;
        options: { value: string; label: string }[];
        onSelect: (value: string) => void;
        className?: string;
    }) => {
        if (!isOpen) return null;
        return (
            <>
                <div className="fixed inset-0 z-10" onClick={onClose} />
                <div
                    className={`absolute z-20 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg ${className}`}
                >
                    <div className="py-1">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => {
                                    onSelect(option.value);
                                    onClose();
                                }}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            </>
        );
    };

    return (
        <div className="w-full bg-white border-b border-gray-200 py-4 shadow-sm">
            <div className="mx-auto w-[95%] max-w-full px-4 sm:px-6 lg:px-2">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Left Side: Dropdowns and Search Button */}
                    <div className="flex flex-wrap items-center gap-3 flex-1">
                        {/* Status Dropdown */}
                        <div className="relative">
                            <DropdownButton
                                label={selectedStatus}
                                isOpen={statusOpen}
                                onClick={() => {
                                    setStatusOpen(!statusOpen);
                                    setTypeOpen(false);
                                    setPriceOpen(false);
                                    setCapRateOpen(false);
                                }}
                            />
                            <DropdownMenu
                                isOpen={statusOpen}
                                onClose={() => setStatusOpen(false)}
                                options={STATUS_OPTIONS}
                                onSelect={setStatus}
                            />
                        </div>

                        {/* Property Type Dropdown */}
                        <div className="relative">
                            <DropdownButton
                                label={selectedType}
                                isOpen={typeOpen}
                                onClick={() => {
                                    setTypeOpen(!typeOpen);
                                    setStatusOpen(false);
                                    setPriceOpen(false);
                                    setCapRateOpen(false);
                                }}
                            />
                            <DropdownMenu
                                isOpen={typeOpen}
                                onClose={() => setTypeOpen(false)}
                                options={PROPERTY_TYPE_OPTIONS}
                                onSelect={setPropertyType}
                            />
                        </div>

                        {/* Price Range Dropdown */}
                        <div className="relative">
                            <DropdownButton
                                label={selectedPrice}
                                isOpen={priceOpen}
                                onClick={() => {
                                    setPriceOpen(!priceOpen);
                                    setStatusOpen(false);
                                    setTypeOpen(false);
                                    setCapRateOpen(false);
                                }}
                            />
                            <DropdownMenu
                                isOpen={priceOpen}
                                onClose={() => setPriceOpen(false)}
                                options={PRICE_RANGE_OPTIONS}
                                onSelect={setPriceRange}
                            />
                        </div>

                        {/* CAP Rate Dropdown */}
                        <div className="relative">
                            <DropdownButton
                                label={selectedCapRate}
                                isOpen={capRateOpen}
                                onClick={() => {
                                    setCapRateOpen(!capRateOpen);
                                    setStatusOpen(false);
                                    setTypeOpen(false);
                                    setPriceOpen(false);
                                }}
                            />
                            <DropdownMenu
                                isOpen={capRateOpen}
                                onClose={() => setCapRateOpen(false)}
                                options={CAP_RATE_OPTIONS}
                                onSelect={setCapRate}
                            />
                        </div>

                        {/* Search Now Button */}
                        <button
                            type="button"
                            onClick={handleSearch}
                            className="bg-[#0066CC] hover:bg-[#004C99] text-white px-6 py-2.5 rounded font-semibold whitespace-nowrap transition-colors shadow-sm"
                        >
                            Save Search
                        </button>
                    </div>

                    {/* Right Side: Filters, Save, Clear, Map Toggle */}
                    <div className="flex flex-wrap items-center gap-3">
                        {/* All Filters Button */}
                        <AllFiltersButton
                            onClick={onFiltersClick || (() => {})}
                            activeFiltersCount={activeFiltersCount}
                        />

                        {/* Map Toggle */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-700">
                                Show Map
                            </span>
                            <button
                                type="button"
                                onClick={() =>
                                    onViewModeChange?.(
                                        viewMode === "map" ? "grid" : "map"
                                    )
                                }
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:ring-offset-2 cursor-pointer ${
                                    viewMode === "map"
                                        ? "bg-[#0066CC]"
                                        : "bg-gray-300"
                                }`}
                                role="switch"
                                aria-checked={viewMode === "map"}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        viewMode === "map"
                                            ? "translate-x-6"
                                            : "translate-x-1"
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
