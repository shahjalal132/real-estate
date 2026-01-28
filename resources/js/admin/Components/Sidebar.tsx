import { Link, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    Building2,
    Users,
    Settings,
    LogOut,
    ChevronDown,
    ChevronRight,
    Search,
    Hammer,
    Home,
    Briefcase,
    Key,
} from "lucide-react";
import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
    const { url } = usePage();
    const [expandedMenus, setExpandedMenus] = useState<string[]>([
        "properties",
        "contacts",
    ]);

    const toggleMenu = (menuKey: string) => {
        setExpandedMenus((prev) =>
            prev.includes(menuKey)
                ? prev.filter((key) => key !== menuKey)
                : [...prev, menuKey],
        );
    };

    const isActive = (path: string) => url.startsWith(path);

    const navItems = [
        {
            key: "dashboard",
            label: "Dashboard",
            href: "/admin/dashboard",
            icon: LayoutDashboard,
            active: url === "/admin/dashboard",
        },
        {
            key: "properties",
            label: "Properties",
            icon: Building2,
            active: url.startsWith("/properties"),
            subItems: [
                {
                    label: "All Properties",
                    href: "/properties",
                    icon: Building2,
                },
                {
                    label: "Auctions",
                    href: "/properties/auctions",
                    icon: Hammer,
                },
                {
                    label: "Residential",
                    href: "/properties/residential",
                    icon: Home,
                },
                {
                    label: "Commercial",
                    href: "/properties/commercial",
                    icon: Briefcase,
                },
                { label: "Rental", href: "/properties/rental", icon: Key },
            ],
        },
        {
            key: "contacts",
            label: "Contacts",
            icon: Users,
            active: url.startsWith("/contacts"),
            subItems: [
                { label: "Tenant Companies", href: "/contacts/tenants" },
                { label: "Owners", href: "/contacts/owners" },
                { label: "Brokers", href: "/contacts/brokers" },
            ],
        },
        {
            key: "settings",
            label: "Settings",
            icon: Settings,
            href: "/settings/account",
            active: url.startsWith("/settings"),
        },
    ];

    return (
        <aside
            className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out ${isOpen ? "w-64 translate-x-0" : "w-20 -translate-x-full md:translate-x-0"}`}
        >
            <div className="h-16 flex items-center justify-center border-b border-gray-100 px-4">
                <Link
                    href="/"
                    className="flex items-center gap-2 overflow-hidden"
                >
                    <ApplicationLogo className="h-8 w-8 text-indigo-600 fill-current" />
                    <span
                        className={`font-bold text-xl text-gray-800 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 hidden md:block"}`}
                    >
                        Admin
                    </span>
                </Link>
            </div>

            <div className="h-[calc(100vh-4rem)] overflow-y-auto py-4 px-3 space-y-1 scrollbar-thin scrollbar-thumb-gray-200">
                {navItems.map((item) => (
                    <div key={item.key}>
                        {item.subItems ? (
                            <div>
                                <button
                                    onClick={() =>
                                        isOpen
                                            ? toggleMenu(item.key)
                                            : setIsOpen(true)
                                    }
                                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${item.active ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon
                                            className={`h-5 w-5 ${item.active ? "text-indigo-600" : "text-gray-400"}`}
                                        />
                                        <span
                                            className={`transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 hidden md:block"}`}
                                        >
                                            {item.label}
                                        </span>
                                    </div>
                                    {isOpen && (
                                        <ChevronDown
                                            className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${expandedMenus.includes(item.key) ? "rotate-180" : ""}`}
                                        />
                                    )}
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out pl-10 space-y-1 ${isOpen && expandedMenus.includes(item.key) ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"}`}
                                >
                                    {item.subItems.map((subItem) => (
                                        <Link
                                            key={subItem.href}
                                            href={subItem.href}
                                            className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActive(subItem.href) ? "text-indigo-600 bg-indigo-50 font-medium" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}
                                        >
                                            {subItem.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Link
                                href={item.href!}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${item.active ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                            >
                                <item.icon
                                    className={`h-5 w-5 ${item.active ? "text-white" : "text-gray-400"}`}
                                />
                                <span
                                    className={`transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 hidden md:block"}`}
                                >
                                    {item.label}
                                </span>
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </aside>
    );
}
