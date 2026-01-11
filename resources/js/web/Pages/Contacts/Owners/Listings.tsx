import { useState, useMemo } from "react";
import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/web/Layouts/AppLayout";
import CompanyDetailsHeader from "@/Components/Owner/CompanyDetailsHeader";
import OwnerListingsFilterBar from "@/Components/Owner/OwnerListingsFilterBar";
import OwnerListingsTable, {
    Listing,
} from "@/Components/Owner/OwnerListingsTable";

interface OwnerCompany {
    id: number;
    company: string;
}

interface PageProps {
    company: OwnerCompany;
}

// Static listing data (for now)
const STATIC_LISTINGS: Listing[] = [
    {
        id: 1,
        address: "1925 Atlanta Hwy",
        buildingName: "Forsyth Business Center",
        propertyType: "Industrial",
        city: "Cumming",
        market: "Atlanta, GA",
        country: "United States",
        costarRating: 4,
        greenRating: null,
        class: "A",
        status: "Existing",
        rbaGla: 90869,
        sfAvail: 90869,
        rentPerSF: "$11 - 14 (Est.)",
        secondaryType: "Warehouse",
    },
    {
        id: 2,
        address: "757 Market St",
        buildingName: "Four Seasons Hotel San Francisco",
        propertyType: "Hospitality",
        city: "San Francisco",
        market: "San Francisco/San Mateo, CA",
        country: "United States",
        costarRating: 4,
        greenRating: null,
        class: "A",
        status: "Existing",
        rbaGla: 788876,
        sfAvail: 39561,
        rentPerSF: "Not Disclosed",
        secondaryType: "Hotel",
    },
    {
        id: 3,
        address: "2101-2163 NW 79th Ave",
        buildingName: "Link Miami International Commerce Center",
        propertyType: "Industrial",
        city: "Doral",
        market: "Miami, FL",
        country: "United States",
        costarRating: 4,
        greenRating: "LEED",
        class: "B",
        status: "Existing",
        rbaGla: 119600,
        sfAvail: 7390,
        rentPerSF: "$17 - 20 (Est.)",
        secondaryType: "Warehouse",
    },
    {
        id: 4,
        address: "1037 Red Bluff Rd",
        buildingName: "Building 2",
        propertyType: "Industrial",
        city: "Pasadena",
        market: "Houston, TX",
        country: "United States",
        costarRating: 4,
        greenRating: null,
        class: "A",
        status: "Existing",
        rbaGla: 95690,
        sfAvail: 95690,
        rentPerSF: "$7 - 8 (Est.)",
        secondaryType: "Distribution",
    },
    {
        id: 5,
        address: "Rycote Ln",
        buildingName: "",
        propertyType: "Industrial",
        city: "Thame",
        market: "Oxford",
        country: "United Kingdom",
        costarRating: 3,
        greenRating: "LEED",
        class: "B",
        status: "Existing",
        rbaGla: 6447,
        sfAvail: 3232,
        rentPerSF: "$13 - 16 (Est.)",
        secondaryType: "Warehouse",
    },
    {
        id: 6,
        address: "Rycote Ln",
        buildingName: "",
        propertyType: "Industrial",
        city: "Thame",
        market: "Oxford",
        country: "United Kingdom",
        costarRating: 3,
        greenRating: "LEED",
        class: "B",
        status: "Existing",
        rbaGla: 14701,
        sfAvail: 7370,
        rentPerSF: "$13 - 16 (Est.)",
        secondaryType: "Warehouse",
    },
    {
        id: 7,
        address: "7 Rycote Ln",
        buildingName: "",
        propertyType: "Industrial",
        city: "Thame",
        market: "Oxford",
        country: "United Kingdom",
        costarRating: 3,
        greenRating: "LEED",
        class: "B",
        status: "Existing",
        rbaGla: 26346,
        sfAvail: 13069,
        rentPerSF: "$13 - 16 (Est.)",
        secondaryType: "Warehouse",
    },
    {
        id: 8,
        address: "10137 Horton Rd",
        buildingName: "Charlotte Intermodal Logistics Center",
        propertyType: "Industrial",
        city: "Charlotte",
        market: "Charlotte, NC",
        country: "United States",
        costarRating: 4,
        greenRating: null,
        class: "A",
        status: "Existing",
        rbaGla: 408876,
        sfAvail: 316900,
        rentPerSF: "$9 - 10 (Est.)",
        secondaryType: "Distribution",
    },
    {
        id: 9,
        address: "Flanders Rd",
        buildingName: "Mulliner House",
        propertyType: "Office",
        city: "London",
        market: "London",
        country: "United Kingdom",
        costarRating: 3,
        greenRating: null,
        class: "C",
        status: "Existing",
        rbaGla: 40000,
        sfAvail: 11989,
        rentPerSF: "$46.92",
        secondaryType: "",
    },
    {
        id: 10,
        address: "1715 Corrigan Ct",
        buildingName: "",
        propertyType: "Industrial",
        city: "La Verne",
        market: "Los Angeles, CA",
        country: "United States",
        costarRating: 2,
        greenRating: null,
        class: "B",
        status: "Existing",
        rbaGla: 11872,
        sfAvail: 4210,
        rentPerSF: "$18.60",
        secondaryType: "Warehouse",
    },
    {
        id: 11,
        address: "118 Dvp",
        buildingName: "Indurent 129",
        propertyType: "Industrial",
        city: "",
        market: "Derby",
        country: "United Kingdom",
        costarRating: 2,
        greenRating: null,
        class: "B",
        status: "Existing",
        rbaGla: 129139,
        sfAvail: 129139,
        rentPerSF: "$11 - 14 (Est.)",
        secondaryType: "Warehouse",
    },
    {
        id: 12,
        address: "15300 33rd Ave S",
        buildingName: "Polaris at Seatac",
        propertyType: "Multifamily",
        city: "Seatac",
        market: "Seattle, WA",
        country: "United States",
        costarRating: 4,
        greenRating: null,
        class: "B",
        status: "Existing",
        rbaGla: 456261,
        sfAvail: 5302,
        rentPerSF: "$16.00",
        secondaryType: "Apartments",
    },
    {
        id: 13,
        address: "15311 33rd Ave S",
        buildingName: "Adara at SeaTac",
        propertyType: "Multifamily",
        city: "Seatac",
        market: "Seattle, WA",
        country: "United States",
        costarRating: 4,
        greenRating: null,
        class: "B",
        status: "Existing",
        rbaGla: 220000,
        sfAvail: 4567,
        rentPerSF: "$16.00 - 18.00",
        secondaryType: "Apartments",
    },
    {
        id: 14,
        address: "Swallow Rd",
        buildingName: "",
        propertyType: "Industrial",
        city: "Coventry",
        market: "Coventry",
        country: "United Kingdom",
        costarRating: 3,
        greenRating: "LEED",
        class: "B",
        status: "Existing",
        rbaGla: 28266,
        sfAvail: 28266,
        rentPerSF: "$11 - 13 (Est.)",
        secondaryType: "Warehouse",
    },
    {
        id: 15,
        address: "Pontefract Ln",
        buildingName: "Triangle 45 - Unit 22",
        propertyType: "Industrial",
        city: "Leeds",
        market: "Leeds",
        country: "United Kingdom",
        costarRating: 3,
        greenRating: "LEED",
        class: "B",
        status: "Under Construction",
        rbaGla: 33009,
        sfAvail: 33009,
        rentPerSF: "$14.75",
        secondaryType: "Warehouse",
    },
    {
        id: 16,
        address: "1-4 Chester Rd",
        buildingName: "Torque Units 1-4",
        propertyType: "Industrial",
        city: "Birmingham",
        market: "Birmingham",
        country: "United Kingdom",
        costarRating: 3,
        greenRating: "LEED",
        class: "B",
        status: "Under Construction",
        rbaGla: 45143,
        sfAvail: 45143,
        rentPerSF: "$8 - 10 (Est.)",
        secondaryType: "Warehouse",
    },
    {
        id: 17,
        address: "5-12 Chester Rd",
        buildingName: "Torque Units 5-12",
        propertyType: "Industrial",
        city: "Birmingham",
        market: "Birmingham",
        country: "United Kingdom",
        costarRating: 3,
        greenRating: "LEED",
        class: "B",
        status: "Under Construction",
        rbaGla: 58266,
        sfAvail: 46219,
        rentPerSF: "$9 - 11 (Est.)",
        secondaryType: "Warehouse",
    },
    {
        id: 18,
        address: "13-14 Chester Rd",
        buildingName: "Torque Units 13-14",
        propertyType: "Industrial",
        city: "Birmingham",
        market: "Birmingham",
        country: "United Kingdom",
        costarRating: 3,
        greenRating: "LEED",
        class: "B",
        status: "Under Construction",
        rbaGla: 65669,
        sfAvail: 65669,
        rentPerSF: "$9 - 11 (Est.)",
        secondaryType: "Warehouse",
    },
    {
        id: 19,
        address: "15-19 Chester Rd",
        buildingName: "Torque Units 15-19",
        propertyType: "Industrial",
        city: "Birmingham",
        market: "Birmingham",
        country: "United Kingdom",
        costarRating: 3,
        greenRating: "LEED",
        class: "B",
        status: "Under Construction",
        rbaGla: 76199,
        sfAvail: 76199,
        rentPerSF: "$9 - 11 (Est.)",
        secondaryType: "Warehouse",
    },
    {
        id: 20,
        address: "20-22 Chester Rd",
        buildingName: "Torque Units 20-22",
        propertyType: "Industrial",
        city: "Birmingham",
        market: "Birmingham",
        country: "United Kingdom",
        costarRating: 3,
        greenRating: "LEED",
        class: "B",
        status: "Under Construction",
        rbaGla: 38191,
        sfAvail: 38191,
        rentPerSF: "$9 - 10 (Est.)",
        secondaryType: "Warehouse",
    },
];

