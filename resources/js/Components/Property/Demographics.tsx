import { useState } from "react";
import { Download, TrendingUp, Menu } from "lucide-react";
import LineChart from "./Charts/LineChart";
import PieChart from "./Charts/PieChart";
import HorizontalBarChart from "./Charts/HorizontalBarChart";

type RadiusTab = "1 mile" | "3 miles" | "5 miles";

interface DemographicsData {
    population: {
        current: string;
        value2019: string;
        value2022: string;
        growth2019: number;
        growth2022: number;
        chartData: { label: string; value: number }[];
    };
    householdIncome: {
        median: string;
        estimate2028: string;
        growthRate: number;
        pieData: { label: string; value: number; color?: string }[];
    };
    ageDemographics: {
        median: string;
        estimate2028: string;
        growthRate: number;
        pieData: { label: string; value: number; color?: string }[];
    };
    employees: {
        total: string;
        categories: { label: string; value: number; color?: string }[];
    };
    housingOccupancy: {
        current: string;
        predicted: string;
        data: { label: string; value: number; color?: string }[];
    };
    renterHomeowner: {
        current: string;
        predicted: string;
        data: { label: string; value: number; color?: string }[];
    };
}

// Sample data for different radius tabs
const demographicsData: Record<RadiusTab, DemographicsData> = {
    "1 mile": {
        population: {
            current: "11k",
            value2019: "10.6k",
            value2022: "10.0k",
            growth2019: 3,
            growth2022: 1,
            chartData: [
                { label: "2019", value: 10500 },
                { label: "2020", value: 10700 },
                { label: "2021", value: 10650 },
                { label: "2022", value: 10800 },
                { label: "2023", value: 11000 },
            ],
        },
        householdIncome: {
            median: "$53.1k",
            estimate2028: "$50.4k",
            growthRate: -5,
            pieData: [
                { label: "Under $25K", value: 15, color: "#1e3a8a" },
                { label: "$25K - $50K", value: 25, color: "#3b82f6" },
                { label: "$50K - $100K", value: 35, color: "#60a5fa" },
                { label: "$100K - $150K", value: 15, color: "#93c5fd" },
                { label: "Over $150K", value: 10, color: "#1e40af" },
            ],
        },
        ageDemographics: {
            median: "43",
            estimate2028: "41",
            growthRate: -3,
            pieData: [
                { label: "Over 65", value: 20, color: "#1e3a8a" },
                { label: "Under 20", value: 15, color: "#3b82f6" },
                { label: "20 - 25", value: 10, color: "#60a5fa" },
                { label: "25 - 45", value: 35, color: "#93c5fd" },
                { label: "45 - 63", value: 20, color: "#1e40af" },
            ],
        },
        employees: {
            total: "8,808",
            categories: [
                { label: "Manufacturing", value: 2500, color: "#0066CC" },
                {
                    label: "Educational services, and heal...",
                    value: 1800,
                    color: "#0066CC",
                },
                {
                    label: "Management, business, scien...",
                    value: 1500,
                    color: "#0066CC",
                },
                { label: "Retail trade", value: 1200, color: "#0066CC" },
                { label: "Other", value: 1808, color: "#0066CC" },
            ],
        },
        housingOccupancy: {
            current: "8:1",
            predicted: "11:1 predicted by 2028",
            data: [
                { label: "Occupied", value: 88, color: "#0066CC" },
                { label: "Vacant", value: 12, color: "#E5E7EB" },
            ],
        },
        renterHomeowner: {
            current: "1:3",
            predicted: "1:2 predicted by 2028",
            data: [
                { label: "Renters", value: 25, color: "#E5E7EB" },
                { label: "Homeowner", value: 75, color: "#0066CC" },
            ],
        },
    },
    "3 miles": {
        population: {
            current: "25k",
            value2019: "24.2k",
            value2022: "23.8k",
            growth2019: 3,
            growth2022: 1,
            chartData: [
                { label: "2019", value: 24200 },
                { label: "2020", value: 24500 },
                { label: "2021", value: 24300 },
                { label: "2022", value: 23800 },
                { label: "2023", value: 25000 },
            ],
        },
        householdIncome: {
            median: "$58.5k",
            estimate2028: "$55.2k",
            growthRate: -5,
            pieData: [
                { label: "Under $25K", value: 12, color: "#1e3a8a" },
                { label: "$25K - $50K", value: 22, color: "#3b82f6" },
                { label: "$50K - $100K", value: 38, color: "#60a5fa" },
                { label: "$100K - $150K", value: 18, color: "#93c5fd" },
                { label: "Over $150K", value: 10, color: "#1e40af" },
            ],
        },
        ageDemographics: {
            median: "41",
            estimate2028: "39",
            growthRate: -3,
            pieData: [
                { label: "Over 65", value: 18, color: "#1e3a8a" },
                { label: "Under 20", value: 18, color: "#3b82f6" },
                { label: "20 - 25", value: 12, color: "#60a5fa" },
                { label: "25 - 45", value: 38, color: "#93c5fd" },
                { label: "45 - 63", value: 14, color: "#1e40af" },
            ],
        },
        employees: {
            total: "18,500",
            categories: [
                { label: "Manufacturing", value: 5200, color: "#0066CC" },
                {
                    label: "Educational services, and heal...",
                    value: 3800,
                    color: "#0066CC",
                },
                {
                    label: "Management, business, scien...",
                    value: 3100,
                    color: "#0066CC",
                },
                { label: "Retail trade", value: 2500, color: "#0066CC" },
                { label: "Other", value: 3900, color: "#0066CC" },
            ],
        },
        housingOccupancy: {
            current: "9:1",
            predicted: "12:1 predicted by 2028",
            data: [
                { label: "Occupied", value: 89, color: "#0066CC" },
                { label: "Vacant", value: 11, color: "#E5E7EB" },
            ],
        },
        renterHomeowner: {
            current: "1:2.5",
            predicted: "1:2 predicted by 2028",
            data: [
                { label: "Renters", value: 28, color: "#E5E7EB" },
                { label: "Homeowner", value: 72, color: "#0066CC" },
            ],
        },
    },
    "5 miles": {
        population: {
            current: "42k",
            value2019: "40.8k",
            value2022: "40.2k",
            growth2019: 3,
            growth2022: 1,
            chartData: [
                { label: "2019", value: 40800 },
                { label: "2020", value: 41200 },
                { label: "2021", value: 41000 },
                { label: "2022", value: 40200 },
                { label: "2023", value: 42000 },
            ],
        },
        householdIncome: {
            median: "$62.3k",
            estimate2028: "$59.1k",
            growthRate: -5,
            pieData: [
                { label: "Under $25K", value: 10, color: "#1e3a8a" },
                { label: "$25K - $50K", value: 20, color: "#3b82f6" },
                { label: "$50K - $100K", value: 40, color: "#60a5fa" },
                { label: "$100K - $150K", value: 20, color: "#93c5fd" },
                { label: "Over $150K", value: 10, color: "#1e40af" },
            ],
        },
        ageDemographics: {
            median: "39",
            estimate2028: "37",
            growthRate: -3,
            pieData: [
                { label: "Over 65", value: 15, color: "#1e3a8a" },
                { label: "Under 20", value: 20, color: "#3b82f6" },
                { label: "20 - 25", value: 15, color: "#60a5fa" },
                { label: "25 - 45", value: 40, color: "#93c5fd" },
                { label: "45 - 63", value: 10, color: "#1e40af" },
            ],
        },
        employees: {
            total: "32,200",
            categories: [
                { label: "Manufacturing", value: 9200, color: "#0066CC" },
                {
                    label: "Educational services, and heal...",
                    value: 6800,
                    color: "#0066CC",
                },
                {
                    label: "Management, business, scien...",
                    value: 5500,
                    color: "#0066CC",
                },
                { label: "Retail trade", value: 4500, color: "#0066CC" },
                { label: "Other", value: 6200, color: "#0066CC" },
            ],
        },
        housingOccupancy: {
            current: "10:1",
            predicted: "13:1 predicted by 2028",
            data: [
                { label: "Occupied", value: 90, color: "#0066CC" },
                { label: "Vacant", value: 10, color: "#E5E7EB" },
            ],
        },
        renterHomeowner: {
            current: "1:2",
            predicted: "1:1.5 predicted by 2028",
            data: [
                { label: "Renters", value: 33, color: "#E5E7EB" },
                { label: "Homeowner", value: 67, color: "#0066CC" },
            ],
        },
    },
};

