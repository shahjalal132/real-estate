import { Link } from "@inertiajs/react";
import ResizableTable, { ResizableColumn } from "../ResizableTable/ResizableTable";
import { Property } from "../../types";

interface OwnerPropertiesListViewProps {
    properties: Property[];
    onPropertyClick?: (propertyId: number | null) => void;
}

export default function OwnerPropertiesListView({
    properties,
    onPropertyClick,
}: OwnerPropertiesListViewProps) {
    const formatPrice = (price: string | null | undefined): string => {
        if (!price) return "—";
        const num = parseFloat(price.toString().replace(/[$,]/g, ""));
        if (isNaN(num)) return price.toString();
        return `$${num.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        })}`;
    };

    const formatSquareFootage = (sqft: number | null | undefined): string => {
        if (!sqft) return "—";
        const num = typeof sqft === "number" ? sqft : parseFloat(sqft.toString());
        if (isNaN(num)) return "—";
        if (num >= 1000000) {
            return `${(num / 1000000).toFixed(1)}M`;
        }
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}K`;
        }
        return num.toLocaleString();
    };

    const formatLocation = (property: Property): string => {
        if (!property.location) return "—";
        const parts = [
            property.location.city,
            property.location.state_code,
            property.location.zip,
        ].filter(Boolean);
        return parts.length > 0 ? parts.join(", ") : "—";
    };

    const formatPropertyTypes = (property: Property): string => {
        if (!property.types || property.types.length === 0) return "—";
        return property.types.join(", ");
    };

    const formatCapRate = (property: Property): string => {
        const capRate = property.details?.cap_rate;
        if (capRate === null || capRate === undefined) return "—";
        const num = typeof capRate === "number" ? capRate : parseFloat(capRate.toString());
        if (isNaN(num)) return "—";
        return `${num.toFixed(2)}%`;
    };

    const formatOccupancy = (property: Property): string => {
        const occupancy = property.details?.summary_details?.Occupancy;
        if (!occupancy) return "—";
        const num = typeof occupancy === "number" ? occupancy : parseFloat(occupancy.toString());
        if (isNaN(num)) return occupancy.toString();
        return `${num}%`;
    };

    const columns: ResizableColumn[] = [
        {
            key: "name",
            label: "Property Name",
            defaultWidth: 250,
            render: (property: Property) => (
                <Link
                    href={`/properties/${property.id}/${property.url_slug}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    {property.name || "—"}
                </Link>
            ),
        },
        {
            key: "location",
            label: "Location",
            defaultWidth: 200,
            render: (property: Property) => (
                <span className="text-gray-700">{formatLocation(property)}</span>
            ),
        },
        {
            key: "propertyType",
            label: "Property Type",
            defaultWidth: 180,
            render: (property: Property) => (
                <span className="text-gray-700">{formatPropertyTypes(property)}</span>
            ),
        },
        {
            key: "askingPrice",
            label: "Asking Price",
            defaultWidth: 150,
            align: "right",
            render: (property: Property) => (
                <span className="text-gray-900 font-medium">
                    {formatPrice(property.formatted_price || property.asking_price)}
                </span>
            ),
        },
        {
            key: "squareFootage",
            label: "Square Footage",
            defaultWidth: 150,
            align: "right",
            render: (property: Property) => {
                const sqft =
                    property.details?.net_rentable_sqft ||
                    property.details?.summary_details?.SquareFootage ||
                    property.details?.summary_details?.["Square Footage"];
                return (
                    <span className="text-gray-700">
                        {formatSquareFootage(sqft)}
                    </span>
                );
            },
        },
        {
            key: "capRate",
            label: "Cap Rate",
            defaultWidth: 120,
            align: "right",
            render: (property: Property) => (
                <span className="text-gray-700">{formatCapRate(property)}</span>
            ),
        },
        {
            key: "occupancy",
            label: "Occupancy",
            defaultWidth: 120,
            align: "right",
            render: (property: Property) => (
                <span className="text-gray-700">{formatOccupancy(property)}</span>
            ),
        },
        {
            key: "status",
            label: "Status",
            defaultWidth: 120,
            render: (property: Property) => (
                <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        property.status === "On-Market"
                            ? "bg-green-100 text-green-800"
                            : property.status === "Off-Market"
                            ? "bg-gray-100 text-gray-800"
                            : property.status === "Sold"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                    }`}
                >
                    {property.status || "—"}
                </span>
            ),
        },
    ];

    const handleRowClick = (property: Property) => {
        onPropertyClick?.(property.id);
        // Navigate to property detail page
        window.location.href = `/properties/${property.id}/${property.url_slug}`;
    };

    return (
        <div className="h-[calc(100vh-350px)]">
            <ResizableTable
                columns={columns}
                data={properties}
                storageKey="owner-properties-list"
                onRowClick={handleRowClick}
            />
        </div>
    );
}

