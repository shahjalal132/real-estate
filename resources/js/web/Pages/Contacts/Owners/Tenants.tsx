import { useState, useCallback } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AppLayout from "../../../Layouts/AppLayout";
import CompanyDetailsLayout from "../../../../Layouts/CompanyDetailsLayout";
import {
    PaginatedData,
    TennentCompany,
    TennentLocation,
} from "../../../../types";
import CompaniesFilterBar from "../../../../Components/Tenant/CompaniesFilterBar";
import LocationsFilterBar from "../../../../Components/Tenant/LocationsFilterBar";
import LocationsListView from "../../../../Components/Tenant/LocationsListView";
import ResizableTable, {
    ResizableColumn,
} from "../../../../Components/ResizableTable/ResizableTable";
import AdvancedFiltersPanel from "../../../../Components/Tenant/AdvancedFiltersPanel";
import CompanyDetailsHeader from "../../../../Components/Owner/CompanyDetailsHeader";
import { Minus, Globe } from "lucide-react";

interface OwnerCompany {
    id: number;
    company: string;
    owner_type?: string;
}

interface PageProps {
    company: OwnerCompany;
    companies?: PaginatedData<TennentCompany>;
    locations?: PaginatedData<TennentLocation>;
    filters: {
        search?: string;
        address_search?: string;
        min_locations?: number;
        max_locations?: number;
        min_sf_occupied?: number;
        max_sf_occupied?: number;
        retailers_only?: boolean;
        industry?: string;
        territory?: string;
        space_use?: string;
        occupancy?: string;
        city?: string;
        state?: string;
        market?: string;
        property_type?: string;
    };
    sort: {
        by: string;
        dir: string;
    };
    currentIndex?: number;
    totalCount?: number;
    previousCompanyId?: number | null;
    nextCompanyId?: number | null;
}

