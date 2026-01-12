import { Search, ChevronDown } from "lucide-react";

interface LocationContactsFiltersProps {
    tenantName?: string;
    hqLocation?: string;
    contactsByRole?: string;
    onTenantNameChange?: (value: string) => void;
    onHqLocationChange?: (value: string) => void;
    onContactsByRoleChange?: (value: string) => void;
}

export default function LocationContactsFilters({
    tenantName = "",
    hqLocation = "",
    contactsByRole = "",
    onTenantNameChange,
    onHqLocationChange,
    onContactsByRoleChange,
}: LocationContactsFiltersProps) {
    return (
        <div className="space-y-3">
            {/* Tenant Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Tenant Name
                </label>
                <div className="relative">
                    <input
                        type="text"
                        value={tenantName}
                        onChange={(e) => onTenantNameChange?.(e.target.value)}
                        placeholder="Tenant Name or Ticker"
                        className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {/* HQ Location */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    HQ Location
                </label>
                <div className="relative">
                    <input
                        type="text"
                        value={hqLocation}
                        onChange={(e) => onHqLocationChange?.(e.target.value)}
                        placeholder="City, State or Country"
                        className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {/* Contacts by Role */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Contacts by Role
                </label>
                <div className="relative">
                    <select
                        value={contactsByRole}
                        onChange={(e) =>
                            onContactsByRoleChange?.(e.target.value)
                        }
                        className="w-full appearance-none rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                    >
                        <option value="">Select</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
            </div>
        </div>
    );
}
