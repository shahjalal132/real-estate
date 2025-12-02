import { MapPin, Share2, Heart } from "lucide-react";
import { Property } from "../../../types";

interface PropertyHeaderProps {
    property: Property;
    fullAddress: string;
    formattedPrice: string;
}

export default function PropertyHeader({
    property,
    fullAddress,
    formattedPrice,
}: PropertyHeaderProps) {
    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
            <div className="flex flex-col gap-6">
                {/* Property Types and Status */}
                <div className="flex flex-wrap items-center gap-3">
                    {property.types?.map((type, index) => (
                        <span
                            key={index}
                            className="inline-flex rounded-full bg-[#0066CC]/10 text-[#0066CC] px-4 py-1.5 text-sm font-semibold"
                        >
                            {type}
                        </span>
                    ))}
                    {property.status && (
                        <span
                            className={`inline-flex rounded-full px-4 py-1.5 text-sm font-semibold ${
                                property.status === "Sold"
                                    ? "bg-red-100 text-red-800"
                                    : property.status === "On-Market"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                            }`}
                        >
                            {property.status}
                        </span>
                    )}
                </div>

                {/* Property Title */}
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        {property.name}
                    </h1>
                    <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-5 w-5 shrink-0" />
                        <span className="text-lg">{fullAddress}</span>
                    </div>
                </div>

                {/* Price and Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-gray-200">
                    <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                            Asking Price
                        </p>
                        <div className="text-4xl sm:text-5xl font-bold text-[#0066CC]">
                            {formattedPrice}
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button
                            className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold text-gray-700 transition-colors"
                            aria-label="Share property"
                        >
                            <Share2 className="w-5 h-5" />
                            Share
                        </button>
                        <button
                            className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold text-gray-700 transition-colors"
                            aria-label="Save property"
                        >
                            <Heart className="w-5 h-5" />
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
