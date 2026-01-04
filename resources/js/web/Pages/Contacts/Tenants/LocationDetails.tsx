import { Head, Link } from "@inertiajs/react";
import AppLayout from "../../../Layouts/AppLayout";
import { TennentLocation, TennentCompany } from "../../../../types";
import ComingSoon from "../../../../Components/ComingSoon";
import { MapPin } from "lucide-react";

interface PageProps {
    location: TennentLocation;
    company: TennentCompany | null;
}

export default function LocationDetails({ location, company }: PageProps) {
    const formatAddress = (): string => {
        const parts = [
            location.address,
            location.city,
            location.state,
            location.zip,
        ].filter(Boolean);
        return parts.join(", ") || "Address not available";
    };

    return (
        <AppLayout>
            <Head
                title={`Location Details - ${
                    location.building_name || formatAddress()
                }`}
            />

            <div className="bg-gray-50 min-h-screen">
                {/* Breadcrumb/Header */}
                {company && (
                    <div className="bg-white border-b border-gray-200">
                        <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 py-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Link
                                    href="/contacts/tenants"
                                    className="hover:text-gray-900"
                                >
                                    Tenants
                                </Link>
                                <span>/</span>
                                <Link
                                    href={`/contacts/tenants/${company.id}`}
                                    className="hover:text-gray-900"
                                >
                                    {company.tenant_name}
                                </Link>
                                <span>/</span>
                                <Link
                                    href={`/contacts/tenants/${company.id}/locations`}
                                    className="hover:text-gray-900"
                                >
                                    Locations
                                </Link>
                                <span>/</span>
                                <span className="text-gray-900">
                                    {location.building_name ||
                                        formatAddress().split(",")[0]}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Coming Soon Content */}
                <ComingSoon
                    title="Location Details"
                    description={`View detailed information about ${location.building_name || formatAddress()}, including property specifications, lease details, and location insights.`}
                    icon={MapPin}
                />
            </div>
        </AppLayout>
    );
}

