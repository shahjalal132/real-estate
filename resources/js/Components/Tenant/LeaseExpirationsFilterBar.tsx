import { useState } from "react";
import { Search } from "lucide-react";
import TenantSortSelector from "./TenantSortSelector";
import SizeOccupiedSelector from "./SizeOccupiedSelector";
import SpaceUseSelector from "./SpaceUseSelector";
import ExpiresAfterFilter from "./ExpiresAfterFilter";

interface LeaseExpirationsFilterBarProps {
    addressSearch?: string;
    onAddressSearchChange?: (value: string) => void;
    minSizeLeased?: number | null;
    maxSizeLeased?: number | null;
    onSizeLeasedChange?: (min: number | null, max: number | null) => void;
    spaceUse?: string[];
    onSpaceUseChange?: (value: string[]) => void;
    expiresWithinLast?: string;
    onExpiresWithinLastChange?: (value: string) => void;
    expiresAfterStartDate?: string;
    onExpiresAfterStartDateChange?: (value: string) => void;
    expiresAfterEndDate?: string;
    onExpiresAfterEndDateChange?: (value: string) => void;
    tenantName?: string;
    onTenantNameChange?: (value: string) => void;
    expirationCount?: number;
    sortBy?: string;
    sortDir?: "asc" | "desc";
    onSortChange?: (sortBy: string, sortDir: "asc" | "desc") => void;
}

export default function LeaseExpirationsFilterBar({
    addressSearch = "",
    onAddressSearchChange,
    minSizeLeased,
    maxSizeLeased,
    onSizeLeasedChange,
    spaceUse = [],
    onSpaceUseChange,
    expiresWithinLast = "",
    onExpiresWithinLastChange,
    expiresAfterStartDate = "",
    onExpiresAfterStartDateChange,
    expiresAfterEndDate = "",
    onExpiresAfterEndDateChange,
    tenantName = "",
    onTenantNameChange,
    expirationCount = 0,
    sortBy,
    sortDir,
    onSortChange,
}: LeaseExpirationsFilterBarProps) {
    const [localAddressSearch, setLocalAddressSearch] = useState(addressSearch);

    const handleAddressSearchChange = (value: string) => {
        setLocalAddressSearch(value);
        onAddressSearchChange?.(value);
    };

    return (
        <div className="bg-white border-b border-gray-200 py-4">
            <div className="flex items-center justify-between gap-4">
                {/* Left Group: Filter Inputs */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Address or Location Input */}
                    <div className="relative w-64 shrink-0">
                        <input
                            type="text"
                            value={localAddressSearch}
                            onChange={(e) =>
                                handleAddressSearchChange(e.target.value)
                            }
                            placeholder="Address or Location"
                            className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>

                    {/* Size Leased Selector */}
                    <SizeOccupiedSelector
                        minValue={minSizeLeased ?? null}
                        maxValue={maxSizeLeased ?? null}
                        onChange={(min, max) => {
                            onSizeLeasedChange?.(min, max);
                        }}
                        label="Size Leased"
                    />

                    {/* Space Use Dropdown */}
                    <SpaceUseSelector
                        spaceUse={spaceUse}
                        onSpaceUseChange={(value) => onSpaceUseChange?.(value)}
                    />

                    {/* Expires After Filter */}
                    <ExpiresAfterFilter
                        expiresWithinLast={expiresWithinLast}
                        onExpiresWithinLastChange={onExpiresWithinLastChange}
                        expiresAfterStartDate={expiresAfterStartDate}
                        onExpiresAfterStartDateChange={
                            onExpiresAfterStartDateChange
                        }
                        expiresAfterEndDate={expiresAfterEndDate}
                        onExpiresAfterEndDateChange={
                            onExpiresAfterEndDateChange
                        }
                    />

                    {/* Tenant Name Input */}
                    <div className="relative shrink-0">
                        <input
                            type="text"
                            value={tenantName}
                            onChange={(e) =>
                                onTenantNameChange?.(e.target.value)
                            }
                            placeholder="Tenant Name"
                            className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 min-w-[140px]"
                        />
                    </div>
                </div>

                {/* Right Group: Expiration Count and Sort */}
                <div className="flex items-center gap-4 shrink-0">
                    {/* Expiration Count */}
                    <div className="text-sm font-medium text-gray-700 whitespace-nowrap">
                        {expirationCount.toLocaleString()} Lease Expirations
                    </div>

                    {/* Sort Selector */}
                    <TenantSortSelector
                        sortBy={sortBy}
                        sortDir={sortDir}
                        onSortChange={(sortBy, sortDir) => {
                            onSortChange?.(sortBy, sortDir);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
