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
            {/* Header: stacked on small/medium, row on large */}
            <div className="flex flex-col gap-3 my-4 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
                <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
                    Listing Contacts
                </h3>
                <button
                    type="button"
                    className="w-full sm:w-auto text-sm font-medium text-[#0066CC] hover:text-[#0052A3] transition-colors border border-gray-200 rounded-lg px-4 py-2.5 lg:shrink-0"
                >
                    Submit LOI
                </button>
            </div>

            {/* Cards Grid: 1 col mobile, 2 sm, 3 md, 4 lg */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
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
                            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow min-w-0"
                        >
                            {/* Avatar and Name */}
                            <div className="flex items-start gap-3 mb-3">
                                {broker.thumbnail_url ? (
                                    <img
                                        src={broker.thumbnail_url}
                                        alt={fullName}
                                        className="h-12 w-12 rounded-full object-cover shrink-0"
                                    />
                                ) : (
                                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                                        <span className="text-sm font-semibold text-gray-700">
                                            {initials}
                                        </span>
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-semibold text-gray-900 mb-1 break-words sm:text-base">
                                        {fullName}
                                    </h4>
                                    {license && (
                                        <p className="text-xs font-normal text-gray-600 sm:text-sm">
                                            LIC: {license}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-1.5 mb-3">
                                {formattedPhone && (
                                    <p className="text-xs text-gray-700 truncate" title={formattedPhone}>
                                        {formattedPhone}
                                    </p>
                                )}
                                {broker.email && (
                                    <p className="text-xs text-gray-700 truncate" title={broker.email}>
                                        {broker.email}
                                    </p>
                                )}
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-200 my-3" />

                            {/* Action Links */}
                            <div className="flex flex-wrap items-center gap-3">
                                <button
                                    type="button"
                                    className="text-sm font-medium text-[#0066CC] hover:text-[#0052A3] transition-colors sm:text-[15px]"
                                >
                                    Contact
                                </button>
                                <button
                                    type="button"
                                    className="text-sm font-medium text-[#0066CC] hover:text-[#0052A3] transition-colors sm:text-[15px]"
                                >
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
