import { Head } from "@inertiajs/react";
import AppLayout from "../../../Layouts/AppLayout";
import CompanyDetailsLayout from "../../../../Layouts/CompanyDetailsLayout";
import { TennentCompany } from "../../../../types";
import CompanyDetailsHeader from "../../../../Components/Tenant/CompanyDetailsHeader";
import ComingSoon from "../../../../Components/ComingSoon";
import {
    LucideIcon,
    MapPin,
    Receipt,
    Calendar,
    Users,
    Network,
    Newspaper,
} from "lucide-react";

interface PageProps {
    company: TennentCompany;
    tab: string;
    tabLabel: string;
    currentIndex?: number;
    totalCount?: number;
    previousCompanyId?: number | null;
    nextCompanyId?: number | null;
}

const tabIcons: Record<string, LucideIcon> = {
    locations: MapPin,
    transactions: Receipt,
    "lease-expirations": Calendar,
    lease_expirations: Calendar,
    contacts: Users,
    relationships: Network,
    news: Newspaper,
};

const tabDescriptions: Record<string, string> = {
    locations:
        "View all locations for this tenant company on an interactive map and detailed list.",
    transactions:
        "Browse transaction history including leases, purchases, and other real estate transactions.",
    "lease-expirations":
        "Track upcoming lease expirations and renewal opportunities.",
    lease_expirations:
        "Track upcoming lease expirations and renewal opportunities.",
    contacts:
        "Access contact information for key personnel and decision makers.",
    relationships:
        "Explore business relationships, partnerships, and connections.",
    news: "Stay updated with the latest news and updates about this tenant company.",
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

    // Normalize tab name for icon lookup (handle both formats)
    const normalizedTab = tab.replace(/-/g, "_");
    const Icon = tabIcons[tab] || tabIcons[normalizedTab] || MapPin;
    const description =
        tabDescriptions[tab] ||
        tabDescriptions[normalizedTab] ||
        "This feature is coming soon.";

    return (
        <AppLayout>
            <Head title={`${tabLabel} - ${company.tenant_name}`} />
            <CompanyDetailsLayout
                title={`${tabLabel} - ${company.tenant_name}`}
                tabs={tabs}
                currentIndex={currentIndex}
                totalCount={totalCount}
                previousCompanyId={previousCompanyId}
                nextCompanyId={nextCompanyId}
                basePath="/contacts/tenants"
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
