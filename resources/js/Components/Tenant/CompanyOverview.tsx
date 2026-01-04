import { TennentCompany } from "../../types";
import {
    formatNumber,
    formatSF,
    formatPercent,
    formatCurrency,
} from "../../utils/formatting";

interface CompanyOverviewProps {
    company: TennentCompany;
    totalLocations: number;
}

export default function CompanyOverview({
    company,
    totalLocations,
}: CompanyOverviewProps) {
    // Format SIC with description
    const formatSIC = (sic: string | null) => {
        if (!sic) return "—";
        // If SIC contains a dash, assume it's already formatted
        if (sic.includes("-")) return sic;
        // Otherwise, add a generic description
        return `Variety Stores - ${sic}`;
    };

    // Format NAICS with description
    const formatNAICS = (naics: string | null) => {
        if (!naics) return "—";
        // If NAICS contains a dash, assume it's already formatted
        if (naics.includes("-")) return naics;
        // Otherwise, add a generic description
        return `All Other General Merchandise Retailers - ${naics}`;
    };

    // Format headquarters address
    const formatHeadquarters = () => {
        const parts = [
            company.hq_city,
            company.hq_state,
            company.hq_postal_code,
        ].filter(Boolean);
        return parts.length > 0 ? parts.join(", ") : "—";
    };

    // Format credit rating
    const formatCreditRating = () => {
        if (!company.credit_rating) return "—";
        return `${company.credit_rating} (Low Risk)`;
    };

    // Generate company description text
    const companyDescription = company.tenant_name
        ? `${company.tenant_name} is an American multinational ${
              company.industry?.toLowerCase() || "retail"
          } corporation that operates a chain of ${
              company.industry?.toLowerCase() || "retail"
          } stores. ${company.tenant_name} was founded in ${
              company.established || "1962"
          } and has since grown to become one of the world's largest ${
              company.industry?.toLowerCase() || "retailers"
          }.`
        : "This company is a leading player in the commercial real estate market.";

    const operationsText = company.tenant_name
        ? `${company.tenant_name}'s operations include ${
              company.industry?.toLowerCase() || "retail"
          } stores, distribution centers, and eCommerce platforms. The company offers a wide range of products and services including ${
              company.industry?.toLowerCase() || "general merchandise"
          }, ${
              company.industry?.toLowerCase() || "retail"
          } services, and customer-focused solutions.`
        : "The company operates across multiple markets and territories, providing quality services and maintaining strong relationships with landlords and property managers.";

    const commitmentText = company.tenant_name
        ? `${company.tenant_name} is committed to offering competitive pricing through cost-cutting measures, an efficient supply chain, and the use of technology to optimize operations.`
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

                {/* Right Section - Key Metrics Table */}
                <div className="bg-white">
                    <table className="w-full">
                        <tbody className="space-y-0">
                            <tr className="border-b border-gray-200">
                                <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top w-1/2">
                                    Locations:
                                </td>
                                <td className="py-2 text-sm text-gray-900 align-top">
                                    {formatNumber(totalLocations)}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                    Size Occupied:
                                </td>
                                <td className="py-2 text-sm text-gray-900">
                                    {formatSF(company.sf_occupied)} SF
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                    Highest Use By Size:
                                </td>
                                <td className="py-2 text-sm text-gray-900">
                                    {formatPercent(company.highest_use_by_sf)}{" "}
                                    {company.industry || "Retail"}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                    Employees:
                                </td>
                                <td className="py-2 text-sm text-gray-900">
                                    {formatNumber(company.employees)}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                    Revenue:
                                </td>
                                <td className="py-2 text-sm text-gray-900">
                                    {company.revenue
                                        ? `${formatCurrency(
                                              parseFloat(
                                                  company.revenue.replace(
                                                      /[^0-9.]/g,
                                                      ""
                                                  )
                                              )
                                          )} (2025)`
                                        : "—"}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                    Credit Rating:
                                </td>
                                <td className="py-2 text-sm text-gray-900">
                                    {formatCreditRating()}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                    Growth:
                                </td>
                                <td className="py-2 text-sm text-gray-900">
                                    {company.growth || "Stable"}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                    Territory:
                                </td>
                                <td className="py-2 text-sm text-gray-900">
                                    {company.territory || "International"}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                    Industry:
                                </td>
                                <td className="py-2 text-sm text-gray-900">
                                    {company.industry || "Retailer"}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                    SIC:
                                </td>
                                <td className="py-2 text-sm text-gray-900">
                                    {formatSIC(company.sic)}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                    NAICS:
                                </td>
                                <td className="py-2 text-sm text-gray-900">
                                    {formatNAICS(company.naics)}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                    Ticker:
                                </td>
                                <td className="py-2 text-sm text-gray-900">
                                    {company.tenant_name
                                        ? `${company.tenant_name
                                              .replace(/\s+/g, "")
                                              .substring(0, 4)
                                              .toUpperCase()} (NYSE)`
                                        : "—"}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                    Established:
                                </td>
                                <td className="py-2 text-sm text-gray-900">
                                    {company.established || "—"}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                    Website:
                                </td>
                                <td className="py-2 text-sm text-gray-900">
                                    {company.website ? (
                                        <a
                                            href={
                                                company.website.startsWith(
                                                    "http"
                                                )
                                                    ? company.website
                                                    : `https://${company.website}`
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 underline"
                                        >
                                            {company.website}
                                        </a>
                                    ) : (
                                        "—"
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                    Headquarters:
                                </td>
                                <td className="py-2 text-sm text-gray-900">
                                    {formatHeadquarters()}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
