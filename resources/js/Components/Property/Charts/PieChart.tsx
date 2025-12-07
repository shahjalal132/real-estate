import { useState, useRef } from "react";

interface PieChartProps {
    data: { label: string; value: number; color?: string }[];
    size?: number;
    showLegend?: boolean;
}

export default function PieChart({
    data,
    size = 200,
    showLegend = true,
}: PieChartProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [tooltip, setTooltip] = useState<{
        x: number;
        y: number;
        label: string;
        value: string;
    } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

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

        const midAngle = (startAngle + endAngle) / 2;
        const tooltipX =
            centerX + radius * 0.7 * Math.cos((midAngle * Math.PI) / 180);
        const tooltipY =
            centerY + radius * 0.7 * Math.sin((midAngle * Math.PI) / 180);

        currentAngle += angle;

        return {
            pathData,
            color:
                item.color || `hsl(${(index * 360) / data.length}, 70%, 50%)`,
            label: item.label,
            value: item.value,
            percentage: percentage.toFixed(1),
            tooltipX,
            tooltipY,
        };
    });

    const handleMouseEnter = (
        index: number,
        event: React.MouseEvent<SVGPathElement>
    ) => {
        setHoveredIndex(index);
        const path = paths[index];
        const item = data[index];
        
        if (containerRef.current && svgRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const svgRect = svgRef.current.getBoundingClientRect();
            
            // Calculate the actual position in the container
            const scaleX = svgRect.width / size;
            const scaleY = svgRect.height / size;
            
            const tooltipX = (path.tooltipX * scaleX) + (containerRect.left - svgRect.left);
            const tooltipY = (path.tooltipY * scaleY) + (containerRect.top - svgRect.top);
            
            const valueText =
                typeof item.value === "number"
                    ? item.value.toLocaleString()
                    : item.value.toString();
            
            setTooltip({
                x: tooltipX,
                y: tooltipY,
                label: path.label,
                value: `${path.percentage}% (${valueText})`,
            });
        }
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
        setTooltip(null);
    };

    return (
        <div ref={containerRef} className="flex flex-col items-center relative">
            <svg 
                ref={svgRef}
                width={size} 
                height={size} 
                className="overflow-visible"
            >
                {paths.map((path, index) => (
                    <g key={index}>
                        <path
                            d={path.pathData}
                            fill={path.color}
                            className={`transition-all duration-200 cursor-pointer ${
                                hoveredIndex === index
                                    ? "opacity-90"
                                    : hoveredIndex !== null
                                    ? "opacity-50"
                                    : "opacity-100"
                            }`}
                            stroke="white"
                            strokeWidth={hoveredIndex === index ? "3" : "2"}
                            onMouseEnter={(e) => handleMouseEnter(index, e)}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                transformOrigin: `${centerX}px ${centerY}px`,
                                transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)",
                            }}
                        />
                    </g>
                ))}
            </svg>
            {tooltip && hoveredIndex !== null && (
                <div
                    className="absolute bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-xl z-50 pointer-events-none"
                    style={{
                        left: `${tooltip.x}px`,
                        top: `${tooltip.y - 50}px`,
                        transform: "translateX(-50%)",
                    }}
                >
                    <div className="font-semibold mb-1 text-white">{tooltip.label}</div>
                    <div className="text-gray-300">{tooltip.value}</div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
            )}
            {showLegend && (
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
                                <span className="text-gray-700">
                                    {item.label}
                                </span>
                            </div>
                            <span className="text-gray-900 font-semibold">
                                {paths[index]?.percentage}%
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
