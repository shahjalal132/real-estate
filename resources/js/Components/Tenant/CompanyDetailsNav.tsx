import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import {
    Check,
    Heart,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
} from "lucide-react";

interface CompanyDetailsNavProps {
    currentIndex?: number;
    totalCount?: number;
    previousUrl?: string | null;
    nextUrl?: string | null;
}

export default function CompanyDetailsNav({
    currentIndex = 1,
    totalCount = 40668,
    previousUrl = null,
    nextUrl = null,
}: CompanyDetailsNavProps) {
    const [saveDropdownOpen, setSaveDropdownOpen] = useState(false);
    const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

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
                                href="/contacts/tenants"
                                className="flex items-center gap-1 text-sm font-medium text-[#0066CC] hover:text-[#0052A3] transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Back
                            </Link>
                        </div>

                        {/* Right Side - Icons, Buttons, and Navigation */}
                        <div className="flex items-center gap-4">
                            {/* Checkmark Icon */}
                            <button
                                type="button"
                                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                                aria-label="Check"
                            >
                                <Check className="h-5 w-5" />
                            </button>

                            {/* Heart Icon */}
                            <button
                                type="button"
                                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                                aria-label="Favorite"
                            >
                                <Heart className="h-5 w-5" />
                            </button>

                            {/* Save Dropdown */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSaveDropdownOpen(!saveDropdownOpen);
                                        setMoreDropdownOpen(false);
                                    }}
                                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Save
                                    <ChevronDown
                                        className={`w-4 h-4 transition-transform ${
                                            saveDropdownOpen ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>
                                {saveDropdownOpen && (
                                    <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                        <div className="py-1">
                                            <button
                                                type="button"
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Save to List
                                            </button>
                                            <button
                                                type="button"
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Export
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* More Dropdown */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMoreDropdownOpen(!moreDropdownOpen);
                                        setSaveDropdownOpen(false);
                                    }}
                                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    More
                                    <ChevronDown
                                        className={`w-4 h-4 transition-transform ${
                                            moreDropdownOpen ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>
                                {moreDropdownOpen && (
                                    <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                        <div className="py-1">
                                            <button
                                                type="button"
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Share
                                            </button>
                                            <button
                                                type="button"
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Print
                                            </button>
                                            <button
                                                type="button"
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Settings
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Pagination Text */}
                            <span className="text-sm text-gray-700 whitespace-nowrap">
                                {currentIndex} of {formatCount(totalCount)}{" "}
                                Tenant Companies
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

            {/* Close dropdowns when clicking outside */}
            {(saveDropdownOpen || moreDropdownOpen) && (
                <div
                    className="fixed inset-0 z-30"
                    onClick={() => {
                        setSaveDropdownOpen(false);
                        setMoreDropdownOpen(false);
                    }}
                ></div>
            )}
        </>
    );
}
