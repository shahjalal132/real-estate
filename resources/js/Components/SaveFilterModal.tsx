import { useState, useEffect } from "react";
import { X, Calendar } from "lucide-react";

interface SaveFilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (name: string, duration: string) => void;
    defaultName: string;
    saving?: boolean;
}

const DURATION_OPTIONS = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "never", label: "Never" },
];

export default function SaveFilterModal({
    isOpen,
    onClose,
    onSave,
    defaultName,
    saving = false,
}: SaveFilterModalProps) {
    const [name, setName] = useState(defaultName);
    const [duration, setDuration] = useState("daily");

    // Update name when defaultName changes
    useEffect(() => {
        setName(defaultName);
    }, [defaultName]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onSave(name.trim(), duration);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-[100] bg-black opacity-50 transition-opacity duration-300 ease-in-out"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed left-1/2 top-1/2 z-[110] w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white shadow-xl transition-all duration-300 ease-in-out">
                <div className="relative p-6">
                    {/* Close Button */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all"
                        aria-label="Close modal"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    {/* Header */}
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-gray-900">
                            Save Search
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Save your search criteria and receive email alerts
                            when new properties match your filters.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Search Name */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Search Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="Enter search name"
                                className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 placeholder-gray-400 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:ring-opacity-20"
                            />
                        </div>

                        {/* Email Alert Frequency */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Email Alert Frequency
                            </label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                <select
                                    value={duration}
                                    onChange={(e) =>
                                        setDuration(e.target.value)
                                    }
                                    className="w-full rounded-lg border-2 border-gray-300 bg-white pl-10 pr-4 py-3 text-sm text-gray-700 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:ring-opacity-20 appearance-none cursor-pointer"
                                >
                                    {DURATION_OPTIONS.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                                How often would you like to receive email alerts
                                for this search?
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={saving}
                                className="rounded-lg border-2 border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={saving || !name.trim()}
                                className="rounded-lg bg-[#0066CC] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#004C99] shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {saving ? "Saving..." : "Save Search"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
