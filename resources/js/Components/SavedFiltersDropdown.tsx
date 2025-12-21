import { useState, useEffect, useRef } from "react";
import { Bookmark, ChevronDown, X, Trash2, Clock } from "lucide-react";
import { getSavedFilters, deleteFilter, SavedFilter } from "../utils/cookies";
import { FilterValues } from "./AllFiltersModal";

interface SavedFiltersDropdownProps {
    onApplyFilter: (filters: FilterValues) => void;
    className?: string;
}

export default function SavedFiltersDropdown({
    onApplyFilter,
    className = "",
}: SavedFiltersDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Load saved filters
    useEffect(() => {
        const filters = getSavedFilters();
        setSavedFilters(filters);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const handleApply = (filter: SavedFilter) => {
        onApplyFilter(filter.filters as FilterValues);
        setIsOpen(false);
    };

    const handleDelete = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (confirm("Are you sure you want to delete this saved filter?")) {
            deleteFilter(id);
            setSavedFilters(getSavedFilters());
        }
    };

    const formatTimeAgo = (dateString: string): string => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return "Just now";
        if (diffInSeconds < 3600)
            return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400)
            return `${Math.floor(diffInSeconds / 3600)}h ago`;
        if (diffInSeconds < 604800)
            return `${Math.floor(diffInSeconds / 86400)}d ago`;
        return date.toLocaleDateString();
    };

    if (savedFilters.length === 0) {
        return null;
    }

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
            >
                <Bookmark className="h-4 w-4 text-[#0066CC]" />
                <span>Saved ({savedFilters.length})</span>
                <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-80 max-h-[400px] overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-xl">
                    <div className="p-2">
                        <div className="mb-2 px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                            Saved Searches
                        </div>
                        {savedFilters.map((filter) => (
                            <div
                                key={filter.id}
                                className="group relative rounded-lg border border-gray-200 bg-white p-3 mb-2 hover:border-[#0066CC] hover:bg-blue-50 transition-all cursor-pointer"
                                onClick={() => handleApply(filter)}
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-sm text-gray-900 truncate">
                                            {filter.name}
                                        </div>
                                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                            <Clock className="h-3 w-3" />
                                            <span>{formatTimeAgo(filter.createdAt)}</span>
                                            {filter.duration && (
                                                <>
                                                    <span>•</span>
                                                    <span className="capitalize">
                                                        {filter.duration}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={(e) => handleDelete(e, filter.id)}
                                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-100 text-red-600 transition-all"
                                        aria-label="Delete saved filter"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

