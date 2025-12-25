import { useState, useCallback } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AppLayout from "../../../Layouts/AppLayout";
import { PaginatedData, TennentCompany } from "../../../../types";
import CompaniesFilterBar from "../../../../Components/Tenant/CompaniesFilterBar";
import {
    Info,
    Heart,
    MoreVertical,
    CheckSquare,
    Minus,
    Globe,
} from "lucide-react";

interface PageProps {
    companies: PaginatedData<TennentCompany>;
    filters: {
        search?: string;
        min_locations?: number;
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
    const [searchValue, setSearchValue] = useState(filters.search || "");
    const [retailersOnly, setRetailersOnly] = useState(
        filters.retailers_only || false
    );
    const activeTab = url.includes("/locations") ? "locations" : "companies";

    const handleSearch = useCallback(() => {
        router.get(
            "/contacts/tenants",
            {
                search: searchValue || undefined,
                retailers_only: retailersOnly || undefined,
                ...filters,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    }, [searchValue, retailersOnly, filters]);

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
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                    onSearch={handleSearch}
                    retailersOnly={retailersOnly}
                    onRetailersOnlyChange={(value) => {
                        setRetailersOnly(value);
                        handleSearch();
                    }}
                    onFiltersClick={() => {
                        // Handle filters click
                    }}
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

                {/* Table */}
                <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 py-4">
                    <div className="overflow-x-auto shadow-sm ring-1 ring-gray-200 ring-opacity-5 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="w-20 px-4 py-3 text-left">
                                        <div className="flex items-center gap-2">
                                            <CheckSquare className="h-4 w-4 text-gray-400" />
                                        </div>
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                        Tenant Name
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                        Industry
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                        Territory
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                        HQ Market
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                        Locations
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                        SF Occupied
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                        Highest Use By SF
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                        Employees
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                        Growth
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                        Revenue
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                        Credit Rating
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                        Established
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                        Parent Company
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                        Website
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                        HQ Phone
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                        HQ City
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                        HQ State
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                        HQ Postal Code
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                        HQ Country
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                        NAICS
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                        SIC
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {companies.data.map((company) => (
                                    <tr
                                        key={company.id}
                                        className="group hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <button
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-600"
                                                    onClick={() => {
                                                        // Handle remove action
                                                        console.log(
                                                            "Remove",
                                                            company.id
                                                        );
                                                    }}
                                                    title="Remove"
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                                            {company.tenant_name}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {company.industry || "—"}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {company.territory || "—"}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {company.hq_market || "—"}
                                        </td>
                                        <td className="px-4 py-4 text-right text-sm text-gray-500 whitespace-nowrap">
                                            {formatNumber(company.locations)}
                                        </td>
                                        <td className="px-4 py-4 text-right text-sm text-gray-500 whitespace-nowrap">
                                            {formatSF(company.sf_occupied)}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {company.highest_use_by_sf || "—"}
                                        </td>
                                        <td className="px-4 py-4 text-right text-sm text-gray-500 whitespace-nowrap">
                                            {formatNumber(company.employees)}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            <span
                                                className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                                                    company.growth === "Growing"
                                                        ? "bg-green-100 text-green-800"
                                                        : company.growth ===
                                                          "Downsizing"
                                                        ? "bg-red-100 text-red-800"
                                                        : "bg-gray-100 text-gray-800"
                                                }`}
                                            >
                                                {company.growth || "—"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-right text-sm text-gray-500 whitespace-nowrap">
                                            {formatCurrency(company.revenue)}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {company.credit_rating || "—"}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {formatYear(company.established)}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {company.parent_company || "—"}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {company.website ? (
                                                <a
                                                    href={formatUrl(
                                                        company.website
                                                    )}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 underline"
                                                >
                                                    <Globe className="h-4 w-4" />
                                                </a>
                                            ) : (
                                                "—"
                                            )}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {formatPhone(company.hq_phone)}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {company.hq_city || "—"}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {company.hq_state || "—"}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {company.hq_postal_code || "—"}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {company.hq_country || "—"}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {company.naics || "—"}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {company.sic || "—"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                        <div className="flex flex-1 justify-between sm:hidden">
                            <button
                                onClick={() => {
                                    if (companies.prev_page_url) {
                                        router.get(companies.prev_page_url);
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
                                        router.get(companies.next_page_url);
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
                                        router.get("/contacts/tenants", {
                                            ...filters,
                                            per_page: e.target.value,
                                            page: 1,
                                        });
                                    }}
                                    className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value={10}>Show 10 per page</option>
                                    <option value={20}>Show 20 per page</option>
                                    <option value={50}>Show 50 per page</option>
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
                                            if (companies.prev_page_url) {
                                                router.get(
                                                    companies.prev_page_url
                                                );
                                            }
                                        }}
                                        disabled={!companies.prev_page_url}
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
                                                        router.get(link.url!)
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
                                            if (companies.next_page_url) {
                                                router.get(
                                                    companies.next_page_url
                                                );
                                            }
                                        }}
                                        disabled={!companies.next_page_url}
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
        </AppLayout>
    );
}
