interface Auction {
    id: number;
    title: string;
    auctionDates: string;
    startingBid: string;
    description: string;
    location: string;
    image: string;
}

export default function FeaturedAuctions() {
    const auctions: Auction[] = [
        {
            id: 1,
            title: "Classic Auction - Fairfield",
            auctionDates: "Dec 15 to Dec 17",
            startingBid: "$1,250,000",
            description:
                "Institutional Seller | Fairfield Inn & Suites Greeley",
            location: "Greeley, Colorado",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
        },
        {
            id: 2,
            title: "Classic Auction - Holiday",
            auctionDates: "Dec 15 to Dec 17",
            startingBid: "$2,900,000",
            description:
                "Institutional Seller | Holiday Inn Express & Suites Terrell",
            location: "Terrell, Texas",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
        },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-[#333333]">
                        Featured Auctions
                    </h2>
                    <div className="flex items-center space-x-4">
                        <button className="text-[#0066CC] hover:text-[#004C99] font-medium">
                            PREVIOUS
                        </button>
                        <button className="text-[#0066CC] hover:text-[#004C99] font-medium">
                            NEXT
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {auctions.map((auction) => (
                        <div
                            key={auction.id}
                            className="bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-shadow overflow-hidden"
                        >
                            <div className="relative h-48 bg-gray-200">
                                <img
                                    src={auction.image}
                                    alt={auction.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 left-2 bg-[#0066CC] text-white px-3 py-1 text-xs font-semibold rounded">
                                    FOR SALE / BID NOW
                                </div>
                                <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100">
                                    <svg
                                        className="w-5 h-5 text-gray-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-4">
                                <p className="text-xs text-[#666666] uppercase mb-2">
                                    {auction.title}
                                </p>
                                <p className="text-sm text-[#666666] mb-2">
                                    Auction: {auction.auctionDates}
                                </p>
                                <p className="text-lg font-bold text-[#0066CC] mb-2">
                                    Starting Bid: {auction.startingBid}
                                </p>
                                <p className="text-sm text-[#333333] mb-1">
                                    {auction.description}
                                </p>
                                <p className="text-sm text-[#666666]">
                                    {auction.location}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
