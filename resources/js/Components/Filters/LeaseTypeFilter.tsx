interface LeaseTypeFilterProps {
    selectedLeaseType: string;
    onChange: (leaseType: string) => void;
}

const LEASE_TYPE_OPTIONS = [
    "Net",
    "NNN",
    "Absolute Net",
    "Gross",
    "Modified",
    "Ground",
];

export default function LeaseTypeFilter({
    selectedLeaseType,
    onChange,
}: LeaseTypeFilterProps) {
    return (
        <div>
            <label className="mb-2 block text-xs font-semibold text-gray-900">
                Lease Type
            </label>
            <div className="flex flex-wrap gap-1.5">
                {LEASE_TYPE_OPTIONS.map((option) => (
                    <button
                        key={option}
                        type="button"
                        onClick={() => onChange(option)}
                        className={`rounded border px-2.5 py-1.5 text-xs font-semibold transition-all ${
                            selectedLeaseType === option
                                ? "border-[#0066CC] bg-[#0066CC] text-white shadow-sm"
                                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}
