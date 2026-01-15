import {
    Building,
    Globe,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Trophy,
    User,
    Award,
} from "lucide-react";

interface Broker {
    id: number;
    name: string;
    thumbnail_url?: string;
    company: string;
    title: string;
    specialty?: string;
    property_type_focus?: string;
    phone?: string;
    email?: string;
    linkedin?: string;
    website?: string;
    building_name?: string;
    address?: string; // Fallback if composite address not available
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
    brokerage_logo_url?: string;
}

interface BrokerSidebarCardProps {
    broker: Broker;
    className?: string;
}

export default function BrokerSidebarCard({
    broker,
    className = "",
}: BrokerSidebarCardProps) {
    return (
        <div
            className={`bg-white border border-gray-200 rounded-lg shadow-sm p-6 sticky top-6 ${className}`}
        >
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                {/* Profile Image */}
                <div className="shrink-0 mx-auto sm:mx-0">
                    <div className="aspect-[3/4] w-24 h-32 bg-gray-200 rounded-md overflow-hidden relative">
                        {broker.thumbnail_url ? (
                            <img
                                src={broker.thumbnail_url}
                                alt={broker.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                    const parent =
                                        e.currentTarget.parentElement;
                                    if (parent) {
                                        parent.classList.add(
                                            "flex",
                                            "items-center",
                                            "justify-center"
                                        );
                                        const icon = parent.querySelector(
                                            ".fallback-icon"
                                        ) as HTMLElement;
                                        if (icon) icon.style.display = "block";
                                    }
                                }}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                <User className="h-10 w-10" />
                            </div>
                        )}
                        <User className="fallback-icon h-10 w-10 text-gray-400 hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                </div>

                {/* Name & Title & Company */}
                <div className="text-center sm:text-left">
                    <h2 className="text-lg font-bold text-gray-900 leading-tight">
                        {broker.name}
                    </h2>
                    <div className="text-sm text-gray-600 mt-1 mb-2">
                        {broker.title}
                    </div>

                    <div className="text-sm">
                        <div className="font-semibold text-blue-600 mb-1">
                            {broker.company}
                        </div>
                        <div className="text-gray-500 space-y-0.5 text-xs">
                            {broker.building_name && (
                                <div>{broker.building_name} </div>
                            )}
                            {broker.address && <div>{broker.address} </div>}
                            <div>
                                {[broker.city, broker.state, broker.postal_code]
                                    .filter(Boolean)
                                    .join(", ")}
                            </div>
                            {broker.country && <div>{broker.country} </div>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
                {broker.phone && (
                    <div className="flex items-center gap-2 text-gray-900">
                        <Phone className="h-4 w-4 text-gray-400 shrink-0" />
                        <span className="font-medium"> {broker.phone} </span>
                    </div>
                )}

                {broker.email && (
                    <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400 shrink-0" />
                        <a
                            href={`mailto:${broker.email}`}
                            className="text-blue-600 hover:underline truncate font-medium"
                        >
                            {broker.email}
                        </a>
                    </div>
                )}

                {broker.linkedin && (
                    <div className="flex items-center gap-2">
                        <Linkedin className="h-4 w-4 text-gray-400 shrink-0" />
                        <a
                            href={broker.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline truncate font-medium"
                        >
                            {broker.name}
                        </a>
                    </div>
                )}

                {broker.website && (
                    <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-gray-400 shrink-0" />
                        <a
                            href={broker.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline truncate font-medium"
                        >
                            {broker.company
                                .replace(/https?:\/\/(www\.)?/, "")
                                .split("/")[0] || "Website"}
                        </a>
                    </div>
                )}

                <div className="flex items-center gap-2 pt-2">
                    <Trophy className="h-4 w-4 text-yellow-500 shrink-0" />
                    <span className="font-medium text-gray-700">
                        {" "}
                        Power Broker{" "}
                    </span>
                </div>
            </div>
        </div>
    );
}
