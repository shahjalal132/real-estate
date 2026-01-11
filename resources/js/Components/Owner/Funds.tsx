import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { formatCurrency } from "../../utils/formatting";

interface Fund {
    name: string;
    status: string;
    vintage: number;
    size: string;
    dryPowder: string;
    propertyFocus: string;
    countryFocus: string;
}

export default function Funds() {
    const [expanded, setExpanded] = useState(false);

    // Static data for Funds table - matching screenshot exactly
    const fundsData: Fund[] = [
        {
            name: "BREP",
            status: "Active",
            vintage: 1991,
            size: "$10.5B",
            dryPowder: "$2.1B",
            propertyFocus: "Industrial, Office",
            countryFocus: "United States",
        },
        {
            name: "BREP II",
            status: "Active",
            vintage: 1992,
            size: "$12.3B",
            dryPowder: "$1.8B",
            propertyFocus: "Office, Retail",
            countryFocus: "United States",
        },
        {
            name: "BREP III",
            status: "Active",
            vintage: 1993,
            size: "$15.2B",
            dryPowder: "$2.5B",
            propertyFocus: "Industrial, Office, Retail",
            countryFocus: "United States, Europe",
        },
        {
            name: "BREP IV",
            status: "Active",
            vintage: 1994,
            size: "$18.7B",
            dryPowder: "$3.2B",
            propertyFocus: "Office, Retail, Hospitality",
            countryFocus: "United States",
        },
        {
            name: "BREP V",
            status: "Active",
            vintage: 1995,
            size: "$22.1B",
            dryPowder: "$4.1B",
            propertyFocus: "Industrial, Office",
            countryFocus: "United States, Asia",
        },
    ];

    const visibleFunds = expanded ? fundsData : fundsData.slice(0, 5);

    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                    Funds | 79 Funds
                </h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                Funds
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                Status
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                Vintage
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                                Size
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                                Dry Powder
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                Property Focus
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                Country Focus
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {visibleFunds.map((fund, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                    {fund.name}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    {fund.status}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    {fund.vintage}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700 text-right">
                                    {fund.size}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700 text-right">
                                    {fund.dryPowder}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    {fund.propertyFocus}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    {fund.countryFocus}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="px-6 py-3 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">
                    Fund Information Source: Preqin
                </p>
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                    {expanded ? "Collapse" : "Expand"}
                    <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                            expanded ? "rotate-180" : ""
                        }`}
                    />
                </button>
            </div>
        </div>
    );
}

