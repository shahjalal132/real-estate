import { DollarSign, Home, Building2, CheckCircle } from "lucide-react";
import { PropertyDetail } from "../../../types";

interface PropertyDetailsGridProps {
    details: PropertyDetail | null;
    isInOpportunityZone?: boolean;
}

export default function PropertyDetailsGrid({
    details,
    isInOpportunityZone,
}: PropertyDetailsGridProps) {
    if (!details) {
        return null;
    }

    const detailItems = [];

    if (details.lot_size_acres) {
        detailItems.push({
            icon: Home,
            iconBg: "bg-[#0066CC]",
            bgGradient: "from-blue-50 to-blue-100/50",
            label: "Lot Size",
            value: `${details.lot_size_acres} acres`,
            size: "text-2xl",
        });
    }

    if (details.price_per_acre) {
        detailItems.push({
            icon: DollarSign,
            iconBg: "bg-green-600",
            bgGradient: "from-green-50 to-green-100/50",
            label: "Price per Acre",
            value: details.price_per_acre,
            size: "text-2xl",
        });
    }

    if (details.zoning) {
        detailItems.push({
            icon: Building2,
            iconBg: "bg-purple-600",
            bgGradient: "from-purple-50 to-purple-100/50",
            label: "Zoning",
            value: details.zoning,
            size: "text-xl",
        });
    }

    if (isInOpportunityZone) {
        detailItems.push({
            icon: CheckCircle,
            iconBg: "bg-amber-600",
            bgGradient: "from-amber-50 to-amber-100/50",
            label: "Opportunity Zone",
            value: "Yes",
            size: "text-xl",
        });
    }

    if (detailItems.length === 0) {
        return null;
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Property Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {detailItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={index}
                            className={`flex items-start gap-4 p-4 bg-gradient-to-br ${item.bgGradient} rounded-xl`}
                        >
                            <div
                                className={`p-3 ${item.iconBg} rounded-xl shrink-0`}
                            >
                                <Icon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 font-medium mb-1">
                                    {item.label}
                                </p>
                                <p
                                    className={`${item.size} font-bold text-gray-900`}
                                >
                                    {item.value}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Summary Details */}
            {details.summary_details &&
                Object.keys(details.summary_details).length > 0 && (
                    <div className="mt-8 pt-8 border-t border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">
                            Additional Details
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {Object.entries(details.summary_details).map(
                                ([key, value]) => (
                                    <div
                                        key={key}
                                        className="p-4 bg-gray-50 rounded-xl"
                                    >
                                        <p className="text-sm text-gray-500 font-medium capitalize mb-1">
                                            {key.replace(/_/g, " ")}
                                        </p>
                                        <p className="text-base font-semibold text-gray-900">
                                            {String(value)}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                )}

            {/* Investment Highlights */}
            {details.investment_highlights && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Investment Highlights
                    </h3>
                    <div
                        className="text-gray-700 leading-relaxed prose max-w-none"
                        dangerouslySetInnerHTML={{
                            __html: details.investment_highlights,
                        }}
                    />
                </div>
            )}
        </div>
    );
}
