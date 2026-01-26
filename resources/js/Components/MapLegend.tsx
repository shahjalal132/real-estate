import { MapLayerType } from "./MapLayersControl";

interface LegendItem {
    label: string;
    color: string;
}

interface LayerLegendData {
    title: string;
    source: string;
    gradient?: string;
    items?: LegendItem[];
}

export const LEGEND_DATA: Record<MapLayerType, LayerLegendData | null> = {
    Default: null,
    Population: {
        title: "Population Density",
        source: "US Census Bureau (2023)",
        gradient: "linear-gradient(to right, #ffeda0, #feb24c, #f03b20)",
        items: [
            { label: "Low", color: "#ffeda0" },
            { label: "High", color: "#f03b20" },
        ],
    },
    "Median Income": {
        title: "Median Household Income",
        source: "ACS 5-Year Estimates",
        gradient: "linear-gradient(to right, #e5f5e0, #a1d99b, #31a354)",
        items: [
            { label: "< $30k", color: "#e5f5e0" },
            { label: "> $100k", color: "#31a354" },
        ],
    },
    "Traffic Count": {
        title: "Daily Traffic Volume",
        source: "State DOT / Mapbox Traffic",
        items: [
            { label: "Low", color: "#2fff00" },
            { label: "Moderate", color: "#ffaa00" },
            { label: "High", color: "#ff0000" },
            { label: "Severe", color: "#8b0000" },
        ],
    },
    "Points Of Interest": {
        title: "Points of Interest",
        source: "OpenStreetMap / Google Paces",
        items: [
            { label: "Commercial", color: "#4f46e5" },
            { label: "Education", color: "#10b981" },
            { label: "Recreation", color: "#f59e0b" },
        ],
    },
    "Flood Risk": {
        title: "FEMA Flood Zones",
        source: "FEMA NFHL",
        items: [
            { label: "1% Annual Chance (100-yr)", color: "#00c3ff" },
            { label: "0.2% Annual Chance (500-yr)", color: "#ffaa00" },
            { label: "Regulatory Floodway", color: "#ff0000" },
        ],
    },
    "Fire Risk": {
        title: "Wildfire Hazard Potential",
        source: "USFS / USDA",
        gradient: "linear-gradient(to right, #ffffb2, #fd8d3c, #bd0026)",
        items: [
            { label: "Low", color: "#ffffb2" },
            { label: "Very High", color: "#bd0026" },
        ],
    },
};

interface MapLegendProps {
    activeLayer: MapLayerType;
}

export default function MapLegend({ activeLayer }: MapLegendProps) {
    const data = LEGEND_DATA[activeLayer];

    if (!data) return null;

    return (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-100 p-4 min-w-[300px] z-[1000] animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-start mb-2">
                <h4 className="text-sm font-bold text-gray-900">
                    {" "}
                    {data.title}{" "}
                </h4>
            </div>

            {/* Gradient Bar if available */}
            {data.gradient && (
                <div className="mb-2">
                    <div
                        className="h-2 w-full rounded-full mb-1"
                        style={{ background: data.gradient }}
                    >
                        {" "}
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 font-medium">
                        {data.items?.map((item, idx) => (
                            <span key={idx}> {item.label} </span>
                        ))}
                    </div>
                </div>
            )}

            {/* List Items if no gradient or supplementary */}
            {!data.gradient && data.items && (
                <div className="grid grid-cols-2 gap-2 mb-2">
                    {data.items.map((item) => (
                        <div
                            key={item.label}
                            className="flex items-center gap-2"
                        >
                            <span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: item.color }}
                            >
                                {" "}
                            </span>
                            <span className="text-xs text-gray-600 font-medium">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            <div className="border-t border-gray-100 pt-2 mt-2">
                <p className="text-[10px] text-gray-400">
                    Source: {data.source}
                </p>
            </div>
        </div>
    );
}
