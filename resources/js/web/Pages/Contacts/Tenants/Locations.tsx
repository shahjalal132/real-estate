import { useState, useCallback, useEffect } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AppLayout from "../../../Layouts/AppLayout";
import { PaginatedData, TennentLocation } from "../../../../types";
import LocationsFilterBar from "../../../../Components/Tenant/LocationsFilterBar";
import LocationsMapView from "../../../../Components/Tenant/LocationsMapView";
import LocationsGalleryView from "../../../../Components/Tenant/LocationsGalleryView";
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
                                            Address
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            City
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            State
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Country
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Tenant Name
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            SF Occupied
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Floor
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Space Use
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Moved In
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Commencement
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Expiration
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            % of Building
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Occupancy Type
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Rent/SF/year
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Rent Type
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Employees
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            SF/Employee
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Industry
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Star Rating
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Green Rating
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Building Name
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Building Park
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Center Name
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Property Type
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Secondary Type
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Center Type
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Market
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Submarket
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Location Type
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Landlord
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Landlord Rep
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Tenant Rep
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Best Tenant Contact
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Best Tenant Phone
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Location Phone
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Website
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Future Move
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Future Move Type
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Signed
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Suite
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Zip
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Time in Building
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Store Type
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            NAICS
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            SIC
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap">
                                            Property ID
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {locations.data.map((location) => (
                                        <tr
                                            key={location.id}
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
                                                                location.id
                                                            );
                                                        }}
                                                        title="Remove"
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                                                {location.address || "—"}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {location.city || "—"}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {location.state || "—"}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {location.country || "—"}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {location.company_id ? (
                                                    <Link
                                                        href={`/contacts/tenants/${location.company_id}`}
                                                        className="text-blue-600 hover:text-blue-800 hover:underline"
                                                    >
                                                        {location.tenant_name}
                                                    </Link>
                                                ) : (
                                                    location.tenant_name
                                                )}
                                            </td>
                                            <td className="px-4 py-4 text-right text-sm text-gray-500 whitespace-nowrap">
                                                {formatSF(location.sf_occupied)}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {location.floor || "—"}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {location.space_use || "—"}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {formatDate(location.moved_in)}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {formatDate(
                                                    location.commencement
                                                )}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {formatDate(
                                                    location.expiration
                                                )}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {formatPercent(
                                                    location.percent_of_building
                                                )}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {location.occupancy_type || "—"}
                                            </td>
                                            <td className="px-4 py-4 text-right text-sm text-gray-500 whitespace-nowrap">
                                                {formatCurrency(
                                                    location.rent_per_sf_year
                                                )}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {location.rent_type || "—"}
                                            </td>
                                            <td className="px-4 py-4 text-right text-sm text-gray-500 whitespace-nowrap">
                                                {formatNumber(
                                                    location.employees
                                                )}
                                            </td>
                                            <td className="px-4 py-4 text-right text-sm text-gray-500 whitespace-nowrap">
                                                {formatSF(
                                                    location.sf_per_employee
                                                )}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {location.industry || "—"}
                                            </td>
                                            <td className="px-4 py-4 text-right text-sm text-gray-500 whitespace-nowrap">
                                                {location.star_rating || "—"}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {location.green_rating || "—"}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {location.building_name || "—"}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {location.building_park || "—"}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {location.center_name || "—"}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {location.property_type || "—"}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {location.secondary_type || "—"}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {location.center_type || "—"}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {location.market || "—"}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {location.submarket || "—"}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {location.location_type || "—"}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {location.landlord || "—"}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {location.landlord_representative ||
                                                    "—"}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {location.tenant_representative ||
                                                    "—"}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {location.best_tenant_contact ||
                                                    "—"}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {formatPhone(
                                                    location.best_tenant_phone
                                                )}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {formatPhone(
                                                    location.location_phone
                                                )}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {location.website ? (
                                                    <a
                                                        href={formatUrl(
                                                            location.website
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
                                                {formatDate(
                                                    location.future_move
                                                )}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {location.future_move_type ||
                                                    "—"}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {formatDate(location.signed)}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {location.suite || "—"}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {location.zip || "—"}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {location.time_in_building ||
                                                    "—"}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {location.store_type || "—"}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {location.naics || "—"}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {location.sic || "—"}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {location.property_id || "—"}
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