export default function Tenants({
    company,
    companies,
    locations,
    filters,
    sort,
    currentIndex,
    totalCount,
    previousCompanyId,
    nextCompanyId,
}: PageProps) {
    const { url } = usePage();
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

    // Determine active sub-tab from URL query parameter
    const activeSubTab = url.includes("tab=locations")
        ? "locations"
        : "companies";

    const tabs = [
        {
            id: "summary",
            label: "Summary",
            href: `/contacts/owners/${company.id}`,
        },
        {
            id: "properties",
            label: "Properties",
            href: `/contacts/owners/${company.id}/properties`,
        },
        {
            id: "transactions",
            label: "Transactions",
            href: `/contacts/owners/${company.id}/transactions`,
        },
        {
            id: "listings",
            label: "Listings",
            href: `/contacts/owners/${company.id}/listings`,
        },
        {
            id: "funds",
            label: "Funds",
            href: `/contacts/owners/${company.id}/funds`,
        },
        {
            id: "tenants",
            label: "Tenants",
            href: `/contacts/owners/${company.id}/tenants`,
        },
        {
            id: "relationships",
            label: "Relationships",
            href: `/contacts/owners/${company.id}/relationships`,
        },
        {
            id: "contacts",
            label: "Contacts",
            href: `/contacts/owners/${company.id}/contacts`,
        },
        {
            id: "news",
            label: "News",
            href: `/contacts/owners/${company.id}/news`,
        },
    ];

    const updateFilters = useCallback(
        (newFilters: Record<string, any>) => {
            const params: Record<string, any> = {
                ...filters,
                ...newFilters,
            };
            if (activeSubTab === "locations") {
                params.tab = "locations";
            }
            router.get(`/contacts/owners/${company.id}/tenants`, params, {
                preserveState: true,
                preserveScroll: false,
                replace: false,
            });
        },
        [filters, company.id, activeSubTab]
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
        const params = activeSubTab === "locations" ? { tab: "locations" } : {};
        router.get(`/contacts/owners/${company.id}/tenants`, params, {
            preserveState: false,
        });
    }, [company.id, activeSubTab]);

    // Location-specific handlers
    const handleAddressSearchChange = useCallback(
        (value: string) => {
            updateFilters({ address_search: value || undefined });
        },
        [updateFilters]
    );

    const handleTenantSearchChange = useCallback(
        (value: string) => {
            updateFilters({ search: value || undefined });
        },
        [updateFilters]
    );

    const handleSpaceUseChange = useCallback(
        (value: string | null) => {
            updateFilters({ space_use: value || undefined });
        },
        [updateFilters]
    );

    const handleOccupancyChange = useCallback(
        (value: string | null) => {
            updateFilters({ occupancy: value || undefined });
        },
        [updateFilters]
    );

    const handleSortChange = useCallback(
        (sortBy: string, sortDir: "asc" | "desc") => {
            const params: Record<string, any> = {
                ...filters,
                sort_by: sortBy,
                sort_dir: sortDir,
            };
            if (activeSubTab === "locations") {
                params.tab = "locations";
            }
            router.get(`/contacts/owners/${company.id}/tenants`, params, {
                preserveState: true,
                preserveScroll: false,
                replace: false,
            });
        },
        [filters, company.id, activeSubTab]
    );

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

    const formatDate = (date: string | null | undefined): string => {
        if (!date) return "—";
        try {
            return new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        } catch {
            return "—";
        }
    };

    const formatPercent = (
        value: string | number | null | undefined
    ): string => {
        if (value === null || value === undefined) return "—";
        const num = typeof value === "string" ? parseFloat(value) : value;
        if (isNaN(num)) return "—";
        return `${num.toFixed(2)}%`;
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

    // Location columns - using simplified version, can be expanded
    const locationColumns: ResizableColumn[] = [
        {
            key: "address",
            label: "Address",
            align: "left",
            defaultWidth: 200,
        },
        {
            key: "city",
            label: "City",
            align: "left",
            defaultWidth: 120,
        },
        {
            key: "state",
            label: "State",
            align: "left",
            defaultWidth: 100,
        },
        {
            key: "country",
            label: "Country",
            align: "left",
            defaultWidth: 100,
        },
        {
            key: "tenant_name",
            label: "Tenant Name",
            align: "left",
            defaultWidth: 180,
        },
        {
            key: "sf_occupied",
            label: "SF Occupied",
            align: "right",
            defaultWidth: 120,
            render: (row: TennentLocation) => {
                if (row.sf_occupied === null || row.sf_occupied === undefined)
                    return "—";
                const num =
                    typeof row.sf_occupied === "string"
                        ? parseFloat(row.sf_occupied)
                        : row.sf_occupied;
                if (isNaN(num)) return "—";
                return `${num.toLocaleString()} SF`;
            },
        },
        {
            key: "floor",
            label: "Floor",
            align: "left",
            defaultWidth: 100,
        },
        {
            key: "space_use",
            label: "Space Use",
            align: "left",
            defaultWidth: 120,
        },
        {
            key: "moved_in",
            label: "Moved In",
            align: "left",
            defaultWidth: 120,
            render: (row: TennentLocation) => formatDate(row.moved_in),
        },
        {
            key: "commencement",
            label: "Commencement",
            align: "left",
            defaultWidth: 130,
            render: (row: TennentLocation) => formatDate(row.commencement),
        },
        {
            key: "expiration",
            label: "Expiration",
            align: "left",
            defaultWidth: 120,
            render: (row: TennentLocation) => formatDate(row.expiration),
        },
        {
            key: "percent_of_building",
            label: "% of Building",
            align: "left",
            defaultWidth: 120,
            render: (row: TennentLocation) =>
                formatPercent(row.percent_of_building),
        },
        {
            key: "occupancy_type",
            label: "Occupancy Type",
            align: "left",
            defaultWidth: 140,
        },
        {
            key: "rent_per_sf_year",
            label: "Rent/SF/year",
            align: "right",
            defaultWidth: 130,
            render: (row: TennentLocation) => {
                if (
                    row.rent_per_sf_year === null ||
                    row.rent_per_sf_year === undefined
                )
                    return "—";
                const num =
                    typeof row.rent_per_sf_year === "string"
                        ? parseFloat(row.rent_per_sf_year)
                        : row.rent_per_sf_year;
                if (isNaN(num)) return "—";
                return `$${num.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}`;
            },
        },
        {
            key: "rent_type",
            label: "Rent Type",
            align: "left",
            defaultWidth: 120,
        },
        {
            key: "employees",
            label: "Employees",
            align: "right",
            defaultWidth: 120,
            render: (row: TennentLocation) => formatNumber(row.employees),
        },
        {
            key: "industry",
            label: "Industry",
            align: "left",
            defaultWidth: 150,
        },
        {
            key: "building_name",
            label: "Building Name",
            align: "left",
            defaultWidth: 180,
        },
        {
            key: "property_type",
            label: "Property Type",
            align: "left",
            defaultWidth: 140,
        },
        {
            key: "market",
            label: "Market",
            align: "left",
            defaultWidth: 120,
        },
        {
            key: "submarket",
            label: "Submarket",
            align: "left",
            defaultWidth: 130,
        },
    ];

    return (
        <AppLayout>
            <Head title={`${company.company} - Tenants`} />
            <CompanyDetailsLayout
                title={`${company.company} - Tenants`}
                tabs={tabs}
                currentIndex={currentIndex}
                totalCount={totalCount}
                previousCompanyId={previousCompanyId}
                nextCompanyId={nextCompanyId}
                basePath="/contacts/owners"
                headerComponent={<CompanyDetailsHeader company={company} />}
            >
                <div className="flex flex-col h-screen bg-white overflow-hidden max-h-[calc(100vh-8vh)]">
                    {/* Sub-tabs for Companies and Locations */}
                    <div className="border-b border-gray-200 mt-2">
                        <nav className="-mb-px flex space-x-8">
                            <Link
                                href={`/contacts/owners/${company.id}/tenants`}
                                className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors ${
                                    activeSubTab === "companies"
                                        ? "border-red-500 text-red-600"
                                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                }`}
                            >
                                Companies
                            </Link>
                            <Link
                                href={`/contacts/owners/${company.id}/tenants?tab=locations`}
                                className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors ${
                                    activeSubTab === "locations"
                                        ? "border-red-500 text-red-600"
                                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                }`}
                            >
                                Locations
                            </Link>
                        </nav>
                    </div>

                    {/* Search and Filter Bar */}
                    <div className="shrink-0">
                        {activeSubTab === "companies" ? (
                            <CompaniesFilterBar
                                searchValue={filters.search}
                                onSearchChange={handleSearchChange}
                                onSearch={handleSearch}
                                retailersOnly={filters.retailers_only || false}
                                onRetailersOnlyChange={
                                    handleRetailersOnlyChange
                                }
                                minLocations={filters.min_locations || null}
                                maxLocations={filters.max_locations || null}
                                onLocationsChange={handleLocationsChange}
                                minSfOccupied={
                                    filters.min_sf_occupied ?? undefined
                                }
                                maxSfOccupied={
                                    filters.max_sf_occupied ?? undefined
                                }
                                onSfOccupiedChange={handleSfOccupiedChange}
                                onFiltersClick={() => {
                                    setShowAdvancedFilters((prev) => !prev);
                                }}
                                onClearClick={handleClearFilters}
                                onSortClick={() => {
                                    // Handle sort click
                                }}
                                onSortChange={handleSortChange}
                                sortBy={sort.by}
                                sortDir={sort.dir as "asc" | "desc"}
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
                        ) : (
                            locations && (
                                <LocationsFilterBar
                                    addressSearch={filters.address_search}
                                    tenantSearch={filters.search}
                                    onAddressSearchChange={
                                        handleAddressSearchChange
                                    }
                                    onTenantSearchChange={
                                        handleTenantSearchChange
                                    }
                                    spaceUse={
                                        filters.space_use
                                            ? [filters.space_use]
                                            : []
                                    }
                                    onSpaceUseChange={(value) =>
                                        handleSpaceUseChange(value[0] || null)
                                    }
                                    minSfOccupied={filters.min_sf_occupied || 0}
                                    maxSfOccupied={filters.max_sf_occupied || 0}
                                    onSfOccupiedChange={handleSfOccupiedChange}
                                    occupancy={
                                        filters.occupancy
                                            ? [filters.occupancy]
                                            : []
                                    }
                                    onOccupancyChange={(value) =>
                                        handleOccupancyChange(value[0] || null)
                                    }
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
                                    onReportsClick={() => {
                                        // Handle reports click
                                    }}
                                    onMoreClick={() => {
                                        // Handle more click
                                    }}
                                    viewMode="list"
                                    onViewModeChange={() => {
                                        // View mode is fixed to list
                                    }}
                                    activeFiltersCount={activeFiltersCount}
                                />
                            )
                        )}
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
                                {/* Content based on active sub-tab */}
                                {activeSubTab === "companies" && companies ? (
                                    <>
                                        {/* Table - Takes available space */}
                                        <div className="flex-1 min-h-0 overflow-hidden px-4 sm:px-6 lg:px-8 pt-4">
                                            <ResizableTable
                                                columns={columns}
                                                data={companies.data}
                                                storageKey="owner-tenants-column-widths"
                                                className="h-full"
                                                renderCheckbox={() => (
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                            onClick={(e) =>
                                                                e.stopPropagation()
                                                            }
                                                        />
                                                    </div>
                                                )}
                                                renderActions={(row) => (
                                                    <button
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-600"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            console.log(
                                                                "Remove",
                                                                row.id
                                                            );
                                                        }}
                                                        title="Remove"
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </button>
                                                )}
                                            />
                                        </div>

                                        {/* Pagination - Fixed at bottom, always visible */}
                                        <div className="shrink-0 border-t border-gray-200 bg-white">
                                            <div className="mx-auto max-w-[1920px] w-full px-4 sm:px-6 lg:px-8">
                                                <div className="flex items-center justify-between bg-white py-2">
                                                    {/* Mobile Pagination */}
                                                    <div className="flex flex-1 justify-between sm:hidden">
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
                                                            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                                        >
                                                            Previous
                                                        </button>
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
                                                            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                                        >
                                                            Next
                                                        </button>
                                                    </div>

                                                    {/* Desktop Pagination */}
                                                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                                        <div>
                                                            <p className="text-sm text-gray-700">
                                                                Showing{" "}
                                                                <span className="font-medium">
                                                                    {
                                                                        companies.from
                                                                    }
                                                                </span>{" "}
                                                                to{" "}
                                                                <span className="font-medium">
                                                                    {
                                                                        companies.to
                                                                    }
                                                                </span>{" "}
                                                                of{" "}
                                                                <span className="font-medium">
                                                                    {
                                                                        companies.total
                                                                    }
                                                                </span>{" "}
                                                                results
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <select
                                                                value={
                                                                    companies.per_page
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    router.get(
                                                                        `/contacts/owners/${company.id}/tenants`,
                                                                        {
                                                                            ...filters,
                                                                            per_page:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            page: 1,
                                                                        }
                                                                    );
                                                                }}
                                                                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                            >
                                                                <option
                                                                    value={10}
                                                                >
                                                                    Show 10 per
                                                                    page
                                                                </option>
                                                                <option
                                                                    value={20}
                                                                >
                                                                    Show 20 per
                                                                    page
                                                                </option>
                                                                <option
                                                                    value={50}
                                                                >
                                                                    Show 50 per
                                                                    page
                                                                </option>
                                                                <option
                                                                    value={100}
                                                                >
                                                                    Show 100 per
                                                                    page
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
                                                                    .slice(
                                                                        1,
                                                                        -1
                                                                    )
                                                                    .map(
                                                                        (
                                                                            link,
                                                                            index
                                                                        ) => {
                                                                            if (
                                                                                link.url ===
                                                                                null
                                                                            ) {
                                                                                return (
                                                                                    <span
                                                                                        key={
                                                                                            index
                                                                                        }
                                                                                        className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
                                                                                    >
                                                                                        {
                                                                                            link.label
                                                                                        }
                                                                                    </span>
                                                                                );
                                                                            }
                                                                            return (
                                                                                <button
                                                                                    key={
                                                                                        index
                                                                                    }
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
                                                                                    {
                                                                                        link.label
                                                                                    }
                                                                                </button>
                                                                            );
                                                                        }
                                                                    )}
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
                                    </>
                                ) : (
                                    locations && (
                                        <div className="bg-white">
                                            <LocationsListView
                                                columns={locationColumns}
                                                data={locations.data}
                                                pagination={locations}
                                                showAdvancedFilters={
                                                    showAdvancedFilters
                                                }
                                                onCloseFilters={() =>
                                                    setShowAdvancedFilters(
                                                        false
                                                    )
                                                }
                                                onClearFilters={
                                                    handleClearFilters
                                                }
                                                onDoneFilters={() => {
                                                    setShowAdvancedFilters(
                                                        false
                                                    );
                                                }}
                                                activeFiltersCount={
                                                    activeFiltersCount
                                                }
                                                viewMode="list"
                                                storageKey={`owner-${company.id}-locations-column-widths`}
                                                renderCheckbox={() => (
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                            onClick={(e) =>
                                                                e.stopPropagation()
                                                            }
                                                        />
                                                    </div>
                                                )}
                                                renderActions={(row) => (
                                                    <button
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-600"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            console.log(
                                                                "Remove",
                                                                row.id
                                                            );
                                                        }}
                                                        title="Remove"
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </button>
                                                )}
                                                filters={filters}
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Advanced Filters Sidebar - Desktop */}
                        {showAdvancedFilters && (
                            <div className="hidden md:flex w-[600px] border-l border-gray-200 bg-white shrink-0 flex-col">
                                <AdvancedFiltersPanel
                                    isOpen={showAdvancedFilters}
                                    onClose={() =>
                                        setShowAdvancedFilters(false)
                                    }
                                    onClear={() => {
                                        router.get(
                                            `/contacts/owners/${company.id}/tenants`,
                                            {}
                                        );
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
                                    onClick={() =>
                                        setShowAdvancedFilters(false)
                                    }
                                />
                                {/* Panel */}
                                <div className="relative w-full max-w-sm ml-auto bg-white h-full flex flex-col shadow-xl">
                                    <AdvancedFiltersPanel
                                        isOpen={showAdvancedFilters}
                                        onClose={() =>
                                            setShowAdvancedFilters(false)
                                        }
                                        onClear={() => {
                                            router.get(
                                                `/contacts/owners/${company.id}/tenants`,
                                                {}
                                            );
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
            </CompanyDetailsLayout>
        </AppLayout>
    );
}
