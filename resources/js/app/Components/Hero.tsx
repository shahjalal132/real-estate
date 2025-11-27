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
                style={{ clipPath: "polygon(0 0, 65% 0, 45% 100%, 0% 100%)" }}
            />
            {/* <div className="absolute top-0 bottom-0 left-[58%] w-12 bg-gradient-to-b from-[#F7931E] to-[#F05C22] skew-x-[-10deg]" /> */}

            {/* Content div */}
            <div className="relative z-10 w-[93%] mx-auto flex items-center min-h-[480px] py-10 lg:py-14">
                <div className="min-w-2xl max-w-2xl text-white">
                    <h1 className="text-2xl lg:text-[40px] mb-4 capitalize font-normal leading-tight">
                        Find Your Next Investment
                    </h1>

                    {/* search */}
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col sm:flex-row sm:items-stretch bg-white p-2 gap-2 shadow-lg shadow-black/20 backdrop-blur">
                            <div className="flex items-center bg-white rounded-md px-4 py-3 flex-1">
                                <Search className="w-4 h-4 text-[#0F6BD0] mr-3" />
                                <input
                                    type="text"
                                    placeholder="Name, Location, Asset Type, Property Type, Keywords"
                                    className="flex-1 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
                                />
                            </div>
                            <button className="bg-[#0F2343] text-white px-5 py-2 text-sm uppercase hover:bg-[#143560] transition-colors">
                                Search
                            </button>
                        </div>
                    </div>

                    {/* auction dates */}
                    <div className="mt-8">
                        <h2 className="text-[35px] font-medium capitalize">
                            Our Auction Dates
                        </h2>
                        <div className="flex max-w-lg mt-5 items-center justify-between gap-10">
                            {auctionDates.map((date) => (
                                <div
                                    key={date.label}
                                    className="flex flex-col items-center text-white uppercase "
                                >
                                    <span className="text-2xl font-semibold">
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
