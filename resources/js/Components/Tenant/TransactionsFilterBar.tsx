import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import TenantSortSelector from "./TenantSortSelector";
import SizeOccupiedSelector from "./SizeOccupiedSelector";
import SignDateFilter from "./SignDateFilter";

interface TransactionsFilterBarProps {
    transactionType?: "lease" | "sale";
    onTransactionTypeChange?: (type: "lease" | "sale") => void;
    addressSearch?: string;
    onAddressSearchChange?: (value: string) => void;
    spaceUse?: string[];
    onSpaceUseChange?: (value: string[]) => void;
    inShoppingCenter?: boolean;
    onInShoppingCenterChange?: (value: boolean) => void;
    minSizeLeased?: number | null;
    maxSizeLeased?: number | null;
    onSizeLeasedChange?: (min: number | null, max: number | null) => void;
    signedWithinLast?: string;
    onSignedWithinLastChange?: (value: string) => void;
    signDateStart?: string;
    onSignDateStartChange?: (value: string) => void;
    signDateEnd?: string;
    onSignDateEndChange?: (value: string) => void;
    propertyType?: string[];
    onPropertyTypeChange?: (value: string[]) => void;
    minSizeSold?: number | null;
    maxSizeSold?: number | null;
    onSizeSoldChange?: (min: number | null, max: number | null) => void;
    transactionCount?: number;
    sortBy?: string;
    sortDir?: "asc" | "desc";
    onSortChange?: (sortBy: string, sortDir: "asc" | "desc") => void;
}

