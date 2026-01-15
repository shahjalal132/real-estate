import { Linkedin, Mail, Phone, Trophy, User } from "lucide-react";

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
    thumbnail_url?: string;
}

interface BrokerCardProps {
    broker: DirectoryContact;
}

export default function BrokerCard({ broker }: BrokerCardProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow h-full w-full max-w-sm">
            {/* Image Section */}
            <div className="w-full aspect-square bg-gray-100 rounded-md overflow-hidden relative">
                <img
                    src={broker.thumbnail_url || "/assets/images/broker.jpeg"}
                    alt={broker.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement
                            ?.querySelector(".fallback-icon")
                            ?.classList.remove("hidden");
                    }}
                />
                <User className="fallback-icon h-16 w-16 text-gray-400 hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>

            {/* Details Section */}
            <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-gray-900 leading-tight">
                    {broker.name}
                </h3>
                <p className="text-sm text-gray-700">{broker.title}</p>

                <a
                    href="#"
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline mt-0.5 inline-block"
                >
                    {broker.company}
                </a>

                {/* Address */}
                <div className="text-sm text-gray-700 mt-1 leading-snug">
                    <p>{broker.address || "125 Park Ave"} </p>
                    <p>
                        {[
                            broker.city || "New York",
                            broker.state || "NY",
                            broker.postal_code || "10017",
                        ]
                            .filter(Boolean)
                            .join(", ")}
                    </p>
                    <p> {broker.country || "United States"} </p>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-2 mt-3">
                    {/* Phone */}
                    <div className="flex items-center gap-2 text-gray-900">
                        <Phone className="h-4 w-4 shrink-0 text-gray-900" />
                        <span className="text-sm">
                            {broker.phone || "(212) 372-2000"}
                        </span>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 shrink-0 text-gray-900" />
                        <a
                            href={`mailto:${broker.email}`}
                            className="text-sm text-blue-600 hover:text-blue-800 hover:underline truncate"
                        >
                            {broker.email}
                        </a>
                    </div>

                    {/* LinkedIn */}
                    {(broker.linkedin || true) && (
                        <div className="flex items-center gap-2">
                            <Linkedin className="h-4 w-4 shrink-0 text-gray-900" />
                            <a
                                href={broker.linkedin || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:text-blue-800 hover:underline truncate"
                            >
                                LinkedIn Profile
                            </a>
                        </div>
                    )}

                    {/* Website */}
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4 shrink-0 text-gray-900" />
                        <a
                            href={broker.website || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800 hover:underline truncate"
                        >
                            Broker Profile
                        </a>
                    </div>

                    {/* VCard Download */}
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4 shrink-0 text-gray-900" />
                        <a
                            href="#"
                            className="text-sm text-blue-600 hover:text-blue-800 hover:underline truncate"
                        >
                            Download VCard
                        </a>
                    </div>
                </div>

                {/* Award */}
                <div className="flex items-center gap-2 text-gray-900 mt-3 pt-3 border-t border-gray-100">
                    <Trophy className="h-4 w-4 shrink-0 text-yellow-500" />
                    <span className="text-sm font-medium"> Power Broker </span>
                </div>
            </div>
        </div>
    );
}
