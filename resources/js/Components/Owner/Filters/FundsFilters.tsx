import { Search, ChevronDown, Info } from "lucide-react";
import StatusSelector from "../StatusSelector";
import PropertyFocusSelector from "../PropertyFocusSelector";
import StrategySelector from "../StrategySelector";
import CountryFocusSelector from "../CountryFocusSelector";

interface FundsFiltersProps {
    fundName?: string;
    fundStatus?: string[];
    fundPropertyFocus?: string[];
    fundStrategy?: string[];
    fundStructure?: string;
    fundCountryFocus?: string[];
    fundSizeMin?: string;
    fundSizeMax?: string;
    dryPowderMin?: string;
    dryPowderMax?: string;
    aumMin?: string;
    aumMax?: string;
    launchDate?: string;
    finalCloseDate?: string;
    vintageMin?: string;
    vintageMax?: string;
    monthsInMarketMin?: string;
    monthsInMarketMax?: string;
    lifespanMin?: string;
    lifespanMax?: string;
    targetIrrGrossMin?: string;
    targetIrrGrossMax?: string;
    targetIrrNetMin?: string;
    targetIrrNetMax?: string;
    fundManagerLocation?: string;
    onFundNameChange?: (value: string) => void;
    onFundStatusChange?: (values: string[]) => void;
    onFundPropertyFocusChange?: (values: string[]) => void;
    onFundStrategyChange?: (values: string[]) => void;
    onFundStructureChange?: (value: string) => void;
    onFundCountryFocusChange?: (values: string[]) => void;
    onFundSizeChange?: (min: string, max: string) => void;
    onDryPowderChange?: (min: string, max: string) => void;
    onAumChange?: (min: string, max: string) => void;
    onLaunchDateChange?: (value: string) => void;
    onFinalCloseDateChange?: (value: string) => void;
    onVintageChange?: (min: string, max: string) => void;
    onMonthsInMarketChange?: (min: string, max: string) => void;
    onLifespanChange?: (min: string, max: string) => void;
    onTargetIrrGrossChange?: (min: string, max: string) => void;
    onTargetIrrNetChange?: (min: string, max: string) => void;
    onFundManagerLocationChange?: (value: string) => void;
}

