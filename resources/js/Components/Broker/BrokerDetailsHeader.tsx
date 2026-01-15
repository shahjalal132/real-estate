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
    logo_url?: string; // Added optional logo_url
}

interface Tab {
    id: string;
    label: string;
    href: string;
}

interface BrokerDetailsHeaderProps {
    broker: Broker;
    // Tabs are now handled by CompanyTabs in the layout
}

export default function BrokerDetailsHeader({
    broker,
}: BrokerDetailsHeaderProps) {
    // Static fallback data for development/visualization matching the screenshot
    const companyName = broker.company || "AGWIP Asset Management";
    const hqLocation =
        broker.city && broker.state
            ? `HQ ${broker.city}, ${broker.state}`
            : "HQ Scottsdale, Arizona";
    const logoUrl =
        broker.logo_url ||
        "https://ahprd1cdn.csgpimgs.com/i2/jnpzyGwdiz7GxTBX0HNFDWAh2aFQBMMapD4KrbYOqyc/118/logo.png";

    return (
        <div className="bg-white py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                        {broker.name}
                    </h2>
                    {/* <p className="text-2xl font-bold text-gray-900 tracking-tight">
                        {companyName}
                    </p> */}
                    <p className="text-sm text-gray-500 font-medium tracking-wide">
                        {hqLocation} | {companyName}
                    </p>
                </div>
                <div className="shrink-0">
                    <img
                        src={logoUrl}
                        alt={`${companyName} Logo`}
                        className="h-8 md:h-10 w-auto object-contain"
                    />
                </div>
            </div>
        </div>
    );
}
