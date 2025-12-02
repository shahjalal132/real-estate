interface TenantCreditFilterProps {
    selectedCredits: string[];
    onChange: (credits: string[]) => void;
}

const TENANT_CREDIT_OPTIONS = [
    "Credit Rated",
    "Corporate Guarantee",
    "Franchisee",
    "No Credit Rating",
];

export default function TenantCreditFilter({
    selectedCredits,
    onChange,
}: TenantCreditFilterProps) {
    const handleToggle = (option: string) => {
        if (selectedCredits.includes(option)) {
            onChange(selectedCredits.filter((c) => c !== option));
        } else {
            onChange([...selectedCredits, option]);
        }
    };

    return (
        <div>
            <label className="mb-3 block text-sm font-semibold text-gray-900">
                Tenant Credit
            </label>
            <div className="flex flex-wrap gap-2">
                {TENANT_CREDIT_OPTIONS.map((option) => (
                    <button
                        key={option}
                        type="button"
                        onClick={() => handleToggle(option)}
                        className={`rounded-lg border-2 px-3 py-2 text-xs font-medium transition-all ${
                            selectedCredits.includes(option)
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