export default function FundsFilters({
    fundName = "",
    fundStatus = [],
    fundPropertyFocus = [],
    fundStrategy = [],
    fundStructure = "",
    fundCountryFocus = [],
    fundSizeMin = "",
    fundSizeMax = "",
    dryPowderMin = "",
    dryPowderMax = "",
    aumMin = "",
    aumMax = "",
    launchDate = "",
    finalCloseDate = "",
    vintageMin = "",
    vintageMax = "",
    monthsInMarketMin = "",
    monthsInMarketMax = "",
    lifespanMin = "",
    lifespanMax = "",
    targetIrrGrossMin = "",
    targetIrrGrossMax = "",
    targetIrrNetMin = "",
    targetIrrNetMax = "",
    fundManagerLocation = "",
    onFundNameChange,
    onFundStatusChange,
    onFundPropertyFocusChange,
    onFundStrategyChange,
    onFundStructureChange,
    onFundCountryFocusChange,
    onFundSizeChange,
    onDryPowderChange,
    onAumChange,
    onLaunchDateChange,
    onFinalCloseDateChange,
    onVintageChange,
    onMonthsInMarketChange,
    onLifespanChange,
    onTargetIrrGrossChange,
    onTargetIrrNetChange,
    onFundManagerLocationChange,
}: FundsFiltersProps) {
    return (
        <div className="space-y-3">
            {/* Name - Full Width */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                </label>
                <div className="relative">
                    <input
                        type="text"
                        value={fundName}
                        onChange={(e) => onFundNameChange?.(e.target.value)}
                        placeholder="Fund or Owner Name"
                        className="w-full rounded-md border border-gray-300 bg-white px-10 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            {/* Status and Property Focus - Two Columns */}
            <div className="grid grid-cols-2 gap-4">
                {/* Status */}
                <div>
                    <div className="flex items-center gap-1 mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Status
                        </label>
                        <button
                            type="button"
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <Info className="h-4 w-4" />
                        </button>
                    </div>
                    <StatusSelector
                        selectedStatuses={fundStatus}
                        onChange={(values) => onFundStatusChange?.(values)}
                    />
                </div>

                {/* Property Focus */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Property Focus
                    </label>
                    <PropertyFocusSelector
                        selectedTypes={fundPropertyFocus}
                        onChange={(values) =>
                            onFundPropertyFocusChange?.(values)
                        }
                    />
                </div>
            </div>

            {/* Strategy and Structure - Two Columns */}
            <div className="grid grid-cols-2 gap-4">
                {/* Strategy */}
                <div>
                    <div className="flex items-center gap-1 mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Strategy
                        </label>
                        <button
                            type="button"
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <Info className="h-4 w-4" />
                        </button>
                    </div>
                    <StrategySelector
                        selectedStrategies={fundStrategy}
                        onChange={(values) => onFundStrategyChange?.(values)}
                    />
                </div>

                {/* Structure */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Structure
                    </label>
                    <select
                        value={fundStructure}
                        onChange={(e) =>
                            onFundStructureChange?.(e.target.value)
                        }
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="">Select</option>
                    </select>
                </div>
            </div>

            {/* Country Focus - Full Width */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country Focus
                </label>
                <CountryFocusSelector
                    selectedCountries={fundCountryFocus}
                    onChange={(values) => onFundCountryFocusChange?.(values)}
                />
            </div>

            {/* Range Inputs - Two Columns */}
            <div className="grid grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-3">
                    {/* Fund Size */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Fund Size
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={fundSizeMin}
                                onChange={(e) =>
                                    onFundSizeChange?.(
                                        e.target.value,
                                        fundSizeMax
                                    )
                                }
                                placeholder="$ Min"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <span className="text-gray-500 text-sm shrink-0">
                                –
                            </span>
                            <input
                                type="text"
                                value={fundSizeMax}
                                onChange={(e) =>
                                    onFundSizeChange?.(
                                        fundSizeMin,
                                        e.target.value
                                    )
                                }
                                placeholder="$ Max"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* AUM */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            AUM
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={aumMin}
                                onChange={(e) =>
                                    onAumChange?.(e.target.value, aumMax)
                                }
                                placeholder="$ Min"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <span className="text-gray-500 text-sm shrink-0">
                                –
                            </span>
                            <input
                                type="text"
                                value={aumMax}
                                onChange={(e) =>
                                    onAumChange?.(aumMin, e.target.value)
                                }
                                placeholder="$ Max"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Final Close Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Final Close Date
                        </label>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => onFinalCloseDateChange?.("")}
                                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-left focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                Select Date
                            </button>
                            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Months In Market */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Months In Market
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={monthsInMarketMin}
                                onChange={(e) =>
                                    onMonthsInMarketChange?.(
                                        e.target.value,
                                        monthsInMarketMax
                                    )
                                }
                                placeholder="Min"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <span className="text-gray-500 text-sm shrink-0">
                                –
                            </span>
                            <input
                                type="text"
                                value={monthsInMarketMax}
                                onChange={(e) =>
                                    onMonthsInMarketChange?.(
                                        monthsInMarketMin,
                                        e.target.value
                                    )
                                }
                                placeholder="Max"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Target IRR - Gross */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Target IRR - Gross
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={targetIrrGrossMin}
                                onChange={(e) =>
                                    onTargetIrrGrossChange?.(
                                        e.target.value,
                                        targetIrrGrossMax
                                    )
                                }
                                placeholder="Min %"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <span className="text-gray-500 text-sm shrink-0">
                                –
                            </span>
                            <input
                                type="text"
                                value={targetIrrGrossMax}
                                onChange={(e) =>
                                    onTargetIrrGrossChange?.(
                                        targetIrrGrossMin,
                                        e.target.value
                                    )
                                }
                                placeholder="Max %"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                    {/* Dry Powder */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Dry Powder
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={dryPowderMin}
                                onChange={(e) =>
                                    onDryPowderChange?.(
                                        e.target.value,
                                        dryPowderMax
                                    )
                                }
                                placeholder="$ Min"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <span className="text-gray-500 text-sm shrink-0">
                                –
                            </span>
                            <input
                                type="text"
                                value={dryPowderMax}
                                onChange={(e) =>
                                    onDryPowderChange?.(
                                        dryPowderMin,
                                        e.target.value
                                    )
                                }
                                placeholder="$ Max"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Launch Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Launch Date
                        </label>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => onLaunchDateChange?.("")}
                                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-left focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                Select Date
                            </button>
                            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Vintage */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Vintage
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={vintageMin}
                                onChange={(e) =>
                                    onVintageChange?.(
                                        e.target.value,
                                        vintageMax
                                    )
                                }
                                placeholder="Min Year"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <span className="text-gray-500 text-sm shrink-0">
                                –
                            </span>
                            <input
                                type="text"
                                value={vintageMax}
                                onChange={(e) =>
                                    onVintageChange?.(
                                        vintageMin,
                                        e.target.value
                                    )
                                }
                                placeholder="Max Year"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Lifespan */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Lifespan
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={lifespanMin}
                                onChange={(e) =>
                                    onLifespanChange?.(
                                        e.target.value,
                                        lifespanMax
                                    )
                                }
                                placeholder="Min Years"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <span className="text-gray-500 text-sm shrink-0">
                                –
                            </span>
                            <input
                                type="text"
                                value={lifespanMax}
                                onChange={(e) =>
                                    onLifespanChange?.(
                                        lifespanMin,
                                        e.target.value
                                    )
                                }
                                placeholder="Max Years"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Target IRR - Net */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Target IRR - Net
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={targetIrrNetMin}
                                onChange={(e) =>
                                    onTargetIrrNetChange?.(
                                        e.target.value,
                                        targetIrrNetMax
                                    )
                                }
                                placeholder="Min %"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <span className="text-gray-500 text-sm shrink-0">
                                –
                            </span>
                            <input
                                type="text"
                                value={targetIrrNetMax}
                                onChange={(e) =>
                                    onTargetIrrNetChange?.(
                                        targetIrrNetMin,
                                        e.target.value
                                    )
                                }
                                placeholder="Max %"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
