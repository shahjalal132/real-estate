import { useState, useCallback } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AppLayout from "../../../Layouts/AppLayout";
import { PaginatedData, TennentCompany } from "../../../../types";
import CompaniesFilterBar from "../../../../Components/Tenant/CompaniesFilterBar";
import ResizableTable, {
    ResizableColumn,
} from "../../../../Components/ResizableTable/ResizableTable";
import AdvancedFiltersPanel from "../../../../Components/Tenant/AdvancedFiltersPanel";
import { Info, Heart, MoreVertical, Minus, Globe } from "lucide-react";

interface PageProps {
    companies: PaginatedData<TennentCompany>;
    filters: {
        search?: string;
        min_locations?: number;
        max_locations?: number;
        min_sf_occupied?: number;
        max_sf_occupied?: number;
        retailers_only?: boolean;
        industry?: string;
        territory?: string;
    };
    sort: {
        by: string;
        dir: string;
    };
}

export default function TenantCompanies({ companies, filters }: PageProps) {
    const { url } = usePage();
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const activeTab = url.includes("/locations") ? "locations" : "companies";

    const updateFilters = useCallback(
        (newFilters: Record<string, any>) => {
            router.get(
                "/contacts/tenants",
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

    const handleRetailersOnlyChange = useCallback(
        (value: boolean) => {
            updateFilters({ retailers_only: value || undefined });
        },
        [updateFilters]
    );

    const handleLocationsChange = useCallback(
        (min: number | null, max: number | null) => {
            updateFilters({
                min_locations: min || undefined,
                max_locations: max || undefined,
            });
        },
        [updateFilters]
    );

    const handleSfOccupiedChange = useCallback(
        (min: number | null, max: number | null) => {
            updateFilters({
                min_sf_occupied: min || undefined,
                max_sf_occupied: max || undefined,
            });
        },
        [updateFilters]
    );

    const handleClearFilters = useCallback(() => {
        router.get("/contacts/tenants", {}, { preserveState: false });
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

    const formatYear = (year: number | null | undefined): string => {
        if (year === null || year === undefined) return "—";
        return year.toString();
    };

    const formatPhone = (phone: string | null | undefined): string => {
        if (!phone) return "—";
        return phone;
    };

    const formatUrl = (url: string | null | undefined): string => {
        if (!url) return "—";
        if (!url.startsWith("http")) {
            return `https://${url}`;
        }
        return url;
    };

    const activeFiltersCount = Object.values(filters).filter(
        (v) => v !== undefined && v !== ""
    ).length;

    const columns: ResizableColumn[] = [
        {
            key: "tenant_name",
            label: "Tenant Name",
            align: "left",
            defaultWidth: 200,
            render: (row) => (
                <Link
                    href={`/contacts/tenants/${row.id}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                >
                    {row.tenant_name}
                </Link>
            ),
        },
        {
            key: "industry",
            label: "Industry",
            align: "left",
            defaultWidth: 150,
        },
        {
            key: "territory",
            label: "Territory",
            align: "left",
            defaultWidth: 120,
        },
        {
            key: "hq_market",
            label: "HQ Market",
            align: "left",
            defaultWidth: 120,
        },
        {
            key: "locations",
            label: "Locations",
            align: "right",
            defaultWidth: 100,
            render: (row) => formatNumber(row.locations),
        },
        {
            key: "sf_occupied",
            label: "SF Occupied",
            align: "right",
            defaultWidth: 120,
            render: (row) => formatSF(row.sf_occupied),
        },
        {
            key: "highest_use_by_sf",
            label: "Highest Use By SF",
            align: "left",
            defaultWidth: 150,
        },
        {
            key: "employees",
            label: "Employees",
            align: "right",
            defaultWidth: 120,
            render: (row) => formatNumber(row.employees),
        },
        {
            key: "growth",
            label: "Growth",
            align: "left",
            defaultWidth: 120,
            render: (row) => (
                <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        row.growth === "Growing"
                            ? "bg-green-100 text-green-800"
                            : row.growth === "Downsizing"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                >
                    {row.growth || "—"}
                </span>
            ),
        },
        {
            key: "revenue",
            label: "Revenue",
            align: "right",
            defaultWidth: 120,
            render: (row) => formatCurrency(row.revenue),
        },
        {
            key: "credit_rating",
            label: "Credit Rating",
            align: "left",
            defaultWidth: 120,
        },
        {
            key: "established",
            label: "Established",
            align: "left",
            defaultWidth: 120,
            render: (row) => formatYear(row.established),
        },
        {
            key: "parent_company",
            label: "Parent Company",
            align: "left",
            defaultWidth: 150,
        },
        {
            key: "website",
            label: "Website",
            align: "left",
            defaultWidth: 100,
            render: (row) =>
                row.website ? (
                    <a
                        href={formatUrl(row.website)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Globe className="h-4 w-4" />
                    </a>
                ) : (
                    "—"
                ),
        },
        {
            key: "hq_phone",
            label: "HQ Phone",
            align: "left",
            defaultWidth: 120,
            render: (row) => formatPhone(row.hq_phone),
        },
        {
            key: "hq_city",
            label: "HQ City",
            align: "left",
            defaultWidth: 120,
        },
        {
            key: "hq_state",
            label: "HQ State",
            align: "left",
            defaultWidth: 100,
        },
        {
            key: "hq_postal_code",
            label: "HQ Postal Code",
            align: "left",
            defaultWidth: 130,
        },
        {
            key: "hq_country",
            label: "HQ Country",
            align: "left",
            defaultWidth: 120,
        },
        {
            key: "naics",
            label: "NAICS",
            align: "left",
            defaultWidth: 100,
        },
        {
            key: "sic",
            label: "SIC",
            align: "left",
            defaultWidth: 100,
        },
    ];

    return (
        <AppLayout>
            <Head title="Tenant Companies" />
            <div className="min-h-screen bg-white">
                {/* Header with Tabs */}
                <div className="border-b border-gray-200 bg-white">
                    <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between py-4">
                            <div className="flex items-center space-x-8">
                                <Link
                                    href="/contacts/tenants"
                                    className={`border-b-2 pb-2 text-sm font-medium transition-colors ${
                                        activeTab === "companies"
                                            ? "border-red-600 text-gray-900"
                                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                    }`}
                                >
                                    Tenant Companies
                                </Link>
                                <Link
                                    href="/contacts/tenants/locations"
                                    className={`border-b-2 pb-2 text-sm font-medium transition-colors ${
                                        activeTab === "locations"
                                            ? "border-red-600 text-gray-900"
                                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                    }`}
                                >
                                    Tenant Locations
                                </Link>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-600">
                                    {formatNumber(companies.total)} Tenant
                                    Companies
                                </span>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <Info className="h-5 w-5" />
                                </button>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <Heart className="h-5 w-5" />
                                </button>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <MoreVertical className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <CompaniesFilterBar
                    searchValue={filters.search}
                    onSearchChange={handleSearchChange}
                    onSearch={handleSearch}
                    retailersOnly={filters.retailers_only || false}
                    onRetailersOnlyChange={handleRetailersOnlyChange}
                    minLocations={filters.min_locations || null}
                    maxLocations={filters.max_locations || null}
                    onLocationsChange={handleLocationsChange}
                    minSfOccupied={filters.min_sf_occupied ?? undefined}
                    maxSfOccupied={filters.max_sf_occupied ?? undefined}
                    onSfOccupiedChange={handleSfOccupiedChange}
                    onFiltersClick={() => {
                        setShowAdvancedFilters((prev) => !prev);
                    }}
                    onClearClick={handleClearFilters}
                    onSortClick={() => {
                        // Handle sort click
                    }}
                    onSaveClick={() => {
                        // Handle save click
                    }}
                    onAddClick={() => {
                        // Handle add click
                    }}
                    onExportClick={() => {
                        // Handle export click
                    }}
                    onAddedRemovedClick={() => {
                        // Handle added/removed click
                    }}
                    activeFiltersCount={activeFiltersCount}
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
                                data={companies.data}
                                storageKey="tenant-companies-column-widths"
                                renderCheckbox={() => (
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </div>
                                )}
                                renderActions={(row) => (
                                    <button
                                        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-600"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            console.log("Remove", row.id);
                                        }}
                                        title="Remove"
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                )}
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
                                                    "/contacts/tenants",
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
                                    router.get("/contacts/tenants", {
                                        tab: "companies",
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
