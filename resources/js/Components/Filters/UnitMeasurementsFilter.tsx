import { useState, useEffect } from "react";
import RangeSlider from "../RangeSlider";

interface UnitMeasurementsFilterProps {
    measurementType: "units" | "keys" | "beds" | "pads" | "pumps";
    onMeasurementTypeChange: (
        type: "units" | "keys" | "beds" | "pads" | "pumps"
    ) => void;
    minUnits: string;
    maxUnits: string;
    onMinUnitsChange: (value: string) => void;
    onMaxUnitsChange: (value: string) => void;
}

const MEASUREMENT_TYPES = [
    { value: "units" as const, label: "Units" },
    { value: "keys" as const, label: "Keys" },
    { value: "beds" as const, label: "Beds" },
    { value: "pads" as const, label: "Pads" },
    { value: "pumps" as const, label: "Pumps" },
];

export default function UnitMeasurementsFilter({
    measurementType,
    onMeasurementTypeChange,
    minUnits,
    maxUnits,
    onMinUnitsChange,
    onMaxUnitsChange,
}: UnitMeasurementsFilterProps) {
    const maxUnitsValue = 1000; // Adjust based on measurement type if needed

    // Parse current values from strings
    const parseMinValue = () => {
        const parsed = parseInt(minUnits.replace(/[^0-9]/g, "")) || 0;
        return Math.min(parsed, maxUnitsValue);
    };

    const parseMaxValue = () => {
        const parsed =
            parseInt(maxUnits.replace(/[^0-9]/g, "")) || maxUnitsValue;
        return Math.min(parsed, maxUnitsValue);
    };

    const [minValue, setMinValue] = useState(() => parseMinValue());
    const [maxValue, setMaxValue] = useState(() => parseMaxValue());

    // Sync with external changes
    useEffect(() => {
        const minNum = parseMinValue();
        const maxNum = parseMaxValue();
        if (Math.abs(minNum - minValue) > 1) setMinValue(minNum);
        if (Math.abs(maxNum - maxValue) > 1) setMaxValue(maxNum);
    }, [minUnits, maxUnits]);

    const handleRangeChange = (value: [number, number]) => {
        setMinValue(value[0]);
        setMaxValue(value[1]);
        onMinUnitsChange(value[0].toString());
        onMaxUnitsChange(
            value[1] >= maxUnitsValue
                ? `${maxUnitsValue}+`
                : value[1].toString()
        );
    };

    const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onMinUnitsChange(value);
        const num = parseInt(value.replace(/[^0-9]/g, "")) || 0;
        const clamped = Math.min(Math.max(0, num), maxValue - 1);
        setMinValue(clamped);
        if (clamped !== num) {
            onMinUnitsChange(clamped.toString());
        }
    };

    const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onMaxUnitsChange(value);
        const num = parseInt(value.replace(/[^0-9+]/g, "")) || maxUnitsValue;
        const clamped = Math.min(Math.max(minValue + 1, num), maxUnitsValue);
        setMaxValue(clamped);
        if (clamped >= maxUnitsValue) {
            onMaxUnitsChange(`${maxUnitsValue}+`);
        } else if (clamped !== num) {
            onMaxUnitsChange(clamped.toString());
        }
    };

    return (
        <div className="w-full">
            <label className="mb-2 block text-xs font-semibold text-gray-900">
                Unit Measurements
            </label>
            <div className="space-y-2">
                {/* Measurement Type Tabs */}
                <div className="flex gap-0.5 border-b border-gray-200">
                    {MEASUREMENT_TYPES.map((type) => (
                        <button
                            key={type.value}
                            type="button"
                            onClick={() => onMeasurementTypeChange(type.value)}
                            className={`px-2 py-1 text-xs font-medium transition-all border-b-2 ${
                                measurementType === type.value
                                    ? "border-[#0066CC] text-[#0066CC]"
                                    : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                            }`}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>

                {/* Min/Max Units Inputs */}
                <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                        <label className="text-xs text-gray-600 w-16 shrink-0">
                            Min {measurementType}
                        </label>
                        <input
                            type="text"
                            placeholder={`Min ${measurementType}`}
                            value={minUnits}
                            onChange={handleMinInputChange}
                            className="flex-1 rounded border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 placeholder-gray-400 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-1 focus:ring-[#0066CC] focus:ring-opacity-20"
                        />
                    </div>
                    <div className="flex items-center gap-1.5">
                        <label className="text-xs text-gray-600 w-16 shrink-0">
                            Max {measurementType}
                        </label>
                        <input
                            type="text"
                            placeholder={`Max ${measurementType}`}
                            value={maxUnits}
                            onChange={handleMaxInputChange}
                            className="flex-1 rounded border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 placeholder-gray-400 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-1 focus:ring-[#0066CC] focus:ring-opacity-20"
                        />
                    </div>
                </div>

                {/* Range Slider */}
                <div className="py-1.5">
                    <RangeSlider
                        min={0}
                        max={maxUnitsValue}
                        value={[minValue, maxValue]}
                        onChange={handleRangeChange}
                        step={1}
                    />
                </div>
            </div>
        </div>
    );
}
