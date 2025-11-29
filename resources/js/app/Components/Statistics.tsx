import { Link } from '@inertiajs/react';
import { Users, TrendingUp, BarChart3, ArrowRight } from 'lucide-react';

interface StatCard {
    icon: React.ComponentType<{ className?: string }>;
    number: string;
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
}

export default function Statistics() {
    const stats: StatCard[] = [
        {
            icon: Users,
            number: '100,000+',
            title: 'Investors',
            description: 'Our platform has grown to over 100,000 active investors, creating the largest network of qualified buyers in commercial real estate.',
            ctaText: 'View investor network',
            ctaLink: '/investors',
        },
        {
            icon: TrendingUp,
            number: '$5B+',
            title: 'Transacted',
            description: 'Total transaction volume exceeds $5 billion, demonstrating the platform\'s ability to facilitate large-scale commercial real estate deals.',
            ctaText: 'See transaction data',
            ctaLink: '/transactions',
        },
        {
            icon: BarChart3,
            number: '75%',
            title: 'Industry Leading Trade Rate',
            description: 'Our auction platform achieves a 75% trade rate, significantly higher than industry averages, ensuring successful property sales.',
            ctaText: 'Learn about our success',
            ctaLink: '/success-stories',
        },
    ];

    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-[#333333] mb-2">The Right Place To Transact</h2>
                    <p className="text-lg text-gray-400">THE AUCTION PLATFORM THAT ACHIEVES POWERFUL RESULTS</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, idx) => {
                        const IconComponent = stat.icon;
                        return (
                            <div
                                key={idx}
                                className="rounded-lg overflow-hidden bg-white"
                            >
                                {/* Upper Section - Brand Color */}
                                <div className="bg-[#0066CC] text-white p-8">
                                    <div className="mb-6">
                                        <IconComponent className="h-8 w-8" />
                                    </div>
                                    <div className="text-5xl font-bold mb-2">{stat.number}</div>
                                    <div className="text-xl font-semibold mb-4">{stat.title}</div>
                                    <p className="text-sm text-white/90 leading-relaxed">{stat.description}</p>
                                </div>

                                {/* Lower Section - Dark Gray CTA */}
                                <div className="bg-gray-800 px-6 py-4">
                                    <Link
                                        href={stat.ctaLink}
                                        className="flex items-center gap-2 text-white text-sm font-medium hover:text-gray-300 transition-colors"
                                    >
                                        <span>{stat.ctaText}</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

