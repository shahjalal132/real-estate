import { X } from "lucide-react";
import TenantSearchContentComponent from "./TenantSearchContentComponent";

interface AdvancedFiltersPanelProps {
    isOpen: boolean;
    onClose: () => void;
    onClear: () => void;
    onDone: () => void;
    activeFiltersCount?: number;
}

export default function AdvancedFiltersPanel({
    isOpen,
    onClose,
    onClear,
    onDone,
}: AdvancedFiltersPanelProps) {
    if (!isOpen) return null;

    return (
        <div className="h-full w-full bg-white flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3 shrink-0">
                <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-gray-700">
                        Advanced Filters
                    </span>
                </div>
                <button
                    onClick={onClose}
                    className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded hover:bg-gray-200"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>

            {/* Content Area - Scrollable */}
            <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden scroll-smooth">
                {/* Search Content Component */}
                <TenantSearchContentComponent />
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-4 py-3 bg-white shrink-0">
                <div className="flex items-center justify-between">
                    <button
                        onClick={onClear}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                        Show Criteria
                    </button>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onClear}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                        >
                            Clear
                        </button>
                        <button
                            onClick={onDone}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
