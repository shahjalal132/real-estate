import { useState } from "react";
import { Bookmark, X } from "lucide-react";
import { FilterValues } from "./AllFiltersModal";

interface SaveFilterNotificationProps {
    filters: FilterValues;
    onSave: (name: string, duration: string) => void;
    onDismiss: () => void;
    defaultName: string;
}

export default function SaveFilterNotification({
    filters,
    onSave,
    onDismiss,
    defaultName,
}: SaveFilterNotificationProps) {
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [name, setName] = useState(defaultName);
    const [duration, setDuration] = useState("daily");

    const handleQuickSave = () => {
        if (name.trim()) {
            onSave(name.trim(), duration);
            onDismiss();
        }
    };

    if (showSaveModal) {
        return (
            <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow-xl p-4 animate-in slide-in-from-bottom-5">
                <div className="mb-3">
                    <h3 className="text-sm font-semibold text-gray-900">
                        Save Your Search
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">
                        Save this search to quickly apply it later
                    </p>
                </div>
                <div className="space-y-3">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Search name"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0066CC] focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:ring-opacity-20"
                        autoFocus
                    />
                    <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0066CC] focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:ring-opacity-20"
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="never">Never</option>
                    </select>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => {
                                setShowSaveModal(false);
                                onDismiss();
                            }}
                            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleQuickSave}
                            disabled={!name.trim()}
                            className="flex-1 rounded-lg bg-[#0066CC] px-3 py-2 text-sm font-semibold text-white hover:bg-[#004C99] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow-xl p-4 animate-in slide-in-from-bottom-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1">
                <Bookmark className="h-5 w-5 text-[#0066CC] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">
                        Save this search?
                    </p>
                    <p className="text-xs text-gray-600">
                        Quick access to your filters later
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
                <button
                    type="button"
                    onClick={() => setShowSaveModal(true)}
                    className="rounded-lg bg-[#0066CC] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#004C99] whitespace-nowrap"
                >
                    Save
                </button>
                <button
                    type="button"
                    onClick={onDismiss}
                    className="rounded-full p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                    aria-label="Dismiss"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}

