import { TennentCompany } from "../../types";
import { formatNumber, formatSF, formatPercent, formatCurrency } from "../../utils/formatting";

interface CompanyMetricsProps {
    company: TennentCompany;
    totalLocations: number;
}

export default function CompanyMetrics({ company, totalLocations }: CompanyMetricsProps) {
    return (
        <div className="mt-6 grid grid-cols-6 gap-6">
            <div>
                <div className="text-2xl font-bold text-gray-900">
                    {formatNumber(totalLocations)}
                </div>
                <div className="text-sm text-gray-600">Locations</div>
            </div>
            <div>
                <div className="text-2xl font-bold text-gray-900">
                    {formatSF(company.sf_occupied)} SF
                </div>
                <div className="text-sm text-gray-600">SF Occupied</div>
            </div>
            <div>
                <div className="text-2xl font-bold text-gray-900">
                    {formatPercent(company.highest_use_by_sf)} {company.industry || "—"}
                </div>
                <div className="text-sm text-gray-600">Highest Use By SF</div>
            </div>
            <div>
                <div className="text-2xl font-bold text-gray-900">
                    {formatNumber(company.employees)}
                </div>
                <div className="text-sm text-gray-600">Employees</div>
            </div>
            <div>
                <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(company.revenue)}
                </div>
                <div className="text-sm text-gray-600">Revenue</div>
            </div>
            <div>
                <div className="text-2xl font-bold text-gray-900">
                    {company.credit_rating || "—"}
                </div>
                <div className="text-sm text-gray-600">Credit Rating</div>
            </div>
        </div>
    );
}

