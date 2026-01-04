import { router } from "@inertiajs/react";
import { PaginatedData } from "@/types";
import ResizableTable, { ResizableColumn } from "@/Components/ResizableTable/ResizableTable";
import LocationsAdvancedFiltersPanel from "./LocationsAdvancedFiltersPanel";
import { Minus } from "lucide-react";

interface LocationsListViewProps<T> {
    columns: ResizableColumn[];
    data: T[];
    pagination: PaginatedData<T>;
    showAdvancedFilters: boolean;
    onCloseFilters: () => void;
    onClearFilters: () => void;
    onDoneFilters: () => void;
    activeFiltersCount: number;
    viewMode: string;
    storageKey?: string;
    renderCheckbox?: (row: T) => React.ReactNode;
    renderActions?: (row: T) => React.ReactNode;
    filters?: Record<string, any>;
}

export default function LocationsListView<T extends { id: number | string }>({
    columns,
    data,
    pagination,
    showAdvancedFilters,
    onCloseFilters,
    onClearFilters,
    onDoneFilters,
    activeFiltersCount,
    viewMode,
    storageKey = "locations-column-widths",
    renderCheckbox,
    renderActions,
    filters = {},
}: LocationsListViewProps<T>) {
    // Helper to add view_mode to URL string
    const addViewModeToUrl = (urlString: string | null): string | null => {
        if (!urlString) return null;
        try {
            const url = new URL(urlString, window.location.origin);
            url.searchParams.set("view_mode", viewMode);
            return url.pathname + url.search;
        } catch {
            return urlString;
        }
    };

    return (
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
                        data={data}
                        storageKey={storageKey}
                        renderCheckbox={renderCheckbox}
                        renderActions={renderActions}
                    />

                    {/* Pagination */}
                    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                        <div className="flex flex-1 justify-between sm:hidden">
                            <button
                                onClick={() => {
                                    const url = addViewModeToUrl(
                                        pagination.prev_page_url
                                    );
                                    if (url) {
                                        router.get(url);
                                    }
                                }}
                                disabled={!pagination.prev_page_url}
                                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => {
                                    const url = addViewModeToUrl(
                                        pagination.next_page_url
                                    );
                                    if (url) {
                                        router.get(url);
                                    }
                                }}
                                disabled={!pagination.next_page_url}
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
                                        {pagination.from}
                                    </span>{" "}
                                    to{" "}
                                    <span className="font-medium">
                                        {pagination.to}
                                    </span>{" "}
                                    of{" "}
                                    <span className="font-medium">
                                        {pagination.total}
                                    </span>{" "}
                                    results
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <select
                                    value={pagination.per_page}
                                    onChange={(e) => {
                                        router.get(
                                            window.location.pathname,
                                            {
                                                ...filters,
                                                per_page: e.target.value,
                                                page: 1,
                                                view_mode: viewMode,
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
                                            const url = addViewModeToUrl(
                                                pagination.prev_page_url
                                            );
                                            if (url) {
                                                router.get(url);
                                            }
                                        }}
                                        disabled={!pagination.prev_page_url}
                                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        ‹
                                    </button>
                                    {pagination.links
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
                                                pagination.next_page_url
                                            );
                                            if (url) {
                                                router.get(url);
                                            }
                                        }}
                                        disabled={!pagination.next_page_url}
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
                    <LocationsAdvancedFiltersPanel
                        isOpen={showAdvancedFilters}
                        onClose={onCloseFilters}
                        onClear={onClearFilters}
                        onDone={onDoneFilters}
                        activeFiltersCount={activeFiltersCount}
                    />
                </div>
            )}
        </div>
    );
}

