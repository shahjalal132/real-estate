import { Link } from "@inertiajs/react";
import { formatNumber, formatSF } from "../../utils/formatting";

interface OwnerCompany {
    id: number;
    company: string;
    owner_type?: string;
    properties?: number;
    portfolio_sf?: number;
}

interface RelatedCompaniesTableProps {
    companies: OwnerCompany[];
}

export default function RelatedCompaniesTable({ companies }: RelatedCompaniesTableProps) {
    if (companies.length === 0) {
        return null;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Companies</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                                Company
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                                Owner Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                                Properties
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                                Portfolio SF
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {companies.map((company) => (
                            <tr key={company.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link
                                        href={`/contacts/owners/${company.id}`}
                                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                    >
                                        {company.company}
                                    </Link>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {company.owner_type || "—"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatNumber(company.properties)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatSF(company.portfolio_sf)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

