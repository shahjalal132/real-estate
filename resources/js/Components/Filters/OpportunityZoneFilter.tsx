interface OpportunityZoneFilterProps {
    value: boolean;
    onChange: (value: boolean) => void;
}

export default function OpportunityZoneFilter({
    value,
    onChange,
}: OpportunityZoneFilterProps) {
    return (
        <div className="flex items-center justify-between rounded-lg p-3 hover:bg-gray-50 transition-colors">
            <label className="text-sm font-semibold text-gray-900 cursor-pointer">
                Opportunity Zone
            </label>
            <button
                type="button"
                onClick={() => onChange(!value)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:ring-offset-2 ${
                    value ? "bg-[#0066CC]" : "bg-gray-300"
                }`}
                role="switch"
                aria-checked={value}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? "translate-x-6" : "translate-x-1"
                    }`}
                />
            </button>
        </div>
    );
}
