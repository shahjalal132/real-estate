interface OpportunityZoneFilterProps {
    value: boolean;
    onChange: (value: boolean) => void;
}

export default function OpportunityZoneFilter({
    value,
    onChange,
}: OpportunityZoneFilterProps) {
    return (
        <div className="flex items-center justify-between rounded p-2 hover:bg-gray-50 transition-colors">
            <label className="text-xs text-gray-900 cursor-pointer">
                Show opportunity zone properties only
            </label>
            <button
                type="button"
                onClick={() => onChange(!value)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-1 focus:ring-[#0066CC] focus:ring-offset-1 ${
                    value ? "bg-[#0066CC]" : "bg-gray-300"
                }`}
                role="switch"
                aria-checked={value}
            >
                <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                        value ? "translate-x-5" : "translate-x-0.5"
                    }`}
                />
            </button>
        </div>
    );
}
