import { Info } from "lucide-react";

interface SalesListingsFiltersProps {
    numListingsMin?: string;
    numListingsMax?: string;
    totalAreaForSaleBasis?: string;
    totalAreaForSaleMin?: string;
    totalAreaForSaleMax?: string;
    totalAskingPriceMin?: string;
    totalAskingPriceMax?: string;
    individualAskingPriceBasis?: string;
    individualAskingPriceMin?: string;
    individualAskingPriceMax?: string;
    includeUndisclosedAskingPrice?: boolean;
    salesListingsPropertyType?: string;
    salesListingsCostarRating?: number;
    salesListingsSecondaryType?: string;
    onNumListingsChange?: (min: string, max: string) => void;
    onTotalAreaForSaleChange?: (basis: string, min: string, max: string) => void;
    onTotalAskingPriceChange?: (min: string, max: string) => void;
    onIndividualAskingPriceChange?: (basis: string, min: string, max: string) => void;
    onIncludeUndisclosedAskingPriceChange?: (value: boolean) => void;
    onSalesListingsPropertyTypeChange?: (value: string) => void;
    onSalesListingsCostarRatingChange?: (rating: number) => void;
    onSalesListingsSecondaryTypeChange?: (value: string) => void;
}

export default function SalesListingsFilters({
    numListingsMin = "",
    numListingsMax = "",
    totalAreaForSaleBasis = "SF",
    totalAreaForSaleMin = "",
    totalAreaForSaleMax = "",
    totalAskingPriceMin = "",
    totalAskingPriceMax = "",
    individualAskingPriceBasis = "Total",
    individualAskingPriceMin = "",
    individualAskingPriceMax = "",
    includeUndisclosedAskingPrice = false,
    salesListingsPropertyType = "",
    salesListingsCostarRating = 0,
    salesListingsSecondaryType = "",
    onNumListingsChange,
    onTotalAreaForSaleChange,
    onTotalAskingPriceChange,
    onIndividualAskingPriceChange,
    onIncludeUndisclosedAskingPriceChange,
    onSalesListingsPropertyTypeChange,
    onSalesListingsCostarRatingChange,
    onSalesListingsSecondaryTypeChange,
}: SalesListingsFiltersProps) {
    return (
        <>
            {/* Number of Listings */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Listings
                </label>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={numListingsMin}
                        onChange={(e) =>
                            onNumListingsChange?.(e.target.value, numListingsMax)
                        }
                        placeholder="Min"
                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <span className="text-gray-500 text-sm">–</span>
                    <input
                        type="text"
                        value={numListingsMax}
                        onChange={(e) =>
                            onNumListingsChange?.(numListingsMin, e.target.value)
                        }
                        placeholder="Max"
                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Total Area for Sale */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Total Area for Sale
                    </label>
                    <select
                        value={totalAreaForSaleBasis}
                        onChange={(e) =>
                            onTotalAreaForSaleChange?.(
                                e.target.value,
                                totalAreaForSaleMin,
                                totalAreaForSaleMax
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
                        value={totalAreaForSaleMin}
                        onChange={(e) =>
                            onTotalAreaForSaleChange?.(
                                totalAreaForSaleBasis,
                                e.target.value,
                                totalAreaForSaleMax
                            )
                        }
                        placeholder="Min SF"
                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <span className="text-gray-500 text-sm">–</span>
                    <input
                        type="text"
                        value={totalAreaForSaleMax}
                        onChange={(e) =>
                            onTotalAreaForSaleChange?.(
                                totalAreaForSaleBasis,
                                totalAreaForSaleMin,
                                e.target.value
                            )
                        }
                        placeholder="Max SF"
                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Total Asking Price */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Asking Price - All Buildings
                </label>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={totalAskingPriceMin}
                        onChange={(e) =>
                            onTotalAskingPriceChange?.(e.target.value, totalAskingPriceMax)
                        }
                        placeholder="$ Min"
                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <span className="text-gray-500 text-sm">–</span>
                    <input
                        type="text"
                        value={totalAskingPriceMax}
                        onChange={(e) =>
                            onTotalAskingPriceChange?.(totalAskingPriceMin, e.target.value)
                        }
                        placeholder="$ Max"
                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Individual Asking Price */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Individual Asking Price
                    </label>
                    <select
                        value={individualAskingPriceBasis}
                        onChange={(e) =>
                            onIndividualAskingPriceChange?.(
                                e.target.value,
                                individualAskingPriceMin,
                                individualAskingPriceMax
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
                        value={individualAskingPriceMin}
                        onChange={(e) =>
                            onIndividualAskingPriceChange?.(
                                individualAskingPriceBasis,
                                e.target.value,
                                individualAskingPriceMax
                            )
                        }
                        placeholder="$ Min"
                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <span className="text-gray-500 text-sm">–</span>
                    <input
                        type="text"
                        value={individualAskingPriceMax}
                        onChange={(e) =>
                            onIndividualAskingPriceChange?.(
                                individualAskingPriceBasis,
                                individualAskingPriceMin,
                                e.target.value
                            )
                        }
                        placeholder="$ Max"
                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <label className="flex items-center gap-2 mt-2">
                    <input
                        type="checkbox"
                        checked={includeUndisclosedAskingPrice}
                        onChange={(e) =>
                            onIncludeUndisclosedAskingPriceChange?.(e.target.checked)
                        }
                        className="h-4 w-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">
                        Include Undisclosed Sale Price
                    </span>
                </label>
            </div>

            {/* Property Type */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                </label>
                <select
                    value={salesListingsPropertyType}
                    onChange={(e) => onSalesListingsPropertyTypeChange?.(e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                            onClick={() => onSalesListingsCostarRatingChange?.(star)}
                            className={`text-gray-300 hover:text-yellow-400 transition-colors ${
                                star <= salesListingsCostarRating ? "text-yellow-400" : ""
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
                    value={salesListingsSecondaryType}
                    onChange={(e) => onSalesListingsSecondaryTypeChange?.(e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                    <option value="">Select</option>
                </select>
            </div>
        </>
    );
}