export default function TransactionsFilterBar({
    transactionType = "lease",
    onTransactionTypeChange,
    addressSearch = "",
    onAddressSearchChange,
    spaceUse = [],
    onSpaceUseChange,
    inShoppingCenter = false,
    onInShoppingCenterChange,
    minSizeLeased,
    maxSizeLeased,
    onSizeLeasedChange,
    signedWithinLast = "",
    onSignedWithinLastChange,
    signDateStart = "",
    onSignDateStartChange,
    signDateEnd = "",
    onSignDateEndChange,
    propertyType = [],
    onPropertyTypeChange,
    minSizeSold,
    maxSizeSold,
    onSizeSoldChange,
    transactionCount = 0,
    sortBy,
    sortDir,
    onSortChange,
}: TransactionsFilterBarProps) {
    const [localAddressSearch, setLocalAddressSearch] = useState(addressSearch);
    const [isSpaceUseOpen, setIsSpaceUseOpen] = useState(false);
    const [isPropertyTypeOpen, setIsPropertyTypeOpen] = useState(false);
    const [isShoppingCenterOpen, setIsShoppingCenterOpen] = useState(false);
    const spaceUseRef = useRef<HTMLDivElement>(null);
    const propertyTypeRef = useRef<HTMLDivElement>(null);

    // Space Use options based on screenshot
    const spaceUseOptions = [
        "Office",
        "Industrial",
        "Retail",
        "Flex",
        "Medical",
    ];

    // Property Type options for Sale transactions
    const propertyTypeOptions = [
        "Office",
        "Industrial",
        "Retail",
        "Flex",
        "Medical",
    ];

    // Shopping Center options (placeholder - can be expanded later)
    const shoppingCenterOptions = ["Option 1", "Option 2"];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                spaceUseRef.current &&
                !spaceUseRef.current.contains(event.target as Node)
            ) {
                setIsSpaceUseOpen(false);
                setIsShoppingCenterOpen(false);
            }
            if (
                propertyTypeRef.current &&
                !propertyTypeRef.current.contains(event.target as Node)
            ) {
                setIsPropertyTypeOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSpaceUseToggle = (option: string) => {
        const newSelection = spaceUse.includes(option)
            ? spaceUse.filter((item) => item !== option)
            : [...spaceUse, option];
        onSpaceUseChange?.(newSelection);
    };

    const getSpaceUseDisplayText = () => {
        if (spaceUse.length === 0) return "Space Use";
        if (spaceUse.length === 1) return spaceUse[0];
        return `${spaceUse.length} selected`;
    };

    const handlePropertyTypeToggle = (option: string) => {
        const newSelection = propertyType.includes(option)
            ? propertyType.filter((item) => item !== option)
            : [...propertyType, option];
        onPropertyTypeChange?.(newSelection);
    };

    const getPropertyTypeDisplayText = () => {
        if (propertyType.length === 0) return "Property Type";
        if (propertyType.length === 1) return propertyType[0];
        return `${propertyType.length} selected`;
    };

    const handleAddressSearchChange = (value: string) => {
        setLocalAddressSearch(value);
        onAddressSearchChange?.(value);
    };

    return (
        <div className="border-b border-gray-200 bg-white">
            {/* Transaction Type Tabs */}
            <div className="flex items-center gap-4 pt-4 pb-3 border-b border-gray-200">
                <button
                    onClick={() => onTransactionTypeChange?.("lease")}
                    className={`border-b-2 px-1 py-2 text-sm font-medium transition-colors ${
                        transactionType === "lease"
                            ? "border-red-500 text-red-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                >
                    Lease
                </button>
                <button
                    onClick={() => onTransactionTypeChange?.("sale")}
                    className={`border-b-2 px-1 py-2 text-sm font-medium transition-colors ${
                        transactionType === "sale"
                            ? "border-red-500 text-red-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                >
                    Sale
                </button>
            </div>

            {/* Filter Row */}
            <div className="flex items-center justify-between gap-4 py-4">
                {/* Left Group: Filter Inputs */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Address or Location Input */}
                    <div className="relative w-64 shrink-0">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            value={localAddressSearch}
                            onChange={(e) =>
                                handleAddressSearchChange(e.target.value)
                            }
                            placeholder="Address or Location"
                            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Conditional Filters based on Transaction Type */}
                    {transactionType === "lease" ? (
                        <>
                            {/* Space Use Multiselect Dropdown */}
                            <div
                                className="relative shrink-0"
                                ref={spaceUseRef}
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsSpaceUseOpen(!isSpaceUseOpen)
                                    }
                                    className={`flex items-center justify-between rounded-md border py-2 pl-3 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white min-w-[140px] ${
                                        spaceUse.length > 0
                                            ? "border-blue-500 bg-blue-50 text-blue-700"
                                            : "border-gray-300 text-gray-700 hover:bg-gray-50"
                                    }`}
                                >
                                    <span className="truncate">
                                        {getSpaceUseDisplayText()}
                                    </span>
                                    <ChevronDown
                                        className={`absolute right-2 h-4 w-4 text-gray-400 pointer-events-none transition-transform ${
                                            isSpaceUseOpen ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>

                                {isSpaceUseOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={() =>
                                                setIsSpaceUseOpen(false)
                                            }
                                        />
                                        <div className="absolute left-0 z-50 mt-1 w-56 rounded-md border border-gray-200 bg-white shadow-lg overflow-hidden">
                                            <div className="py-1">
                                                {/* Space Use Options */}
                                                {spaceUseOptions.map(
                                                    (option) => (
                                                        <label
                                                            key={option}
                                                            className="flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={spaceUse.includes(
                                                                    option
                                                                )}
                                                                onChange={() =>
                                                                    handleSpaceUseToggle(
                                                                        option
                                                                    )
                                                                }
                                                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 accent-blue-600"
                                                            />
                                                            <span className="text-sm text-gray-700">
                                                                {option}
                                                            </span>
                                                        </label>
                                                    )
                                                )}

                                                {/* Separator */}
                                                <div className="border-t border-gray-200 my-1" />

                                                {/* In a Shopping Center Option */}
                                                <div>
                                                    <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 transition-colors">
                                                        <label className="flex cursor-pointer items-center gap-2 flex-1">
                                                            <input
                                                                type="checkbox"
                                                                checked={
                                                                    inShoppingCenter
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    e.stopPropagation();
                                                                    onInShoppingCenterChange?.(
                                                                        e.target
                                                                            .checked
                                                                    );
                                                                }}
                                                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 accent-blue-600"
                                                            />
                                                            <span className="text-sm text-gray-700">
                                                                In a Shopping
                                                                Center
                                                            </span>
                                                        </label>
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setIsShoppingCenterOpen(
                                                                    !isShoppingCenterOpen
                                                                );
                                                            }}
                                                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                                                        >
                                                            <ChevronDown
                                                                className={`h-4 w-4 text-gray-400 transition-transform ${
                                                                    isShoppingCenterOpen
                                                                        ? "rotate-180"
                                                                        : ""
                                                                }`}
                                                            />
                                                        </button>
                                                    </div>

                                                    {/* Shopping Center Sub-options */}
                                                    {isShoppingCenterOpen && (
                                                        <div className="ml-4 border-l border-gray-200 pl-2">
                                                            {shoppingCenterOptions.map(
                                                                (option) => (
                                                                    <label
                                                                        key={
                                                                            option
                                                                        }
                                                                        className="flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors"
                                                                    >
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={
                                                                                false
                                                                            }
                                                                            onChange={() => {}}
                                                                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 accent-blue-600"
                                                                        />
                                                                        <span className="text-sm text-gray-700">
                                                                            {
                                                                                option
                                                                            }
                                                                        </span>
                                                                    </label>
                                                                )
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Size Leased Selector */}
                            <SizeOccupiedSelector
                                minValue={minSizeLeased ?? null}
                                maxValue={maxSizeLeased ?? null}
                                onChange={(min, max) => {
                                    onSizeLeasedChange?.(min, max);
                                }}
                            />

                            {/* Sign Date Filter */}
                            <SignDateFilter
                                signedWithinLast={signedWithinLast}
                                onSignedWithinLastChange={
                                    onSignedWithinLastChange
                                }
                                startDate={signDateStart}
                                onStartDateChange={onSignDateStartChange}
                                endDate={signDateEnd}
                                onEndDateChange={onSignDateEndChange}
                            />
                        </>
                    ) : (
                        <>
                            {/* Property Type Multiselect Dropdown */}
                            <div
                                className="relative shrink-0"
                                ref={propertyTypeRef}
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsPropertyTypeOpen(
                                            !isPropertyTypeOpen
                                        )
                                    }
                                    className={`flex items-center justify-between rounded-md border py-2 pl-3 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white min-w-[140px] ${
                                        propertyType.length > 0
                                            ? "border-blue-500 bg-blue-50 text-blue-700"
                                            : "border-gray-300 text-gray-700 hover:bg-gray-50"
                                    }`}
                                >
                                    <span className="truncate">
                                        {getPropertyTypeDisplayText()}
                                    </span>
                                    <ChevronDown
                                        className={`absolute right-2 h-4 w-4 text-gray-400 pointer-events-none transition-transform ${
                                            isPropertyTypeOpen
                                                ? "rotate-180"
                                                : ""
                                        }`}
                                    />
                                </button>

                                {isPropertyTypeOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={() =>
                                                setIsPropertyTypeOpen(false)
                                            }
                                        />
                                        <div className="absolute left-0 z-50 mt-1 w-56 rounded-md border border-gray-200 bg-white shadow-lg overflow-hidden">
                                            <div className="py-1">
                                                {/* Property Type Options */}
                                                {propertyTypeOptions.map(
                                                    (option) => (
                                                        <label
                                                            key={option}
                                                            className="flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={propertyType.includes(
                                                                    option
                                                                )}
                                                                onChange={() =>
                                                                    handlePropertyTypeToggle(
                                                                        option
                                                                    )
                                                                }
                                                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 accent-blue-600"
                                                            />
                                                            <span className="text-sm text-gray-700">
                                                                {option}
                                                            </span>
                                                        </label>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Size Sold Selector */}
                            <SizeOccupiedSelector
                                minValue={minSizeSold ?? null}
                                maxValue={maxSizeSold ?? null}
                                onChange={(min, max) => {
                                    onSizeSoldChange?.(min, max);
                                }}
                            />
                        </>
                    )}
                </div>

                {/* Right Group: Transaction Count and Sort */}
                <div className="flex items-center gap-4 shrink-0">
                    {/* Transaction Count */}
                    <div className="text-sm font-medium text-gray-700 whitespace-nowrap">
                        {transactionCount.toLocaleString()} Transactions
                    </div>

                    {/* Sort Selector */}
                    <TenantSortSelector
                        sortBy={sortBy}
                        sortDir={sortDir}
                        onSortChange={(sortBy, sortDir) => {
                            onSortChange?.(sortBy, sortDir);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
