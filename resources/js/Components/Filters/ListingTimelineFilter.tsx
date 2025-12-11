import { Calendar } from "lucide-react";

interface ListingTimelineFilterProps {
    timelineType: "timePeriod" | "custom";
    onTimelineTypeChange: (type: "timePeriod" | "custom") => void;
    fromDate: string;
    toDate: string;
    onFromDateChange: (date: string) => void;
    onToDateChange: (date: string) => void;
    timePeriod?: string;
    onTimePeriodChange?: (period: string) => void;
}

const TIME_PERIODS = [
    "Any",
    "Last 7 days",
    "Last 30 days",
    "Last 90 days",
    "Last 6 months",
    "Last year",
];

export default function ListingTimelineFilter({
    timelineType,
    onTimelineTypeChange,
    fromDate,
    toDate,
    onFromDateChange,
    onToDateChange,
    timePeriod = "Any",
    onTimePeriodChange,
}: ListingTimelineFilterProps) {
    return (
        <div>
            <label className="mb-2 block text-xs font-semibold text-gray-900">
                Listing Timeline
            </label>
            <div className="space-y-2">
                {/* Toggle: Time Period/Custom Time Period */}
                <div className="flex gap-1.5">
                    <button
                        type="button"
                        onClick={() => onTimelineTypeChange("timePeriod")}
                        className={`flex-1 rounded border px-2.5 py-1.5 text-xs font-semibold transition-all ${
                            timelineType === "timePeriod"
                                ? "border-[#0066CC] bg-[#0066CC] text-white shadow-sm"
                                : "border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        Time Period
                    </button>
                    <button
                        type="button"
                        onClick={() => onTimelineTypeChange("custom")}
                        className={`flex-1 rounded border px-2.5 py-1.5 text-xs font-semibold transition-all ${
                            timelineType === "custom"
                                ? "border-[#0066CC] bg-[#0066CC] text-white shadow-sm"
                                : "border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        Custom Time Period
                    </button>
                </div>

                {/* Time Period Dropdown or Custom Date Inputs */}
                {timelineType === "timePeriod" ? (
                    <div className="relative">
                        <select
                            value={timePeriod}
                            onChange={(e) =>
                                onTimePeriodChange?.(e.target.value)
                            }
                            className="w-full rounded border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-1 focus:ring-[#0066CC] focus:ring-opacity-20"
                        >
                            {TIME_PERIODS.map((period) => (
                                <option key={period} value={period}>
                                    {period}
                                </option>
                            ))}
                        </select>
                    </div>
                ) : (
                    <div className="space-y-1.5">
                        <div className="relative">
                            <Calendar className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400" />
                            <input
                                type="date"
                                value={fromDate}
                                onChange={(e) =>
                                    onFromDateChange(e.target.value)
                                }
                                placeholder="From"
                                className="w-full rounded border border-gray-300 bg-white pl-7 pr-2 py-1 text-xs text-gray-700 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-1 focus:ring-[#0066CC] focus:ring-opacity-20"
                            />
                        </div>
                        <div className="relative">
                            <Calendar className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400" />
                            <input
                                type="date"
                                value={toDate}
                                onChange={(e) => onToDateChange(e.target.value)}
                                placeholder="To"
                                className="w-full rounded border border-gray-300 bg-white pl-7 pr-2 py-1 text-xs text-gray-700 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-1 focus:ring-[#0066CC] focus:ring-opacity-20"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
