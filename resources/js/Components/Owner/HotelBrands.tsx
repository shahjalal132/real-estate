import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { formatSF, formatNumber } from "../../utils/formatting";

interface HotelBrand {
    name: string;
    scale: string;
    parent: string;
    portfolioLocationCounts: number;
    rooms: number;
    sf: number;
}

export default function HotelBrands() {
    const [expanded, setExpanded] = useState(false);

    // Static data for Hotel Brands table - matching screenshot exactly
    const hotelBrandsData: HotelBrand[] = [
        {
            name: "Extended Stay America Suites",
            scale: "Midscale",
            parent: "Extended Stay America",
            portfolioLocationCounts: 405,
            rooms: 45783,
            sf: 20996871,
        },
        {
            name: "InTown Suites",
            scale: "Economy",
            parent: "InTown Suites",
            portfolioLocationCounts: 186,
            rooms: 23631,
            sf: 8845803,
        },
        {
            name: "Extended Stay America Select Suites",
            scale: "Economy",
            parent: "Extended Stay America",
            portfolioLocationCounts: 90,
            rooms: 10677,
            sf: 3976161,
        },
        {
            name: "Great Wolf Lodge",
            scale: "Upper Upscale",
            parent: "Great Wolf Resorts",
            portfolioLocationCounts: 19,
            rooms: 8620,
            sf: 8394627,
        },
        {
            name: "Autograph Collection",
            scale: "Upper Upscale",
            parent: "Marriott International",
            portfolioLocationCounts: 6,
            rooms: 8142,
            sf: 10211153,
        },
        {
            name: "Barcelo",
            scale: "Upscale",
            parent: "Barcelo Gestion Hotelera S.L.",
            portfolioLocationCounts: 17,
            rooms: 4486,
            sf: 4226083,
        },
        {
            name: "Luxury Collection",
            scale: "Luxury",
            parent: "Marriott International",
            portfolioLocationCounts: 3,
            rooms: 4361,
            sf: 2798523,
        },
        {
            name: "Extended Stay America Premier Suites",
            scale: "Midscale",
            parent: "Extended Stay America",
            portfolioLocationCounts: 32,
            rooms: 3778,
            sf: 1896790,
        },
    ];

    const visibleBrands = expanded ? hotelBrandsData : hotelBrandsData.slice(0, 8);

    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                    Hotel Brands | 68 Brands
                </h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                Brands
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                Scale
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                Parent
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                                Portfolio Location Counts
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                                Rooms
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                                SF
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {visibleBrands.map((brand, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                    {brand.name}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    {brand.scale}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    {brand.parent}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700 text-right">
                                    {formatNumber(brand.portfolioLocationCounts)}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700 text-right">
                                    {formatNumber(brand.rooms)}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700 text-right">
                                    {formatSF(brand.sf)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="px-6 py-3 border-t border-gray-200">
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

