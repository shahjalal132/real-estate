import RangeSlider from "../RangeSlider";

interface RemainingTermFilterProps {
    value: [number, number];
    onChange: (value: [number, number]) => void;
}

export default function RemainingTermFilter({
    value,
    onChange,
}: RemainingTermFilterProps) {
    return (
        <div>
            <label className="mb-2 block text-xs font-semibold text-gray-900">
                Remaining Term
            </label>
            <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                    <div className="flex-1">
                        <label className="mb-1 block text-xs text-gray-600">
                            Min Years
                        </label>
                        <input
                            type="number"
                            value={value[0]}
                            onChange={(e) =>
                                onChange([
                                    Number(e.target.value) || 0,
                                    value[1],
                                ])
                            }
                            className="w-full rounded border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-1 focus:ring-[#0066CC] focus:ring-opacity-20"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="mb-1 block text-xs text-gray-600">
                            Max Years
                        </label>
                        <input
                            type="number"
                            value={value[1] === 100 ? "100+" : value[1]}
                            onChange={(e) => {
                                const val = e.target.value.replace("+", "");
                                onChange([value[0], Number(val) || 100]);
                            }}
                            className="w-full rounded border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-1 focus:ring-[#0066CC] focus:ring-opacity-20"
                        />
                    </div>
                </div>
                <RangeSlider
                    min={0}
                    max={100}
                    value={value}
                    onChange={onChange}
                    step={1}
                />
            </div>
        </div>
    );
}
