interface TenantCreditFilterProps {
    selectedCredit: string;
    onChange: (credit: string) => void;
}

const TENANT_CREDIT_OPTIONS = [
    "Credit Rated",
    "Corporate Guarantee",
    "Franchisee",
    "No Credit Rating",
];

export default function TenantCreditFilter({
    selectedCredit,
    onChange,
}: TenantCreditFilterProps) {
    return (
        <div>
            <label className="mb-2 block text-xs font-semibold text-gray-900">
                Tenant Credit
            </label>
            <div className="flex flex-wrap gap-1.5">
                {TENANT_CREDIT_OPTIONS.map((option) => (
                    <button
                        key={option}
                        type="button"
                        onClick={() => onChange(option)}
                        className={`rounded border px-2.5 py-1.5 text-xs font-semibold transition-all ${
                            selectedCredit === option
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
