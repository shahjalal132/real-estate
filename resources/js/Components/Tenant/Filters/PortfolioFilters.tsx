import { ChevronDown } from "lucide-react";

interface PortfolioFiltersProps {
    spaceUse?: string;
    sizeOccupiedMin?: string;
    sizeOccupiedMax?: string;
    sizeOccupiedUnit?: string;
    occupancy?: string;
    onSpaceUseChange?: (value: string) => void;
    onSizeOccupiedChange?: (min: string, max: string) => void;
    onSizeOccupiedUnitChange?: (value: string) => void;
    onOccupancyChange?: (value: string) => void;
}

export default function PortfolioFilters({
    spaceUse = "",
    sizeOccupiedMin = "",
    sizeOccupiedMax = "",
    sizeOccupiedUnit = "SF",
    occupancy = "",
    onSpaceUseChange,
    onSizeOccupiedChange,
    onSizeOccupiedUnitChange,
    onOccupancyChange,
}: PortfolioFiltersProps) {
    return (
        <div className="space-y-3">
            {/* Space Use */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Space Use
                </label>
                <div className="relative">
                    <select
                        value={spaceUse}
                        onChange={(e) => onSpaceUseChange?.(e.target.value)}
                        className="w-full appearance-none rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                    >
                        <option value="">Select</option>
                        <option value="retail">Retail</option>
                        <option value="office">Office</option>
                        <option value="industrial">Industrial</option>
                        <option value="warehouse">Warehouse</option>
                        <option value="mixed-use">Mixed Use</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {/* Size Occupied */}
            <div>
                <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-medium text-gray-700">
                        Size Occupied
                    </label>
                    <select
                        value={sizeOccupiedUnit}
                        onChange={(e) => onSizeOccupiedUnitChange?.(e.target.value)}
                        className="w-14 rounded-md border border-gray-300 bg-white px-2 py-1 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="SF">SF</option>
                        <option value="SM">SM</option>
                    </select>
                </div>
                <div className="flex items-center gap-1.5">
                    <input
                        type="text"
                        value={sizeOccupiedMin}
                        onChange={(e) =>
                            onSizeOccupiedChange?.(e.target.value, sizeOccupiedMax)
                        }
                        placeholder={`Min ${sizeOccupiedUnit}`}
                        className="min-w-32 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <span className="text-gray-500 text-sm shrink-0">–</span>
                    <input
                        type="text"
                        value={sizeOccupiedMax}
                        onChange={(e) =>
                            onSizeOccupiedChange?.(sizeOccupiedMin, e.target.value)
                        }
                        placeholder={`Max ${sizeOccupiedUnit}`}
                        className="min-w-32 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Occupancy */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Occupancy
                </label>
                <div className="flex items-center gap-2">
                    {["Occupied", "Vacant", "Partial"].map((type) => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => onOccupancyChange?.(type)}
                            className={`px-4 py-2 text-sm border rounded-md transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                                occupancy === type
                                    ? "border-blue-600 bg-blue-50 text-blue-700"
                                    : "border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

