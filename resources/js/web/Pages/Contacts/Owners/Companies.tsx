import { useState, useCallback } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AppLayout from "@/web/Layouts/AppLayout";
import { PaginatedData } from "@/types";
import OwnerCompaniesFilterBar from "@/Components/Owner/OwnerCompaniesFilterBar";
import ResizableTable, {
    ResizableColumn,
} from "@/Components/ResizableTable/ResizableTable";
import AdvancedFiltersPanel from "@/Components/Owner/AdvancedFiltersPanel";

interface OwnerCompany {
    id: number;
    company: string;
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
    companies: PaginatedData<OwnerCompany>;
    filters: {
        search?: string;
        min_properties?: number;
        min_portfolio_sf?: number;
        max_portfolio_sf?: number;
        owner_type?: string;
        territory?: string;
        main_property_type?: string | string[];
    };
    sort: {
        by: string;
        dir: string;
    };
}

export default function OwnerCompanies({ companies, filters }: PageProps) {
    const { url } = usePage();
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const activeTab = url.includes("/funds") ? "funds" : "companies";

    const updateFilters = useCallback(
        (newFilters: Record<string, any>) => {
            router.get(
                "/contacts/owners/companies",
                {
                    ...filters,
                    ...newFilters,
                },
                {
                    preserveState: true,
                    preserveScroll: false,
                    replace: false,
                }
            );
        },
        [filters]
    );

    const handleSearchChange = useCallback(
        (value: string) => {
            updateFilters({ search: value || undefined });
        },
        [updateFilters]
    );

    const handleSearch = useCallback(() => {
        updateFilters({ search: filters.search || undefined });
    }, [updateFilters, filters.search]);

    const handleOwnerTypeChange = useCallback(
        (value: string | null) => {
            updateFilters({ owner_type: value || undefined });
        },
        [updateFilters]
    );

    const handlePortfolioSizeChange = useCallback(
        (min: number | null, max: number | null) => {
            updateFilters({
                min_portfolio_sf: min || undefined,
                max_portfolio_sf: max || undefined,
            });
        },
        [updateFilters]
    );

    const handlePropertiesOwnedChange = useCallback(
        (value: number | null) => {
            updateFilters({ min_properties: value || undefined });
        },
        [updateFilters]
    );

    const handleMainPropertyTypeChange = useCallback(
        (values: string[]) => {
            updateFilters({
                main_property_type:
                    values.length > 0 ? values : undefined,
            });
        },
        [updateFilters]
    );

    const handleClearFilters = useCallback(() => {
        router.get("/contacts/owners/companies", {}, { preserveState: false });
    }, []);

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

    const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
        if (value === undefined || value === "") return false;
        // Handle arrays - count as active if array has items
        if (Array.isArray(value)) return value.length > 0;
        return true;
    }).length;

    const columns: ResizableColumn[] = [
        {
            key: "company",
            label: "Company",
            align: "left",
            defaultWidth: 200,
            render: (row) => (
                <Link
                    href={`/contacts/owners/${row.id}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                >
                    {row.company}
                </Link>
            ),
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
            <Head title="Owner Companies" />
            <div className="min-h-screen bg-white">
                {/* Header with Tabs */}
                <div className="border-b border-gray-200 bg-white">
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
                                    {formatNumber(companies.total)} Owner
                                    Companies
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <OwnerCompaniesFilterBar
                    searchValue={filters.search}
                    onSearchChange={handleSearchChange}
                    onSearch={handleSearch}
                    ownerType={filters.owner_type || null}
                    onOwnerTypeChange={handleOwnerTypeChange}
                    minPortfolioSf={filters.min_portfolio_sf || null}
                    maxPortfolioSf={filters.max_portfolio_sf || null}
                    onPortfolioSizeChange={handlePortfolioSizeChange}
                    minProperties={filters.min_properties || null}
                    onPropertiesOwnedChange={handlePropertiesOwnedChange}
                    mainPropertyTypes={
                        Array.isArray(filters.main_property_type)
                            ? filters.main_property_type
                            : filters.main_property_type
                            ? [filters.main_property_type]
                            : []
                    }
                    onMainPropertyTypeChange={handleMainPropertyTypeChange}
                    onFiltersClick={() => {
                        setShowAdvancedFilters(!showAdvancedFilters);
                    }}
                    onClearClick={handleClearFilters}
                    onSaveClick={() => {
                        // Handle save click
                    }}
                    onExportClick={() => {
                        // Handle export click
                    }}
                    activeFiltersCount={activeFiltersCount}
                />

                {/* Table Container with Sidebar */}
                <div className="relative flex min-h-[calc(100vh-200px)]">
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
                                data={companies.data}
                                storageKey="owner-companies-column-widths"
                                onRowClick={(row) => {
                                    router.visit(`/contacts/owners/${row.id}`);
                                }}
                            />

                            {/* Pagination */}
                            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                                <div className="flex flex-1 justify-between sm:hidden">
                                    <button
                                        onClick={() => {
                                            if (companies.prev_page_url) {
                                                router.get(
                                                    companies.prev_page_url
                                                );
                                            }
                                        }}
                                        disabled={!companies.prev_page_url}
                                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (companies.next_page_url) {
                                                router.get(
                                                    companies.next_page_url
                                                );
                                            }
                                        }}
                                        disabled={!companies.next_page_url}
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
                                                {companies.from}
                                            </span>{" "}
                                            to{" "}
                                            <span className="font-medium">
                                                {companies.to}
                                            </span>{" "}
                                            of{" "}
                                            <span className="font-medium">
                                                {companies.total}
                                            </span>{" "}
                                            results
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <select
                                            value={companies.per_page}
                                            onChange={(e) => {
                                                router.get(
                                                    "/contacts/owners/companies",
                                                    {
                                                        ...filters,
                                                        per_page:
                                                            e.target.value,
                                                        page: 1,
                                                    }
                                                );
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
                                                    if (
                                                        companies.prev_page_url
                                                    ) {
                                                        router.get(
                                                            companies.prev_page_url
                                                        );
                                                    }
                                                }}
                                                disabled={
                                                    !companies.prev_page_url
                                                }
                                                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                            >
                                                ‹
                                            </button>
                                            {companies.links
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
                                                    if (
                                                        companies.next_page_url
                                                    ) {
                                                        router.get(
                                                            companies.next_page_url
                                                        );
                                                    }
                                                }}
                                                disabled={
                                                    !companies.next_page_url
                                                }
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
                                    router.get("/contacts/owners/companies");
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
