import { Search, MapPin, X } from "lucide-react";
import { TopTabType } from "./types/filterState";

interface AdvancedFilterHeaderProps {
    topTab: TopTabType;
    onTopTabChange: (tab: TopTabType) => void;
    onClose: () => void;
}

export default function AdvancedFilterHeader({
    topTab,
    onTopTabChange,
    onClose,
}: AdvancedFilterHeaderProps) {
    return (
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3 shrink-0">
            <div className="flex items-center gap-1">
                <button
                    onClick={() => onTopTabChange("search")}
                    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                        topTab === "search"
                            ? "border-blue-600 text-blue-600 bg-white"
                            : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                >
                    <Search className="h-4 w-4" />
                    Search
                </button>
                <button
                    onClick={() => onTopTabChange("location")}
                    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                        topTab === "location"
                            ? "border-blue-600 text-blue-600 bg-white"
                            : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                >
                    <MapPin className="h-4 w-4" />
                    Location
                </button>
            </div>
            <button
                onClick={onClose}
                className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded hover:bg-gray-200"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    );
}

