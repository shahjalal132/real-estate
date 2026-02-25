import { useState, useRef } from "react";
import { Link, usePage } from "@inertiajs/react";
import MegaMenu, { menus, menuAliases } from "./MegaMenu";
import { Menu, ChevronDown, ChevronRight, X } from "lucide-react";
import Button from "./Button";
import SearchComponent from "./SearchComponent";
import MobileMenu from "./MobileMenu";

import { PageProps } from "@/types";

export interface NavigationItem {
    label: string;
    link: string;
    type: "megaMenu" | "page";
    megaMenuId?: string;
    hasDropdown?: boolean;
}

export default function Header() {
    const { url, props } = usePage<PageProps>();
    const { auth } = props;
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Show search component only when URL contains "properties"
    // Get URL from page props or window location as fallback
    const currentUrl =
        url || (typeof window !== "undefined" ? window.location.pathname : "");
    const showSearch = currentUrl.includes("/properties");

    const navigationItems: NavigationItem[] = [
        {
            label: "For Sale",
            link: "/properties?type=for-sale",
            type: "megaMenu",
            megaMenuId: "forSale",
            hasDropdown: true,
        },
        {
            label: "For Lease",
            link: "/properties?type=for-lease",
            type: "megaMenu",
            megaMenuId: "forLease",
            hasDropdown: true,
        },
        {
            label: "Scout",
            link: "/scout",
            type: "megaMenu",
            megaMenuId: "scout",
            hasDropdown: true,
        },
        {
            label: "Comps",
            link: "/comps",
            type: "megaMenu",
            megaMenuId: "comps",
            hasDropdown: true,
        },
        {
            label: "Dispensaries",
            link: "/dispensaries",
            type: "megaMenu",
            megaMenuId: "dispensaries",
            hasDropdown: true,
        },
        {
            label: "Pipeline",
            link: "/pipeline",
            type: "megaMenu",
            megaMenuId: "pipeline",
            hasDropdown: true,
        },
        {
            label: "Tools",
            link: "/tools",
            type: "megaMenu",
            megaMenuId: "tools",
            hasDropdown: true,
        },
        {
            label: "Settings",
            link: "/settings",
            type: "megaMenu",
            megaMenuId: "settings",
            hasDropdown: true,
        },
        {
            label: "Zoning",
            link: "/zoning",
            type: "megaMenu",
            megaMenuId: "zoningChanges",
            hasDropdown: true,
        },
        {
            label: "Contacts",
            link: "/contacts",
            type: "megaMenu",
            megaMenuId: "contacts",
            hasDropdown: true,
        },
    ];

    const mainNavItems = navigationItems.slice(0, 5);
    const rightNavItems = [
        navigationItems[8], // ZONING
        navigationItems[9], // CONTACTS
        navigationItems[5], // PIPELINE
        navigationItems[6], // TOOLS
        navigationItems[7], // SETTINGS
    ];

    // Medium (md–xl): show these left items; rest in hamburger drawer
    const leftNavMedium = mainNavItems.slice(0, 3); // For Sale, For Lease, Scout

    const renderNavItem = (
        item: NavigationItem,
        isRightNav: boolean = false,
    ) => {
        // For items with mega menus, use a button instead of Link to prevent direct navigation
        const isMegaMenu = item.type === "megaMenu" && item.hasDropdown;

        // Determine if this menu should be right-aligned
        const rightAlignMenus = ["contacts", "tools", "settings", "pipeline"];
        const shouldRightAlign = rightAlignMenus.includes(
            item.megaMenuId || "",
        );

        const handleMouseEnter = () => {
            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
                closeTimeoutRef.current = null;
            }
            if (item.type === "megaMenu") {
                setActiveMenu(item.megaMenuId || null);
            }
        };

        const handleMouseLeave = () => {
            if (item.type === "megaMenu") {
                closeTimeoutRef.current = setTimeout(() => {
                    setActiveMenu(null);
                }, 300);
            }
        };

        return (
            <div
                key={item.label}
                className="relative overflow-visible group"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {isMegaMenu ? (
                    <button
                        type="button"
                        className={`relative group tracking-[0.5px] font-normal transition-all duration-200 whitespace-nowrap text-xs md:text-sm capitalize cursor-pointer px-1 py-1.5 rounded-md ${
                            activeMenu === item.megaMenuId
                                ? "text-[#0066cc] bg-[#F0F7FF]"
                                : "text-[#4A4A4A] hover:text-[#0066cc] hover:bg-[#F0F7FF]/50"
                        }`}
                    >
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#0066cc] group-hover:w-[calc(100%-0.5rem)] transition-all duration-200">
                            {" "}
                        </span>
                        <div className="flex items-center justify-between gap-1.5 md:gap-2">
                            {item.label}
                            {item.hasDropdown && (
                                <ChevronDown
                                    className={`h-3 w-3 shrink-0 transition-transform duration-200 ${
                                        activeMenu === item.megaMenuId
                                            ? "rotate-180 text-[#0066cc]"
                                            : "text-[#4a4a4a]"
                                    }`}
                                />
                            )}
                        </div>
                    </button>
                ) : (
                    <Link
                        href={item.link}
                        className={`relative group tracking-[0.5px] font-normal transition-all duration-200 whitespace-nowrap text-xs md:text-sm capitalize px-1 py-1.5 rounded-md ${
                            activeMenu === item.megaMenuId
                                ? "text-[#0066cc] bg-[#F0F7FF]"
                                : "text-[#4A4A4A] hover:text-[#0066cc] hover:bg-[#F0F7FF]/50"
                        }`}
                    >
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#0066cc] group-hover:w-[calc(100%-0.5rem)] transition-all duration-200">
                            {" "}
                        </span>
                        <div className="flex items-center justify-between gap-1.5 md:gap-2">
                            {item.label}
                            {item.hasDropdown && (
                                <ChevronDown
                                    className={`h-3 w-3 shrink-0 transition-transform duration-200 ${
                                        activeMenu === item.megaMenuId
                                            ? "rotate-180 text-[#0066cc]"
                                            : "text-[#4a4a4a]"
                                    }`}
                                />
                            )}
                        </div>
                    </Link>
                )}
                {item.type === "megaMenu" && activeMenu === item.megaMenuId && (
                    <>
                        {/* Bridge element to prevent gap between nav item and dropdown */}
                        <div
                            className="absolute top-full left-0 right-0 h-4 z-[99] pointer-events-auto"
                            onMouseEnter={() => {
                                if (closeTimeoutRef.current) {
                                    clearTimeout(closeTimeoutRef.current);
                                    closeTimeoutRef.current = null;
                                }
                                setActiveMenu(item.megaMenuId || null);
                            }}
                        />
                        <div
                            className={`absolute top-full pt-4 z-[100] ${
                                shouldRightAlign || isRightNav
                                    ? "right-0"
                                    : "left-0"
                            }`}
                            onMouseEnter={() => {
                                // Clear timeout and keep menu open
                                if (closeTimeoutRef.current) {
                                    clearTimeout(closeTimeoutRef.current);
                                    closeTimeoutRef.current = null;
                                }
                                setActiveMenu(item.megaMenuId || null);
                            }}
                            onMouseLeave={() => {
                                closeTimeoutRef.current = setTimeout(() => {
                                    setActiveMenu(null);
                                }, 150);
                            }}
                        >
                            <MegaMenu
                                menuId={item.megaMenuId!}
                                isRightAligned={shouldRightAlign || isRightNav}
                                onClose={() => {
                                    if (closeTimeoutRef.current) {
                                        clearTimeout(closeTimeoutRef.current);
                                        closeTimeoutRef.current = null;
                                    }
                                    setActiveMenu(null);
                                }}
                            />
                        </div>
                    </>
                )}
            </div>
        );
    };

    return (
        <header className="sticky top-0 z-40 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)] overflow-visible">
            <div className="w-[95%] max-w-full mx-auto px-4 sm:px-6 lg:px-2 lg:py-4  h-full overflow-visible">
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center space-x-3 md:space-x-4 lg:space-x-6 flex-1 min-w-0">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex items-center flex-shrink-0"
                        >
                            <img
                                src="/assets/images/logo-updated.png"
                                alt="TENANTS HQ"
                                className="h-6 md:h-7 w-auto max-w-[120px] md:max-w-[140px] object-contain"
                            />
                        </Link>

                        {/* Search Component - Only show on properties pages */}
                        {showSearch && (
                            <div className="hidden md:block flex-1 max-w-[250px] min-w-0">
                                <SearchComponent />
                            </div>
                        )}

                        {/* Medium (md–xl): left items only; rest in "More" drawer */}
                        <nav className="hidden md:flex xl:hidden items-center gap-1 sm:gap-2 flex-shrink-0 overflow-visible">
                            {leftNavMedium.map((item) =>
                                renderNavItem(item, false),
                            )}
                        </nav>

                        {/* Full navigation: visible only from xl (1280px) and up */}
                        <nav className="hidden xl:flex items-center space-x-2 xl:space-x-3 overflow-visible flex-1 min-w-0 flex-wrap">
                            {mainNavItems.map((item) =>
                                renderNavItem(item, false),
                            )}
                        </nav>
                    </div>

                    {/* Right Side: Nav items (xl only) + Menu/More button (below xl) + CTA */}
                    <div className="flex items-center py-4 md:py-2 xl:py-0 gap-2 xl:gap-4">
                        {/* Separator before More on medium (md–xl) */}
                        <div
                            className="hidden md:block xl:hidden w-px h-5 bg-gray-200 shrink-0"
                            aria-hidden
                        />
                        {/* Right nav items (Zoning, Contacts, Pipeline, Tools, Settings) - visible only at xl */}
                        <nav className="hidden xl:flex items-center space-x-2 xl:space-x-3 overflow-visible">
                            {rightNavItems.map((item) =>
                                renderNavItem(item, true),
                            )}
                        </nav>

                        {/* CTA + Menu/More button (below xl: opens full nav drawer) */}
                        <div className="flex items-center gap-2 xl:gap-4">
                            {auth.user ? (
                                <Button
                                    href={
                                        auth.user.user_type === "admin"
                                            ? "/admin/dashboard"
                                            : "/dashboard"
                                    }
                                    className="tracking-[1px]"
                                >
                                    Dashboard
                                </Button>
                            ) : (
                                <Button
                                    href="/login"
                                    className="tracking-[1px]"
                                >
                                    Log in
                                </Button>
                            )}
                            <button
                                type="button"
                                onClick={() =>
                                    setMobileMenuOpen(!mobileMenuOpen)
                                }
                                className="xl:hidden flex items-center gap-2 px-3 py-2 rounded-lg text-[#4A4A4A] hover:bg-[#F0F7FF] hover:text-[#0066cc] transition-colors border border-transparent hover:border-gray-200"
                                aria-label="Open menu"
                            >
                                <Menu
                                    color="currentColor"
                                    strokeWidth={3}
                                    className="w-5 h-5 shrink-0"
                                />
                                <span className="text-sm font-medium hidden sm:inline md:hidden">
                                    Menu
                                </span>
                                <span className="text-sm font-medium hidden md:inline xl:hidden">
                                    More
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <MobileMenu
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                showSearch={showSearch}
                navigationItems={navigationItems}
                auth={auth}
            />
        </header>
    );
}
