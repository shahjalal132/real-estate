import { ChevronDown } from "lucide-react";

interface LeasesFiltersProps {
    leaseDate?: string;
    leaseTermMin?: string;
    leaseTermMax?: string;
    annualRentMin?: string;
    annualRentMax?: string;
    onLeaseDateChange?: (value: string) => void;
    onLeaseTermChange?: (min: string, max: string) => void;
    onAnnualRentChange?: (min: string, max: string) => void;
}

export default function LeasesFilters({
    leaseDate = "",
    leaseTermMin = "",
    leaseTermMax = "",
    annualRentMin = "",
    annualRentMax = "",
    onLeaseDateChange,
    onLeaseTermChange,
    onAnnualRentChange,
}: LeasesFiltersProps) {
    return (
        <div className="space-y-3">
            {/* Lease Date */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Lease Date
                </label>
                <button
                    type="button"
                    onClick={() => {
                        // TODO: Open date picker
                    }}
                    className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm text-left focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 flex items-center justify-between"
                >
                    <span className={leaseDate ? "text-gray-700" : "text-gray-400"}>
                        {leaseDate || "Select Date"}
                    </span>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>
            </div>

            {/* Lease Term */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Lease Term
                </label>
                <div className="flex items-center gap-1.5">
                    <input
                        type="text"
                        value={leaseTermMin}
                        onChange={(e) =>
                            onLeaseTermChange?.(e.target.value, leaseTermMax)
                        }
                        placeholder="Min Years"
                        className="min-w-32 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <span className="text-gray-500 text-sm shrink-0">–</span>
                    <input
                        type="text"
                        value={leaseTermMax}
                        onChange={(e) =>
                            onLeaseTermChange?.(leaseTermMin, e.target.value)
                        }
                        placeholder="Max Years"
                        className="min-w-32 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Annual Rent */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Annual Rent
                </label>
                <div className="flex items-center gap-1.5">
                    <input
                        type="text"
                        value={annualRentMin}
                        onChange={(e) =>
                            onAnnualRentChange?.(e.target.value, annualRentMax)
                        }
                        placeholder="$ Min"
                        className="min-w-32 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <span className="text-gray-500 text-sm shrink-0">–</span>
                    <input
                        type="text"
                        value={annualRentMax}
                        onChange={(e) =>
                            onAnnualRentChange?.(annualRentMin, e.target.value)
                        }
                        placeholder="$ Max"
                        className="min-w-32 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
            </div>
        </div>
    );
}

