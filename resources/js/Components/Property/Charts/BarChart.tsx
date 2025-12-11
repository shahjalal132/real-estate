interface BarChartProps {
    data: { label: string; value: number; color?: string }[];
    height?: number;
}

export default function BarChart({ data, height = 200 }: BarChartProps) {
    const maxValue = Math.max(...data.map((d) => d.value));
    const barWidth = 100 / data.length - 2;

    return (
        <div className="w-full" style={{ height: `${height}px` }}>
            <svg width="100%" height={height} className="overflow-visible">
                {data.map((item, index) => {
                    const barHeight = (item.value / maxValue) * (height - 40);
                    const x = (index * 100) / data.length + 1;
                    const y = height - barHeight - 20;
                    const color = item.color || "#0066CC";

                    return (
                        <g key={index}>
                            <rect
                                x={`${x}%`}
                                y={y}
                                width={`${barWidth}%`}
                                height={barHeight}
                                fill={color}
                                rx={4}
                                className="hover:opacity-80 transition-opacity"
                            />
                            <text
                                x={`${x + barWidth / 2}%`}
                                y={height - 5}
                                textAnchor="middle"
                                className="text-xs fill-gray-600"
                                fontSize="10"
                            >
                                {item.label}
                            </text>
                            <text
                                x={`${x + barWidth / 2}%`}
                                y={y - 5}
                                textAnchor="middle"
                                className="text-xs fill-gray-900 font-semibold"
                                fontSize="11"
                            >
                                {item.value.toLocaleString()}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}
