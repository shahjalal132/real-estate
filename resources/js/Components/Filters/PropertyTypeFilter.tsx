import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface PropertyTypeFilterProps {
    selectedTypes: string[];
    onChange: (types: string[]) => void;
}

const PROPERTY_TYPES = [
    {
        type: "Retail",
        subtypes: [
            "Strip Center",
            "Shopping Center",
            "Single Tenant",
            "Multi Tenant",
        ],
    },
    {
        type: "Multifamily",
        subtypes: ["Apartment", "Condominium", "Townhouse", "Student Housing"],
    },
    {
        type: "Office",
        subtypes: ["Class A", "Class B", "Class C", "Medical Office"],
    },
    {
        type: "Industrial",
        subtypes: ["Warehouse", "Distribution", "Manufacturing", "Flex Space"],
    },
    {
        type: "Hospitality",
        subtypes: ["Hotel", "Motel", "Resort", "Extended Stay"],
    },
    {
        type: "Mixed Use",
        subtypes: ["Residential/Commercial", "Office/Retail", "Live/Work"],
    },
    {
        type: "Land",
        subtypes: [
            "Residential Land",
            "Commercial Land",
            "Industrial Land",
            "Agricultural",
        ],
    },
    {
        type: "Residential",
        subtypes: ["Single Family", "Multi Family", "Condo", "Townhouse"],
    },
];

export default function PropertyTypeFilter({
    selectedTypes,
    onChange,
}: PropertyTypeFilterProps) {
    const [expandedTypes, setExpandedTypes] = useState<Record<string, boolean>>(
        {}
    );

    const handleTypeToggle = (type: string) => {
        if (type === "All") {
            onChange(["All"]);
        } else {
            const filtered = selectedTypes.filter((t) => t !== "All");
            if (filtered.includes(type)) {
                onChange(filtered.filter((t) => t !== type));
            } else {
                onChange([...filtered, type]);
            }
        }
    };

    const toggleExpanded = (type: string) => {
        setExpandedTypes((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));
    };

    return (
        <div>
            <label className="mb-3 block text-sm font-semibold text-gray-900">
                Property Type(s)
            </label>
            <div className="space-y-2">
                <label className="flex cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-gray-50 transition-colors">
                    <input
                        type="checkbox"
                        checked={selectedTypes.includes("All")}
                        onChange={() => handleTypeToggle("All")}
                        className="h-4 w-4 rounded border-gray-300 text-[#0066CC] focus:ring-[#0066CC] accent-[#0066CC]"
                    />
                    <span className="text-sm text-gray-700 font-medium">
                        All
                    </span>
                </label>
                {PROPERTY_TYPES.map((propertyType) => (
                    <div key={propertyType.type} className="space-y-1">
                        <div className="flex items-center justify-between rounded-lg p-2 hover:bg-gray-50 transition-colors">
                            <label className="flex cursor-pointer items-center gap-2 flex-1">
                                <input
                                    type="checkbox"
                                    checked={selectedTypes.includes(
                                        propertyType.type
                                    )}
                                    onChange={() =>
                                        handleTypeToggle(propertyType.type)
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-[#0066CC] focus:ring-[#0066CC] accent-[#0066CC]"
                                />
                                <span className="text-sm text-gray-700 font-medium">
                                    {propertyType.type}
                                </span>
                            </label>
                            {propertyType.subtypes.length > 0 && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        toggleExpanded(propertyType.type)
                                    }
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <ChevronDown
                                        className={`h-4 w-4 transition-transform ${
                                            expandedTypes[propertyType.type]
                                                ? "rotate-180"
                                                : ""
                                        }`}
                                    />
                                </button>
                            )}
                        </div>
                        {expandedTypes[propertyType.type] && (
                            <div className="ml-6 space-y-1 border-l-2 border-gray-200 pl-3">
                                {propertyType.subtypes.map((subtype) => (
                                    <label
                                        key={subtype}
                                        className="flex cursor-pointer items-center gap-2 rounded-lg p-1.5 hover:bg-gray-50 transition-colors"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedTypes.includes(
                                                `${propertyType.type} - ${subtype}`
                                            )}
                                            onChange={() => {
                                                const subtypeKey = `${propertyType.type} - ${subtype}`;
                                                const filtered =
                                                    selectedTypes.filter(
                                                        (t) =>
                                                            t !==
                                                            propertyType.type
                                                    );
                                                if (
                                                    filtered.includes(
                                                        subtypeKey
                                                    )
                                                ) {
                                                    onChange(
                                                        filtered.filter(
                                                            (t) =>
                                                                t !== subtypeKey
                                                        )
                                                    );
                                                } else {
                                                    onChange([
                                                        ...filtered,
                                                        subtypeKey,
                                                    ]);
                                                }
                                            }}
                                            className="h-4 w-4 rounded border-gray-300 text-[#0066CC] focus:ring-[#0066CC] accent-[#0066CC]"
                                        />
                                        <span className="text-xs text-gray-600">
                                            {subtype}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    className="text-sm text-[#0066CC] hover:text-[#004C99] font-medium mt-2"
                >
                    View all subtypes
                </button>
            </div>
        </div>
    );
}
