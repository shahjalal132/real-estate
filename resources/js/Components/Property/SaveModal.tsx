import { useState } from "react";
import { X, Star, MessageCircle } from "lucide-react";
import { Property } from "../../types";

interface PropertyGroup {
    id: number;
    name: string;
    count: number;
    thumbnail?: string;
    isSelected?: boolean;
}

interface SaveModalProps {
    isOpen: boolean;
    onClose: () => void;
    property: Property;
    propertyImage?: string;
}

export default function SaveModal({
    isOpen,
    onClose,
    property,
    propertyImage,
}: SaveModalProps) {
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

    // Mock property groups - in real app, this would come from API
    const propertyGroups: PropertyGroup[] = [
        { id: 1, name: "Area", count: 1, isSelected: true },
        { id: 2, name: "Asap", count: 2 },
        { id: 3, name: "Commercial", count: 1 },
        { id: 4, name: "Favorites", count: 3 },
    ];

    const handleGroupSelect = (groupId: number) => {
        setSelectedGroupId(groupId);
    };

    const handleSave = () => {
        // TODO: Save property to selected group
        console.log("Saving property to group:", selectedGroupId);
        onClose();
    };

    const handleNewGroup = () => {
        // TODO: Create new group
        console.log("Create new group");
    };

    if (!isOpen) return null;

    const location = property.location;
    const locationString = location
        ? `${location.city}${
              location.state_code ? ` (${location.state_code})` : ""
          }, ${location.state_code || ""}`
        : "";

    const propertyDetails =
        property.details?.summary_details?.["Locations"] ||
        property.details?.summary_details?.["Location Count"] ||
        "";
    const corporate = property.details?.summary_details?.["Corporate"] || "";
    const locationDetail =
        property.details?.summary_details?.["Location"] || "";

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-[100] bg-black opacity-50 transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed left-1/2 top-1/2 z-[110] w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white shadow-xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-start justify-between border-b border-gray-200 px-6 py-4">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                            Save Property
                        </h2>
                        <p className="text-sm text-gray-600">
                            Property Groups help you organize and share
                            properties you (or your clients) are interested in!
                        </p>
                    </div>
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Panel - Property Card */}
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                            {/* Property Image */}
                            <div className="relative w-full h-48 bg-gray-100">
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
                                {/* Overlay label */}
                                <div className="absolute top-3 right-3 bg-white/90 rounded px-2 py-1">
                                    <span className="text-xs font-semibold text-gray-700">
                                        {property.types?.[0] || "Property"}
                                    </span>
                                </div>
                                {/* Star icon */}
                                <div className="absolute top-3 right-12">
                                    <Star className="w-5 h-5 text-gray-300" />
                                </div>
                            </div>

                            {/* Property Details */}
                            <div className="p-4">
                                <div className="text-2xl font-bold text-gray-900 mb-2">
                                    {property.formatted_price ||
                                        `$${Number(
                                            property.asking_price
                                        ).toLocaleString()}`}
                                </div>
                                <div className="text-sm font-medium text-gray-700 mb-1 truncate">
                                    {property.name}
                                </div>
                                <div className="text-xs text-gray-600 mb-4">
                                    {propertyDetails}
                                    {corporate && ` • ${corporate} Corporate`}
                                    {locationDetail && ` • ${locationDetail}`}
                                </div>
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#0066CC] text-white rounded-lg hover:bg-[#0052A3] transition-colors text-sm font-medium"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    Request Info
                                </button>
                            </div>
                        </div>

                        {/* Right Panel - Property Groups */}
                        <div>
                            <button
                                type="button"
                                onClick={handleNewGroup}
                                className="w-full mb-4 px-4 py-2 border-2 border-[#0066CC] text-[#0066CC] rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
                            >
                                New Group
                            </button>

                            <div className="space-y-2">
                                {propertyGroups.map((group) => (
                                    <div
                                        key={group.id}
                                        className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                        onClick={() =>
                                            handleGroupSelect(group.id)
                                        }
                                    >
                                        {/* Thumbnail */}
                                        <div className="w-12 h-12 rounded bg-gray-200 shrink-0 overflow-hidden">
                                            {group.thumbnail ? (
                                                <img
                                                    src={group.thumbnail}
                                                    alt={group.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                                    {group.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>

                                        {/* Group Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-gray-900 truncate">
                                                    {group.name}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    ({group.count})
                                                </span>
                                            </div>
                                        </div>

                                        {/* Star Icon */}
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleGroupSelect(group.id);
                                            }}
                                            className="shrink-0"
                                        >
                                            <Star
                                                className={`w-5 h-5 ${
                                                    selectedGroupId ===
                                                        group.id ||
                                                    group.isSelected
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-gray-300"
                                                }`}
                                            />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        className="px-4 py-2 text-sm font-medium text-white bg-[#0066CC] hover:bg-[#0052A3] rounded-lg transition-colors"
                    >
                        Save
                    </button>
                </div>
            </div>
        </>
    );
}
