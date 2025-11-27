import { Link } from '@inertiajs/react';

export default function DataPowered() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-[#333333] mb-4">Data-Powered Investing</h2>
                        <p className="text-lg text-[#666666] mb-6">
                            Gain an advantage over competitors. With data-backed market insights, real-time property
                            valuations, industry news, and more, we'll help you make smarter decisions.
                        </p>
                        <Link
                            href="/insights"
                            className="inline-block bg-[#0066CC] text-white px-8 py-3 rounded font-semibold hover:bg-[#004C99] transition-colors"
                        >
                            EXPLORE INSIGHTS
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Placeholder for charts/graphs */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="h-32 bg-gradient-to-t from-[#0066CC] to-[#3399FF] rounded mb-2"></div>
                            <p className="text-sm font-semibold text-[#333333]">10.9%</p>
                            <p className="text-xs text-[#666666]">Commercial Markets Index</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="h-32 bg-gradient-to-t from-[#FF6B00] to-[#FFE5CC] rounded mb-2"></div>
                            <p className="text-sm font-semibold text-[#333333]">Market Economics</p>
                            <p className="text-xs text-[#666666]">New York</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
                            <div className="h-24 bg-gray-100 rounded mb-2"></div>
                            <p className="text-sm font-semibold text-[#333333]">Sales Comps</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

