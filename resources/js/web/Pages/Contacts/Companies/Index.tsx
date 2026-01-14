import React from "react";
import AppLayout from "@/web/Layouts/AppLayout";
import { Head, Link, router } from "@inertiajs/react";
import ResizableTable, {
    ResizableColumn,
} from "@/Components/ResizableTable/ResizableTable";
import BrokersFilterBar from "@/Components/Broker/BrokersFilterBar";
import BrokersFilterSidebar from "@/Components/Broker/BrokersFilterSidebar";
import CompaniesGallery from "@/Components/Company/CompaniesGallery";

interface DirectoryBrokerCompany {
    id: number;
    company: string;
    specialty: string | null;
    hq_city: string | null;
    hq_state: string | null;
    website: string | null;
    employees: number | null;
    locations: number | null;
    lease_transactions_3y: number | null;
    sale_transactions_volume_3y: number | null;
    [key: string]: any; // Allow other properties
}

interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

interface Props {
    companies: PaginatedData<DirectoryBrokerCompany>;
    filters: {
        search?: string;
        hq_city?: string;
        hq_state?: string;
        specialty?: string;
        view?: "list" | "gallery";
        per_page?: string;
    };
    sort: {
        column: string;
        direction: "asc" | "desc";
    };
}

export default function CompaniesIndex({ companies, filters, sort }: Props) {
    const [viewMode, setViewMode] = React.useState<"list" | "gallery">(
        filters.view || "list"
    );

    // Update URL when view mode changes
    const handleViewModeChange = (mode: "list" | "gallery") => {
        setViewMode(mode);
        router.get(
            "/contacts/companies",
            { ...filters, view: mode },
            { preserveState: true, replace: true }
        );
    };

    const handleSearch = (term: string) => {
        router.get(
            "/contacts/companies",
            { ...filters, search: term, page: 1 },
            { preserveState: true, replace: true }
        );
    };

    const handleFilterChange = (key: string, value: string) => {
        router.get(
            "/contacts/companies",
            { ...filters, [key]: value, page: 1 },
            { preserveState: true, replace: true }
        );
    };

    const activeTab = "companies";

    const formatNumber = (num: number | null | undefined): string => {
        if (num === null || num === undefined) return "—";
        return num.toLocaleString();
    };

    const columns: ResizableColumn<DirectoryBrokerCompany>[] = [
        {
            key: "company",
            label: "Company",
            align: "left",
            defaultWidth: 250,
            render: (row) => (
                <div className="font-medium text-gray-900">
                    {row.company || "—"}
                </div>
            ),
        },
        {
            key: "specialty",
            label: "Specialty",
            align: "left",
            defaultWidth: 200,
            render: (row) => row.specialty || "—",
        },
        {
            key: "hq_city",
            label: "HQ City",
            align: "left",
            defaultWidth: 150,
            render: (row) => row.hq_city || "—",
        },
        {
            key: "hq_state",
            label: "HQ State",
            align: "left",
            defaultWidth: 100,
            render: (row) => row.hq_state || "—",
        },
        {
            key: "website",
            label: "Website",
            align: "left",
            defaultWidth: 200,
            render: (row) =>
                row.website ? (
                    <a
                        href={
                            row.website.startsWith("http")
                                ? row.website
                                : `https://${row.website}`
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline truncate block"
                    >
                        {row.website}
                    </a>
                ) : (
                    "—"
                ),
        },
        {
            key: "employees",
            label: "Employees",
            align: "right",
            defaultWidth: 120,
            render: (row) => formatNumber(row.employees),
        },
        {
            key: "locations",
            label: "Locations",
            align: "right",
            defaultWidth: 120,
            render: (row) => formatNumber(row.locations),
        },
        {
            key: "lease_transactions_3y",
            label: "Lease Trans (3Y)",
            align: "right",
            defaultWidth: 150,
            render: (row) => formatNumber(row.lease_transactions_3y),
        },
        {
            key: "sale_transactions_volume_3y",
            label: "Sale Vol (3Y)",
            align: "right",
            defaultWidth: 200,
            render: (row) =>
                row.sale_transactions_volume_3y
                    ? `$${formatNumber(row.sale_transactions_volume_3y)}`
                    : "—",
        },
    ];

    return (
        <AppLayout>
            <Head title="Companies" />
            <div className="flex flex-col h-screen bg-white overflow-hidden max-h-[calc(100vh-8vh)]">
                {/* Header with Tabs */}
                <div className="border-b border-gray-200 bg-white shrink-0">
                    <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between py-3">
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/contacts/brokers"
                                    className={`text-sm font-semibold transition-colors ${
                                        activeTab === "contacts"
                                            ? "text-red-600 border-b-2 border-red-600 pb-2"
                                            : "text-gray-500 hover:text-gray-700"
                                    }`}
                                >
                                    Contacts
                                </Link>
                                <Link
                                    href="/contacts/locations"
                                    className={`text-sm font-semibold transition-colors ${
                                        activeTab === "locations"
                                            ? "text-red-600 border-b-2 border-red-600 pb-2"
                                            : "text-gray-500 hover:text-gray-700"
                                    }`}
                                >
                                    Locations
                                </Link>
                                <Link
                                    href="/contacts/companies"
                                    className={`text-sm font-semibold transition-colors ${
                                        activeTab === "companies"
                                            ? "text-red-600 border-b-2 border-red-600 pb-2"
                                            : "text-gray-500 hover:text-gray-700"
                                    }`}
                                >
                                    Companies
                                </Link>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-sm font-medium text-gray-600">
                                    {formatNumber(companies.total)} Companies
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="shrink-0">
                    <BrokersFilterBar
                        contactName=""
                        onContactNameChange={() => {}}
                        companyName={filters.search}
                        onCompanyNameChange={(val) => handleSearch(val)}
                        specialty={filters.specialty}
                        onSpecialtyChange={(val) =>
                            handleFilterChange("specialty", val)
                        }
                        location={filters.hq_city} // Mapping location to hq_city for now
                        onLocationChange={(val) =>
                            handleFilterChange("hq_city", val)
                        }
                        onSearch={() => {}}
                        viewMode={viewMode}
                        onViewModeChange={handleViewModeChange}
                    />
                </div>

                {/* Main Content Area */}
                <div className="flex flex-1 min-h-0 overflow-hidden">
                    <div className="flex-1 flex flex-col min-w-0">
                        {/* Data View */}
                        <div className="flex-1 min-h-0 overflow-hidden px-4 sm:px-6 lg:px-8 pt-4">
                            {viewMode === "list" ? (
                                <ResizableTable
                                    columns={columns}
                                    data={companies.data}
                                    storageKey="companies-column-widths"
                                    className="h-full"
                                />
                            ) : (
                                <CompaniesGallery companies={companies.data} />
                            )}
                        </div>

                        {/* Pagination */}
                        <div className="shrink-0 border-t border-gray-200 bg-white">
                            <div className="mx-auto max-w-[1920px] w-full px-4 sm:px-6 lg:px-8">
                                <div className="flex items-center justify-between bg-white py-2">
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
                                                        "/contacts/companies",
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
                                            <nav className="flex items-center gap-1">
                                                {companies.links.map(
                                                    (link, index) =>
                                                        link.url ? (
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
                                                                dangerouslySetInnerHTML={{
                                                                    __html: link.label,
                                                                }}
                                                            />
                                                        ) : (
                                                            <span
                                                                key={index}
                                                                className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: link.label,
                                                                }}
                                                            />
                                                        )
                                                )}
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar - Optional or reused */}
                    <BrokersFilterSidebar />
                </div>
            </div>
        </AppLayout>
    );
}
