import { Link, router } from "@inertiajs/react";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";

interface CompanyDetailsNavProps {
    currentIndex?: number;
    totalCount?: number;
    previousUrl?: string | null;
    nextUrl?: string | null;
}

export default function CompanyDetailsNav({
    currentIndex = 1,
    totalCount = 0,
    previousUrl = null,
    nextUrl = null,
}: CompanyDetailsNavProps) {
    const handlePrevious = () => {
        if (previousUrl) {
            router.visit(previousUrl);
        }
    };

    const handleNext = () => {
        if (nextUrl) {
            router.visit(nextUrl);
        }
    };

    const formatCount = (count: number) => {
        return count.toLocaleString("en-US");
    };

    return (
        <>
            {/* Light Grey Toolbar */}
            <div className="bg-gray-100 border-b border-gray-200">
                <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-1">
                        {/* Left Side - Back Link */}
                        <div className="flex items-center">
                            <Link
                                href="/contacts/owners"
                                className="flex items-center gap-1 text-sm font-medium text-[#0066CC] hover:text-[#0052A3] transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Back
                            </Link>
                        </div>

                        {/* Right Side - Heart Icon and Navigation */}
                        <div className="flex items-center gap-4">
                            {/* Heart Icon */}
                            <button
                                type="button"
                                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                                aria-label="Favorite"
                            >
                                <Heart className="h-5 w-5" />
                            </button>

                            {/* Pagination Text */}
                            <span className="text-sm text-gray-700 whitespace-nowrap">
                                {currentIndex} of {formatCount(totalCount)}{" "}
                                Owner Companies
                            </span>

                            {/* Navigation Arrows */}
                            <div className="flex items-center gap-0 border-l border-gray-300 pl-4 ml-2">
                                <button
                                    type="button"
                                    onClick={handlePrevious}
                                    disabled={!previousUrl}
                                    className={`p-2 text-gray-600 transition-colors ${
                                        previousUrl
                                            ? "hover:text-gray-900"
                                            : "opacity-50 cursor-not-allowed"
                                    }`}
                                    aria-label="Previous"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>
                                <div className="w-px h-6 bg-gray-300 mx-1"></div>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    disabled={!nextUrl}
                                    className={`p-2 text-gray-600 transition-colors ${
                                        nextUrl
                                            ? "hover:text-gray-900"
                                            : "opacity-50 cursor-not-allowed"
                                    }`}
                                    aria-label="Next"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

