import { Link } from "@inertiajs/react";
import type { LucideIcon } from "lucide-react";
import {
    BarChart3,
    Bell,
    Bookmark,
    Building,
    Building2,
    Calendar,
    ChartBar,
    ClipboardCheck,
    ClipboardList,
    Clock,
    CreditCard,
    DollarSign,
    FileCheck,
    FileText,
    Grid3X3,
    Home,
    Link as LinkIcon,
    Lock,
    Map,
    MapPin,
    Megaphone,
    MessageCircle,
    Navigation,
    PlusCircle,
    Send,
    SlidersHorizontal,
    Store,
    Table,
    Users,
    Calculator,
    KeyRound as Key,
    Bot,
} from "lucide-react";

interface MenuItem {
    label: string;
    link: string;
    icon?: LucideIcon;
    description?: string;
    featured?: boolean;
    badge?: string;
}

type SectionType =
    | "link-list"
    | "featured-card"
    | "quick-stats"
    | "market-preview";

interface MenuSection {
    title?: string;
    type: SectionType;
    items?: MenuItem[];
    fullWidth?: boolean;
    backgroundColor?: string;
    description?: string;
    stats?: { label: string; value: string; icon?: LucideIcon }[];
    metrics?: string[];
    cta?: {
        text: string;
        link: string;
    };
}

interface Menu {
    id: string;
    title: string;
    layout: "single-column" | "two-column" | "three-column" | "four-column";
    width: string;
    description?: string;
    sections: MenuSection[];
}

interface MegaMenuProps {
    menuId: string;
    onClose: () => void;
    isRightAligned?: boolean;
}

