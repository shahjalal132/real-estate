import { useState } from "react";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { formatSF, formatNumber, formatCurrency } from "../../utils/formatting";

export default function LeasingOccupierActivity() {
    const [propertyType, setPropertyType] = useState("All");

    // Static summary data
    const summaryData = {
        properties: 12480,
        vacancyRate: 12.1,
        availabilityRate: 15.5,
        availableSF: 132000000,
        netAbsorption12Mo: -6400000,
        leasingSF12Mo: 45000000,
        rentPerSF: 16.1,
    };

    // Static data for Availability & Vacancy line chart
    const availabilityVacancyData = [
        { quarter: "Q1 24", availability: 13.2, vacancy: 8.2 },
        { quarter: "Q2 24", availability: 13.8, vacancy: 9.1 },
        { quarter: "Q3 24", availability: 14.5, vacancy: 10.2 },
        { quarter: "Q4 24", availability: 15.2, vacancy: 11.3 },
        { quarter: "Q1 25", availability: 15.6, vacancy: 11.8 },
        { quarter: "Q2 25", availability: 15.9, vacancy: 12.3 },
        { quarter: "Q3 25", availability: 16.0, vacancy: 12.7 },
        { quarter: "Q4 25", availability: 15.8, vacancy: 12.4 },
        { quarter: "Q1 26", availability: 15.5, vacancy: 12.0 },
    ];

    // Static data for Leasing Activity bar chart
    const leasingActivityData = [
        { quarter: "Q1 24", leasedSF: 11700000 },
        { quarter: "Q2 24", leasedSF: 12800000 },
        { quarter: "Q3 24", leasedSF: 13800000 },
        { quarter: "Q4 24", leasedSF: 10500000 },
        { quarter: "Q1 25", leasedSF: 11800000 },
        { quarter: "Q2 25", leasedSF: 11500000 },
        { quarter: "Q3 25", leasedSF: 11200000 },
        { quarter: "Q4 25", leasedSF: 10700000 },
        { quarter: "Q1 26", leasedSF: 2000000 },
    ];

    // Custom tooltip for line chart
    const lineChartTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
                    <p className="font-semibold mb-2">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} style={{ color: entry.color }} className="text-sm">
                            {`${entry.name}: ${entry.value}%`}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    // Custom tooltip for bar chart
    const barChartTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
                    <p className="font-semibold mb-2">{label}</p>
                    <p style={{ color: payload[0].color }} className="text-sm">
                        {`Leased SF: ${formatSF(payload[0].value)}`}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                    Leasing & Occupier Activity
                </h3>
                <div>
                    <label className="sr-only">Property Type</label>
                    <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="All">Property Type All</option>
                        <option value="Office">Office</option>
                        <option value="Retail">Retail</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Multifamily">Multifamily</option>
                    </select>
                </div>
            </div>

            {/* Summary Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <h4 className="text-sm font-semibold text-gray-900">Total</h4>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <tbody className="divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-3 text-sm font-medium text-gray-700 w-1/4">
                                    Properties:
                                </td>
                                <td className="px-6 py-3 text-sm text-gray-900">
                                    {formatNumber(summaryData.properties)}
                                </td>
                                <td className="px-6 py-3 text-sm font-medium text-gray-700 w-1/4">
                                    Availability Rate:
                                </td>
                                <td className="px-6 py-3 text-sm text-gray-900">
                                    {summaryData.availabilityRate}%
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-3 text-sm font-medium text-gray-700">
                                    Vacancy Rate:
                                </td>
                                <td className="px-6 py-3 text-sm text-gray-900">
                                    {summaryData.vacancyRate}%
                                </td>
                                <td className="px-6 py-3 text-sm font-medium text-gray-700">
                                    Available SF:
                                </td>
                                <td className="px-6 py-3 text-sm text-gray-900">
                                    {formatSF(summaryData.availableSF)}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-3 text-sm font-medium text-gray-700">
                                    12 Mo. Net Absorption:
                                </td>
                                <td className="px-6 py-3 text-sm text-gray-900">
                                    {summaryData.netAbsorption12Mo >= 0
                                        ? formatSF(summaryData.netAbsorption12Mo)
                                        : `-${formatSF(Math.abs(summaryData.netAbsorption12Mo))}`}
                                </td>
                                <td className="px-6 py-3 text-sm font-medium text-gray-700">
                                    Rent $/SF:
                                </td>
                                <td className="px-6 py-3 text-sm text-gray-900">
                                    ${summaryData.rentPerSF.toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-3 text-sm font-medium text-gray-700">
                                    12 Mo. Leasing SF:
                                </td>
                                <td className="px-6 py-3 text-sm text-gray-900">
                                    {formatSF(summaryData.leasingSF12Mo)}
                                </td>
                                <td className="px-6 py-3 text-sm font-medium text-gray-700"></td>
                                <td className="px-6 py-3 text-sm text-gray-900"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Availability & Vacancy Line Chart */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-base font-semibold text-gray-900 mb-4">
                        Availability & Vacancy
                    </h4>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={availabilityVacancyData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                    dataKey="quarter"
                                    tick={{ fontSize: 12 }}
                                />
                                <YAxis
                                    domain={[7, 17]}
                                    ticks={[7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]}
                                    tickFormatter={(value) => `${value}%`}
                                    tick={{ fontSize: 11 }}
                                />
                                <Tooltip content={lineChartTooltip} />
                                <Legend
                                    wrapperStyle={{ paddingTop: "20px" }}
                                    iconType="square"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="availability"
                                    stroke="#F97316"
                                    strokeWidth={2}
                                    name="Availability"
                                    dot={{ r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="vacancy"
                                    stroke="#3B82F6"
                                    strokeWidth={2}
                                    name="Vacancy"
                                    dot={{ r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Leasing Activity in SF Bar Chart */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-base font-semibold text-gray-900 mb-4">
                        Leasing Activity in SF
                    </h4>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={leasingActivityData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                    dataKey="quarter"
                                    tick={{ fontSize: 12 }}
                                />
                                <YAxis
                                    domain={[0, 16000000]}
                                    ticks={[0, 2000000, 4000000, 6000000, 8000000, 10000000, 12000000, 14000000, 16000000]}
                                    tickFormatter={(value) => formatSF(value)}
                                    tick={{ fontSize: 11 }}
                                />
                                <Tooltip content={barChartTooltip} />
                                <Bar dataKey="leasedSF" fill="#F97316" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

