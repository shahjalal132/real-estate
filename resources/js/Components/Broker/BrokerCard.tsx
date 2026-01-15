import {
    Building,
    Globe,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Trophy,
    User,
} from "lucide-react";

interface DirectoryContact {
    id: number;
    name: string;
    company: string;
    title: string;
    specialty: string;
    property_type_focus: string;
    phone: string;
    email: string;
    linkedin: string;
    building_name: string;
    address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    website: string;
}

interface BrokerCardProps {
    broker: DirectoryContact;
}

export default function BrokerCard({ broker }: BrokerCardProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex gap-4 h-full shadow-sm hover:shadow-md transition-shadow">
            {/* Left Column: Image and Badge */}
            <div className="flex flex-col gap-2 shrink-0 w-24">
                <div className="w-24 h-32 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
                    <img
                        src="/assets/images/broker.jpeg"
                        alt={broker.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            // Fallback if image fails to load
                            e.currentTarget.style.display = "none";
                            e.currentTarget.parentElement?.classList.add(
                                "flex",
                                "items-center",
                                "justify-center"
                            );
                        }}
                    />
                    {/* Fallback Icon (hidden by default if image loads) */}
                    <User className="h-12 w-12 text-gray-400 hidden" />
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-yellow-600">
                    <Trophy className="h-3 w-3 fill-current" />
                    <span>Power Broker </span>
                </div>
            </div>

            {/* Right Column: Details */}
            <div className="flex flex-col gap-1 min-w-0 flex-1">
                <h3 className="text-base font-bold text-gray-900 leading-tight">
                    {" "}
                    {broker.name}{" "}
                </h3>
                <p className="text-xs text-gray-600 font-medium">
                    {" "}
                    {broker.title}{" "}
                </p>
                <p className="text-xs text-gray-800 font-semibold mt-1">
                    {" "}
                    {broker.company}{" "}
                </p>

                {/* Address */}
                <div className="text-xs text-gray-600 mt-1">
                    {broker.address && <p>{broker.address} </p>}
                    <p>
                        {[broker.city, broker.state, broker.postal_code]
                            .filter(Boolean)
                            .join(", ")}
                    </p>
                    {broker.country && <p>{broker.country} </p>}
                </div>

                {/* Contact Links */}
                <div className="flex flex-col gap-1 mt-3">
                    {broker.phone && (
                        <div className="flex items-center gap-2 text-xs text-gray-700">
                            <Phone className="h-3 w-3 shrink-0" />
                            <span> {broker.phone} </span>
                        </div>
                    )}
                    {broker.email && (
                        <div className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-800">
                            <Mail className="h-3 w-3 shrink-0" />
                            <a
                                href={`mailto:${broker.email}`}
                                className="hover:underline truncate"
                                title={broker.email}
                            >
                                {broker.email}
                            </a>
                        </div>
                    )}
                    {broker.linkedin && (
                        <div className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-800">
                            <Linkedin className="h-3 w-3 shrink-0" />
                            <a
                                href={
                                    broker.linkedin.startsWith("http")
                                        ? broker.linkedin
                                        : `https://${broker.linkedin}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline truncate"
                            >
                                {broker.name}
                            </a>
                        </div>
                    )}
                    {broker.website && (
                        <div className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-800">
                            <Globe className="h-3 w-3 shrink-0" />
                            <a
                                href={
                                    broker.website.startsWith("http")
                                        ? broker.website
                                        : `https://${broker.website}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline truncate"
                            >
                                {broker.company}
                            </a>
                        </div>
                    )}
                </div>

                {/* Specialty */}
                {broker.specialty && (
                    <p className="text-xs text-gray-600 mt-2">
                        {broker.specialty}
                    </p>
                )}
            </div>
        </div>
    );
}
