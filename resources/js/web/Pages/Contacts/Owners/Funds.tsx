import { useState, useCallback } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AppLayout from "@/web/Layouts/AppLayout";
import { PaginatedData } from "@/types";
import OwnerCompaniesFilterBar from "@/Components/Owner/OwnerCompaniesFilterBar";
import ResizableTable, {
    ResizableColumn,
} from "@/Components/ResizableTable/ResizableTable";
import AdvancedFiltersPanel from "@/Components/Owner/AdvancedFiltersPanel";

interface OwnerFund {
    id: number;
    fund_name: string;
    hierarchy?: string;
    owner_type?: string;
    hq_city?: string;
    hq_state?: string;
    hq_country?: string;
    properties?: number;
    portfolio_sf?: number;
    average_sf?: number;
    apt_units?: number;
    hotel_rooms?: number;
    land_acre?: number;
    main_property_type?: string;
    sf_delivered_24_months?: number;
    sf_under_construction?: number;
    continental_focus?: string;
    primary_country?: string;
    territory?: string;
    sale_listings?: number;
    sale_listings_value?: number;
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
        owner_type?: string;
        territory?: string;
        main_property_type?: string;
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
    const activeTab = url.includes("tab=funds") ? "funds" : "companies";

    const handleSearch = useCallback(() => {
        router.get(
            "/contacts/owners",
            {
                tab: "funds",
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
            key: "fund_name",
            label: "Fund Name",
            align: "left",
            defaultWidth: 200,
        },
        {
            key: "owner_type",
            label: "Owner Type",
            align: "left",
            defaultWidth: 150,
        },
        {
            key: "hq_location",
            label: "HQ Location",
            align: "left",
            defaultWidth: 180,
            render: (row) =>
                row.hq_city && row.hq_state
                    ? `${row.hq_city}, ${row.hq_state}`
                    : row.hq_city || row.hq_state || "—",
        },
        {
            key: "properties",
            label: "Properties",
            align: "right",
            defaultWidth: 120,
            render: (row) => formatNumber(row.properties),
        },
        {
            key: "portfolio_sf",
            label: "Portfolio SF",
            align: "right",
            defaultWidth: 140,
            render: (row) => formatSF(row.portfolio_sf),
        },
        {
            key: "average_sf",
            label: "Average SF",
            align: "right",
            defaultWidth: 120,
            render: (row) => formatSF(row.average_sf),
        },
        {
            key: "main_property_type",
            label: "Main Property Type",
            align: "left",
            defaultWidth: 160,
        },
        {
            key: "territory",
            label: "Territory",
            align: "left",
            defaultWidth: 120,
        },
        {
            key: "sale_listings",
            label: "Sale Listings",
            align: "right",
            defaultWidth: 120,
            render: (row) => formatNumber(row.sale_listings),
        },
        {
            key: "sale_listings_value",
            label: "Sale Listings Value",
            align: "right",
            defaultWidth: 160,
            render: (row) => formatCurrency(row.sale_listings_value),
        },
    ];

    return (
        <AppLayout>
            <Head title="Owner Funds" />
            <div className="min-h-screen bg-white">
                {/* Header with Tabs */}
                <div className="border-b border-gray-200 bg-white">
                    <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between py-4">
                            <div className="flex items-center space-x-8">
                                <Link
                                    href="/contacts/owners?tab=companies"
                                    className={`border-b-2 pb-2 text-sm font-medium transition-colors ${
                                        activeTab === "companies"
                                            ? "border-red-600 text-gray-900"
                                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                    }`}
                                >
                                    Companies
                                </Link>
                                <Link
                                    href="/contacts/owners?tab=funds"
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
                <OwnerCompaniesFilterBar
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
                        router.get("/contacts/owners", {
                            tab: "funds",
                        });
                    }}
                    activeFiltersCount={activeFiltersCount}
                    ownerType={filters.owner_type || ""}
                    onOwnerTypeChange={(value) => {
                        router.get("/contacts/owners", {
                            tab: "funds",
                            search: searchValue || undefined,
                            owner_type: value || undefined,
                            ...filters,
                        });
                    }}
                    portfolioSize={
                        filters.min_portfolio_sf
                            ? filters.min_portfolio_sf >= 1000000
                                ? "1m+"
                                : filters.min_portfolio_sf >= 500000
                                ? "500k-1m"
                                : filters.min_portfolio_sf >= 100000
                                ? "100k-500k"
                                : "0-100k"
                            : ""
                    }
                    onPortfolioSizeChange={(value) => {
                        const portfolioMap: Record<string, number> = {
                            "0-100k": 0,
                            "100k-500k": 100000,
                            "500k-1m": 500000,
                            "1m+": 1000000,
                        };
                        router.get("/contacts/owners", {
                            tab: "funds",
                            search: searchValue || undefined,
                            min_portfolio_sf: value
                                ? portfolioMap[value]
                                : undefined,
                            ...filters,
                        });
                    }}
                    propertiesOwned={
                        filters.min_properties
                            ? filters.min_properties.toString()
                            : ""
                    }
                    onPropertiesOwnedChange={(value) => {
                        router.get("/contacts/owners", {
                            tab: "funds",
                            search: searchValue || undefined,
                            min_properties: value ? parseInt(value) : undefined,
                            ...filters,
                        });
                    }}
                    mainPropertyType={filters.main_property_type || ""}
                    onMainPropertyTypeChange={(value) => {
                        router.get("/contacts/owners", {
                            tab: "funds",
                            search: searchValue || undefined,
                            main_property_type: value || undefined,
                            ...filters,
                        });
                    }}
                />

                {/* Table Container with Sidebar */}
                <div className="relative flex">
                    {/* Main Content */}
                    <div
                        className={`transition-all duration-300 ${
                            showAdvancedFilters
                                ? "w-[calc(100%-600px)]"
                                : "w-full"
                        }`}
                    >
                        <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 py-4">
                            <ResizableTable
                                columns={columns}
                                data={funds.data}
                                storageKey="owner-funds-column-widths"
                            />

                            {/* Pagination */}
                            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                                <div className="flex flex-1 justify-between sm:hidden">
                                    <button
                                        onClick={() => {
                                            if (funds.prev_page_url) {
                                                router.get(funds.prev_page_url);
                                            }
                                        }}
                                        disabled={!funds.prev_page_url}
                                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (funds.next_page_url) {
                                                router.get(funds.next_page_url);
                                            }
                                        }}
                                        disabled={!funds.next_page_url}
                                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </div>
                                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Showing{" "}
                                            <span className="font-medium">
                                                {funds.from}
                                            </span>{" "}
                                            to{" "}
                                            <span className="font-medium">
                                                {funds.to}
                                            </span>{" "}
                                            of{" "}
                                            <span className="font-medium">
                                                {funds.total}
                                            </span>{" "}
                                            results
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <select
                                            value={funds.per_page}
                                            onChange={(e) => {
                                                router.get("/contacts/owners", {
                                                    tab: "funds",
                                                    ...filters,
                                                    per_page: e.target.value,
                                                    page: 1,
                                                });
                                            }}
                                            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        >
                                            <option value={10}>
                                                Show 10 per page
                                            </option>
                                            <option value={20}>
                                                Show 20 per page
                                            </option>
                                            <option value={50}>
                                                Show 50 per page
                                            </option>
                                            <option value={100}>
                                                Show 100 per page
                                            </option>
                                        </select>
                                        <nav
                                            className="flex items-center gap-1"
                                            aria-label="Pagination"
                                        >
                                            <button
                                                onClick={() => {
                                                    if (funds.prev_page_url) {
                                                        router.get(
                                                            funds.prev_page_url
                                                        );
                                                    }
                                                }}
                                                disabled={!funds.prev_page_url}
                                                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                            >
                                                ‹
                                            </button>
                                            {funds.links
                                                .slice(1, -1)
                                                .map((link, index) => {
                                                    if (link.url === null) {
                                                        return (
                                                            <span
                                                                key={index}
                                                                className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
                                                            >
                                                                {link.label}
                                                            </span>
                                                        );
                                                    }
                                                    return (
                                                        <button
                                                            key={index}
                                                            onClick={() =>
                                                                router.get(
                                                                    link.url!
                                                                )
                                                            }
                                                            className={`relative inline-flex items-center border px-4 py-2 text-sm font-medium ${
                                                                link.active
                                                                    ? "z-10 border-blue-500 bg-blue-50 text-blue-600"
                                                                    : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                                                            }`}
                                                        >
                                                            {link.label}
                                                        </button>
                                                    );
                                                })}
                                            <button
                                                onClick={() => {
                                                    if (funds.next_page_url) {
                                                        router.get(
                                                            funds.next_page_url
                                                        );
                                                    }
                                                }}
                                                disabled={!funds.next_page_url}
                                                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                            >
                                                ›
                                            </button>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Advanced Filters Sidebar */}
                    {showAdvancedFilters && (
                        <div className="w-[600px] border-l border-gray-200 bg-white shrink-0 flex flex-col">
                            <AdvancedFiltersPanel
                                isOpen={showAdvancedFilters}
                                onClose={() => setShowAdvancedFilters(false)}
                                onClear={() => {
                                    router.get("/contacts/owners", {
                                        tab: "funds",
                                    });
                                    setShowAdvancedFilters(false);
                                }}
                                onDone={() => {
                                    setShowAdvancedFilters(false);
                                }}
                                activeFiltersCount={activeFiltersCount}
                            />
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
