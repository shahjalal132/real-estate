interface ListingStatusFilterProps {
    selectedStatuses: string[];
    onChange: (statuses: string[]) => void;
}

const LISTING_STATUS_OPTIONS = [
    "Active Listings",
    "On-Market",
    "Auction",
    "Highest & Best",
    "Call For Offers",
    "Contract Pending",
    "Under Contract",
];

export default function ListingStatusFilter({
    selectedStatuses,
    onChange,
}: ListingStatusFilterProps) {
    const handleToggle = (status: string) => {
        if (selectedStatuses.includes(status)) {
            onChange(selectedStatuses.filter((s) => s !== status));
        } else {
            onChange([...selectedStatuses, status]);
        }
    };

    return (
        <div>
            <label className="mb-2 block text-xs font-semibold text-gray-900">
                Listing Status
            </label>
            <div className="space-y-1.5">
                {LISTING_STATUS_OPTIONS.map((status) => (
                    <label
                        key={status}
                        className="flex cursor-pointer items-center gap-1.5 rounded p-1.5 hover:bg-gray-50 transition-colors"
                    >
                        <input
                            type="checkbox"
                            checked={selectedStatuses.includes(status)}
                            onChange={() => handleToggle(status)}
                            className="h-3.5 w-3.5 rounded border-gray-300 text-[#0066CC] focus:ring-[#0066CC] accent-[#0066CC]"
                        />
                        <span className="text-xs text-gray-700">{status}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}
