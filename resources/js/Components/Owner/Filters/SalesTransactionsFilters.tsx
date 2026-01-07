import { Info } from "lucide-react";

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
    onNumSalesTransactionsChange?: (value: string) => void;
    onSoldWithinChange?: (value: string) => void;
    onDealRoleChange?: (roles: string[]) => void;
    onTotalDealValueChange?: (min: string, max: string) => void;
    onIndividualDealValueChange?: (basis: string, min: string, max: string) => void;
    onIncludeUndisclosedSalePriceChange?: (value: boolean) => void;
    onTotalDealSizeChange?: (basis: string, min: string, max: string) => void;
    onIndividualDealSizeChange?: (basis: string, min: string, max: string) => void;
    onSalesCompsPropertyTypeChange?: (value: string) => void;
    onSalesCompsCostarRatingChange?: (rating: number) => void;
    onSalesCompsSecondaryTypeChange?: (value: string) => void;
}

export default function SalesTransactionsFilters({
    numSalesTransactions = "",
    soldWithin = "",
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
    onNumSalesTransactionsChange,
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
}: SalesTransactionsFiltersProps) {
    return (
        <>
            {/* Number of Sales Transactions */}
            <div>
                <div className="flex items-center gap-1 mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Minimum number of sales transactions completed:
                    </label>
                    <span className="text-red-500">*</span>
                </div>
                <input
                    type="text"
                    value={numSalesTransactions}
                    onChange={(e) => onNumSalesTransactionsChange?.(e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            {/* Sold Within */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sold Within
                </label>
                <button
                    disabled
                    onClick={() => onSoldWithinChange?.("")}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-left disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                    Select Date
                </button>
            </div>

            {/* Deal Role */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deal Role
                </label>
                <div className="flex items-center gap-2">
                    {["Buyer", "Seller"].map((role) => (
                        <button
                            key={role}
                            onClick={() => {
                                const newRoles = dealRole.includes(role)
                                    ? dealRole.filter((r) => r !== role)
                                    : [...dealRole, role];
                                onDealRoleChange?.(newRoles);
                            }}
                            disabled
                            className={`px-3 py-1.5 text-sm rounded-md border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                                dealRole.includes(role)
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-gray-700 border-gray-300"
                            }`}
                        >
                            {role}
                        </button>
                    ))}
                </div>
            </div>

            {/* Total Deal Value */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Deal Value
                </label>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={totalDealValueMin}
                        onChange={(e) =>
                            onTotalDealValueChange?.(e.target.value, totalDealValueMax)
                        }
                        placeholder="$ Min"
                        disabled
                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm disabled:bg-gray-100"
                    />
                    <span className="text-gray-500 text-sm">–</span>
                    <input
                        type="text"
                        value={totalDealValueMax}
                        onChange={(e) =>
                            onTotalDealValueChange?.(totalDealValueMin, e.target.value)
                        }
                        placeholder="$ Max"
                        disabled
                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm disabled:bg-gray-100"
                    />
                </div>
            </div>

            {/* Individual Deal Value */}
            <div>
                <div className="flex items-center justify-between mb-2">
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
                        className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option>Total</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
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
                        disabled
                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm disabled:bg-gray-100"
                    />
                    <span className="text-gray-500 text-sm">–</span>
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
                        disabled
                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm disabled:bg-gray-100"
                    />
                </div>
                <label className="flex items-center gap-2 mt-2">
                    <input
                        type="checkbox"
                        checked={includeUndisclosedSalePrice}
                        onChange={(e) =>
                            onIncludeUndisclosedSalePriceChange?.(e.target.checked)
                        }
                        disabled
                        className="h-4 w-4 text-blue-600 disabled:opacity-50"
                    />
                    <span className="text-sm text-gray-700">
                        Include Undisclosed Sale Price
                    </span>
                </label>
            </div>

            {/* Total Deal Size */}
            <div>
                <div className="flex items-center justify-between mb-2">
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
                        className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option>SF</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
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
                        disabled
                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm disabled:bg-gray-100"
                    />
                    <span className="text-gray-500 text-sm">–</span>
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
                        disabled
                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm disabled:bg-gray-100"
                    />
                </div>
            </div>

            {/* Individual Deal Size */}
            <div>
                <div className="flex items-center justify-between mb-2">
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
                        className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option>SF</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
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
                        disabled
                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm disabled:bg-gray-100"
                    />
                    <span className="text-gray-500 text-sm">–</span>
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
                        disabled
                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm disabled:bg-gray-100"
                    />
                </div>
            </div>

            {/* Property Type */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                </label>
                <select
                    value={salesCompsPropertyType}
                    onChange={(e) => onSalesCompsPropertyTypeChange?.(e.target.value)}
                    disabled
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
                >
                    <option value="">Select</option>
                </select>
            </div>

            {/* CoStar Rating */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    CoStar Rating
                </label>
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => onSalesCompsCostarRatingChange?.(star)}
                            className={`text-gray-300 hover:text-yellow-400 transition-colors ${
                                star <= salesCompsCostarRating ? "text-yellow-400" : ""
                            }`}
                        >
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </button>
                    ))}
                    <button className="ml-2 text-gray-400 hover:text-gray-600">
                        <Info className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Secondary Type */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Type
                </label>
                <select
                    value={salesCompsSecondaryType}
                    onChange={(e) => onSalesCompsSecondaryTypeChange?.(e.target.value)}
                    disabled
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
                >
                    <option value="">Select</option>
                </select>
            </div>
        </>
    );
}

