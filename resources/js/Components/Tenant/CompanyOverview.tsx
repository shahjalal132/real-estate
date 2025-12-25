import { Info } from "lucide-react";
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
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Company Overview</h2>
            <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4 text-gray-700">
                    <p>
                        {company.tenant_name} is a leading company in the{" "}
                        {company.industry || "commercial"} industry. Founded in{" "}
                        {company.established || "unknown"}, the company has grown to become a major
                        player with {formatNumber(totalLocations)} locations across{" "}
                        {company.territory || "multiple"} territories.
                    </p>
                    <p>
                        The company operates primarily in the {company.industry || "commercial"}{" "}
                        sector, with a focus on providing quality services and maintaining strong
                        relationships with landlords and property managers.
                        {company.territory &&
                            ` Their operations span ${company.territory} markets.`}
                    </p>
                    <p>
                        {company.tenant_name} is committed to excellence and has established a
                        strong presence in the commercial real estate market. The company continues
                        to expand its footprint and strengthen its position in the industry.
                    </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                    <dl className="grid grid-cols-2 gap-4">
                        <div>
                            <dt className="text-sm font-medium text-gray-600">Locations</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {formatNumber(totalLocations)}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-600">Size Occupied</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {formatSF(company.sf_occupied)} SF
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-600">
                                Highest Use By Size
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {formatPercent(company.highest_use_by_sf)} {company.industry || "—"}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-600">Employees</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {formatNumber(company.employees)}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-600">Revenue</dt>
                            <dd className="mt-1 text-sm text-gray-900 flex items-center gap-1">
                                {formatCurrency(company.revenue)}
                                {company.revenue && (
                                    <span className="text-gray-400">(2025)</span>
                                )}
                                <Info className="h-4 w-4 text-gray-400" />
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-600">Credit Rating</dt>
                            <dd className="mt-1 text-sm text-gray-900 flex items-center gap-1">
                                {company.credit_rating || "—"}{" "}
                                {company.credit_rating && (
                                    <span className="text-gray-400">(Low Risk)</span>
                                )}
                                {company.credit_rating && (
                                    <Info className="h-4 w-4 text-gray-400" />
                                )}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-600">Growth</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {company.growth || "Stable"}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-600">Territory</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {company.territory || "International"}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-600">Industry</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {company.industry || "—"}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-600">SIC</dt>
                            <dd className="mt-1 text-sm text-gray-900">{company.sic || "—"}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-600">NAICS</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {company.naics || "—"}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-600">Ticker</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {company.tenant_name
                                    .replace(/\s+/g, "")
                                    .substring(0, 4)
                                    .toUpperCase() || "—"}{" "}
                                (NYSE)
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-600">Established</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {company.established || "—"}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-600">Website</dt>
                            <dd className="mt-1 text-sm">
                                {company.website ? (
                                    <a
                                        href={company.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        {company.website}
                                    </a>
                                ) : (
                                    <span className="text-gray-900">—</span>
                                )}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-600">Headquarters</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {[company.hq_city, company.hq_state, company.hq_postal_code]
                                    .filter(Boolean)
                                    .join(", ") || "—"}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
}