export default function Listings({ company }: PageProps) {
    const [subTab, setSubTab] = useState<"lease" | "sale">("lease");
    const [searchValue, setSearchValue] = useState("");
    const [spaceUse, setSpaceUse] = useState<string>("");
    const [availableSpace, setAvailableSpace] = useState<string>("");
    const [rating, setRating] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState<string>("");

    const tabs = [
        {
            id: "summary",
            label: "Summary",
            href: `/contacts/owners/${company.id}`,
        },
        {
            id: "properties",
            label: "Properties",
            href: `/contacts/owners/${company.id}/properties`,
        },
        {
            id: "transactions",
            label: "Transactions",
            href: `/contacts/owners/${company.id}/transactions`,
        },
        {
            id: "listings",
            label: "Listings",
            href: `/contacts/owners/${company.id}/listings`,
        },
        {
            id: "funds",
            label: "Funds",
            href: `/contacts/owners/${company.id}/funds`,
        },
        {
            id: "tenants",
            label: "Tenants",
            href: `/contacts/owners/${company.id}/tenants`,
        },
        {
            id: "relationships",
            label: "Relationships",
            href: `/contacts/owners/${company.id}/relationships`,
        },
        {
            id: "contacts",
            label: "Contacts",
            href: `/contacts/owners/${company.id}/contacts`,
        },
        {
            id: "news",
            label: "News",
            href: `/contacts/owners/${company.id}/news`,
        },
    ];

    // Filter listings (for now, just return all as filtering will be implemented later)
    const filteredListings = useMemo(() => {
        let filtered = [...STATIC_LISTINGS];

        // Search filter
        if (searchValue) {
            const searchLower = searchValue.toLowerCase();
            filtered = filtered.filter((listing) => {
                const address = listing.address || "";
                const buildingName = listing.buildingName || "";
                const city = listing.city || "";
                const market = listing.market || "";
                return (
                    address.toLowerCase().includes(searchLower) ||
                    buildingName.toLowerCase().includes(searchLower) ||
                    city.toLowerCase().includes(searchLower) ||
                    market.toLowerCase().includes(searchLower)
                );
            });
        }

        return filtered;
    }, [searchValue]);

    return (
        <AppLayout>
            <Head title={`${company.company} - Listings`} />

            <div className="flex flex-col h-screen bg-gray-50">
                {/* Company Header */}
                <div className="bg-white border-b border-gray-200 shrink-0">
                    <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 pt-4">
                        <CompanyDetailsHeader company={company} />

                        {/* Tabs */}
                        <div className="border-b border-gray-200 mt-6">
                            <nav className="-mb-px flex space-x-8">
                                {tabs.map((tab) => (
                                    <Link
                                        key={tab.id}
                                        href={tab.href}
                                        className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                                            tab.id === "listings"
                                                ? "border-red-500 text-red-600"
                                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                        }`}
                                    >
                                        {tab.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Sub-tabs (Lease/Sale) */}
                <div className="bg-white border-b border-gray-200 shrink-0">
                    <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
                        <div className="flex space-x-8">
                            <button
                                type="button"
                                onClick={() => setSubTab("lease")}
                                className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                                    subTab === "lease"
                                        ? "border-red-500 text-red-600"
                                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                }`}
                            >
                                Lease
                            </button>
                            <button
                                type="button"
                                onClick={() => setSubTab("sale")}
                                className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                                    subTab === "sale"
                                        ? "border-red-500 text-red-600"
                                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                }`}
                            >
                                Sale
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filter Bar */}
                <OwnerListingsFilterBar
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                    spaceUse={spaceUse}
                    onSpaceUseChange={setSpaceUse}
                    availableSpace={availableSpace}
                    onAvailableSpaceChange={setAvailableSpace}
                    rating={rating}
                    onRatingChange={setRating}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    listingsCount={filteredListings.length}
                />

                {/* Main Content Area - Takes remaining height, overflow hidden */}
                <div className="flex-1 overflow-hidden">
                    <div className="h-full mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 py-6">
                        <OwnerListingsTable listings={filteredListings} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
