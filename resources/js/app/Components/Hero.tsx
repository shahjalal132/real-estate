import { Search } from "lucide-react";

interface AuctionDate {
    label: string;
}

const auctionDates: AuctionDate[] = [
    { label: "DEC 10" },
    { label: "DEC 11" },
    { label: "DEC 17" },
];

export default function Hero() {
    return (
        <section className="relative isolate overflow-hidden min-h-[480px] max-h-[480px]">
            {/* background image */}
            <img
                src="/assets/images/home-summer-extended.webp"
                alt="City skyline representing investment opportunities"
                className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/15" />
            {/* gradient wedge */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-[#0066CC] via-[#0B74D8] to-[#0F6BD0]"
                style={{ clipPath: "polygon(0 0, 45% 0, 65% 100%, 0% 100%)" }}
            />
            {/* <div className="absolute top-0 bottom-0 left-[58%] w-12 bg-gradient-to-b from-[#F7931E] to-[#F05C22] skew-x-[-10deg]" /> */}

            {/* Content div */}
            <div className="relative z-10 w-[93%] mx-auto flex items-center min-h-[480px] py-10 lg:py-14">
                <div className="max-w-2xl text-white">
                    <h1 className="text-2xl lg:text-[40px] mb-4 capitalize font-normal leading-tight">
                        Find Your Next Investment
                    </h1>

                    {/* search */}
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col sm:flex-row sm:items-stretch bg-white/10 rounded-lg p-2 gap-2 shadow-lg shadow-black/20 backdrop-blur">
                            <div className="flex items-center bg-white rounded-md px-4 py-3 flex-1">
                                <Search className="w-4 h-4 text-[#0F6BD0] mr-3" />
                                <input
                                    type="text"
                                    placeholder="Name, Location, Asset Type, Property Type, Keywords"
                                    className="flex-1 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
                                />
                            </div>
                            <button className="bg-[#0F2343] text-white px-10 py-3 rounded-md text-sm tracking-[0.4em] uppercase font-semibold hover:bg-[#143560] transition-colors">
                                Search
                            </button>
                        </div>
                    </div>

                    {/* auction dates */}
                    <div className="space-y-3">
                        <p className="text-base sm:text-lg font-semibold tracking-wide">
                            Our Auction Dates
                        </p>
                        <div className="flex items-center gap-5">
                            {auctionDates.map((date) => (
                                <div
                                    key={date.label}
                                    className="flex flex-col items-center text-white/90 uppercase tracking-[0.3em]"
                                >
                                    <span className="text-xl font-semibold">
                                        {date.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
