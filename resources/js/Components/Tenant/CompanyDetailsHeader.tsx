import { Phone } from "lucide-react";
import { TennentCompany } from "../../types";
import { formatPhone } from "../../utils/formatting";

interface CompanyDetailsHeaderProps {
    company: TennentCompany;
}

export default function CompanyDetailsHeader({ company }: CompanyDetailsHeaderProps) {
    const hqAddress = [company.hq_city, company.hq_state, company.hq_postal_code]
        .filter(Boolean)
        .join(", ");

    return (
        <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{company.tenant_name}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
                {hqAddress && <span>HQ {hqAddress}</span>}
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

