import { useState } from "react";
import { X, Search } from "lucide-react";

interface AddTenantCompaniesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddTenantCompaniesModal({
    isOpen,
    onClose,
}: AddTenantCompaniesModalProps) {
    const [searchValue, setSearchValue] = useState("");
    const [showComingSoon, setShowComingSoon] = useState(false);

    const handleAddToResults = () => {
        // Show coming soon message
        setShowComingSoon(true);
        setTimeout(() => {
            setShowComingSoon(false);
            onClose();
            setSearchValue("");
        }, 2000);
    };

    const handleCancel = () => {
        setSearchValue("");
        onClose();
    };

    const isAddButtonDisabled = !searchValue.trim();

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal - Appears from top center */}
            <div className="fixed left-1/2 top-20 z-50 w-full max-w-lg -translate-x-1/2 transform rounded-lg bg-white shadow-2xl transition-all duration-300 ease-out">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Add Tenant Companies
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                        aria-label="Close modal"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="px-6 py-6">
                    {/* Instructional Text */}
                    <p className="mb-4 text-sm text-gray-600">
                        Lookup a tenant by name or ticker symbol to add it to
                        your search results.
                    </p>

                    {/* Search Input */}
                    <div className="relative">
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="e.g. 'ABC Company'"
                            className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 pr-10 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-all"
                            onKeyPress={(e) => {
                                if (e.key === "Enter" && !isAddButtonDisabled) {
                                    handleAddToResults();
                                }
                            }}
                        />
                        <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>

                    {/* Coming Soon Message */}
                    {showComingSoon && (
                        <div className="mt-4 rounded-md bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-blue-800">
                            This feature is coming soon. We are working on it.
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleAddToResults}
                        disabled={isAddButtonDisabled}
                        className={`rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
                            isAddButtonDisabled
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-gray-600 text-white hover:bg-gray-700"
                        }`}
                    >
                        Add to Results
                    </button>
                </div>
            </div>
        </>
    );
}

