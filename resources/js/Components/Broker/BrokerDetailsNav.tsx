import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@inertiajs/react";

interface BrokerDetailsNavProps {
    currentIndex?: number;
    totalCount?: number;
    previousUrl?: string | null;
    nextUrl?: string | null;
}

export default function BrokerDetailsNav({
    currentIndex,
    totalCount,
    previousUrl,
    nextUrl,
}: BrokerDetailsNavProps) {
    return (
        <div className="bg-white border-b border-gray-200">
            <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-10">
                    <Link
                        href="/contacts/brokers"
                        className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Back
                    </Link>

                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">
                            {currentIndex && totalCount
                                ? `${currentIndex} of ${totalCount.toLocaleString()} Contacts`
                                : ""}
                        </span>
                        <div className="flex items-center border-l border-gray-300 pl-4 space-x-2">
                            <Link
                                href={previousUrl || "#"}
                                className={`p-1 rounded hover:bg-gray-100 ${
                                    !previousUrl
                                        ? "text-gray-300 pointer-events-none"
                                        : "text-gray-500"
                                }`}
                                preserveScroll
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </Link>
                            <Link
                                href={nextUrl || "#"}
                                className={`p-1 rounded hover:bg-gray-100 ${
                                    !nextUrl
                                        ? "text-gray-300 pointer-events-none"
                                        : "text-gray-500"
                                }`}
                                preserveScroll
                            >
                                <ChevronRight className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
