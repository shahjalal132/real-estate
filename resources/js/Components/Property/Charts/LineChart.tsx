import { useState, useRef } from "react";

interface LineChartProps {
    data: { label: string; value: number }[];
    height?: number;
    color?: string;
    showArea?: boolean;
    formatValue?: (value: number) => string;
    compact?: boolean;
}

export default function LineChart({
    data,
    height = 280,
    color = "#0066CC",
    showArea = true,
    formatValue,
    compact = false,
}: LineChartProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [tooltip, setTooltip] = useState<{
        x: number;
        y: number;
        label: string;
        value: string;
    } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    const maxValue = Math.max(...data.map((d) => d.value));
    const minValue = Math.min(...data.map((d) => d.value));

    // Calculate nice rounded Y-axis tick values
    const getNiceTicks = (
        min: number,
        max: number,
        count: number
    ): number[] => {
        const niceRange = max - min;
        const tickSpacing = niceRange / (count - 1);

        const magnitude = Math.pow(10, Math.floor(Math.log10(tickSpacing)));
        const normalizedSpacing = tickSpacing / magnitude;
        let niceSpacing;

        if (normalizedSpacing <= 1) niceSpacing = 1;
        else if (normalizedSpacing <= 2) niceSpacing = 2;
        else if (normalizedSpacing <= 5) niceSpacing = 5;
        else niceSpacing = 10;

        niceSpacing *= magnitude;
        const niceMin = Math.floor(min / niceSpacing) * niceSpacing;
        const ticks: number[] = [];

        for (let i = 0; i < count; i++) {
            ticks.push(niceMin + i * niceSpacing);
        }

        return ticks;
    };

    const actualWidth = compact ? 400 : 600;
    const actualHeight = height;
    const padding = compact
        ? { top: 10, right: 10, bottom: 25, left: 45 }
        : { top: 20, right: 20, bottom: 35, left: 60 };
    const chartWidth = actualWidth - padding.left - padding.right;
    const chartHeight = actualHeight - padding.top - padding.bottom;

    const yTicks = 5;
    const tickValues = getNiceTicks(minValue, maxValue, yTicks);
    const actualMin = Math.min(...tickValues);
    const actualMax = Math.max(...tickValues);
    const actualRange = actualMax - actualMin || 1;

    // Calculate points
    const points = data.map((item, index) => {
        const x = padding.left + (index / (data.length - 1 || 1)) * chartWidth;
        const y =
            padding.top +
            chartHeight -
            ((item.value - actualMin) / actualRange) * chartHeight;
        return { x, y, value: item.value, label: item.label };
    });

    // Build line path
    const linePath = points
        .map(
            (point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
        )
        .join(" ");

    // Build area path for gradient fill
    const areaPath =
        linePath +
        ` L ${points[points.length - 1].x} ${actualHeight - padding.bottom} L ${
            points[0].x
        } ${actualHeight - padding.bottom} Z`;

    const format = formatValue || ((val) => val.toLocaleString());
    const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

    const handleMouseEnter = (
        index: number,
        event: React.MouseEvent<SVGCircleElement>
    ) => {
        setHoveredIndex(index);
        const point = points[index];

        if (containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const mouseX = event.clientX - containerRect.left;
            const mouseY = event.clientY - containerRect.top;

            setTooltip({
                x: mouseX,
                y: mouseY,
                label: point.label,
                value: format(point.value),
            });
        }
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
        setTooltip(null);
    };

    return (
        <div
            ref={containerRef}
            className="w-full relative"
            style={{ height: `${actualHeight}px` }}
        >
            <svg
                ref={svgRef}
                width="100%"
                height={actualHeight}
                viewBox={`0 0 ${actualWidth} ${actualHeight}`}
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-full"
            >
                <defs>
                    <linearGradient
                        id={gradientId}
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                    >
                        <stop
                            offset="0%"
                            stopColor={color}
                            stopOpacity="0.15"
                        />
                        <stop
                            offset="100%"
                            stopColor={color}
                            stopOpacity="0.02"
                        />
                    </linearGradient>
                </defs>

                {/* Grid lines */}
                {tickValues.map((value, index) => {
                    const ratio = (value - actualMin) / actualRange;
                    const y = padding.top + chartHeight - ratio * chartHeight;
                    return (
                        <line
                            key={index}
                            x1={padding.left}
                            y1={y}
                            x2={actualWidth - padding.right}
                            y2={y}
                            stroke="#E5E7EB"
                            strokeWidth="1"
                            strokeDasharray={compact ? "2 2" : "3 3"}
                        />
                    );
                })}

                {/* Y-axis labels */}
                {tickValues.map((value, index) => {
                    const ratio = (value - actualMin) / actualRange;
                    const y = padding.top + chartHeight - ratio * chartHeight;
                    return (
                        <text
                            key={index}
                            x={padding.left - 8}
                            y={y + 4}
                            textAnchor="end"
                            fill="#6B7280"
                            fontSize={compact ? "9" : "10"}
                            fontFamily="system-ui, -apple-system, sans-serif"
                            fontWeight="400"
                        >
                            {format(value)}
                        </text>
                    );
                })}

                {/* Area fill */}
                {showArea && (
                    <path
                        d={areaPath}
                        fill={`url(#${gradientId})`}
                        className="transition-opacity duration-300"
                    />
                )}

                {/* Line */}
                <path
                    d={linePath}
                    fill="none"
                    stroke={color}
                    strokeWidth={compact ? "2.5" : "3"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-300"
                />

                {/* Data points */}
                {points.map((point, index) => (
                    <g key={index}>
                        {/* Invisible larger circle for easier hover */}
                        <circle
                            cx={point.x}
                            cy={point.y}
                            r={compact ? "12" : "15"}
                            fill="transparent"
                            className="cursor-pointer"
                            onMouseEnter={(e) => handleMouseEnter(index, e)}
                            onMouseLeave={handleMouseLeave}
                        />
                        {/* Outer circle with glow */}
                        <circle
                            cx={point.x}
                            cy={point.y}
                            r={compact ? "5" : "6"}
                            fill={color}
                            opacity={hoveredIndex === index ? "0.25" : "0.15"}
                            className="transition-opacity duration-200"
                        />
                        {/* White middle circle */}
                        <circle
                            cx={point.x}
                            cy={point.y}
                            r={compact ? "4" : "5"}
                            fill="white"
                            stroke={color}
                            strokeWidth={
                                hoveredIndex === index
                                    ? compact
                                        ? "3"
                                        : "3.5"
                                    : compact
                                    ? "2"
                                    : "2.5"
                            }
                            className="transition-all duration-200"
                        />
                        {/* Inner blue circle */}
                        <circle
                            cx={point.x}
                            cy={point.y}
                            r={
                                hoveredIndex === index
                                    ? compact
                                        ? "3"
                                        : "3.5"
                                    : compact
                                    ? "2"
                                    : "2.5"
                            }
                            fill={color}
                            className="transition-all duration-200"
                        />
                    </g>
                ))}

                {/* X-axis labels */}
                {points.map((point, index) => (
                    <text
                        key={index}
                        x={point.x}
                        y={actualHeight - padding.bottom + 18}
                        textAnchor="middle"
                        fill="#374151"
                        fontSize={compact ? "10" : "11"}
                        fontWeight="500"
                        fontFamily="system-ui, -apple-system, sans-serif"
                    >
                        {point.label}
                    </text>
                ))}
            </svg>
            {tooltip && hoveredIndex !== null && (
                <div
                    className="absolute bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-xl z-50 pointer-events-none whitespace-nowrap"
                    style={{
                        left: `${tooltip.x}px`,
                        top: `${tooltip.y - 60}px`,
                        transform: "translateX(-50%)",
                    }}
                >
                    <div className="font-semibold mb-1 text-white">
                        {tooltip.label}
                    </div>
                    <div className="text-gray-300">{tooltip.value}</div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
            )}
        </div>
    );
}
