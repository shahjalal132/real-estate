import { ChevronDown, Calendar, Info } from "lucide-react";

interface SpaceFiltersProps {
    spaceUse?: string;
    sizeOccupied?: string;
    occupancyType?: string;
    movedIn?: string;
    expiration?: string;
    includeMonthToMonth?: boolean;
    retailStoreType?: string;
    breakDate?: string;
    reviewDate?: string;
    rentalRateMin?: string;
    rentalRateMax?: string;
    rentalRateUnit?: string;
    includeStartingRentOnly?: boolean;
    services?: string;
    employeesAtLocationMin?: string;
    employeesAtLocationMax?: string;
    areaPerEmployeeMin?: string;
    areaPerEmployeeMax?: string;
    headquartersOnly?: boolean;
    tenantInsights?: string;
    futureMove?: string;
    futureMoveType?: string;
    onSpaceUseChange?: (value: string) => void;
    onSizeOccupiedChange?: (value: string) => void;
    onOccupancyTypeChange?: (value: string) => void;
    onMovedInChange?: (value: string) => void;
    onExpirationChange?: (value: string) => void;
    onIncludeMonthToMonthChange?: (value: boolean) => void;
    onRetailStoreTypeChange?: (value: string) => void;
    onBreakDateChange?: (value: string) => void;
    onReviewDateChange?: (value: string) => void;
    onRentalRateChange?: (min: string, max: string) => void;
    onRentalRateUnitChange?: (value: string) => void;
    onIncludeStartingRentOnlyChange?: (value: boolean) => void;
    onServicesChange?: (value: string) => void;
    onEmployeesAtLocationChange?: (min: string, max: string) => void;
    onAreaPerEmployeeChange?: (min: string, max: string) => void;
    onHeadquartersOnlyChange?: (value: boolean) => void;
    onTenantInsightsChange?: (value: string) => void;
    onFutureMoveChange?: (value: string) => void;
    onFutureMoveTypeChange?: (value: string) => void;
}

