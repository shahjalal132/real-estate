import { useState, useCallback, useEffect } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AppLayout from "@/web/Layouts/AppLayout";
import { PaginatedData } from "@/types";
import BrokersFilterBar from "@/Components/Broker/BrokersFilterBar";
import BrokersFilterSidebar from "@/Components/Broker/BrokersFilterSidebar";
import ResizableTable, {
    ResizableColumn,
} from "@/Components/ResizableTable/ResizableTable";
import BrokersGallery from "@/Components/Broker/BrokersGallery";
import { User } from "lucide-react";

interface DirectoryContact {
    id: number;
    name: string;
    company: string;
    title: string;
    specialty: string;
    property_type_focus: string;
    phone: string;
    email: string;
    linkedin: string;
    building_name: string;
    address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    website: string;
    lease_transactions_3y: number;
    lease_transactions_sf_3y: number;
    lease_listings: number;
    lease_listings_portfolio_sf: number;
    lease_listings_available_sf: number;
    sale_transactions_3y: number;
    sale_transactions_sf_3y: number;
    sale_transactions_volume_3y: number;
    sale_listings: number;
    sale_listings_sf: number;
}

interface PageProps {
    brokers: PaginatedData<DirectoryContact>;
    filters: {
        search?: string;
        specialty?: string;
        view?: "list" | "gallery";
        per_page?: string;
    };
    sort: {
        by: string;
        dir: string;
    };
}

