import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Property } from "../../types";

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    property: Property;
    propertyImage?: string;
}

export default function ShareModal({
    isOpen,
    onClose,
    property,
    propertyImage,
}: ShareModalProps) {
    const [emails, setEmails] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    // Build property summary for subject
    const location = property.location;
    const locationString = location
        ? `${location.city}${
              location.state_code ? ` (${location.state_code})` : ""
          }, ${location.state_code || ""}`
        : "";

    const defaultSubject =
        property.details?.summary_details?.["Locations"] ||
        property.details?.summary_details?.["Location Count"] ||
        property.name ||
        "Property Listing";

    const defaultSubjectFull = `${defaultSubject}${
        locationString ? ` - ${locationString}` : ""
    }`;

    // Initialize subject when modal opens
    useEffect(() => {
        if (isOpen) {
            const location = property.location;
            const locationString = location
                ? `${location.city}${
                      location.state_code ? ` (${location.state_code})` : ""
                  }, ${location.state_code || ""}`
                : "";

            const defaultSubject =
                property.details?.summary_details?.["Locations"] ||
                property.details?.summary_details?.["Location Count"] ||
                property.name ||
                "Property Listing";

            const defaultSubjectFull = `${defaultSubject}${
                locationString ? ` - ${locationString}` : ""
            }`;

            if (!subject) {
                setSubject(defaultSubjectFull);
            }
        }
    }, [isOpen, property]);

    const handlePreviewAndSend = () => {
        // TODO: Implement preview and send functionality
        console.log("Preview & Send:", { emails, subject, message });
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
            <div className="fixed left-1/2 top-1/2 z-[110] w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white shadow-xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 sticky top-0 bg-white z-10">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Share Property
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                        aria-label="Close"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="px-6 py-6">
                    {/* Property Image */}
                    <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden bg-gray-100">
                        {propertyImage ? (
                            <img
                                src={propertyImage}
                                alt={property.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                No Image Available
                            </div>
                        )}
                        {/* Logo overlay - placeholder */}
                        <div className="absolute top-4 right-4 bg-white/90 rounded-lg px-3 py-2">
                            <div className="text-xs font-semibold text-gray-700">
                                ESSENTIAL CRE
                            </div>
                        </div>
                    </div>

                    {/* Property Information */}
                    <div className="bg-gray-800 text-white p-4 rounded-lg mb-6">
                        <div className="text-sm text-gray-300 mb-1">
                            {property.location?.full_address ||
                                property.location?.address ||
                                "Address not available"}
                        </div>
                        <div className="text-lg font-bold mb-2">
                            {property.name}
                            {locationString && ` - ${locationString}`}
                        </div>
                        <div className="text-sm text-gray-300">
                            {property.details?.summary_details?.["Locations"] ||
                                property.details?.summary_details?.[
                                    "Location Count"
                                ] ||
                                ""}
                            {property.details?.summary_details?.["Corporate"] &&
                                ` | ${property.details.summary_details["Corporate"]} Corporate`}
                            {property.details?.summary_details?.["Location"] &&
                                ` | ${property.details.summary_details["Location"]}`}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Email Form - Left Side */}
                        <div className="lg:col-span-2 space-y-4">
                            {/* Email Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email(s) to share with{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={emails}
                                    onChange={(e) => setEmails(e.target.value)}
                                    placeholder="Insert the list of your client's emails in here. Use commas or line breaks to separate"
                                    className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-transparent resize-none text-sm text-gray-900 placeholder-gray-400"
                                />
                                <div className="text-xs text-gray-500 mt-1">
                                    Insert up to 100 emails
                                </div>
                            </div>

                            {/* Subject Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Subject{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-transparent text-sm text-gray-900"
                                />
                            </div>

                            {/* Message Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Enter your message..."
                                    className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-transparent resize-none text-sm text-gray-900 placeholder-gray-400"
                                />
                            </div>
                        </div>

                        {/* Social Media - Right Side */}
                        <div className="lg:col-span-1">
                            <div className="text-sm font-medium text-gray-700 mb-3">
                                Share On
                            </div>
                            <div className="flex flex-col gap-3">
                                <button
                                    type="button"
                                    className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                                    aria-label="Share on LinkedIn"
                                >
                                    <svg
                                        className="w-6 h-6 text-gray-700"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                                    aria-label="Share on Twitter"
                                >
                                    <svg
                                        className="w-6 h-6 text-gray-700"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                                    aria-label="Share on Facebook"
                                >
                                    <svg
                                        className="w-6 h-6 text-gray-700"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4 sticky bottom-0 bg-white">
                    <button
                        type="button"
                        onClick={handlePreviewAndSend}
                        className="px-6 py-2 text-sm font-medium text-white bg-[#0066CC] hover:bg-[#0052A3] rounded-lg transition-colors"
                    >
                        Preview & Send
                    </button>
                </div>
            </div>
        </>
    );
}
