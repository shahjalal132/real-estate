import { Info, ChevronDown } from "lucide-react";

interface SalesTransactionsFiltersProps {
    numSalesTransactions?: string;
    soldWithin?: string;
    dealRole?: string[];
    totalDealValueMin?: string;
    totalDealValueMax?: string;
    individualDealValueBasis?: string;
    individualDealValueMin?: string;
    individualDealValueMax?: string;
    includeUndisclosedSalePrice?: boolean;
    totalDealSizeBasis?: string;
    totalDealSizeMin?: string;
    totalDealSizeMax?: string;
    individualDealSizeBasis?: string;
    individualDealSizeMin?: string;
    individualDealSizeMax?: string;
    salesCompsPropertyType?: string;
    salesCompsCostarRating?: number;
    salesCompsSecondaryType?: string;
    saleConditions?: string;
    onNumSalesTransactionsChange?: (value: string) => void;
    onSoldWithinChange?: (value: string) => void;
    onDealRoleChange?: (roles: string[]) => void;
    onTotalDealValueChange?: (min: string, max: string) => void;
    onIndividualDealValueChange?: (
        basis: string,
        min: string,
        max: string
    ) => void;
    onIncludeUndisclosedSalePriceChange?: (value: boolean) => void;
    onTotalDealSizeChange?: (basis: string, min: string, max: string) => void;
    onIndividualDealSizeChange?: (
        basis: string,
        min: string,
        max: string
    ) => void;
    onSalesCompsPropertyTypeChange?: (value: string) => void;
    onSalesCompsCostarRatingChange?: (rating: number) => void;
    onSalesCompsSecondaryTypeChange?: (value: string) => void;
    onSaleConditionsChange?: (value: string) => void;
}