const menus: Record<string, Menu> = {
    comps: {
        id: "comps",
        title: "Comparables",
        layout: "single-column",
        width: "400px",
        sections: [
            {
                type: "link-list",
                items: [
                    {
                        label: "Commercial Sales Comparables",
                        link: "/comps/commercial-sales",
                        icon: Building2,
                        description: "View commercial property sales data",
                    },
                    {
                        label: "Commercial Lease Comparables",
                        link: "/comps/commercial-lease",
                        icon: FileText,
                        description: "Commercial lease comparables",
                    },
                    {
                        label: "Residential Sales Comparables",
                        link: "/comps/residential-sales",
                        icon: Home,
                        description: "Residential property sales",
                    },
                    {
                        label: "Residential Lease Comparables",
                        link: "/comps/residential-lease",
                        icon: Key,
                        description: "Residential rental comparables",
                    },
                    {
                        label: "All Comparables",
                        link: "/comps/all",
                        icon: BarChart3,
                        featured: true,
                        description: "View all comparable data",
                    },
                ],
            },
        ],
    },
    forSale: {
        id: "forSale",
        title: "Properties For Sale",
        layout: "two-column",
        width: "680px",
        sections: [
            {
                title: "Commercial",
                type: "link-list",
                items: [
                    {
                        label: "Commercial For Sale",
                        link: "/properties?type=for-sale&category=commercial",
                        icon: Building2,
                    },
                    {
                        label: "Commercial Auctions",
                        link: "/properties?type=for-sale&category=commercial&status=auctions",
                        icon: Megaphone,
                    },
                    {
                        label: "Off-Market Commercial",
                        link: "/properties?type=for-sale&category=commercial&listing_type=off-market",
                        icon: Lock,
                    },
                    {
                        label: "All Commercial For Sale",
                        link: "/properties?type=for-sale&category=all-commercial",
                        icon: Grid3X3,
                        featured: true,
                    },
                ],
            },
            {
                title: "Residential",
                type: "link-list",
                items: [
                    {
                        label: "Residential For Sale",
                        link: "/properties?type=for-sale&category=residential",
                        icon: Home,
                    },
                    {
                        label: "Residential Auctions",
                        link: "/properties?type=for-sale&category=residential&status=auctions",
                        icon: Megaphone,
                    },
                    {
                        label: "Off-Market Residential",
                        link: "/properties?type=for-sale&category=residential&listing_type=off-market",
                        icon: Lock,
                    },
                    {
                        label: "All Residential For Sale",
                        link: "/properties?type=for-sale&category=all-residential",
                        icon: Grid3X3,
                        featured: true,
                    },
                ],
            },
        ],
    },
    forLease: {
        id: "forLease",
        title: "Properties For Lease",
        layout: "single-column",
        width: "300px",
        sections: [
            {
                type: "link-list",
                items: [
                    {
                        label: "Commercial Lease",
                        link: "/properties?type=for-lease&category=commercial",
                        icon: Building,
                        description: "Office, retail, industrial spaces",
                    },
                    {
                        label: "Residential Lease",
                        link: "/properties?type=for-lease&category=residential",
                        icon: Home,
                        description: "Apartments and houses for rent",
                    },
                    {
                        label: "All For Lease",
                        link: "/properties?type=for-lease",
                        icon: Grid3X3,
                        featured: true,
                        description: "View all available leases",
                    },
                ],
            },
        ],
    },
    scout: {
        id: "scout",
        title: "Scout System",
        layout: "two-column",
        width: "700px",
        description: "Tenant analysis and location intelligence",
        sections: [
            {
                title: "Analytics",
                type: "link-list",
                items: [
                    {
                        label: "Owners and Criteria",
                        link: "/scout/owners-criteria",
                        icon: Users,
                        description: "Owners portfolio and requirements",
                    },
                    {
                        label: "Tenant and Criteria",
                        link: "/scout/tenant-criteria",
                        icon: ClipboardCheck,
                        description:
                            "Tenant portfolio, requirements and ratings",
                    },
                ],
            },
            {
                title: "Location Tools",
                type: "link-list",
                items: [
                    {
                        label: "Location Rankings",
                        link: "/scout/location-rankings",
                        icon: Map,
                        description: "Location reports",
                    },
                    {
                        label: "Scout Map",
                        link: "/scout/scout-map",
                        icon: Navigation,
                        description: "Calculate proximity to location",
                    },
                    {
                        label: "Market Research Map",
                        link: "/scout/scout-intelligence",
                        icon: MapPin,
                        description: "VPD, Population, Income etc.",
                    },
                ],
            },
            {
                type: "featured-card",
                fullWidth: true,
                backgroundColor: "#F0F7FF",
                title: "Scout Intelligence",
                description:
                    "Analyze tenant proximity, ratings, and criteria from any location.",
                cta: {
                    text: "Launch Scout",
                    link: "/scout",
                },
            },
        ],
    },
    dispensaries: {
        id: "dispensaries",
        title: "Dispensary Properties",
        layout: "single-column",
        width: "350px",
        sections: [
            {
                type: "link-list",
                items: [
                    {
                        label: "Dispensaries for Lease",
                        link: "/properties?property_types=Dispensary&type=for-lease",
                        icon: Store,
                        description: "Eligible dispensary for lease",
                    },
                    {
                        label: "Dispensaries for Sale",
                        link: "#",
                        icon: DollarSign,
                        description: "Eligible dispensary for sale",
                    },
                    {
                        label: "All Dispensaries",
                        link: "#",
                        icon: Grid3X3,
                        featured: true,
                        description: "View all available properties",
                    },
                    {
                        label: "OCM Map",
                        link: "#",
                        icon: MapPin,
                        description: "View dispensary-eligible zones",
                    },
                ],
            },
        ],
    },
    zoningChanges: {
        id: "zoningChanges",
        title: "Zoning Changes",
        layout: "single-column",
        width: "460px",
        description:
            "Current and upcoming rezoning areas with property details",
        sections: [
            {
                title: "Zoning Maps",
                type: "link-list",
                items: [
                    {
                        label: "Property & Zoning Map",
                        link: "/zoning-changes/property-map",
                        icon: Map,
                        description: "Search by zoning Code",
                    },
                    {
                        label: "Rezoning Map",
                        link: "/zoning-changes/rezoning-map",
                        icon: MapPin,
                        description: "Current and upcoming rezoning areas",
                    },
                ],
            },
            {
                type: "featured-card",
                fullWidth: true,
                backgroundColor: "#F0F7FF",
                title: "Zoning Intelligence",
                description:
                    "View rezoning areas, click to see addresses and owner details in highlighted zones.",
                cta: {
                    text: "View Zoning Map",
                    link: "/zoning-changes/rezoning-map",
                },
            },
        ],
    },
    contacts: {
        id: "contacts",
        title: "Contact Directory",
        layout: "single-column",
        width: "300px",
        sections: [
            {
                type: "link-list",
                items: [
                    {
                        label: "Owners",
                        link: "/contacts/owners/companies",
                        icon: Bookmark,
                        description: "Property owner database",
                    },
                    {
                        label: "Tenants",
                        link: "/contacts/tenants",
                        icon: Users,
                        description: "Tenant companies and locations",
                    },
                    {
                        label: "Brokers",
                        link: "/contacts/brokers",
                        icon: MessageCircle,
                        description: "Real estate broker contacts",
                    },
                    {
                        label: "All Contacts",
                        link: "/contacts/all",
                        icon: Grid3X3,
                        featured: true,
                        description: "View complete directory",
                    },
                ],
            },
        ],
    },
    pipeline: {
        id: "pipeline",
        title: "Pipeline",
        layout: "two-column",
        width: "700px",
        sections: [
            {
                title: "Properties Pipeline",
                type: "link-list",
                items: [
                    {
                        label: "Saved Properties",
                        link: "/underwriting/saved",
                        icon: Bookmark,
                        description: "Your saved properties",
                    },
                    {
                        label: "Underwrote Properties",
                        link: "/underwriting/completed",
                        icon: FileCheck,
                        description: "Completed analyses",
                    },
                    {
                        label: "Submitted Deals",
                        link: "/underwriting/submitted",
                        icon: Send,
                        description: "Broker-submitted opportunities",
                    },
                ],
            },
            {
                title: "Tools",
                type: "link-list",
                items: [
                    {
                        label: "Underwriting",
                        link: "/underwriting/sheets",
                        icon: Table,
                        description: "Underwriting templates by asset class",
                    },
                    {
                        label: "New Analysis",
                        link: "/underwriting/new-manual",
                        icon: PlusCircle,
                        featured: true,
                        description: "Start new underwriting",
                    },
                    {
                        label: "New AI Analysis",
                        link: "/underwriting/new-ai",
                        icon: Bot,
                        description: "Start new AI underwriting",
                    },
                ],
            },
            {
                type: "quick-stats",
                fullWidth: true,
                backgroundColor: "#F0F7FF",
                stats: [
                    { label: "Saved", value: "12", icon: Bookmark },
                    { label: "Analyzed", value: "8", icon: ChartBar },
                    { label: "Pending", value: "3", icon: Clock },
                ],
            },
        ],
    },
    tools: {
        id: "tools",
        title: "Investment Tools",
        layout: "four-column",
        width: "900px",
        sections: [
            {
                title: "Calculators",
                type: "link-list",
                items: [
                    {
                        label: "Mortgage Calculator",
                        link: "/tools/mortgage-calculator",
                        icon: Calculator,
                    },
                    {
                        label: "Cost Seg Calculator",
                        link: "/tools/cost-seg",
                        icon: DollarSign,
                    },
                ],
            },
            {
                title: "Research",
                type: "link-list",
                items: [
                    {
                        label: "Zoning Codes",
                        link: "/tools/zoning-codes",
                        icon: MapPin,
                    },
                ],
            },
            {
                title: "Tools",
                type: "link-list",
                items: [
                    {
                        label: "To-Do List",
                        link: "/tools/todo",
                        icon: ClipboardList,
                    },
                    {
                        label: "Calendar",
                        link: "/tools/calendar",
                        icon: Calendar,
                    },
                    {
                        label: "chatgpt-assistant",
                        link: "/tools/chatgpt-assistant",
                        icon: Bot,
                        badge: "AI",
                        description: "Chat with our AI assistant",
                    },
                    {
                        label: "Send Proof of Funds",
                        link: "/tools/chatgpt-assistant",
                        icon: Send,
                    },
                    {
                        label: "Send LOI",
                        link: "/tools/chatgpt-assistant",
                        icon: MessageCircle,
                    },
                ],
            },
            {
                title: "Links",
                type: "link-list",
                items: [
                    {
                        label: "Quick Links",
                        link: "/links/quick-links",
                        icon: LinkIcon,
                    },
                ],
            },
        ],
    },
    settings: {
        id: "settings",
        title: "Settings",
        layout: "single-column",
        width: "300px",
        sections: [
            {
                type: "link-list",
                items: [
                    {
                        label: "Buy Box Criteria",
                        link: "/settings/buy-box",
                        icon: SlidersHorizontal,
                        description: "Set investment parameters",
                    },
                    {
                        label: "Email Notifications",
                        link: "/settings/notifications",
                        icon: Bell,
                        description: "Manage alert preferences",
                    },
                    {
                        label: "Account Settings",
                        link: "/settings/account",
                        icon: Users,
                        description: "Profile and preferences",
                    },
                    {
                        label: "Subscription",
                        link: "/settings/subscription",
                        icon: CreditCard,
                        description: "Manage your plan",
                    },
                ],
            },
        ],
    },
};

