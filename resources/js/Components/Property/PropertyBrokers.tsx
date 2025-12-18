import { Broker } from "@/types";

interface PropertyBrokersProps {
    brokers: Broker[];
}

// Get initials from full name
const getInitials = (name: string | null | undefined): string => {
    if (!name || typeof name !== "string") {
        return "NA";
    }
    const trimmed = name.trim();
    if (trimmed.length === 0) {
        return "NA";
    }
    const parts = trimmed.split(" ").filter((p) => p.length > 0);
    if (parts.length >= 2) {
        return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return trimmed.substring(0, 2).toUpperCase();
};

// Format phone number
const formatPhone = (phone: string | null): string => {
    if (!phone) return "";
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, "");
    // Format as XXX.XXX.XXXX if 10 digits
    if (cleaned.length === 10) {
        return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(
            6
        )}`;
    }
    return phone;
};

export default function PropertyBrokers({ brokers }: PropertyBrokersProps) {
    if (brokers.length === 0) {
        return null;
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center gap-4 my-4">
                <h3 className="text-lg font-semibold text-gray-900 bo">
                    Listing Contacts
                </h3>
                <button className="text-sm font-medium text-[#0066CC] hover:text-[#0052A3] transition-colors border border-gray-200 rounded-md px-4 py-2">
                    Submit LOI
                </button>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {brokers.map((broker) => {
                    const fullName =
                        broker.full_name ||
                        `${broker.first_name || ""} ${
                            broker.last_name || ""
                        }`.trim() ||
                        "Unknown";
                    const initials = getInitials(fullName);
                    const license =
                        broker.licenses && broker.licenses.length > 0
                            ? broker.licenses[0]
                            : null;
                    const formattedPhone = formatPhone(broker.phone);

                    return (
                        <div
                            key={broker.id}
                            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                            {/* Avatar and Name */}
                            <div className="flex items-start gap-3 mb-3">
                                {broker.thumbnail_url ? (
                                    <img
                                        src={broker.thumbnail_url}
                                        alt={fullName}
                                        className="h-12 w-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                                        <span className="text-sm font-semibold text-gray-700">
                                            {initials}
                                        </span>
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-[16px] font-semibold text-gray-900 mb-1">
                                        {fullName}
                                    </h4>
                                    {license && (
                                        <p className="text-[15px] font-normal text-gray-600">
                                            LIC: {license}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-1.5 mb-3">
                                {formattedPhone && (
                                    <p className="text-xs text-gray-700">
                                        {formattedPhone}
                                    </p>
                                )}
                                {broker.email && (
                                    <p className="text-xs text-gray-700">
                                        {broker.email}
                                    </p>
                                )}
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-200 my-3"></div>

                            {/* Action Links */}
                            <div className="flex items-center gap-4">
                                <button className="text-[15px] font-normal text-[#0066CC] hover:text-[#0052A3] transition-colors">
                                    Contact
                                </button>
                                <button className="text-[15px] font-normal text-[#0066CC] hover:text-[#0052A3] transition-colors">
                                    View Profile
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
