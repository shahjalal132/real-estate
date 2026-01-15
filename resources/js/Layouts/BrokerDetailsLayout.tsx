import { ReactNode } from "react";
import { usePage } from "@inertiajs/react";
import BrokerDetailsNav from "@/Components/Broker/BrokerDetailsNav";
import CompanyTabs, { Tab } from "@/Components/Tenant/CompanyTabs";
import BrokerDetailsHeader from "@/Components/Broker/BrokerDetailsHeader";

// Define strict Broker interface needed for Header/Layout
interface Broker {
    id: number;
    name: string;
    thumbnail_url?: string;
    company: string;
    title: string;
    phone?: string;
    email?: string;
    linkedin?: string;
    website?: string;
    address?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
    logo_url?: string;
}

interface BrokerDetailsLayoutProps {
    children: ReactNode;
    title: string;
    tabs: Tab[];
    currentIndex?: number;
    totalCount?: number;
    previousBrokerId?: number | null;
    nextBrokerId?: number | null;
    basePath: string;
    headerComponent?: ReactNode; // Made optional as we are hardcoding Header
    className?: string;
    broker: Broker; // Added broker prop
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
    broker,
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
                    {/* Broker Header (Company Info) */}
                    <BrokerDetailsHeader broker={broker} />

                    {/* Navigation Tabs */}
                    <CompanyTabs tabs={tabs} activeTabId={getActiveTabId()} />
                </div>
            </div>

            <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
                {children}
            </div>
        </div>
    );
}
