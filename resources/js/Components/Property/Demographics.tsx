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
            current: "6,205",
            value2019: "6,223",
            value2022: "5,904",
            growth2019: 0,
            growth2022: 5,
            chartData: [
                { label: "2019", value: 6220 },
                { label: "2020", value: 5980 },
                { label: "2021", value: 6180 },
                { label: "2022", value: 5900 },
                { label: "2023", value: 6205 },
            ],
        },
        householdIncome: {
            median: "$51.6k",
            estimate2028: "$57.9k",
            growthRate: 12,
            pieData: [
                { label: "Under $25K", value: 28, color: "#0066CC" },
                { label: "$25K - $50K", value: 22, color: "#3B82F6" },
                { label: "$50K - $100K", value: 20, color: "#60A5FA" },
                { label: "$100K - $150K", value: 18, color: "#93C5FD" },
                { label: "Over $150K", value: 12, color: "#1E40AF" },
            ],
        },
        ageDemographics: {
            median: "43",
            estimate2028: "41",
            growthRate: -5,
            pieData: [
                { label: "Under 20", value: 18, color: "#8B5CF6" },
                { label: "20 - 25", value: 8, color: "#A78BFA" },
                { label: "25 - 45", value: 32, color: "#C4B5FD" },
                { label: "45 - 65", value: 25, color: "#DDD6FE" },
                { label: "Over 65", value: 17, color: "#EDE9FE" },
            ],
        },
        employees: {
            total: "5,114",
            categories: [
                {
                    label: "Management, business, scien...",
                    value: 1800,
                    color: "#0066CC",
                },
                {
                    label: "Educational services, and heal...",
                    value: 1500,
                    color: "#0066CC",
                },
                { label: "Retail trade", value: 1000, color: "#0066CC" },
                { label: "Manufacturing", value: 600, color: "#0066CC" },
                { label: "Construction", value: 214, color: "#0066CC" },
            ],
        },
        housingOccupancy: {
            current: "9:1",
            predicted: "11:1 predicted by 2028",
            data: [
                { label: "Occupied", value: 90, color: "#0066CC" },
                { label: "Vacant", value: 10, color: "#E5E7EB" },
            ],
        },
        renterHomeowner: {
            current: "1:2",
            predicted: "1:2 predicted by 2028",
            data: [
                { label: "Renters", value: 33, color: "#E5E7EB" },
                { label: "Homeowner", value: 67, color: "#0066CC" },
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
                { label: "Under $25K", value: 12, color: "#0066CC" },
                { label: "$25K - $50K", value: 22, color: "#3B82F6" },
                { label: "$50K - $100K", value: 38, color: "#60A5FA" },
                { label: "$100K - $150K", value: 18, color: "#93C5FD" },
                { label: "Over $150K", value: 10, color: "#1E40AF" },
            ],
        },
        ageDemographics: {
            median: "41",
            estimate2028: "39",
            growthRate: -3,
            pieData: [
                { label: "Over 65", value: 18, color: "#8B5CF6" },
                { label: "Under 20", value: 18, color: "#A78BFA" },
                { label: "20 - 25", value: 12, color: "#C4B5FD" },
                { label: "25 - 45", value: 38, color: "#DDD6FE" },
                { label: "45 - 63", value: 14, color: "#EDE9FE" },
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
                { label: "Under $25K", value: 10, color: "#0066CC" },
                { label: "$25K - $50K", value: 20, color: "#3B82F6" },
                { label: "$50K - $100K", value: 40, color: "#60A5FA" },
                { label: "$100K - $150K", value: 20, color: "#93C5FD" },
                { label: "Over $150K", value: 10, color: "#1E40AF" },
            ],
        },
        ageDemographics: {
            median: "39",
            estimate2028: "37",
            growthRate: -3,
            pieData: [
                { label: "Over 65", value: 15, color: "#8B5CF6" },
                { label: "Under 20", value: 20, color: "#A78BFA" },
                { label: "20 - 25", value: 15, color: "#C4B5FD" },
                { label: "25 - 45", value: 40, color: "#DDD6FE" },
                { label: "45 - 63", value: 10, color: "#EDE9FE" },
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

const colorPalette = {
    primary: "#0066CC",
    secondary: "#8B5CF6",
    tertiary: "#FF6B00",
    neutralLight: "#E5E7EB",
    green: "#22C55E",
    red: "#EF4444",
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
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-semibold text-[#8B5CF6]">
                                Population
                            </h3>
                            <div className="text-3xl font-bold text-gray-900">
                                {data.population.current}
                            </div>
                        </div>
                        <div className="flex items-center gap-4 mb-2">
                            <div className="flex items-center gap-1.5">
                                <TrendingUp
                                    className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                                        data.population.growth2019 > 0
                                            ? "text-green-600"
                                            : data.population.growth2019 < 0
                                            ? "text-red-600 rotate-180"
                                            : "text-gray-400"
                                    }`}
                                />
                                <span
                                    className={`text-xs font-semibold ${
                                        data.population.growth2019 > 0
                                            ? "text-green-600"
                                            : data.population.growth2019 < 0
                                            ? "text-red-600"
                                            : "text-gray-600"
                                    }`}
                                >
                                    {data.population.growth2019 > 0
                                        ? "↑"
                                        : data.population.growth2019 < 0
                                        ? "↓"
                                        : ""}
                                    {Math.abs(data.population.growth2019)}%
                                </span>
                                <span className="text-xs text-gray-600">
                                    vs {data.population.value2019} in 2019
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <TrendingUp
                                    className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                                        data.population.growth2022 > 0
                                            ? "text-green-600"
                                            : data.population.growth2022 < 0
                                            ? "text-red-600 rotate-180"
                                            : "text-gray-400"
                                    }`}
                                />
                                <span
                                    className={`text-xs font-semibold ${
                                        data.population.growth2022 > 0
                                            ? "text-green-600"
                                            : data.population.growth2022 < 0
                                            ? "text-red-600"
                                            : "text-gray-600"
                                    }`}
                                >
                                    {data.population.growth2022 > 0
                                        ? "↑"
                                        : data.population.growth2022 < 0
                                        ? "↓"
                                        : ""}
                                    {Math.abs(data.population.growth2022)}%
                                </span>
                                <span className="text-xs text-gray-600">
                                    vs {data.population.value2022} in 2022
                                </span>
                            </div>
                        </div>
                        <div className="w-full h-40">
                            <LineChart
                                data={data.population.chartData}
                                height={160}
                                color="#0066CC"
                                formatValue={(val) => val.toLocaleString()}
                                compact={true}
                                showArea={true}
                            />
                        </div>
                    </div>
                </div>

                {/* Household Income Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-semibold text-[#8B5CF6]">
                                Household Income
                            </h3>
                            <div className="flex items-baseline gap-3">
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-gray-900">
                                        {data.householdIncome.median}
                                    </div>
                                    <div className="text-xs text-gray-600">
                                        Median
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-semibold text-gray-900">
                                        {data.householdIncome.estimate2028}
                                    </div>
                                    <div className="text-xs text-gray-600">
                                        2028 Est.
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <TrendingUp
                                        className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                                            data.householdIncome.growthRate >= 0
                                                ? "text-green-600"
                                                : "text-red-600 rotate-180"
                                        }`}
                                    />
                                    <div className="text-right">
                                        <div
                                            className={`text-xs font-semibold ${
                                                data.householdIncome
                                                    .growthRate >= 0
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }`}
                                        >
                                            {data.householdIncome.growthRate > 0
                                                ? "↑"
                                                : data.householdIncome
                                                      .growthRate < 0
                                                ? "↓"
                                                : ""}
                                            {Math.abs(
                                                data.householdIncome.growthRate
                                            )}
                                            %
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            Growth
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-center">
                            <PieChart
                                data={data.householdIncome.pieData.map(
                                    (item) => ({
                                        ...item,
                                        color:
                                            item.color || colorPalette.primary,
                                    })
                                )}
                                size={180}
                                showLegend={false}
                            />
                        </div>
                    </div>
                </div>

                {/* Age Demographics Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-semibold text-[#8B5CF6]">
                                Age Demographics
                            </h3>
                            <div className="flex items-baseline gap-3">
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-gray-900">
                                        {data.ageDemographics.median}
                                    </div>
                                    <div className="text-xs text-gray-600">
                                        Median Age
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-semibold text-gray-900">
                                        {data.ageDemographics.estimate2028}
                                    </div>
                                    <div className="text-xs text-gray-600">
                                        2028 Est.
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <TrendingUp
                                        className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                                            data.ageDemographics.growthRate >= 0
                                                ? "text-green-600"
                                                : "text-red-600 rotate-180"
                                        }`}
                                    />
                                    <div className="text-right">
                                        <div
                                            className={`text-xs font-semibold ${
                                                data.ageDemographics
                                                    .growthRate >= 0
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }`}
                                        >
                                            {data.ageDemographics.growthRate > 0
                                                ? "↑"
                                                : data.ageDemographics
                                                      .growthRate < 0
                                                ? "↓"
                                                : ""}
                                            {Math.abs(
                                                data.ageDemographics.growthRate
                                            )}
                                            %
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            Growth
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-center">
                            <PieChart
                                data={data.ageDemographics.pieData.map(
                                    (item) => ({
                                        ...item,
                                        color:
                                            item.color ||
                                            colorPalette.secondary,
                                    })
                                )}
                                size={180}
                                showLegend={false}
                            />
                        </div>
                    </div>
                </div>

                {/* Number of Employees Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-semibold text-[#8B5CF6]">
                                Number of Employees
                            </h3>
                            <div className="text-2xl font-bold text-gray-900">
                                {data.employees.total}
                            </div>
                        </div>
                        <div className="text-xs text-gray-600 mb-2">
                            Top Employment Categories
                        </div>
                        <div className="w-full h-48">
                            <HorizontalBarChart
                                data={data.employees.categories.map((item) => ({
                                    ...item,
                                    color: item.color || colorPalette.primary,
                                }))}
                                height={192}
                                showValues={true}
                            />
                        </div>
                    </div>
                </div>

                {/* Housing Occupancy Ratio Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-semibold text-[#0066CC]">
                                Housing Occupancy Ratio
                            </h3>
                            <div className="flex items-baseline gap-3">
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-gray-900">
                                        {data.housingOccupancy.current}
                                    </div>
                                </div>
                                <div className="text-xs text-gray-600">
                                    {data.housingOccupancy.predicted}
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-32">
                            <HorizontalBarChart
                                data={data.housingOccupancy.data.map(
                                    (item) => ({
                                        ...item,
                                        color:
                                            item.label === "Occupied"
                                                ? colorPalette.primary
                                                : colorPalette.neutralLight,
                                    })
                                )}
                                height={128}
                            />
                        </div>
                    </div>
                </div>

                {/* Renter to Homeowner Ratio Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-semibold text-[#0066CC]">
                                Renter to Homeowner Ratio
                            </h3>
                            <div className="flex items-baseline gap-3">
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-gray-900">
                                        {data.renterHomeowner.current}
                                    </div>
                                </div>
                                <div className="text-xs text-gray-600">
                                    {data.renterHomeowner.predicted}
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-32">
                            <HorizontalBarChart
                                data={data.renterHomeowner.data.map((item) => ({
                                    ...item,
                                    color:
                                        item.label === "Homeowner"
                                            ? colorPalette.primary
                                            : colorPalette.neutralLight,
                                }))}
                                height={128}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
