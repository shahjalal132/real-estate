import { useState } from "react";
import { MapPin, Loader2 } from "lucide-react";

interface PropertyLocationMapProps {
    mapUrl: string | null;
    fullAddress: string;
}

export default function PropertyLocationMap({
    mapUrl,
    fullAddress,
}: PropertyLocationMapProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    if (!mapUrl) {
        return null;
    }

    const handleLoad = () => {
        setIsLoading(false);
    };

    const handleError = () => {
        setIsLoading(false);
        setHasError(true);
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-[#0066CC]" />
                    Location
                </h2>
                <p className="text-gray-600 mt-2">{fullAddress}</p>
            </div>
            <div className="w-full h-[500px] relative print-section bg-gray-100">
                {/* Loading State */}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                        <div className="flex flex-col items-center gap-3">
                            <Loader2 className="w-8 h-8 text-[#0066CC] animate-spin" />
                            <p className="text-sm text-gray-600">
                                Loading map...
                            </p>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {hasError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                        <div className="flex flex-col items-center gap-3">
                            <MapPin className="w-8 h-8 text-gray-400" />
                            <p className="text-sm text-gray-600">
                                Unable to load map
                            </p>
                        </div>
                    </div>
                )}

                <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={mapUrl}
                    allowFullScreen
                    loading="eager"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Property Location"
                    className="w-full h-full"
                    data-print-keep
                    onLoad={handleLoad}
                    onError={handleError}
                />
            </div>
        </div>
    );
}
