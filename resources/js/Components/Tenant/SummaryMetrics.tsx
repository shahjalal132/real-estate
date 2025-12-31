import { TennentCompany } from "../../types";
import { formatNumber, formatSF, formatPercent, formatCurrency } from "../../utils/formatting";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface SummaryMetricsProps {
    company: TennentCompany;
    totalLocations: number;
}

interface MetricCardProps {
    label: string;
    value: string | number;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    icon?: React.ReactNode;
}

function MetricCard({ label, value, trend, icon }: MetricCardProps) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-600">{label}</div>
                {icon && <div className="text-gray-400">{icon}</div>}
            </div>
            <div className="flex items-end justify-between">
                <div className="text-3xl font-bold text-gray-900">{value}</div>
                {trend && (
                    <div
                        className={`flex items-center gap-1 text-sm font-medium ${
                            trend.isPositive
                                ? "text-green-600"
                                : trend.value === 0
                                ? "text-gray-500"
                                : "text-red-600"
                        }`}
                    >
                        {trend.value > 0 ? (
                            <TrendingUp className="w-4 h-4" />
                        ) : trend.value < 0 ? (
                            <TrendingDown className="w-4 h-4" />
                        ) : (
                            <Minus className="w-4 h-4" />
                        )}
                        <span>{Math.abs(trend.value)}%</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function SummaryMetrics({
    company,
    totalLocations,
}: SummaryMetricsProps) {
    // Dummy trend data - in real app, this would come from API
    const dummyTrends = {
        locations: { value: 12, isPositive: true },
        sfOccupied: { value: 8, isPositive: true },
        employees: { value: -3, isPositive: false },
        revenue: { value: 15, isPositive: true },
        avgLeaseTerm: { value: 0, isPositive: true },
        creditRating: null,
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Key Metrics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <MetricCard
                        label="Total Locations"
                        value={formatNumber(totalLocations)}
                        trend={dummyTrends.locations}
                    />
                    <MetricCard
                        label="SF Occupied"
                        value={formatSF(company.sf_occupied) + " SF"}
                        trend={dummyTrends.sfOccupied}
                    />
                    <MetricCard
                        label="Employees"
                        value={formatNumber(company.employees)}
                        trend={dummyTrends.employees}
                    />
                    <MetricCard
                        label="Revenue"
                        value={formatCurrency(company.revenue)}
                        trend={dummyTrends.revenue}
                    />
                    <MetricCard
                        label="Avg Lease Term"
                        value={
                            (company as any).average_lease_term
                                ? `${(company as any).average_lease_term} years`
                                : "3.5 years"
                        }
                        trend={dummyTrends.avgLeaseTerm}
                    />
                    <MetricCard
                        label="Credit Rating"
                        value={company.credit_rating || "A+"}
                        trend={dummyTrends.creditRating}
                    />
                </div>
            </div>

            {/* Additional Metrics Section */}
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Portfolio Insights
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="text-sm font-medium text-gray-600 mb-2">
                            Highest Use By SF
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                            {formatPercent(company.highest_use_by_sf)}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                            {company.industry || "—"}
                        </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="text-sm font-medium text-gray-600 mb-2">
                            Growth Rate
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                            +{dummyTrends.locations.value}%
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                            Year over Year
                        </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="text-sm font-medium text-gray-600 mb-2">
                            Active Markets
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                            {company.territory
                                ? company.territory.split(",").length
                                : "15"}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                            Territories
                        </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="text-sm font-medium text-gray-600 mb-2">
                            Market Share
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                            {(company as any).market_share
                                ? `${(company as any).market_share}%`
                                : "12.5%"}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                            Industry Position
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

