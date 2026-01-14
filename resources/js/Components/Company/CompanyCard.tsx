import { Building2, Globe, MapPin, Users } from "lucide-react";
import React from "react";

interface CompanyCardProps {
    company: any;
}

const LOGOS = [
    "https://ahprd1cdn.csgpimgs.com/i2/KusPisvc_OVaY0NA5w4ICNRNDWlg5A5Igc5ulHzYZzc/118/contact.jpg",
    "https://ahprd1cdn.csgpimgs.com/i2/jnpzyGwdiz7GxTBX0HNFDWAh2aFQBMMapD4KrbYOqyc/118/contact.png",
    "https://ahprd1cdn.csgpimgs.com/i2/DRQoiAmPk-9bllVvbZ3y65Mceu7DGvKA5KmqsdTiwHw/118/contact.jpg",
];

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
    // Deterministic random logo based on ID
    const logoUrl = LOGOS[company.id % LOGOS.length];

    const formatNumber = (num: number | null | undefined): string => {
        if (num === null || num === undefined) return "—";
        return num.toLocaleString();
    };

    const formatCurrency = (num: number | null | undefined): string => {
        if (num === null || num === undefined) return "—";
        return `$${num.toLocaleString()}`;
    };

    return (
        <div className= "bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full" >
        <div className="flex justify-between items-start mb-4" >
            <div className="flex-1 min-w-0 pr-4" >
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2" title = { company.company } >
                    { company.company || "Unknown Company" }
                    </h3>
                    < div className = "text-sm text-gray-600 mt-1 font-medium" > { company.specialty || "—" } </div>

                        < div className = "flex items-center gap-1.5 text-sm text-gray-500 mt-2" >
                            <MapPin className="h-3.5 w-3.5 shrink-0" />
                                <span className="truncate" >
                                    { [company.hq_city, company.hq_state].filter(Boolean).join(", ") || "—" }
                                    </span>
                                    </div>

    {
        company.website && (
            <div className="flex items-center gap-1.5 text-sm text-blue-600 mt-1" >
                <Globe className="h-3.5 w-3.5 shrink-0" />
                    <a
                                href={
            company.website.startsWith("http")
                ? company.website
                : `https://${company.website}`
        }
        target = "_blank"
        rel = "noreferrer"
        className = "hover:underline truncate block"
            >
            { company.website.replace(/^https?:\/\/(www\.)?/, '') }
            </a>
            </div>
                    )}
</div>
    < div className = "shrink-0" >
        <img
                        src={ logoUrl }
alt = {`${company.company} Logo`}
className = "h-12 w-12 object-contain rounded-full border border-gray-100 bg-gray-50"
    />
    </div>
    </div>

    < div className = "mt-auto pt-4 border-t border-gray-100 space-y-3" >
        <div className="grid grid-cols-2 gap-4" >
            <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide" > Employees </div>
                < div className = "text-sm font-semibold text-gray-900 flex items-center gap-1 mt-0.5" >
                    <Users className="h-3.5 w-3.5 text-gray-400" />
                        { formatNumber(company.employees) }
                        </div>
                        </div>
                        < div >
                        <div className="text-xs text-gray-500 uppercase tracking-wide" > Locations </div>
                            < div className = "text-sm font-semibold text-gray-900 mt-0.5" >
                                { formatNumber(company.locations) }
                                </div>
                                </div>
                                </div>

                                < div className = "grid grid-cols-2 gap-4" >
                                    <div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wide" > Lease Trans(3Y) </div>
                                        < div className = "text-sm font-semibold text-gray-900 mt-0.5" >
                                            { formatNumber(company.lease_transactions_3y) }
                                            </div>
                                            </div>
                                            < div >
                                            <div className="text-xs text-gray-500 uppercase tracking-wide" > Sale Vol(3Y) </div>
                                                < div className = "text-sm font-semibold text-gray-900 mt-0.5" >
                                                    { formatCurrency(company.sale_transactions_volume_3y) }
                                                    </div>
                                                    </div>
                                                    </div>
                                                    </div>
                                                    </div>
    );
};

export default CompanyCard;
