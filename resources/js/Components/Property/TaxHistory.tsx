import BarChart from "./Charts/BarChart";

export default function TaxHistory() {
    const taxData = [
        { label: "2020", value: 38500, color: "#0066CC" },
        { label: "2021", value: 40100, color: "#0066CC" },
        { label: "2022", value: 41500, color: "#0066CC" },
        { label: "2023", value: 43150, color: "#0066CC" },
        { label: "2024", value: 45230, color: "#0052A3" },
    ];

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
                Tax History
            </h2>

            {/* Tax Assessment Chart */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Tax Assessment Trend (5 Years)
                </h3>
                <div className="bg-gray-50 rounded-lg p-6">
                    <BarChart data={taxData} height={250} />
                </div>
            </div>

            {/* Tax Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {taxData.map((year, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                        <div className="text-sm text-gray-600 mb-2">
                            {year.label} Tax Assessment
                        </div>
                        <div className="text-2xl font-bold text-[#0066CC]">
                            ${year.value.toLocaleString()}
                        </div>
                        {index < taxData.length - 1 && (
                            <div className="text-xs text-gray-500 mt-2">
                                {year.value < taxData[index + 1].value
                                    ? `↑ +${(
                                          ((taxData[index + 1].value -
                                              year.value) /
                                              year.value) *
                                          100
                                      ).toFixed(1)}%`
                                    : `↓ ${(
                                          ((year.value -
                                              taxData[index + 1].value) /
                                              year.value) *
                                          100
                                      ).toFixed(1)}%`}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
