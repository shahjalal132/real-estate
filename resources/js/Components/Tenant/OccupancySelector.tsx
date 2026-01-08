import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface OccupancySelectorProps {
    occupancy: string[];
    onOccupancyChange: (value: string[]) => void;
    label?: string;
}

const OCCUPANCY_OPTIONS = [
    "Leased",
    "Sublet",
    "Coworking",
    "Owned",
    "Assignment",
];

const OCCUPANCY_OTHER_OPTIONS = ["Unknown"];

export default function OccupancySelector({
    occupancy = [],
    onOccupancyChange,
    label = "Occupancy",
}: OccupancySelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const selectorRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                selectorRef.current &&
                !selectorRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleOccupancyToggle = (option: string) => {
        const newSelection = occupancy.includes(option)
            ? occupancy.filter((item) => item !== option)
            : [...occupancy, option];
        onOccupancyChange(newSelection);
    };

    const getDisplayText = () => {
        if (occupancy.length === 0) return label;
        if (occupancy.length === 1) return occupancy[0];
        return `${occupancy.length} selected`;
    };

    return (
        <div className="relative shrink-0" ref={selectorRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between rounded-md border py-2 pl-3 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white min-w-[140px] ${
                    occupancy.length > 0
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
            >
                <span className="truncate">{getDisplayText()}</span>
                <ChevronDown
                    className={`absolute right-2 h-4 w-4 text-gray-400 pointer-events-none transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute left-0 z-50 mt-1 w-56 rounded-md border border-gray-200 bg-white shadow-lg overflow-hidden">
                        <div className="py-1">
                            {/* Main Occupancy Options */}
                            {OCCUPANCY_OPTIONS.map((option) => (
                                <label
                                    key={option}
                                    className="flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors"
                                >
                                    <input
                                        type="checkbox"
                                        checked={occupancy.includes(option)}
                                        onChange={() =>
                                            handleOccupancyToggle(option)
                                        }
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 accent-blue-600"
                                    />
                                    <span className="text-sm text-gray-700">
                                        {option}
                                    </span>
                                </label>
                            ))}

                            {/* Separator */}
                            <div className="border-t border-gray-200 my-1" />

                            {/* Other Options */}
                            {OCCUPANCY_OTHER_OPTIONS.map((option) => (
                                <label
                                    key={option}
                                    className="flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors"
                                >
                                    <input
                                        type="checkbox"
                                        checked={occupancy.includes(option)}
                                        onChange={() =>
                                            handleOccupancyToggle(option)
                                        }
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 accent-blue-600"
                                    />
                                    <span className="text-sm text-gray-700">
                                        {option}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

