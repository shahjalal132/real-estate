import { PaginatedData, TennentLocation } from "../../types";
import LocationsFilterBar from "./LocationsFilterBar";
import LocationsMapView from "./LocationsMapView";
import LocationsGalleryView from "./LocationsGalleryView";
import { router } from "@inertiajs/react";
import { formatSF } from "../../utils/formatting";

interface CompanyLocationsTabProps {
    companyId: number;
    locations: PaginatedData<TennentLocation>;
    viewMode: "map" | "list" | "gallery";
    selectedLocationId: number | null;
    addressSearch: string;
    tenantSearch: string;
    filters: Record<string, any>;
    onViewModeChange: (mode: "map" | "list" | "gallery") => void;
    onLocationClick: (location: TennentLocation) => void;
    onAddressSearchChange: (value: string) => void;
    onTenantSearchChange: (value: string) => void;
    addViewModeToUrl: (url: string | null) => string | null;
}

export default function CompanyLocationsTab({
    companyId,
    locations,
    viewMode,
    selectedLocationId,
    addressSearch,
    tenantSearch,
    filters,
    onViewModeChange,
    onLocationClick,
    onAddressSearchChange,
    onTenantSearchChange,
    addViewModeToUrl,
}: CompanyLocationsTabProps) {
    return (
        <>
            <LocationsFilterBar
                addressSearch={addressSearch}
                tenantSearch={tenantSearch}
                onAddressSearchChange={onAddressSearchChange}
                onTenantSearchChange={onTenantSearchChange}
                onFiltersClick={() => {}}
                onSortClick={() => {}}
                onSaveClick={() => {}}
                onReportsClick={() => {}}
                onMoreClick={() => {}}
                viewMode={viewMode}
                onViewModeChange={onViewModeChange}
                activeFiltersCount={0}
            />

            {viewMode === "map" && (
                <div className="h-[calc(100vh-400px)]">
                    <LocationsMapView
                        locations={locations.data}
                        selectedLocationId={selectedLocationId}
                        onLocationClick={onLocationClick}
                    />
                </div>
            )}

            {viewMode === "list" && (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                                        Address
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                                        City
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                                        SF Occupied
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                                        Property Type
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {locations.data.map((location) => (
                                    <tr key={location.id}>
                                        <td className="px-4 py-4 text-sm text-gray-900">
                                            {location.address || "—"}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500">
                                            {location.city || "—"}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500">
                                            {formatSF(location.sf_occupied)}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500">
                                            {location.property_type || "—"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {viewMode === "gallery" && (
                <LocationsGalleryView
                    locations={locations.data}
                    onLocationClick={onLocationClick}
                />
            )}

            {/* Pagination */}
            {(viewMode === "list" || viewMode === "gallery") && (
                <div className="mt-4 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                    <div className="flex flex-1 justify-between sm:hidden">
                        <button
                            onClick={() => {
                                const url = addViewModeToUrl(locations.prev_page_url);
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
                                const url = addViewModeToUrl(locations.next_page_url);
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
                                Showing <span className="font-medium">{locations.from}</span> to{" "}
                                <span className="font-medium">{locations.to}</span> of{" "}
                                <span className="font-medium">{locations.total}</span> results
                            </p>
                        </div>
                        <nav className="flex items-center gap-2">
                            <button
                                onClick={() => {
                                    const url = addViewModeToUrl(locations.prev_page_url);
                                    if (url) {
                                        router.get(url);
                                    }
                                }}
                                disabled={!locations.prev_page_url}
                                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                            >
                                ‹
                            </button>
                            <button
                                onClick={() => {
                                    const url = addViewModeToUrl(locations.next_page_url);
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
            )}
        </>
    );
}

