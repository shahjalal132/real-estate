import { Head, Link } from "@inertiajs/react";
import AppLayout from "../../../Layouts/AppLayout";
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

export default function CompanyTab({ company, tab, tabLabel }: PageProps) {
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

    const activeTab = tabs.find((t) => t.id === tab) || tabs[0];
    const Icon = tabIcons[tab] || Building2;

    return (
        <AppLayout>
            <Head title={`${tabLabel} - ${company.company}`} />

            <div className="bg-gray-50 min-h-screen">
                {/* Company Header */}
                <div className="bg-white border-b border-gray-200">
                    <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 py-6">
                        <h1 className="text-3xl font-bold text-gray-900">
                            {company.company}
                        </h1>
                        {company.owner_type && (
                            <p className="text-lg text-gray-600 mt-2">
                                {company.owner_type}
                            </p>
                        )}

                        {/* Tabs */}
                        <div className="border-b border-gray-200 mt-6">
                            <nav className="-mb-px flex space-x-8">
                                {tabs.map((t) => (
                                    <Link
                                        key={t.id}
                                        href={t.href}
                                        className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                                            t.id === activeTab.id
                                                ? "border-red-500 text-red-600"
                                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                        }`}
                                    >
                                        {t.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Coming Soon Content */}
                <ComingSoon
                    title={tabLabel}
                    description={tabDescriptions[tab] || "This feature is coming soon."}
                    icon={Icon}
                />
            </div>
        </AppLayout>
    );
}

