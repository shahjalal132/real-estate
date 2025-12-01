import { useEffect } from "react";
import { X } from "lucide-react";
import MapView from "./MapView";
import { Property } from "../types";

interface MapPanelProps {
    isOpen: boolean;
    onClose: () => void;
    properties: Property[];
    selectedPropertyId?: number | null;
    onMarkerClick?: (property: Property) => void;
}

export default function MapPanel({
    isOpen,
    onClose,
    properties,
    selectedPropertyId,
    onMarkerClick,
}: MapPanelProps) {
    // Prevent body scroll when panel is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
                    onClick={onClose}
                />
            )}

            {/* Slide-in Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-full md:w-[600px] lg:w-[700px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-white">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Properties Map
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Close map"
                    >
                        <X className="h-5 w-5 text-gray-600" />
                    </button>
                </div>

                {/* Map Container */}
                <div className="h-[calc(100vh-73px)] relative">
                    <MapView
                        properties={properties}
                        selectedPropertyId={selectedPropertyId}
                        onMarkerClick={onMarkerClick}
                    />
                </div>
            </div>
        </>
    );
}
