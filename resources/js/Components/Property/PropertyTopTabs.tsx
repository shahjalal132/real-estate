import { useState, useRef, useEffect } from "react";

interface Tab {
    id:
        | "for-sale"
        | "for-lease"
        | "sale-comps"
        | "lease-comps"
        | "sales-lease-data"
        | "property-listing-history"
        | "scout"
        | "property-records"
        | "underwrite"
        | "contacts"
        | "documents"
        | "summary";
    label: string;
}

const tabs: Tab[] = [
    { id: "for-sale", label: "For Sale" },
    { id: "for-lease", label: "For Lease" },
    { id: "sale-comps", label: "Sales Comps" },
    { id: "lease-comps", label: "Lease Comps" },
    { id: "sales-lease-data", label: "Sales & Lease Data" },
    { id: "property-listing-history", label: "Listing History" },
    { id: "scout", label: "Scout" },
    { id: "property-records", label: "Records" },
    { id: "underwrite", label: "Underwrite" },
    { id: "contacts", label: "Contacts" },
    { id: "documents", label: "Documents" },
    { id: "summary", label: "Summary" },
];

export default function PropertyTopTabs() {
    const [activeTab, setActiveTab] = useState("for-sale");
    const containerRef = useRef<HTMLDivElement>(null);

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
        // Basic scroll into view logic for the element in case it's partially off-screen
        const element = document.getElementById(`tab-btn-${tabId}`);
        if (element && containerRef.current) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
            });
        }
    };

    return (
        <div
            id="property-top-tabs"
            className="sticky top-[58px] z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300"
        >
            <div className="w-[98%] mx-auto px-2 relative group">
                {/* Scroll Gradient Hints */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

                <div
                    ref={containerRef}
                    className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar scroll-smooth"
                >
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                id={`tab-btn-${tab.id}`}
                                onClick={() => handleTabClick(tab.id)}
                                className={`
                                    relative px-4 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap rounded-full
                                    ${
                                        isActive
                                            ? "text-rose-600 bg-rose-50 ring-1 ring-rose-200 shadow-sm"
                                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-50 border border-transparent hover:border-gray-200"
                                    }
                                `}
                            >
                                {tab.label}
                                {isActive && (
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-rose-500 rounded-full opacity-0" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
