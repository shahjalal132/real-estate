import BarChart from "./Charts/BarChart";
import PieChart from "./Charts/PieChart";

export default function Demographics() {
    const populationData = [
        { label: "2020", value: 13.2 },
        { label: "2021", value: 13.5 },
        { label: "2022", value: 13.7 },
        { label: "2023", value: 13.9 },
        { label: "2024", value: 14.1 },
    ];

    const incomeData = [
        { label: "2020", value: 82.5 },
        { label: "2021", value: 85.2 },
        { label: "2022", value: 87.5 },
        { label: "2023", value: 89.8 },
        { label: "2024", value: 92.1 },
    ];

    const ageDistribution = [
        { label: "18-34", value: 28 },
        { label: "35-54", value: 32 },
        { label: "55-64", value: 18 },
        { label: "65+", value: 22 },
    ];

    const employmentData = [
        { label: "Retail", value: 4500, color: "#0066CC" },
        { label: "Healthcare", value: 3200, color: "#0052A3" },
        { label: "Education", value: 2800, color: "#004080" },
        { label: "Manufacturing", value: 2100, color: "#003366" },
        { label: "Other", value: 2400, color: "#002244" },
    ];

    const housingOccupancy = [
        { label: "Occupied", value: 92, color: "#0066CC" },
        { label: "Vacant", value: 8, color: "#E5E7EB" },
    ];

    const businessOccupancy = [
        { label: "Occupied", value: 88, color: "#0066CC" },
        { label: "Vacant", value: 12, color: "#E5E7EB" },
    ];

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
                Demographics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Population */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Population</div>
                    <div className="text-2xl font-bold text-[#0066CC] mb-4">
                        13.9M
                    </div>
                    <BarChart
                        data={populationData.map((d) => ({
                            ...d,
                            value: d.value * 1000000,
                            color: "#0066CC",
                        }))}
                        height={150}
                    />
                </div>

                {/* Household Income */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">
                        Household Income (k)
                    </div>
                    <div className="text-2xl font-bold text-[#0066CC] mb-4">
                        $89.8k
                    </div>
                    <BarChart
                        data={incomeData.map((d) => ({
                            ...d,
                            value: d.value * 1000,
                            color: "#0052A3",
                        }))}
                        height={150}
                    />
                </div>

                {/* Age Demographics */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-4">
                        Age Demographics
                    </div>
                    <PieChart data={ageDistribution} size={180} />
                </div>

                {/* Employment */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">
                        Number of Employees
                    </div>
                    <div className="text-2xl font-bold text-[#0066CC] mb-4">
                        15,000
                    </div>
                    <BarChart data={employmentData} height={180} />
                </div>

                {/* Housing Occupancy */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-4">
                        Housing Occupancy Rate
                    </div>
                    <PieChart data={housingOccupancy} size={160} />
                </div>

                {/* Business Occupancy */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-4">
                        Business Occupancy Rate
                    </div>
                    <PieChart data={businessOccupancy} size={160} />
                </div>
            </div>
        </div>
    );
}
