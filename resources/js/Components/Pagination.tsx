import { router } from "@inertiajs/react";
import { PaginatedData } from "@/types";

interface PaginationProps {
    data: PaginatedData<any>;
    filters?: Record<string, any>;
    baseUrl?: string;
    className?: string;
}

export default function Pagination({
    data,
    filters = {},
    baseUrl,
    className = "",
}: PaginationProps) {
    const handlePageChange = (url: string | null) => {
        if (url) {
            router.get(url);
        }
    };

    const handlePerPageChange = (perPage: number) => {
        const url = baseUrl || window.location.pathname;
        router.get(url, {
            ...filters,
            per_page: perPage,
            page: 1,
        });
    };

    return (
        <div
            className={`flex items-center justify-between bg-white py-2 ${className}`}
        >
            {/* Mobile Pagination */}
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    onClick={() => handlePageChange(data.prev_page_url)}
                    disabled={!data.prev_page_url}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <button
                    onClick={() => handlePageChange(data.next_page_url)}
                    disabled={!data.next_page_url}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>

            {/* Desktop Pagination */}
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-xs text-gray-700">
                        Showing{" "}
                        <span className="font-medium">{data.from}</span> to{" "}
                        <span className="font-medium">{data.to}</span> of{" "}
                        <span className="font-medium">{data.total}</span> results
                    </p>
                </div>
                <div className="flex items-center gap-1.5">
                    {/* Per Page Selector */}
                    <select
                        value={data.per_page}
                        onChange={(e) =>
                            handlePerPageChange(Number(e.target.value))
                        }
                        className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option value={10}>10/page</option>
                        <option value={20}>20/page</option>
                        <option value={50}>50/page</option>
                        <option value={100}>100/page</option>
                    </select>

                    {/* Page Numbers */}
                    <nav
                        className="flex items-center gap-0.5"
                        aria-label="Pagination"
                    >
                        <button
                            onClick={() => handlePageChange(data.prev_page_url)}
                            disabled={!data.prev_page_url}
                            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-1.5 py-1 text-xs font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Previous page"
                        >
                            <span className="sr-only">Previous</span>
                            ‹
                        </button>
                        {data.links.slice(1, -1).map((link, index) => {
                            if (link.url === null) {
                                return (
                                    <span
                                        key={index}
                                        className="relative inline-flex items-center border border-gray-300 bg-white px-2.5 py-1 text-xs font-medium text-gray-700"
                                    >
                                        {link.label}
                                    </span>
                                );
                            }
                            return (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(link.url)}
                                    className={`relative inline-flex items-center border px-2.5 py-1 text-xs font-medium transition-colors ${
                                        link.active
                                            ? "z-10 border-blue-500 bg-blue-50 text-blue-600"
                                            : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                                    }`}
                                    aria-label={`Go to page ${link.label}`}
                                    aria-current={
                                        link.active ? "page" : undefined
                                    }
                                >
                                    {link.label}
                                </button>
                            );
                        })}
                        <button
                            onClick={() => handlePageChange(data.next_page_url)}
                            disabled={!data.next_page_url}
                            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-1.5 py-1 text-xs font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Next page"
                        >
                            <span className="sr-only">Next</span>
                            ›
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}

