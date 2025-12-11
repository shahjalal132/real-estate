import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface ListingStatusFilterProps {
    selectedStatuses: string[];
    onChange: (statuses: string[]) => void;
}

const ACTIVE_LISTINGS_OPTIONS = [
    "On-Market",
    "Auction",
    "Highest & Best",
    "Call For Offers",
];

const OTHER_STATUS_OPTIONS = ["Contract Pending", "Under Contract"];

export default function ListingStatusFilter({
    selectedStatuses,
    onChange,
}: ListingStatusFilterProps) {
    const [isActiveListingsExpanded, setIsActiveListingsExpanded] =
        useState(true);

    const handleToggle = (status: string) => {
        if (selectedStatuses.includes(status)) {
            onChange(selectedStatuses.filter((s) => s !== status));
        } else {
            onChange([...selectedStatuses, status]);
        }
    };

    // Check if all active listings are selected
    const allActiveListingsSelected = ACTIVE_LISTINGS_OPTIONS.every((status) =>
        selectedStatuses.includes(status)
    );
    const someActiveListingsSelected = ACTIVE_LISTINGS_OPTIONS.some((status) =>
        selectedStatuses.includes(status)
    );

    // Handle "Active Listings" parent checkbox
    const handleActiveListingsToggle = () => {
        if (allActiveListingsSelected) {
            // Deselect all active listings
            onChange(
                selectedStatuses.filter(
                    (s) => !ACTIVE_LISTINGS_OPTIONS.includes(s)
                )
            );
        } else {
            // Select all active listings
            const newStatuses = [
                ...selectedStatuses.filter(
                    (s) => !ACTIVE_LISTINGS_OPTIONS.includes(s)
                ),
                ...ACTIVE_LISTINGS_OPTIONS,
            ];
            onChange(newStatuses);
        }
    };

    return (
        <div>
            <label className="mb-2 block text-xs font-semibold text-gray-900">
                Listing Status
            </label>
            <div className="space-y-1.5">
                {/* Active Listings Accordion */}
                <div>
                    <label
                        className="flex cursor-pointer items-center gap-1.5 rounded p-1.5 hover:bg-gray-50 transition-colors"
                        onClick={(e) => {
                            if (
                                (e.target as HTMLElement).closest(
                                    ".accordion-toggle"
                                )
                            ) {
                                setIsActiveListingsExpanded(
                                    !isActiveListingsExpanded
                                );
                            }
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={allActiveListingsSelected}
                            ref={(input) => {
                                if (input) {
                                    input.indeterminate =
                                        someActiveListingsSelected &&
                                        !allActiveListingsSelected;
                                }
                            }}
                            onChange={handleActiveListingsToggle}
                            className="h-3.5 w-3.5 rounded border-gray-300 text-[#0066CC] focus:ring-[#0066CC] accent-[#0066CC]"
                        />
                        <span className="text-xs text-gray-700 flex-1">
                            Active Listings
                        </span>
                        <button
                            type="button"
                            className="accordion-toggle p-0.5 hover:bg-gray-100 rounded transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsActiveListingsExpanded(
                                    !isActiveListingsExpanded
                                );
                            }}
                        >
                            {isActiveListingsExpanded ? (
                                <ChevronUp className="h-3 w-3 text-gray-600" />
                            ) : (
                                <ChevronDown className="h-3 w-3 text-gray-600" />
                            )}
                        </button>
                    </label>

                    {/* Nested Active Listings Options */}
                    {isActiveListingsExpanded && (
                        <div className="ml-5 space-y-1.5 mt-1">
                            {ACTIVE_LISTINGS_OPTIONS.map((status) => (
                                <label
                                    key={status}
                                    className="flex cursor-pointer items-center gap-1.5 rounded p-1.5 hover:bg-gray-50 transition-colors"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedStatuses.includes(
                                            status
                                        )}
                                        onChange={() => handleToggle(status)}
                                        className="h-3.5 w-3.5 rounded border-gray-300 text-[#0066CC] focus:ring-[#0066CC] accent-[#0066CC]"
                                    />
                                    <span className="text-xs text-gray-700">
                                        {status}
                                    </span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Other Status Options */}
                {OTHER_STATUS_OPTIONS.map((status) => (
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
