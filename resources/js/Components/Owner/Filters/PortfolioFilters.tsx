import { Info } from "lucide-react";

interface PortfolioFiltersProps {
    portfolioSizeMin?: string;
    portfolioSizeMax?: string;
    propertiesOwnedBasis?: string;
    propertiesOwnedMin?: string;
    propertiesOwnedMax?: string;
    propertyCriteria?: "1" | "2";
    propertyCriteriaValue?: string;
    portfolioPropertyType?: string;
    portfolioSecondaryType?: string;
    propertySizeBasis?: string;
    propertySizeMin?: string;
    propertySizeMax?: string;
    costarRating?: number;
    locationType?: string[];
    onPortfolioSizeChange?: (min: string, max: string) => void;
    onPropertiesOwnedChange?: (basis: string, min: string, max: string) => void;
    onPropertyCriteriaChange?: (criteria: "1" | "2", value: string) => void;
    onPortfolioPropertyTypeChange?: (value: string) => void;
    onPortfolioSecondaryTypeChange?: (value: string) => void;
    onPropertySizeChange?: (basis: string, min: string, max: string) => void;
    onCostarRatingChange?: (rating: number) => void;
    onLocationTypeChange?: (types: string[]) => void;
}

export default function PortfolioFilters({
    portfolioSizeMin = "",
    portfolioSizeMax = "",
    propertiesOwnedBasis = "# of Properties",
    propertiesOwnedMin = "",
    propertiesOwnedMax = "",
    portfolioPropertyType = "",
    portfolioSecondaryType = "",
    propertySizeBasis = "SF",
    propertySizeMin = "",
    propertySizeMax = "",
    costarRating = 0,
    locationType = [],
    onPortfolioSizeChange,
    onPropertiesOwnedChange,
    onPortfolioPropertyTypeChange,
    onPortfolioSecondaryTypeChange,
    onPropertySizeChange,
    onCostarRatingChange,
    onLocationTypeChange,
}: PortfolioFiltersProps) {
    return (
        <div className="space-y-3">
            {/* Two Column Grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {/* Left Column */}
                <div className="space-y-3">
                    {/* Portfolio Size */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Portfolio Size
                        </label>
                        <div className="flex items-center gap-1.5">
                            <input
                                type="text"
                                value={portfolioSizeMin}
                                onChange={(e) =>
                                    onPortfolioSizeChange?.(
                                        e.target.value,
                                        portfolioSizeMax
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
                                value={portfolioSizeMax}
                                onChange={(e) =>
                                    onPortfolioSizeChange?.(
                                        portfolioSizeMin,
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
                            value={portfolioPropertyType}
                            onChange={(e) =>
                                onPortfolioPropertyTypeChange?.(e.target.value)
                            }
                            className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="">Select</option>
                        </select>
                    </div>

                    {/* Property Size */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-sm font-medium text-gray-700">
                                Property Size
                            </label>
                            <select
                                value={propertySizeBasis}
                                onChange={(e) =>
                                    onPropertySizeChange?.(
                                        e.target.value,
                                        propertySizeMin,
                                        propertySizeMax
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
                                value={propertySizeMin}
                                onChange={(e) =>
                                    onPropertySizeChange?.(
                                        propertySizeBasis,
                                        e.target.value,
                                        propertySizeMax
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
                                value={propertySizeMax}
                                onChange={(e) =>
                                    onPropertySizeChange?.(
                                        propertySizeBasis,
                                        propertySizeMin,
                                        e.target.value
                                    )
                                }
                                placeholder="Max SF"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                    {/* Properties Owned */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-sm font-medium text-gray-700">
                                Properties Owned
                            </label>
                            <select
                                value={propertiesOwnedBasis}
                                onChange={(e) =>
                                    onPropertiesOwnedChange?.(
                                        e.target.value,
                                        propertiesOwnedMin,
                                        propertiesOwnedMax
                                    )
                                }
                                className="w-28 rounded-md border border-gray-300 bg-white px-1.5 py-1 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option># of Properties</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <input
                                type="text"
                                value={propertiesOwnedMin}
                                onChange={(e) =>
                                    onPropertiesOwnedChange?.(
                                        propertiesOwnedBasis,
                                        e.target.value,
                                        propertiesOwnedMax
                                    )
                                }
                                placeholder="Min Properties"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <span className="text-gray-500 text-sm shrink-0">
                                –
                            </span>
                            <input
                                type="text"
                                value={propertiesOwnedMax}
                                onChange={(e) =>
                                    onPropertiesOwnedChange?.(
                                        propertiesOwnedBasis,
                                        propertiesOwnedMin,
                                        e.target.value
                                    )
                                }
                                placeholder="Max Properties"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Secondary Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Secondary Type
                        </label>
                        <select
                            value={portfolioSecondaryType}
                            onChange={(e) =>
                                onPortfolioSecondaryTypeChange?.(e.target.value)
                            }
                            className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="">Select</option>
                        </select>
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
                                    onClick={() => onCostarRatingChange?.(star)}
                                    className="text-gray-300 hover:text-yellow-400 transition-colors"
                                >
                                    {star <= costarRating ? (
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

            {/* Location Type - Full Width Bottom Row */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Location Type
                </label>
                <div className="flex items-center gap-2">
                    {["CBD", "Urban", "Suburban"].map((type) => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => {
                                const newTypes = locationType.includes(type)
                                    ? locationType.filter((t) => t !== type)
                                    : [...locationType, type];
                                onLocationTypeChange?.(newTypes);
                            }}
                            className={`px-3 py-1.5 text-sm border rounded-md transition-colors ${
                                locationType.includes(type)
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
