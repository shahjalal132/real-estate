import { Camera, Video, Globe, FileText } from "lucide-react";
import { Property } from "@/types";

interface PropertyQuickInfoProps {
    property: Property;
    formattedPrice: string;
    lotSizeAcres?: number | null;
}

export default function PropertyQuickInfo({
    property,
    formattedPrice,
    lotSizeAcres,
}: PropertyQuickInfoProps) {
    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Info</h3>
            <div className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                    <span className="text-gray-600 font-medium">Price</span>
                    <span className="font-bold text-gray-900 text-lg">
                        {formattedPrice}
                    </span>
                </div>

                {lotSizeAcres && (
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                        <span className="text-gray-600 font-medium">
                            Lot Size
                        </span>
                        <span className="font-bold text-gray-900">
                            {lotSizeAcres} acres
                        </span>
                    </div>
                )}

                {property.status && (
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                        <span className="text-gray-600 font-medium">
                            Status
                        </span>
                        <span className="font-bold text-gray-900">
                            {property.status}
                        </span>
                    </div>
                )}

                {property.number_of_images > 0 && (
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                        <span className="text-gray-600 font-medium flex items-center gap-2">
                            <Camera className="h-4 w-4" />
                            Photos
                        </span>
                        <span className="font-bold text-gray-900">
                            {property.number_of_images}
                        </span>
                    </div>
                )}

                <div className="space-y-3">
                    {property.has_video && (
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                            <Video className="h-5 w-5 text-green-600" />
                            <span className="text-sm font-medium text-gray-700">
                                Video Available
                            </span>
                        </div>
                    )}
                    {property.has_virtual_tour && (
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                            <Globe className="h-5 w-5 text-[#0066CC]" />
                            <span className="text-sm font-medium text-gray-700">
                                Virtual Tour Available
                            </span>
                        </div>
                    )}
                    {property.has_flyer && (
                        <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                            <FileText className="h-5 w-5 text-purple-600" />
                            <span className="text-sm font-medium text-gray-700">
                                Flyer Available
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
