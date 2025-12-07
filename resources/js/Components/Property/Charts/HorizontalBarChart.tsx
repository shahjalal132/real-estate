import { useState } from "react";

interface HorizontalBarChartProps {
    data: { label: string; value: number; color?: string }[];
    height?: number;
    showValues?: boolean;
}

export default function HorizontalBarChart({
    data,
    height = 200,
    showValues = false,
}: HorizontalBarChartProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [tooltip, setTooltip] = useState<{
        x: number;
        y: number;
        label: string;
        value: string;
    } | null>(null);
    const maxValue = Math.max(...data.map((d) => d.value));
    const barHeight = height / data.length - 8;

    const handleMouseEnter = (
        index: number,
        event: React.MouseEvent<SVGRectElement>,
        item: { label: string; value: number }
    ) => {
        setHoveredIndex(index);
        const rect = event.currentTarget.getBoundingClientRect();
        const percentage = ((item.value / maxValue) * 100).toFixed(1);
        setTooltip({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            label: item.label,
            value: `${item.value.toLocaleString()} (${percentage}%)`,
        });
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
        setTooltip(null);
    };

    return (
        <div className="w-full relative" style={{ height: `${height}px` }}>
            <svg width="100%" height={height} className="overflow-visible">
                {data.map((item, index) => {
                    const barWidth = (item.value / maxValue) * 100;
                    const y = index * (barHeight + 8);
                    const color = item.color || "#0066CC";

                    return (
                        <g key={index}>
                            <rect
                                x="0"
                                y={y}
                                width={`${barWidth}%`}
                                height={barHeight}
                                fill={color}
                                rx={4}
                                className={`transition-all duration-300 cursor-pointer ${
                                    hoveredIndex === index
                                        ? "opacity-90"
                                        : hoveredIndex !== null
                                        ? "opacity-60"
                                        : "opacity-100"
                                }`}
                                onMouseEnter={(e) =>
                                    handleMouseEnter(index, e, item)
                                }
                                onMouseLeave={handleMouseLeave}
                                style={{
                                    filter:
                                        hoveredIndex === index
                                            ? "brightness(1.1)"
                                            : "none",
                                }}
                            />
                            <text
                                x="4"
                                y={y + barHeight / 2 + 4}
                                className={`text-xs font-medium transition-colors ${
                                    hoveredIndex === index
                                        ? "fill-gray-900 font-semibold"
                                        : "fill-gray-700"
                                }`}
                                fontSize="11"
                                dominantBaseline="middle"
                            >
                                {item.label}
                            </text>
                            {showValues && (
                                <text
                                    x={`${barWidth}%`}
                                    y={y + barHeight / 2 + 4}
                                    dx="-4"
                                    textAnchor="end"
                                    className={`text-xs font-semibold transition-colors ${
                                        hoveredIndex === index
                                            ? "fill-[#0066CC]"
                                            : "fill-gray-900"
                                    }`}
                                    fontSize="11"
                                    dominantBaseline="middle"
                                >
                                    {item.value.toLocaleString()}
                                </text>
                            )}
                        </g>
                    );
                })}
            </svg>
            {tooltip && hoveredIndex !== null && (
                <div
                    className="absolute bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg z-10 pointer-events-none max-w-xs"
                    style={{
                        left: `${tooltip.x}px`,
                        top: `${tooltip.y - 50}px`,
                        transform: "translateX(-50%)",
                    }}
                >
                    <div className="font-semibold mb-1">{tooltip.label}</div>
                    <div className="text-gray-300">{tooltip.value}</div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
            )}
        </div>
    );
}
