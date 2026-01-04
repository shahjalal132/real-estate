import { useState, useMemo } from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Sector,
} from "recharts";
import { formatNumber } from "../../utils/formatting";

interface ChartDataItem {
    name: string;
    value: number;
    locations: number;
    color: string;
}

interface DonutChartProps {
    data: ChartDataItem[];
    title: string;
}

// Hook to calculate smart label positions and prevent overlap
const useLabelPositions = (data: ChartDataItem[], outerRadius: number, width: number, height: number) => {
    return useMemo(() => {
        const total = data.reduce((acc, item) => acc + item.value, 0);
        let startAngle = -90; // Starting from top
        const RADIAN = Math.PI / 180;
        const labelRadius = outerRadius + 70; // Increased distance for better separation
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

            // Determine side more strictly - use angle to decide
            const isRightSide = midAngle > -90 && midAngle < 90;

            return {
                index,
                x,
                y,
                midAngle,
                isRightSide,
                name: item.name,
                value: item.value,
                locations: item.locations,
            };
        });

        // Separate by side and sort by Y position
        const rightSide = positions.filter(p => p.isRightSide).sort((a, b) => a.y - b.y);
        const leftSide = positions.filter(p => !p.isRightSide).sort((a, b) => a.y - b.y);

        // Adjust positions to prevent overlap (minimum 45px spacing)
        const adjustPositions = (items: typeof positions) => {
            const minSpacing = 45;
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

// Active shape renderer for hover effect
const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    return (
        <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius + 8}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
        />
    );
};

// Custom Label Component for Recharts
const CustomLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    index,
    positionMap,
    activeIndex,
}: any) => {
    const position = positionMap.get(index);
    if (!position) return null;

    const { x, y, isRightSide, name, value, locations } = position;
    const RADIAN = Math.PI / 180;
    const isActive = activeIndex === index;

    // Calculate line start point from chart edge
    const startX = cx + (outerRadius + 5) * Math.cos(-midAngle * RADIAN);
    const startY = cy + (outerRadius + 5) * Math.sin(-midAngle * RADIAN);

    // Adjust label X position for better spacing - ensure clear left/right distribution
    // Right side labels extend further right, left side labels extend further left
    // Use the calculated x position but add offset to ensure clear separation
    const horizontalOffset = 25;
    const labelX = isRightSide 
        ? Math.max(x + horizontalOffset, cx + horizontalOffset)  // Ensure right side is to the right
        : Math.min(x - horizontalOffset, cx - horizontalOffset); // Ensure left side is to the left

    // Format value
    const formatValue = (val: number): string => {
        if (val >= 1000000000) {
            return `${(val / 1000000000).toFixed(1)}B`;
        }
        if (val >= 1000000) {
            return `${(val / 1000000).toFixed(1)}M`;
        }
        if (val >= 1000) {
            return `${(val / 1000).toFixed(1)}K`;
        }
        return val.toLocaleString();
    };

    // Highlight colors when active
    const isInactive = activeIndex !== null && activeIndex !== index;
    const lineColor = isActive ? "#6B7280" : isInactive ? "#E5E7EB" : "#D1D5DB";
    const lineWidth = isActive ? 2 : 1.5;
    const nameColor = isActive ? "#111827" : isInactive ? "#9CA3AF" : "#111827";
    const nameWeight = isActive ? "700" : "600";
    const valueColor = isActive ? "#1F2937" : isInactive ? "#9CA3AF" : "#374151";
    const locationsColor = isActive ? "#374151" : isInactive ? "#9CA3AF" : "#4B5563";

    return (
        <g>
            {/* Line from chart to label - dogleg style */}
            <path
                d={`M${startX},${startY} L${x},${y} L${labelX},${y}`}
                stroke={lineColor}
                strokeWidth={lineWidth}
                fill="none"
                style={{
                    transition: "stroke 0.2s ease, stroke-width 0.2s ease",
                }}
            />
            {/* Label text group */}
            <g>
                {/* Category Label */}
                <text
                    x={labelX}
                    y={y - 14}
                    textAnchor={isRightSide ? "start" : "end"}
                    fill={nameColor}
                    fontSize="12"
                    fontWeight={nameWeight}
                    dominantBaseline="baseline"
                    style={{
                        transition: "fill 0.2s ease, font-weight 0.2s ease",
                    }}
                >
                    {name}
                </text>
                {/* SF Value */}
                <text
                    x={labelX}
                    y={y + 2}
                    textAnchor={isRightSide ? "start" : "end"}
                    fill={valueColor}
                    fontSize="11"
                    dominantBaseline="baseline"
                    style={{
                        transition: "fill 0.2s ease",
                    }}
                >
                    {formatValue(value)} SF
                </text>
                {/* Locations */}
                <text
                    x={labelX}
                    y={y + 16}
                    textAnchor={isRightSide ? "start" : "end"}
                    fill={locationsColor}
                    fontSize="11"
                    dominantBaseline="baseline"
                    style={{
                        transition: "fill 0.2s ease",
                    }}
                >
                    {formatNumber(locations)} Locations
                </text>
            </g>
        </g>
    );
};

