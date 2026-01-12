import { Search, ChevronDown, Info } from "lucide-react";

interface TenantFiltersProps {
    tenantName?: string;
    totalEmployeesMin?: string;
    totalEmployeesMax?: string;
    creditRating?: string;
    creditRatingIncludeUnknown?: boolean;
    companyGrowth?: string;
    revenue?: string;
    revenueIncludeUnknown?: boolean;
    retailersOnly?: boolean;
    industryClassification?: "industry-type" | "naics-code" | "sic-code";
    industryValue?: string;
    territory?: string;
    keywordSearch?: string;
    keywordMatch?: "all" | "any";
    onTenantNameChange?: (value: string) => void;
    onTotalEmployeesChange?: (min: string, max: string) => void;
    onCreditRatingChange?: (value: string) => void;
    onCreditRatingIncludeUnknownChange?: (value: boolean) => void;
    onCompanyGrowthChange?: (value: string) => void;
    onRevenueChange?: (value: string) => void;
    onRevenueIncludeUnknownChange?: (value: boolean) => void;
    onRetailersOnlyChange?: (value: boolean) => void;
    onIndustryClassificationChange?: (
        value: "industry-type" | "naics-code" | "sic-code"
    ) => void;
    onIndustryValueChange?: (value: string) => void;
    onTerritoryChange?: (value: string) => void;
    onKeywordSearchChange?: (value: string) => void;
    onKeywordMatchChange?: (value: "all" | "any") => void;
}

