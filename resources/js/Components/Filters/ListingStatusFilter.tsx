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
            <label className="mb-3 block text-sm font-semibold text-gray-900">
                Listing Status
            </label>
            <div className="space-y-2">
                {LISTING_STATUS_OPTIONS.map((status) => (
                    <label
                        key={status}
                        className="flex cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-gray-50 transition-colors"
                    >
                        <input
                            type="checkbox"
                            checked={selectedStatuses.includes(status)}
                            onChange={() => handleToggle(status)}
                            className="h-4 w-4 rounded border-gray-300 text-[#0066CC] focus:ring-[#0066CC] accent-[#0066CC]"
                        />
                        <span className="text-sm text-gray-700">{status}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}
