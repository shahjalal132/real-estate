import { useState, useEffect } from "react";

interface RangeSliderProps {
    min: number;
    max: number;
    value: [number, number];
    onChange: (value: [number, number]) => void;
    step?: number;
}

export default function RangeSlider({
    min,
    max,
    value,
    onChange,
    step = 1,
}: RangeSliderProps) {
    const [localValue, setLocalValue] = useState<[number, number]>(value);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMin = Math.min(Number(e.target.value), localValue[1] - step);
        const newValue: [number, number] = [newMin, localValue[1]];
        setLocalValue(newValue);
        onChange(newValue);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace("+", "");
        const numValue = Number(value);
        if (!isNaN(numValue)) {
            const newMax = Math.max(numValue, localValue[0] + step);
            const newValue: [number, number] = [localValue[0], newMax];
            setLocalValue(newValue);
            onChange(newValue);
        }
    };

    const minPercent = ((localValue[0] - min) / (max - min)) * 100;
    const maxPercent = ((localValue[1] - min) / (max - min)) * 100;

    return (
        <div className="relative w-full">
            {/* Range Track */}
            <div className="relative h-2 w-full rounded-full bg-gray-200">
                {/* Active Range */}
                <div
                    className="absolute h-2 rounded-full bg-[#0066CC]"
                    style={{
                        left: `${minPercent}%`,
                        width: `${maxPercent - minPercent}%`,
                    }}
                />
            </div>

            {/* Min Handle */}
            <input
                type="range"
                min={min}
                max={max}
                value={localValue[0]}
                onChange={handleMinChange}
                step={step}
                className="absolute top-0 h-2 w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#0066CC] [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#0066CC] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md"
            />

            {/* Max Handle */}
            <input
                type="range"
                min={min}
                max={max}
                value={localValue[1]}
                onChange={handleMaxChange}
                step={step}
                className="absolute top-0 h-2 w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#0066CC] [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#0066CC] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md"
            />
        </div>
    );
}
