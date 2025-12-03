import { useState, useEffect, useRef } from "react";

interface SizeFilterProps {
    sizeType: "sqft" | "acreage";
    onSizeTypeChange: (type: "sqft" | "acreage") => void;
    minSize: string;
    maxSize: string;
    onMinSizeChange: (value: string) => void;
    onMaxSizeChange: (value: string) => void;
}

export default function SizeFilter({
    sizeType,
    onSizeTypeChange,
    minSize,
    maxSize,
    onMinSizeChange,
    onMaxSizeChange,
}: SizeFilterProps) {
    const maxSizeValue = sizeType === "sqft" ? 15000 : 100;
    
    // Parse current values from strings
    const parseMinValue = () => {
        const parsed = parseInt(minSize.replace(/[^0-9]/g, "")) || 0;
        return Math.min(parsed, maxSizeValue);
    };
    
    const parseMaxValue = () => {
        const parsed = parseInt(maxSize.replace(/[^0-9]/g, "")) || maxSizeValue;
        return Math.min(parsed, maxSizeValue);
    };

    const [minValue, setMinValue] = useState(() => parseMinValue());
    const [maxValue, setMaxValue] = useState(() => parseMaxValue());
    const prevSizeTypeRef = useRef(sizeType);
    const isInitialMountRef = useRef(true);

    // Update values when size type changes
    useEffect(() => {
        // Skip on initial mount - let the initial state handle it
        if (isInitialMountRef.current) {
            isInitialMountRef.current = false;
            prevSizeTypeRef.current = sizeType;
            return;
        }

        // Only update if size type actually changed
        if (prevSizeTypeRef.current === sizeType) return;
        
        const currentMin = parseMinValue();
        const currentMax = parseMaxValue();
        const newMax = maxSizeValue;
        const oldMax = prevSizeTypeRef.current === "sqft" ? 15000 : 100;
        
        // Check if max was at the absolute limit (has "+" in the string)
        const wasAtLimit = maxSize.includes("+") || currentMax >= oldMax * 0.99;
        
        if (wasAtLimit) {
            // Reset to new limit only if it was at the absolute maximum
            setMinValue(0);
            setMaxValue(newMax);
            onMinSizeChange("0");
            onMaxSizeChange(`${newMax.toLocaleString()}+`);
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
            onMinSizeChange(finalMin.toString());
            onMaxSizeChange(finalMax >= newMax ? `${newMax.toLocaleString()}+` : finalMax.toString());
        }
        
        prevSizeTypeRef.current = sizeType;
    }, [sizeType]);

    // Sync with external changes (but avoid infinite loops)
    useEffect(() => {
        const minNum = parseMinValue();
        const maxNum = parseMaxValue();
        if (Math.abs(minNum - minValue) > 1) setMinValue(minNum);
        if (Math.abs(maxNum - maxValue) > 1) setMaxValue(maxNum);
    }, [minSize, maxSize]);

    const handleMinChange = (value: number) => {
        const newMin = Math.min(value, maxValue - 1);
        setMinValue(newMin);
        onMinSizeChange(newMin.toString());
    };

    const handleMaxChange = (value: number) => {
        const newMax = Math.max(value, minValue + 1);
        const clampedMax = Math.min(newMax, maxSizeValue);
        setMaxValue(clampedMax);
        onMaxSizeChange(
            clampedMax >= maxSizeValue
                ? `${maxSizeValue.toLocaleString()}+`
                : clampedMax.toString()
        );
    };

    return (
        <div className="w-full">
            <label className="mb-3 block text-sm font-semibold text-gray-900">
                Size
            </label>
            <div className="space-y-4">
                {/* Toggle: Square Footage/Acreage */}
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => onSizeTypeChange("sqft")}
                        className={`flex-1 rounded-lg border-2 px-4 py-2 text-sm font-semibold transition-all ${
                            sizeType === "sqft"
                                ? "border-[#0066CC] bg-[#0066CC] text-white shadow-sm"
                                : "border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        Square Footage
                    </button>
                    <button
                        type="button"
                        onClick={() => onSizeTypeChange("acreage")}
                        className={`flex-1 rounded-lg border-2 px-4 py-2 text-sm font-semibold transition-all ${
                            sizeType === "acreage"
                                ? "border-[#0066CC] bg-[#0066CC] text-white shadow-sm"
                                : "border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        Acreage
                    </button>
                </div>

                {/* Min/Max Size Inputs */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <label className="text-xs text-gray-600 w-20">
                            {sizeType === "sqft" ? "Min SF" : "Min acres"}
                        </label>
                        <input
                            type="text"
                            placeholder="0"
                            value={minSize}
                            onChange={(e) => {
                                onMinSizeChange(e.target.value);
                                const num = parseInt(e.target.value.replace(/[^0-9]/g, "")) || 0;
                                handleMinChange(num);
                            }}
                            className="flex-1 rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 placeholder-gray-400 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:ring-opacity-20"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-xs text-gray-600 w-20">
                            {sizeType === "sqft" ? "Max SF" : "Max acres"}
                        </label>
                        <input
                            type="text"
                            placeholder={sizeType === "sqft" ? "15,000+" : "100+"}
                            value={maxSize}
                            onChange={(e) => {
                                onMaxSizeChange(e.target.value);
                                const num = parseInt(e.target.value.replace(/[^0-9]/g, "")) || maxSizeValue;
                                handleMaxChange(num);
                            }}
                            className="flex-1 rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 placeholder-gray-400 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:ring-opacity-20"
                        />
                    </div>
                </div>

                {/* Dual Range Slider */}
                <div className="relative py-4">
                    <style dangerouslySetInnerHTML={{__html: `
                        .size-range-input {
                            -webkit-appearance: none;
                            appearance: none;
                            background: transparent;
                        }
                        .size-range-input::-webkit-slider-thumb {
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
                        .size-range-input::-moz-range-thumb {
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
                        .size-range-input::-webkit-slider-runnable-track {
                            height: 2px;
                            background: transparent;
                        }
                        .size-range-input::-moz-range-track {
                            height: 2px;
                            background: transparent;
                        }
                    `}} />
                    <div className="relative h-2 rounded-lg bg-gray-200">
                        {/* Active range bar */}
                        <div
                            className="absolute h-2 rounded-lg bg-[#0066CC]"
                            style={{
                                left: `${(minValue / maxSizeValue) * 100}%`,
                                width: `${
                                    ((maxValue - minValue) / maxSizeValue) * 100
                                }%`,
                            }}
                        />
                        {/* Min range input */}
                        <input
                            type="range"
                            min="0"
                            max={maxSizeValue}
                            value={minValue}
                            onChange={(e) => handleMinChange(parseInt(e.target.value))}
                            className="size-range-input absolute top-0 h-2 w-full cursor-pointer"
                            style={{
                                zIndex: minValue > maxValue - (maxSizeValue * 0.05) ? 3 : 2,
                            }}
                        />
                        {/* Max range input */}
                        <input
                            type="range"
                            min="0"
                            max={maxSizeValue}
                            value={maxValue}
                            onChange={(e) => handleMaxChange(parseInt(e.target.value))}
                            className="size-range-input absolute top-0 h-2 w-full cursor-pointer"
                            style={{
                                zIndex: maxValue < minValue + (maxSizeValue * 0.05) ? 3 : 2,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
