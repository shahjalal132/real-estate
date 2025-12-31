import { Head, Link } from "@inertiajs/react";
import AppLayout from "../../../Layouts/AppLayout";
import { TennentCompany } from "../../../../types";
import CompanyDetailsHeader from "../../../../Components/Tenant/CompanyDetailsHeader";
import ComingSoon from "../../../../Components/ComingSoon";
import { LucideIcon, MapPin, Receipt, Calendar, Users, Network, Newspaper } from "lucide-react";

interface PageProps {
    company: TennentCompany;
    tab: string;
    tabLabel: string;
}

const tabIcons: Record<string, LucideIcon> = {
    locations: MapPin,
    transactions: Receipt,
    "lease-expirations": Calendar,
    contacts: Users,
    relationships: Network,
    news: Newspaper,
};

const tabDescriptions: Record<string, string> = {
    locations: "View all locations for this tenant company on an interactive map and detailed list.",
    transactions: "Browse transaction history including leases, purchases, and other real estate transactions.",
    "lease-expirations": "Track upcoming lease expirations and renewal opportunities.",
    contacts: "Access contact information for key personnel and decision makers.",
    relationships: "Explore business relationships, partnerships, and connections.",
    news: "Stay updated with the latest news and updates about this tenant company.",
};

export default function CompanyTab({ company, tab, tabLabel }: PageProps) {
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

    const activeTab = tabs.find((t) => t.id === tab) || tabs[0];
    const Icon = tabIcons[tab] || MapPin;

    return (
        <AppLayout>
            <Head title={`${tabLabel} - ${company.tenant_name}`} />

            <div className="bg-gray-50 min-h-screen">
                {/* Company Header */}
                <div className="bg-white border-b border-gray-200">
                    <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 py-6">
                        <CompanyDetailsHeader company={company} />

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

