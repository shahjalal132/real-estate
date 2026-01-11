import { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import { formatSF, formatCurrency, formatNumber } from "../../utils/formatting";

// Property type colors matching the screenshot
const propertyTypeColors: Record<string, string> = {
    Hospitality: "#17A2B8", // Teal
    Industrial: "#6610F2", // Dark Purple
    Land: "#8B4513", // Brown
    Office: "#007BFF", // Blue
    Retail: "#FFC107", // Yellow
    Flex: "#9C27B0", // Light Purple
    "Sports & Entertainment": "#6F42C1", // Darker Purple
    Specialty: "#28A745", // Dark Green
    Multifamily: "#20C997", // Green
    "Health Care": "#17A2B8", // Light Blue
    Student: "#7CB342", // Lighter Green
    Other: "#9CA3AF", // Gray
};

export default function PortfolioAnalytics() {
    const [sfPropertiesToggle, setSfPropertiesToggle] = useState(true);

    // Static data for "Portfolio By Top Markets" horizontal bar chart
    // Data represents total SF per market, segmented by property type
    const topMarketsData = [
        {
            market: "Atlanta",
            Hospitality: 5000000,
            Industrial: 15000000,
            Office: 8000000,
            Retail: 3000000,
            Multifamily: 7000000,
            total: 38000000,
        },
        {
            market: "Dallas-Fort Worth",
            Hospitality: 4000000,
            Industrial: 20000000,
            Office: 6000000,
            Retail: 4000000,
            Multifamily: 5000000,
            total: 39000000,
        },
        {
            market: "Orlando",
            Hospitality: 6000000,
            Industrial: 8000000,
            Office: 4000000,
            Retail: 5000000,
            Multifamily: 6000000,
            total: 29000000,
        },
        {
            market: "Richmond",
            Hospitality: 2000000,
            Industrial: 10000000,
            Office: 5000000,
            Retail: 2000000,
            Multifamily: 3000000,
            total: 22000000,
        },
        {
            market: "Chicago",
            Hospitality: 3000000,
            Industrial: 18000000,
            Office: 12000000,
            Retail: 4000000,
            Multifamily: 8000000,
            total: 45000000,
        },
        {
            market: "Phoenix",
            Hospitality: 4000000,
            Industrial: 12000000,
            Office: 7000000,
            Retail: 3000000,
            Multifamily: 5000000,
            total: 31000000,
        },
        {
            market: "Inland Empire",
            Hospitality: 3000000,
            Industrial: 16000000,
            Office: 5000000,
            Retail: 3000000,
            Multifamily: 4000000,
            total: 31000000,
        },
        {
            market: "New York",
            Hospitality: 5000000,
            Industrial: 10000000,
            Office: 20000000,
            Retail: 6000000,
            Multifamily: 15000000,
            total: 56000000,
        },
        {
            market: "Los Angeles",
            Hospitality: 6000000,
            Industrial: 14000000,
            Office: 15000000,
            Retail: 5000000,
            Multifamily: 10000000,
            total: 50000000,
        },
        {
            market: "Austin",
            Hospitality: 4000000,
            Industrial: 8000000,
            Office: 6000000,
            Retail: 3000000,
            Multifamily: 5000000,
            total: 26000000,
        },
    ];

    // Static data for "Portfolio By Property Type" donut chart
    const portfolioByTypeData = [
        { name: "Industrial", value: 758000000, percentage: 43.78, color: propertyTypeColors.Industrial },
        { name: "Land", value: 330000000, percentage: 19.06, color: propertyTypeColors.Land },
        { name: "Other", value: 303000000, percentage: 17.51, color: propertyTypeColors.Other },
        { name: "Multifamily", value: 228000000, percentage: 13.13, color: propertyTypeColors.Multifamily },
        { name: "Hospitality", value: 113000000, percentage: 6.53, color: propertyTypeColors.Hospitality },
    ];

    // Investment Activities table data
    const investmentActivities = [
        {
            activity: "Acquisitions",
            deals: 247,
            buildings: 1614,
            sf: 132000000,
            volume: 35800000000,
            avgSF: 583000,
            avgPrice: 174000000,
            pricePerSF: 301.78,
        },
        {
            activity: "Dispositions",
            deals: 484,
            buildings: 2534,
            sf: 283000000,
            volume: 51900000000,
            avgSF: 594000,
            avgPrice: 132500000,
            pricePerSF: 207.5,
        },
        {
            activity: "Net Activity",
            deals: -237,
            buildings: -920,
            sf: -151000000,
            volume: -16100000000,
            avgSF: null,
            avgPrice: null,
            pricePerSF: null,
        },
        {
            activity: "Gross Activity",
            deals: 731,
            buildings: 4148,
            sf: 415000000,
            volume: 87800000000,
            avgSF: null,
            avgPrice: null,
            pricePerSF: null,
        },
    ];

    const maxMarketValue = Math.max(...topMarketsData.map(d => d.total));
    const stackKeys = ["Hospitality", "Industrial", "Office", "Retail", "Multifamily"];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Top: Portfolio By Top Markets */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Portfolio By Top Markets
                        </h3>
                        <button
                            onClick={() => setSfPropertiesToggle(!sfPropertiesToggle)}
                            className="px-3 py-1 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50"
                        >
                            SF Properties
                        </button>
                    </div>

                    {/* Horizontal Stacked Bar Chart */}
                    <div className="h-[500px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={topMarketsData}
                                layout="vertical"
                                margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                <XAxis
                                    type="number"
                                    domain={[0, 120000000]}
                                    ticks={[0, 20000000, 40000000, 60000000, 80000000, 100000000, 120000000]}
                                    tickFormatter={(value) => formatSF(value)}
                                />
                                <YAxis
                                    type="category"
                                    dataKey="market"
                                    width={90}
                                    tick={{ fontSize: 12 }}
                                />
                                <Tooltip
                                    formatter={(value: number) => formatSF(value)}
                                    contentStyle={{ backgroundColor: "white", border: "1px solid #ccc" }}
                                />
                                {stackKeys.map((key) => (
                                    <Bar
                                        key={key}
                                        dataKey={key}
                                        stackId="a"
                                        fill={propertyTypeColors[key]}
                                    />
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Legend */}
                    <div className="mt-4 flex flex-wrap gap-4 justify-center">
                        {stackKeys.map((type) => (
                            <div key={type} className="flex items-center gap-2">
                                <div
                                    className="w-4 h-4 rounded"
                                    style={{ backgroundColor: propertyTypeColors[type] }}
                                />
                                <span className="text-sm text-gray-700">{type}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column - Top: Portfolio By Property Type */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Portfolio By Property Type
                        </h3>
                        <button
                            onClick={() => setSfPropertiesToggle(!sfPropertiesToggle)}
                            className="px-3 py-1 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50"
                        >
                            SF Properties
                        </button>
                    </div>

                    <div className="mb-4">
                        <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded">
                            <option>Property Type All</option>
                        </select>
                    </div>

                    {/* Donut Chart */}
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={portfolioByTypeData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={140}
                                    paddingAngle={2}
                                    dataKey="value"
                                    startAngle={90}
                                    endAngle={-270}
                                >
                                    {portfolioByTypeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value: number, name: string, props: any) => [
                                        `${props.payload.percentage.toFixed(2)}% - ${formatSF(value)}`,
                                        name,
                                    ]}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Chart Labels - positioned around donut */}
                    <div className="mt-4 space-y-2">
                        {portfolioByTypeData.map((item, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-3 h-3 rounded"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <span className="text-gray-700">{item.name}</span>
                                </div>
                                <div className="text-gray-900 font-medium">
                                    {item.percentage.toFixed(2)}% · {formatSF(item.value)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Left Column - Bottom: Investment Activities Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Investment Activities
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                    Activity (24 Months)
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                                    Deals
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                                    Buildings
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                                    SF
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                                    Volume
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                                    Avg SF
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                                    Avg Price
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                                    Price/SF
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {investmentActivities.map((row, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                        {row.activity}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700 text-right">
                                        {formatNumber(row.deals)}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700 text-right">
                                        {formatNumber(row.buildings)}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700 text-right">
                                        {row.sf >= 0 ? formatSF(row.sf) : `-${formatSF(Math.abs(row.sf))}`}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700 text-right">
                                        {row.volume >= 0 ? formatCurrency(row.volume) : `-${formatCurrency(Math.abs(row.volume))}`}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700 text-right">
                                        {row.avgSF ? formatSF(row.avgSF) : "—"}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700 text-right">
                                        {row.avgPrice ? formatCurrency(row.avgPrice) : "—"}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700 text-right">
                                        {row.pricePerSF ? `$${row.pricePerSF.toFixed(2)}` : "—"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

