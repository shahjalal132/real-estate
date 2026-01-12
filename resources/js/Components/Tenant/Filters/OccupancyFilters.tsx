import { Search, ChevronDown, Info } from "lucide-react";

interface OccupancyFiltersProps {
    numLocationsMin?: string;
    numLocationsMax?: string;
    sizeOccupied?: string;
    inFollowingLocation?: string;
    headquartersLocation?: string;
    spaceUse?: string;
    leaseExpirations?: string;
    transactionActivity?: string;
    onNumLocationsChange?: (min: string, max: string) => void;
    onSizeOccupiedChange?: (value: string) => void;
    onInFollowingLocationChange?: (value: string) => void;
    onHeadquartersLocationChange?: (value: string) => void;
    onSpaceUseChange?: (value: string) => void;
    onLeaseExpirationsChange?: (value: string) => void;
    onTransactionActivityChange?: (value: string) => void;
}

export default function OccupancyFilters({
    numLocationsMin = "",
    numLocationsMax = "",
    sizeOccupied = "",
    inFollowingLocation = "",
    headquartersLocation = "",
    spaceUse = "",
    leaseExpirations = "",
    transactionActivity = "",
    onNumLocationsChange,
    onSizeOccupiedChange,
    onInFollowingLocationChange,
    onHeadquartersLocationChange,
    onSpaceUseChange,
    onLeaseExpirationsChange,
    onTransactionActivityChange,
}: OccupancyFiltersProps) {
    return (
        <div className="space-y-3">
            {/* Number of Locations and Size Occupied - Two Columns */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {/* Number of Locations */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Number of Locations
                    </label>
                    <div className="flex items-center gap-1.5">
                        <input
                            type="text"
                            value={numLocationsMin}
                            onChange={(e) =>
                                onNumLocationsChange?.(
                                    e.target.value,
                                    numLocationsMax
                                )
                            }
                            placeholder="Min"
                            className="min-w-32 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <span className="text-gray-500 text-sm shrink-0">
                            –
                        </span>
                        <input
                            type="text"
                            value={numLocationsMax}
                            onChange={(e) =>
                                onNumLocationsChange?.(
                                    numLocationsMin,
                                    e.target.value
                                )
                            }
                            placeholder="Max"
                            className="min-w-32 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Size Occupied */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Size Occupied
                    </label>
                    <div className="relative">
                        <select
                            value={sizeOccupied}
                            onChange={(e) =>
                                onSizeOccupiedChange?.(e.target.value)
                            }
                            className="w-full appearance-none rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                        >
                            <option value="">Select</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* in the following location */}
            <div>
                <div className="flex items-center gap-1 mb-1.5">
                    <label className="block text-sm font-medium text-gray-700">
                        in the following location
                    </label>
                    <button
                        type="button"
                        className="text-blue-500 hover:text-blue-600"
                    >
                        <Info className="h-4 w-4" />
                    </button>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        value={inFollowingLocation}
                        onChange={(e) =>
                            onInFollowingLocationChange?.(e.target.value)
                        }
                        placeholder="Market or Country"
                        className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {/* Headquarters Location */}
            <div>
                <div className="flex items-center gap-1 mb-1.5">
                    <label className="block text-sm font-medium text-gray-700">
                        Headquarters Location
                    </label>
                    <button
                        type="button"
                        className="text-blue-500 hover:text-blue-600"
                    >
                        <Info className="h-4 w-4" />
                    </button>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        value={headquartersLocation}
                        onChange={(e) =>
                            onHeadquartersLocationChange?.(e.target.value)
                        }
                        placeholder="Market, City, Postal Code or Country"
                        className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {/* Search companies with locations that meet the following criteria */}
            <div>
                <p className="text-sm font-medium text-gray-700 mb-3">
                    Search companies with locations that meet the following
                    criteria:
                </p>

                <div className="space-y-3">
                    {/* Space Use */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Space Use
                        </label>
                        <div className="relative">
                            <select
                                value={spaceUse}
                                onChange={(e) =>
                                    onSpaceUseChange?.(e.target.value)
                                }
                                className="w-full appearance-none rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                            >
                                <option value="">Select</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Lease Expirations */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Lease Expirations
                        </label>
                        <div className="relative">
                            <select
                                value={leaseExpirations}
                                onChange={(e) =>
                                    onLeaseExpirationsChange?.(e.target.value)
                                }
                                className="w-full appearance-none rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                            >
                                <option value="">Select</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Transaction Activity */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Transaction Activity
                        </label>
                        <div className="relative">
                            <select
                                value={transactionActivity}
                                onChange={(e) =>
                                    onTransactionActivityChange?.(e.target.value)
                                }
                                className="w-full appearance-none rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                            >
                                <option value="">Select</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