export default function TenantFilters({
    tenantName = "",
    totalEmployeesMin = "",
    totalEmployeesMax = "",
    creditRating = "",
    creditRatingIncludeUnknown = false,
    companyGrowth = "",
    revenue = "",
    revenueIncludeUnknown = false,
    retailersOnly = false,
    industryClassification = "industry-type",
    industryValue = "",
    territory = "",
    keywordSearch = "",
    keywordMatch = "all",
    onTenantNameChange,
    onTotalEmployeesChange,
    onCreditRatingChange,
    onCreditRatingIncludeUnknownChange,
    onCompanyGrowthChange,
    onRevenueChange,
    onRevenueIncludeUnknownChange,
    onRetailersOnlyChange,
    onIndustryClassificationChange,
    onIndustryValueChange,
    onTerritoryChange,
    onKeywordSearchChange,
    onKeywordMatchChange,
}: TenantFiltersProps) {
    return (
        <div className="space-y-3">
            {/* Tenant Search - Full Width */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Tenant
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

            {/* Two Column Grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {/* Left Column */}
                <div className="space-y-3">
                    {/* Total Employees */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Total Employees
                        </label>
                        <div className="flex items-center gap-1.5">
                            <input
                                type="text"
                                value={totalEmployeesMin}
                                onChange={(e) =>
                                    onTotalEmployeesChange?.(
                                        e.target.value,
                                        totalEmployeesMax
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
                                value={totalEmployeesMax}
                                onChange={(e) =>
                                    onTotalEmployeesChange?.(
                                        totalEmployeesMin,
                                        e.target.value
                                    )
                                }
                                placeholder="Max"
                                className="min-w-32 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Credit Rating */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Credit Rating
                        </label>
                        <div className="relative mb-1.5">
                            <select
                                value={creditRating}
                                onChange={(e) =>
                                    onCreditRatingChange?.(e.target.value)
                                }
                                className="w-full appearance-none rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                            >
                                <option value="">Select</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={creditRatingIncludeUnknown}
                                onChange={(e) =>
                                    onCreditRatingIncludeUnknownChange?.(
                                        e.target.checked
                                    )
                                }
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label className="ml-2 text-sm text-gray-700">
                                Include Unknown
                            </label>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                    {/* Company Growth */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Company Growth
                        </label>
                        <div className="relative">
                            <select
                                value={companyGrowth}
                                onChange={(e) =>
                                    onCompanyGrowthChange?.(e.target.value)
                                }
                                className="w-full appearance-none rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                            >
                                <option value="">Select</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Revenue */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Revenue
                        </label>
                        <div className="relative mb-1.5">
                            <select
                                value={revenue}
                                onChange={(e) =>
                                    onRevenueChange?.(e.target.value)
                                }
                                className="w-full appearance-none rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                            >
                                <option value="">Select</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={revenueIncludeUnknown}
                                onChange={(e) =>
                                    onRevenueIncludeUnknownChange?.(
                                        e.target.checked
                                    )
                                }
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label className="ml-2 text-sm text-gray-700">
                                Include Unknown
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Retailers Only */}
            <div className="flex items-center gap-2">
                <label className="block text-sm font-medium text-gray-700">
                    Retailers Only
                </label>
                <button
                    type="button"
                    onClick={() => onRetailersOnlyChange?.(!retailersOnly)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                        retailersOnly ? "bg-blue-600" : "bg-gray-300"
                    }`}
                    role="switch"
                    aria-checked={retailersOnly}
                >
                    <span
                        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                            retailersOnly
                                ? "translate-x-5"
                                : "translate-x-0.5"
                        }`}
                    />
                </button>
                <button
                    type="button"
                    className="text-blue-500 hover:text-blue-600"
                >
                    <Info className="h-4 w-4" />
                </button>
            </div>

            {/* Industry Classification */}
            <div>
                <div className="flex items-center gap-4 mb-1.5">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="industry-classification"
                            value="industry-type"
                            checked={industryClassification === "industry-type"}
                            onChange={(e) =>
                                onIndustryClassificationChange?.(
                                    e.target.value as
                                        | "industry-type"
                                        | "naics-code"
                                        | "sic-code"
                                )
                            }
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                            Industry Type
                        </span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="industry-classification"
                            value="naics-code"
                            checked={industryClassification === "naics-code"}
                            onChange={(e) =>
                                onIndustryClassificationChange?.(
                                    e.target.value as
                                        | "industry-type"
                                        | "naics-code"
                                        | "sic-code"
                                )
                            }
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                            NAICS Code
                        </span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="industry-classification"
                            value="sic-code"
                            checked={industryClassification === "sic-code"}
                            onChange={(e) =>
                                onIndustryClassificationChange?.(
                                    e.target.value as
                                        | "industry-type"
                                        | "naics-code"
                                        | "sic-code"
                                )
                            }
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                            SIC Code
                        </span>
                    </label>
                </div>
                <div className="relative">
                    <select
                        value={industryValue}
                        onChange={(e) =>
                            onIndustryValueChange?.(e.target.value)
                        }
                        className="w-full appearance-none rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                    >
                        <option value="">Select</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {/* Territory */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Territory
                </label>
                <div className="relative">
                    <select
                        value={territory}
                        onChange={(e) => onTerritoryChange?.(e.target.value)}
                        className="w-full appearance-none rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                    >
                        <option value="">Select</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {/* Company Description Keyword Search */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Company Description Keyword Search
                </label>
                <input
                    type="text"
                    value={keywordSearch}
                    onChange={(e) => onKeywordSearchChange?.(e.target.value)}
                    placeholder="Use quotes for specific phrases"
                    className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-1.5"
                />
                <div className="flex items-center gap-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="keyword-match"
                            value="all"
                            checked={keywordMatch === "all"}
                            onChange={(e) =>
                                onKeywordMatchChange?.(
                                    e.target.value as "all" | "any"
                                )
                            }
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                            Match all keywords
                        </span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="keyword-match"
                            value="any"
                            checked={keywordMatch === "any"}
                            onChange={(e) =>
                                onKeywordMatchChange?.(
                                    e.target.value as "all" | "any"
                                )
                            }
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                            Match any keywords
                        </span>
                    </label>
                </div>
            </div>
        </div>
    );
}

