import { useState } from "react";
import {
    ChevronDown,
    ChevronUp,
    Layers,
    Map as MapIcon,
    PenTool,
    Circle,
} from "lucide-react";

export type MapLayerType =
    | "Default"
    | "Population"
    | "Median Income"
    | "Traffic Count"
    | "Points Of Interest"
    | "Flood Risk"
    | "Fire Risk";

interface MapLayersControlProps {
    activeLayer: MapLayerType;
    onLayerChange: (layer: MapLayerType) => void;
}

export default function MapLayersControl({
    activeLayer,
    onLayerChange,
}: MapLayersControlProps) {
    const [activeGroup, setActiveGroup] = useState<
        "interactive" | "boundaries" | null
    >("interactive");

    const interactiveLayers: MapLayerType[] = [
        "Default",
        "Population",
        "Median Income",
        "Traffic Count",
        "Points Of Interest",
        "Flood Risk",
        "Fire Risk",
    ];

    const getLayerColor = (layer: MapLayerType) => {
        // More subtle highlighting for the active state in the dropdown list
        return activeLayer === layer
            ? "bg-blue-50 text-blue-700"
            : "text-gray-700 hover:bg-gray-50";
    };

    const toggleGroup = (group: "interactive" | "boundaries") => {
        setActiveGroup(activeGroup === group ? null : group);
    };

    return (
        <div className="absolute top-4 left-4 z-1000 flex flex-col items-start gap-2 font-sans select-none">
            <div className="flex gap-3">
                {/* Interactive Maps Toggle */}
                <div className="relative">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleGroup("interactive");
                        }}
                        className={`flex items-center gap-2 px-4 py-2.5 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.12)] hover:shadow-lg transition-all duration-200 border border-gray-100 ${
                            activeGroup === "interactive"
                                ? "ring-2 ring-blue-500 ring-offset-1"
                                : ""
                        }`}
                        aria-expanded={activeGroup === "interactive"}
                    >
                        <Layers
                            className={`w-4 h-4 ${activeGroup === "interactive" ? "text-blue-600" : "text-gray-500"}`}
                        />
                        <span
                            className={`text-sm font-semibold ${activeGroup === "interactive" ? "text-gray-900" : "text-gray-600"}`}
                        >
                            Interactive Maps
                        </span>
                        {activeGroup === "interactive" ? (
                            <ChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                    </button>

                    {/* Dropdown Menu for Interactive Maps */}
                    <div
                        className={`absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden w-64 transition-all duration-300 origin-top-left ${
                            activeGroup === "interactive"
                                ? "opacity-100 scale-100 translate-y-0 visible"
                                : "opacity-0 scale-95 -translate-y-2 invisible"
                        }`}
                        style={{ transformOrigin: "top left" }}
                    >
                        <div className="py-2 flex flex-col">
                            {interactiveLayers.map((layer) => (
                                <button
                                    key={layer}
                                    onClick={() => onLayerChange(layer)}
                                    className={`px-4 py-2.5 text-sm font-medium text-left transition-colors flex items-center justify-between ${getLayerColor(
                                        layer,
                                    )}`}
                                >
                                    <span>{layer}</span>
                                    {activeLayer === layer && (
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Boundaries Toggle */}
                <div className="relative flex flex-col items-start">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleGroup("boundaries");
                        }}
                        className={`flex items-center gap-2 px-4 py-2.5 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 ${
                            activeGroup === "boundaries"
                                ? "ring-2 ring-blue-500 ring-offset-1"
                                : ""
                        }`}
                        aria-expanded={activeGroup === "boundaries"}
                    >
                        <MapIcon
                            className={`w-4 h-4 ${activeGroup === "boundaries" ? "text-blue-600" : "text-gray-500"}`}
                        />
                        <span
                            className={`text-sm font-semibold ${activeGroup === "boundaries" ? "text-gray-900" : "text-gray-600"}`}
                        >
                            Boundaries
                        </span>
                        {activeGroup === "boundaries" ? (
                            <ChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                    </button>

                    {/* Tree-like logic for Boundaries Options */}
                    {activeGroup === "boundaries" && (
                        <div className="flex flex-col items-start ml-6 mt-2 relative animate-in fade-in slide-in-from-top-2 duration-200">
                            {/* Vertical line connecting parent to children */}
                            <div className="absolute -left-6 -top-2 bottom-4 w-px border-l-2 border-dashed border-gray-300"></div>

                            {/* Draw Button */}
                            <div className="relative flex items-center mb-2">
                                {/* Horizontal connector */}
                                <div className="absolute -left-6 top-1/2 w-4 border-t-2 border-dashed border-gray-300"></div>
                                <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-md shadow-sm border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                                    <PenTool className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                        Draw
                                    </span>
                                </button>
                            </div>

                            {/* Radius Button */}
                            <div className="relative flex items-center">
                                {/* Horizontal connector */}
                                <div className="absolute -left-6 top-1/2 w-4 border-t-2 border-dashed border-gray-300"></div>
                                <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-md shadow-sm border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                                    <Circle className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                        Radius
                                    </span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
