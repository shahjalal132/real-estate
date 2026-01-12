import { Search, ChevronDown } from "lucide-react";

interface ContactsFiltersProps {
    tenantContact?: string;
    landlord?: string;
    propertyManager?: string;
    tenantRepresentative?: string;
    leasingRepresentative?: string;
    ownerType?: string;
    onTenantContactChange?: (value: string) => void;
    onLandlordChange?: (value: string) => void;
    onPropertyManagerChange?: (value: string) => void;
    onTenantRepresentativeChange?: (value: string) => void;
    onLeasingRepresentativeChange?: (value: string) => void;
    onOwnerTypeChange?: (value: string) => void;
}

export default function ContactsFilters({
    tenantContact = "",
    landlord = "",
    propertyManager = "",
    tenantRepresentative = "",
    leasingRepresentative = "",
    ownerType = "",
    onTenantContactChange,
    onLandlordChange,
    onPropertyManagerChange,
    onTenantRepresentativeChange,
    onLeasingRepresentativeChange,
    onOwnerTypeChange,
}: ContactsFiltersProps) {
    return (
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            {/* Left Column */}
            <div className="space-y-3">
                {/* Tenant Contact */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Tenant Contact
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={tenantContact}
                            onChange={(e) =>
                                onTenantContactChange?.(e.target.value)
                            }
                            placeholder="Contact Name"
                            className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Landlord */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Landlord
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={landlord}
                            onChange={(e) => onLandlordChange?.(e.target.value)}
                            placeholder="Company or Contact Name"
                            className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Property Manager */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Property Manager
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={propertyManager}
                            onChange={(e) =>
                                onPropertyManagerChange?.(e.target.value)
                            }
                            placeholder="Company or Contact Name"
                            className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="space-y-3">
                {/* Tenant Representative */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Tenant Representative
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={tenantRepresentative}
                            onChange={(e) =>
                                onTenantRepresentativeChange?.(e.target.value)
                            }
                            placeholder="Company or Contact Name"
                            className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Leasing Representative */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Leasing Representative
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={leasingRepresentative}
                            onChange={(e) =>
                                onLeasingRepresentativeChange?.(e.target.value)
                            }
                            placeholder="Company or Contact Name"
                            className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Owner Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Owner Type
                    </label>
                    <div className="relative">
                        <select
                            value={ownerType}
                            onChange={(e) => onOwnerTypeChange?.(e.target.value)}
                            className="w-full appearance-none rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                        >
                            <option value="">Select</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>
        </div>
    );
}

