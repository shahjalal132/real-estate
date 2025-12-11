import { useState } from "react";
import { X, Pencil } from "lucide-react";

interface NotesModalProps {
    isOpen: boolean;
    onClose: () => void;
    propertyId: number;
}

export default function NotesModal({
    isOpen,
    onClose,
    propertyId,
}: NotesModalProps) {
    const [notes, setNotes] = useState("");

    const handleSave = () => {
        // TODO: Save notes to backend
        console.log("Saving notes:", notes);
        onClose();
    };

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
                    <h2 className="text-xl font-semibold text-gray-900">
                        Notes
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
                <div className="px-6 py-6">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                            <Pencil className="w-10 h-10 text-gray-400" />
                        </div>
                    </div>

                    {/* Instructional Text */}
                    <div className="mb-6 text-sm text-gray-600 leading-relaxed">
                        Enter and save notes about this property that you can
                        reference at any time from this page or your{" "}
                        <a
                            href="#"
                            className="text-[#0066CC] hover:text-[#0052A3] font-medium underline"
                        >
                            Recent Activity
                        </a>{" "}
                        portal. These notes are personal to you and will not be
                        visible to any other tenants or the listing
                        broker/agents.
                    </div>

                    {/* Text Input */}
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Click here to start typing..."
                        className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-transparent resize-none text-sm text-gray-900 placeholder-gray-400"
                    />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">
                    <button
                        type="button"
                        onClick={handleSave}
                        className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        Post to Notes
                    </button>
                </div>
            </div>
        </>
    );
}