export default function SalesTransactionsFilters({
    dealRole = [],
    totalDealValueMin = "",
    totalDealValueMax = "",
    individualDealValueBasis = "Total",
    individualDealValueMin = "",
    individualDealValueMax = "",
    includeUndisclosedSalePrice = false,
    totalDealSizeBasis = "SF",
    totalDealSizeMin = "",
    totalDealSizeMax = "",
    individualDealSizeBasis = "SF",
    individualDealSizeMin = "",
    individualDealSizeMax = "",
    salesCompsPropertyType = "",
    salesCompsCostarRating = 0,
    salesCompsSecondaryType = "",
    saleConditions = "",
    onSoldWithinChange,
    onDealRoleChange,
    onTotalDealValueChange,
    onIndividualDealValueChange,
    onIncludeUndisclosedSalePriceChange,
    onTotalDealSizeChange,
    onIndividualDealSizeChange,
    onSalesCompsPropertyTypeChange,
    onSalesCompsCostarRatingChange,
    onSalesCompsSecondaryTypeChange,
    onSaleConditionsChange,
}: SalesTransactionsFiltersProps) {
    return (
        <div className="space-y-3">
            {/* Two Column Grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {/* Left Column */}
                <div className="space-y-3">
                    {/* Sale Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Sale Date
                        </label>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => onSoldWithinChange?.("")}
                                className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm text-left focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                Select Date
                            </button>
                            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Total Deal Value */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Total Deal Value
                        </label>
                        <div className="flex items-center gap-1.5">
                            <input
                                type="text"
                                value={totalDealValueMin}
                                onChange={(e) =>
                                    onTotalDealValueChange?.(
                                        e.target.value,
                                        totalDealValueMax
                                    )
                                }
                                placeholder="$ Min"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <span className="text-gray-500 text-sm shrink-0">
                                –
                            </span>
                            <input
                                type="text"
                                value={totalDealValueMax}
                                onChange={(e) =>
                                    onTotalDealValueChange?.(
                                        totalDealValueMin,
                                        e.target.value
                                    )
                                }
                                placeholder="$ Max"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Total Deal Size */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-sm font-medium text-gray-700">
                                Total Deal Size
                            </label>
                            <select
                                value={totalDealSizeBasis}
                                onChange={(e) =>
                                    onTotalDealSizeChange?.(
                                        e.target.value,
                                        totalDealSizeMin,
                                        totalDealSizeMax
                                    )
                                }
                                className="w-14 rounded-md border border-gray-300 bg-white px-1.5 py-1 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option>SF</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <input
                                type="text"
                                value={totalDealSizeMin}
                                onChange={(e) =>
                                    onTotalDealSizeChange?.(
                                        totalDealSizeBasis,
                                        e.target.value,
                                        totalDealSizeMax
                                    )
                                }
                                placeholder="Min SF"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <span className="text-gray-500 text-sm shrink-0">
                                –
                            </span>
                            <input
                                type="text"
                                value={totalDealSizeMax}
                                onChange={(e) =>
                                    onTotalDealSizeChange?.(
                                        totalDealSizeBasis,
                                        totalDealSizeMin,
                                        e.target.value
                                    )
                                }
                                placeholder="Max SF"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Property Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Property Type
                        </label>
                        <select
                            value={salesCompsPropertyType}
                            onChange={(e) =>
                                onSalesCompsPropertyTypeChange?.(e.target.value)
                            }
                            className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="">Select</option>
                        </select>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                    {/* Deal Role */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Deal Role
                        </label>
                        <div className="flex items-center gap-2">
                            {["Buyer", "Seller"].map((role) => (
                                <button
                                    key={role}
                                    type="button"
                                    onClick={() => {
                                        // Toggle behavior: if already selected, deselect; otherwise select only this one
                                        const newRoles = dealRole.includes(role)
                                            ? dealRole.filter((r) => r !== role)
                                            : [role];
                                        onDealRoleChange?.(newRoles);
                                    }}
                                    className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                                        dealRole.includes(role)
                                            ? "bg-blue-600 text-white border-blue-600"
                                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                                    }`}
                                >
                                    {role}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Individual Deal Value */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-sm font-medium text-gray-700">
                                Individual Deal Value
                            </label>
                            <select
                                value={individualDealValueBasis}
                                onChange={(e) =>
                                    onIndividualDealValueChange?.(
                                        e.target.value,
                                        individualDealValueMin,
                                        individualDealValueMax
                                    )
                                }
                                className="w-16 rounded-md border border-gray-300 bg-white px-1.5 py-1 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option>Total</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <input
                                type="text"
                                value={individualDealValueMin}
                                onChange={(e) =>
                                    onIndividualDealValueChange?.(
                                        individualDealValueBasis,
                                        e.target.value,
                                        individualDealValueMax
                                    )
                                }
                                placeholder="$ Min"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <span className="text-gray-500 text-sm shrink-0">
                                –
                            </span>
                            <input
                                type="text"
                                value={individualDealValueMax}
                                onChange={(e) =>
                                    onIndividualDealValueChange?.(
                                        individualDealValueBasis,
                                        individualDealValueMin,
                                        e.target.value
                                    )
                                }
                                placeholder="$ Max"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <label className="flex items-center gap-2 mt-1.5">
                            <input
                                type="checkbox"
                                checked={includeUndisclosedSalePrice}
                                onChange={(e) =>
                                    onIncludeUndisclosedSalePriceChange?.(
                                        e.target.checked
                                    )
                                }
                                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">
                                Include Undisclosed Sale Price
                            </span>
                        </label>
                    </div>

                    {/* Individual Deal Size */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-sm font-medium text-gray-700">
                                Individual Deal Size
                            </label>
                            <select
                                value={individualDealSizeBasis}
                                onChange={(e) =>
                                    onIndividualDealSizeChange?.(
                                        e.target.value,
                                        individualDealSizeMin,
                                        individualDealSizeMax
                                    )
                                }
                                className="w-14 rounded-md border border-gray-300 bg-white px-1.5 py-1 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option>SF</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <input
                                type="text"
                                value={individualDealSizeMin}
                                onChange={(e) =>
                                    onIndividualDealSizeChange?.(
                                        individualDealSizeBasis,
                                        e.target.value,
                                        individualDealSizeMax
                                    )
                                }
                                placeholder="Min SF"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <span className="text-gray-500 text-sm shrink-0">
                                –
                            </span>
                            <input
                                type="text"
                                value={individualDealSizeMax}
                                onChange={(e) =>
                                    onIndividualDealSizeChange?.(
                                        individualDealSizeBasis,
                                        individualDealSizeMin,
                                        e.target.value
                                    )
                                }
                                placeholder="Max SF"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* CoStar Rating */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            CoStar Rating
                        </label>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() =>
                                        onSalesCompsCostarRatingChange?.(star)
                                    }
                                    className="text-gray-300 hover:text-yellow-400 transition-colors"
                                >
                                    {star <= salesCompsCostarRating ? (
                                        <svg
                                            className="w-5 h-5 text-yellow-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                            />
                                        </svg>
                                    )}
                                </button>
                            ))}
                            <button
                                type="button"
                                className="ml-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <Info className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Full Width Fields */}
            <div className="space-y-3">
                {/* Secondary Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Secondary Type
                    </label>
                    <select
                        value={salesCompsSecondaryType}
                        onChange={(e) =>
                            onSalesCompsSecondaryTypeChange?.(e.target.value)
                        }
                        className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="">Select</option>
                    </select>
                </div>

                {/* Sale Conditions */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Sale Conditions
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={saleConditions}
                            onChange={(e) =>
                                onSaleConditionsChange?.(e.target.value)
                            }
                            placeholder="Select"
                            className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>
        </div>
    );
}
