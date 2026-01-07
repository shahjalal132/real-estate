import { useState, useCallback } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AppLayout from "@/web/Layouts/AppLayout";
import { PaginatedData } from "@/types";
import OwnerFundsFilter from "@/Components/Owner/OwnerFundsFilter";
import ResizableTable, {
    ResizableColumn,
} from "@/Components/ResizableTable/ResizableTable";
import OwnerFundsAdvancedFilter from "@/Components/Owner/OwnerFundsAdvancedFilter";
import Pagination from "@/Components/Pagination";

interface OwnerFund {
    id: number;
    company?: string;
    fund: string;
    fund_size?: number;
    status?: string;
    dry_powder?: number;
    aum?: number;
    vintage?: string;
    property_focus?: string;
    country_focus?: string;
    region_focus?: string;
    strategy?: string;
    fund_structure?: string;
    launch_date?: string;
    final_close_date?: string;
    months_in_market?: number;
    target_irr_gross?: number;
    target_irr_net?: number;
    min_fund_manager_loc?: string;
    properties?: number;
    portfolio_size_sf?: number;
    acquisitions_24_months?: number;
    dispositions_24_months?: number;
}

interface PageProps {
    funds: PaginatedData<OwnerFund>;
    filters: {
        search?: string;
        min_properties?: number;
        min_portfolio_sf?: number;
        max_portfolio_sf?: number;
        company?: string;
        status?: string | string[];
        property_focus?: string | string[];
        country_focus?: string | string[];
        region_focus?: string;
        strategy?: string | string[];
        min_dry_powder?: number;
        max_dry_powder?: number;
    };
    sort: {
        by: string;
        dir: string;
    };
}

