interface Feature {
    icon: string;
    title: string;
    description: string;
}

export default function Features() {
    const features: Feature[] = [
        {
            icon: '📄',
            title: 'PROMOTE PRIME ASSETS WITH CLASSIC AUCTIONS',
            description: 'Showcase your premium properties',
        },
        {
            icon: '📢',
            title: 'FAST-TRACK TRADES WITH ABSOLUTE AUCTIONS',
            description: 'Real-time auction management',
        },
        {
            icon: '⚙️',
            title: 'TAILOR YOUR TACTICS WITH CUSTOM AUCTIONS',
            description: 'Customizable auction strategies',
        },
        {
            icon: '🏢',
            title: 'CENTRALIZE SALES WITH MARKETPLACE LISTINGS',
            description: 'Unified sales platform',
        },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-[#333333] text-center mb-12">With Us You Can</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="text-center">
                            <div className="text-5xl mb-4">{feature.icon}</div>
                            <h3 className="text-lg font-semibold text-[#333333] mb-2">{feature.title}</h3>
                            <p className="text-sm text-[#666666]">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

