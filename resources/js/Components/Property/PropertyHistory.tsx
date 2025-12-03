import LineChart from "./Charts/LineChart";

export default function PropertyHistory() {
    const saleHistory = [
        { label: "2004", value: 2500000 },
        { label: "2006", value: 3725000 },
        { label: "2010", value: 3200000 },
        { label: "2015", value: 4100000 },
        { label: "2020", value: 4850000 },
        { label: "2024", value: 5500000 },
    ];

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
                Property History
            </h2>

            {/* Sale History Chart */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Sale History Trend
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                    <LineChart data={saleHistory} height={250} />
                </div>
            </div>

            {/* Recent Sales */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Recent Sales
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="text-sm text-gray-600 mb-2">
                            Latest Sale
                        </div>
                        <div className="text-2xl font-bold text-[#0066CC] mb-1">
                            $5,500,000
                        </div>
                        <div className="text-sm text-gray-500">03/15/2024</div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="text-sm text-gray-600 mb-2">
                            Previous Sale
                        </div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                            $4,850,000
                        </div>
                        <div className="text-sm text-gray-500">08/22/2020</div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="text-sm text-gray-600 mb-2">
                            Sale (2015)
                        </div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                            $4,100,000
                        </div>
                        <div className="text-sm text-gray-500">11/10/2015</div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="text-sm text-gray-600 mb-2">
                            Sale (2006)
                        </div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                            $3,725,000
                        </div>
                        <div className="text-sm text-gray-500">10/19/2006</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
