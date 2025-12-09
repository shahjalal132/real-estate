import { useState, useEffect, useMemo } from "react";
import { Property } from "../../types";
import CustomizeModal, { DataPoint } from "./CustomizeModal";

interface AtAGlanceProps {
    property: Property;
}

export default function AtAGlance({ property }: AtAGlanceProps) {
    const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
    const [selectedDataPoints, setSelectedDataPoints] = useState<string[]>([
        "property-type",
        "sub-type",
        "square-footage",
    ]);

    // Get property types with count
    const propertyTypes = property.types || [];
    const propertyTypesDisplay =
        propertyTypes.length > 0
            ? propertyTypes.slice(0, 2).join(", ") +
              (propertyTypes.length > 2
                  ? ` (+${propertyTypes.length - 2})`
                  : "")
            : "N/A";

    // Get subtypes from property
    const subtypes = property.subtypes || [];
    const subtypesDisplay =
        subtypes.length > 0
            ? subtypes.slice(0, 2).join(", ") +
              (subtypes.length > 2 ? ` (+${subtypes.length - 2})` : "")
            : "N/A";

    // Get square footage
    const squareFootage =
        property.details?.summary_details?.building_size ||
        property.details?.summary_details?.square_footage ||
        property.details?.summary_details?.["Square Feet"] ||
        property.details?.summary_details?.["Sqft"] ||
        "N/A";

    const squareFootageDisplay =
        typeof squareFootage === "number"
            ? squareFootage.toLocaleString()
            : squareFootage;

    // Extract property name (business name or property name)
    const propertyName = property.name || "Property";

    // Get value for a data point
    const getDataPointValue = (id: string): string => {
        const summaryDetails = property.details?.summary_details || {};

        switch (id) {
            case "property-type":
                return propertyTypesDisplay;
            case "sub-type":
                return subtypesDisplay;
            case "square-footage":
                return squareFootageDisplay;
            case "net-rentable-sqft":
                return (
                    summaryDetails["Net Rentable (SqFt)"] ||
                    summaryDetails["Net Rentable SqFt"] ||
                    summaryDetails["Net Rentable"] ||
                    "N/A"
                );
            case "units-keys-pads-beds-pumps":
                return (
                    summaryDetails["Units, Keys, Pads, Beds, Pumps"] ||
                    summaryDetails["Units"] ||
                    summaryDetails["Keys"] ||
                    summaryDetails["Pads"] ||
                    summaryDetails["Beds"] ||
                    summaryDetails["Pumps"] ||
                    "N/A"
                );
            case "cap-rate":
                return (
                    summaryDetails["Cap Rate"] ||
                    summaryDetails["Cap Rate %"] ||
                    summaryDetails["Cap Rate %"] ||
                    "N/A"
                );
            case "noi":
                return summaryDetails["NOI"]
                    ? `${summaryDetails["NOI"]}`
                    : "N/A";
            case "occupancy":
                return summaryDetails["Occupancy"]
                    ? `${summaryDetails["Occupancy"]}%`
                    : "N/A";
            case "tenancy":
                return (
                    summaryDetails["Tenancy"] ||
                    summaryDetails["Tenant Count"] ||
                    "N/A"
                );
            case "brand-tenant":
                const tenant =
                    summaryDetails["Tenant"] ||
                    summaryDetails["Brand"] ||
                    summaryDetails["Tenant Name"] ||
                    summaryDetails["Brand Name"] ||
                    summaryDetails["Brand/Tenant"];
                return tenant || propertyName;
            case "lease-type":
                return (
                    summaryDetails["Lease Type"] ||
                    summaryDetails["Lease"] ||
                    "N/A"
                );
            case "lease-term":
                return (
                    summaryDetails["Lease Term"] ||
                    summaryDetails["Term"] ||
                    "N/A"
                );
            case "lease-expiration":
                return (
                    summaryDetails["Lease Expiration"] ||
                    summaryDetails["lease_expiration"] ||
                    "N/A"
                );
            case "remaining-term":
                return summaryDetails["Remaining Term"]
                    ? `${summaryDetails["Remaining Term"]} years`
                    : "N/A";
            case "rent-bumps":
                return (
                    summaryDetails["Rent Bumps"] ||
                    summaryDetails["Rent Increase"] ||
                    "N/A"
                );
            case "lease-options":
                return (
                    summaryDetails["Lease Options"] ||
                    summaryDetails["Options"] ||
                    "N/A"
                );
            case "pro-forma-cap-rate":
                return (
                    summaryDetails["Pro-Forma Cap Rate"] ||
                    summaryDetails["Pro Forma Cap Rate"] ||
                    "N/A"
                );
            case "pro-forma-noi":
                return (
                    summaryDetails["Pro-Forma NOI"] ||
                    summaryDetails["Pro Forma NOI"] ||
                    "N/A"
                );
            case "price-per-sqft":
                return (
                    summaryDetails["Price per SqFt"] ||
                    summaryDetails["Price per Sqft"] ||
                    summaryDetails["$/SF"] ||
                    summaryDetails["Price/SF"] ||
                    "N/A"
                );
            case "price-per-acre":
                return (
                    summaryDetails["Price Per Acre"] ||
                    summaryDetails["Price/Acre"] ||
                    property.details?.price_per_acre ||
                    "N/A"
                );
            case "price-per-unit":
                return (
                    summaryDetails["Price Per (Unit, Key, Pad, Bed, Pump)"] ||
                    summaryDetails["Price Per Unit"] ||
                    summaryDetails["Price/Unit"] ||
                    "N/A"
                );
            case "broker-co-op":
                return (
                    summaryDetails["Broker Co-Op"] ||
                    summaryDetails["Broker CoOp"] ||
                    summaryDetails["Co-Op"] ||
                    "N/A"
                );
            case "class":
                return (
                    summaryDetails["Class"] ||
                    summaryDetails["Property Class"] ||
                    "N/A"
                );
            case "year-built":
                return (
                    summaryDetails["Year Built"] ||
                    summaryDetails["Year"] ||
                    "N/A"
                );
            case "year-renovated":
                return (
                    summaryDetails["Year Renovated"] ||
                    summaryDetails["Renovated"] ||
                    "N/A"
                );
            case "buildings":
                return (
                    summaryDetails["Buildings"] ||
                    summaryDetails["Building Count"] ||
                    "N/A"
                );
            case "stories":
                return (
                    summaryDetails["Stories"] ||
                    summaryDetails["Story"] ||
                    summaryDetails["Floors"] ||
                    "N/A"
                );
            case "lot-size":
                return property.details?.lot_size_acres
                    ? `${property.details.lot_size_acres} acres`
                    : summaryDetails["Lot Size (SqFt)"] ||
                          summaryDetails["Lot Size"] ||
                          "N/A";
            case "zoning":
                return property.details?.zoning || "N/A";
            case "parking-spaces":
                return (
                    summaryDetails["Parking Spaces"] ||
                    summaryDetails["Parking"] ||
                    "N/A"
                );
            case "parking-per-sqft":
                return (
                    summaryDetails["Parking Per SqFt"] ||
                    summaryDetails["Parking/SF"] ||
                    "N/A"
                );
            case "investment-type":
                return (
                    summaryDetails["Investment Type"] ||
                    summaryDetails["Investment"] ||
                    "N/A"
                );
            case "tenant-credit":
                return (
                    summaryDetails["Tenant Credit"] ||
                    summaryDetails["Credit"] ||
                    "N/A"
                );
            case "lease-commencement":
                return (
                    summaryDetails["Lease Commencement"] ||
                    summaryDetails["Commencement"] ||
                    "N/A"
                );
            case "rent-commencement":
                return (
                    summaryDetails["Rent Commencement"] ||
                    summaryDetails["Rent Start"] ||
                    "N/A"
                );
            case "occupancy-date":
                return (
                    summaryDetails["Occupancy Date"] ||
                    summaryDetails["Occupied Date"] ||
                    "N/A"
                );
            case "ground-lease":
                return (
                    summaryDetails["Ground Lease"] ||
                    summaryDetails["Ground"] ||
                    "N/A"
                );
            case "ceiling-height":
                return (
                    summaryDetails["Ceiling Height"] ||
                    summaryDetails["Ceiling"] ||
                    "N/A"
                );
            case "loading-docks":
                return (
                    summaryDetails["Loading Docks"] ||
                    summaryDetails["Docks"] ||
                    "N/A"
                );
            case "dock-high-doors":
                return (
                    summaryDetails["Dock High Doors"] ||
                    summaryDetails["Dock Doors"] ||
                    "N/A"
                );
            case "ownership":
                return (
                    summaryDetails["Ownership"] ||
                    summaryDetails["Owner"] ||
                    "N/A"
                );
            case "sale-condition":
                return (
                    summaryDetails["Sale Condition"] ||
                    summaryDetails["Condition"] ||
                    "N/A"
                );
            default:
                return "N/A";
        }
    };

    // Define all available data points
    const availableDataPoints: DataPoint[] = useMemo(() => {
        const points: DataPoint[] = [
            {
                id: "property-type",
                label: "Property Type",
                key: "property-type",
            },
            { id: "sub-type", label: "Sub Type", key: "sub-type" },
            {
                id: "square-footage",
                label: "Square Footage",
                key: "square-footage",
            },
            {
                id: "net-rentable-sqft",
                label: "Net Rentable (SqFt)",
                key: "net-rentable-sqft",
            },
            {
                id: "units-keys-pads-beds-pumps",
                label: "Units, Keys, Pads, Beds, Pumps",
                key: "units-keys-pads-beds-pumps",
            },
            { id: "cap-rate", label: "Cap Rate", key: "cap-rate" },
            { id: "noi", label: "NOI", key: "noi" },
            { id: "occupancy", label: "Occupancy", key: "occupancy" },
            { id: "tenancy", label: "Tenancy", key: "tenancy" },
            {
                id: "brand-tenant",
                label: "Brand/Tenant",
                key: "brand-tenant",
            },
            { id: "lease-type", label: "Lease Type", key: "lease-type" },
            { id: "lease-term", label: "Lease Term", key: "lease-term" },
            {
                id: "lease-expiration",
                label: "Lease Expiration",
                key: "lease-expiration",
            },
            {
                id: "remaining-term",
                label: "Remaining Term",
                key: "remaining-term",
            },
            { id: "rent-bumps", label: "Rent Bumps", key: "rent-bumps" },
            {
                id: "lease-options",
                label: "Lease Options",
                key: "lease-options",
            },
            {
                id: "pro-forma-cap-rate",
                label: "Pro-Forma Cap Rate",
                key: "pro-forma-cap-rate",
            },
            {
                id: "pro-forma-noi",
                label: "Pro-Forma NOI",
                key: "pro-forma-noi",
            },
            {
                id: "price-per-sqft",
                label: "Price per SqFt",
                key: "price-per-sqft",
            },
            {
                id: "price-per-acre",
                label: "Price Per Acre",
                key: "price-per-acre",
            },
            {
                id: "price-per-unit",
                label: "Price Per (Unit, Key, Pad, Bed, Pump)",
                key: "price-per-unit",
            },
            {
                id: "broker-co-op",
                label: "Broker Co-Op",
                key: "broker-co-op",
            },
            { id: "class", label: "Class", key: "class" },
            { id: "year-built", label: "Year Built", key: "year-built" },
            {
                id: "year-renovated",
                label: "Year Renovated",
                key: "year-renovated",
            },
            { id: "buildings", label: "Buildings", key: "buildings" },
            { id: "stories", label: "Stories", key: "stories" },
            { id: "lot-size", label: "Lot Size (SqFt)", key: "lot-size" },
            { id: "zoning", label: "Zoning", key: "zoning" },
            {
                id: "parking-spaces",
                label: "Parking Spaces",
                key: "parking-spaces",
            },
            {
                id: "parking-per-sqft",
                label: "Parking Per SqFt",
                key: "parking-per-sqft",
            },
            {
                id: "investment-type",
                label: "Investment Type",
                key: "investment-type",
            },
            {
                id: "tenant-credit",
                label: "Tenant Credit",
                key: "tenant-credit",
            },
            {
                id: "lease-commencement",
                label: "Lease Commencement",
                key: "lease-commencement",
            },
            {
                id: "rent-commencement",
                label: "Rent Commencement",
                key: "rent-commencement",
            },
            {
                id: "occupancy-date",
                label: "Occupancy Date",
                key: "occupancy-date",
            },
            {
                id: "ground-lease",
                label: "Ground Lease",
                key: "ground-lease",
            },
            {
                id: "ceiling-height",
                label: "Ceiling Height",
                key: "ceiling-height",
            },
            {
                id: "loading-docks",
                label: "Loading Docks",
                key: "loading-docks",
            },
            {
                id: "dock-high-doors",
                label: "Dock High Doors",
                key: "dock-high-doors",
            },
            { id: "ownership", label: "Ownership", key: "ownership" },
            {
                id: "sale-condition",
                label: "Sale Condition",
                key: "sale-condition",
            },
        ];

        // Filter out data points that don't have data
        return points.filter((point) => {
            if (
                point.id === "property-type" ||
                point.id === "sub-type" ||
                point.id === "square-footage"
            ) {
                return true; // Always show these
            }
            // Check if data exists for this point
            return getDataPointValue(point.id) !== "N/A";
        });
    }, [
        property,
        propertyTypesDisplay,
        subtypesDisplay,
        squareFootageDisplay,
        propertyName,
    ]);

    // Load saved preferences from localStorage
    useEffect(() => {
        const saved = localStorage.getItem(`at-a-glance-${property.id}`);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setSelectedDataPoints(parsed);
                }
            } catch (e) {
                console.error("Error loading saved preferences:", e);
            }
        }
    }, [property.id]);

    // Save preferences to localStorage
    const handleSavePreferences = (selectedIds: string[]) => {
        setSelectedDataPoints(selectedIds);
        localStorage.setItem(
            `at-a-glance-${property.id}`,
            JSON.stringify(selectedIds)
        );
    };

    // Get selected data points in order
    const displayDataPoints = useMemo(() => {
        return selectedDataPoints
            .map((id) => availableDataPoints.find((p) => p.id === id))
            .filter((p): p is DataPoint => p !== undefined);
    }, [selectedDataPoints, availableDataPoints]);

    return (
        <>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-start gap-4">
                    <h3 className="text-sm font-semibold text-gray-900">
                        At A Glance
                    </h3>
                    <button
                        onClick={() => setIsCustomizeModalOpen(true)}
                        className="text-xs cursor-pointer text-[#0066CC] hover:text-[#0052A3] font-medium"
                    >
                        Customize
                    </button>
                </div>

                <div className="grid grid-cols-2 divide-x divide-y divide-gray-200">
                    {displayDataPoints.map((point) => {
                        const value = getDataPointValue(point.id);
                        if (value === "N/A") return null;

                        return (
                            <div
                                key={point.id}
                                className="p-4 hover:bg-gray-50 transition-colors"
                            >
                                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                    {point.label}
                                </div>
                                <div className="text-sm font-semibold text-gray-900">
                                    {value}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Customize Modal */}
            <CustomizeModal
                isOpen={isCustomizeModalOpen}
                onClose={() => setIsCustomizeModalOpen(false)}
                onSave={handleSavePreferences}
                availableDataPoints={availableDataPoints}
                selectedDataPoints={selectedDataPoints}
            />
        </>
    );
}
