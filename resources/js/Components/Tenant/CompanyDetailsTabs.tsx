interface Tab {
    id: string;
    label: string;
}

interface CompanyDetailsTabsProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

export default function CompanyDetailsTabs({
    tabs,
    activeTab,
    onTabChange,
}: CompanyDetailsTabsProps) {
    return (
        <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                            activeTab === tab.id
                                ? "border-red-500 text-red-600"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>
        </div>
    );
}

