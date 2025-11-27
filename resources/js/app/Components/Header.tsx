import { useState } from "react";
import { Link } from "@inertiajs/react";
import MegaMenu from "./MegaMenu";
import { Info, Menu, MessageCircleQuestionMark } from "lucide-react";

interface NavigationItem {
    label: string;
    link: string;
    type: "megaMenu" | "page";
    megaMenuId?: string;
}

export default function Header() {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    const navigationItems: NavigationItem[] = [
        {
            label: "AUCTIONS",
            link: "/auctions",
            type: "megaMenu",
            megaMenuId: "auctions",
        },
        {
            label: "LISTINGS",
            link: "/listings",
            type: "megaMenu",
            megaMenuId: "listings",
        },
        { label: "INSIGHTS", link: "/insights", type: "page" },
        { label: "SELL WITH US", link: "/sell-with-us", type: "page" },
        { label: "BROKERS", link: "/brokers", type: "page" },
        { label: "BUYERS", link: "/buyers", type: "page" },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
            <div className="w-[95%] max-w-full mx-auto px-4 sm:px-6 lg:px-2 lg:py-6 h-full">
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center space-x-5">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2">
                            <img
                                src="/assets/images/logo.png"
                                alt="R Marketplace"
                                className="h-10 w-auto object-contain"
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-7">
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
                                        className="text-[#4A4A4A] tracking-[1px] font-normal"
                                    >
                                        <div className="flex items-center justify-between gap-2">
                                            {item.label}

                                            {/* TODO: conditionally show if has dropdown menu */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                height="0.75em"
                                                viewBox="0 0 512 512"
                                                id="header-fa-icon"
                                                color="#4a4a4a"
                                            >
                                                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
                                            </svg>
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
                    <div className="hidden lg:flex items-center space-x-7 justify-between">
                        <Link
                            href="/login"
                            className="bg-[#0f6bd0] hover:bg-[#3787DE] text-white tracking-[1px] font-normal uppercase rounded-xs px-4 py-2"
                        >
                            Log in / Sign Up
                        </Link>
                        <MessageCircleQuestionMark
                            color="#4a4a4a"
                            strokeWidth={2.5}
                            className="cursor-pointer"
                        />
                        <Menu
                            color="#4a4a4a"
                            strokeWidth={3}
                            className="cursor-pointer"
                        />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-gray-600"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    ></button>
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
                            LOG IN / SIGN UP
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
