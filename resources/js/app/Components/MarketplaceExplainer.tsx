export default function MarketplaceExplainer() {
    return (
        <section className="relative py-20 bg-[#0066CC] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-8">
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
                        WHAT IS <span className="block">R MARKETPLACE?</span>
                    </h2>
                    <p className="text-lg text-[#FFE5CC] max-w-3xl mx-auto">
                        The auction platform with the highest trade rate in the industry - explained
                    </p>
                </div>

                {/* Video Player Placeholder */}
                <div className="relative max-w-4xl mx-auto">
                    <div className="aspect-video bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/30 transition-colors">
                                <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                            <p className="text-white font-semibold">WATCH ON YouTube</p>
                        </div>
                    </div>
                </div>

                {/* Dashboard Preview Elements (overlay) */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 right-10 w-64 h-48 bg-white/10 backdrop-blur-sm rounded-lg p-4 transform rotate-3">
                        <div className="text-white text-xs">
                            <p className="font-semibold mb-2">Starting Bid: $1,250,000</p>
                            <p className="mb-1">Sold Price: $1,500,000</p>
                            <p className="mb-1">Trade Rate: 120%</p>
                            <p className="mb-1">Days on Market: 32</p>
                            <p>Total Bids: 101</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

