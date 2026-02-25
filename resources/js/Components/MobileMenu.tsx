import { useState } from "react";
import { Link } from "@inertiajs/react";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { menus, menuAliases } from "./MegaMenu";
import SearchComponent from "./SearchComponent";
import { NavigationItem } from "./Header";

function MobileNavItem({
    item,
    onClose,
}: {
    item: NavigationItem;
    onClose: () => void;
}) {
    const [expanded, setExpanded] = useState(false);

    const isMegaMenu =
        item.type === "megaMenu" && item.hasDropdown && item.megaMenuId;
    const menuData = isMegaMenu
        ? (menus[item.megaMenuId!] ?? menus[menuAliases[item.megaMenuId!]])
        : null;

    if (!isMegaMenu || !menuData) {
        return (
            <Link
                href={item.link}
                className="block py-3 px-4 text-[15px] font-medium text-[#1F2937] hover:bg-[#F0F7FF] hover:text-[#0066CC] rounded-xl transition-colors capitalize"
                onClick={onClose}
            >
                {item.label}
            </Link>
        );
    }

    return (
        <div className="rounded-xl overflow-hidden border border-transparent hover:border-gray-100 mb-1">
            <button
                onClick={() => setExpanded(!expanded)}
                className={`w-full flex items-center justify-between py-3 px-4 text-[15px] font-medium transition-colors ${
                    expanded
                        ? "bg-[#F0F7FF] text-[#0066CC] rounded-t-xl"
                        : "text-[#1F2937] hover:bg-gray-50 bg-white rounded-xl"
                }`}
            >
                <span className="capitalize"> {item.label} </span>
                <ChevronDown
                    className={`h-5 w-5 transition-transform duration-300 ${
                        expanded ? "rotate-180 text-[#0066CC]" : "text-gray-400"
                    }`}
                />
            </button>

            <div
                className={`grid transition-all duration-300 ease-in-out ${
                    expanded
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="overflow-hidden bg-gray-50/50 rounded-b-xl">
                    <div className="py-2 px-3 space-y-4">
                        {menuData.sections.map((section, idx) => (
                            <div key={`mob-sec-${idx}`} className="space-y-2">
                                {section.title && (
                                    <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider px-2 pt-2">
                                        {section.title}
                                    </h4>
                                )}

                                {section.type === "link-list" &&
                                    section.items && (
                                        <ul className="space-y-1">
                                            {section.items.map((subItem) => {
                                                const Icon = subItem.icon;
                                                return (
                                                    <li key={subItem.label}>
                                                        <Link
                                                            href={subItem.link}
                                                            onClick={onClose}
                                                            className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors ${
                                                                subItem.featured
                                                                    ? "bg-white border border-blue-100 shadow-sm"
                                                                    : "hover:bg-white hover:shadow-sm"
                                                            }`}
                                                        >
                                                            {Icon && (
                                                                <div
                                                                    className={`mt-0.5 rounded-lg p-1.5 flex-shrink-0 ${
                                                                        subItem.featured
                                                                            ? "bg-blue-50 text-[#0066CC]"
                                                                            : "bg-gray-100 text-gray-500"
                                                                    }`}
                                                                >
                                                                    <Icon className="w-4 h-4" />
                                                                </div>
                                                            )}
                                                            <div>
                                                                <div
                                                                    className={`text-sm font-semibold capitalize ${subItem.featured ? "text-[#0066CC]" : "text-gray-700"}`}
                                                                >
                                                                    {
                                                                        subItem.label
                                                                    }
                                                                </div>
                                                                {subItem.description && (
                                                                    <div className="text-xs text-gray-500 mt-0.5 line-clamp-1 leading-relaxed">
                                                                        {
                                                                            subItem.description
                                                                        }
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}

                                {section.type === "featured-card" &&
                                    section.cta && (
                                        <Link
                                            href={section.cta.link}
                                            onClick={onClose}
                                            className="block mx-2 p-4 rounded-xl bg-gradient-to-br from-[#EBF4FF] to-white border border-blue-100 shadow-sm"
                                        >
                                            <div className="text-sm font-bold mb-1.5 text-[#0F2343]">
                                                {" "}
                                                {section.title ||
                                                    section.cta.text}{" "}
                                            </div>
                                            {section.description && (
                                                <div className="text-xs text-gray-600 mb-3 leading-relaxed">
                                                    {" "}
                                                    {section.description}{" "}
                                                </div>
                                            )}
                                            <div className="text-[13px] font-semibold flex items-center gap-1 text-[#0066CC]">
                                                {section.cta.text}{" "}
                                                <ChevronRight className="w-4 h-4" />
                                            </div>
                                        </Link>
                                    )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function MobileMenu({
    isOpen,
    onClose,
    showSearch,
    navigationItems,
    auth,
}: {
    isOpen: boolean;
    onClose: () => void;
    showSearch: boolean;
    navigationItems: NavigationItem[];
    auth: any;
}) {
    return (
        <>
            {/* Menu overlay (mobile + tablet: below xl) */}
            <div
                className={`xl:hidden fixed inset-0 z-[105] bg-black/40 backdrop-blur-sm transition-all duration-300 ${
                    isOpen
                        ? "opacity-100 visible"
                        : "opacity-0 invisible pointer-events-none"
                }`}
                onClick={onClose}
            />

            {/* Menu drawer (mobile + tablet: below xl) */}
            <div
                className={`xl:hidden fixed top-0 right-0 h-[100dvh] w-[85%] sm:w-[380px] bg-white z-[110] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-10 flex-shrink-0">
                    <img
                        src="/assets/images/logo-updated.png"
                        alt="TENANTS HQ"
                        className="h-6 w-auto object-contain"
                    />
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 text-gray-500 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center outline-none focus:ring-2 focus:ring-[#0066CC]/50"
                        aria-label="Close menu"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Drawer Content */}
                <div className="flex-1 overflow-y-auto py-5 px-3">
                    {showSearch && (
                        <div className="mb-6 px-2">
                            <SearchComponent onClose={onClose} />
                        </div>
                    )}

                    <nav className="space-y-1">
                        {navigationItems.map((item) => (
                            <MobileNavItem
                                key={item.label}
                                item={item}
                                onClose={onClose}
                            />
                        ))}
                    </nav>
                </div>

                {/* Drawer Footer */}
                <div className="p-5 border-t border-gray-100 bg-gray-50/80 mt-auto sticky bottom-0 z-10 flex-shrink-0">
                    {auth.user ? (
                        <Link
                            href={
                                auth.user.user_type === "admin"
                                    ? "/admin/dashboard"
                                    : "/dashboard"
                            }
                            className="block w-full bg-[#0066CC] hover:bg-[#0055AA] text-white px-5 py-3.5 rounded-xl text-[15px] font-semibold tracking-wide text-center transition-all shadow-sm shadow-blue-500/20 active:scale-[0.98]"
                            onClick={onClose}
                        >
                            Go To Dashboard
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            className="block w-full bg-[#0066CC] hover:bg-[#0055AA] text-white px-5 py-3.5 rounded-xl text-[15px] font-semibold tracking-wide text-center transition-all shadow-sm shadow-blue-500/20 active:scale-[0.98]"
                            onClick={onClose}
                        >
                            Log In
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
}
