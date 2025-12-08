import { useState } from "react";

const tabs = [
    { id: "for-sale", label: "For Sale" },
    { id: "sale-comp", label: "Sale Comp" },
    { id: "lease-data", label: "Lease Data" },
    { id: "record", label: "Record" },
];

export default function PropertyTopTabs() {
    const [activeTab, setActiveTab] = useState("for-sale");

    return (
        <div
            id="property-top-tabs"
            className="sticky top-[54px] z-50 bg-gray-100 w-full"
        >
            <div className="flex items-center gap-2 w-[95%] mx-auto px-2 pt-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-3 py-2 text-xs font-semibold transition-all rounded-t-xl border-t border-l border-r border-b-0 ${
                            activeTab === tab.id
                                ? "text-[#0066CC] bg-white border-[#0066CC]"
                                : "text-gray-600 bg-white border-gray-300 hover:text-gray-900 hover:border-gray-400"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