const menuAliases: Record<string, keyof typeof menus> = {
    auctions: "forSale",
    listings: "forLease",
};

const layoutClasses: Record<Menu["layout"], string> = {
    "single-column": "grid-cols-1",
    "two-column": "md:grid-cols-2",
    "three-column": "md:grid-cols-3",
    "four-column": "md:grid-cols-4",
};

export default function MegaMenu({
    menuId,
    onClose,
    isRightAligned = false,
}: MegaMenuProps) {
    const menu =
        menus[menuId] ?? menus[menuAliases[menuId as keyof typeof menuAliases]];
    if (!menu) return null;

    // Determine which menus should be right-aligned to prevent overflow
    const rightAlignMenus = [
        "contacts",
        "tools",
        "settings",
        "underwriting",
        "pipeline",
    ];
    const shouldRightAlign = isRightAligned || rightAlignMenus.includes(menuId);

    // Calculate max width based on viewport to prevent overflow
    // Leave padding on both sides (2rem = 32px on each side)
    // For very wide menus like tools, ensure they don't exceed viewport
    const menuWidth = parseInt(menu.width);
    const viewportPadding = 64; // 2rem on each side
    const maxWidthValue =
        typeof window !== "undefined"
            ? Math.min(menuWidth, window.innerWidth - viewportPadding)
            : menuWidth;
    const maxWidth =
        typeof window !== "undefined"
            ? `${maxWidthValue}px`
            : `min(${menu.width}, calc(100vw - 4rem))`;

    // For right-aligned menus, ensure they don't overflow left
    // Calculate proper positioning to prevent left overflow
    const positioningStyle: Record<string, string | number> = {};

    if (shouldRightAlign && typeof window !== "undefined") {
        // For right-aligned menus, ensure they align to the right edge
        // and don't overflow beyond viewport
        const availableWidth = window.innerWidth - viewportPadding;
        const finalWidth = Math.min(menuWidth, availableWidth);

        positioningStyle.right = 0;
        positioningStyle.maxWidth = `${availableWidth}px`;

        // If menu is wider than available space, constrain it
        if (menuWidth > availableWidth) {
            positioningStyle.width = `${finalWidth}px`;
        }

        // Ensure minimum left margin to prevent overflow
        positioningStyle.minWidth = "280px";
    }

    return (
        <div
            className={`relative bg-white rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.15)] border border-[#E6EAF0] overflow-visible ${
                shouldRightAlign ? "right-0" : "left-0"
            }`}
            style={{
                width: menu.width,
                maxWidth: maxWidth,
                minWidth: "280px",
                animation: "fadeInDown 0.2s ease-out",
                ...positioningStyle,
            }}
            onMouseEnter={() => {
                // Keep menu open when hovering over it - parent handles this
            }}
            onMouseLeave={onClose}
        >
            {/* Message bubble pointer/arrow */}
            <div
                className={`absolute -top-2.5 w-5 h-5 bg-white border-l border-t border-[#E6EAF0] transform rotate-45 z-10 ${
                    shouldRightAlign ? "right-8" : "left-8"
                }`}
                style={{
                    boxShadow: "-2px -2px 6px rgba(0,0,0,0.08)",
                }}
            />

            {/* Header Section */}
            {(menu.title || menu.description) && (
                <div
                    className={`border-b border-[#E6EAF0] bg-gradient-to-b from-[#FAFBFC] to-white ${
                        menuId === "tools"
                            ? "px-5 py-4"
                            : "px-6 py-5 md:px-8 md:py-6"
                    }`}
                >
                    {menu.title && (
                        <h2
                            className={`font-semibold text-[#0F2343] tracking-wide uppercase ${
                                menuId === "tools"
                                    ? "text-sm mb-1"
                                    : "text-base mb-2"
                            }`}
                        >
                            {menu.title}
                        </h2>
                    )}
                    {menu.description && (
                        <p
                            className={`text-[#666666] leading-relaxed ${
                                menuId === "tools" ? "text-xs" : "text-sm"
                            }`}
                        >
                            {menu.description}
                        </p>
                    )}
                </div>
            )}

            {/* Menu Content Section */}
            <div
                className={`overflow-hidden rounded-b-xl ${
                    menuId === "tools" ? "p-5" : "p-6 md:p-8"
                }`}
            >
                <div
                    className={`grid gap-6 md:gap-8 ${
                        layoutClasses[menu.layout] ?? "grid-cols-1"
                    } ${menuId === "tools" ? "gap-4 md:gap-5" : ""}`}
                >
                    {menu.sections.map((section, idx) => (
                        <div
                            key={`${menu.id}-section-${idx}`}
                            className={`space-y-4 ${
                                section.fullWidth ? "md:col-span-full" : ""
                            } ${menuId === "tools" ? "space-y-2" : ""}`}
                        >
                            {section.title && (
                                <h3
                                    className={`font-semibold text-[#666666] uppercase tracking-[1.5px] mb-3 ${
                                        menuId === "tools"
                                            ? "text-[10px] mb-2"
                                            : "text-xs"
                                    }`}
                                >
                                    {section.title}
                                </h3>
                            )}
                            {section.type === "link-list" &&
                                section.items &&
                                renderLinkList(section.items, menuId)}
                            {section.type === "featured-card" &&
                                renderFeaturedCard(section)}
                            {section.type === "quick-stats" &&
                                renderQuickStats(section)}
                            {section.type === "market-preview" &&
                                renderMarketPreview(section)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function renderLinkList(items: MenuItem[], menuId?: string) {
    const isToolsMenu = menuId === "tools";
    return (
        <ul className={`space-y-1 ${isToolsMenu ? "space-y-0.5" : ""}`}>
            {items.map((item) => {
                const Icon = item.icon;
                return (
                    <li key={item.label}>
                        <Link
                            href={item.link}
                            className={`flex items-start gap-3 rounded-lg transition-all duration-200 group ${
                                isToolsMenu ? "p-2" : "p-3"
                            } ${
                                item.featured
                                    ? "bg-[#0066CC] text-white hover:bg-[#0052A3] shadow-sm hover:shadow-md"
                                    : "hover:bg-[#F0F7FF] hover:shadow-sm"
                            }`}
                        >
                            <span
                                className={`flex items-center justify-center rounded-lg flex-shrink-0 transition-colors ${
                                    isToolsMenu ? "h-7 w-7" : "h-9 w-9"
                                } ${
                                    item.featured
                                        ? "bg-white/20 text-white"
                                        : "bg-[#E9F1FF] text-[#0F6BD0]"
                                }`}
                            >
                                {Icon ? (
                                    <Icon
                                        className={
                                            isToolsMenu
                                                ? "h-3.5 w-3.5"
                                                : "h-4 w-4"
                                        }
                                        strokeWidth={2.5}
                                    />
                                ) : (
                                    <Grid3X3
                                        className={
                                            isToolsMenu
                                                ? "h-3.5 w-3.5"
                                                : "h-4 w-4"
                                        }
                                    />
                                )}
                            </span>
                            <div className="flex-1 min-w-0">
                                <div
                                    className={`flex items-center gap-2 font-semibold tracking-wide uppercase ${
                                        isToolsMenu ? "text-xs" : "text-sm"
                                    }`}
                                >
                                    <span className="truncate">
                                        {item.label}
                                    </span>
                                    {item.badge && (
                                        <span
                                            className={`bg-[#FF6B00] text-white rounded font-semibold flex-shrink-0 ${
                                                isToolsMenu
                                                    ? "text-[9px] px-1 py-0.5"
                                                    : "text-[10px] px-1.5 py-0.5"
                                            }`}
                                        >
                                            {item.badge}
                                        </span>
                                    )}
                                </div>
                                {item.description && (
                                    <p
                                        className={`mt-1.5 leading-relaxed ${
                                            isToolsMenu
                                                ? "text-[10px] mt-1"
                                                : "text-xs"
                                        } ${
                                            item.featured
                                                ? "text-white/90"
                                                : "text-[#666666]"
                                        }`}
                                    >
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}

function renderFeaturedCard(section: MenuSection) {
    return (
        <div
            className="rounded-lg p-5 border border-[#E6EAF0]"
            style={{ backgroundColor: section.backgroundColor || "#F5F7FB" }}
        >
            {section.title && (
                <h4 className="text-sm font-semibold text-[#0F2343] tracking-wide uppercase mb-3">
                    {section.title}
                </h4>
            )}
            {section.description && (
                <p className="text-sm text-[#1F2937] mb-4 leading-relaxed">
                    {section.description}
                </p>
            )}
            {section.cta && (
                <Link
                    href={section.cta.link}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#0F6BD0] hover:text-[#0052A3] hover:underline transition-colors"
                >
                    {section.cta.text} →
                </Link>
            )}
        </div>
    );
}

function renderQuickStats(section: MenuSection) {
    if (!section.stats) return null;
    return (
        <div
            className="rounded-lg p-5 flex gap-6 border border-[#E6EAF0]"
            style={{ backgroundColor: section.backgroundColor || "#F5F7FB" }}
        >
            {section.stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <div key={stat.label} className="flex-1 text-center">
                        {Icon && (
                            <Icon className="mx-auto mb-3 h-5 w-5 text-[#0F6BD0]" />
                        )}
                        <div className="text-2xl font-bold text-[#0F2343] mb-1">
                            {stat.value}
                        </div>
                        <p className="text-xs uppercase tracking-wide text-[#4A4A4A]">
                            {stat.label}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}

function renderMarketPreview(section: MenuSection) {
    if (!section.metrics) return null;
    return (
        <div
            className="rounded-lg p-5 border border-[#E6EAF0]"
            style={{ backgroundColor: section.backgroundColor || "#F5F7FB" }}
        >
            {section.title && (
                <h4 className="text-sm font-semibold text-[#0F2343] tracking-wide uppercase mb-4">
                    {section.title}
                </h4>
            )}
            <div className="flex flex-wrap gap-2 mb-4">
                {section.metrics.map((metric) => (
                    <span
                        key={metric}
                        className="text-xs font-semibold tracking-wide text-[#0F6BD0] bg-white rounded-full px-3 py-1.5 border border-[#E6EAF0]"
                    >
                        {metric}
                    </span>
                ))}
            </div>
            {section.cta && (
                <Link
                    href={section.cta.link}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#0F6BD0] hover:text-[#0052A3] hover:underline transition-colors"
                >
                    {section.cta.text} →
                </Link>
            )}
        </div>
    );
}
