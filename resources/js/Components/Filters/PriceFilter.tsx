import { useState, useEffect, useRef } from "react";
import RangeSlider from "../RangeSlider";

interface PriceFilterProps {
    minPrice: string;
    maxPrice: string;
    onMinPriceChange: (value: string) => void;
    onMaxPriceChange: (value: string) => void;
    excludeUnpriced: boolean;
    onExcludeUnpricedChange: (value: boolean) => void;
}

export default function PriceFilter({
    minPrice,
    maxPrice,
    onMinPriceChange,
    onMaxPriceChange,
    excludeUnpriced,
    onExcludeUnpricedChange,
}: PriceFilterProps) {
    const maxPriceValue = 10000000; // $10,000,000

    // Parse current values from strings
    const parseMinValue = () => {
        const parsed = parseInt(minPrice.replace(/[^0-9]/g, "")) || 0;
        return Math.min(parsed, maxPriceValue);
    };

    const parseMaxValue = () => {
        const parsed =
            parseInt(maxPrice.replace(/[^0-9]/g, "")) || maxPriceValue;
        return Math.min(parsed, maxPriceValue);
    };

    const [minValue, setMinValue] = useState(() => parseMinValue());
    const [maxValue, setMaxValue] = useState(() => parseMaxValue());

    // Sync with external changes
    useEffect(() => {
        const minNum = parseMinValue();
        const maxNum = parseMaxValue();
        if (Math.abs(minNum - minValue) > 1000) setMinValue(minNum);
        if (Math.abs(maxNum - maxValue) > 1000) setMaxValue(maxNum);
    }, [minPrice, maxPrice]);

    const handleRangeChange = (value: [number, number]) => {
        setMinValue(value[0]);
        setMaxValue(value[1]);
        onMinPriceChange(`$${value[0].toLocaleString()}`);
        onMaxPriceChange(
            value[1] >= maxPriceValue
                ? `$${maxPriceValue.toLocaleString()}+`
                : `$${value[1].toLocaleString()}`
        );
    };

    const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onMinPriceChange(value);
        const num = parseInt(value.replace(/[^0-9]/g, "")) || 0;
        const clamped = Math.min(Math.max(0, num), maxValue - 1);
        setMinValue(clamped);
        if (clamped !== num) {
            onMinPriceChange(`$${clamped.toLocaleString()}`);
        }
    };

    const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onMaxPriceChange(value);
        const num = parseInt(value.replace(/[^0-9+]/g, "")) || maxPriceValue;
        const clamped = Math.min(Math.max(minValue + 1, num), maxPriceValue);
        setMaxValue(clamped);
        if (clamped >= maxPriceValue) {
            onMaxPriceChange(`$${maxPriceValue.toLocaleString()}+`);
        } else if (clamped !== num) {
            onMaxPriceChange(`$${clamped.toLocaleString()}`);
        }
    };

    return (
        <div className="w-full">
            <label className="mb-2 block text-xs font-semibold text-gray-900">
                Price
            </label>
            <div className="space-y-2">
                {/* Min/Max Price Inputs */}
                <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                        <label className="text-xs text-gray-600 w-16 shrink-0">
                            Min Price
                        </label>
                        <input
                            type="text"
                            placeholder="$0"
                            value={minPrice}
                            onChange={handleMinInputChange}
                            className="flex-1 rounded border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 placeholder-gray-400 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-1 focus:ring-[#0066CC] focus:ring-opacity-20"
                        />
                    </div>
                    <div className="flex items-center gap-1.5">
                        <label className="text-xs text-gray-600 w-16 shrink-0">
                            Max Price
                        </label>
                        <input
                            type="text"
                            placeholder="$10,000,000+"
                            value={maxPrice}
                            onChange={handleMaxInputChange}
                            className="flex-1 rounded border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 placeholder-gray-400 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-1 focus:ring-[#0066CC] focus:ring-opacity-20"
                        />
                    </div>
                </div>

                {/* Range Slider */}
                <div className="py-1.5">
                    <RangeSlider
                        min={0}
                        max={maxPriceValue}
                        value={[minValue, maxValue]}
                        onChange={handleRangeChange}
                        step={10000}
                    />
                </div>

                {/* Exclude Unpriced Listings Checkbox */}
                <label className="flex cursor-pointer items-center gap-1.5">
                    <input
                        type="checkbox"
                        checked={excludeUnpriced}
                        onChange={(e) =>
                            onExcludeUnpricedChange(e.target.checked)
                        }
                        className="h-3.5 w-3.5 rounded border-gray-300 text-[#0066CC] focus:ring-[#0066CC] accent-[#0066CC]"
                    />
                    <span className="text-xs text-gray-700">
                        Exclude Unpriced Listings
                    </span>
                </label>
            </div>
        </div>
    );
}
