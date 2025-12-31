import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/web/Layouts/AppLayout";

interface OwnerCompany {
    id: number;
    company: string;
    hierarchy?: string;
    owner_type?: string;
    hq_city?: string;
    hq_state?: string;
    hq_country?: string;
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
    filters: {
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

    const formatNumber = (num: number | null | undefined): string => {
        if (num === null || num === undefined) return "—";
        return num.toLocaleString();
    };

    const formatSF = (sf: string | number | null | undefined): string => {
        if (sf === null || sf === undefined) return "—";
        const num = typeof sf === "string" ? parseFloat(sf) : sf;
        if (isNaN(num)) return "—";
        if (num >= 1000000) {
            return `${(num / 1000000).toFixed(1)}M`;
        }
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}K`;
        }
        return num.toLocaleString();
    };

    const formatCurrency = (
        value: string | number | null | undefined
    ): string => {
        if (value === null || value === undefined) return "—";
        const num = typeof value === "string" ? parseFloat(value) : value;
        if (isNaN(num)) return "—";
        if (num >= 1000000000) {
            return `$${(num / 1000000000).toFixed(2)}B`;
        }
        if (num >= 1000000) {
            return `$${(num / 1000000).toFixed(2)}M`;
        }
        if (num >= 1000) {
            return `$${(num / 1000).toFixed(2)}K`;
        }
        return `$${num.toLocaleString()}`;
    };

    return (
        <AppLayout>
            <Head title={`${company.company} - Owner Company Details`} />

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

                        {/* Key Metrics */}
                        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <div className="text-sm text-gray-600">
                                    Properties
                                </div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {formatNumber(company.properties)}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">
                                    Portfolio SF
                                </div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {formatSF(company.portfolio_sf)}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">
                                    Average SF
                                </div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {formatSF(company.average_sf)}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">
                                    Sale Listings
                                </div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {formatNumber(company.sale_listings)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content - Summary View */}
                <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 py-6 space-y-8">
                    {/* Company Overview */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Company Overview
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-2">
                                    Location
                                </h3>
                                <p className="text-sm text-gray-900">
                                    {company.hq_city && company.hq_state
                                        ? `${company.hq_city}, ${company.hq_state}`
                                        : company.hq_city ||
                                          company.hq_state ||
                                          "—"}
                                    {company.hq_country &&
                                        `, ${company.hq_country}`}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-2">
                                    Main Property Type
                                </h3>
                                <p className="text-sm text-gray-900">
                                    {company.main_property_type || "—"}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-2">
                                    Territory
                                </h3>
                                <p className="text-sm text-gray-900">
                                    {company.territory || "—"}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-2">
                                    Continental Focus
                                </h3>
                                <p className="text-sm text-gray-900">
                                    {company.continental_focus || "—"}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-2">
                                    Primary Country
                                </h3>
                                <p className="text-sm text-gray-900">
                                    {company.primary_country || "—"}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-2">
                                    Hierarchy
                                </h3>
                                <p className="text-sm text-gray-900">
                                    {company.hierarchy || "—"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Details */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Portfolio Details
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-2">
                                    Apartment Units
                                </h3>
                                <p className="text-sm text-gray-900">
                                    {formatNumber(company.apt_units)}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-2">
                                    Hotel Rooms
                                </h3>
                                <p className="text-sm text-gray-900">
                                    {formatNumber(company.hotel_rooms)}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-2">
                                    Land (Acres)
                                </h3>
                                <p className="text-sm text-gray-900">
                                    {formatNumber(company.land_acre)}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-2">
                                    SF Delivered (24 Months)
                                </h3>
                                <p className="text-sm text-gray-900">
                                    {formatSF(company.sf_delivered_24_months)}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-2">
                                    SF Under Construction
                                </h3>
                                <p className="text-sm text-gray-900">
                                    {formatSF(company.sf_under_construction)}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-2">
                                    Sale Listings Value
                                </h3>
                                <p className="text-sm text-gray-900">
                                    {formatCurrency(
                                        company.sale_listings_value
                                    )}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-2">
                                    Acquisitions (24 Months)
                                </h3>
                                <p className="text-sm text-gray-900">
                                    {formatCurrency(
                                        company.acquisitions_24_months
                                    )}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-2">
                                    Dispositions (24 Months)
                                </h3>
                                <p className="text-sm text-gray-900">
                                    {formatCurrency(
                                        company.dispositions_24_months
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Related Companies */}
                    {relatedCompanies.length > 0 && (
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Related Companies
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                                                Company
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                                                Owner Type
                                            </th>
                                            <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-700">
                                                Properties
                                            </th>
                                            <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-700">
                                                Portfolio SF
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {relatedCompanies.map((related) => (
                                            <tr key={related.id}>
                                                <td className="px-4 py-4 text-sm">
                                                    <Link
                                                        href={`/contacts/owners/${related.id}`}
                                                        className="text-blue-600 hover:text-blue-800 hover:underline"
                                                    >
                                                        {related.company}
                                                    </Link>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500">
                                                    {related.owner_type || "—"}
                                                </td>
                                                <td className="px-4 py-4 text-right text-sm text-gray-500">
                                                    {formatNumber(
                                                        related.properties
                                                    )}
                                                </td>
                                                <td className="px-4 py-4 text-right text-sm text-gray-500">
                                                    {formatSF(
                                                        related.portfolio_sf
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
