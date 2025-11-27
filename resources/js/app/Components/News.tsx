import { Link } from '@inertiajs/react';

export default function News() {
    const newsItems: string[] = [
        '2026 Auction Calendar Is Here',
        '2025 Mid-Year Auction Report',
        'Auctions 101 with Steven Silverman',
        'The 2025 Auction Calendar Is Here',
        'Q2 CRE Auction Report - Latest Stats from Around the Country',
        'Q1 CRE Auction Report - Vital Insights from the Midwest and Beyond',
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-[#333333]">Latest Marketplace News</h2>
                    <Link
                        href="/news"
                        className="bg-[#0066CC] text-white px-8 py-2 rounded font-semibold hover:bg-[#004C99] transition-colors"
                    >
                        VIEW ALL ARTICLES
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {newsItems.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                        >
                            <h3 className="text-lg font-semibold text-[#333333] mb-2">{item}</h3>
                            <Link href={`/news/${idx + 1}`} className="text-[#0066CC] font-semibold hover:text-[#004C99]">
                                Read more →
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

