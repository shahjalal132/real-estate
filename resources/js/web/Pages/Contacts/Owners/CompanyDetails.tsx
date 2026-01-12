import { Head } from "@inertiajs/react";
import AppLayout from "@/web/Layouts/AppLayout";
import CompanyDetailsLayout from "@/Layouts/CompanyDetailsLayout";
import CompanyDetailsHeader from "@/Components/Owner/CompanyDetailsHeader";
import SummaryOverview from "@/Components/Owner/SummaryOverview";

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

export default function CompanyDetails({ company }: PageProps) {
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

    return (
        <AppLayout>
            <Head title={`${company.company} - Owner Company Details`} />
            <CompanyDetailsLayout
                title={`${company.company} - Owner Company Details`}
                tabs={tabs}
                basePath="/contacts/owners"
                headerComponent={<CompanyDetailsHeader company={company} />}
            >
                <SummaryOverview company={company} />
            </CompanyDetailsLayout>
        </AppLayout>
    );
}
