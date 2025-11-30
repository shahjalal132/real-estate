import { Play } from "lucide-react";

interface MarketplaceExplainerContent {
    title: string;
    subtitle: string;
    videoUrl: string | null;
    videoThumbnail: string | null;
}

interface MarketplaceExplainerProps {
    content?: MarketplaceExplainerContent;
}

export default function MarketplaceExplainer({
    content,
}: MarketplaceExplainerProps) {
    const defaultContent: MarketplaceExplainerContent = {
        title: "WHAT IS\nR MARKETPLACE?",
        subtitle:
            "The auction platform with the highest trade rate in the industry - explained",
        videoUrl: null,
        videoThumbnail: null,
    };

    const explainerContent = content || defaultContent;

    // Use provided thumbnail or fallback to placeholder
    const videoThumbnail =
        explainerContent.videoThumbnail ||
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80&auto=format&fit=crop";

    return (
        <section className="relative py-24 bg-gradient-to-br from-[#0066CC] via-[#0052A3] to-[#004080] overflow-hidden">
            {/* Enhanced Animated background elements */}
            <div className="absolute inset-0">
                {/* Primary gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0066CC]/90 via-[#0052A3]/95 to-[#004080]/90"></div>

                {/* Floating orbs with animation */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-white/8 rounded-full blur-3xl animate-pulse"></div>
                <div
                    className="absolute bottom-20 right-10 w-96 h-96 bg-[#FFE5CC]/15 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "1s" }}
                ></div>
                <div
                    className="absolute top-1/2 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "2s" }}
                ></div>
                <div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#FFE5CC]/10 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "1.5s" }}
                ></div>

                {/* Light rays effect for enhanced depth */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
                    <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
                    <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                    <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                </div>

                {/* Additional decorative circles */}
                <div className="absolute top-1/3 right-1/3 w-32 h-32 border border-white/10 rounded-full"></div>
                <div className="absolute bottom-1/3 left-1/3 w-24 h-24 border border-white/10 rounded-full"></div>
            </div>

            {/* Enhanced Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            ></div>

            {/* Radial gradient overlay for enhanced depth */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    background:
                        "radial-gradient(circle at center, transparent 0%, rgba(0, 64, 128, 0.4) 100%)",
                }}
            ></div>

            {/* Additional subtle pattern */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage:
                        "repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.1) 1deg, transparent 2deg, rgba(255,255,255,0.1) 3deg)",
                    backgroundSize: "200px 200px",
                }}
            ></div>

            <div className="w-[95%] max-w-full mx-auto px-4 sm:px-6 lg:px-2 relative z-10">
                <div className="text-center mb-12">
                    <div className="inline-block mb-6">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold border border-white/30">
                            🎯 Industry Leader
                        </span>
                    </div>

                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                        {explainerContent.title
                            .split("\n")
                            .map((line, idx, arr) => (
                                <span key={idx}>
                                    {line}
                                    {idx < arr.length - 1 && (
                                        <span className="block" />
                                    )}
                                </span>
                            ))}
                    </h2>

                    <p className="text-xl md:text-2xl text-[#FFE5CC] max-w-4xl mx-auto leading-relaxed font-medium drop-shadow-md">
                        {explainerContent.subtitle}
                    </p>
                </div>

                {/* Enhanced Video Player with Thumbnail */}
                <div className="relative max-w-5xl mx-auto">
                    <div className="aspect-video rounded-2xl border-2 border-white/30 shadow-2xl overflow-hidden group hover:border-white/50 transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,255,255,0.3)]">
                        {/* Video thumbnail background */}
                        <div className="absolute inset-0">
                            <img
                                src={videoThumbnail}
                                alt="R Marketplace Video"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            {/* Gradient overlay for better text visibility */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#004080]/90 via-[#0066CC]/70 to-[#0066CC]/50"></div>

                            {/* Animated overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#0066CC]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        {/* Play button with enhanced glow effect */}
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <button className="group/play relative">
                                {/* Outer glow rings */}
                                <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-30 group-hover/play:opacity-50 group-hover/play:scale-150 transition-all duration-500"></div>
                                <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-40 group-hover/play:opacity-60 group-hover/play:scale-125 transition-all duration-500"></div>

                                {/* Main play button */}
                                <div className="relative w-28 h-28 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover/play:scale-110 transition-transform duration-300 border-4 border-white/50">
                                    <Play className="w-12 h-12 md:w-14 md:h-14 text-[#0066CC] ml-1 fill-current drop-shadow-lg" />
                                </div>

                                {/* Pulsing ring effect */}
                                <div className="absolute inset-0 border-4 border-white/30 rounded-full animate-ping opacity-75"></div>
                            </button>
                        </div>

                        {/* Video overlay info */}
                        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                    <p className="text-xl md:text-2xl font-bold text-white mb-1 drop-shadow-lg">
                                        Watch Our Story
                                    </p>
                                    <p className="text-sm md:text-base text-white/90">
                                        5:23 min • Discover the platform
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-3 rounded-full border border-white/30 hover:bg-white/30 transition-colors">
                                    <svg
                                        className="w-6 h-6"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                    <span className="text-sm font-bold text-white">
                                        Watch on YouTube
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating dashboard cards */}
                <div className="absolute inset-0 pointer-events-none hidden lg:block">
                    <div className="absolute top-32 right-20 w-72 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 transform rotate-3 hover:rotate-0 transition-transform duration-500 shadow-2xl">
                        <div className="text-white">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-semibold uppercase tracking-wider text-[#FFE5CC]">
                                    Live Auction
                                </span>
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            </div>
                            <p className="text-2xl font-bold mb-2">
                                $1,250,000
                            </p>
                            <p className="text-sm text-white/80 mb-4">
                                Starting Bid
                            </p>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-white/70">
                                        Sold Price:
                                    </span>
                                    <span className="font-semibold">
                                        $1,500,000
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-white/70">
                                        Trade Rate:
                                    </span>
                                    <span className="font-semibold text-green-300">
                                        120%
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-white/70">
                                        Days on Market:
                                    </span>
                                    <span className="font-semibold">32</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-white/70">
                                        Total Bids:
                                    </span>
                                    <span className="font-semibold">101</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-32 left-20 w-64 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 transform -rotate-3 hover:rotate-0 transition-transform duration-500 shadow-2xl">
                        <div className="text-white">
                            <p className="text-xs font-semibold uppercase tracking-wider text-[#FFE5CC] mb-3">
                                Success Rate
                            </p>
                            <p className="text-4xl font-bold mb-2">75%</p>
                            <p className="text-sm text-white/80">
                                Industry Leading Trade Rate
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
