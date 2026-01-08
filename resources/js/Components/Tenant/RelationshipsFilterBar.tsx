import { useState } from "react";
import TenantSortSelector from "./TenantSortSelector";

interface RelationshipsFilterBarProps {
    relationshipType?: "tenant-representatives" | "landlords";
    onRelationshipTypeChange?: (type: "tenant-representatives" | "landlords") => void;
    companyName?: string;
    onCompanyNameChange?: (value: string) => void;
    viewType?: "companies" | "contacts";
    onViewTypeChange?: (type: "companies" | "contacts") => void;
    sortBy?: string;
    sortDir?: "asc" | "desc";
    onSortChange?: (sortBy: string, sortDir: "asc" | "desc") => void;
}

export default function RelationshipsFilterBar({
    relationshipType = "tenant-representatives",
    onRelationshipTypeChange,
    companyName = "",
    onCompanyNameChange,
    viewType = "companies",
    onViewTypeChange,
    sortBy,
    sortDir,
    onSortChange,
}: RelationshipsFilterBarProps) {
    const [localCompanyName, setLocalCompanyName] = useState(companyName);

    const handleCompanyNameChange = (value: string) => {
        setLocalCompanyName(value);
        onCompanyNameChange?.(value);
    };

    return (
        <div className="bg-white border-b border-gray-200">
            {/* Relationship Type Tabs */}
            <div className="flex items-center gap-4 pt-4 pb-3 border-b border-gray-200">
                <button
                    onClick={() => onRelationshipTypeChange?.("tenant-representatives")}
                    className={`border-b-2 px-1 py-2 text-sm font-medium transition-colors ${
                        relationshipType === "tenant-representatives"
                            ? "border-red-500 text-red-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                >
                    Tenant Representatives
                </button>
                <button
                    onClick={() => onRelationshipTypeChange?.("landlords")}
                    className={`border-b-2 px-1 py-2 text-sm font-medium transition-colors ${
                        relationshipType === "landlords"
                            ? "border-red-500 text-red-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                >
                    Landlords
                </button>
            </div>

            {/* Filter Row */}
            <div className="flex items-center justify-between gap-4 py-4">
                {/* Left Group: Company Name Input and View Type Toggle */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Company Name Input */}
                    <div className="relative shrink-0">
                        <input
                            type="text"
                            value={localCompanyName}
                            onChange={(e) =>
                                handleCompanyNameChange(e.target.value)
                            }
                            placeholder="Company Name"
                            className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 min-w-[160px]"
                        />
                    </div>

                    {/* Companies/Contacts Toggle */}
                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden shrink-0">
                        <button
                            type="button"
                            onClick={() => onViewTypeChange?.("companies")}
                            className={`px-4 py-2 text-sm font-medium transition-colors ${
                                viewType === "companies"
                                    ? "bg-blue-600 text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                            Companies
                        </button>
                        <button
                            type="button"
                            onClick={() => onViewTypeChange?.("contacts")}
                            className={`px-4 py-2 text-sm font-medium transition-colors border-l border-gray-300 ${
                                viewType === "contacts"
                                    ? "bg-blue-600 text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                            Contacts
                        </button>
                    </div>
                </div>

                {/* Right Group: Sort */}
                <div className="flex items-center gap-4 shrink-0">
                    <TenantSortSelector
                        sortBy={sortBy}
                        sortDir={sortDir}
                        onSortChange={(sortBy, sortDir) => {
                            onSortChange?.(sortBy, sortDir);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

