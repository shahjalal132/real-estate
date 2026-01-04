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

interface CompanyOverviewProps {
    company: OwnerCompany;
}

export default function CompanyOverview({ company }: CompanyOverviewProps) {
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

    // Generate company description text
    const companyDescription = company.company
        ? `${company.company} is a leading ${company.owner_type?.toLowerCase() || "real estate"} company that operates a diverse portfolio of ${company.main_property_type?.toLowerCase() || "properties"}. ${company.company} has established itself as a prominent player in the commercial real estate market.`
        : "This company is a leading player in the commercial real estate market.";

    const operationsText = company.company
        ? `${company.company}'s operations include property acquisition, development, management, and disposition across ${company.territory || "multiple"} markets. The company focuses on ${company.main_property_type?.toLowerCase() || "commercial"} properties and maintains a strong presence in key markets.`
        : "The company operates across multiple markets and territories, providing quality services and maintaining strong relationships with tenants and property managers.";

    const commitmentText = company.company
        ? `${company.company} is committed to strategic growth through acquisitions, development projects, and maintaining high occupancy rates across its portfolio.`
        : "The company is committed to excellence and has established a strong presence in the commercial real estate market.";

    return (
        <div className="bg-white rounded-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
                Company Overview
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Section - Company Description */}
                <div className="space-y-4">
                    <div className="text-gray-700 text-sm leading-relaxed">
                        <p className="mb-4">{companyDescription}</p>
                        <p className="mb-4">{operationsText}</p>
                        <p>{commitmentText}</p>
                    </div>
                </div>

                {/* Right Section - Key Metrics Tables (Two Columns) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Table */}
                    <div className="bg-white">
                        <table className="w-full">
                            <tbody>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top w-1/2">
                                        Properties:
                                    </td>
                                    <td className="py-2 text-sm text-gray-900 align-top">
                                        {formatNumber(company.properties)}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        Portfolio SF:
                                    </td>
                                    <td className="py-2 text-sm text-gray-900">
                                        {formatSF(company.portfolio_sf)} SF
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        Average SF:
                                    </td>
                                    <td className="py-2 text-sm text-gray-900">
                                        {formatSF(company.average_sf)} SF
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        Apartment Units:
                                    </td>
                                    <td className="py-2 text-sm text-gray-900">
                                        {formatNumber(company.apt_units)}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        Hotel Rooms:
                                    </td>
                                    <td className="py-2 text-sm text-gray-900">
                                        {formatNumber(company.hotel_rooms)}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        Land (Acres):
                                    </td>
                                    <td className="py-2 text-sm text-gray-900">
                                        {formatNumber(company.land_acre)}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        Sale Listings:
                                    </td>
                                    <td className="py-2 text-sm text-gray-900">
                                        {formatNumber(company.sale_listings)}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        Owner Type:
                                    </td>
                                    <td className="py-2 text-sm text-gray-900">
                                        {company.owner_type || "—"}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Right Table */}
                    <div className="bg-white">
                        <table className="w-full">
                            <tbody>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top w-1/2">
                                        Main Property Type:
                                    </td>
                                    <td className="py-2 text-sm text-gray-900 align-top">
                                        {company.main_property_type || "—"}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        Territory:
                                    </td>
                                    <td className="py-2 text-sm text-gray-900">
                                        {company.territory || "—"}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        Continental Focus:
                                    </td>
                                    <td className="py-2 text-sm text-gray-900">
                                        {company.continental_focus || "—"}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        Primary Country:
                                    </td>
                                    <td className="py-2 text-sm text-gray-900">
                                        {company.primary_country || "—"}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        Hierarchy:
                                    </td>
                                    <td className="py-2 text-sm text-gray-900">
                                        {company.hierarchy || "—"}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        SF Delivered (24M):
                                    </td>
                                    <td className="py-2 text-sm text-gray-900">
                                        {formatSF(company.sf_delivered_24_months)} SF
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        SF Under Construction:
                                    </td>
                                    <td className="py-2 text-sm text-gray-900">
                                        {formatSF(company.sf_under_construction)} SF
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        Headquarters:
                                    </td>
                                    <td className="py-2 text-sm text-gray-900">
                                        {[company.hq_city, company.hq_state, company.hq_country]
                                            .filter(Boolean)
                                            .join(", ") || "—"}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

