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
        <div className="mb-3 w-full">
            <div className="border-b-1 border-[#0066CC]">
                <div className="flex items-end">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 text-sm font-semibold transition-all relative ${
                                activeTab === tab.id
                                    ? "text-[#0066CC] bg-white border-t-2 border-l-1 border-r-1 border-[#0066CC] rounded-t-lg -mb-[2px] z-10"
                                    : "text-gray-600 border-b-2 border-transparent hover:text-gray-900 hover:border-gray-300"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
