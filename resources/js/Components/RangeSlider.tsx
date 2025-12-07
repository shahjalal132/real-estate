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
        <div className="relative w-full py-2">
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                .range-slider-input {
                    -webkit-appearance: none;
                    appearance: none;
                    background: transparent;
                    cursor: pointer;
                }
                .range-slider-input::-webkit-slider-track {
                    background: transparent;
                    height: 4px;
                }
                .range-slider-input::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    height: 16px;
                    width: 16px;
                    border-radius: 50%;
                    background: #0066CC;
                    border: 2px solid white;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
                    cursor: pointer;
                    margin-top: -6px;
                }
                .range-slider-input::-moz-range-track {
                    background: transparent;
                    height: 4px;
                }
                .range-slider-input::-moz-range-thumb {
                    height: 16px;
                    width: 16px;
                    border-radius: 50%;
                    background: #0066CC;
                    border: 2px solid white;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
                    cursor: pointer;
                    -moz-appearance: none;
                    appearance: none;
                }
                .range-slider-input:focus {
                    outline: none;
                }
                .range-slider-input:focus::-webkit-slider-thumb {
                    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.2);
                }
                .range-slider-input:focus::-moz-range-thumb {
                    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.2);
                }
            `,
                }}
            />
            {/* Range Track */}
            <div className="relative h-1 w-full rounded-full bg-gray-200">
                {/* Active Range */}
                <div
                    className="absolute h-1 rounded-full bg-[#0066CC]"
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
                className="range-slider-input absolute top-2 h-1 w-full"
                style={{
                    zIndex:
                        localValue[0] > localValue[1] - (max - min) * 0.05
                            ? 3
                            : 2,
                }}
            />

            {/* Max Handle */}
            <input
                type="range"
                min={min}
                max={max}
                value={localValue[1]}
                onChange={handleMaxChange}
                step={step}
                className="range-slider-input absolute top-2 h-1 w-full"
                style={{
                    zIndex:
                        localValue[1] < localValue[0] + (max - min) * 0.05
                            ? 3
                            : 2,
                }}
            />
        </div>
    );
}
