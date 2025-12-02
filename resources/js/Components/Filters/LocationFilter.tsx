interface LocationFilterProps {
    value: string;
    onChange: (value: string) => void;
}

export default function LocationFilter({
    value,
    onChange,
}: LocationFilterProps) {
    return (
        <div>
            <label className="mb-3 block text-sm font-semibold text-gray-900">
                Location(s)
            </label>
            <input
                type="text"
                placeholder="City, State, County, Zip Code"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 placeholder-gray-400 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:ring-opacity-20"
            />
        </div>
    );
}
