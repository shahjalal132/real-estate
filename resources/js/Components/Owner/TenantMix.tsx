import { useState, useMemo } from "react";
import { Info } from "lucide-react";
import { Link } from "@inertiajs/react";
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
    Sector,
} from "recharts";
import { formatSF, formatNumber } from "../../utils/formatting";

interface TenantData {
    name: string;
    industry: string;
    creditRating: string;
    locations: number;
    sf: number;
    allLocations: number;
    allSF: number;
}

export default function TenantMix() {
    // Static data for Tenant Mix table
    const tenantData: TenantData[] = [
        {
            name: "Amazon",
            industry: "Retailer",
            creditRating: "A-83 (Very Low Risk)",
            locations: 62,
            sf: 21722403,
            allLocations: 2870,
            allSF: 834094458,
        },
        {
            name: "Medline",
            industry: "Manufacturing",
            creditRating: "C-50 (Moderate Risk)",
            locations: 29,
            sf: 18360194,
            allLocations: 68,
            allSF: 30906365,
        },
        {
            name: "QTS Realty Trust, Inc.",
            industry: "Information",
            creditRating: "A-76 (Very Low Risk)",
            locations: 52,
            sf: 17378709,
            allLocations: 56,
            allSF: 18854138,
        },
        {
            name: "ASDA",
            industry: "Retailer",
            creditRating: "A-89 (Very Low Risk)",
            locations: 19,
            sf: 6528447,
            allLocations: 1142,
            allSF: 49618911,
        },
        {
            name: "The Home Depot Inc",
            industry: "Retailer",
            creditRating: "B-52 (Low Risk)",
            locations: 18,
            sf: 6337291,
            allLocations: 3334,
            allSF: 354970503,
        },
    ];

    // Static data for Largest Tenant Industries bar chart
    const industriesData = [
        { name: "Manufacturing", sf: 130000000 },
        { name: "Retailer", sf: 100000000 },
        { name: "Transportation and Warehousing", sf: 90000000 },
        { name: "Wholesaler", sf: 60000000 },
        { name: "Information", sf: 55000000 },
        { name: "Professional, Scientific, and Technic...", sf: 50000000 },
        { name: "Services", sf: 30000000 },
        { name: "Real Estate", sf: 25000000 },
        { name: "Accommodation and Food Services", sf: 20000000 },
    ];

    // Static data for Count of Tenants by Size Band donut chart
    const sizeBandData = [
        { name: "<10K SF", value: 1813, color: "#F97316" }, // Orange
        { name: "10K - 50K SF", value: 1324, color: "#3B82F6" }, // Blue
        { name: "100K - 500K SF", value: 730, color: "#10B981" }, // Green
        { name: "50K - 100K SF", value: 466, color: "#FBBF24" }, // Yellow
        { name: ">500K SF", value: 185, color: "#1E40AF" }, // Dark Blue
    ];

    const maxIndustryValue = Math.max(...industriesData.map(d => d.sf));

    return (
        <div className="space-y-6">
            {/* Tenant Mix Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Tenant Mix 3,667 Tenants
                        </h3>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                    Name
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                    Industry
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                    <div className="flex items-center gap-1">
                                        <span>Credit Rating</span>
                                        <button className="text-blue-500 hover:text-blue-600">
                                            <Info className="h-3 w-3" />
                                        </button>
                                    </div>
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                                    Locations
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                                    SF
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                                    All Locations
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                                    All SF
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {tenantData.map((tenant, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm font-medium">
                                        <Link
                                            href={`/contacts/tenants/${index + 1}`}
                                            className="text-blue-600 hover:text-blue-800 underline"
                                        >
                                            {tenant.name}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        {tenant.industry}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        {tenant.creditRating}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700 text-right">
                                        {formatNumber(tenant.locations)}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700 text-right">
                                        {formatSF(tenant.sf)}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700 text-right">
                                        {formatNumber(tenant.allLocations)}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700 text-right">
                                        {formatSF(tenant.allSF)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Largest Tenant Industries Bar Chart */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-base font-semibold text-gray-900 mb-4">
                        Largest Tenant Industries
                    </h4>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={industriesData}
                                layout="vertical"
                                margin={{ top: 20, right: 30, left: 140, bottom: 20 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                <XAxis
                                    type="number"
                                    domain={[0, 160000000]}
                                    ticks={[0, 40000000, 80000000, 120000000, 160000000]}
                                    tickFormatter={(value) => formatSF(value)}
                                />
                                <YAxis
                                    type="category"
                                    dataKey="name"
                                    width={130}
                                    tick={{ fontSize: 12 }}
                                />
                                <Tooltip
                                    formatter={(value: number) => formatSF(value)}
                                    contentStyle={{ backgroundColor: "white", border: "1px solid #ccc" }}
                                />
                                <Bar dataKey="sf" fill="#F97316" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Count of Tenants by Size Band Donut Chart */}
                <TenantSizeBandDonutChart data={sizeBandData} />
            </div>
        </div>
    );
}

// Type for size band data
type SizeBandData = Array<{ name: string; value: number; color: string }>;

// Hook to calculate smart label positions for donut chart
const useLabelPositions = (data: SizeBandData, outerRadius: number, width: number, height: number) => {
    return useMemo(() => {
        const total = data.reduce((acc, item) => acc + item.value, 0);
        let startAngle = -90; // Starting from top
        const RADIAN = Math.PI / 180;
        const labelRadius = outerRadius + 60; // Distance for labels
        const cx = width / 2;
        const cy = height / 2;

        // Calculate initial positions
        const positions = data.map((item, index) => {
            const angleVal = (item.value / total) * 360;
            const midAngle = startAngle + angleVal / 2;
            startAngle += angleVal;

            const r = -midAngle * RADIAN;
            const x = cx + labelRadius * Math.cos(r);
            const y = cy + labelRadius * Math.sin(r);

            // Determine side - use angle to decide
            const isRightSide = midAngle > -90 && midAngle < 90;

            return {
                index,
                x,
                y,
                midAngle,
                isRightSide,
                name: item.name,
                value: item.value,
            };
        });

        // Separate by side and sort by Y position
        const rightSide = positions.filter(p => p.isRightSide).sort((a, b) => a.y - b.y);
        const leftSide = positions.filter(p => !p.isRightSide).sort((a, b) => a.y - b.y);

        // Adjust positions to prevent overlap
        const adjustPositions = (items: typeof positions) => {
            const minSpacing = 40;
            for (let i = 1; i < items.length; i++) {
                const prev = items[i - 1];
                const curr = items[i];
                if (curr.y - prev.y < minSpacing) {
                    curr.y = prev.y + minSpacing;
                }
            }
        };

        adjustPositions(rightSide);
        adjustPositions(leftSide);

        // Create map for quick lookup
        const positionMap = new Map();
        [...rightSide, ...leftSide].forEach(pos => {
            positionMap.set(pos.index, pos);
        });

        return positionMap;
    }, [data, outerRadius, width, height]);
};

// Custom Label Component for donut chart
const CustomLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    index,
    positionMap,
}: any) => {
    const position = positionMap.get(index);
    if (!position) return null;

    const { x, y, isRightSide, name, value } = position;
    const RADIAN = Math.PI / 180;

    // Calculate line start point from chart edge
    const startX = cx + (outerRadius + 5) * Math.cos(-midAngle * RADIAN);
    const startY = cy + (outerRadius + 5) * Math.sin(-midAngle * RADIAN);

    // Adjust label X position for better spacing
    const horizontalOffset = 20;
    const labelX = isRightSide 
        ? Math.max(x + horizontalOffset, cx + horizontalOffset)
        : Math.min(x - horizontalOffset, cx - horizontalOffset);

    return (
        <g>
            {/* Line from chart to label */}
            <path
                d={`M${startX},${startY} L${x},${y} L${labelX},${y}`}
                stroke="#D1D5DB"
                strokeWidth={1.5}
                fill="none"
            />
            {/* Label text */}
            <text
                x={labelX}
                y={y}
                textAnchor={isRightSide ? "start" : "end"}
                fill="#111827"
                fontSize="12"
                fontWeight="500"
                dominantBaseline="middle"
            >
                {name} {formatNumber(value)}
            </text>
        </g>
    );
};

// Active shape renderer for hover effect
const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    return (
        <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius + 5}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
        />
    );
};

// Separate component for the donut chart with labels
function TenantSizeBandDonutChart({ data }: { data: SizeBandData }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    
    // Chart dimensions for label calculation
    const chartWidth = 500;
    const chartHeight = 400;
    const outerRadius = 140;
    const positionMap = useLabelPositions(data, outerRadius, chartWidth, chartHeight);

    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index);
    };

    const onPieLeave = () => {
        setActiveIndex(null);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-base font-semibold text-gray-900 mb-4">
                Count of Tenants by Size Band
            </h4>
            <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={outerRadius}
                            paddingAngle={2}
                            dataKey="value"
                            startAngle={90}
                            endAngle={-270}
                            label={(props) => (
                                <CustomLabel
                                    {...props}
                                    positionMap={positionMap}
                                />
                            )}
                            activeIndex={activeIndex !== null ? activeIndex : undefined}
                            activeShape={renderActiveShape}
                            onMouseEnter={onPieEnter}
                            onMouseLeave={onPieLeave}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value: number, name: string, props: any) => [
                                `${formatNumber(value)} Tenants`,
                                props.payload.name,
                            ]}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

