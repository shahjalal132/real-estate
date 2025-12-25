import { Link } from "@inertiajs/react";
import { Save, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";

export default function CompanyDetailsNav() {
    return (
        <div className="bg-white border-b border-gray-200">
            <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-6">
                        <Link
                            href="/contacts/tenants"
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            ← Back to Tenants
                        </Link>
                        <span className="text-sm text-gray-400">|</span>
                        <span className="text-sm text-gray-600">
                            1 of 40,596 Tenant Companies
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-2 text-gray-600 hover:text-gray-900">
                            <Save className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-gray-900">
                            <MoreVertical className="h-5 w-5" />
                        </button>
                        <div className="flex items-center gap-2">
                            <button className="p-2 text-gray-600 hover:text-gray-900">
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button className="p-2 text-gray-600 hover:text-gray-900">
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

