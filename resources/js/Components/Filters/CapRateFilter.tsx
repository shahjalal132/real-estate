import { useState, useEffect } from "react";
import RangeSlider from "../RangeSlider";

interface CapRateFilterProps {
    minCapRate: string;
    maxCapRate: string;
    onMinCapRateChange: (value: string) => void;
    onMaxCapRateChange: (value: string) => void;
}

export default function CapRateFilter({
    minCapRate,
    maxCapRate,
    onMinCapRateChange,
    onMaxCapRateChange,
}: CapRateFilterProps) {
    const maxCapRateValue = 15; // 15%

    // Parse current values from strings
    const parseMinValue = () => {
        const parsed = parseFloat(minCapRate.replace(/[^0-9.]/g, "")) || 0;
        return Math.min(parsed, maxCapRateValue);
    };

    const parseMaxValue = () => {
        const parsed =
            parseFloat(maxCapRate.replace(/[^0-9.]/g, "")) || maxCapRateValue;
        return Math.min(parsed, maxCapRateValue);
    };

    const [minValue, setMinValue] = useState(() => parseMinValue());
    const [maxValue, setMaxValue] = useState(() => parseMaxValue());

    // Sync with external changes
    useEffect(() => {
        const minNum = parseMinValue();
        const maxNum = parseMaxValue();
        if (Math.abs(minNum - minValue) > 0.1) setMinValue(minNum);
        if (Math.abs(maxNum - maxValue) > 0.1) setMaxValue(maxNum);
    }, [minCapRate, maxCapRate]);

    const handleRangeChange = (value: [number, number]) => {
        setMinValue(value[0]);
        setMaxValue(value[1]);
        onMinCapRateChange(`${value[0]}%`);
        onMaxCapRateChange(
            value[1] >= maxCapRateValue
                ? `${maxCapRateValue}%+`
                : `${value[1]}%`
        );
    };

    const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onMinCapRateChange(value);
        const num = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
        const clamped = Math.min(Math.max(0, num), maxValue - 0.1);
        setMinValue(clamped);
        if (Math.abs(clamped - num) > 0.01) {
            onMinCapRateChange(`${clamped}%`);
        }
    };

    const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onMaxCapRateChange(value);
        const num =
            parseFloat(value.replace(/[^0-9.+]/g, "")) || maxCapRateValue;
        const clamped = Math.min(
            Math.max(minValue + 0.1, num),
            maxCapRateValue
        );
        setMaxValue(clamped);
        if (clamped >= maxCapRateValue) {
            onMaxCapRateChange(`${maxCapRateValue}%+`);
        } else if (Math.abs(clamped - num) > 0.01) {
            onMaxCapRateChange(`${clamped}%`);
        }
    };

    return (
        <div className="w-full">
            <label className="mb-2 block text-xs font-semibold text-gray-900">
                Cap Rate
            </label>
            <div className="space-y-2">
                {/* Min/Max Cap Rate Inputs */}
                <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                        <label className="text-xs text-gray-600 w-16 shrink-0">
                            Min %
                        </label>
                        <input
                            type="text"
                            placeholder="0%"
                            value={minCapRate}
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
                            placeholder="15%+"
                            value={maxCapRate}
                            onChange={handleMaxInputChange}
                            className="flex-1 rounded border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 placeholder-gray-400 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-1 focus:ring-[#0066CC] focus:ring-opacity-20"
                        />
                    </div>
                </div>

                {/* Range Slider */}
                <div className="py-1.5">
                    <RangeSlider
                        min={0}
                        max={maxCapRateValue}
                        value={[minValue, maxValue]}
                        onChange={handleRangeChange}
                        step={0.1}
                    />
                </div>
            </div>
        </div>
    );
}
