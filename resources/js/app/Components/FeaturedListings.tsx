import { Link } from '@inertiajs/react';

interface Listing {
    id: number;
    title: string;
    askingPrice: string;
    description: string;
    location: string;
    image: string;
}

export default function FeaturedListings() {
    const listings: Listing[] = [
        {
            id: 1,
            title: 'Marketplace Listing - Normandy',
            askingPrice: 'Undisclosed',
            description: 'REO: Leola 640 | 295 Unit Multifamily + Retail | Philadelphia, PA',
            location: 'Philadelphia, Pennsylvania',
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
        },
        {
            id: 2,
            title: 'Marketplace Listing - Normandy',
            askingPrice: '$10,000,000',
            description: 'REO Sale | Hillside Manor Apt Resort | 218 Units | 71% Occupied | Ph...',
            location: 'Clinton, Pennsylvania',
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
        },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-[#333333]">Featured Listings</h2>
                    <Link
                        href="/listings"
                        className="bg-[#0066CC] text-white px-8 py-2 rounded font-semibold hover:bg-[#004C99] transition-colors"
                    >
                        VIEW ALL LISTINGS
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {listings.map((listing) => (
                        <div
                            key={listing.id}
                            className="bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-shadow overflow-hidden"
                        >
                            <div className="relative h-48 bg-gray-200">
                                <img
                                    src={listing.image}
                                    alt={listing.title}
                                    className="w-full h-full object-cover"
                                />
                                <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100">
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-4">
                                <p className="text-xs text-[#666666] uppercase mb-2">{listing.title}</p>
                                <p className="text-lg font-bold text-[#0066CC] mb-2">Asking Price: {listing.askingPrice}</p>
                                <p className="text-sm text-[#333333] mb-1">{listing.description}</p>
                                <p className="text-sm text-[#666666]">{listing.location}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

