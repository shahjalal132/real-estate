import { useState, useEffect } from "react";
import { X, Check, GripVertical } from "lucide-react";

export interface DataPoint {
    id: string;
    label: string;
    key: string;
}

interface CustomizeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (selectedIds: string[]) => void;
    availableDataPoints: DataPoint[];
    selectedDataPoints: string[];
}

export default function CustomizeModal({
    isOpen,
    onClose,
    onSave,
    availableDataPoints,
    selectedDataPoints,
}: CustomizeModalProps) {
    const [selected, setSelected] = useState<string[]>(selectedDataPoints);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        setSelected(selectedDataPoints);
    }, [selectedDataPoints, isOpen]);

    const toggleSelection = (id: string) => {
        setSelected((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const handleSave = () => {
        onSave(selected);
        onClose();
    };

    const handleReset = () => {
        // Reset to default (first 3: Property Type, Sub Type, Square Footage)
        setSelected(["property-type", "sub-type", "square-footage"]);
    };

    const unselectedPoints = availableDataPoints.filter(
        (point) => !selected.includes(point.id)
    );

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-[100] bg-black opacity-50 transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed left-1/2 top-1/2 z-[110] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Edit quick details
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                        aria-label="Close"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="px-6 py-4">
                    {/* Dropdown */}
                    <div className="relative mb-4">
                        <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full flex items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:ring-offset-2"
                        >
                            <span>Select data points</span>
                            <svg
                                className={`h-5 w-5 text-gray-400 transition-transform ${
                                    isDropdownOpen ? "rotate-180" : ""
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>

                        {isDropdownOpen && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setIsDropdownOpen(false)}
                                />
                                <div className="absolute z-20 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg max-h-60 overflow-auto">
                                    {unselectedPoints.map((point) => (
                                        <button
                                            key={point.id}
                                            type="button"
                                            onClick={() => {
                                                toggleSelection(point.id);
                                                setIsDropdownOpen(false);
                                            }}
                                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            {point.label}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Selection Count */}
                    <div className="mb-4 flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                            {selected.length}/{availableDataPoints.length}{" "}
                            selected:
                        </span>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="text-sm text-[#0066CC] hover:text-[#0052A3] font-medium"
                        >
                            Reset to Defaults
                        </button>
                    </div>

                    {/* Selected Items */}
                    <div className="space-y-2">
                        {selected.map((id) => {
                            const point = availableDataPoints.find(
                                (p) => p.id === id
                            );
                            if (!point) return null;

                            return (
                                <div
                                    key={id}
                                    className="flex items-center gap-3 rounded-md border border-gray-200 bg-white p-3"
                                >
                                    <button
                                        type="button"
                                        onClick={() => toggleSelection(id)}
                                        className="flex h-5 w-5 items-center justify-center rounded border-2 border-[#0066CC] bg-[#0066CC] text-white"
                                    >
                                        <Check className="h-3 w-3" />
                                    </button>
                                    <span className="flex-1 text-sm font-medium text-gray-900">
                                        {point.label}
                                    </span>
                                    <div className="cursor-move text-gray-400">
                                        <GripVertical className="h-5 w-5" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        className="px-4 py-2 text-sm font-medium text-white bg-[#0066CC] hover:bg-[#0052A3] rounded-md transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </>
    );
}
