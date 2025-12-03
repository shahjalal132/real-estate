import { SlidersHorizontal } from "lucide-react";

interface AllFiltersButtonProps {
    onClick: () => void;
    activeFiltersCount?: number;
    className?: string;
}

export default function AllFiltersButton({
    onClick,
    activeFiltersCount = 0,
    className = "",
}: AllFiltersButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`inline-flex items-center gap-2 rounded-full bg-[#0066CC] px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white shadow-sm hover:bg-[#004C99] focus:outline-none cursor-pointer transition-colors ${className}`}
        >
            <SlidersHorizontal className="h-4 w-4" />
            <span>All Filters</span>
            {activeFiltersCount > 0 && (
                <span className="bg-white text-[#0066CC] rounded-full px-2 py-0.5 text-xs font-bold min-w-[20px] text-center">
                    {activeFiltersCount}
                </span>
            )}
        </button>
    );
}

