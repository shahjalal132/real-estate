import { useState, useRef } from "react";

interface HorizontalBarChartProps {
    data: { label: string; value: number; color?: string }[];
    height?: number;
    showValues?: boolean;
}

// Modern color palette for bars
const colorPalette = [
    "#0066CC", // Primary blue
    "#8B5CF6", // Purple
    "#10B981", // Green
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#06B6D4", // Cyan
    "#EC4899", // Pink
    "#6366F1", // Indigo
    "#14B8A6", // Teal
    "#F97316", // Orange
];

export default function HorizontalBarChart({
    data,
    showValues = false,
}: HorizontalBarChartProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [tooltip, setTooltip] = useState<{
        x: number;
        y: number;
        label: string;
        value: string;
    } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const maxValue = Math.max(...data.map((d) => d.value));
    const fixedBarHeight = 32; // Fixed height for all bars
    const barSpacing = 16; // Spacing between bars
    const labelWidth = 180; // Fixed width for labels on the left
    const valueWidth = 80; // Fixed width for values on the right
    const chartPadding = {
        left: labelWidth,
        right: valueWidth,
        top: 8,
        bottom: 8,
    };
    const chartHeight =
        data.length * (fixedBarHeight + barSpacing) -
        barSpacing +
        chartPadding.top +
        chartPadding.bottom;

    const handleMouseEnter = (
        index: number,
        event: React.MouseEvent<SVGRectElement>,
        item: { label: string; value: number }
    ) => {
        setHoveredIndex(index);

        if (containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const mouseX = event.clientX - containerRect.left;
            const mouseY = event.clientY - containerRect.top;

            const total = data.reduce((sum, d) => sum + d.value, 0);
            const itemPercentage = ((item.value / total) * 100).toFixed(1);
            const maxPercentage = ((item.value / maxValue) * 100).toFixed(1);

            setTooltip({
                x: mouseX,
                y: mouseY,
                label: item.label,
                value: `${item.value.toLocaleString()} • ${itemPercentage}% of total • ${maxPercentage}% of max`,
            });
        }
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
        setTooltip(null);
    };

    const getBarColor = (index: number) => {
        // Always use palette colors for variety, ignore provided colors
        return colorPalette[index % colorPalette.length];
    };

    return (
        <div
            ref={containerRef}
            className="w-full relative"
            style={{ height: `${chartHeight}px` }}
        >
            <svg
                width="100%"
                height={chartHeight}
                viewBox={`0 0 1000 ${chartHeight}`}
                preserveAspectRatio="xMidYMid meet"
                className="overflow-visible"
            >
                <defs>
                    {/* Gradient definitions for each bar */}
                    {data.map((_, index) => {
                        const color = getBarColor(index);
                        const gradientId = `gradient-${index}`;

                        return (
                            <linearGradient
                                key={index}
                                id={gradientId}
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                            >
                                <stop
                                    offset="0%"
                                    stopColor={color}
                                    stopOpacity="1"
                                />
                                <stop
                                    offset="100%"
                                    stopColor={color}
                                    stopOpacity="0.85"
                                />
                            </linearGradient>
                        );
                    })}

                    {/* Shadow filter for depth */}
                    <filter
                        id="barShadow"
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                    >
                        <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                        <feOffset dx="0" dy="2" result="offsetblur" />
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.3" />
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {data.map((item, index) => {
                    const y =
                        chartPadding.top +
                        index * (fixedBarHeight + barSpacing);
                    // Always use palette colors for visual variety
                    const gradientId = `gradient-${index}`;
                    const isHovered = hoveredIndex === index;
                    const isOtherHovered =
                        hoveredIndex !== null && hoveredIndex !== index;

                    // Calculate bar width percentage (0-100%)
                    const barWidthPercent = (item.value / maxValue) * 100;

                    return (
                        <g key={index}>
                            {/* Label text - outside bar on the left */}
                            <text
                                x={chartPadding.left - 12}
                                y={y + fixedBarHeight / 2}
                                textAnchor="end"
                                className={`font-medium transition-all duration-300 ${
                                    isHovered
                                        ? "fill-gray-900 font-semibold"
                                        : "fill-gray-700"
                                }`}
                                fontSize="12"
                                fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
                                fontWeight={isHovered ? "600" : "500"}
                                dominantBaseline="middle"
                                letterSpacing="-0.01em"
                            >
                                {item.label}
                            </text>

                            {/* Background bar (subtle) - full width minus padding */}
                            <rect
                                x={chartPadding.left}
                                y={y}
                                width={
                                    1000 -
                                    chartPadding.left -
                                    chartPadding.right
                                }
                                height={fixedBarHeight}
                                fill="#F3F4F6"
                                rx={6}
                                className="transition-opacity duration-300"
                                opacity={isHovered ? 0.3 : 0.2}
                            />

                            {/* Main bar with gradient */}
                            <rect
                                x={chartPadding.left}
                                y={y}
                                width={
                                    (1000 -
                                        chartPadding.left -
                                        chartPadding.right) *
                                    (barWidthPercent / 100)
                                }
                                height={fixedBarHeight}
                                fill={`url(#${gradientId})`}
                                rx={6}
                                className={`transition-all duration-500 ease-out cursor-pointer ${
                                    isHovered
                                        ? "opacity-100"
                                        : isOtherHovered
                                        ? "opacity-40"
                                        : "opacity-100"
                                }`}
                                onMouseEnter={(e) =>
                                    handleMouseEnter(index, e, item)
                                }
                                onMouseLeave={handleMouseLeave}
                                style={{
                                    filter: isHovered
                                        ? "url(#barShadow) brightness(1.15) saturate(1.1)"
                                        : "url(#barShadow)",
                                    transform: isHovered
                                        ? "scaleY(1.05)"
                                        : "scaleY(1)",
                                    transformOrigin: `${chartPadding.left}px ${
                                        y + fixedBarHeight / 2
                                    }px`,
                                }}
                            />

                            {/* Value text - outside bar on the right */}
                            {showValues && (
                                <text
                                    x={1000 - chartPadding.right + 12}
                                    y={y + fixedBarHeight / 2}
                                    textAnchor="start"
                                    className={`font-semibold transition-all duration-300 ${
                                        isHovered
                                            ? "fill-gray-900"
                                            : "fill-gray-800"
                                    }`}
                                    fontSize="11"
                                    fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
                                    fontWeight="600"
                                    dominantBaseline="middle"
                                    letterSpacing="0.02em"
                                >
                                    {item.value.toLocaleString()}
                                </text>
                            )}

                            {/* Percentage indicator on hover - inside bar */}
                            {isHovered && (
                                <text
                                    x={
                                        chartPadding.left +
                                        Math.min(
                                            ((1000 -
                                                chartPadding.left -
                                                chartPadding.right) *
                                                (barWidthPercent / 100)) /
                                                2,
                                            (1000 -
                                                chartPadding.left -
                                                chartPadding.right) *
                                                0.95
                                        )
                                    }
                                    y={y + fixedBarHeight / 2}
                                    textAnchor="middle"
                                    className="fill-white font-semibold"
                                    fontSize="10"
                                    fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
                                    fontWeight="600"
                                    dominantBaseline="middle"
                                >
                                    {((item.value / maxValue) * 100).toFixed(0)}
                                    %
                                </text>
                            )}
                        </g>
                    );
                })}
            </svg>

            {/* Enhanced tooltip with modern design */}
            {tooltip && hoveredIndex !== null && (
                <div
                    className="absolute bg-gray-900 text-white rounded-xl px-4 py-3 shadow-2xl z-50 pointer-events-none backdrop-blur-sm"
                    style={{
                        left: `${tooltip.x}px`,
                        top: `${tooltip.y - 60}px`,
                        transform: "translateX(-50%)",
                        minWidth: "200px",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                >
                    <div className="font-semibold mb-1.5 text-white text-sm leading-tight">
                        {tooltip.label}
                    </div>
                    <div className="text-gray-300 text-xs leading-relaxed font-medium">
                        {tooltip.value}
                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-gray-900"></div>
                </div>
            )}
        </div>
    );
}
