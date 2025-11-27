import { Link } from '@inertiajs/react';

interface MenuItem {
    label: string;
    link: string;
    featured?: boolean;
    badge?: string;
}

interface MenuSection {
    title: string;
    items: MenuItem[];
}

interface Menu {
    title: string;
    sections: MenuSection[];
}

interface MegaMenuProps {
    menuId: string;
    onClose: () => void;
}

export default function MegaMenu({ menuId, onClose }: MegaMenuProps) {
    const menus: Record<string, Menu> = {
        auctions: {
            title: 'Auctions',
            sections: [
                {
                    title: 'Auction Types',
                    items: [
                        { label: 'Classic Auctions', link: '/auctions/classic' },
                        { label: 'Absolute Auctions', link: '/auctions/absolute' },
                        { label: 'Custom Auctions', link: '/auctions/custom' },
                    ],
                },
                {
                    title: 'Browse',
                    items: [
                        { label: 'All Auctions', link: '/auctions', featured: true },
                        { label: 'Upcoming Auctions', link: '/auctions/upcoming' },
                        { label: 'Live Auctions', link: '/auctions/live', badge: 'Live' },
                    ],
                },
            ],
        },
        listings: {
            title: 'Listings',
            sections: [
                {
                    title: 'Property Types',
                    items: [
                        { label: 'Commercial Listings', link: '/listings/commercial' },
                        { label: 'Residential Listings', link: '/listings/residential' },
                        { label: 'Land Listings', link: '/listings/land' },
                    ],
                },
                {
                    title: 'View All',
                    items: [
                        { label: 'All Listings', link: '/listings', featured: true },
                        { label: 'Featured Listings', link: '/listings/featured' },
                    ],
                },
            ],
        },
    };

    const menu = menus[menuId];
    if (!menu) return null;

    return (
        <div
            className="absolute left-0 mt-0 bg-white rounded-b-lg shadow-[0_8px_24px_rgba(0,0,0,0.12)] min-w-[280px] max-w-[1200px] p-8"
            style={{ top: '70px' }}
            onMouseLeave={onClose}
        >
            <div className="grid grid-cols-2 gap-8">
                {menu.sections.map((section, idx) => (
                    <div key={idx}>
                        <h3 className="text-xs font-semibold text-[#666666] uppercase tracking-wider mb-3">
                            {section.title}
                        </h3>
                        <ul className="space-y-2">
                            {section.items.map((item, itemIdx) => (
                                <li key={itemIdx}>
                                    <Link
                                        href={item.link}
                                        className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                                            item.featured
                                                ? 'bg-[#0066CC] text-white hover:bg-[#004C99]'
                                                : 'text-[#333333] hover:bg-[#F0F7FF] hover:text-[#0066CC]'
                                        }`}
                                    >
                                        <span className="flex items-center">
                                            {item.label}
                                            {item.badge && (
                                                <span className="ml-2 bg-[#FF6B00] text-white text-[10px] px-1.5 py-0.5 rounded font-semibold">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

