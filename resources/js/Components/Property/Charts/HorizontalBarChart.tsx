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
    const maxValue = Math.max(...data.map((d) => d.value));
    const barHeight = height / data.length - 8;

    return (
        <div className="w-full" style={{ height: `${height}px` }}>
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
                                className="transition-all duration-300 hover:opacity-80"
                            />
                            <text
                                x="4"
                                y={y + barHeight / 2 + 4}
                                className="text-xs fill-gray-700 font-medium"
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
                                    className="text-xs fill-gray-900 font-semibold"
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
        </div>
    );
}
