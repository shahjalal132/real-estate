import { Link } from '@inertiajs/react';

export default function MobileApp() {
    const features: string[] = [
        'Follow all your Marketplace opportunities',
        'Explore new assets',
        'Receive real-time diligence',
        'Receiving real-time alerts',
        'Taking part in the auction - anytime, anywhere!',
    ];

    return (
        <section className="py-16 bg-[#F5F5F5]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-[#333333] mb-2">The Marketplace App</h2>
                        <p className="text-lg text-[#666666] mb-4 uppercase">FIND YOUR NEXT INVESTMENT FROM ANYWHERE</p>
                        <p className="text-[#666666] mb-6">
                            Discover a better way to buy and sell commercial real estate with the new Marketplace app,
                            brought to you by the leading real estate platform.
                        </p>
                        <ul className="space-y-3 mb-8">
                            {features.map((feature, idx) => (
                                <li key={idx} className="flex items-start">
                                    <svg className="w-5 h-5 text-[#0066CC] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-[#333333]">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <Link
                            href="/app"
                            className="inline-block bg-[#0066CC] text-white px-8 py-3 rounded font-semibold hover:bg-[#004C99] transition-colors"
                        >
                            LEARN MORE
                        </Link>
                    </div>
                    <div className="flex justify-center">
                        {/* Phone Mockup Placeholder */}
                        <div className="relative w-64 h-[500px] bg-white rounded-[3rem] p-4 shadow-2xl">
                            <div className="w-full h-full bg-gray-200 rounded-[2.5rem] overflow-hidden">
                                <div className="w-full h-full bg-gradient-to-b from-[#0066CC] to-[#004C99] p-4">
                                    <div className="bg-white rounded-lg p-4 mb-4">
                                        <div className="h-32 bg-gray-300 rounded mb-2"></div>
                                        <p className="text-xs text-[#666666]">Property Listing</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

