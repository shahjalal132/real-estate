import { Head } from "@inertiajs/react";
import AppLayout from "../../../Layouts/AppLayout";
import CompanyDetailsLayout from "../../../../Layouts/CompanyDetailsLayout";
import {
    PaginatedData,
    TennentCompany,
    TennentLocation,
} from "../../../../types";
import CompanyDetailsHeader from "../../../../Components/Tenant/CompanyDetailsHeader";
import CompanyOverview from "../../../../Components/Tenant/CompanyOverview";
import RelatedCompaniesTable from "../../../../Components/Tenant/RelatedCompaniesTable";
import SummaryMetrics from "../../../../Components/Tenant/SummaryMetrics";
import CompanyLocationsSlider from "../../../../Components/Tenant/CompanyLocationsSlider";
import CompanyStatsCharts from "../../../../Components/Tenant/CompanyStatsCharts";
import TopTenantsBarCharts from "../../../../Components/Tenant/TopTenantsBarCharts";
import CompanyContacts from "../../../../Components/Tenant/CompanyContacts";
import CompanyNews from "../../../../Components/Tenant/CompanyNews";
import CoStarContact from "../../../../Components/Tenant/CoStarContact";

interface PageProps {
    company: TennentCompany;
    locations: PaginatedData<TennentLocation>;
    relatedCompanies: TennentCompany[];
    currentIndex?: number;
    totalCount?: number;
    previousCompanyId?: number | null;
    nextCompanyId?: number | null;
}

export default function CompanyDetails({
    company,
    locations,
    relatedCompanies,
    currentIndex,
    totalCount,
    previousCompanyId,
    nextCompanyId,
}: PageProps) {
    const tabs = [
        {
            id: "summary",
            label: "Summary",
            href: `/contacts/tenants/${company.id}`,
        },
        {
            id: "locations",
            label: "Locations",
            href: `/contacts/tenants/${company.id}/locations`,
        },
        {
            id: "transactions",
            label: "Transactions",
            href: `/contacts/tenants/${company.id}/transactions`,
        },
        {
            id: "lease_expirations",
            label: "Lease Expirations",
            href: `/contacts/tenants/${company.id}/lease-expirations`,
        },
        {
            id: "contacts",
            label: "Contacts",
            href: `/contacts/tenants/${company.id}/contacts`,
        },
        {
            id: "relationships",
            label: "Relationships",
            href: `/contacts/tenants/${company.id}/relationships`,
        },
        {
            id: "news",
            label: "News",
            href: `/contacts/tenants/${company.id}/news`,
        },
    ];

    // Calculate total locations count
    const totalLocations = locations.total || 0;

    return (
        <AppLayout>
            <Head title={`${company.tenant_name} - Tenant Company Details`} />
            <CompanyDetailsLayout
                title={`${company.tenant_name} - Tenant Company Details`}
                tabs={tabs}
                currentIndex={currentIndex}
                totalCount={totalCount}
                previousCompanyId={previousCompanyId}
                nextCompanyId={nextCompanyId}
                basePath="/contacts/tenants"
                headerComponent={<CompanyDetailsHeader company={company} />}
            >
                <div className="space-y-8">
                    {/* Summary Metrics with Integrated Map */}
                    <SummaryMetrics
                        company={company}
                        totalLocations={totalLocations}
                        locations={locations.data}
                    />
                    {/* Company Overview */}
                    <CompanyOverview
                        company={company}
                        totalLocations={totalLocations}
                    />

                    {/* Related Companies */}
                    <RelatedCompaniesTable companies={relatedCompanies} />
                    {/* Company Locations Slider */}
                    <CompanyLocationsSlider
                        locations={locations.data.slice(0, 20)}
                        totalCount={totalLocations}
                    />
                    {/* Company Stats Charts */}
                    <CompanyStatsCharts locations={locations.data} />
                    {/* Top Tenants Bar Charts */}
                    <TopTenantsBarCharts />

                    {/* Company Contacts - Full Width */}
                    <CompanyContacts />

                    {/* News and CoStar Contact */}
                    <CompanyNews />
                    <CoStarContact />
                </div>
            </CompanyDetailsLayout>
        </AppLayout>
    );
}
