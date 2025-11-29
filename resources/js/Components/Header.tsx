import { useState } from "react";
import { Link } from "@inertiajs/react";
import MegaMenu from "./MegaMenu";
import { Menu } from "lucide-react";
import Button from "./Button";

interface NavigationItem {
    label: string;
    link: string;
    type: "megaMenu" | "page";
    megaMenuId?: string;
    hasDropdown?: boolean;
}

export default function Header() {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    const navigationItems: NavigationItem[] = [
        {
            label: "COMPS",
            link: "/comps",
            type: "megaMenu",
            megaMenuId: "comps",
            hasDropdown: true,
        },
        {
            label: "FOR SALE",
            link: "/for-sale",
            type: "megaMenu",
            megaMenuId: "forSale",
            hasDropdown: true,
        },
        {
            label: "FOR LEASE",
            link: "/for-lease",
            type: "megaMenu",
            megaMenuId: "forLease",
            hasDropdown: true,
        },
        {
            label: "SCOUT",
            link: "/scout",
            type: "megaMenu",
            megaMenuId: "scout",
            hasDropdown: true,
        },
        {
            label: "DISPENSARIES",
            link: "/dispensaries",
            type: "megaMenu",
            megaMenuId: "dispensaries",
            hasDropdown: true,
        },
        {
            label: "ZONING CHANGES",
            link: "/zoning-changes",
            type: "megaMenu",
            megaMenuId: "zoningChanges",
            hasDropdown: true,
        },
        {
            label: "CONTACTS",
            link: "/contacts",
            type: "megaMenu",
            megaMenuId: "contacts",
            hasDropdown: true,
        },
        {
            label: "UNDERWRITING",
            link: "/underwriting",
            type: "megaMenu",
            megaMenuId: "underwriting",
            hasDropdown: true,
        },
        {
            label: "TOOLS",
            link: "/tools",
            type: "megaMenu",
            megaMenuId: "tools",
            hasDropdown: true,
        },
        {
            label: "SETTINGS",
            link: "/settings",
            type: "megaMenu",
            megaMenuId: "settings",
            hasDropdown: true,
        },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
            <div className="w-[95%] max-w-full mx-auto px-4 sm:px-6 lg:px-2 lg:py-3 h-full">
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center space-x-2">
                        {/* Logo for small, medium screen */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 68.76 79.56"
                            width="20"
                            height="23"
                            className="h-10 w-auto object-contain md:hidden"
                        >
                            <defs>
                                <style>.cls-1fill:#002856;</style>
                            </defs>
                            <title>Asset 1</title>
                            <g id="Layer_2" data-name="Layer 2">
                                <g id="Layer_1-2" data-name="Layer 1">
                                    <path
                                        className="cls-1"
                                        d="M0,38.66v40.9H17.5V38.61ZM0,20.11V34.3l17.5,0V20.17ZM17.5,15.8H34.89c8.52,0,13.75,3.87,13.75,11.37v.23c0,6.7-4.88,11.25-13.41,11.25H22V54.11h9.24l17,25.45H68.76L49.32,51.15C59.44,47.4,66.37,39.33,66.37,26.48v-.22c0-7.5-2.38-13.75-6.82-18.19C54.32,2.84,46.48,0,36.37,0H0V15.74"
                                    ></path>
                                </g>
                            </g>
                        </svg>

                        {/* Logo for large screen*/}
                        <Link
                            href="/"
                            className="hidden md:flex items-center space-x-2"
                        >
                            <img
                                src="/assets/images/logo.png"
                                alt="R Marketplace"
                                className="h-10 w-auto object-contain"
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-3">
                            {navigationItems.map((item) => (
                                <div
                                    key={item.label}
                                    className="relative"
                                    onMouseEnter={() =>
                                        item.type === "megaMenu" &&
                                        setActiveMenu(item.megaMenuId || null)
                                    }
                                    onMouseLeave={() => setActiveMenu(null)}
                                >
                                    <Link
                                        href={item.link}
                                        className="header-nav-link text-[#4A4A4A] tracking-[1px] font-normal"
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            {item.label}

                                            {item.hasDropdown && (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    height="0.75em"
                                                    viewBox="0 0 512 512"
                                                    id="header-fa-icon"
                                                    color="#4a4a4a"
                                                >
                                                    <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
                                                </svg>
                                            )}
                                        </div>
                                    </Link>
                                    {item.type === "megaMenu" &&
                                        activeMenu === item.megaMenuId && (
                                            <MegaMenu
                                                menuId={item.megaMenuId!}
                                                onClose={() =>
                                                    setActiveMenu(null)
                                                }
                                            />
                                        )}
                                </div>
                            ))}
                        </nav>
                    </div>

                    {/* CTA Button */}
                    <div className="flex items-center py-6 lg:py-0 space-x-4 justify-between">
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
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        />
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-white border-t">
                    <nav className="px-4 py-4 space-y-2">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.link}
                                className="block py-2 text-sm font-medium text-[#333333] hover:text-[#0066CC]"
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
                            LOG IN
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
