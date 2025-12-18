import { useState } from "react";

interface Tab {
    id:
        | "for-sale"
        | "sale-comps"
        | "lease-comps"
        | "sales-lease-data"
        | "property-listing-history"
        | "scout"
        | "demographics"
        | "property-records"
        | "underwrite"
        | "contacts";
    label: string;
}

const tabs: Tab[] = [
    { id: "for-sale", label: "For Sale" },
    { id: "sale-comps", label: "Sale Comps" },
    { id: "lease-comps", label: "Lease Comps" },
    { id: "sales-lease-data", label: "Sales Lease Data" },
    { id: "property-listing-history", label: "Property Listing History" },
    { id: "scout", label: "Scout" },
    { id: "demographics", label: "Demographics" },
    { id: "property-records", label: "Property Records" },
    { id: "underwrite", label: "Underwrite" },
    { id: "contacts", label: "Contacts" },
];

export default function PropertyTopTabs() {
    const [activeTab, setActiveTab] = useState("for-sale");

    return (
        <div
            id="property-top-tabs"
            className="sticky top-[58px] z-50 bg-gray-100 w-full"
        >
            <div className="flex items-center gap-2 w-[95%] mx-auto px-2 pt-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-3 py-2 text-sm font-normal cursor-pointer transition-all rounded-t-xl border-t border-l border-r border-b-0 ${
                            activeTab === tab.id
                                ? "text-[#0066CC] bg-white border-[#0066CC]"
                                : "text-gray-600 bg-gray-50 border-gray-300 hover:text-gray-900 hover:border-gray-400"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
