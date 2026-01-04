import { Head, Link } from "@inertiajs/react";
import AppLayout from "../../../Layouts/AppLayout";
import {
    PaginatedData,
    TennentCompany,
    TennentLocation,
} from "../../../../types";
import CompanyDetailsHeader from "../../../../Components/Tenant/CompanyDetailsHeader";
import CompanyOverview from "../../../../Components/Tenant/CompanyOverview";
import RelatedCompaniesTable from "../../../../Components/Tenant/RelatedCompaniesTable";
import SummaryMetrics from "../../../../Components/Tenant/SummaryMetrics";

interface PageProps {
    company: TennentCompany;
    locations: PaginatedData<TennentLocation>;
    relatedCompanies: TennentCompany[];
}

export default function CompanyDetails({
    company,
    locations,
    relatedCompanies,
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

            <div className="bg-gray-50 min-h-screen">
                {/* Top Navigation Bar */}
                {/* <CompanyDetailsNav /> */}

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

                    {/* Placeholder sections for future content */}
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <p className="text-gray-500">
                            Additional company information sections coming soon
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
