import { Link } from "@inertiajs/react";
import { type ReactNode } from "react";

interface FooterLinkGroup {
    title: string;
    links: { label: string; href: string }[];
}

interface SocialLink {
    label: string;
    href: string;
    icon: ReactNode;
}

const socialLinks: SocialLink[] = [
    {
        label: "Facebook",
        href: "#",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
                className="h-4 w-4"
            >
                <path d="M15 8h3V4h-3c-2.8 0-5 2.2-5 5v3H7v4h3v8h4v-8h3l1-4h-4V9c0-.6.4-1 1-1z" />
            </svg>
        ),
    },
    {
        label: "X",
        href: "#",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
                className="h-4 w-4"
            >
                <path d="m4 4 6.9 8.1L4.3 20h3.4l4.7-5.8 4.7 5.8H20l-6.9-8 6.5-7.9h-3.4l-4.3 5.2L7.7 4z" />
            </svg>
        ),
    },
    {
        label: "LinkedIn",
        href: "#",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
                className="h-4 w-4"
            >
                <path d="M6.5 21.5H2.6V8.5h3.9v13zm-2-14.8c-1.3 0-2.3-1.1-2.3-2.4 0-1.4 1-2.4 2.4-2.4s2.3 1 2.3 2.4c0 1.3-1 2.4-2.4 2.4zM22 21.5h-3.8v-6.8c0-1.7-.7-2.8-2.1-2.8-1.1 0-1.8.7-2.1 1.4-.1.3-.1.8-.1 1.2v7h-3.8s.1-11.4 0-12.5H13v2c.5-.8 1.4-2 3.5-2 2.6 0 4.5 1.7 4.5 5.3v7.2z" />
            </svg>
        ),
    },
    {
        label: "Instagram",
        href: "#",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
                className="h-4 w-4"
            >
                <path d="M16.5 3h-9A4.5 4.5 0 0 0 3 7.5v9A4.5 4.5 0 0 0 7.5 21h9a4.5 4.5 0 0 0 4.5-4.5v-9A4.5 4.5 0 0 0 16.5 3zm3 13.5a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3z" />
                <path d="M12 8.5A3.5 3.5 0 1 0 15.5 12 3.5 3.5 0 0 0 12 8.5zm0 5.5a2 2 0 1 1 2-2 2 2 0 0 1-2 2z" />
                <circle cx="16.7" cy="7.3" r="1" />
            </svg>
        ),
    },
    {
        label: "YouTube",
        href: "#",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
                className="h-4 w-4"
            >
                <path d="M22 7.3a2.7 2.7 0 0 0-1.9-1.9C18.4 5 12 5 12 5s-6.4 0-8.1.4A2.7 2.7 0 0 0 2 7.3 28.4 28.4 0 0 0 1.6 12 28.4 28.4 0 0 0 2 16.7a2.7 2.7 0 0 0 1.9 1.9c1.7.4 8.1.4 8.1.4s6.4 0 8.1-.4a2.7 2.7 0 0 0 1.9-1.9 26 26 0 0 0 .4-4.7 26 26 0 0 0-.4-4.7zM10 15V9l5.2 3z" />
            </svg>
        ),
    },
];

const quickLinkGroups: FooterLinkGroup[] = [
    {
        title: "QUICK LINKS",
        links: [
            { label: "Contact Us", href: "/quick-links/contact-us" },
            {
                label: "2025 Auction Calendar",
                href: "/quick-links/2025-auction-calendar",
            },
            { label: "Terms of Use", href: "/quick-links/terms-of-use" },
            {
                label: "Insights Terms of Use",
                href: "/quick-links/insights-terms-of-use",
            },
            { label: "Privacy Terms", href: "/quick-links/privacy-terms" },
            {
                label: "Sale Event Terms & Conditions",
                href: "/quick-links/sale-event-terms-and-conditions",
            },
            {
                label: "Listing Terms & Conditions",
                href: "/quick-links/listing-terms-and-conditions",
            },
            {
                label: "RealINSIGHT Technology",
                href: "/quick-links/realinsight-technology",
            },
        ],
    },
    {
        title: "LEARN MORE",
        links: [
            { label: "Insights", href: "/insights" },
            { label: "Buyers", href: "/learn-more/buyers" },
            { label: "Brokers", href: "/learn-more/brokers" },
            { label: "Sell With Us", href: "/learn-more/sell-with-us" },
            { label: "News", href: "/news" },
            { label: "About Us", href: "/learn-more/about-us" },
            { label: "FAQ", href: "/learn-more/faq" },
        ],
    },
];

const policyLinks = [
    { label: "Privacy Policy", href: "/policies/privacy-policy" },
    { label: "Terms of Use", href: "/policies/terms-of-use" },
    { label: "Accessibility", href: "/policies/accessibility" },
];

export default function Footer({ className = "" }: { className?: string }) {
    return (
        <footer className={`bg-neutral-light-gray pt-10 pb-8 ${className}`}>
            <div className="w-[95%] max-w-full mx-auto px-4 sm:px-6 lg:px-2">
                <div className="grid gap-10 border-b pt-8 border-[#E0E0E0] pb-10 lg:grid-cols-4">
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center">
                            <img
                                src="/assets/images/logo-updated.png"
                                alt="TENANTS HQ"
                                className="h-6 md:h-7 w-auto max-w-[120px] md:max-w-[140px] object-contain"
                            />
                        </Link>
                        <div className="space-y-2 text-sm text-[#4B4B4B]">
                            <p className="font-medium text-[#1B1B1B]">
                                (443) 489-9162
                            </p>
                            <p> info@tenantshq.com</p>
                        </div>
                    </div>

                    <div>
                        <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-[#0166D0] border-b pb-2 border-[#E0E0E0]">
                            FOLLOW US
                        </p>
                        <div className="flex items-center gap-3">
                            {socialLinks.map(({ label, href, icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white bg-white text-[#1B1B1B] shadow-sm transition hover:border-[#0166D0] hover:text-[#0166D0]"
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
                        {quickLinkGroups.slice(0, 1).map((group) => (
                            <div key={group.title}>
                                <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-[#0166D0] border-b pb-2 border-[#E0E0E0]">
                                    {group.title}
                                </p>
                                <ul className="space-y-2 text-sm text-[#4B4B4B]">
                                    {group.links.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className="transition hover:text-[#0166D0]"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
                        {quickLinkGroups.slice(1).map((group) => (
                            <div key={group.title}>
                                <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-[#0166D0] border-b pb-2 border-[#E0E0E0]">
                                    {group.title}
                                </p>
                                <ul className="space-y-2 text-sm text-[#4B4B4B]">
                                    {group.links.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className="transition hover:text-[#0166D0]"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-6 flex flex-col gap-4 text-sm text-[#5C5C5C] md:flex-row md:items-center md:justify-between">
                    <p>© 2025 TENANTS HQ - All Rights Reserved </p>
                    <div className="flex flex-wrap gap-4">
                        {policyLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="transition hover:text-[#0166D0]"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
