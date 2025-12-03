import { useState, useEffect, useRef } from "react";

interface RateFilterProps {
    rateType: "yearly" | "monthly";
    onRateTypeChange: (type: "yearly" | "monthly") => void;
    minRate: string;
    maxRate: string;
    onMinRateChange: (value: string) => void;
    onMaxRateChange: (value: string) => void;
    excludeUndisclosed: boolean;
    onExcludeUndisclosedChange: (value: boolean) => void;
}

export default function RateFilter({
    rateType,
    onRateTypeChange,
    minRate,
    maxRate,
    onMinRateChange,
    onMaxRateChange,
    excludeUndisclosed,
    onExcludeUndisclosedChange,
}: RateFilterProps) {
    const maxRateValue = rateType === "yearly" ? 20000 : 2000;
    
    // Parse current values from strings
    const parseMinValue = () => {
        const parsed = parseInt(minRate.replace(/[^0-9]/g, "")) || 0;
        return Math.min(parsed, maxRateValue);
    };
    
    const parseMaxValue = () => {
        const parsed = parseInt(maxRate.replace(/[^0-9]/g, "")) || maxRateValue;
        return Math.min(parsed, maxRateValue);
    };

    const [minValue, setMinValue] = useState(() => parseMinValue());
    const [maxValue, setMaxValue] = useState(() => parseMaxValue());
    const prevRateTypeRef = useRef(rateType);
    const isInitialMountRef = useRef(true);

    // Update values when rate type changes
    useEffect(() => {
        // Skip on initial mount - let the initial state handle it
        if (isInitialMountRef.current) {
            isInitialMountRef.current = false;
            prevRateTypeRef.current = rateType;
            return;
        }

        // Only update if rate type actually changed
        if (prevRateTypeRef.current === rateType) return;
        
        const currentMin = parseMinValue();
        const currentMax = parseMaxValue();
        const newMax = maxRateValue;
        const oldMax = prevRateTypeRef.current === "yearly" ? 20000 : 2000;
        
        // Check if max was at the absolute limit (has "+" in the string)
        const wasAtLimit = maxRate.includes("+") || currentMax >= oldMax * 0.99;
        
        if (wasAtLimit) {
            // Reset to new limit only if it was at the absolute maximum
            setMinValue(0);
            setMaxValue(newMax);
            onMinRateChange("$0");
            onMaxRateChange(`$${newMax.toLocaleString()}+`);
        } else {
            // Scale values proportionally to preserve relative position
            const minRatio = currentMin / oldMax;
            const maxRatio = currentMax / oldMax;
            const scaledMin = Math.round(newMax * minRatio);
            const scaledMax = Math.round(newMax * maxRatio);
            
            const finalMin = Math.max(0, Math.min(scaledMin, scaledMax - 1));
            const finalMax = Math.min(newMax, Math.max(scaledMax, finalMin + 1));
            
            setMinValue(finalMin);
            setMaxValue(finalMax);
            onMinRateChange(`$${finalMin.toLocaleString()}`);
            onMaxRateChange(finalMax >= newMax ? `$${newMax.toLocaleString()}+` : `$${finalMax.toLocaleString()}`);
        }
        
        prevRateTypeRef.current = rateType;
    }, [rateType]);

    // Sync with external changes (but avoid infinite loops)
    useEffect(() => {
        const minNum = parseMinValue();
        const maxNum = parseMaxValue();
        if (Math.abs(minNum - minValue) > 1) setMinValue(minNum);
        if (Math.abs(maxNum - maxValue) > 1) setMaxValue(maxNum);
    }, [minRate, maxRate]);

    const handleMinChange = (value: number) => {
        const newMin = Math.min(value, maxValue - 1);
        setMinValue(newMin);
        onMinRateChange(`$${newMin.toLocaleString()}`);
    };

    const handleMaxChange = (value: number) => {
        const newMax = Math.max(value, minValue + 1);
        const clampedMax = Math.min(newMax, maxRateValue);
        setMaxValue(clampedMax);
        onMaxRateChange(
            clampedMax >= maxRateValue
                ? `$${maxRateValue.toLocaleString()}+`
                : `$${clampedMax.toLocaleString()}`
        );
    };

    return (
        <div className="w-full">
            <label className="mb-3 block text-sm font-semibold text-gray-900">
                Rate
            </label>
            <div className="space-y-4">
                {/* Toggle: Yearly/Monthly */}
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => onRateTypeChange("yearly")}
                        className={`flex-1 rounded-lg border-2 px-4 py-2 text-sm font-semibold transition-all ${
                            rateType === "yearly"
                                ? "border-[#0066CC] bg-[#0066CC] text-white shadow-sm"
                                : "border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        Yearly
                    </button>
                    <button
                        type="button"
                        onClick={() => onRateTypeChange("monthly")}
                        className={`flex-1 rounded-lg border-2 px-4 py-2 text-sm font-semibold transition-all ${
                            rateType === "monthly"
                                ? "border-[#0066CC] bg-[#0066CC] text-white shadow-sm"
                                : "border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        Monthly
                    </button>
                </div>

                {/* Min/Max Rate Inputs */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <label className="text-xs text-gray-600 w-20">
                            Min Rate/SF
                        </label>
                        <input
                            type="text"
                            placeholder="$0"
                            value={minRate}
                            onChange={(e) => {
                                onMinRateChange(e.target.value);
                                const num =
                                    parseInt(
                                        e.target.value.replace(/[^0-9]/g, "")
                                    ) || 0;
                                handleMinChange(num);
                            }}
                            className="flex-1 rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 placeholder-gray-400 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:ring-opacity-20"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-xs text-gray-600 w-20">
                            Max Rate/SF
                        </label>
                        <input
                            type="text"
                            placeholder={
                                rateType === "yearly" ? "$20,000+" : "$2,000+"
                            }
                            value={maxRate}
                            onChange={(e) => {
                                onMaxRateChange(e.target.value);
                                const num =
                                    parseInt(
                                        e.target.value.replace(/[^0-9]/g, "")
                                    ) || maxRateValue;
                                handleMaxChange(num);
                            }}
                            className="flex-1 rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 placeholder-gray-400 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:ring-opacity-20"
                        />
                    </div>
                </div>

                {/* Exclude Undisclosed Rate Checkbox */}
                <label className="flex cursor-pointer items-center gap-2">
                    <input
                        type="checkbox"
                        checked={excludeUndisclosed}
                        onChange={(e) =>
                            onExcludeUndisclosedChange(e.target.checked)
                        }
                        className="h-4 w-4 rounded border-gray-300 text-[#0066CC] focus:ring-[#0066CC] accent-[#0066CC]"
                    />
                    <span className="text-sm text-gray-700">
                        Exclude Undisclosed Rate
                    </span>
                </label>

                {/* Dual Range Slider */}
                <div className="relative py-4">
                    <style dangerouslySetInnerHTML={{__html: `
                        .rate-range-input {
                            -webkit-appearance: none;
                            appearance: none;
                            background: transparent;
                        }
                        .rate-range-input::-webkit-slider-thumb {
                            -webkit-appearance: none;
                            appearance: none;
                            height: 16px;
                            width: 16px;
                            border-radius: 50%;
                            background: #0066CC;
                            border: 2px solid white;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                            cursor: pointer;
                        }
                        .rate-range-input::-moz-range-thumb {
                            height: 16px;
                            width: 16px;
                            border-radius: 50%;
                            background: #0066CC;
                            border: 2px solid white;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                            cursor: pointer;
                            -moz-appearance: none;
                            appearance: none;
                        }
                        .rate-range-input::-webkit-slider-runnable-track {
                            height: 2px;
                            background: transparent;
                        }
                        .rate-range-input::-moz-range-track {
                            height: 2px;
                            background: transparent;
                        }
                    `}} />
                    <div className="relative h-2 rounded-lg bg-gray-200">
                        {/* Active range bar */}
                        <div
                            className="absolute h-2 rounded-lg bg-[#0066CC]"
                            style={{
                                left: `${(minValue / maxRateValue) * 100}%`,
                                width: `${
                                    ((maxValue - minValue) / maxRateValue) * 100
                                }%`,
                            }}
                        />
                        {/* Min range input */}
                        <input
                            type="range"
                            min="0"
                            max={maxRateValue}
                            value={minValue}
                            onChange={(e) => handleMinChange(parseInt(e.target.value))}
                            className="rate-range-input absolute top-0 h-2 w-full cursor-pointer"
                            style={{
                                zIndex: minValue > maxValue - (maxRateValue * 0.05) ? 3 : 2,
                            }}
                        />
                        {/* Max range input */}
                        <input
                            type="range"
                            min="0"
                            max={maxRateValue}
                            value={maxValue}
                            onChange={(e) => handleMaxChange(parseInt(e.target.value))}
                            className="rate-range-input absolute top-0 h-2 w-full cursor-pointer"
                            style={{
                                zIndex: maxValue < minValue + (maxRateValue * 0.05) ? 3 : 2,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
