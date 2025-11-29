interface Feature {
    icon: string;
    title: string;
    description: string;
}

interface FeaturesProps {
    features?: Feature[];
}

export default function Features({ features = [] }: FeaturesProps) {
    const defaultFeatures: Feature[] = [
        {
            icon: "📄",
            title: "PROMOTE PRIME ASSETS WITH CLASSIC AUCTIONS",
            description: "Showcase your premium properties",
        },
        {
            icon: "📢",
            title: "FAST-TRACK TRADES WITH ABSOLUTE AUCTIONS",
            description: "Real-time auction management",
        },
        {
            icon: "⚙️",
            title: "TAILOR YOUR TACTICS WITH CUSTOM AUCTIONS",
            description: "Customizable auction strategies",
        },
        {
            icon: "🏢",
            title: "CENTRALIZE SALES WITH MARKETPLACE LISTINGS",
            description: "Unified sales platform",
        },
    ];

    const displayFeatures = features.length > 0 ? features : defaultFeatures;

    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[#0066CC]/20 to-transparent"></div>

            <div className="w-[95%] max-w-full mx-auto px-4 sm:px-6 lg:px-2">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#333333] mb-4">
                        With Us You Can
                    </h2>
                    <div className="w-24 h-1 bg-[#0066CC] mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayFeatures.map((feature, idx) => (
                        <div
                            key={idx}
                            className="group relative bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-[#0066CC]/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                        >
                            {/* Hover effect background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#0066CC]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <div className="relative z-10">
                                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-base font-bold text-[#333333] mb-3 leading-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-[#666666] leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Arrow indicator on hover */}
                                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="inline-flex items-center gap-2 text-[#0066CC] font-semibold text-sm">
                                        Learn More
                                        <svg
                                            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
