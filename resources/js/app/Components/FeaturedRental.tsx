import PropertyCard from "../../Components/PropertyCard";
import { Property } from "../../types";
import { Link } from "@inertiajs/react";

interface FeaturedRentalProps {
    properties?: Property[];
}

export default function FeaturedRental({
    properties = [],
}: FeaturedRentalProps) {
    if (properties.length === 0) {
        return null;
    }

    return (
        <section className="py-16 bg-white">
            <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-[#333333]">
                        Featured Rental
                    </h2>
                    <Link
                        href="/properties/rental"
                        className="text-[#0066CC] hover:text-[#004C99] font-medium text-sm uppercase tracking-wide"
                    >
                        View More →
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.slice(0, 6).map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            </div>
        </section>
    );
}
