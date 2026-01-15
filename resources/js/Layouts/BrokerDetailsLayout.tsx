import { ReactNode } from "react";
import { parse } from "url"; // Note: might need better URL parsing if available or just use window/props
import { usePage } from "@inertiajs/react";
import BrokerDetailsNav from "@/Components/Broker/BrokerDetailsNav";
import CompanyTabs, { Tab } from "@/Components/Tenant/CompanyTabs";

interface BrokerDetailsLayoutProps {
    children: ReactNode;
    title: string;
    tabs: Tab[];
    currentIndex?: number;
    totalCount?: number;
    previousBrokerId?: number | null;
    nextBrokerId?: number | null;
    basePath: string;
    headerComponent: ReactNode;
    className?: string;
}

export default function BrokerDetailsLayout({
    children,
    tabs,
    currentIndex,
    totalCount,
    previousBrokerId,
    nextBrokerId,
    basePath,
    className = "",
}: BrokerDetailsLayoutProps) {
    const { url } = usePage();

    // Determine active tab from URL - reusing logic from CompanyDetailsLayout
    const getActiveTabId = () => {
        const pathname =
            typeof window !== "undefined"
                ? window.location.pathname
                : url.split("?")[0];
        const normalizedPathname = pathname.replace(/\/$/, "");

        for (const tab of tabs) {
            const tabPath = tab.href.split("?")[0].replace(/\/$/, "");
            if (normalizedPathname === tabPath) {
                return tab.id;
            }
        }

        const pathSegments = normalizedPathname.split("/");
        const lastSegment = pathSegments[pathSegments.length - 1];

        // Check if remaining path is just number (summary)
        const basePathPattern = basePath.replace(/\/$/, "");
        if (normalizedPathname.startsWith(basePathPattern)) {
            const remainingPath = normalizedPathname
                .replace(basePathPattern, "")
                .replace(/^\//, "");
            if (/^\d+$/.test(remainingPath)) {
                return "summary";
            }
        }

        return "summary";
    };

    const previousUrl = previousBrokerId
        ? `${basePath}/${previousBrokerId}`
        : null;
    const nextUrl = nextBrokerId ? `${basePath}/${nextBrokerId}` : null;

    return (
        <div className={`bg-gray-50 min-h-screen ${className}`}>
            <BrokerDetailsNav
                currentIndex={currentIndex}
                totalCount={totalCount}
                previousUrl={previousUrl}
                nextUrl={nextUrl}
            />

            <div className="bg-white border-b border-gray-200">
                <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
                    <CompanyTabs tabs={tabs} activeTabId={getActiveTabId()} />
                </div>
            </div>

            <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
                {children}
            </div>
        </div>
    );
}