export default function SpaceFilters({
    spaceUse = "",
    sizeOccupied = "",
    occupancyType = "",
    movedIn = "",
    expiration = "",
    includeMonthToMonth = false,
    retailStoreType = "",
    breakDate = "",
    reviewDate = "",
    rentalRateMin = "",
    rentalRateMax = "",
    rentalRateUnit = "SF/Yr",
    includeStartingRentOnly = false,
    services = "",
    employeesAtLocationMin = "",
    employeesAtLocationMax = "",
    areaPerEmployeeMin = "",
    areaPerEmployeeMax = "",
    headquartersOnly = false,
    tenantInsights = "",
    futureMove = "",
    futureMoveType = "",
    onSpaceUseChange,
    onSizeOccupiedChange,
    onOccupancyTypeChange,
    onMovedInChange,
    onExpirationChange,
    onIncludeMonthToMonthChange,
    onRetailStoreTypeChange,
    onBreakDateChange,
    onReviewDateChange,
    onRentalRateChange,
    onRentalRateUnitChange,
    onIncludeStartingRentOnlyChange,
    onServicesChange,
    onEmployeesAtLocationChange,
    onAreaPerEmployeeChange,
    onHeadquartersOnlyChange,
    onTenantInsightsChange,
    onFutureMoveChange,
    onFutureMoveTypeChange,
}: SpaceFiltersProps) {
    return (
        <div className="space-y-3">
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {/* Left Column */}
                <div className="space-y-3">
                    {/* Space Use */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Space Use
                        </label>
                        <div className="relative">
                            <select
                                value={spaceUse}
                                onChange={(e) => onSpaceUseChange?.(e.target.value)}
                                className="w-full appearance-none rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                            >
                                <option value="">Select</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Occupancy Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Occupancy Type
                        </label>
                        <div className="relative">
                            <select
                                value={occupancyType}
                                onChange={(e) => onOccupancyTypeChange?.(e.target.value)}
                                className="w-full appearance-none rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                            >
                                <option value="">Select</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Expiration */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Expiration
                        </label>
                        <button
                            type="button"
                            onClick={() => {
                                // TODO: Open date picker
                            }}
                            className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm text-left focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 flex items-center justify-between"
                        >
                            <span className={expiration ? "text-gray-700" : "text-gray-400"}>
                                {expiration || "Select Date"}
                            </span>
                            <Calendar className="h-4 w-4 text-gray-400" />
                        </button>
                        <div className="mt-1.5">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={includeMonthToMonth}
                                    onChange={(e) =>
                                        onIncludeMonthToMonthChange?.(e.target.checked)
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">
                                    Include Month to Month Lease
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Break Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Break Date
                        </label>
                        <button
                            type="button"
                            onClick={() => {
                                // TODO: Open date picker
                            }}
                            className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm text-left focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 flex items-center justify-between"
                        >
                            <span className={breakDate ? "text-gray-700" : "text-gray-400"}>
                                {breakDate || "Select Date"}
                            </span>
                            <Calendar className="h-4 w-4 text-gray-400" />
                        </button>
                    </div>

                    {/* Rental Rate */}
                    <div>
                        <div className="flex items-center gap-1 mb-1.5">
                            <label className="block text-sm font-medium text-gray-700">
                                Rental Rate
                            </label>
                            <button className="text-blue-500 hover:text-blue-600">
                                <Info className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="flex items-center gap-1.5 mb-1.5">
                            <input
                                type="text"
                                value={rentalRateMin}
                                onChange={(e) =>
                                    onRentalRateChange?.(e.target.value, rentalRateMax)
                                }
                                placeholder="$ Min"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <span className="text-gray-500 text-sm shrink-0">–</span>
                            <input
                                type="text"
                                value={rentalRateMax}
                                onChange={(e) =>
                                    onRentalRateChange?.(rentalRateMin, e.target.value)
                                }
                                placeholder="$ Max"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <select
                                value={rentalRateUnit}
                                onChange={(e) => onRentalRateUnitChange?.(e.target.value)}
                                className="w-20 rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="SF/Yr">SF/Yr</option>
                                <option value="SF/Mo">SF/Mo</option>
                            </select>
                        </div>
                        <div>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={includeStartingRentOnly}
                                    onChange={(e) =>
                                        onIncludeStartingRentOnlyChange?.(e.target.checked)
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">
                                    Include Starting Rent Only
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Employees At Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Employees At Location
                        </label>
                        <div className="flex items-center gap-1.5">
                            <input
                                type="text"
                                value={employeesAtLocationMin}
                                onChange={(e) =>
                                    onEmployeesAtLocationChange?.(
                                        e.target.value,
                                        employeesAtLocationMax
                                    )
                                }
                                placeholder="Min"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <span className="text-gray-500 text-sm shrink-0">–</span>
                            <input
                                type="text"
                                value={employeesAtLocationMax}
                                onChange={(e) =>
                                    onEmployeesAtLocationChange?.(
                                        employeesAtLocationMin,
                                        e.target.value
                                    )
                                }
                                placeholder="Max"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Headquarters Only */}
                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={headquartersOnly}
                                onChange={(e) => onHeadquartersOnlyChange?.(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                                Headquarters Only
                            </span>
                        </label>
                    </div>

                    {/* Future Move */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Future Move
                        </label>
                        <button
                            type="button"
                            onClick={() => {
                                // TODO: Open date picker
                            }}
                            className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm text-left focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 flex items-center justify-between"
                        >
                            <span className={futureMove ? "text-gray-700" : "text-gray-400"}>
                                {futureMove || "Select Date"}
                            </span>
                            <Calendar className="h-4 w-4 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                    {/* Size Occupied */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Size Occupied
                        </label>
                        <div className="relative">
                            <select
                                value={sizeOccupied}
                                onChange={(e) => onSizeOccupiedChange?.(e.target.value)}
                                className="w-full appearance-none rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                            >
                                <option value="">Select</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Moved In */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Moved In
                        </label>
                        <button
                            type="button"
                            onClick={() => {
                                // TODO: Open date picker
                            }}
                            className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm text-left focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 flex items-center justify-between"
                        >
                            <span className={movedIn ? "text-gray-700" : "text-gray-400"}>
                                {movedIn || "Select Date"}
                            </span>
                            <Calendar className="h-4 w-4 text-gray-400" />
                        </button>
                    </div>

                    {/* Retail Store Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Retail Store Type
                        </label>
                        <div className="relative">
                            <select
                                value={retailStoreType}
                                onChange={(e) => onRetailStoreTypeChange?.(e.target.value)}
                                className="w-full appearance-none rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                            >
                                <option value="">Select</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Review Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Review Date
                        </label>
                        <button
                            type="button"
                            onClick={() => {
                                // TODO: Open date picker
                            }}
                            className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm text-left focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 flex items-center justify-between"
                        >
                            <span className={reviewDate ? "text-gray-700" : "text-gray-400"}>
                                {reviewDate || "Select Date"}
                            </span>
                            <Calendar className="h-4 w-4 text-gray-400" />
                        </button>
                    </div>

                    {/* Services */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Services
                        </label>
                        <div className="relative">
                            <select
                                value={services}
                                onChange={(e) => onServicesChange?.(e.target.value)}
                                className="w-full appearance-none rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                            >
                                <option value="">Select</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Area/Employee At Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Area/Employee At Location
                        </label>
                        <div className="flex items-center gap-1.5">
                            <input
                                type="text"
                                value={areaPerEmployeeMin}
                                onChange={(e) =>
                                    onAreaPerEmployeeChange?.(
                                        e.target.value,
                                        areaPerEmployeeMax
                                    )
                                }
                                placeholder="Min SF"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <span className="text-gray-500 text-sm shrink-0">–</span>
                            <input
                                type="text"
                                value={areaPerEmployeeMax}
                                onChange={(e) =>
                                    onAreaPerEmployeeChange?.(
                                        areaPerEmployeeMin,
                                        e.target.value
                                    )
                                }
                                placeholder="Max SF"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Tenant Insights */}
                    <div>
                        <div className="flex items-center gap-1 mb-1.5">
                            <label className="block text-sm font-medium text-gray-700">
                                Tenant Insights
                            </label>
                            <button className="text-blue-500 hover:text-blue-600">
                                <Info className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="relative">
                            <select
                                value={tenantInsights}
                                onChange={(e) => onTenantInsightsChange?.(e.target.value)}
                                className="w-full appearance-none rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                            >
                                <option value="">Select</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Future Move Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Future Move Type
                        </label>
                        <div className="relative">
                            <select
                                value={futureMoveType}
                                onChange={(e) => onFutureMoveTypeChange?.(e.target.value)}
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

