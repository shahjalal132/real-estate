import { Link } from '@inertiajs/react';

interface Stat {
    number: string;
    label: string;
}

interface Benefit {
    title: string;
    description: string;
    link: string;
}

export default function Statistics() {
    const stats: Stat[] = [
        { number: '100,000+', label: 'Investors' },
        { number: '$5B+', label: 'Transacted' },
        { number: '75%', label: 'Industry Leading Trade Rate' },
    ];

    const benefits: Benefit[] = [
        {
            title: 'Sellers',
            description: 'Reach a wider pool of qualified investors and close sooner with greater certainty of execution than traditional listing processes.',
            link: '/sell-with-us',
        },
        {
            title: 'Buyers',
            description: 'Find exclusive investment opportunities and gain insights that are not on the open market.',
            link: '/buyers',
        },
        {
            title: 'Brokers',
            description: 'Earn your fee & increase by using Marketplace to streamline the sales process and drive value for your clients.',
            link: '/brokers',
        },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-[#333333] mb-2">The Right Place To Transact</h2>
                    <p className="text-lg text-[#666666]">THE AUCTION PLATFORM THAT ACHIEVES POWERFUL RESULTS</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {stats.map((stat, idx) => (
                        <div
                            key={idx}
                            className="bg-[#0066CC] text-white rounded-lg p-12 text-center"
                        >
                            <div className="text-5xl font-bold mb-4">{stat.number}</div>
                            <div className="text-lg">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {benefits.map((benefit, idx) => (
                        <div key={idx}>
                            <h3 className="text-xl font-semibold text-[#333333] mb-3">{benefit.title}</h3>
                            <p className="text-[#666666] mb-4">{benefit.description}</p>
                            <Link
                                href={benefit.link}
                                className="text-[#0066CC] font-semibold hover:text-[#004C99] underline"
                            >
                                LEARN MORE →
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

