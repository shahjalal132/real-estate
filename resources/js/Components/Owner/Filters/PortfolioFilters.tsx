import { useState } from "react";
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
    propertyCriteria = "1",
    propertyCriteriaValue = "",
    portfolioPropertyType = "",
    portfolioSecondaryType = "",
    propertySizeBasis = "SF",
    propertySizeMin = "",
    propertySizeMax = "",
    costarRating = 0,
    locationType = [],
    onPortfolioSizeChange,
    onPropertiesOwnedChange,
    onPropertyCriteriaChange,
    onPortfolioPropertyTypeChange,
    onPortfolioSecondaryTypeChange,
    onPropertySizeChange,
    onCostarRatingChange,
    onLocationTypeChange,
}: PortfolioFiltersProps) {
    return (
        <>
            {/* Portfolio Size */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Portfolio Size
                </label>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={portfolioSizeMin}
                        onChange={(e) =>
                            onPortfolioSizeChange?.(e.target.value, portfolioSizeMax)
                        }
                        placeholder="Min SF"
                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <span className="text-gray-500 text-sm">–</span>
                    <input
                        type="text"
                        value={portfolioSizeMax}
                        onChange={(e) =>
                            onPortfolioSizeChange?.(portfolioSizeMin, e.target.value)
                        }
                        placeholder="Max SF"
                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Properties Owned */}
            <div>
                <div className="flex items-center justify-between mb-2">
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
                        className="w-32 rounded-md border border-gray-300 bg-white px-2 py-1 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option># of Properties</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
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
                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <span className="text-gray-500 text-sm">–</span>
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
                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Property Criteria */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property meets the following criteria:
                </label>
                <div className="space-y-2">
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="propertyCriteria"
                            value="1"
                            checked={propertyCriteria === "1"}
                            onChange={(e) =>
                                onPropertyCriteriaChange?.(
                                    e.target.value as "1" | "2",
                                    propertyCriteriaValue
                                )
                            }
                            className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">
                            Minimum number of properties included in the portfolio:
                        </span>
                        <input
                            type="text"
                            value={propertyCriteriaValue}
                            onChange={(e) =>
                                onPropertyCriteriaChange?.(
                                    propertyCriteria,
                                    e.target.value
                                )
                            }
                            disabled={propertyCriteria !== "1"}
                            className="w-20 rounded-md border border-gray-300 bg-white px-2 py-1 text-sm disabled:bg-gray-100"
                        />
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="propertyCriteria"
                            value="2"
                            checked={propertyCriteria === "2"}
                            onChange={(e) =>
                                onPropertyCriteriaChange?.(
                                    e.target.value as "1" | "2",
                                    propertyCriteriaValue
                                )
                            }
                            className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">
                            % of properties included in the portfolio:
                        </span>
                        <input
                            type="text"
                            value={propertyCriteriaValue}
                            onChange={(e) =>
                                onPropertyCriteriaChange?.(
                                    propertyCriteria,
                                    e.target.value
                                )
                            }
                            disabled={propertyCriteria !== "2"}
                            className="w-20 rounded-md border border-gray-300 bg-white px-2 py-1 text-sm disabled:bg-gray-100"
                        />
                    </label>
                </div>
            </div>

            {/* Property Type */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                </label>
                <select
                    value={portfolioPropertyType}
                    onChange={(e) => onPortfolioPropertyTypeChange?.(e.target.value)}
                    disabled
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
                >
                    <option value="">Select</option>
                </select>
            </div>

            {/* Secondary Type */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Type
                </label>
                <select
                    value={portfolioSecondaryType}
                    onChange={(e) => onPortfolioSecondaryTypeChange?.(e.target.value)}
                    disabled
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
                >
                    <option value="">Select</option>
                </select>
            </div>

            {/* Property Size */}
            <div>
                <div className="flex items-center justify-between mb-2">
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
                        className="w-16 rounded-md border border-gray-300 bg-white px-2 py-1 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option>SF</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
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
                        disabled
                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm disabled:bg-gray-100"
                    />
                    <span className="text-gray-500 text-sm">–</span>
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
                        disabled
                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm disabled:bg-gray-100"
                    />
                </div>
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
                            onClick={() => onCostarRatingChange?.(star)}
                            className={`text-gray-300 hover:text-yellow-400 transition-colors ${
                                star <= costarRating ? "text-yellow-400" : ""
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

            {/* Location Type */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location Type
                </label>
                <div className="flex items-center gap-2">
                    {["CBD", "Urban", "Suburban"].map((type) => (
                        <button
                            key={type}
                            onClick={() => {
                                const newTypes = locationType.includes(type)
                                    ? locationType.filter((t) => t !== type)
                                    : [...locationType, type];
                                onLocationTypeChange?.(newTypes);
                            }}
                            disabled
                            className={`px-4 py-2 text-sm border rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
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
        </>
    );
}

