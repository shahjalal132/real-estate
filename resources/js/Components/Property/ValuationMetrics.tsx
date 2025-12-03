import BarChart from "./Charts/BarChart";
import LineChart from "./Charts/LineChart";

export default function ValuationMetrics() {
    const marketValueTrend = [
        { label: "2020", value: 3200000 },
        { label: "2021", value: 3400000 },
        { label: "2022", value: 3500000 },
        { label: "2023", value: 3725000 },
        { label: "2024", value: 3900000 },
    ];

    const pricePerSfTrend = [
        { label: "2020", value: 285 },
        { label: "2021", value: 303 },
        { label: "2022", value: 320 },
        { label: "2023", value: 338 },
        { label: "2024", value: 355 },
    ];

    const capRateComparison = [
        { label: "Property", value: 6.25, color: "#0066CC" },
        { label: "Market Avg", value: 5.8, color: "#0052A3" },
        { label: "Submarket", value: 6.5, color: "#004080" },
    ];

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
                Valuation Metrics
            </h2>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 border-2 border-[#0066CC] rounded-lg p-6">
                    <div className="text-sm text-gray-600 mb-2">
                        Market Value
                    </div>
                    <div className="text-3xl font-bold text-[#0066CC]">
                        $3,725,000
                    </div>
                </div>
                <div className="bg-blue-50 border-2 border-[#0066CC] rounded-lg p-6">
                    <div className="text-sm text-gray-600 mb-2">
                        Price per SF
                    </div>
                    <div className="text-3xl font-bold text-[#0066CC]">
                        $341.50
                    </div>
                </div>
                <div className="bg-blue-50 border-2 border-[#0066CC] rounded-lg p-6">
                    <div className="text-sm text-gray-600 mb-2">Cap Rate</div>
                    <div className="text-3xl font-bold text-[#0066CC]">
                        6.25%
                    </div>
                </div>
            </div>

            {/* Market Value and Price per SF Trends - Combined Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Market Value Trend */}
                <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Market Value Trend (5 Years)
                    </h3>
                    <LineChart
                        data={marketValueTrend}
                        height={280}
                        color="#0066CC"
                        formatValue={(val) => `$${(val / 1000000).toFixed(1)}M`}
                    />
                </div>

                {/* Price per SF Trend */}
                <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Price per Square Foot Trend
                    </h3>
                    <LineChart
                        data={pricePerSfTrend}
                        height={280}
                        color="#0052A3"
                        formatValue={(val) => `$${val.toFixed(0)}`}
                    />
                </div>
            </div>

            {/* Cap Rate Comparison */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Cap Rate Comparison
                </h3>
                <div className="bg-gray-50 rounded-lg p-6">
                    <BarChart data={capRateComparison} height={200} />
                </div>
            </div>
        </div>
    );
}
