interface BrokerageShopFilterProps {
    value: string;
    onChange: (value: string) => void;
}

export default function BrokerageShopFilter({
    value,
    onChange,
}: BrokerageShopFilterProps) {
    return (
        <div>
            <label className="mb-2 block text-xs font-semibold text-gray-900">
                Brokerage Shop
            </label>
            <input
                type="text"
                placeholder="Ex: CBRE"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs text-gray-700 placeholder-gray-400 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-1 focus:ring-[#0066CC] focus:ring-opacity-20"
            />
        </div>
    );
}
