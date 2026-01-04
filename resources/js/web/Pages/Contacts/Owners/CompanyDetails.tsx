import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/web/Layouts/AppLayout";
import CompanyDetailsHeader from "@/Components/Owner/CompanyDetailsHeader";
import CompanyOverview from "@/Components/Owner/CompanyOverview";
import RelatedCompaniesTable from "@/Components/Owner/RelatedCompaniesTable";
import SummaryMetrics from "@/Components/Owner/SummaryMetrics";
import CompanyStatsCharts from "@/Components/Tenant/CompanyStatsCharts";
import TopTenantsBarCharts from "@/Components/Tenant/TopTenantsBarCharts";
import CompanyContacts from "@/Components/Tenant/CompanyContacts";
import CompanyNews from "@/Components/Tenant/CompanyNews";
import CoStarContact from "@/Components/Tenant/CoStarContact";

interface OwnerCompany {
    id: number;
    company: string;
    hierarchy?: string;
    owner_type?: string;
    hq_city?: string;
    hq_state?: string;
    hq_country?: string;
    hq_phone?: string;
    properties?: number;
    portfolio_sf?: number;
    average_sf?: number;
    apt_units?: number;
    hotel_rooms?: number;
    land_acre?: number;
    main_property_type?: string;
    sf_delivered_24_months?: number;
    sf_under_construction?: number;
    continental_focus?: string;
    primary_country?: string;
    territory?: string;
    sale_listings?: number;
    sale_listings_value?: number;
    acquisitions_24_months?: number;
    dispositions_24_months?: number;
}

interface PageProps {
    company: OwnerCompany;
    relatedCompanies: OwnerCompany[];
    filters?: {
        search?: string;
    };
}

export default function CompanyDetails({
    company,
    relatedCompanies,
}: PageProps) {
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
            id: "acquisitions",
            label: "Acquisitions",
            href: `/contacts/owners/${company.id}/acquisitions`,
        },
        {
            id: "contacts",
            label: "Contacts",
            href: `/contacts/owners/${company.id}/contacts`,
        },
        {
            id: "relationships",
            label: "Relationships",
            href: `/contacts/owners/${company.id}/relationships`,
        },
        {
            id: "news",
            label: "News",
            href: `/contacts/owners/${company.id}/news`,
        },
    ];

    // Dummy locations data for stats charts (using tenant structure)
    const dummyLocations: any[] = [];

    return (
        <AppLayout>
            <Head title={`${company.company} - Owner Company Details`} />

            <div className="bg-gray-50 min-h-screen">
                {/* Company Header */}
                <div className="bg-white border-b border-gray-200">
                    <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 py-6">
                        <CompanyDetailsHeader company={company} />

                        {/* Tabs */}
                        <div className="border-b border-gray-200 mt-6">
                            <nav className="-mb-px flex space-x-8">
                                {tabs.map((tab) => (
                                    <Link
                                        key={tab.id}
                                        href={tab.href}
                                        className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                                            tab.id === "summary"
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

                {/* Main Content - Summary View */}
                <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 py-6 space-y-8">
                    {/* Summary Metrics */}
                    <SummaryMetrics company={company} />

                    {/* Company Overview */}
                    <CompanyOverview company={company} />

                    {/* Related Companies */}
                    <RelatedCompaniesTable companies={relatedCompanies} />

                    {/* Company Stats Charts */}
                    <CompanyStatsCharts locations={dummyLocations} />

                    {/* Top Owners Bar Charts */}
                    <TopTenantsBarCharts />

                    {/* Company Contacts - Full Width */}
                    <CompanyContacts />

                    {/* News and CoStar Contact */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <CompanyNews />
                        <CoStarContact />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