export default function BrokersIndex({ brokers, filters }: PageProps) {
    const { url } = usePage();
    const activeTab = "contacts";
    // Initialize viewMode from filters prop, default to 'list'
    const [viewMode, setViewMode] = useState<"list" | "gallery">(
        filters.view || "list"
    );

    // Sync state if filters prop changes (e.g. back button)
    useEffect(() => {
        if (filters.view) {
            setViewMode(filters.view);
        }
    }, [filters.view]);

    const updateFilters = useCallback(
        (newFilters: Record<string, any>) => {
            router.get(
                "/contacts/brokers",
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

    const handleViewModeChange = useCallback(
        (mode: "list" | "gallery") => {
            setViewMode(mode);
            updateFilters({ view: mode });
        },
        [updateFilters]
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

    const handleSpecialtyChange = useCallback(
        (value: string) => {
            updateFilters({ specialty: value || undefined });
        },
        [updateFilters]
    );

    const formatNumber = (num: number | null | undefined): string => {
        if (num === null || num === undefined) return "—";
        return num.toLocaleString();
    };

    const columns: ResizableColumn[] = [
        {
            key: "name",
            label: "Name",
            align: "left",
            defaultWidth: 300,
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                        <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Link
                        href={`#`}
                        className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                    >
                        {row.name}
                    </Link>
                </div>
            ),
        },
        {
            key: "company",
            label: "Company",
            align: "left",
            defaultWidth: 300,
            render: (row) => (
                <span className="text-gray-900"> {row.company || "—"} </span>
            ),
        },
        {
            key: "title",
            label: "Title",
            align: "left",
            defaultWidth: 320,
            render: (row) => row.title || "—",
        },
        {
            key: "specialty",
            label: "Specialty",
            align: "left",
            defaultWidth: 300,
            render: (row) => row.specialty || "—",
        },
        {
            key: "property_type_focus",
            label: "Property Type Focus",
            align: "left",
            defaultWidth: 300,
            render: (row) => (
                <span
                    className="truncate block"
                    title={row.property_type_focus}
                >
                    {row.property_type_focus || "—"}
                </span>
            ),
        },
        {
            key: "phone",
            label: "Phone",
            align: "left",
            defaultWidth: 200,
            render: (row) => row.phone || "—",
        },
        {
            key: "mobile",
            label: "Mobile",
            align: "left",
            defaultWidth: 200,
            render: (row) => "—",
        },
        {
            key: "email",
            label: "Contact Info",
            align: "left",
            defaultWidth: 130,
            render: (row) => (
                <div className="flex gap-2">
                    {row.email && (
                        <a
                            href={`mailto:${row.email}`}
                            title={row.email}
                            className="text-blue-600 hover:underline"
                        >
                            Email
                        </a>
                    )}
                </div>
            ),
        },
        {
            key: "building_name",
            label: "Building Name",
            align: "left",
            defaultWidth: 270,
            render: (row) => row.building_name || "—",
        },
        {
            key: "address",
            label: "Address",
            align: "left",
            defaultWidth: 270,
            render: (row) => row.address || "—",
        },
        {
            key: "city",
            label: "City",
            align: "left",
            defaultWidth: 120,
            render: (row) => row.city || "—",
        },
        {
            key: "state",
            label: "State",
            align: "left",
            defaultWidth: 120,
            render: (row) => row.state || "—",
        },
        {
            key: "postal_code",
            label: "Postal Code",
            align: "left",
            defaultWidth: 150,
            render: (row) => row.postal_code || "—",
        },
        {
            key: "country",
            label: "Country",
            align: "left",
            defaultWidth: 180,
            render: (row) => row.country || "—",
        },
        {
            key: "website",
            label: "Website",
            align: "left",
            defaultWidth: 220,
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
                        {" "}
                        {row.website}{" "}
                    </a>
                ) : (
                    "—"
                ),
        },
        {
            key: "lease_transactions_3y",
            label: "Lease Transactions (3Y)",
            align: "right",
            defaultWidth: 240,
            render: (row) => formatNumber(row.lease_transactions_3y),
        },
        {
            key: "lease_transactions_sf_3y",
            label: "Lease Transactions SF (3Y)",
            align: "right",
            defaultWidth: 295,
            render: (row) => formatNumber(row.lease_transactions_sf_3y),
        },
        {
            key: "lease_listings",
            label: "Lease Listings",
            align: "right",
            defaultWidth: 220,
            render: (row) => formatNumber(row.lease_listings),
        },
        {
            key: "lease_listings_portfolio_sf",
            label: "Lease Listings Portfolio SF",
            align: "right",
            defaultWidth: 270,
            render: (row) => formatNumber(row.lease_listings_portfolio_sf),
        },
        {
            key: "lease_listings_available_sf",
            label: "Lease Listings Available SF",
            align: "right",
            defaultWidth: 295,
            render: (row) => formatNumber(row.lease_listings_available_sf),
        },
        {
            key: "sale_transactions_3y",
            label: "Sale Transactions (3Y)",
            align: "right",
            defaultWidth: 240,
            render: (row) => formatNumber(row.sale_transactions_3y),
        },
        {
            key: "sale_transactions_sf_3y",
            label: "Sale Transactions SF (3Y)",
            align: "right",
            defaultWidth: 275,
            render: (row) => formatNumber(row.sale_transactions_sf_3y),
        },
        {
            key: "sale_transactions_volume_3y",
            label: "Sale Transactions Volume (3Y)",
            align: "right",
            defaultWidth: 295,
            render: (row) => formatNumber(row.sale_transactions_volume_3y),
        },
        {
            key: "sale_listings",
            label: "Sale Listings",
            align: "right",
            defaultWidth: 220,
            render: (row) => formatNumber(row.sale_listings),
        },
        {
            key: "sale_listings_sf",
            label: "Sale Listings SF",
            align: "right",
            defaultWidth: 220,
            render: (row) => formatNumber(row.sale_listings_sf),
        },
    ];

    return (
        <AppLayout>
            <Head title="Brokers" />
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
                                    className={`text-sm font-semibold transition-colors text-gray-500 hover:text-gray-700`}
                                >
                                    Locations
                                </Link>
                                <Link
                                    href="/contacts/companies"
                                    className={`text-sm font-semibold transition-colors text-gray-500 hover:text-gray-700`}
                                >
                                    Companies
                                </Link>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-sm font-medium text-gray-600">
                                    {formatNumber(brokers.total)} Contacts
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="shrink-0">
                    <BrokersFilterBar
                        contactName={filters.search} // Mapping generic search to contact name for now
                        onContactNameChange={handleSearchChange}
                        onCompanyNameChange={(val) => {}} // Placeholder
                        specialty={filters.specialty}
                        onSpecialtyChange={handleSpecialtyChange}
                        onLocationChange={(val) => {}} // Placeholder
                        onSearch={handleSearch}
                        viewMode={viewMode}
                        onViewModeChange={handleViewModeChange}
                    />
                </div>

                {/* Main Content Area: Table/Gallery + Sidebar */}
                <div className="flex flex-1 min-h-0 overflow-hidden">
                    {/* Data Container */}
                    <div className="flex-1 flex flex-col min-w-0">
                        {/* List or Gallery View */}
                        <div className="flex-1 min-h-0 overflow-hidden px-4 sm:px-6 lg:px-8 pt-4">
                            {viewMode === "list" ? (
                                <ResizableTable
                                    columns={columns}
                                    data={brokers.data}
                                    storageKey="brokers-column-widths"
                                    className="h-full"
                                    onRowClick={(row) => {
                                        // router.visit(`/contacts/brokers/${row.id}`);
                                    }}
                                />
                            ) : (
                                <BrokersGallery brokers={brokers.data} />
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
                                                    {brokers.from}
                                                </span>{" "}
                                                to{" "}
                                                <span className="font-medium">
                                                    {brokers.to}
                                                </span>{" "}
                                                of{" "}
                                                <span className="font-medium">
                                                    {brokers.total}
                                                </span>{" "}
                                                results
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <select
                                                value={brokers.per_page}
                                                onChange={(e) => {
                                                    router.get(
                                                        "/contacts/brokers",
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
                                                    {" "}
                                                    Show 50 per page{" "}
                                                </option>
                                                <option value={100}>
                                                    {" "}
                                                    Show 100 per page{" "}
                                                </option>
                                            </select>
                                            <nav
                                                className="flex items-center gap-1"
                                                aria-label="Pagination"
                                            >
                                                {brokers.links.map(
                                                    (link, index) => {
                                                        return link.url ? (
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
                                                        );
                                                    }
                                                )}
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <BrokersFilterSidebar />
                </div>
            </div>
        </AppLayout>
    );
}
