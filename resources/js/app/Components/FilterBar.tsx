import { useState } from "react";
import { Search, SlidersHorizontal, ChevronDown, Grid3x3, Map } from "lucide-react";
import FiltersModal from "./FiltersModal";

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
    const [filtersModalOpen, setFiltersModalOpen] = useState(false);

    const selectedAuction = AUCTION_OPTIONS.find(
        (opt) => opt.value === auctionValue,
    )?.label || "Auctions";

    return (
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
                        setFiltersModalOpen(true);
                        onFiltersClick?.();
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-[#0d6efd] px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-sm hover:bg-[#0b5ed7] focus:outline-none"
                >
                    <SlidersHorizontal className="h-4 w-4" />
                    <span>FILTERS</span>
                    <ChevronDown className="h-4 w-4" />
                </button>
            </div>

            {/* Filters Modal */}
            <FiltersModal
                isOpen={filtersModalOpen}
                onClose={() => setFiltersModalOpen(false)}
                onApply={(filters) => {
                    console.log("Applied filters:", filters);
                    // Handle filter application here
                }}
            />

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
    );
}

