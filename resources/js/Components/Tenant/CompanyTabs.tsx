import { Link } from "@inertiajs/react";

export interface Tab {
    id: string;
    label: string;
    href: string;
}

interface CompanyTabsProps {
    tabs: Tab[];
    activeTabId?: string;
    className?: string;
}

export default function CompanyTabs({
    tabs,
    activeTabId,
    className = "",
}: CompanyTabsProps) {
    return (
        <div className={`bg-gray-50 border-b border-gray-200 mt-2 ${className}`}>
            <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                    <Link
                        key={tab.id}
                        href={tab.href}
                        className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                            tab.id === activeTabId
                                ? "border-red-500 text-red-600"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        }`}
                    >
                        {tab.label}
                    </Link>
                ))}
            </nav>
        </div>
    );
}

