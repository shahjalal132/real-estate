import { Search, ChevronDown, Info } from "lucide-react";

interface BuildingFiltersProps {
    costarRating?: number;
    propertyType?: string;
    propertySize?: string;
    secondaryType?: string;
    property?: string;
    propertyId?: string;
    shoppingCenterType?: string;
    percentLeasedMin?: string;
    percentLeasedMax?: string;
    tenancy?: "single" | "multiple" | "";
    tenancyIncludeUnknown?: boolean;
    ownerOccupied?: "yes" | "no" | "";
    ownerOccupiedIncludeUnknown?: boolean;
    onCostarRatingChange?: (rating: number) => void;
    onPropertyTypeChange?: (value: string) => void;
    onPropertySizeChange?: (value: string) => void;
    onSecondaryTypeChange?: (value: string) => void;
    onPropertyChange?: (value: string) => void;
    onPropertyIdChange?: (value: string) => void;
    onShoppingCenterTypeChange?: (value: string) => void;
    onPercentLeasedChange?: (min: string, max: string) => void;
    onTenancyChange?: (value: "single" | "multiple" | "") => void;
    onTenancyIncludeUnknownChange?: (value: boolean) => void;
    onOwnerOccupiedChange?: (value: "yes" | "no" | "") => void;
    onOwnerOccupiedIncludeUnknownChange?: (value: boolean) => void;
}

// Star Rating Component
const StarRating = ({
    rating,
    onChange,
}: {
    rating: number;
    onChange?: (rating: number) => void;
}) => (
    <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
            <button
                key={star}
                type="button"
                onClick={() => onChange?.(star)}
                className={`w-4 h-4 ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                } transition-colors hover:text-yellow-400`}
            >
                <svg
                    className="w-full h-full"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            </button>
        ))}
    </div>
);

export default function BuildingFilters({
    costarRating = 0,
    propertyType = "",
    propertySize = "",
    secondaryType = "",
    property = "",
    propertyId = "",
    shoppingCenterType = "",
    percentLeasedMin = "",
    percentLeasedMax = "",
    tenancy = "",
    tenancyIncludeUnknown = false,
    ownerOccupied = "",
    ownerOccupiedIncludeUnknown = false,
    onCostarRatingChange,
    onPropertyTypeChange,
    onPropertySizeChange,
    onSecondaryTypeChange,
    onPropertyChange,
    onPropertyIdChange,
    onShoppingCenterTypeChange,
    onPercentLeasedChange,
    onTenancyChange,
    onTenancyIncludeUnknownChange,
    onOwnerOccupiedChange,
    onOwnerOccupiedIncludeUnknownChange,
}: BuildingFiltersProps) {
    return (
        <div className="space-y-3">
            {/* CoStar Rating */}
            <div>
                <div className="flex items-center gap-1 mb-1.5">
                    <label className="block text-sm font-medium text-gray-700">
                        CoStar Rating
                    </label>
                    <button className="text-blue-500 hover:text-blue-600">
                        <Info className="h-4 w-4" />
                    </button>
                </div>
                <StarRating
                    rating={costarRating}
                    onChange={onCostarRatingChange}
                />
            </div>

            {/* Property Type and Property Size - Two Columns */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {/* Property Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Property Type
                    </label>
                    <div className="relative">
                        <select
                            value={propertyType}
                            onChange={(e) =>
                                onPropertyTypeChange?.(e.target.value)
                            }
                            className="w-full appearance-none rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                        >
                            <option value="">Select</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Property Size */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Property Size
                    </label>
                    <div className="relative">
                        <select
                            value={propertySize}
                            onChange={(e) =>
                                onPropertySizeChange?.(e.target.value)
                            }
                            className="w-full appearance-none rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                        >
                            <option value="">Property Size</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Secondary Type */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Secondary Type
                </label>
                <div className="relative">
                    <select
                        value={secondaryType}
                        onChange={(e) =>
                            onSecondaryTypeChange?.(e.target.value)
                        }
                        className="w-full appearance-none rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                    >
                        <option value="">Select</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {/* Property */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Property
                </label>
                <div className="relative">
                    <input
                        type="text"
                        value={property}
                        onChange={(e) => onPropertyChange?.(e.target.value)}
                        placeholder="Address, Building Name or Shopping Center"
                        className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {/* Property ID */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Property ID
                </label>
                <input
                    type="text"
                    value={propertyId}
                    onChange={(e) => onPropertyIdChange?.(e.target.value)}
                    placeholder="Use comma to separate entries"
                    className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            {/* Shopping Center Type and % Leased - Top Row */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {/* Shopping Center Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Shopping Center Type
                    </label>
                    <div className="relative">
                        <select
                            value={shoppingCenterType}
                            onChange={(e) =>
                                onShoppingCenterTypeChange?.(e.target.value)
                            }
                            className="w-full appearance-none rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                        >
                            <option value="">Select</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* % Leased */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        % Leased
                    </label>
                    <div className="flex items-center gap-1.5">
                        <input
                            type="text"
                            value={percentLeasedMin}
                            onChange={(e) =>
                                onPercentLeasedChange?.(
                                    e.target.value,
                                    percentLeasedMax
                                )
                            }
                            placeholder="Min %"
                            className="min-w-32 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <span className="text-gray-500 text-sm shrink-0">
                            –
                        </span>
                        <input
                            type="text"
                            value={percentLeasedMax}
                            onChange={(e) =>
                                onPercentLeasedChange?.(
                                    percentLeasedMin,
                                    e.target.value
                                )
                            }
                            placeholder="Max %"
                            className="min-w-32 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Tenancy and Owner Occupied - Bottom Row */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {/* Tenancy */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Tenancy
                    </label>
                    <div className="inline-flex border border-gray-300 rounded-md overflow-hidden mb-1.5">
                        <button
                            type="button"
                            onClick={() => onTenancyChange?.("single")}
                            className={`px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                                tenancy === "single"
                                    ? "bg-gray-800 text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                            Single
                        </button>
                        <button
                            type="button"
                            onClick={() => onTenancyChange?.("multiple")}
                            className={`px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500 border-l border-gray-300 ${
                                tenancy === "multiple"
                                    ? "bg-gray-800 text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                            Multiple
                        </button>
                    </div>
                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={tenancyIncludeUnknown}
                                onChange={(e) =>
                                    onTenancyIncludeUnknownChange?.(
                                        e.target.checked
                                    )
                                }
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-500">
                                Include Unknown
                            </span>
                        </label>
                    </div>
                </div>

                {/* Owner Occupied */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Owner Occupied
                    </label>
                    <div className="inline-flex border border-gray-300 rounded-md overflow-hidden mb-1.5">
                        <button
                            type="button"
                            onClick={() => onOwnerOccupiedChange?.("yes")}
                            className={`px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                                ownerOccupied === "yes"
                                    ? "bg-gray-800 text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            onClick={() => onOwnerOccupiedChange?.("no")}
                            className={`px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500 border-l border-gray-300 ${
                                ownerOccupied === "no"
                                    ? "bg-gray-800 text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                            No
                        </button>
                    </div>
                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={ownerOccupiedIncludeUnknown}
                                onChange={(e) =>
                                    onOwnerOccupiedIncludeUnknownChange?.(
                                        e.target.checked
                                    )
                                }
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-500">
                                Include Unknown
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
