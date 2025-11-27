interface AuctionDate {
    label: string;
    day: string;
}

export default function Hero() {
    const auctionDates: AuctionDate[] = [
        { label: 'DEC 10', day: 'Monday' },
        { label: 'DEC 11', day: 'Wednesday' },
        { label: 'DEC 17', day: 'Monday' },
    ];

    return (
        <section className="relative h-[600px] overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0066CC] from-0% via-[#0066CC]/80 via-40% to-transparent to-100% z-10" />
                <div className="absolute inset-0 bg-gray-300">
                    {/* Placeholder for city skyline image */}
                    <div className="w-full h-full bg-gradient-to-r from-blue-400 to-blue-600 opacity-50" />
                </div>
            </div>

            {/* Content */}
            <div className="relative z-20 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-2xl">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
                            Find Your Next Investment
                        </h1>

                        {/* Search Bar */}
                        <div className="bg-white rounded p-2 flex items-center mb-6">
                            <input
                                type="text"
                                placeholder="Search Location, Asset Type, Property Type, Keyword"
                                className="flex-1 px-4 py-3 text-gray-700 focus:outline-none"
                            />
                            <button className="bg-[#0066CC] text-white px-8 py-3 rounded font-semibold hover:bg-[#004C99] transition-colors">
                                SEARCH
                            </button>
                        </div>

                        {/* Auction Dates */}
                        <div className="flex items-center space-x-4">
                            <span className="text-white text-sm font-medium">Our Auction Dates</span>
                            <div className="flex space-x-3">
                                {auctionDates.map((date, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded text-sm"
                                    >
                                        {date.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

