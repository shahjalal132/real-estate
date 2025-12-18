import PropertyCard, { PropertyCardProps } from "../PropertyCard";
import MapView from "../MapView";
import { Property } from "../../types";

interface PropertyMapViewLayoutProps {
    properties: Property[];
    selectedPropertyId: number | null;
    mapPropertyToCardProps: (property: Property) => PropertyCardProps;
    onMarkerClick: (property: Property) => void;
}

export default function PropertyMapViewLayout({
    properties,
    selectedPropertyId,
    mapPropertyToCardProps,
    onMarkerClick,
}: PropertyMapViewLayoutProps) {
    return (
        <div className="my-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Side: Listings */}
            <div className="space-y-4 lg:space-y-6 order-2 lg:order-1">
                <h3 className="text-lg font-semibold text-gray-900">
                    Properties List
                </h3>
                {properties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 max-h-[600px] lg:max-h-[800px] overflow-y-auto pr-2">
                        {properties.map((property) => (
                            <div
                                key={property.id}
                                id={`property-${property.id}`}
                                className={
                                    selectedPropertyId === property.id
                                        ? "ring-2 ring-blue-500 rounded-lg p-1 transition-all"
                                        : ""
                                }
                            >
                                <PropertyCard
                                    {...mapPropertyToCardProps(property)}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            No properties found matching your criteria.
                        </p>
                    </div>
                )}
            </div>

            {/* Right Side: Map */}
            <div className="space-y-4 order-1 lg:order-2">
                <h3 className="text-lg font-semibold text-gray-900">
                    Map View
                </h3>
                <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200 h-[400px] sm:h-[500px] lg:h-[800px]">
                    <MapView
                        properties={properties}
                        selectedPropertyId={selectedPropertyId}
                        onMarkerClick={onMarkerClick}
                    />
                </div>
            </div>
        </div>
    );
}
