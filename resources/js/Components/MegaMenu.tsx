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
                        link: "/for-sale/commercial",
                        icon: Building2,
                    },
                    {
                        label: "Commercial Auctions",
                        link: "/for-sale/commercial-auctions",
                        icon: Megaphone,
                    },
                    {
                        label: "Off-Market Commercial",
                        link: "/for-sale/commercial-off-market",
                        icon: Lock,
                    },
                    {
                        label: "All Commercial For Sale",
                        link: "/for-commercial-sale/all",
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
                        link: "/for-sale/residential",
                        icon: Home,
                    },
                    {
                        label: "Residential Auctions",
                        link: "/for-sale/residential-auctions",
                        icon: Megaphone,
                    },
                    {
                        label: "Off-Market Residential",
                        link: "/for-sale/residential-off-market",
                        icon: Lock,
                    },
                    {
                        label: "All Residential For Sale",
                        link: "/for-residential-sale/all",
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
                        link: "/for-lease/commercial",
                        icon: Building,
                        description: "Office, retail, industrial spaces",
                    },
                    {
                        label: "Residential Lease",
                        link: "/for-lease/residential",
                        icon: Home,
                        description: "Apartments and houses for rent",
                    },
                    {
                        label: "All For Lease",
                        link: "/for-lease/all",
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
                        link: "/dispensaries/lease",
                        icon: Store,
                        description: "Eligible dispensary for lease",
                    },
                    {
                        label: "Dispensaries for Sale",
                        link: "/dispensaries/sale",
                        icon: DollarSign,
                        description: "Eligible dispensary for sale",
                    },
                    {
                        label: "All Dispensaries",
                        link: "/dispensaries/all",
                        icon: Grid3X3,
                        featured: true,
                        description: "View all available properties",
                    },
                    {
                        label: "OCM Map",
                        link: "/dispensaries/ocm-map",
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
                        link: "/contacts/owners",
                        icon: Bookmark,
                        description: "Property owner database",
                    },
                    {
                        label: "Tenants",
                        link: "/contacts/tenants",
                        icon: Users,
                        description: "Tenant directory",
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
        width: "1000px",
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
                        label: "Chatgpt Assistant",
                        link: "/tools/chatgpt-assistant",
                        icon: MessageCircle,
                        badge: "AI",
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

export default function MegaMenu({ menuId, onClose }: MegaMenuProps) {
    const menu =
        menus[menuId] ?? menus[menuAliases[menuId as keyof typeof menuAliases]];
    if (!menu) return null;

    // Determine which menus should be right-aligned to prevent overflow
    const rightAlignMenus = [
        "tools",
        "settings",
        "underwriting",
        "pipeline",
        "contacts",
    ];
    const shouldRightAlign = rightAlignMenus.includes(menuId);

    return (
        <div
            className={`absolute top-full mt-5 bg-white rounded-b-lg shadow-[0_15px_30px_rgba(0,0,0,0.12)] border border-[#E6EAF0] ${
                shouldRightAlign ? "right-0" : "left-0"
            }`}
            style={{
                width: menu.width,
                maxWidth: "calc(100vw - 2rem)", // Prevent overflow beyond viewport
            }}
            onMouseLeave={onClose}
        >
            <div className="p-6">
                {menu.description && (
                    <p className="text-sm text-[#666666] mb-4">
                        {menu.description}
                    </p>
                )}
                <div
                    className={`grid gap-6 ${
                        layoutClasses[menu.layout] ?? "grid-cols-1"
                    }`}
                >
                    {menu.sections.map((section, idx) => (
                        <div
                            key={`${menu.id}-section-${idx}`}
                            className={`space-y-3 ${
                                section.fullWidth ? "md:col-span-full" : ""
                            }`}
                        >
                            {section.title && (
                                <h3 className="text-xs font-semibold text-[#666666] uppercase tracking-[1.5px]">
                                    {section.title}
                                </h3>
                            )}
                            {section.type === "link-list" &&
                                section.items &&
                                renderLinkList(section.items)}
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

function renderLinkList(items: MenuItem[]) {
    return (
        <ul className="space-y-2">
            {items.map((item) => {
                const Icon = item.icon;
                return (
                    <li key={item.label}>
                        <Link
                            href={item.link}
                            className={`flex items-start gap-3 rounded-md p-3 transition-colors ${
                                item.featured
                                    ? "bg-[#0066CC] text-white hover:bg-[#004C99]"
                                    : "hover:bg-[#F0F7FF]"
                            }`}
                        >
                            <span
                                className={`flex h-8 w-8 items-center justify-center rounded-md ${
                                    item.featured
                                        ? "bg-white/20 text-white"
                                        : "bg-[#E9F1FF] text-[#0F6BD0]"
                                }`}
                            >
                                {Icon ? (
                                    <Icon className="h-4 w-4" strokeWidth={2} />
                                ) : (
                                    <Grid3X3 className="h-4 w-4" />
                                )}
                            </span>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
                                    {item.label}
                                    {item.badge && (
                                        <span className="bg-[#FF6B00] text-white text-[10px] px-1.5 py-0.5 rounded font-semibold">
                                            {item.badge}
                                        </span>
                                    )}
                                </div>
                                {item.description && (
                                    <p
                                        className={`text-xs mt-1 ${
                                            item.featured
                                                ? "text-white/80"
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
            className="rounded-lg p-4"
            style={{ backgroundColor: section.backgroundColor || "#F5F7FB" }}
        >
            {section.title && (
                <h4 className="text-sm font-semibold text-[#0F2343] tracking-wide uppercase mb-2">
                    {section.title}
                </h4>
            )}
            {section.description && (
                <p className="text-sm text-[#1F2937] mb-4">
                    {section.description}
                </p>
            )}
            {section.cta && (
                <Link
                    href={section.cta.link}
                    className="inline-flex items-center text-sm font-semibold text-[#0F6BD0] hover:underline"
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
            className="rounded-lg p-4 flex gap-4"
            style={{ backgroundColor: section.backgroundColor || "#F5F7FB" }}
        >
            {section.stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <div key={stat.label} className="flex-1 text-center">
                        {Icon && (
                            <Icon className="mx-auto mb-2 h-5 w-5 text-[#0F6BD0]" />
                        )}
                        <div className="text-2xl font-bold text-[#0F2343]">
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
            className="rounded-lg p-4"
            style={{ backgroundColor: section.backgroundColor || "#F5F7FB" }}
        >
            {section.title && (
                <h4 className="text-sm font-semibold text-[#0F2343] tracking-wide uppercase mb-3">
                    {section.title}
                </h4>
            )}
            <div className="flex flex-wrap gap-2 mb-4">
                {section.metrics.map((metric) => (
                    <span
                        key={metric}
                        className="text-xs font-semibold tracking-wide text-[#0F6BD0] bg-white rounded-full px-3 py-1"
                    >
                        {metric}
                    </span>
                ))}
            </div>
            {section.cta && (
                <Link
                    href={section.cta.link}
                    className="inline-flex items-center text-sm font-semibold text-[#0F6BD0] hover:underline"
                >
                    {section.cta.text} →
                </Link>
            )}
        </div>
    );
}
