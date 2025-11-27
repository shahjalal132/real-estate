import { Link } from '@inertiajs/react';

interface FooterSection {
    title: string;
    links: string[];
}

export default function Footer() {
    const sections: FooterSection[] = [
        {
            title: 'ABOUT US',
            links: ['Our Story', 'Leadership', 'Careers', 'Press'],
        },
        {
            title: 'SUPPORT',
            links: ['Help Center', 'Contact Us', 'FAQs', 'Terms of Service'],
        },
        {
            title: 'MARKETPLACE',
            links: ['Buy', 'Sell', 'Auctions', 'Listings'],
        },
        {
            title: 'RESOURCES',
            links: ['Blog', 'Market Insights', 'Education', 'Tools'],
        },
    ];

    const socialPlatforms: string[] = ['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'YouTube', 'TikTok'];

    return (
        <footer className="bg-[#F5F5F5] py-12">
            <div className="w-[95%] max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
                    {/* Logo */}
                    <div>
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <span className="text-2xl font-bold text-[#0066CC]">R</span>
                            <span className="text-xl font-semibold text-[#333333]">MARKETPLACE</span>
                        </Link>
                        {/* Social Icons */}
                        <div className="flex space-x-4">
                            {socialPlatforms.map((platform, idx) => (
                                <a
                                    key={idx}
                                    href="#"
                                    className="text-[#333333] hover:text-[#0066CC] transition-colors"
                                    aria-label={platform}
                                >
                                    <span className="text-sm">{platform.charAt(0)}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Footer Links */}
                    {sections.map((section, idx) => (
                        <div key={idx}>
                            <h3 className="text-sm font-semibold text-[#333333] mb-4 uppercase">{section.title}</h3>
                            <ul className="space-y-2">
                                {section.links.map((link, linkIdx) => (
                                    <li key={linkIdx}>
                                        <Link
                                            href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                                            className="text-sm text-[#666666] hover:text-[#0066CC] transition-colors"
                                        >
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-300 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-[#666666] mb-4 md:mb-0">
                            © 2023 RMP Insights LLC. All Rights Reserved.
                        </p>
                        <div className="flex space-x-6">
                            <Link href="/privacy" className="text-sm text-[#666666] hover:text-[#0066CC]">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-sm text-[#666666] hover:text-[#0066CC]">
                                Terms of Use
                            </Link>
                            <Link href="/accessibility" className="text-sm text-[#666666] hover:text-[#0066CC]">
                                Accessibility
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