function DonutChart({ data, title }: DonutChartProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [isHoveringChart, setIsHoveringChart] = useState(false);
    
    // Chart dimensions for label calculation
    const chartWidth = 500;
    const chartHeight = 400;
    const outerRadius = 100;
    const positionMap = useLabelPositions(data, outerRadius, chartWidth, chartHeight);

    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index);
        setIsHoveringChart(true);
    };

    const onPieLeave = () => {
        // Don't clear immediately - let the container handle it
        // This prevents labels from disappearing when hovering over them
    };

    const onChartMouseEnter = () => {
        setIsHoveringChart(true);
    };

    const onChartMouseLeave = () => {
        setIsHoveringChart(false);
        setActiveIndex(null);
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-6">
                {title}
            </h3>
            <div 
                className="flex items-center justify-center" 
                style={{ height: "400px" }}
                onMouseEnter={onChartMouseEnter}
                onMouseLeave={onChartMouseLeave}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={(props) => (
                                <CustomLabel
                                    {...props}
                                    positionMap={positionMap}
                                    activeIndex={activeIndex}
                                />
                            )}
                            outerRadius={activeIndex !== null ? 105 : outerRadius}
                            innerRadius={55}
                            fill="#8884d8"
                            dataKey="value"
                            startAngle={-90}
                            endAngle={270}
                            paddingAngle={1}
                            onMouseEnter={onPieEnter}
                            onMouseLeave={onPieLeave}
                            activeIndex={activeIndex !== null ? activeIndex : undefined}
                            activeShape={renderActiveShape}
                        >
                            {data.map((entry, index) => {
                                const isActive = activeIndex === index;
                                const isInactive = activeIndex !== null && activeIndex !== index;
                                return (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                        stroke="white"
                                        strokeWidth={isActive ? 3 : 2}
                                        opacity={isInactive ? 0.4 : 1}
                                        style={{
                                            cursor: "pointer",
                                            transition: "opacity 0.2s ease",
                                            outline: "none",
                                        }}
                                    />
                                );
                            })}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

interface CompanyStatsChartsProps {
    locations?: any[]; // Will be used later for real data
}

export default function CompanyStatsCharts({
    locations = [],
}: CompanyStatsChartsProps) {
    // Dummy data matching the screenshot exactly
    const occupancyTypeData: ChartDataItem[] = [
        {
            name: "Leased",
            value: 282800000,
            locations: 2656,
            color: "#14B8A6", // Teal/Blue (matching screenshot)
        },
        {
            name: "Sublet",
            value: 852700,
            locations: 12,
            color: "#F97316", // Orange
        },
        {
            name: "Unknown",
            value: 279900,
            locations: 2,
            color: "#F97316", // Orange
        },
        {
            name: "Owned",
            value: 658700000,
            locations: 4162,
            color: "#F97316", // Orange
        },
    ];

    const spaceUseData: ChartDataItem[] = [
        {
            name: "Retail",
            value: 780200000,
            locations: 6500,
            color: "#F59E0B", // Yellow/Orange
        },
        {
            name: "Industrial",
            value: 155000000,
            locations: 262,
            color: "#3B82F6", // Blue
        },
        {
            name: "Office",
            value: 5600000,
            locations: 61,
            color: "#9333EA", // Purple
        },
        {
            name: "Flex",
            value: 1800000,
            locations: 7,
            color: "#EC4899", // Pink
        },
        {
            name: "Unknown",
            value: 130000,
            locations: 2,
            color: "#6B7280", // Gray
        },
    ];

    const starRatingData: ChartDataItem[] = [
        {
            name: "3 Star",
            value: 600300000,
            locations: 4679,
            color: "#F97316", // Orange
        },
        {
            name: "4 Star",
            value: 169600000,
            locations: 963,
            color: "#3B82F6", // Blue
        },
        {
            name: "2 Star",
            value: 137200000,
            locations: 1141,
            color: "#10B981", // Green
        },
        {
            name: "5 Star",
            value: 35200000,
            locations: 44,
            color: "#FCD34D", // Yellow
        },
        {
            name: "1 Star",
            value: 439200,
            locations: 5,
            color: "#EF4444", // Red
        },
    ];

    const locationTypeData: ChartDataItem[] = [
        {
            name: "Suburban",
            value: 902100000,
            locations: 6478,
            color: "#F97316", // Orange
        },
        {
            name: "Urban",
            value: 39200000,
            locations: 337,
            color: "#3B82F6", // Blue
        },
        {
            name: "CBD",
            value: 1400000,
            locations: 17,
            color: "#10B981", // Green
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DonutChart
                data={occupancyTypeData}
                title="SF By Occupancy Type"
            />
            <DonutChart
                data={spaceUseData}
                title="Occupied SF By Space Use"
            />
            <DonutChart
                data={starRatingData}
                title="Occupied SF By Star Rating"
            />
            <DonutChart
                data={locationTypeData}
                title="Occupied SF By Location Type"
            />
        </div>
    );
}

