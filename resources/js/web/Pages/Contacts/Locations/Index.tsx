import { useState, useCallback, useEffect } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AppLayout from "@/web/Layouts/AppLayout";
import { PaginatedData } from "@/types";
import BrokersFilterBar from "@/Components/Broker/BrokersFilterBar";
import BrokersFilterSidebar from "@/Components/Broker/BrokersFilterSidebar";
import ResizableTable, {
    ResizableColumn,
} from "@/Components/ResizableTable/ResizableTable";
import { MapPin } from "lucide-react";
import LocationsGallery from "@/Components/Location/LocationsGallery";

interface DirectoryLocation {
    id: number;
    company: string;
    specialty: string;
    building_name: string;
    address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    website: string;
    location_employees: number;
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
    locations: PaginatedData<DirectoryLocation>;
    filters: {
        search?: string;
        location?: string;
        view?: "list" | "gallery";
        per_page?: string;
    };
    sort: {
        by: string;
        dir: string;
    };
}

export default function LocationsIndex({ locations, filters }: PageProps) {
    const { url } = usePage();
    const activeTab = "locations";
    const [viewMode, setViewMode] = useState<"list" | "gallery">(
        filters.view || "list"
    );

    useEffect(() => {
        if (filters.view) {
            setViewMode(filters.view);
        }
    }, [filters.view]);

    const updateFilters = useCallback(
        (newFilters: Record<string, any>) => {
            router.get(
                "/contacts/locations",
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

    const handleLocationChange = useCallback(
        (value: string) => {
            updateFilters({ location: value || undefined });
        },
        [updateFilters]
    );

    const formatNumber = (num: number | null | undefined): string => {
        if (num === null || num === undefined) return "—";
        return num.toLocaleString();
    };

    const columns: ResizableColumn[] = [
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
            key: "building_name",
            label: "Building Name",
            align: "left",
            defaultWidth: 200,
            render: (row) => row.building_name || "—",
        },
        {
            key: "address",
            label: "Address",
            align: "left",
            defaultWidth: 350,
            render: (row) => (
                <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400 shrink-0" />
                    <span>
                        {row.address ? `${row.address}, ` : ""}
                        {row.city ? `${row.city}, ` : ""}
                        {row.state} {row.postal_code}
                    </span>
                </div>
            ),
        },
        {
            key: "city",
            label: "City",
            align: "left",
            defaultWidth: 150,
            render: (row) => row.city || "—",
        },
        {
            key: "state",
            label: "State",
            align: "left",
            defaultWidth: 100,
            render: (row) => row.state || "—",
        },
        {
            key: "postal_code",
            label: "Postal Code",
            align: "left",
            defaultWidth: 120,
            render: (row) => row.postal_code || "—",
        },
        {
            key: "country",
            label: "Country",
            align: "left",
            defaultWidth: 150,
            render: (row) => row.country || "—",
        },
        {
            key: "specialty",
            label: "Specialty",
            align: "left",
            defaultWidth: 200,
            render: (row) => row.specialty || "—",
        },
        {
            key: "location_employees",
            label: "Employees",
            align: "right",
            defaultWidth: 120,
            render: (row) => formatNumber(row.location_employees),
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
            key: "lease_transactions_3y",
            label: "Lease Trans (3Y)",
            align: "right",
            defaultWidth: 150,
            render: (row) => formatNumber(row.lease_transactions_3y),
        },
        {
            key: "lease_transactions_sf_3y",
            label: "Lease Trans SF (3Y)",
            align: "right",
            defaultWidth: 180,
            render: (row) => formatNumber(row.lease_transactions_sf_3y),
        },
        {
            key: "lease_listings",
            label: "Lease Listings",
            align: "right",
            defaultWidth: 150,
            render: (row) => formatNumber(row.lease_listings),
        },
        {
            key: "lease_listings_portfolio_sf",
            label: "Lease Ptfl SF",
            align: "right",
            defaultWidth: 180,
            render: (row) => formatNumber(row.lease_listings_portfolio_sf),
        },
        {
            key: "lease_listings_available_sf",
            label: "Lease Avail SF",
            align: "right",
            defaultWidth: 180,
            render: (row) => formatNumber(row.lease_listings_available_sf),
        },
        {
            key: "sale_transactions_3y",
            label: "Sale Trans (3Y)",
            align: "right",
            defaultWidth: 150,
            render: (row) => formatNumber(row.sale_transactions_3y),
        },
        {
            key: "sale_transactions_sf_3y",
            label: "Sale Trans SF (3Y)",
            align: "right",
            defaultWidth: 180,
            render: (row) => formatNumber(row.sale_transactions_sf_3y),
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
        {
            key: "sale_listings",
            label: "Sale Listings",
            align: "right",
            defaultWidth: 150,
            render: (row) => formatNumber(row.sale_listings),
        },
        {
            key: "sale_listings_sf",
            label: "Sale Listings SF",
            align: "right",
            defaultWidth: 180,
            render: (row) => formatNumber(row.sale_listings_sf),
        },
    ];

    return (
        <AppLayout>
            <Head title="Locations" />
            <div className="flex flex-col h-screen bg-white overflow-hidden max-h-[calc(100vh-8vh)]">
                {/* Header with Tabs */}
                <div className="border-b border-gray-200 bg-white shrink-0">
                    <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between py-3">
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/contacts/brokers"
                                    className={`text-sm font-semibold transition-colors ${
                                        activeTab === "brokers"
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
                                    className={`text-sm font-semibold transition-colors text-gray-500 hover:text-gray-700`}
                                >
                                    Companies
                                </Link>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-sm font-medium text-gray-600">
                                    {formatNumber(locations.total)} Locations
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="shrink-0">
                    <BrokersFilterBar
                        contactName="" // Not relevant
                        onContactNameChange={() => {}}
                        companyName={filters.search} // Use generic search as company name input for now or keep separate
                        onCompanyNameChange={handleSearchChange} // Mapping Company Name input to search filter
                        specialty=""
                        onSpecialtyChange={() => {}}
                        location={filters.location}
                        onLocationChange={handleLocationChange}
                        onSearch={handleSearch}
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
                                    data={locations.data}
                                    storageKey="locations-column-widths"
                                    className="h-full"
                                />
                            ) : (
                                <div className="overflow-y-auto h-full pr-2">
                                    <LocationsGallery
                                        locations={locations.data}
                                    />
                                </div>
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
                                                    {" "}
                                                    {locations.from}{" "}
                                                </span>{" "}
                                                to{" "}
                                                <span className="font-medium">
                                                    {locations.to}
                                                </span>{" "}
                                                of{" "}
                                                <span className="font-medium">
                                                    {" "}
                                                    {locations.total}{" "}
                                                </span>{" "}
                                                results
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <select
                                                value={locations.per_page}
                                                onChange={(e) => {
                                                    router.get(
                                                        "/contacts/locations",
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
                                                    {" "}
                                                    Show 10 per page{" "}
                                                </option>
                                                <option value={20}>
                                                    {" "}
                                                    Show 20 per page{" "}
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
                                            <nav className="flex items-center gap-1">
                                                {locations.links.map(
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
