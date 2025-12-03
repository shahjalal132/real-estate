interface TenancyFilterProps {
    tenancy: "single" | "multiple";
    onChange: (tenancy: "single" | "multiple") => void;
}

export default function TenancyFilter({
    tenancy,
    onChange,
}: TenancyFilterProps) {
    return (
        <div>
            <label className="mb-3 block text-sm font-semibold text-gray-900">
                Tenancy
            </label>
            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={() => onChange("single")}
                    className={`flex-1 rounded-lg border-2 px-4 py-2 text-sm font-semibold transition-all ${
                        tenancy === "single"
                            ? "border-[#0066CC] bg-[#0066CC] text-white shadow-sm"
                            : "border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    Single
                </button>
                <button
                    type="button"
                    onClick={() => onChange("multiple")}
                    className={`flex-1 rounded-lg border-2 px-4 py-2 text-sm font-semibold transition-all ${
                        tenancy === "multiple"
                            ? "border-[#0066CC] bg-[#0066CC] text-white shadow-sm"
                            : "border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    Multiple
                </button>
            </div>
        </div>
    );
}

