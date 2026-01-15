import { Link } from "@inertiajs/react";
import { Globe, Linkedin, Mail, Phone, User } from "lucide-react";

interface Broker {
    id: number;
    name: string;
    thumbnail_url?: string;
    company: string;
    title: string;
    phone?: string;
    email?: string;
    linkedin?: string;
    website?: string;
    address?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
}

interface Tab {
    id: string;
    label: string;
    href: string;
}

interface BrokerDetailsHeaderProps {
    broker: Broker;
    tabs?: Tab[];
    activeTabId?: string;
}

export default function BrokerDetailsHeader({
    broker,
    tabs = [],
    activeTabId = "summary",
}: BrokerDetailsHeaderProps) {
    return (
        <div className="bg-white">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center p-6">
                <div className="shrink-0">
                    <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-200 border-2 border-white shadow-sm">
                        {broker.thumbnail_url ? (
                            <img
                                src={broker.thumbnail_url}
                                alt={broker.name}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-400">
                                <User className="h-10 w-10" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-1 w-full">
                    <div className="flex justify-between items-start w-full">
                        <div>
                            <div className="text-lg font-semibold text-gray-900">
                                {broker.name}
                            </div>
                            <div className="text-sm text-gray-500">
                                {broker.title} •{" "}
                                <span className="text-blue-600">
                                    {broker.company}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-2 flex flex-col gap-1">
                        {broker.phone && (
                            <a
                                href={`tel:${broker.phone}`}
                                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                            >
                                <Phone className="h-4 w-4" />
                                {broker.phone}
                            </a>
                        )}

                        {broker.email && (
                            <a
                                href={`mailto:${broker.email}`}
                                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                            >
                                <Mail className="h-4 w-4" />
                                {broker.email}
                            </a>
                        )}
                    </div>

                    <div className="flex gap-4 mt-3">
                        {broker.linkedin && (
                            <a
                                href={broker.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-[#0077b5] transition-colors"
                            >
                                <Linkedin className="h-5 w-5" />
                            </a>
                        )}

                        {broker.website && (
                            <a
                                href={broker.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-blue-600 transition-colors"
                            >
                                <Globe className="h-5 w-5" />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Navigation Tabs Section */}
            <div className="bg-gray-50 px-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between mt-4">
                <nav className="flex space-x-1 overflow-x-auto no-scrollbar w-full md:w-auto">
                    {tabs.map((tab) => (
                        <Link
                            key={tab.id}
                            href={tab.href}
                            className={`
                                py-3 px-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors
                                ${
                                    tab.id === activeTabId
                                        ? "border-red-600 text-red-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }
                            `}
                        >
                            {tab.label}
                        </Link>
                    ))}
                </nav>
                <div className="hidden md:block py-3 text-lg font-bold text-gray-800 tracking-wide uppercase">
                    {broker.company}
                </div>
            </div>
        </div>
    );
}
