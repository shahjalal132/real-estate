import { useMemo, useState } from "react";
import { usePage } from "@inertiajs/react";
import AppLayout from "../Layouts/AppLayout";
import SectionHeading from "../Components/SectionHeading";
import PropertyCard, { PropertyCardProps } from "../Components/PropertyCard";
import FilterBar from "../Components/FilterBar";

interface PageProps {
    filter: string;
    section: string | null;
    [key: string]: unknown;
}

type ListingWithId = PropertyCardProps & { id: number };

const ALL_LISTINGS: ListingWithId[] = [
    {
        id: 1,
        title: "Marketplace Listing - Normandy",
        price: "Undisclosed",
        description:
            "REO: Leola 640 | 295 Unit Multifamily + Retail | Philadelphia, PA",
        location: "Philadelphia, Pennsylvania",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200",
        category: "Multifamily",
        beds: 295,
        baths: 0,
        area: "295 Units",
        agentName: "John Smith",
        photosCount: 15,
    },
    {
        id: 2,
        title: "Marketplace Listing - Normandy",
        price: "10,000,000",
        description:
            "REO Sale | Hillside Manor Apt Resort | 218 Units | 71% Occupied | Ph...",
        location: "Clinton, Pennsylvania",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200",
        category: "Multifamily",
        beds: 218,
        baths: 0,
        area: "218 Units",
        agentName: "Sarah Johnson",
        photosCount: 12,
    },
    {
        id: 3,
        title: "Marketplace Listing - Downtown Office",
        price: "5,500,000",
        description:
            "Prime downtown office space | 50,000 Sqft | Fully leased | Excellent location",
        location: "New York, New York",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200",
        category: "Commercial",
        beds: 0,
        baths: 0,
        area: "50,000 Sqft",
        agentName: "Michael Chen",
        photosCount: 20,
    },
    {
        id: 4,
        title: "Marketplace Listing - Retail Plaza",
        price: "8,200,000",
        description:
            "Shopping center | 25 retail units | High traffic area | Strong tenant mix",
        location: "Los Angeles, California",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200",
        category: "Retail",
        beds: 0,
        baths: 0,
        area: "25 Units",
        agentName: "Emily Rodriguez",
        photosCount: 18,
    },
    {
        id: 5,
        title: "Marketplace Listing - Industrial Warehouse",
        price: "12,000,000",
        description:
            "Modern warehouse facility | 200,000 Sqft | Loading docks | Prime logistics location",
        location: "Chicago, Illinois",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200",
        category: "Industrial",
        beds: 0,
        baths: 0,
        area: "200,000 Sqft",
        agentName: "David Thompson",
        photosCount: 22,
    },
    {
        id: 6,
        title: "Marketplace Listing - Mixed Use Building",
        price: "6,800,000",
        description:
            "Mixed-use development | Retail + Residential | Prime urban location",
        location: "Seattle, Washington",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200",
        category: "Mixed Use",
        beds: 24,
        baths: 24,
        area: "45,000 Sqft",
        agentName: "Lisa Anderson",
        photosCount: 16,
    },
];

function applyFilter(items: ListingWithId[], filter: string): ListingWithId[] {
    if (!filter || filter === "all") return items;

    return items.filter((_, index) => {
        if (filter === "option1") return index % 3 === 0;
        if (filter === "option2") return index % 3 === 1;
        if (filter === "option3") return index % 3 === 2;
        return true;
    });
}

export default function Properties() {
    const { props } = usePage<PageProps>();
    const { filter, section } = props;

    const [searchValue, setSearchValue] = useState("");
    const [auctionValue, setAuctionValue] = useState("all");
    const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

    const filteredListings = useMemo(
        () => applyFilter(ALL_LISTINGS, filter),
        [filter]
    );

    return (
        <AppLayout title="All Properties" footerClassName="pt-32">
            <section className="mx-auto w-full max-w-6xl px-4 py-10">
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                        <SectionHeading>All Properties</SectionHeading>
                        <p className="mt-2 text-sm text-gray-600">
                            Showing results for{" "}
                            <span className="font-semibold">
                                {section ?? "all sections"}
                            </span>{" "}
                            with filter{" "}
                            <span className="font-semibold">
                                {filter || "all"}
                            </span>
                            .
                        </p>
                    </div>
                </div>

                {/* Filter bar */}
                <div className="my-6">
                    <FilterBar
                        searchValue={searchValue}
                        onSearchChange={setSearchValue}
                        auctionValue={auctionValue}
                        onAuctionChange={setAuctionValue}
                        viewMode={viewMode}
                        onViewModeChange={setViewMode}
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredListings.map((listing) => (
                        <PropertyCard key={listing.id} {...listing} />
                    ))}
                </div>
            </section>
        </AppLayout>
    );
}
