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
    "Default": null,
    "Population": {
        title: "Population Density",
        source: "Mock Data (US Census)",
        items: [
            { label: "High (> 8,000)", color: "#f03b20" },
            { label: "Medium (4,000 - 8,000)", color: "#feb24c" },
            { label: "Low (< 4,000)", color: "#ffeda0" },
        ],
    },
    "Median Income": {
        title: "Median Household Income",
        source: "Mock Data (ACS)",
        items: [
            { label: "High (> $100k)", color: "#31a354" },
            { label: "Medium ($50k - $100k)", color: "#a1d99b" },
            { label: "Low (< $50k)", color: "#e5f5e0" },
        ],
    },
    "Traffic Count": {
        title: "Daily Traffic Volume",
        source: "Mock Data (DOT)",
        items: [
            { label: "Severe (> 50k)", color: "#8b0000" },
            { label: "High (30k - 50k)", color: "#ff0000" },
            { label: "Moderate (< 30k)", color: "#ffaa00" },
        ],
    },
    "Points Of Interest": {
        title: "Points of Interest",
        source: "Mock Data",
        items: [
            { label: "Commercial", color: "#4f46e5" },
            { label: "Education", color: "#10b981" },
            { label: "Recreation", color: "#f59e0b" },
        ],
    },
    "Flood Risk": {
        title: "Flood Zones",
        source: "Mock Data (FEMA)",
        items: [
            { label: "1% Annual Chance", color: "#00c3ff" },
            { label: "0.2% Annual Chance", color: "#ffaa00" },
        ],
    },
    "Fire Risk": {
        title: "Wildfire Hazard Potential",
        source: "Mock Data (USFS)",
        items: [
            { label: "Very High", color: "#bd0026" },
            { label: "High", color: "#fd8d3c" },
            { label: "Low/Moderate", color: "#ffffb2" },
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
        <div className= "absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-100 p-4 min-w-[300px] z-[1000] animate-in fade-in slide-in-from-bottom-4 duration-300" >
        <div className="flex justify-between items-start mb-2" >
            <h4 className="text-sm font-bold text-gray-900" >
                { " "}
    { data.title } { " " }
    </h4>
        </div>

    {/* Gradient Bar if available */ }
    {
        data.gradient && (
            <div className="mb-2" >
                <div
                        className="h-2 w-full rounded-full mb-1"
        style = {{ background: data.gradient }
    }
                    >
        { " "}
        </div>
        < div className = "flex justify-between text-xs text-gray-500 font-medium" >
        {
            data.items?.map((item, idx) => (
                <span key= { idx } > { item.label } </span>
            ))
        }
            </div>
            </div>
            )
}

{/* List Items if no gradient or supplementary */ }
{
    !data.gradient && data.items && (
        <div className="grid grid-cols-2 gap-2 mb-2" >
        {
            data.items.map((item) => (
                <div
                            key= { item.label }
                            className = "flex items-center gap-2"
                >
                <span
                                className="w-3 h-3 rounded-full"
                                style = {{ backgroundColor: item.color }}
            >
            { " "}
            </span>
            < span className = "text-xs text-gray-600 font-medium" >
                { item.label }
                </span>
                </div>
                    ))
}
</div>
            )}

<div className="border-t border-gray-100 pt-2 mt-2" >
    <p className="text-[10px] text-gray-400" >
        Source: { data.source }
</p>
    </div>
    </div>
    );
}
