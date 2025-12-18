import { useState, useRef } from "react";
import { Link, usePage } from "@inertiajs/react";
import MegaMenu from "./MegaMenu";
import { Menu, ChevronDown } from "lucide-react";
import Button from "./Button";
import SearchComponent from "./SearchComponent";

interface NavigationItem {
    label: string;
    link: string;
    type: "megaMenu" | "page";
    megaMenuId?: string;
    hasDropdown?: boolean;
}

export default function Header() {
    const page = usePage();
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [moreMenuOpen, setMoreMenuOpen] = useState<boolean>(false);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Show search component only when URL contains "properties"
    // Get URL from page props or window location as fallback
    const currentUrl =
        (page as any)?.url ||
        (typeof window !== "undefined" ? window.location.pathname : "");
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

    // For medium screens: first 6 visible, rest (excluding last 3) go to "MORE"
    const visibleItems = mainNavItems.slice(0, 6);
    const moreItems = mainNavItems.slice(6);

    const renderNavItem = (
        item: NavigationItem,
        isInMoreMenu: boolean = false
    ) => {
        // For items with mega menus, use a button instead of Link to prevent direct navigation
        const isMegaMenu = item.type === "megaMenu" && item.hasDropdown;

        const handleMouseEnter = () => {
            // Clear any pending close timeout
            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
                closeTimeoutRef.current = null;
            }

            if (item.type === "megaMenu") {
                setActiveMenu(item.megaMenuId || null);
                if (isInMoreMenu) {
                    setMoreMenuOpen(true);
                }
            }
        };

        const handleMouseLeave = () => {
            // Add a delay before closing to allow user to move to mega menu
            if (isInMoreMenu && activeMenu === item.megaMenuId) {
                return;
            }

            if (!isInMoreMenu && item.type === "megaMenu") {
                closeTimeoutRef.current = setTimeout(() => {
                    setActiveMenu(null);
                }, 200); // 200ms delay to allow movement to mega menu
            }
        };

        return (
            <div
                key={item.label}
                className="relative overflow-visible"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {isMegaMenu ? (
                    <button
                        type="button"
                        className={`relative group tracking-[0.5px] font-normal transition-colors whitespace-nowrap text-xs md:text-sm capitalize cursor-pointer ${
                            activeMenu === item.megaMenuId
                                ? "text-[#0066cc]"
                                : "text-[#4A4A4A]"
                        }`}
                    >
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0066cc] group-hover:w-full group-hover:transition-all transition-all"></span>
                        <div className="flex items-center justify-between gap-1.5 md:gap-2">
                            {item.label}
                            {item.hasDropdown && (
                                <ChevronDown
                                    className={`h-3 w-3 flex-shrink-0 transition-all duration-300 ${
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
                        className={`relative group tracking-[0.5px] font-normal transition-colors whitespace-nowrap text-xs md:text-sm capitalize ${
                            activeMenu === item.megaMenuId
                                ? "text-[#0066cc]"
                                : "text-[#4A4A4A]"
                        }`}
                    >
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0066cc] group-hover:w-full group-hover:transition-all transition-all"></span>
                        <div className="flex items-center justify-between gap-1.5 md:gap-2">
                            {item.label}
                            {item.hasDropdown && (
                                <ChevronDown
                                    className={`h-3 w-3 flex-shrink-0 transition-all duration-300 ${
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
                    <div
                        className="absolute top-full left-0 pt-3 -mt-1"
                        onMouseEnter={() => {
                            // Clear timeout and keep menu open
                            if (closeTimeoutRef.current) {
                                clearTimeout(closeTimeoutRef.current);
                                closeTimeoutRef.current = null;
                            }
                            setActiveMenu(item.megaMenuId || null);
                        }}
                        onMouseLeave={() => {
                            // Delay closing when leaving mega menu area
                            closeTimeoutRef.current = setTimeout(() => {
                                setActiveMenu(null);
                                if (isInMoreMenu) {
                                    setMoreMenuOpen(false);
                                }
                            }, 150);
                        }}
                    >
                        <MegaMenu
                            menuId={item.megaMenuId!}
                            onClose={() => {
                                if (closeTimeoutRef.current) {
                                    clearTimeout(closeTimeoutRef.current);
                                    closeTimeoutRef.current = null;
                                }
                                setActiveMenu(null);
                                if (isInMoreMenu) {
                                    setMoreMenuOpen(false);
                                }
                            }}
                        />
                    </div>
                )}
            </div>
        );
    };

    return (
        <header className="sticky top-0 z-100 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)] overflow-visible">
            <div className="w-[95%] max-w-full mx-auto px-4 sm:px-6 lg:px-2 pt-4 pb-3 h-full overflow-visible">
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
                            <div className="hidden md:block flex-1 max-w-[250px]">
                                <SearchComponent />
                            </div>
                        )}

                        {/* Medium Screen Navigation (with MORE dropdown) */}
                        <nav className="hidden md:flex lg:hidden items-center space-x-1 sm:space-x-2 overflow-visible flex-1 min-w-0">
                            <div className="flex items-center space-x-1 sm:space-x-2 flex-wrap">
                                {visibleItems.map((item) =>
                                    renderNavItem(item)
                                )}
                            </div>

                            {/* MORE Dropdown */}
                            {moreItems.length > 0 && (
                                <div
                                    className="relative overflow-visible flex-shrink-0"
                                    onMouseEnter={() => {
                                        if (closeTimeoutRef.current) {
                                            clearTimeout(
                                                closeTimeoutRef.current
                                            );
                                            closeTimeoutRef.current = null;
                                        }
                                        setMoreMenuOpen(true);
                                    }}
                                    onMouseLeave={() => {
                                        if (!activeMenu) {
                                            closeTimeoutRef.current =
                                                setTimeout(() => {
                                                    setMoreMenuOpen(false);
                                                }, 200);
                                        }
                                    }}
                                >
                                    <button
                                        className={`relative group tracking-[0.5px] font-normal transition-colors whitespace-nowrap flex items-center gap-1.5 md:gap-2 text-xs md:text-sm capitalize ${
                                            moreMenuOpen
                                                ? "text-[#0066cc]"
                                                : "text-[#4A4A4A]"
                                        }`}
                                    >
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0066cc] group-hover:w-full group-hover:transition-all transition-all"></span>
                                        More
                                        <ChevronDown
                                            className={`h-3 w-3 flex-shrink-0 transition-all duration-300 ${
                                                moreMenuOpen
                                                    ? "rotate-180 text-[#0066cc]"
                                                    : "text-[#4a4a4a]"
                                            }`}
                                        />
                                    </button>

                                    {/* MORE Dropdown Menu */}
                                    {moreMenuOpen && (
                                        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[180px]">
                                            {moreItems.map((item) => (
                                                <div
                                                    key={item.label}
                                                    className="relative"
                                                    onMouseEnter={() => {
                                                        if (
                                                            closeTimeoutRef.current
                                                        ) {
                                                            clearTimeout(
                                                                closeTimeoutRef.current
                                                            );
                                                            closeTimeoutRef.current =
                                                                null;
                                                        }
                                                        if (
                                                            item.type ===
                                                            "megaMenu"
                                                        ) {
                                                            setActiveMenu(
                                                                item.megaMenuId ||
                                                                    null
                                                            );
                                                        }
                                                    }}
                                                    onMouseLeave={() => {
                                                        if (
                                                            activeMenu !==
                                                            item.megaMenuId
                                                        ) {
                                                            closeTimeoutRef.current =
                                                                setTimeout(
                                                                    () => {
                                                                        setActiveMenu(
                                                                            null
                                                                        );
                                                                    },
                                                                    200
                                                                );
                                                        }
                                                    }}
                                                >
                                                    {item.type === "megaMenu" &&
                                                    item.hasDropdown ? (
                                                        <button
                                                            type="button"
                                                            className={`block w-full text-left px-4 py-2 text-sm tracking-[0.5px] transition-colors capitalize ${
                                                                activeMenu ===
                                                                item.megaMenuId
                                                                    ? "text-[#0066cc] bg-[#F0F7FF]"
                                                                    : "text-[#4A4A4A] hover:bg-gray-50"
                                                            }`}
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                {item.label}
                                                                {item.hasDropdown && (
                                                                    <ChevronDown
                                                                        className={`h-3 w-3 transition-all duration-300 ${
                                                                            activeMenu ===
                                                                            item.megaMenuId
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
                                                            className={`block px-4 py-2 text-sm tracking-[0.5px] transition-colors capitalize ${
                                                                activeMenu ===
                                                                item.megaMenuId
                                                                    ? "text-[#0066cc] bg-[#F0F7FF]"
                                                                    : "text-[#4A4A4A] hover:bg-gray-50"
                                                            }`}
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                {item.label}
                                                                {item.hasDropdown && (
                                                                    <ChevronDown
                                                                        className={`h-3 w-3 transition-all duration-300 ${
                                                                            activeMenu ===
                                                                            item.megaMenuId
                                                                                ? "rotate-180 text-[#0066cc]"
                                                                                : "text-[#4a4a4a]"
                                                                        }`}
                                                                    />
                                                                )}
                                                            </div>
                                                        </Link>
                                                    )}
                                                    {item.type === "megaMenu" &&
                                                        activeMenu ===
                                                            item.megaMenuId && (
                                                            <div
                                                                className={`absolute top-0 z-[60] pt-2 -mt-1 ${
                                                                    // Right-align menus (pipeline, tools, settings, contacts) to prevent overflow
                                                                    [
                                                                        "pipeline",
                                                                        "tools",
                                                                        "settings",
                                                                        "contacts",
                                                                    ].includes(
                                                                        item.megaMenuId ||
                                                                            ""
                                                                    )
                                                                        ? item.megaMenuId ===
                                                                          "tools"
                                                                            ? "right-0"
                                                                            : "right-full mr-1"
                                                                        : "left-full ml-1"
                                                                }`}
                                                                onMouseEnter={() => {
                                                                    if (
                                                                        closeTimeoutRef.current
                                                                    ) {
                                                                        clearTimeout(
                                                                            closeTimeoutRef.current
                                                                        );
                                                                        closeTimeoutRef.current =
                                                                            null;
                                                                    }
                                                                    setActiveMenu(
                                                                        item.megaMenuId ||
                                                                            null
                                                                    );
                                                                }}
                                                                onMouseLeave={() => {
                                                                    closeTimeoutRef.current =
                                                                        setTimeout(
                                                                            () => {
                                                                                setActiveMenu(
                                                                                    null
                                                                                );
                                                                                setMoreMenuOpen(
                                                                                    false
                                                                                );
                                                                            },
                                                                            150
                                                                        );
                                                                }}
                                                            >
                                                                <MegaMenu
                                                                    menuId={
                                                                        item.megaMenuId!
                                                                    }
                                                                    onClose={() => {
                                                                        if (
                                                                            closeTimeoutRef.current
                                                                        ) {
                                                                            clearTimeout(
                                                                                closeTimeoutRef.current
                                                                            );
                                                                            closeTimeoutRef.current =
                                                                                null;
                                                                        }
                                                                        setActiveMenu(
                                                                            null
                                                                        );
                                                                        setMoreMenuOpen(
                                                                            false
                                                                        );
                                                                    }}
                                                                />
                                                            </div>
                                                        )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </nav>

                        {/* Large Screen Navigation (first 8 items) */}
                        <nav className="hidden lg:flex items-center space-x-2 xl:space-x-3 overflow-visible flex-1 min-w-0 flex-wrap">
                            {mainNavItems.map((item) => renderNavItem(item))}
                        </nav>
                    </div>

                    {/* Right Side: Last 3 Menu Items + Login Button */}
                    <div className="flex items-center py-6 lg:py-0 space-x-4">
                        {/* Last 3 Menu Items (with gaps) - visible on md and up */}
                        <nav className="hidden md:flex items-center space-x-2 xl:space-x-3 overflow-visible">
                            {rightNavItems.map((item) => renderNavItem(item))}
                        </nav>

                        {/* CTA Button */}
                        <div className="flex items-center space-x-4">
                            <Button
                                href="/login"
                                className="tracking-[1px] uppercase"
                            >
                                Log in
                            </Button>
                            <Menu
                                color="#4a4a4a"
                                strokeWidth={3}
                                className="cursor-pointer lg:hidden"
                                onClick={() =>
                                    setMobileMenuOpen(!mobileMenuOpen)
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-white border-t">
                    <nav className="px-4 py-4 space-y-2">
                        {/* Mobile Search - Only show on properties pages */}
                        {showSearch && (
                            <div className="mb-4">
                                <SearchComponent
                                    onClose={() => setMobileMenuOpen(false)}
                                />
                            </div>
                        )}
                        {navigationItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.link}
                                className="block py-2 text-sm font-medium text-[#333333] hover:text-[#0066CC] capitalize"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href="/login"
                            className="block mt-4 bg-[#0066CC] text-white px-5 py-2.5 rounded text-sm font-semibold text-center"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Log In
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
