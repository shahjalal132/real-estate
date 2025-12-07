interface TenancyFilterProps {
    tenancy: "vacant" | "single" | "multi";
    onChange: (tenancy: "vacant" | "single" | "multi") => void;
}

export default function TenancyFilter({
    tenancy,
    onChange,
}: TenancyFilterProps) {
    return (
        <div>
            <label className="mb-2 block text-xs font-semibold text-gray-900">
                Tenancy
            </label>
            <div className="flex gap-1.5">
                <button
                    type="button"
                    onClick={() => onChange("vacant")}
                    className={`flex-1 rounded border px-2.5 py-1.5 text-xs font-semibold transition-all ${
                        tenancy === "vacant"
                            ? "border-[#0066CC] bg-[#0066CC] text-white shadow-sm"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                    }`}
                >
                    Vacant
                </button>
                <button
                    type="button"
                    onClick={() => onChange("single")}
                    className={`flex-1 rounded border px-2.5 py-1.5 text-xs font-semibold transition-all ${
                        tenancy === "single"
                            ? "border-[#0066CC] bg-[#0066CC] text-white shadow-sm"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                    }`}
                >
                    Single
                </button>
                <button
                    type="button"
                    onClick={() => onChange("multi")}
                    className={`flex-1 rounded border px-2.5 py-1.5 text-xs font-semibold transition-all ${
                        tenancy === "multi"
                            ? "border-[#0066CC] bg-[#0066CC] text-white shadow-sm"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                    }`}
                >
                    Multi
                </button>
            </div>
        </div>
    );
}
