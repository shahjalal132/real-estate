import { useState } from 'react';
import { Link } from '@inertiajs/react';
import MegaMenu from './MegaMenu';

interface NavigationItem {
    label: string;
    link: string;
    type: 'megaMenu' | 'page';
    megaMenuId?: string;
}

export default function Header() {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    const navigationItems: NavigationItem[] = [
        { label: 'AUCTIONS', link: '/auctions', type: 'megaMenu', megaMenuId: 'auctions' },
        { label: 'LISTINGS', link: '/listings', type: 'megaMenu', megaMenuId: 'listings' },
        { label: 'INSIGHTS', link: '/insights', type: 'page' },
        { label: 'SELL WITH US', link: '/sell-with-us', type: 'page' },
        { label: 'BROKERS', link: '/brokers', type: 'page' },
        { label: 'BUYERS', link: '/buyers', type: 'page' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)]" style={{ height: '70px' }}>
            <div className="w-[95%] max-w-full mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex items-center justify-between h-full">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <img 
                            src="/assets/images/logo.png" 
                            alt="R Marketplace" 
                            className="h-10 w-auto object-contain"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        {navigationItems.map((item) => (
                            <div
                                key={item.label}
                                className="relative"
                                onMouseEnter={() => item.type === 'megaMenu' && setActiveMenu(item.megaMenuId || null)}
                                onMouseLeave={() => setActiveMenu(null)}
                            >
                                <Link
                                    href={item.link}
                                    className="text-sm font-medium text-[#333333] hover:text-[#0066CC] transition-colors"
                                >
                                    {item.label}
                                </Link>
                                {item.type === 'megaMenu' && activeMenu === item.megaMenuId && (
                                    <MegaMenu menuId={item.megaMenuId!} onClose={() => setActiveMenu(null)} />
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <Link
                            href="/login"
                            className="bg-[#0066CC] text-white px-5 py-2.5 rounded text-sm font-semibold hover:bg-[#004C99] transition-colors"
                        >
                            LOG IN / SIGN UP
                        </Link>
                        <button
                            className="lg:hidden text-gray-600"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-gray-600"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
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

