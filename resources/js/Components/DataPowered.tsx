import { Link } from "@inertiajs/react";
import { TrendingUp, BarChart3, PieChart, ArrowRight } from "lucide-react";

interface DataPoweredContent {
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
}

interface DataPoweredProps {
    content?: DataPoweredContent;
}

export default function DataPowered({ content }: DataPoweredProps) {
    const defaultContent: DataPoweredContent = {
        title: "Data-Powered Investing",
        description:
            "Gain an advantage over competitors. With data-backed market insights, real-time property valuations, industry news, and more, we'll help you make smarter decisions.",
        ctaText: "EXPLORE INSIGHTS",
        ctaLink: "/insights",
    };

    const dataContent = content || defaultContent;

    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#0066CC]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFE5CC]/20 rounded-full blur-3xl"></div>

            <div className="w-[95%] max-w-full mx-auto px-4 sm:px-6 lg:px-2 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <div className="inline-block">
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#0066CC]/10 text-[#0066CC] rounded-full text-sm font-semibold">
                                <TrendingUp className="w-4 h-4" />
                                Market Intelligence
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#333333] leading-tight">
                            {dataContent.title}
                        </h2>
                        <p className="text-lg text-[#666666] leading-relaxed">
                            {dataContent.description}
                        </p>
                        <Link
                            href={dataContent.ctaLink}
                            className="inline-flex items-center gap-2 bg-[#0066CC] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#004C99] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
                        >
                            {dataContent.ctaText}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {/* Chart Card 1 */}
                        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-[#0066CC]/10 rounded-lg">
                                    <BarChart3 className="w-6 h-6 text-[#0066CC]" />
                                </div>
                            </div>
                            <div className="h-32 bg-gradient-to-t from-[#0066CC] via-[#3399FF] to-[#66B2FF] rounded-lg mb-4 flex items-end justify-center p-4">
                                <div className="w-full bg-white/30 rounded-t-lg h-[70%] flex items-center justify-center">
                                    <span className="text-white font-bold text-2xl">
                                        10.9%
                                    </span>
                                </div>
                            </div>
                            <p className="text-sm font-semibold text-[#333333] mb-1">
                                Commercial Markets Index
                            </p>
                            <p className="text-xs text-[#666666]">Q4 2024</p>
                        </div>

                        {/* Chart Card 2 */}
                        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-[#FFE5CC] rounded-lg">
                                    <PieChart className="w-6 h-6 text-[#FF6B00]" />
                                </div>
                            </div>
                            <div className="h-32 bg-gradient-to-br from-[#FF6B00] via-[#FF8533] to-[#FFE5CC] rounded-lg mb-4 flex items-center justify-center">
                                <div className="text-center">
                                    <p className="text-white font-bold text-xl">
                                        $2.5B
                                    </p>
                                    <p className="text-white/80 text-xs mt-1">
                                        Volume
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm font-semibold text-[#333333] mb-1">
                                Market Economics
                            </p>
                            <p className="text-xs text-[#666666]">
                                New York Metro
                            </p>
                        </div>

                        {/* Chart Card 3 - Full Width */}
                        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 col-span-2">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-[#0066CC]/10 rounded-lg">
                                    <TrendingUp className="w-6 h-6 text-[#0066CC]" />
                                </div>
                                <span className="text-xs text-green-600 font-semibold">
                                    +12.3% ↗
                                </span>
                            </div>
                            <div className="h-24 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded-lg mb-4 relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="flex items-end gap-2 h-full px-4 pb-2">
                                        {[40, 60, 45, 75, 55, 80, 65].map(
                                            (height, idx) => (
                                                <div
                                                    key={idx}
                                                    className="bg-gradient-to-t from-[#0066CC] to-[#3399FF] rounded-t flex-1"
                                                    style={{
                                                        height: `${height}%`,
                                                    }}
                                                ></div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm font-semibold text-[#333333] mb-1">
                                Sales Comps Trend
                            </p>
                            <p className="text-xs text-[#666666]">
                                Last 7 quarters
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
