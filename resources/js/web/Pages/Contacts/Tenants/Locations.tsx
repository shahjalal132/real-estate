import { useState, useCallback, useEffect } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AppLayout from "../../../Layouts/AppLayout";
import { PaginatedData, TennentLocation } from "../../../../types";
import LocationsFilterBar from "../../../../Components/Tenant/LocationsFilterBar";
import LocationsMapView from "../../../../Components/Tenant/LocationsMapView";
import LocationsGalleryView from "../../../../Components/Tenant/LocationsGalleryView";
import ResizableTable, { ResizableColumn } from "../../../../Components/ResizableTable/ResizableTable";
import {
    Info,
    Heart,
    MoreVertical,
    CheckSquare,
    Minus,
    Globe,
} from "lucide-react";

interface PageProps {
    locations: PaginatedData<TennentLocation>;
    filters: {
        search?: string;
        min_sf_occupied?: number;
        max_sf_occupied?: number;
        industry?: string;
        city?: string;
        state?: string;
        market?: string;
        property_type?: string;
    };
    sort: {
        by: string;
        dir: string;
    };
}

export default function TenantLocations({ locations, filters }: PageProps) {
    const { url } = usePage();
    const [addressSearch, setAddressSearch] = useState("");
    const [tenantSearch, setTenantSearch] = useState(filters.search || "");

    // Get view mode from URL or default to "map"
    const getViewModeFromUrl = (): "map" | "list" | "gallery" => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const mode = params.get("view_mode");
            if (mode === "map" || mode === "list" || mode === "gallery") {
                return mode;
            }
        }
        return "map";
    };

    const [viewMode, setViewMode] = useState<"map" | "list" | "gallery">(
        getViewModeFromUrl()
    );
    const [selectedLocationId, setSelectedLocationId] = useState<number | null>(
        null
    );
    const activeTab = url.includes("/locations") ? "locations" : "companies";

    // Update view mode from URL on mount and when URL changes (but only if it's different)
    useEffect(() => {
        const mode = getViewModeFromUrl();
        setViewMode((currentMode) => {
            // Only update if different to avoid unnecessary re-renders
            return mode !== currentMode ? mode : currentMode;
        });
    }, [url]);

    // Helper to preserve view mode in navigation
    const preserveViewMode = useCallback(
        (params: Record<string, any> = {}) => {
            return {
                ...params,
                view_mode: viewMode,
            };
        },
        [viewMode]
    );

    // Helper to add view_mode to URL string
    const addViewModeToUrl = useCallback(
        (urlString: string | null): string | null => {
            if (!urlString) return null;
            try {
                const url = new URL(urlString, window.location.origin);
                url.searchParams.set("view_mode", viewMode);
                return url.pathname + url.search;
            } catch {
                return urlString;
            }
        },
        [viewMode]
    );

    const handleSearch = useCallback(() => {
        router.get(
            "/contacts/tenants/locations",
            preserveViewMode({
                search: tenantSearch || undefined,
                address_search: addressSearch || undefined,
                ...filters,
            }),
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    }, [tenantSearch, addressSearch, filters, preserveViewMode]);

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

    const formatCurrency = (
        value: string | number | null | undefined
    ): string => {
        if (value === null || value === undefined) return "—";
        const num = typeof value === "string" ? parseFloat(value) : value;
        if (isNaN(num)) return "—";
        return `$${num.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;
    };

    const formatPercent = (
        value: string | number | null | undefined
    ): string => {
        if (value === null || value === undefined) return "—";
        const num = typeof value === "string" ? parseFloat(value) : value;
        if (isNaN(num)) return "—";
        return `${num.toFixed(2)}%`;
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
            render: (row) =>
                row.company_id ? (
                    <Link
                        href={`/contacts/tenants/${row.company_id}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {row.tenant_name}
                    </Link>
                ) : (
                    row.tenant_name
                ),
        },
        {
            key: "sf_occupied",
            label: "SF Occupied",
            align: "right",
            defaultWidth: 120,
            render: (row) => formatSF(row.sf_occupied),
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
            render: (row) => formatDate(row.moved_in),
        },
        {
            key: "commencement",
            label: "Commencement",
            align: "left",
            defaultWidth: 130,
            render: (row) => formatDate(row.commencement),
        },
        {
            key: "expiration",
            label: "Expiration",
            align: "left",
            defaultWidth: 120,
            render: (row) => formatDate(row.expiration),
        },
        {
            key: "percent_of_building",
            label: "% of Building",
            align: "left",
            defaultWidth: 120,
            render: (row) => formatPercent(row.percent_of_building),
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
            render: (row) => formatCurrency(row.rent_per_sf_year),
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
            render: (row) => formatNumber(row.employees),
        },
        {
            key: "sf_per_employee",
            label: "SF/Employee",
            align: "right",
            defaultWidth: 130,
            render: (row) => formatSF(row.sf_per_employee),
        },
        {
            key: "industry",
            label: "Industry",
            align: "left",
            defaultWidth: 150,
        },
        {
            key: "star_rating",
            label: "Star Rating",
            align: "right",
            defaultWidth: 120,
        },
        {
            key: "green_rating",
            label: "Green Rating",
            align: "left",
            defaultWidth: 120,
        },
        {
            key: "building_name",
            label: "Building Name",
            align: "left",
            defaultWidth: 180,
        },
        {
            key: "building_park",
            label: "Building Park",
            align: "left",
            defaultWidth: 150,
        },
        {
            key: "center_name",
            label: "Center Name",
            align: "left",
            defaultWidth: 150,
        },
        {
            key: "property_type",
            label: "Property Type",
            align: "left",
            defaultWidth: 140,
        },
        {
            key: "secondary_type",
            label: "Secondary Type",
            align: "left",
            defaultWidth: 140,
        },
        {
            key: "center_type",
            label: "Center Type",
            align: "left",
            defaultWidth: 130,
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
        {
            key: "location_type",
            label: "Location Type",
            align: "left",
            defaultWidth: 140,
        },
        {
            key: "landlord",
            label: "Landlord",
            align: "left",
            defaultWidth: 150,
        },
        {
            key: "landlord_representative",
            label: "Landlord Rep",
            align: "left",
            defaultWidth: 150,
        },
        {
            key: "tenant_representative",
            label: "Tenant Rep",
            align: "left",
            defaultWidth: 150,
        },
        {
            key: "best_tenant_contact",
            label: "Best Tenant Contact",
            align: "left",
            defaultWidth: 180,
        },
        {
            key: "best_tenant_phone",
            label: "Best Tenant Phone",
            align: "left",
            defaultWidth: 150,
            render: (row) => formatPhone(row.best_tenant_phone),
        },
        {
            key: "location_phone",
            label: "Location Phone",
            align: "left",
            defaultWidth: 150,
            render: (row) => formatPhone(row.location_phone),
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
            key: "future_move",
            label: "Future Move",
            align: "left",
            defaultWidth: 130,
            render: (row) => formatDate(row.future_move),
        },
        {
            key: "future_move_type",
            label: "Future Move Type",
            align: "left",
            defaultWidth: 150,
        },
        {
            key: "signed",
            label: "Signed",
            align: "left",
            defaultWidth: 120,
            render: (row) => formatDate(row.signed),
        },
        {
            key: "suite",
            label: "Suite",
            align: "left",
            defaultWidth: 100,
        },
        {
            key: "zip",
            label: "Zip",
            align: "left",
            defaultWidth: 100,
        },
        {
            key: "time_in_building",
            label: "Time in Building",
            align: "left",
            defaultWidth: 150,
        },
        {
            key: "store_type",
            label: "Store Type",
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
        {
            key: "property_id",
            label: "Property ID",
            align: "left",
            defaultWidth: 120,
        },
    ];

    return (
        <AppLayout>
            <Head title="Tenant Locations" />
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
                                    {formatNumber(locations.total)} Tenant
                                    Locations / {formatNumber(locations.total)}{" "}
                                    Properties
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
                <LocationsFilterBar
                    addressSearch={addressSearch}
                    tenantSearch={tenantSearch}
                    onAddressSearchChange={(value) => {
                        setAddressSearch(value);
                        handleSearch();
                    }}
                    onTenantSearchChange={(value) => {
                        setTenantSearch(value);
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
                    onReportsClick={() => {
                        // Handle reports click
                    }}
                    onMoreClick={() => {
                        // Handle more click
                    }}
                    viewMode={viewMode}
                    onViewModeChange={(mode) => {
                        // Update state immediately for instant UI feedback
                        setViewMode(mode);
                        // Update URL with view mode
                        router.get(
                            "/contacts/tenants/locations",
                            {
                                ...filters,
                                search: tenantSearch || undefined,
                                address_search: addressSearch || undefined,
                                view_mode: mode,
                            },
                            {
                                preserveState: true,
                                preserveScroll: true,
                                only: ["locations", "filters"], // Only reload these props, not the whole page
                            }
                        );
                    }}
                    activeFiltersCount={activeFiltersCount}
                />

                {/* Content based on view mode */}
                {viewMode === "map" && (
                    <div className="h-[calc(100vh-200px)]">
                        <LocationsMapView
                            locations={locations.data}
                            selectedLocationId={selectedLocationId}
                            onLocationClick={(location) => {
                                setSelectedLocationId(location.id);
                            }}
                        />
                    </div>
                )}

                {viewMode === "list" && (
                    <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 py-4">
                        <ResizableTable
                            columns={columns}
                            data={locations.data}
                            storageKey="tenant-locations-column-widths"
                            renderCheckbox={(row) => (
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
                                        const url = addViewModeToUrl(
                                            locations.prev_page_url
                                        );
                                        if (url) {
                                            router.get(url);
                                        }
                                    }}
                                    disabled={!locations.prev_page_url}
                                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => {
                                        const url = addViewModeToUrl(
                                            locations.next_page_url
                                        );
                                        if (url) {
                                            router.get(url);
                                        }
                                    }}
                                    disabled={!locations.next_page_url}
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
                                            {locations.from}
                                        </span>{" "}
                                        to{" "}
                                        <span className="font-medium">
                                            {locations.to}
                                        </span>{" "}
                                        of{" "}
                                        <span className="font-medium">
                                            {locations.total}
                                        </span>{" "}
                                        results
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <select
                                        value={locations.per_page}
                                        onChange={(e) => {
                                            router.get(
                                                "/contacts/tenants/locations",
                                                preserveViewMode({
                                                    ...filters,
                                                    per_page: e.target.value,
                                                    page: 1,
                                                })
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
                                                const url = addViewModeToUrl(
                                                    locations.prev_page_url
                                                );
                                                if (url) {
                                                    router.get(url);
                                                }
                                            }}
                                            disabled={!locations.prev_page_url}
                                            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            ‹
                                        </button>
                                        {locations.links
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
                                                        onClick={() => {
                                                            const url =
                                                                addViewModeToUrl(
                                                                    link.url
                                                                );
                                                            if (url) {
                                                                router.get(url);
                                                            }
                                                        }}
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
                                                const url = addViewModeToUrl(
                                                    locations.next_page_url
                                                );
                                                if (url) {
                                                    router.get(url);
                                                }
                                            }}
                                            disabled={!locations.next_page_url}
                                            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            ›
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {viewMode === "gallery" && (
                    <div className="mx-auto max-w-[1920px]">
                        <LocationsGalleryView
                            locations={locations.data}
                            onLocationClick={(location) => {
                                setSelectedLocationId(location.id);
                            }}
                        />
                        {/* Pagination for Gallery */}
                        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                            <div className="flex flex-1 justify-between sm:hidden">
                                <button
                                    onClick={() => {
                                        const url = addViewModeToUrl(
                                            locations.prev_page_url
                                        );
                                        if (url) {
                                            router.get(url);
                                        }
                                    }}
                                    disabled={!locations.prev_page_url}
                                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => {
                                        const url = addViewModeToUrl(
                                            locations.next_page_url
                                        );
                                        if (url) {
                                            router.get(url);
                                        }
                                    }}
                                    disabled={!locations.next_page_url}
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
                                            {locations.from}
                                        </span>{" "}
                                        to{" "}
                                        <span className="font-medium">
                                            {locations.to}
                                        </span>{" "}
                                        of{" "}
                                        <span className="font-medium">
                                            {locations.total}
                                        </span>{" "}
                                        results
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <select
                                        value={locations.per_page}
                                        onChange={(e) => {
                                            router.get(
                                                "/contacts/tenants/locations",
                                                preserveViewMode({
                                                    ...filters,
                                                    per_page: e.target.value,
                                                    page: 1,
                                                })
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
                                                const url = addViewModeToUrl(
                                                    locations.prev_page_url
                                                );
                                                if (url) {
                                                    router.get(url);
                                                }
                                            }}
                                            disabled={!locations.prev_page_url}
                                            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            ‹
                                        </button>
                                        {locations.links
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
                                                        onClick={() => {
                                                            const url =
                                                                addViewModeToUrl(
                                                                    link.url
                                                                );
                                                            if (url) {
                                                                router.get(url);
                                                            }
                                                        }}
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
                                                const url = addViewModeToUrl(
                                                    locations.next_page_url
                                                );
                                                if (url) {
                                                    router.get(url);
                                                }
                                            }}
                                            disabled={!locations.next_page_url}
                                            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            ›
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