export default function OwnerFunds({ funds, filters }: PageProps) {
    const { url } = usePage();
    const [searchValue, setSearchValue] = useState(filters.search || "");
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const activeTab = url.includes("/funds") ? "funds" : "companies";

    const handleSearch = useCallback(() => {
        router.get(
            "/contacts/owners/funds",
            {
                search: searchValue || undefined,
                ...filters,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    }, [searchValue, filters]);

    const formatNumber = (num: number | null | undefined): string => {
        if (num === null || num === undefined) return "—";
        return num.toLocaleString();
    };

    const formatSF = (sf: string | number | null | undefined): string => {
        if (sf === null || sf === undefined) return "—";
        const num = typeof sf === "string" ? parseFloat(sf) : sf;
        if (isNaN(num)) return "—";
        if (num >= 1000000) {
            return `${(num / 1000000).toFixed(1)}M`;
        }
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}K`;
        }
        return num.toLocaleString();
    };

    const formatCurrency = (
        value: string | number | null | undefined
    ): string => {
        if (value === null || value === undefined) return "—";
        const num = typeof value === "string" ? parseFloat(value) : value;
        if (isNaN(num)) return "—";
        if (num >= 1000000000) {
            return `$${(num / 1000000000).toFixed(2)}B`;
        }
        if (num >= 1000000) {
            return `$${(num / 1000000).toFixed(2)}M`;
        }
        if (num >= 1000) {
            return `$${(num / 1000).toFixed(2)}K`;
        }
        return `$${num.toLocaleString()}`;
    };

    const activeFiltersCount = Object.values(filters).filter(
        (v) => v !== undefined && v !== ""
    ).length;

    const columns: ResizableColumn[] = [
        {
            key: "fund",
            label: "Fund",
            align: "left",
            defaultWidth: 200,
        },
        {
            key: "company",
            label: "Company",
            align: "left",
            defaultWidth: 180,
        },
        {
            key: "fund_size",
            label: "Fund Size",
            align: "right",
            defaultWidth: 140,
            render: (row) => formatCurrency(row.fund_size),
        },
        {
            key: "status",
            label: "Status",
            align: "left",
            defaultWidth: 120,
        },
        {
            key: "aum",
            label: "AUM",
            align: "right",
            defaultWidth: 140,
            render: (row) => formatCurrency(row.aum),
        },
        {
            key: "dry_powder",
            label: "Dry Powder",
            align: "right",
            defaultWidth: 140,
            render: (row) => formatCurrency(row.dry_powder),
        },
        {
            key: "vintage",
            label: "Vintage",
            align: "left",
            defaultWidth: 100,
        },
        {
            key: "property_focus",
            label: "Property Focus",
            align: "left",
            defaultWidth: 160,
        },
        {
            key: "country_focus",
            label: "Country Focus",
            align: "left",
            defaultWidth: 150,
        },
        {
            key: "region_focus",
            label: "Region Focus",
            align: "left",
            defaultWidth: 150,
        },
        {
            key: "strategy",
            label: "Strategy",
            align: "left",
            defaultWidth: 160,
        },
        {
            key: "properties",
            label: "Properties (#)",
            align: "right",
            defaultWidth: 120,
            render: (row) => formatNumber(row.properties),
        },
        {
            key: "portfolio_size_sf",
            label: "Portfolio Size (SF)",
            align: "right",
            defaultWidth: 160,
            render: (row) => formatSF(row.portfolio_size_sf),
        },
        {
            key: "target_irr_gross",
            label: "Target IRR - Gross",
            align: "right",
            defaultWidth: 160,
            render: (row) =>
                row.target_irr_gross ? `${row.target_irr_gross}%` : "—",
        },
        {
            key: "target_irr_net",
            label: "Target IRR - Net",
            align: "right",
            defaultWidth: 160,
            render: (row) =>
                row.target_irr_net ? `${row.target_irr_net}%` : "—",
        },
        {
            key: "acquisitions_24_months",
            label: "Acquisitions 24M",
            align: "right",
            defaultWidth: 160,
            render: (row) => formatCurrency(row.acquisitions_24_months),
        },
        {
            key: "dispositions_24_months",
            label: "Dispositions 24M",
            align: "right",
            defaultWidth: 160,
            render: (row) => formatCurrency(row.dispositions_24_months),
        },
    ];

    return (
        <AppLayout>
            <Head title="Owner Funds" />
            <div className="flex flex-col h-screen bg-white overflow-hidden max-h-[calc(100vh-8vh)]">
                {/* Header with Tabs */}
                <div className="border-b border-gray-200 bg-white shrink-0">
                    <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between py-4">
                            <div className="flex items-center space-x-8">
                                <Link
                                    href="/contacts/owners/companies"
                                    className={`border-b-2 pb-2 text-sm font-medium transition-colors ${
                                        activeTab === "companies"
                                            ? "border-red-600 text-gray-900"
                                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                    }`}
                                >
                                    Companies
                                </Link>
                                <Link
                                    href="/contacts/owners/funds"
                                    className={`border-b-2 pb-2 text-sm font-medium transition-colors ${
                                        activeTab === "funds"
                                            ? "border-red-600 text-gray-900"
                                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                    }`}
                                >
                                    Funds
                                </Link>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-600">
                                    {formatNumber(funds.total)} Owner Funds
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="shrink-0">
                    <OwnerFundsFilter
                        searchValue={searchValue}
                        onSearchChange={setSearchValue}
                        onSearch={handleSearch}
                        onFiltersClick={() => {
                            setShowAdvancedFilters((prev) => !prev);
                        }}
                        onSaveClick={() => {
                            // Handle save click
                        }}
                        onExportClick={() => {
                            // Handle export click
                        }}
                        onClearClick={() => {
                            router.get("/contacts/owners/funds", {});
                        }}
                        activeFiltersCount={activeFiltersCount}
                        status={
                            Array.isArray(filters.status)
                                ? filters.status
                                : filters.status
                                ? [filters.status]
                                : []
                        }
                        onStatusChange={(values) => {
                            const newFilters = { ...filters };
                            if (values.length > 0) {
                                newFilters.status = values;
                            } else {
                                delete newFilters.status;
                            }
                            router.get(
                                "/contacts/owners/funds",
                                {
                                    search: searchValue || undefined,
                                    ...newFilters,
                                },
                                {
                                    preserveState: true,
                                    preserveScroll: true,
                                }
                            );
                        }}
                        propertyFocus={
                            Array.isArray(filters.property_focus)
                                ? filters.property_focus
                                : filters.property_focus
                                ? [filters.property_focus]
                                : []
                        }
                        onPropertyFocusChange={(values) => {
                            const newFilters = { ...filters };
                            if (values.length > 0) {
                                newFilters.property_focus = values;
                            } else {
                                delete newFilters.property_focus;
                            }
                            router.get(
                                "/contacts/owners/funds",
                                {
                                    search: searchValue || undefined,
                                    ...newFilters,
                                },
                                {
                                    preserveState: true,
                                    preserveScroll: true,
                                }
                            );
                        }}
                        minDryPowder={filters.min_dry_powder || null}
                        maxDryPowder={filters.max_dry_powder || null}
                        onDryPowderChange={(min, max) => {
                            const newFilters = { ...filters };
                            if (min !== null && min !== undefined) {
                                newFilters.min_dry_powder = min;
                            } else {
                                delete newFilters.min_dry_powder;
                            }
                            if (max !== null && max !== undefined) {
                                newFilters.max_dry_powder = max;
                            } else {
                                delete newFilters.max_dry_powder;
                            }
                            router.get(
                                "/contacts/owners/funds",
                                {
                                    search: searchValue || undefined,
                                    ...newFilters,
                                },
                                {
                                    preserveState: true,
                                    preserveScroll: true,
                                }
                            );
                        }}
                        countryFocus={
                            Array.isArray(filters.country_focus)
                                ? filters.country_focus
                                : filters.country_focus
                                ? [filters.country_focus]
                                : []
                        }
                        onCountryFocusChange={(values) => {
                            const newFilters = { ...filters };
                            if (values.length > 0) {
                                newFilters.country_focus = values;
                            } else {
                                delete newFilters.country_focus;
                            }
                            router.get(
                                "/contacts/owners/funds",
                                {
                                    search: searchValue || undefined,
                                    ...newFilters,
                                },
                                {
                                    preserveState: true,
                                    preserveScroll: true,
                                }
                            );
                        }}
                        strategy={
                            Array.isArray(filters.strategy)
                                ? filters.strategy
                                : filters.strategy
                                ? [filters.strategy]
                                : []
                        }
                        onStrategyChange={(values) => {
                            const newFilters = { ...filters };
                            if (values.length > 0) {
                                newFilters.strategy = values;
                            } else {
                                delete newFilters.strategy;
                            }
                            router.get(
                                "/contacts/owners/funds",
                                {
                                    search: searchValue || undefined,
                                    ...newFilters,
                                },
                                {
                                    preserveState: true,
                                    preserveScroll: true,
                                }
                            );
                        }}
                    />
                </div>

                {/* Table Container with Sidebar */}
                <div className="flex flex-1 min-h-0 overflow-hidden">
                    {/* Main Content */}
                    <div
                        className={`flex flex-col transition-all duration-300 min-h-0 ${
                            showAdvancedFilters
                                ? "w-full md:w-[calc(100%-600px)] lg:w-[calc(100%-600px)] xl:w-[calc(100%-600px)]"
                                : "w-full"
                        }`}
                    >
                        <div className="flex flex-col flex-1 min-h-0 mx-auto max-w-[1920px] w-full">
                            {/* Table - Takes available space */}
                            <div className="flex-1 min-h-0 overflow-hidden px-4 sm:px-6 lg:px-8 pt-4">
                                <ResizableTable
                                    columns={columns}
                                    data={funds.data}
                                    storageKey="owner-funds-column-widths"
                                    className="h-full"
                                />
                            </div>

                            {/* Pagination - Fixed at bottom, always visible */}
                            <div className="shrink-0 border-t border-gray-200 bg-white">
                                <div className="mx-auto max-w-[1920px] w-full px-4 sm:px-6 lg:px-8">
                                    <Pagination
                                        data={funds}
                                        filters={filters}
                                        baseUrl="/contacts/owners/funds"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Advanced Filters Sidebar - Desktop */}
                    {showAdvancedFilters && (
                        <div className="hidden md:flex w-[600px] border-l border-gray-200 bg-white shrink-0 flex-col">
                            <OwnerFundsAdvancedFilter
                                isOpen={showAdvancedFilters}
                                onClose={() => setShowAdvancedFilters(false)}
                                onClear={() => {
                                    router.get("/contacts/owners/funds");
                                    setShowAdvancedFilters(false);
                                }}
                                onDone={() => {
                                    setShowAdvancedFilters(false);
                                }}
                                activeFiltersCount={activeFiltersCount}
                            />
                        </div>
                    )}

                    {/* Advanced Filters Overlay - Mobile */}
                    {showAdvancedFilters && (
                        <div className="md:hidden fixed inset-0 z-50 flex">
                            {/* Backdrop */}
                            <div
                                className="absolute inset-0 bg-black bg-opacity-50"
                                onClick={() => setShowAdvancedFilters(false)}
                            />
                            {/* Panel */}
                            <div className="relative w-full max-w-sm ml-auto bg-white h-full flex flex-col shadow-xl">
                                <OwnerFundsAdvancedFilter
                                    isOpen={showAdvancedFilters}
                                    onClose={() =>
                                        setShowAdvancedFilters(false)
                                    }
                                    onClear={() => {
                                        router.get("/contacts/owners/funds");
                                        setShowAdvancedFilters(false);
                                    }}
                                    onDone={() => {
                                        setShowAdvancedFilters(false);
                                    }}
                                    activeFiltersCount={activeFiltersCount}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