export default function Demographics() {
    const [activeTab, setActiveTab] = useState<RadiusTab>("1 mile");
    const data = demographicsData[activeTab];

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                    Demographics
                </h2>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Download className="w-4 h-4" />
                        Export to CSV
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                        <TrendingUp className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                        <Menu className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 mb-6 border-b border-gray-200">
                {(["1 mile", "3 miles", "5 miles"] as RadiusTab[]).map(
                    (tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                                activeTab === tab
                                    ? "text-[#0066CC]"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0066CC]"></span>
                            )}
                        </button>
                    )
                )}
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Population Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                    <h3 className="text-sm font-semibold text-purple-600 mb-3">
                        Population
                    </h3>
                    <div className="text-3xl font-bold text-gray-900 mb-4">
                        {data.population.current}
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-start gap-2">
                            <TrendingUp className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                            <div>
                                <div className="text-sm font-semibold text-green-600">
                                    {data.population.growth2019}%
                                </div>
                                <div className="text-xs text-gray-600 leading-tight">
                                    Compared to {data.population.value2019} in
                                    2019
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <TrendingUp className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                            <div>
                                <div className="text-sm font-semibold text-green-600">
                                    {data.population.growth2022}%
                                </div>
                                <div className="text-xs text-gray-600 leading-tight">
                                    Compared to {data.population.value2022} in
                                    2022
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-32 overflow-hidden">
                        <LineChart
                            data={data.population.chartData}
                            height={128}
                            color="#0066CC"
                            formatValue={(val) => `${(val / 1000).toFixed(1)}k`}
                            compact={true}
                            showArea={true}
                        />
                    </div>
                </div>

                {/* Household Income Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                    <h3 className="text-sm font-semibold text-purple-600 mb-3">
                        Household Income
                    </h3>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                        {data.householdIncome.median}
                    </div>
                    <div className="text-xs text-gray-600 mb-2">
                        Median Income
                    </div>
                    <div className="text-lg font-semibold text-gray-900 mb-1">
                        {data.householdIncome.estimate2028}
                    </div>
                    <div className="text-xs text-gray-600 mb-3">
                        2028 Estimate
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />
                        <div>
                            <div className="text-sm font-semibold text-red-600">
                                {Math.abs(data.householdIncome.growthRate)}%
                            </div>
                            <div className="text-xs text-gray-600">
                                Growth Rate
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <PieChart
                            data={data.householdIncome.pieData}
                            size={160}
                            showLegend={false}
                        />
                    </div>
                </div>

                {/* Age Demographics Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                    <h3 className="text-sm font-semibold text-purple-600 mb-3">
                        Age Demographics
                    </h3>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                        {data.ageDemographics.median}
                    </div>
                    <div className="text-xs text-gray-600 mb-2">Median Age</div>
                    <div className="text-lg font-semibold text-gray-900 mb-1">
                        {data.ageDemographics.estimate2028}
                    </div>
                    <div className="text-xs text-gray-600 mb-3">
                        2028 Estimate
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />
                        <div>
                            <div className="text-sm font-semibold text-red-600">
                                {Math.abs(data.ageDemographics.growthRate)}%
                            </div>
                            <div className="text-xs text-gray-600">
                                Growth Rate
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <PieChart
                            data={data.ageDemographics.pieData}
                            size={160}
                            showLegend={false}
                        />
                    </div>
                </div>

                {/* Number of Employees Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                    <h3 className="text-sm font-semibold text-purple-600 mb-3">
                        Number of Employees
                    </h3>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                        {data.employees.total}
                    </div>
                    <div className="text-xs text-gray-600 mb-4">
                        Top Employment Categories
                    </div>
                    <div className="h-40">
                        <HorizontalBarChart
                            data={data.employees.categories}
                            height={160}
                        />
                    </div>
                </div>

                {/* Housing Occupancy Ratio Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                    <h3 className="text-sm font-semibold text-blue-600 mb-3">
                        Housing Occupancy Ratio
                    </h3>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                        {data.housingOccupancy.current}
                    </div>
                    <div className="text-sm text-gray-700 mb-4">
                        {data.housingOccupancy.predicted}
                    </div>
                    <div className="h-24">
                        <HorizontalBarChart
                            data={data.housingOccupancy.data}
                            height={96}
                        />
                    </div>
                </div>

                {/* Renter to Homeowner Ratio Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                    <h3 className="text-sm font-semibold text-blue-600 mb-3">
                        Renter to Homeowner Ratio
                    </h3>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                        {data.renterHomeowner.current}
                    </div>
                    <div className="text-sm text-gray-700 mb-4">
                        {data.renterHomeowner.predicted}
                    </div>
                    <div className="h-24">
                        <HorizontalBarChart
                            data={data.renterHomeowner.data}
                            height={96}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
