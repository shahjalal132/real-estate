import { useState, useMemo } from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/web/Layouts/AppLayout";
import CompanyDetailsLayout from "@/Layouts/CompanyDetailsLayout";
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
    currentIndex?: number;
    totalCount?: number;
    previousCompanyId?: number | null;
    nextCompanyId?: number | null;
}

export default function Properties({
    company,
    properties,
    currentIndex,
    totalCount,
    previousCompanyId,
    nextCompanyId,
}: PageProps) {
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
            <CompanyDetailsLayout
                title={`${company.company} - Properties`}
                tabs={tabs}
                currentIndex={currentIndex}
                totalCount={totalCount}
                previousCompanyId={previousCompanyId}
                nextCompanyId={nextCompanyId}
                basePath="/contacts/owners"
                headerComponent={<CompanyDetailsHeader company={company} />}
            >
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
                <div className="mx-auto max-w-[1920px] h-[calc(100vh-8vh)] overflow-hidden">
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
            </CompanyDetailsLayout>
        </AppLayout>
    );
}
