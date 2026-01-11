import { useState, useMemo } from "react";
import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/web/Layouts/AppLayout";
import CompanyDetailsHeader from "@/Components/Owner/CompanyDetailsHeader";
import OwnerPropertiesFilterBar from "@/Components/Owner/OwnerPropertiesFilterBar";
import OwnerPropertiesMapView from "@/Components/Owner/OwnerPropertiesMapView";
import OwnerPropertiesListView from "@/Components/Owner/OwnerPropertiesListView";
import { Property } from "@/types";

interface OwnerCompany {
    id: number;
    company: string;
}

interface PageProps {
    company: OwnerCompany;
    properties: Property[];
}

export default function Properties({ company, properties }: PageProps) {
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

    // Filter properties (for now, just return all as filtering will be implemented later)
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
        <AppLayout>
            <Head title={`${company.company} - Properties`} />

            <div className="bg-gray-50 min-h-screen">
                {/* Company Header */}
                <div className="bg-white border-b border-gray-200">
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
                                            tab.id === "properties"
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

                {/* Filter Bar */}
                <OwnerPropertiesFilterBar
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                    propertyType={propertyType}
                    onPropertyTypeChange={setPropertyType}
                    secondaryType={secondaryType}
                    onSecondaryTypeChange={setSecondaryType}
                    propertySize={propertySize}
                    onPropertySizeChange={setPropertySize}
                    percentLeased={percentLeased}
                    onPercentLeasedChange={setPercentLeased}
                    locationType={locationType}
                    onLocationTypeChange={setLocationType}
                    existingPlus={existingPlus}
                    onExistingPlusChange={setExistingPlus}
                    rating={rating}
                    onRatingChange={setRating}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                    propertiesCount={filteredProperties.length}
                />

                {/* Content - Fixed height, no scroll */}
                <div className="mx-auto max-w-[1920px] h-[calc(100vh-220px)] overflow-hidden">
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
        </AppLayout>
    );
}
