import { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface PropertyTypeFilterProps {
    selectedTypes: string[];
    onChange: (types: string[]) => void;
}

const PROPERTY_TYPES = [
    {
        type: "Retail",
        subtypes: [
            "Bank",
            "Convenience Store",
            "Day Care/Nursery",
            "QSR/Fast Food",
            "Gas Station",
            "Grocery Store",
            "Pharmacy/Drug",
            "Restaurant",
            "Bar",
            "Storefront",
            "Shopping Center",
            "Auto Shop",
        ],
    },
    {
        type: "Multifamily",
        subtypes: [
            "Student Housing",
            "Single Family Rental Portfolio",
            "RV Park",
            "Apartment Building",
        ],
    },
    {
        type: "Office",
        subtypes: [
            "Traditional Office",
            "Executive Office",
            "Medical Office",
            "Creative Office",
        ],
    },
    {
        type: "Industrial",
        subtypes: [
            "Distribution",
            "Flex",
            "Warehouse",
            "R&D",
            "Manufacturing",
            "Refrigerated/Cold Storage",
        ],
    },
    {
        type: "Hospitality",
        subtypes: ["Hotel", "Motel", "Casino", "Mixed Use"],
    },
    {
        type: "Land",
        subtypes: [
            "Agricultural",
            "Residential",
            "Commercial",
            "Industrial",
            "Islands",
            "Farm",
            "Ranch",
            "Timber",
            "Hunting/Recreational",
        ],
    },
    {
        type: "Self Storage",
        subtypes: [],
    },
    {
        type: "Mobile Home Park",
        subtypes: [],
    },
    {
        type: "Senior Living",
        subtypes: [],
    },
    {
        type: "Special Purpose",
        subtypes: [
            "Telecom/Data Center",
            "Sports/Entertainment",
            "Marina",
            "Golf Course",
            "School",
            "Religious/Church",
            "Garage/Parking",
            "Car Wash",
            "Airport",
        ],
    },
    {
        type: "Note/Loan",
        subtypes: [],
    },
    {
        type: "Business for Sale",
        subtypes: ["Business Only", "Business and Building"],
    },
];

export default function PropertyTypeFilter({
    selectedTypes,
    onChange,
}: PropertyTypeFilterProps) {
    // Initialize all categories with subtypes as expanded
    const [expandedTypes, setExpandedTypes] = useState<Record<string, boolean>>(
        () => {
            const expanded: Record<string, boolean> = {};
            PROPERTY_TYPES.forEach((pt) => {
                if (pt.subtypes.length > 0) {
                    expanded[pt.type] = true;
                }
            });
            return expanded;
        }
    );

    // Helper functions
    const getSubtypeKey = (type: string, subtype: string) => {
        return `${type} - ${subtype}`;
    };

    const isTypeChecked = (type: string) => {
        return selectedTypes.includes(type);
    };

    const isSubtypeChecked = (type: string, subtype: string) => {
        return selectedTypes.includes(getSubtypeKey(type, subtype));
    };

    const getAllSubtypesForType = (type: string): string[] => {
        const propertyType = PROPERTY_TYPES.find((pt) => pt.type === type);
        if (!propertyType) return [];
        return propertyType.subtypes.map((subtype) =>
            getSubtypeKey(type, subtype)
        );
    };

    const getCheckedSubtypesForType = (type: string): string[] => {
        const allSubtypes = getAllSubtypesForType(type);
        return allSubtypes.filter((subtypeKey) =>
            selectedTypes.includes(subtypeKey)
        );
    };

    const areAllSubtypesChecked = (type: string): boolean => {
        const propertyType = PROPERTY_TYPES.find((pt) => pt.type === type);
        if (!propertyType || propertyType.subtypes.length === 0) return false;
        const allSubtypes = getAllSubtypesForType(type);
        return (
            allSubtypes.length > 0 &&
            allSubtypes.every((subtypeKey) =>
                selectedTypes.includes(subtypeKey)
            )
        );
    };

    const hasAnySubtypeChecked = (type: string): boolean => {
        return getCheckedSubtypesForType(type).length > 0;
    };

    // Handle "All" checkbox
    const handleAllToggle = () => {
        if (selectedTypes.includes("All")) {
            // Uncheck everything
            onChange([]);
        } else {
            // Check "All" and uncheck everything else
            onChange(["All"]);
        }
    };

    // Handle main type checkbox
    const handleTypeToggle = (type: string) => {
        const filtered = selectedTypes.filter((t) => t !== "All");
        const propertyType = PROPERTY_TYPES.find((pt) => pt.type === type);
        const isCurrentlyChecked =
            isTypeChecked(type) || areAllSubtypesChecked(type);

        if (isCurrentlyChecked) {
            // Uncheck the type and all its subtypes
            const subtypesToRemove = getAllSubtypesForType(type);
            const newSelection = filtered.filter(
                (t) => t !== type && !subtypesToRemove.includes(t)
            );
            onChange(newSelection.length > 0 ? newSelection : []);
        } else {
            // Check the type and all its subtypes
            const subtypesToAdd = getAllSubtypesForType(type);
            const newSelection = [
                ...filtered.filter((t) => t !== type),
                type,
                ...subtypesToAdd,
            ];
            onChange(newSelection);
        }
    };

    // Handle subtype checkbox
    const handleSubtypeToggle = (
        type: string,
        subtype: string,
        isChecked: boolean
    ) => {
        const filtered = selectedTypes.filter((t) => t !== "All" && t !== type);
        const subtypeKey = getSubtypeKey(type, subtype);

        let newSelection: string[];
        if (isChecked) {
            // Add the subtype
            newSelection = [...filtered, subtypeKey];

            // Check if all subtypes are now checked, then also check the main type
            const allSubtypes = getAllSubtypesForType(type);
            const checkedSubtypes = [
                ...getCheckedSubtypesForType(type),
                subtypeKey,
            ];
            if (checkedSubtypes.length === allSubtypes.length) {
                newSelection.push(type);
            }
        } else {
            // Remove the subtype
            newSelection = filtered.filter((t) => t !== subtypeKey);

            // If main type was checked, uncheck it when any subtype is unchecked
            // (This is already handled by filtering out the type above)
        }

        onChange(newSelection);
    };

    // Toggle expand/collapse for a specific type
    const toggleExpanded = (type: string) => {
        setExpandedTypes((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));
    };

    // Expand all accordions
    const expandAll = () => {
        const allExpanded: Record<string, boolean> = {};
        PROPERTY_TYPES.forEach((pt) => {
            if (pt.subtypes.length > 0) {
                allExpanded[pt.type] = true;
            }
        });
        setExpandedTypes(allExpanded);
    };

    // Get the visual state for a type checkbox (checked, indeterminate, or unchecked)
    const getTypeCheckboxState = (type: string) => {
        const propertyType = PROPERTY_TYPES.find((pt) => pt.type === type);
        if (!propertyType || propertyType.subtypes.length === 0) {
            // Types without subtypes
            return {
                checked: isTypeChecked(type),
                indeterminate: false,
            };
        }

        const allChecked = areAllSubtypesChecked(type);
        const someChecked = hasAnySubtypeChecked(type);
        const typeDirectlyChecked = isTypeChecked(type);

        return {
            checked: typeDirectlyChecked || allChecked,
            indeterminate: !allChecked && someChecked && !typeDirectlyChecked,
        };
    };

    return (
        <div>
            <label className="mb-2 block text-xs font-semibold text-gray-900">
                Property Type(s)
            </label>
            <div className="space-y-0">
                {/* All checkbox with view all subtypes link */}
                <div className="flex items-center justify-between rounded p-1.5 hover:bg-gray-50 transition-colors">
                    <label className="flex cursor-pointer items-center gap-1.5 flex-1">
                        <input
                            type="checkbox"
                            checked={selectedTypes.includes("All")}
                            onChange={handleAllToggle}
                            className="h-3.5 w-3.5 rounded border-gray-300 text-[#0066CC] focus:ring-[#0066CC] accent-[#0066CC]"
                        />
                        <span className="text-xs text-gray-700 font-medium">
                            All
                        </span>
                    </label>
                    <button
                        type="button"
                        onClick={expandAll}
                        className="text-xs text-[#0066CC] hover:text-[#004C99] transition-colors font-medium"
                    >
                        view all subtypes
                    </button>
                </div>

                {/* Property Types */}
                {PROPERTY_TYPES.map((propertyType) => {
                    const isExpanded =
                        expandedTypes[propertyType.type] ?? false;
                    const hasSubtypes = propertyType.subtypes.length > 0;
                    const checkboxState = getTypeCheckboxState(
                        propertyType.type
                    );

                    return (
                        <div key={propertyType.type} className="space-y-0">
                            <div className="flex items-center justify-between rounded p-1.5 hover:bg-gray-50 transition-colors">
                                <label className="flex cursor-pointer items-center gap-1.5 flex-1">
                                    <input
                                        type="checkbox"
                                        checked={checkboxState.checked}
                                        ref={(input) => {
                                            if (input) {
                                                input.indeterminate =
                                                    checkboxState.indeterminate;
                                            }
                                        }}
                                        onChange={() =>
                                            handleTypeToggle(propertyType.type)
                                        }
                                        className="h-3.5 w-3.5 rounded border-gray-300 text-[#0066CC] focus:ring-[#0066CC] accent-[#0066CC]"
                                    />
                                    <span className="text-xs text-gray-700 font-medium">
                                        {propertyType.type}
                                    </span>
                                </label>
                                {hasSubtypes && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            toggleExpanded(propertyType.type)
                                        }
                                        className="text-gray-400 hover:text-gray-600 transition-colors p-0.5"
                                        aria-label={
                                            isExpanded ? "Collapse" : "Expand"
                                        }
                                    >
                                        {isExpanded ? (
                                            <ChevronUp className="h-3 w-3" />
                                        ) : (
                                            <ChevronDown className="h-3 w-3" />
                                        )}
                                    </button>
                                )}
                            </div>
                            {isExpanded && hasSubtypes && (
                                <div className="ml-4 space-y-0 border-l border-gray-200 pl-2">
                                    {propertyType.subtypes.map((subtype) => {
                                        const subtypeChecked = isSubtypeChecked(
                                            propertyType.type,
                                            subtype
                                        );
                                        return (
                                            <label
                                                key={subtype}
                                                className="flex cursor-pointer items-center gap-1.5 rounded p-1.5 hover:bg-gray-50 transition-colors"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={subtypeChecked}
                                                    onChange={(e) =>
                                                        handleSubtypeToggle(
                                                            propertyType.type,
                                                            subtype,
                                                            e.target.checked
                                                        )
                                                    }
                                                    className="h-3.5 w-3.5 rounded border-gray-300 text-[#0066CC] focus:ring-[#0066CC] accent-[#0066CC]"
                                                />
                                                <span className="text-xs text-gray-600">
                                                    {subtype}
                                                </span>
                                            </label>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
