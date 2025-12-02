import { MapPin } from "lucide-react";

interface PropertyLocationMapProps {
    mapUrl: string | null;
    fullAddress: string;
}

export default function PropertyLocationMap({
    mapUrl,
    fullAddress,
}: PropertyLocationMapProps) {
    if (!mapUrl) {
        return null;
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-[#0066CC]" />
                    Location
                </h2>
                <p className="text-gray-600 mt-2">{fullAddress}</p>
            </div>
            <div className="w-full h-[500px] relative">
                <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={mapUrl}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Property Location"
                    className="w-full h-full"
                />
            </div>
        </div>
    );
}
