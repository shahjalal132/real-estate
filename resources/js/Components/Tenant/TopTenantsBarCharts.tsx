import { formatNumber } from "../../utils/formatting";

interface BarChartData {
    name: string;
    value: number; // in SF
}

interface TopBarChartProps {
    data: BarChartData[];
    title: string;
    maxValue: number;
}

// Format SF value for display
const formatSF = (value: number): string => {
    if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
        return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toLocaleString();
};

// Format SF value with full precision for axis labels
const formatAxisSF = (value: number): string => {
    if (value >= 1000000) {
        return `${(value / 1000000).toFixed(0)}M`;
    }
    if (value >= 1000) {
        return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
};

function TopBarChart({ data, title, maxValue }: TopBarChartProps) {
    const barHeight = 28;
    const barSpacing = 12;
    const labelWidth = 200;
    const chartPadding = {
        left: labelWidth,
        right: 80,
        top: 40,
        bottom: 40,
    };
    
    const chartHeight = data.length * (barHeight + barSpacing) + chartPadding.top + chartPadding.bottom;
    const chartWidth = 800;

    // Generate grid lines
    const gridLines = [];
    const numGridLines = 5;
    for (let i = 0; i <= numGridLines; i++) {
        const value = (maxValue / numGridLines) * i;
        const x = chartPadding.left + (chartWidth - chartPadding.left - chartPadding.right) * (i / numGridLines);
        gridLines.push({ x, value });
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-6">
                {title}
            </h3>
            <div className="w-full overflow-x-auto">
                <svg
                    width={chartWidth}
                    height={chartHeight}
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                    className="overflow-visible"
                >
                    {/* Grid lines */}
                    {gridLines.map((grid, index) => (
                        <g key={index}>
                            <line
                                x1={grid.x}
                                y1={chartPadding.top - 20}
                                x2={grid.x}
                                y2={chartHeight - chartPadding.bottom}
                                stroke="#E5E7EB"
                                strokeWidth="1"
                            />
                            {/* Grid label */}
                            <text
                                x={grid.x}
                                y={chartPadding.top - 8}
                                textAnchor="middle"
                                fill="#6B7280"
                                fontSize="11"
                                fontFamily="system-ui, -apple-system, sans-serif"
                            >
                                {formatAxisSF(grid.value)} SF
                            </text>
                        </g>
                    ))}

                    {/* Bars */}
                    {data.map((item, index) => {
                        const y = chartPadding.top + index * (barHeight + barSpacing);
                        const barWidth = ((chartWidth - chartPadding.left - chartPadding.right) * item.value) / maxValue;

                        return (
                            <g key={index}>
                                {/* Label */}
                                <text
                                    x={chartPadding.left - 12}
                                    y={y + barHeight / 2}
                                    textAnchor="end"
                                    fill="#111827"
                                    fontSize="12"
                                    fontFamily="system-ui, -apple-system, sans-serif"
                                    dominantBaseline="middle"
                                    className="font-medium"
                                >
                                    {item.name.length > 35 
                                        ? `${item.name.substring(0, 32)}...` 
                                        : item.name}
                                </text>

                                {/* Bar */}
                                <rect
                                    x={chartPadding.left}
                                    y={y}
                                    width={barWidth}
                                    height={barHeight}
                                    fill="#F97316"
                                    rx={2}
                                    className="transition-all duration-200 hover:opacity-80"
                                />

                                {/* Value label at end of bar */}
                                {barWidth > 60 && (
                                    <text
                                        x={chartPadding.left + barWidth - 8}
                                        y={y + barHeight / 2}
                                        textAnchor="end"
                                        fill="#111827"
                                        fontSize="11"
                                        fontFamily="system-ui, -apple-system, sans-serif"
                                        dominantBaseline="middle"
                                        className="font-semibold"
                                    >
                                        {formatSF(item.value)} SF
                                    </text>
                                )}
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}

export default function TopTenantsBarCharts() {
    // Dummy data matching the screenshot
    const tenantRepsData: BarChartData[] = [
        { name: "JLL", value: 7200000 },
        { name: "Colliers", value: 4200000 },
        { name: "The State of South Carolina", value: 3500000 },
        { name: "Cushman & Wakefield", value: 2800000 },
        { name: "CBRE", value: 2500000 },
        { name: "OnPace Partners", value: 2200000 },
        { name: "Newmark", value: 800000 },
        { name: "Payson Smith Holbrook", value: 500000 },
        { name: "B. D. Baker Company", value: 300000 },
        { name: "NAI Global", value: 200000 },
    ];

    const landlordsData: BarChartData[] = [
        { name: "Walmart Inc.", value: 550000000 },
        { name: "Walmart", value: 120000000 },
        { name: "SmartCentres Real Estate Investment...", value: 20000000 },
        { name: "The Kroenke Group", value: 15000000 },
        { name: "Prologis, Inc.", value: 10000000 },
        { name: "Realty Income Corporation", value: 8000000 },
        { name: "Agree Realty Corporation", value: 7000000 },
        { name: "Blackstone Inc.", value: 5000000 },
        { name: "Fibra Uno", value: 4000000 },
        { name: "Majestic Realty Co.", value: 3000000 },
    ];

    const tenantRepsMax = Math.max(...tenantRepsData.map(d => d.value));
    const landlordsMax = Math.max(...landlordsData.map(d => d.value));

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopBarChart
                data={tenantRepsData}
                title="Top Tenant Reps By Occupied SF"
                maxValue={tenantRepsMax}
            />
            <TopBarChart
                data={landlordsData}
                title="Top Landlords By Occupied SF"
                maxValue={landlordsMax}
            />
        </div>
    );
}

