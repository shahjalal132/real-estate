import { useState, useMemo } from "react";
import OwnerPropertiesFilterBar from "@/Components/Owner/OwnerPropertiesFilterBar";
import OwnerPropertiesMapView from "@/Components/Owner/OwnerPropertiesMapView";
import OwnerPropertiesListView from "@/Components/Owner/OwnerPropertiesListView";
import { Property } from "@/types";

interface BrokerPropertiesProps {
    properties?: Property[];
}

export default function BrokerProperties({
    properties = [],
}: BrokerPropertiesProps) {
    const [viewMode, setViewMode] = useState<"map" | "list">("map");
    const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(
        null
    );
    const [searchValue, setSearchValue] = useState("");
    const [propertyType, setPropertyType] = useState<string[]>([]);
    const [secondaryType, setSecondaryType] = useState<string>("");
    const [propertySize, setPropertySize] = useState<string>("");
    const [percentLeased, setPercentLeased] = useState<string>("");
    const [locationType, setLocationType] = useState<string>("");
    const [existingPlus, setExistingPlus] = useState<string>("");
    const [rating, setRating] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState<string>("");

    // Filter properties
    const filteredProperties = useMemo(() => {
        let filtered = [...properties];

        // Search filter
        if (searchValue) {
            const searchLower = searchValue.toLowerCase();
            filtered = filtered.filter((property) => {
                const address =
                    property.location?.full_address ||
                    property.location?.address ||
                    "";
                const city = property.location?.city || "";
                const state = property.location?.state_name || "";
                const name = property.name || "";
                return (
                    address.toLowerCase().includes(searchLower) ||
                    city.toLowerCase().includes(searchLower) ||
                    state.toLowerCase().includes(searchLower) ||
                    name.toLowerCase().includes(searchLower)
                );
            });
        }

        return filtered;
    }, [properties, searchValue]);

    return (
        <div>
            {/* Filter Bar */}
            <OwnerPropertiesFilterBar
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                propertyType={propertyType}
                onPropertyTypeChange={setPropertyType}
                secondaryType={secondaryType ? [secondaryType] : []}
                onSecondaryTypeChange={(val) => setSecondaryType(val[0] || "")}
                propertySize={undefined} // Adjust if needed
                onPropertySizeChange={() => {}} // Placeholder or implement
                percentLeased={undefined} // Adjust if needed
                onPercentLeasedChange={() => {}} // Placeholder or implement
                locationType={locationType ? [locationType] : []}
                onLocationTypeChange={(val) => setLocationType(val[0] || "")}
                existingPlus={existingPlus ? [existingPlus] : []}
                onExistingPlusChange={(val) => setExistingPlus(val[0] || "")}
                rating={rating}
                onRatingChange={setRating}
                sortBy={sortBy}
                onSortChange={setSortBy}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                propertiesCount={filteredProperties.length}
            />

            {/* Content - Fixed height, no scroll */}
            <div className="mx-auto max-w-[1920px] h-[calc(100vh-280px)] overflow-hidden">
                {viewMode === "map" ? (
                    <OwnerPropertiesMapView
                        properties={filteredProperties}
                        selectedPropertyId={selectedPropertyId}
                        onPropertyClick={setSelectedPropertyId}
                    />
                ) : (
                    <div className="h-full px-4 sm:px-6 lg:px-8 py-4">
                        <OwnerPropertiesListView
                            properties={filteredProperties}
                            onPropertyClick={setSelectedPropertyId}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
