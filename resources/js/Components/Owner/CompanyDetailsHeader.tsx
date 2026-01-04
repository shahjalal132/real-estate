import { Phone } from "lucide-react";
import { formatPhone } from "../../utils/formatting";

interface OwnerCompany {
    id: number;
    company: string;
    owner_type?: string;
    hq_city?: string;
    hq_state?: string;
    hq_country?: string;
    hq_phone?: string;
}

interface CompanyDetailsHeaderProps {
    company: OwnerCompany;
}

export default function CompanyDetailsHeader({ company }: CompanyDetailsHeaderProps) {
    const hqAddress = [company.hq_city, company.hq_state, company.hq_country]
        .filter(Boolean)
        .join(", ");

    return (
        <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{company.company}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
                {company.owner_type && <span>{company.owner_type}</span>}
                {hqAddress && (
                    <>
                        {company.owner_type && <span>•</span>}
                        <span>HQ {hqAddress}</span>
                    </>
                )}
                {company.hq_phone && (
                    <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {formatPhone(company.hq_phone)}
                        </span>
                    </>
                )}
            </div>
        </div>
    );
}

