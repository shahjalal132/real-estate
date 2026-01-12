import { Head } from "@inertiajs/react";
import AppLayout from "../../../Layouts/AppLayout";
import CompanyDetailsLayout from "../../../../Layouts/CompanyDetailsLayout";
import CompanyDetailsHeader from "../../../../Components/Owner/CompanyDetailsHeader";
import ComingSoon from "../../../../Components/ComingSoon";
import { LucideIcon, Building2, Receipt, TrendingUp, Users, Network, Newspaper } from "lucide-react";

interface OwnerCompany {
    id: number;
    company: string;
    owner_type?: string;
    properties?: number;
    portfolio_sf?: number;
}

interface PageProps {
    company: OwnerCompany;
    tab: string;
    tabLabel: string;
    currentIndex?: number;
    totalCount?: number;
    previousCompanyId?: number | null;
    nextCompanyId?: number | null;
}

const tabIcons: Record<string, LucideIcon> = {
    properties: Building2,
    transactions: Receipt,
    acquisitions: TrendingUp,
    contacts: Users,
    relationships: Network,
    news: Newspaper,
};

const tabDescriptions: Record<string, string> = {
    properties: "Browse all properties owned by this company with detailed information and analytics.",
    transactions: "View complete transaction history including purchases, sales, and other deals.",
    acquisitions: "Track recent acquisitions and investment activity.",
    contacts: "Access contact information for key personnel and decision makers.",
    relationships: "Explore business relationships, partnerships, and connections.",
    news: "Stay updated with the latest news and updates about this owner company.",
};

export default function CompanyTab({
    company,
    tab,
    tabLabel,
    currentIndex,
    totalCount,
    previousCompanyId,
    nextCompanyId,
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

    // Normalize tab name for icon lookup (handle both formats)
    const normalizedTab = tab.replace(/-/g, "_");
    const Icon = tabIcons[tab] || tabIcons[normalizedTab] || Building2;
    const description =
        tabDescriptions[tab] ||
        tabDescriptions[normalizedTab] ||
        "This feature is coming soon.";

    return (
        <AppLayout>
            <Head title={`${tabLabel} - ${company.company}`} />
            <CompanyDetailsLayout
                title={`${tabLabel} - ${company.company}`}
                tabs={tabs}
                currentIndex={currentIndex}
                totalCount={totalCount}
                previousCompanyId={previousCompanyId}
                nextCompanyId={nextCompanyId}
                basePath="/contacts/owners"
                headerComponent={<CompanyDetailsHeader company={company} />}
            >
                {/* Coming Soon Content */}
                <ComingSoon
                    title={tabLabel}
                    description={description}
                    icon={Icon}
                />
            </CompanyDetailsLayout>
        </AppLayout>
    );
}

