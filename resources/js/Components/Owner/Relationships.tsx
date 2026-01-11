import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { formatCurrency, formatSF } from "../../utils/formatting";

// Data for Investment Brokers Past Two Years By Deal Volume
const investmentBrokersData = [
    { name: "Eastdil Secured, LLC", value: 10.5 },
    { name: "CBRE", value: 3.0 },
    { name: "JLL", value: 2.5 },
    { name: "Cushman & Wakefield", value: 2.3 },
    { name: "Newmark", value: 1.8 },
    { name: "Colliers", value: 1.0 },
    { name: "Walker & Dunlop", value: 0.8 },
    { name: "Marcus & Millichap", value: 0.3 },
    { name: "Michael Elliott", value: 0.2 },
    { name: "Knight Frank", value: 0.1 },
].map((item) => ({
    ...item,
    value: item.value * 1000000000, // Convert to actual number
}));

// Data for Current Leasing Brokers By Available SF
const leasingBrokersData = [
    { name: "CBRE", value: 25.0 },
    { name: "Blackstone Inc.", value: 19.0 },
    { name: "JLL", value: 18.0 },
    { name: "Cushman & Wakefield", value: 17.0 },
    { name: "Colliers", value: 13.5 },
    { name: "Newmark", value: 6.0 },
    { name: "Savills", value: 5.0 },
    { name: "Dowley Turner Real Estate", value: 4.5 },
    { name: "Lee & Associates", value: 4.0 },
    { name: "Avison Young", value: 3.5 },
].map((item) => ({
    ...item,
    value: item.value * 1000000, // Convert to actual number (SF)
}));

// Custom tooltip for investment brokers (currency)
const InvestmentTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
                <p className="font-semibold">{data.name}</p>
                <p className="text-orange-600">
                    {formatCurrency(data.value)}
                </p>
            </div>
        );
    }
    return null;
};

// Custom tooltip for leasing brokers (SF)
const LeasingTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
                <p className="font-semibold">{data.name}</p>
                <p className="text-orange-600">
                    {formatSF(data.value)}
                </p>
            </div>
        );
    }
    return null;
};

export default function Relationships() {
    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900">
                    Relationships
                </h2>
            </div>

            {/* Charts Grid */}
            <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Investment Brokers Chart */}
                    <div className="bg-white">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Investment Brokers Past Two Years By Deal Volume
                        </h3>
                        <div className="h-[500px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={investmentBrokersData}
                                    layout="vertical"
                                    margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
                                >
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        horizontal={true}
                                        vertical={false}
                                    />
                                    <XAxis
                                        type="number"
                                        domain={[0, 12000000000]}
                                        tickFormatter={(value) =>
                                            formatCurrency(value)
                                        }
                                        tick={{ fill: "#6B7280", fontSize: 12 }}
                                    />
                                    <YAxis
                                        type="category"
                                        dataKey="name"
                                        width={140}
                                        tick={{ fill: "#374151", fontSize: 12 }}
                                        tickLine={false}
                                    />
                                    <Tooltip content={<InvestmentTooltip />} />
                                    <Bar
                                        dataKey="value"
                                        fill="#F97316"
                                        radius={[0, 4, 4, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Leasing Brokers Chart */}
                    <div className="bg-white">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Current Leasing Brokers By Available SF
                        </h3>
                        <div className="h-[500px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={leasingBrokersData}
                                    layout="vertical"
                                    margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
                                >
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        horizontal={true}
                                        vertical={false}
                                    />
                                    <XAxis
                                        type="number"
                                        domain={[0, 30000000]}
                                        tickFormatter={(value) => formatSF(value)}
                                        tick={{ fill: "#6B7280", fontSize: 12 }}
                                    />
                                    <YAxis
                                        type="category"
                                        dataKey="name"
                                        width={140}
                                        tick={{ fill: "#374151", fontSize: 12 }}
                                        tickLine={false}
                                    />
                                    <Tooltip content={<LeasingTooltip />} />
                                    <Bar
                                        dataKey="value"
                                        fill="#F97316"
                                        radius={[0, 4, 4, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

