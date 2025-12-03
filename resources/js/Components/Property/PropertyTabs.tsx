import { useState, useEffect } from "react";

interface Tab {
    id: string;
    label: string;
}

interface PropertyTabsProps {
    onTabClick: (tabId: string) => void;
}

const tabs: Tab[] = [
    { id: "contacts", label: "Listing Contacts" },
    { id: "details", label: "Details" },
    { id: "about", label: "About Property" },
    { id: "map", label: "Map" },
    { id: "climate", label: "Climate Risk" },
    { id: "history", label: "Property History" },
    { id: "tax", label: "Tax History" },
    { id: "valuation", label: "Valuation Calculator" },
    { id: "metrics", label: "Valuation Metrics" },
    { id: "demographics", label: "Demographics" },
    { id: "insights", label: "Location Insights" },
];

export default function PropertyTabs({ onTabClick }: PropertyTabsProps) {
    const [activeTab, setActiveTab] = useState<string>("contacts");

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 150; // Offset for sticky tabs bar

            // Check tabs in reverse order to get the topmost visible section
            const reversedTabs = [...tabs].reverse();
            let foundActive = false;

            for (const tab of reversedTabs) {
                const element = document.getElementById(tab.id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const elementTop = rect.top + window.scrollY;
                    const elementBottom = elementTop + rect.height;

                    // Check if section is in viewport or just passed
                    if (
                        scrollPosition >= elementTop - 100 &&
                        scrollPosition < elementBottom
                    ) {
                        setActiveTab(tab.id);
                        foundActive = true;
                        break;
                    }
                }
            }

            // If no section found, check if we're at the top
            if (!foundActive && window.scrollY < 100) {
                setActiveTab(tabs[0].id);
            }
        };

        // Use throttled scroll for better performance
        let ticking = false;
        const throttledScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", throttledScroll, { passive: true });
        handleScroll(); // Initial check
        return () => window.removeEventListener("scroll", throttledScroll);
    }, []);

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
        onTabClick(tabId);
    };

    return (
        <div className="border-b border-gray-200 mb-6 sticky top-0 bg-white z-50 shadow-md">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200 relative ${
                            activeTab === tab.id
                                ? "border-[#0066CC] text-[#0066CC] bg-blue-50 font-semibold"
                                : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0066CC]"></span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
