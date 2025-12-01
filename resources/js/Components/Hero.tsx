import { Search } from "lucide-react";

interface HeroContent {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    backgroundImage: string;
}

interface HeroProps {
    content?: HeroContent;
}

export default function Hero({ content }: HeroProps) {
    const defaultContent: HeroContent = {
        title: "Discover Your New Home",
        subtitle: "Helping 100 million renters find their perfect fit.",
        searchPlaceholder: "Search...",
        backgroundImage:
            "https://images.pexels.com/photos/772472/pexels-photo-772472.jpeg",
    };

    const heroContent = content || defaultContent;

    return (
        <section className="relative flex h-[450px] w-full items-center justify-center overflow-hidden sm:h-[500px] lg:h-[600px]">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('${heroContent.backgroundImage}')`,
                }}
            />
            <div className="absolute inset-0 bg-black opacity-50" />

            {/* Title */}
            <div className="relative z-10 mx-auto w-[95%] max-w-full px-4 sm:px-6 lg:px-2 text-center text-white">
                <h1 className="mb-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[4.5rem]">
                    {heroContent.title}
                </h1>
                {/* Subtitle */}
                <p className="mb-6 text-lg font-light text-white/95 sm:text-xl lg:text-[1.75rem]">
                    {heroContent.subtitle}
                </p>

                {/* Categories */}
                <div className="flex items-center justify-between gap-2 sm:gap-3 mx-auto w-full max-w-[600px] mb-4 bg-white/20 rounded-lg px-4 py-3 shadow-lg font-semibold text-sm sm:text-xs text-[#fdfbfb] max-[615px]:flex-wrap max-[615px]:justify-center max-[615px]:gap-2 max-[615px]:py-2.5">
                    <span className="hover:text-[#0066CC] transition-colors cursor-pointer px-2 py-1 rounded">
                        For Sale
                    </span>
                    <span className="hover:text-[#0066CC] transition-colors cursor-pointer px-2 py-1 rounded">
                        For Lease
                    </span>
                    <span className="hover:text-[#0066CC] transition-colors cursor-pointer px-2 py-1 rounded">
                        Scout
                    </span>
                    <span className="hover:text-[#0066CC] transition-colors cursor-pointer px-2 py-1 rounded">
                        Comps
                    </span>
                    <span className="hover:text-[#0066CC] transition-colors cursor-pointer px-2 py-1 rounded">
                        Dispensaries
                    </span>
                    <span className="hover:text-[#0066CC] transition-colors cursor-pointer px-2 py-1 rounded">
                        Owner
                    </span>
                    <span className="hover:text-[#0066CC] transition-colors cursor-pointer px-2 py-1 rounded">
                        Tenant
                    </span>
                    <span className="hover:text-[#0066CC] transition-colors cursor-pointer px-2 py-1 rounded">
                        Records
                    </span>
                </div>

                {/* Search */}
                <div className="mx-auto w-full max-w-[700px]">
                    <div className="flex items-center rounded-full bg-white px-5 py-2 shadow-lg transition-all duration-300 hover:shadow-xl sm:px-7 max-[615px]:px-3 max-[615px]:py-1.5">
                        <input
                            type="text"
                            className="flex-1 bg-transparent py-3 text-base text-[#333333] placeholder:text-[#666666] focus:outline-none sm:text-lg max-[615px]:py-2 max-[615px]:text-sm max-[615px]:placeholder:text-xs"
                            placeholder={heroContent.searchPlaceholder}
                            aria-label="Search location"
                        />
                        <button
                            className="rounded-full p-3 transition-all duration-200 hover:bg-[#0066CC] hover:text-white focus:outline-none max-[615px]:p-2 shrink-0 group"
                            aria-label="Search"
                        >
                            <Search
                                color="#0066CC"
                                className="max-[615px]:w-4 max-[615px]:h-4 group-hover:text-white transition-colors"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
