import { Link } from "@inertiajs/react";
import { Calendar, FileText, ArrowRight, TrendingUp } from "lucide-react";

interface NewsItem {
    title: string;
    slug: string;
}

interface NewsProps {
    news?: NewsItem[];
}

export default function News({ news = [] }: NewsProps) {
    const defaultNews: NewsItem[] = [
        {
            title: "2026 Auction Calendar Is Here",
            slug: "2026-auction-calendar",
        },
        {
            title: "2025 Mid-Year Auction Report",
            slug: "2025-mid-year-auction-report",
        },
        {
            title: "Auctions 101 with Steven Silverman",
            slug: "auctions-101-steven-silverman",
        },
        {
            title: "The 2025 Auction Calendar Is Here",
            slug: "2025-auction-calendar",
        },
        {
            title: "Q2 CRE Auction Report - Latest Stats from Around the Country",
            slug: "q2-cre-auction-report",
        },
        {
            title: "Q1 CRE Auction Report - Vital Insights from the Midwest and Beyond",
            slug: "q1-cre-auction-report",
        },
    ];

    const newsItems = news.length > 0 ? news : defaultNews;

    const getIcon = (idx: number) => {
        const icons = [Calendar, FileText, TrendingUp];
        return icons[idx % icons.length];
    };

    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
            {/* Background decorative element */}
            <div className="absolute top-20 right-0 w-72 h-72 bg-[#0066CC]/5 rounded-full blur-3xl"></div>

            <div className="w-[95%] max-w-full mx-auto px-4 sm:px-6 lg:px-2 relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#333333] mb-2">
                            Latest Marketplace News
                        </h2>
                        <p className="text-[#666666]">
                            Stay informed with industry insights
                        </p>
                    </div>
                    <Link
                        href="/news"
                        className="inline-flex items-center gap-2 bg-[#0066CC] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#004C99] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
                    >
                        VIEW ALL ARTICLES
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {newsItems.slice(0, 6).map((item, idx) => {
                        const Icon = getIcon(idx);
                        return (
                            <Link
                                key={idx}
                                href={`/news/${item.slug}`}
                                className="group bg-white rounded-xl border border-gray-200 hover:border-[#0066CC]/30 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                            >
                                {/* Image placeholder with gradient */}
                                <div className="relative h-48 bg-gradient-to-br from-[#0066CC] via-[#3399FF] to-[#66B2FF] overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Icon className="w-16 h-16 text-white/30" />
                                    </div>
                                    {/* Date badge */}
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                        <span className="text-xs font-semibold text-[#0066CC]">
                                            {new Date().toLocaleDateString(
                                                "en-US",
                                                {
                                                    month: "short",
                                                    day: "numeric",
                                                }
                                            )}
                                        </span>
                                    </div>
                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-[#0066CC]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-[#333333] mb-3 line-clamp-2 group-hover:text-[#0066CC] transition-colors">
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-[#0066CC] font-semibold text-sm">
                                        Read Article
                                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
