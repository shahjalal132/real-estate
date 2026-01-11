import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { formatCurrency } from "../../utils/formatting";

// Property type colors matching the screenshot
const propertyTypeColors: Record<string, string> = {
    Hospitality: "#17A2B8", // Teal
    Specialty: "#6F42C1", // Dark Purple
    Multifamily: "#20C997", // Dark Green
    "Health Care": "#17A2B8", // Light Blue
    Industrial: "#6610F2", // Purple
    Land: "#8B4513", // Brown
    Office: "#007BFF", // Blue
    Retail: "#FFC107", // Yellow
    Flex: "#9C27B0", // Light Purple
    "Sports & Entertainment": "#6F42C1", // Darker Purple
};

export default function TransactionActivityCharts() {
    // Static data for Acquisition Activity chart
    const acquisitionData = [
        {
            quarter: "Q1 24",
            Hospitality: 100000000,
            Specialty: 100000000,
            Multifamily: 100000000,
            "Health Care": 100000000,
            Industrial: 100000000,
        },
        {
            quarter: "Q2 24",
            Hospitality: 200000000,
            Specialty: 1000000000,
            Multifamily: 11000000000,
            "Health Care": 200000000,
            Industrial: 500000000,
        },
        {
            quarter: "Q3 24",
            Hospitality: 100000000,
            Specialty: 200000000,
            Multifamily: 500000000,
            "Health Care": 100000000,
            Industrial: 500000000,
        },
        {
            quarter: "Q4 24",
            Hospitality: 100000000,
            Specialty: 200000000,
            Multifamily: 800000000,
            "Health Care": 100000000,
            Industrial: 500000000,
        },
        {
            quarter: "Q1 25",
            Hospitality: 100000000,
            Specialty: 800000000,
            Multifamily: 100000000,
            "Health Care": 100000000,
            Industrial: 100000000,
        },
        {
            quarter: "Q2 25",
            Hospitality: 100000000,
            Specialty: 200000000,
            Multifamily: 200000000,
            "Health Care": 800000000,
            Industrial: 500000000,
        },
        {
            quarter: "Q3 25",
            Hospitality: 100000000,
            Specialty: 200000000,
            Multifamily: 800000000,
            "Health Care": 100000000,
            Industrial: 800000000,
        },
        {
            quarter: "Q4 25",
            Hospitality: 100000000,
            Specialty: 200000000,
            Multifamily: 500000000,
            "Health Care": 100000000,
            Industrial: 800000000,
        },
        {
            quarter: "Q1 26",
        },
    ];

    // Static data for Disposition Activity chart
    const dispositionData = [
        {
            quarter: "Q1 24",
            Hospitality: 150000000,
            Specialty: 1800000000,
            Multifamily: 150000000,
        },
        {
            quarter: "Q2 24",
            Hospitality: 500000000,
            Specialty: 3000000000,
            Multifamily: 400000000,
        },
        {
            quarter: "Q3 24",
            Hospitality: 100000000,
            Specialty: 1500000000,
            Multifamily: 4300000000,
        },
        {
            quarter: "Q4 24",
            Hospitality: 100000000,
            Specialty: 3200000000,
            Multifamily: 1500000000,
            Retail: 100000000,
        },
        {
            quarter: "Q1 25",
            Hospitality: 100000000,
            Specialty: 1200000000,
            Multifamily: 300000000,
            Retail: 100000000,
        },
        {
            quarter: "Q2 25",
            Hospitality: 100000000,
            Specialty: 2200000000,
            Multifamily: 1500000000,
            Retail: 100000000,
        },
        {
            quarter: "Q3 25",
            Hospitality: 100000000,
            Specialty: 1800000000,
            Multifamily: 1200000000,
            Retail: 200000000,
        },
        {
            quarter: "Q4 25",
            Hospitality: 100000000,
            Specialty: 2000000000,
            Multifamily: 500000000,
            Retail: 100000000,
        },
        {
            quarter: "Q1 26",
        },
    ];

    const stackKeys = [
        "Hospitality",
        "Specialty",
        "Multifamily",
        "Health Care",
        "Industrial",
        "Land",
        "Office",
        "Retail",
        "Flex",
        "Sports & Entertainment",
    ];

    // Custom tooltip formatter
    const customTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
                    <p className="font-semibold mb-2">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} style={{ color: entry.color }} className="text-sm">
                            {`${entry.name}: ${formatCurrency(entry.value)}`}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Transaction Activity
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Acquisition Activity Chart */}
                <div>
                    <h4 className="text-base font-semibold text-gray-900 mb-4">
                        Acquisition Activity
                    </h4>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={acquisitionData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                    dataKey="quarter"
                                    tick={{ fontSize: 12 }}
                                />
                                <YAxis
                                    tickFormatter={(value) => {
                                        if (value >= 1000000000) {
                                            return `$${(value / 1000000000).toFixed(0)}B`;
                                        }
                                        return `$${value / 1000000}M`;
                                    }}
                                    domain={[0, 16000000000]}
                                    ticks={[0, 2000000000, 4000000000, 6000000000, 8000000000, 10000000000, 12000000000, 14000000000, 16000000000]}
                                    tick={{ fontSize: 11 }}
                                />
                                <Tooltip content={customTooltip} />
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
                </div>

                {/* Disposition Activity Chart */}
                <div>
                    <h4 className="text-base font-semibold text-gray-900 mb-4">
                        Disposition Activity
                    </h4>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={dispositionData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                    dataKey="quarter"
                                    tick={{ fontSize: 12 }}
                                />
                                <YAxis
                                    tickFormatter={(value) => {
                                        if (value >= 1000000000) {
                                            return `$${(value / 1000000000).toFixed(0)}B`;
                                        }
                                        return `$${value / 1000000}M`;
                                    }}
                                    domain={[0, 7000000000]}
                                    ticks={[0, 1000000000, 2000000000, 3000000000, 4000000000, 5000000000, 6000000000, 7000000000]}
                                    tick={{ fontSize: 11 }}
                                />
                                <Tooltip content={customTooltip} />
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
                </div>
            </div>

            {/* Shared Legend */}
            <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-4 justify-center">
                    {stackKeys.filter(key => 
                        acquisitionData.some(d => d[key as keyof typeof d]) || 
                        dispositionData.some(d => d[key as keyof typeof d])
                    ).map((type) => (
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
        </div>
    );
}

