import { useState, useEffect } from "react";
import RangeSlider from "../RangeSlider";

interface OccupancyFilterProps {
    minOccupancy: string;
    maxOccupancy: string;
    onMinOccupancyChange: (value: string) => void;
    onMaxOccupancyChange: (value: string) => void;
}

export default function OccupancyFilter({
    minOccupancy,
    maxOccupancy,
    onMinOccupancyChange,
    onMaxOccupancyChange,
}: OccupancyFilterProps) {
    const maxOccupancyValue = 100; // 100%

    // Parse current values from strings
    const parseMinValue = () => {
        const parsed = parseFloat(minOccupancy.replace(/[^0-9.]/g, "")) || 0;
        return Math.min(parsed, maxOccupancyValue);
    };

    const parseMaxValue = () => {
        const parsed =
            parseFloat(maxOccupancy.replace(/[^0-9.]/g, "")) ||
            maxOccupancyValue;
        return Math.min(parsed, maxOccupancyValue);
    };

    const [minValue, setMinValue] = useState(() => parseMinValue());
    const [maxValue, setMaxValue] = useState(() => parseMaxValue());

    // Sync with external changes
    useEffect(() => {
        const minNum = parseMinValue();
        const maxNum = parseMaxValue();
        if (Math.abs(minNum - minValue) > 0.1) setMinValue(minNum);
        if (Math.abs(maxNum - maxValue) > 0.1) setMaxValue(maxNum);
    }, [minOccupancy, maxOccupancy]);

    const handleRangeChange = (value: [number, number]) => {
        setMinValue(value[0]);
        setMaxValue(value[1]);
        onMinOccupancyChange(`${value[0]}%`);
        onMaxOccupancyChange(`${value[1]}%`);
    };

    const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onMinOccupancyChange(value);
        const num = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
        const clamped = Math.min(Math.max(0, num), maxValue - 0.1);
        setMinValue(clamped);
        if (Math.abs(clamped - num) > 0.01) {
            onMinOccupancyChange(`${clamped}%`);
        }
    };

    const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onMaxOccupancyChange(value);
        const num =
            parseFloat(value.replace(/[^0-9.]/g, "")) || maxOccupancyValue;
        const clamped = Math.min(
            Math.max(minValue + 0.1, num),
            maxOccupancyValue
        );
        setMaxValue(clamped);
        if (Math.abs(clamped - num) > 0.01) {
            onMaxOccupancyChange(`${clamped}%`);
        }
    };

    return (
        <div className="w-full">
            <label className="mb-2 block text-xs font-semibold text-gray-900">
                Occupancy
            </label>
            <div className="space-y-2">
                {/* Min/Max Occupancy Inputs */}
                <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                        <label className="text-xs text-gray-600 w-16 shrink-0">
                            Min %
                        </label>
                        <input
                            type="text"
                            placeholder="0%"
                            value={minOccupancy}
                            onChange={handleMinInputChange}
                            className="flex-1 rounded border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 placeholder-gray-400 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-1 focus:ring-[#0066CC] focus:ring-opacity-20"
                        />
                    </div>
                    <div className="flex items-center gap-1.5">
                        <label className="text-xs text-gray-600 w-16 shrink-0">
                            Max %
                        </label>
                        <input
                            type="text"
                            placeholder="100%"
                            value={maxOccupancy}
                            onChange={handleMaxInputChange}
                            className="flex-1 rounded border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 placeholder-gray-400 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-1 focus:ring-[#0066CC] focus:ring-opacity-20"
                        />
                    </div>
                </div>

                {/* Range Slider */}
                <div className="py-1.5">
                    <RangeSlider
                        min={0}
                        max={maxOccupancyValue}
                        value={[minValue, maxValue]}
                        onChange={handleRangeChange}
                        step={0.1}
                    />
                </div>
            </div>
        </div>
    );
}
