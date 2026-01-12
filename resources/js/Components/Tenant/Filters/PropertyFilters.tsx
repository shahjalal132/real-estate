import { ChevronDown, Info } from "lucide-react";

interface PropertyFiltersProps {
    propertyType?: string;
    locationType?: string;
    costarRating?: number;
    onPropertyTypeChange?: (value: string) => void;
    onLocationTypeChange?: (value: string) => void;
    onCostarRatingChange?: (rating: number) => void;
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

export default function PropertyFilters({
    propertyType = "",
    locationType = "",
    costarRating = 0,
    onPropertyTypeChange,
    onLocationTypeChange,
    onCostarRatingChange,
}: PropertyFiltersProps) {
    return (
        <div className="space-y-3">
            {/* Property Type */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Property Type
                </label>
                <div className="relative">
                    <select
                        value={propertyType}
                        onChange={(e) => onPropertyTypeChange?.(e.target.value)}
                        className="w-full appearance-none rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                    >
                        <option value="">Select</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {/* Location Type */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Location Type
                </label>
                <div className="flex items-center gap-2">
                    {["CBD", "Urban", "Suburban"].map((type) => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => onLocationTypeChange?.(type)}
                            className={`px-4 py-2 text-sm border rounded-md transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                                locationType === type
                                    ? "border-blue-600 bg-blue-50 text-blue-700"
                                    : "border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* CoStar Rating */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    CoStar Rating
                </label>
                <div className="flex items-center gap-2">
                    <StarRating
                        rating={costarRating}
                        onChange={onCostarRatingChange}
                    />
                    <button
                        type="button"
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <Info className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}

