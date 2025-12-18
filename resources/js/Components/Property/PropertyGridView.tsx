import PropertyCard, { PropertyCardProps } from "../PropertyCard";
import { Property } from "../../types";

interface PropertyGridViewProps {
    properties: Property[];
    mapPropertyToCardProps: (property: Property) => PropertyCardProps;
}

export default function PropertyGridView({
    properties,
    mapPropertyToCardProps,
}: PropertyGridViewProps) {
    if (properties.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                    No properties found matching your criteria.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {properties.map((property) => (
                <PropertyCard
                    key={property.id}
                    {...mapPropertyToCardProps(property)}
                />
            ))}
        </div>
    );
}
