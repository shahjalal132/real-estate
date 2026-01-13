import { Info } from "lucide-react";
import PortfolioMap from "./PortfolioMap";
import PortfolioAnalytics from "./PortfolioAnalytics";
import TransactionActivityCharts from "./TransactionActivityCharts";
import PropertiesSlider from "./PropertiesSlider";
import TenantMix from "./TenantMix";
import LeasingOccupierActivity from "./LeasingOccupierActivity";
import HotelBrands from "./HotelBrands";
import Funds from "./Funds";
import Subsidiaries from "./Subsidiaries";
import CompanyLeadership from "./CompanyLeadership";
import Relationships from "./Relationships";

interface OwnerCompany {
    id: number;
    company: string;
    [key: string]: any;
}

interface SummaryOverviewProps {
    company: OwnerCompany;
    description?: string;
}

export default function SummaryOverview({
    company: _company,
    description: _description,
}: SummaryOverviewProps) {
    // Static content for now - will be replaced with dynamic data later
    const staticDescription = `Blackstone Inc. (NYSE: "BX") is the largest owner of commercial real estate in the world. In addition to real estate, the company's investments include infrastructure, life sciences, growth equity, credit, real assets, secondaries, and hedge funds. Blackstone was founded in 1985 in New York City by the late Peter G. Peterson and by Stephen A. Schwarzman, who serves as the current Chief Executive Officer. Blackstone went public in 2007, and as of 2025 Q3, Blackstone has over $1.2141 trillion assets under management (AUM) with over 12,100 owned properties and a market cap of $230B. Blackstone's real estate business was founded in 1991 and has $339B of investor capital under management, with a global portfolio value of more than $600B. Blackstone owns and operates assets across every major geography and sector. Moreover, Blackstone manages over 60 real estate funds with $188.1 billion of dry powder available to invest at the end of 2025 Q3.`;

    return (
        <div className="space-y-8 mt-4">
            {/* Company Description Section */}
            <div className="bg-white p-4 border border-gray-200 rounded-lg">
                <article>
                    <span className="block columns-1 lg:columns-2 gap-8">
                        <p className="text-sm text-gray-700 leading-relaxed">
                            {staticDescription}
                        </p>
                    </span>
                </article>
            </div>

            {/* Company Overview Table Section */}
            <div className="bg-white border border-gray-200 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
                    {/* Left Column */}
                    <div>
                        <table className="w-full">
                            <tbody>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        Headquarters:
                                    </td>
                                    <td className="py-2 text-sm text-gray-900 align-top">
                                        New York, New York, United States
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        Company Hierarchy:
                                    </td>
                                    <td className="py-2 text-sm text-gray-900 align-top">
                                        Parent
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        Subsidiaries:
                                    </td>
                                    <td className="py-2 text-sm text-gray-900 align-top">
                                        58
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        Funds:
                                    </td>
                                    <td className="py-2 text-sm text-gray-900 align-top">
                                        79
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        Employees:
                                    </td>
                                    <td className="py-2 text-sm text-gray-900 align-top">
                                        4,735
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        Website:
                                    </td>
                                    <td className="py-2 text-sm text-gray-900 align-top">
                                        www.blackstone.com
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        Ticker:
                                    </td>
                                    <td className="py-2 text-sm text-gray-900 align-top">
                                        BX (NYSE)
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Middle Column */}
                    <div>
                        <table className="w-full">
                            <tbody>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        <div className="flex items-center gap-1">
                                            <span>Properties:</span>
                                            <button className="text-blue-500 hover:text-blue-600">
                                                <Info className="h-3 w-3" />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="py-2 text-sm text-gray-900 align-top">
                                        12,480 including 294 Land
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        Land Size:
                                    </td>
                                    <td className="py-2 text-sm text-gray-900 align-top">
                                        7.6K AC / 330M SF
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        Main Property Type:
                                    </td>
                                    <td className="py-2 text-sm text-gray-900 align-top">
                                        Diversified
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        Territory:
                                    </td>
                                    <td className="py-2 text-sm text-gray-900 align-top">
                                        International
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        Primary Country:
                                    </td>
                                    <td className="py-2 text-sm text-gray-900 align-top">
                                        United States
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        <div className="flex items-center gap-1">
                                            <span>Revenue:</span>
                                            <button className="text-blue-500 hover:text-blue-600">
                                                <Info className="h-3 w-3" />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="py-2 text-sm text-gray-900 align-top">
                                        $10.9B
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        <div className="flex items-center gap-1">
                                            <span>Credit Rating:</span>
                                            <button className="text-blue-500 hover:text-blue-600">
                                                <Info className="h-3 w-3" />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="py-2 text-sm text-gray-900 align-top">
                                        B-60 (Low Risk)
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Right Column */}
                    <div>
                        <table className="w-full">
                            <tbody>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        Total Built Size:
                                    </td>
                                    <td className="py-2 text-sm text-gray-900 align-top">
                                        1.4B SF
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        Delivered (24 mo):
                                    </td>
                                    <td className="py-2 text-sm text-gray-900 align-top">
                                        36M SF
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        Under Construction:
                                    </td>
                                    <td className="py-2 text-sm text-gray-900 align-top">
                                        13M SF
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        Acquisitions (24 mo):
                                    </td>
                                    <td className="py-2 text-sm text-gray-900 align-top">
                                        $35.8B · 1,614 Properties
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        Dispositions (24 mo):
                                    </td>
                                    <td className="py-2 text-sm text-gray-900 align-top">
                                        $51.9B · 2,534 Properties
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        <div className="flex items-center gap-1">
                                            <span>Vacancy Rate:</span>
                                            <button className="text-blue-500 hover:text-blue-600">
                                                <Info className="h-3 w-3" />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="py-2 text-sm text-gray-900 align-top">
                                        12.1%
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        <div className="flex items-center gap-1">
                                            <span>Availability:</span>
                                            <button className="text-blue-500 hover:text-blue-600">
                                                <Info className="h-3 w-3" />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="py-2 text-sm text-gray-900 align-top">
                                        132M SF
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 pr-4 text-sm font-medium text-gray-700 align-top">
                                        Sale Listings:
                                    </td>
                                    <td className="py-2 text-sm text-gray-900 align-top">
                                        103 Listings · 8.2M SF
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Portfolio Map Section */}
            <PortfolioMap />

            {/* Portfolio Analytics Section */}
            <PortfolioAnalytics />

            {/* Transaction Activity Charts Section */}
            <TransactionActivityCharts />

            {/* Properties Slider Section */}
            <PropertiesSlider />

            {/* Tenant Mix Section */}
            <TenantMix />

            {/* Leasing & Occupier Activity Section */}
            <LeasingOccupierActivity />

            {/* Hotel Brands Section */}
            <HotelBrands />

            {/* Funds Section */}
            <Funds />

            {/* Subsidiaries Section */}
            <Subsidiaries />

            {/* Company Leadership Section */}
            <CompanyLeadership />

            {/* Relationships Section */}
            <Relationships />
        </div>
    );
}
