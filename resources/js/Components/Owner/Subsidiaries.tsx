import { Info } from "lucide-react";
import { Link } from "@inertiajs/react";
import { formatSF, formatNumber, formatCurrency } from "../../utils/formatting";

interface Subsidiary {
    name: string;
    properties: number;
    portfolioSF: number;
    mainPropertyType: string;
    primaryCountry: string;
    sfDelivered24Mo: number | null;
    sfUnderConstruction: number | null;
    acquisitions24Mo: number | null;
    dispositions24Mo: number | null;
    href?: string;
}

export default function Subsidiaries() {
    // Static data for Subsidiaries table - matching the provided HTML
    const subsidiariesData: Subsidiary[] = [
        {
            name: "Link Logistics Real Estate",
            properties: 2557,
            portfolioSF: 347000000,
            mainPropertyType: "Industrial",
            primaryCountry: "United States",
            sfDelivered24Mo: 11616717,
            sfUnderConstruction: 920079,
            acquisitions24Mo: 505933000,
            dispositions24Mo: 6467143815,
        },
        {
            name: "Blackstone Real Estate Income Trust, Inc.",
            properties: 783,
            portfolioSF: 157000000,
            mainPropertyType: "Diversified",
            primaryCountry: "United States",
            sfDelivered24Mo: 220000,
            sfUnderConstruction: 506625,
            acquisitions24Mo: 190957000,
            dispositions24Mo: 5675014224,
        },
        {
            name: "Mileway",
            properties: 2298,
            portfolioSF: 97000000,
            mainPropertyType: "Industrial",
            primaryCountry: "United Kingdom",
            sfDelivered24Mo: 816495,
            sfUnderConstruction: 343799,
            acquisitions24Mo: 640569340,
            dispositions24Mo: 239611820,
        },
        {
            name: "Pure Industrial",
            properties: 410,
            portfolioSF: 45000000,
            mainPropertyType: "Industrial",
            primaryCountry: "Canada",
            sfDelivered24Mo: 1826353,
            sfUnderConstruction: null,
            acquisitions24Mo: 262872457,
            dispositions24Mo: 560804360,
        },
        {
            name: "Indurent",
            properties: 852,
            portfolioSF: 36000000,
            mainPropertyType: "Industrial",
            primaryCountry: "United Kingdom",
            sfDelivered24Mo: 2755164,
            sfUnderConstruction: 1690882,
            acquisitions24Mo: 911512563,
            dispositions24Mo: 59627103,
        },
        {
            name: "AIR Communities",
            properties: 78,
            portfolioSF: 30000000,
            mainPropertyType: "Multifamily",
            primaryCountry: "United States",
            sfDelivered24Mo: null,
            sfUnderConstruction: null,
            acquisitions24Mo: 439473098,
            dispositions24Mo: 10103250000,
        },
        {
            name: "Blackstone (Extended Stay America)",
            properties: 529,
            portfolioSF: 27000000,
            mainPropertyType: "Hospitality",
            primaryCountry: "United States",
            sfDelivered24Mo: 48214,
            sfUnderConstruction: null,
            acquisitions24Mo: null,
            dispositions24Mo: 176592500,
        },
        {
            name: "Perform Properties",
            properties: 577,
            portfolioSF: 27000000,
            mainPropertyType: "Retail",
            primaryCountry: "United States",
            sfDelivered24Mo: 664016,
            sfUnderConstruction: null,
            acquisitions24Mo: null,
            dispositions24Mo: 215685000,
        },
        {
            name: "QTS Realty Trust, Inc.",
            properties: 98,
            portfolioSF: 26000000,
            mainPropertyType: "Industrial",
            primaryCountry: "United States",
            sfDelivered24Mo: 7926855,
            sfUnderConstruction: 6645562,
            acquisitions24Mo: 770582577,
            dispositions24Mo: null,
        },
        {
            name: "LivCor LLC",
            properties: 68,
            portfolioSF: 25000000,
            mainPropertyType: "Multifamily",
            primaryCountry: "United States",
            sfDelivered24Mo: 510,
            sfUnderConstruction: null,
            acquisitions24Mo: 648031481,
            dispositions24Mo: 1553804000,
        },
        {
            name: "BioMed Realty",
            properties: 179,
            portfolioSF: 23000000,
            mainPropertyType: "Office",
            primaryCountry: "United States",
            sfDelivered24Mo: 962601,
            sfUnderConstruction: 1185000,
            acquisitions24Mo: 861539000,
            dispositions24Mo: 643000000,
        },
        {
            name: "Hotel Investment Partners",
            properties: 73,
            portfolioSF: 21000000,
            mainPropertyType: "Hospitality",
            primaryCountry: "Spain",
            sfDelivered24Mo: null,
            sfUnderConstruction: null,
            acquisitions24Mo: 256709959,
            dispositions24Mo: null,
        },
        {
            name: "BRE Hotels & Resorts LLC",
            properties: 90,
            portfolioSF: 17000000,
            mainPropertyType: "Hospitality",
            primaryCountry: "United States",
            sfDelivered24Mo: null,
            sfUnderConstruction: null,
            acquisitions24Mo: 1098650000,
            dispositions24Mo: 1066490000,
        },
        {
            name: "Proudreed",
            properties: 219,
            portfolioSF: 9000000,
            mainPropertyType: "Diversified",
            primaryCountry: "France",
            sfDelivered24Mo: 673938,
            sfUnderConstruction: 196150,
            acquisitions24Mo: 42945577,
            dispositions24Mo: null,
        },
        {
            name: "iQ Student Accommodation",
            properties: 27,
            portfolioSF: 4000000,
            mainPropertyType: "Student",
            primaryCountry: "United Kingdom",
            sfDelivered24Mo: 259241,
            sfUnderConstruction: 418390,
            acquisitions24Mo: 450818190,
            dispositions24Mo: null,
        },
        {
            name: "Safe Harbor Marinas",
            properties: 134,
            portfolioSF: 3400000,
            mainPropertyType: "Specialty",
            primaryCountry: "United States",
            sfDelivered24Mo: null,
            sfUnderConstruction: null,
            acquisitions24Mo: 39440500,
            dispositions24Mo: 5650000000,
        },
        {
            name: "Revantage",
            properties: 41,
            portfolioSF: 3200000,
            mainPropertyType: "Industrial",
            primaryCountry: "United States",
            sfDelivered24Mo: 3941,
            sfUnderConstruction: null,
            acquisitions24Mo: 39636264,
            dispositions24Mo: null,
        },
        {
            name: "Reliant Net Lease",
            properties: 45,
            portfolioSF: 439000,
            mainPropertyType: "Diversified",
            primaryCountry: "United States",
            sfDelivered24Mo: 1020,
            sfUnderConstruction: null,
            acquisitions24Mo: 95660066,
            dispositions24Mo: null,
        },
    ];

    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                    Subsidiaries
                </h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                Name
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase">
                                <div className="flex items-center justify-center gap-1">
                                    Properties
                                    <button className="text-blue-500 hover:text-blue-600">
                                        <Info className="h-3 w-3" />
                                    </button>
                                </div>
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                                Portfolio SF
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                Main Property Type
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                Primary Country
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                                SF Delivered 24 Months
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                                SF Under Construction
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                                Acquisitions 24 Months
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                                Dispositions 24 Months
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {subsidiariesData.map((subsidiary, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                    <Link
                                        href={subsidiary.href || "#"}
                                        className="text-blue-600 hover:text-blue-800 hover:underline"
                                    >
                                        {subsidiary.name}
                                    </Link>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700 text-center">
                                    {formatNumber(subsidiary.properties)}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700 text-right">
                                    {formatSF(subsidiary.portfolioSF)}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    {subsidiary.mainPropertyType}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    {subsidiary.primaryCountry}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700 text-right">
                                    {subsidiary.sfDelivered24Mo
                                        ? formatNumber(subsidiary.sfDelivered24Mo)
                                        : "—"}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700 text-right">
                                    {subsidiary.sfUnderConstruction
                                        ? formatNumber(
                                              subsidiary.sfUnderConstruction
                                          )
                                        : "—"}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700 text-right">
                                    {subsidiary.acquisitions24Mo
                                        ? formatCurrency(
                                              subsidiary.acquisitions24Mo
                                          )
                                        : "—"}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700 text-right">
                                    {subsidiary.dispositions24Mo
                                        ? formatCurrency(
                                              subsidiary.dispositions24Mo
                                          )
                                        : "—"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

