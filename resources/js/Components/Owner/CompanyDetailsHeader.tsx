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

export default function CompanyDetailsHeader({
    company,
}: CompanyDetailsHeaderProps) {
    const hqAddress = [company.hq_city, company.hq_state]
        .filter(Boolean)
        .join(", ");

    return (
        <div className="bg-white  px-4 py-2">
            <div className="flex items-center justify-between">
                {/* Left Side - Company Info */}
                <div className="flex flex-col gap-0.5">
                    <h1 className="text-xl font-bold text-gray-900">
                        {company.company}
                    </h1>
                    {hqAddress && (
                        <p className="text-sm text-gray-600">HQ {hqAddress}</p>
                    )}
                    {company.hq_phone && (
                        <p className="text-sm text-gray-600">
                            {formatPhone(company.hq_phone)}
                        </p>
                    )}
                </div>

                {/* Right Side - Company Logo */}
                <div className="shrink-0 ml-4">
                    <img
                        src="https://ahprd1cdn.csgpimgs.com/i2/DjdhcVbBYKNTg7QrR94MKIh4s4xJCfhakt596UVOEUo/105/image.png"
                        alt={`${company.company} logo`}
                        className="h-10 w-auto object-contain"
                        onError={(e) => {
                            // Fallback if image fails to load
                            (e.target as HTMLImageElement).style.display =
                                "none";
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
