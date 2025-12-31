import { formatNumber, formatSF, formatCurrency } from "../../utils/formatting";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

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

interface SummaryMetricsProps {
    company: OwnerCompany;
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

export default function SummaryMetrics({ company }: SummaryMetricsProps) {
    // Dummy trend data - in real app, this would come from API
    const dummyTrends = {
        properties: { value: 8, isPositive: true },
        portfolioSF: { value: 12, isPositive: true },
        averageSF: { value: -2, isPositive: false },
        saleListings: { value: 5, isPositive: true },
        acquisitions: { value: 18, isPositive: true },
        dispositions: { value: -4, isPositive: false },
        portfolioValue: { value: 10, isPositive: true },
        occupancyRate: { value: 3, isPositive: true },
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Key Metrics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <MetricCard
                        label="Total Properties"
                        value={formatNumber(company.properties)}
                        trend={dummyTrends.properties}
                    />
                    <MetricCard
                        label="Portfolio SF"
                        value={formatSF(company.portfolio_sf) + " SF"}
                        trend={dummyTrends.portfolioSF}
                    />
                    <MetricCard
                        label="Average SF"
                        value={formatSF(company.average_sf) + " SF"}
                        trend={dummyTrends.averageSF}
                    />
                    <MetricCard
                        label="Sale Listings"
                        value={formatNumber(company.sale_listings)}
                        trend={dummyTrends.saleListings}
                    />
                    <MetricCard
                        label="Acquisitions (24M)"
                        value={formatCurrency(company.acquisitions_24_months)}
                        trend={dummyTrends.acquisitions}
                    />
                    <MetricCard
                        label="Dispositions (24M)"
                        value={formatCurrency(company.dispositions_24_months)}
                        trend={dummyTrends.dispositions}
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
                            Portfolio Value
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                            {formatCurrency(company.sale_listings_value)}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                            Estimated Value
                        </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="text-sm font-medium text-gray-600 mb-2">
                            Occupancy Rate
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                            {(company as any).occupancy_rate || "94.5"}%
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                            Current Rate
                        </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="text-sm font-medium text-gray-600 mb-2">
                            Active Markets
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                            {company.territory
                                ? company.territory.split(",").length
                                : "8"}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                            Territories
                        </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="text-sm font-medium text-gray-600 mb-2">
                            Property Types
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                            {company.main_property_type || "Mixed"}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                            Primary Focus
                        </div>
                    </div>
                </div>
            </div>

            {/* Development Pipeline */}
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Development Pipeline
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="text-sm font-medium text-gray-600 mb-2">
                            SF Delivered (24 Months)
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                            {formatSF(company.sf_delivered_24_months) + " SF"}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                            Recently Completed
                        </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="text-sm font-medium text-gray-600 mb-2">
                            SF Under Construction
                        </div>
                        <div className="text-2xl font-bold text-blue-600">
                            {formatSF(company.sf_under_construction) + " SF"}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                            In Progress
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

