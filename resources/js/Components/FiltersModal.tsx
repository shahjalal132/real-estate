import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

interface FiltersModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply?: (filters: FilterState) => void;
}

export interface FilterState {
    region: string;
    auctionEvent: string;
    assetType: string;
    other: string[];
    propertyTypes: string[];
}

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

export default function FiltersModal({
    isOpen,
    onClose,
    onApply,
}: FiltersModalProps) {
    const [region, setRegion] = useState("all");
    const [auctionEvent, setAuctionEvent] = useState("all");
    const [assetType, setAssetType] = useState("Real Estate");
    const [other, setOther] = useState<string[]>([]);
    const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
    const [regionOpen, setRegionOpen] = useState(false);
    const [auctionEventOpen, setAuctionEventOpen] = useState(false);

    if (!isOpen) return null;

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

    const handleApply = () => {
        onApply?.({
            region,
            auctionEvent,
            assetType,
            other,
            propertyTypes,
        });
        onClose();
    };

    const handleReset = () => {
        setRegion("all");
        setAuctionEvent("all");
        setAssetType("Real Estate");
        setOther([]);
        setPropertyTypes([]);
    };

    const selectedRegion = REGION_OPTIONS.find((opt) => opt.value === region)
        ?.label || "All";
    const selectedAuctionEvent = AUCTION_EVENT_OPTIONS.find(
        (opt) => opt.value === auctionEvent,
    )?.label || "All";

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-50 bg-black/50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                    className="relative w-full max-w-5xl rounded-lg bg-white shadow-xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Filters
                        </h2>
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
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
            </div>
        </>
    );
}

