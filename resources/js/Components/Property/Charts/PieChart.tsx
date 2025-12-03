interface PieChartProps {
    data: { label: string; value: number; color?: string }[];
    size?: number;
}

export default function PieChart({ data, size = 200 }: PieChartProps) {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = -90; // Start from top

    const radius = size / 2 - 10;
    const centerX = size / 2;
    const centerY = size / 2;

    const paths = data.map((item, index) => {
        const percentage = (item.value / total) * 100;
        const angle = (item.value / total) * 360;
        const startAngle = currentAngle;
        const endAngle = currentAngle + angle;

        const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
        const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
        const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
        const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);

        const largeArcFlag = angle > 180 ? 1 : 0;

        const pathData = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            "Z",
        ].join(" ");

        currentAngle += angle;

        return {
            pathData,
            color:
                item.color || `hsl(${(index * 360) / data.length}, 70%, 50%)`,
            label: item.label,
            percentage: percentage.toFixed(1),
        };
    });

    return (
        <div className="flex flex-col items-center">
            <svg width={size} height={size} className="overflow-visible">
                {paths.map((path, index) => (
                    <g key={index}>
                        <path
                            d={path.pathData}
                            fill={path.color}
                            className="hover:opacity-80 transition-opacity cursor-pointer"
                            stroke="white"
                            strokeWidth="2"
                        />
                    </g>
                ))}
            </svg>
            <div className="mt-4 space-y-2 w-full">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between text-sm"
                    >
                        <div className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded"
                                style={{
                                    backgroundColor:
                                        paths[index]?.color ||
                                        `hsl(${
                                            (index * 360) / data.length
                                        }, 70%, 50%)`,
                                }}
                            />
                            <span className="text-gray-700">{item.label}</span>
                        </div>
                        <span className="text-gray-900 font-semibold">
                            {paths[index]?.percentage}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
