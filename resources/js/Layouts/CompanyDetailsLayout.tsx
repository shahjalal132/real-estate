import { ReactNode } from "react";
import { usePage } from "@inertiajs/react";
import TenantCompanyDetailsNav from "../Components/Tenant/CompanyDetailsNav";
import OwnerCompanyDetailsNav from "../Components/Owner/CompanyDetailsNav";
import CompanyTabs, { Tab } from "../Components/Tenant/CompanyTabs";

interface CompanyDetailsLayoutProps {
    children: ReactNode;
    title: string;
    tabs: Tab[];
    currentIndex?: number;
    totalCount?: number;
    previousCompanyId?: number | null;
    nextCompanyId?: number | null;
    basePath: string; // e.g., "/contacts/tenants" or "/contacts/owners"
    headerComponent: ReactNode;
    className?: string;
}

export default function CompanyDetailsLayout({
    children,
    title,
    tabs,
    currentIndex,
    totalCount,
    previousCompanyId,
    nextCompanyId,
    basePath,
    headerComponent,
    className = "",
}: CompanyDetailsLayoutProps) {
    const { url } = usePage();

    // Determine active tab from URL
    const getActiveTabId = () => {
        // Get the pathname from URL
        const pathname =
            typeof window !== "undefined"
                ? window.location.pathname
                : url.split("?")[0];

        // Normalize pathname (remove trailing slashes)
        const normalizedPathname = pathname.replace(/\/$/, "");

        // First, try exact match with tab href
        for (const tab of tabs) {
            const tabPath = tab.href.split("?")[0].replace(/\/$/, "");
            if (normalizedPathname === tabPath) {
                return tab.id;
            }
        }

        // If no exact match, try matching by the last segment in the URL
        // This handles cases where tab.id uses underscores but URL uses hyphens
        const pathSegments = normalizedPathname.split("/");
        const lastSegment = pathSegments[pathSegments.length - 1];

        // Check non-summary tabs first
        const nonSummaryTabs = tabs.filter((tab) => tab.id !== "summary");
        for (const tab of nonSummaryTabs) {
            // Extract the last segment from tab href
            const tabHrefSegments = tab.href.split("/");
            const tabSegment =
                tabHrefSegments[tabHrefSegments.length - 1] || "";

            // Normalize both for comparison (convert underscores to hyphens)
            const normalizedTabId = tab.id.replace(/_/g, "-");
            const normalizedTabSegment = tabSegment.replace(/_/g, "-");
            const normalizedLastSegment = lastSegment.replace(/_/g, "-");

            // Check if the last segment matches (handles both formats)
            if (
                normalizedLastSegment === normalizedTabSegment ||
                normalizedLastSegment === normalizedTabId ||
                lastSegment === tabSegment ||
                lastSegment === tab.id
            ) {
                return tab.id;
            }
        }

        // If no tab matches and we're on a company detail page (has company ID in path), it's summary
        // Check if pathname matches the base path pattern (e.g., /contacts/tenants/123)
        const basePathPattern = basePath.replace(/\/$/, "");
        if (normalizedPathname.startsWith(basePathPattern)) {
            const remainingPath = normalizedPathname
                .replace(basePathPattern, "")
                .replace(/^\//, "");
            // If remaining path is just a number (company ID), it's summary
            if (/^\d+$/.test(remainingPath)) {
                return "summary";
            }
        }

        // Default to summary
        return "summary";
    };

    // Calculate navigation URLs
    const previousUrl = previousCompanyId
        ? `${basePath}/${previousCompanyId}`
        : null;
    const nextUrl = nextCompanyId ? `${basePath}/${nextCompanyId}` : null;

    // Determine which nav component to use based on basePath
    const isOwner = basePath.includes("/owners");
    const NavComponent = isOwner
        ? OwnerCompanyDetailsNav
        : TenantCompanyDetailsNav;

    return (
        <div className={`bg-gray-50 min-h-screen ${className}`}>
            {/* Top Navigation Bar */}
            <NavComponent
                currentIndex={currentIndex}
                totalCount={totalCount}
                previousUrl={previousUrl}
                nextUrl={nextUrl}
            />

            {/* Company Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
                    <div className="mb-4">{headerComponent}</div>
                    <CompanyTabs tabs={tabs} activeTabId={getActiveTabId()} />
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 py-6">
                {children}
            </div>
        </div>
    );
}
