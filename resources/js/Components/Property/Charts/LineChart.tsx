interface LineChartProps {
    data: { label: string; value: number }[];
    height?: number;
    color?: string;
    showArea?: boolean;
    formatValue?: (value: number) => string;
}

export default function LineChart({
    data,
    height = 280,
    color = "#0066CC",
    showArea = true,
    formatValue,
}: LineChartProps) {
    const maxValue = Math.max(...data.map((d) => d.value));
    const minValue = Math.min(...data.map((d) => d.value));
    const range = maxValue - minValue || 1;

    // Use actual pixel dimensions
    const width = 100;
    const padding = { top: 30, right: 15, bottom: 35, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Calculate Y-axis tick values (5 ticks)
    const yTicks = 5;
    const tickValues: number[] = [];
    for (let i = 0; i < yTicks; i++) {
        const ratio = i / (yTicks - 1);
        tickValues.push(minValue + ratio * range);
    }

    // Calculate points
    const points = data.map((item, index) => {
        const x = padding.left + (index / (data.length - 1 || 1)) * chartWidth;
        const y =
            padding.top +
            chartHeight -
            ((item.value - minValue) / range) * chartHeight;
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
        ` L ${points[points.length - 1].x} ${height - padding.bottom} L ${
            points[0].x
        } ${height - padding.bottom} Z`;

    const format = formatValue || ((val) => val.toLocaleString());
    const gradientId = `gradient-${color.replace("#", "")}`;

    return (
        <div className="w-full" style={{ height: `${height}px` }}>
            <svg
                viewBox={`0 0 ${width} ${height}`}
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
                            stopOpacity="0.25"
                        />
                        <stop
                            offset="100%"
                            stopColor={color}
                            stopOpacity="0.05"
                        />
                    </linearGradient>
                </defs>

                {/* Grid lines */}
                {tickValues.map((value, index) => {
                    const ratio = index / (tickValues.length - 1);
                    const y = padding.top + chartHeight - ratio * chartHeight;
                    return (
                        <line
                            key={index}
                            x1={padding.left}
                            y1={y}
                            x2={width - padding.right}
                            y2={y}
                            stroke="#E5E7EB"
                            strokeWidth="0.5"
                            strokeDasharray="3 3"
                        />
                    );
                })}

                {/* Y-axis labels */}
                {tickValues.map((value, index) => {
                    const ratio = index / (tickValues.length - 1);
                    const y = padding.top + chartHeight - ratio * chartHeight;
                    return (
                        <text
                            key={index}
                            x={padding.left - 10}
                            y={y + 4}
                            textAnchor="end"
                            fill="#6B7280"
                            fontSize="10"
                            fontFamily="system-ui, -apple-system, sans-serif"
                        >
                            {format(value)}
                        </text>
                    );
                })}

                {/* Area fill */}
                {showArea && <path d={areaPath} fill={`url(#${gradientId})`} />}

                {/* Line */}
                <path
                    d={linePath}
                    fill="none"
                    stroke={color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Data points */}
                {points.map((point, index) => (
                    <g key={index}>
                        {/* Outer blue circle */}
                        <circle
                            cx={point.x}
                            cy={point.y}
                            r="6"
                            fill={color}
                            opacity="0.2"
                        />
                        {/* White middle circle */}
                        <circle
                            cx={point.x}
                            cy={point.y}
                            r="5"
                            fill="white"
                            stroke={color}
                            strokeWidth="2.5"
                        />
                        {/* Inner blue circle */}
                        <circle
                            cx={point.x}
                            cy={point.y}
                            r="2.5"
                            fill={color}
                        />
                    </g>
                ))}

                {/* X-axis labels */}
                {points.map((point, index) => (
                    <text
                        key={index}
                        x={point.x}
                        y={height - 12}
                        textAnchor="middle"
                        fill="#374151"
                        fontSize="11"
                        fontWeight="500"
                        fontFamily="system-ui, -apple-system, sans-serif"
                    >
                        {point.label}
                    </text>
                ))}
            </svg>
        </div>
    );
}
