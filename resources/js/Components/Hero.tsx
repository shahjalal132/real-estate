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

            <div className="relative z-10 mx-auto w-[95%] max-w-full px-4 sm:px-6 lg:px-2 text-center text-white">
                <h1 className="mb-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[4.5rem]">
                    {heroContent.title}
                </h1>
                <p className="mb-12 text-lg font-light text-white/95 sm:text-xl lg:text-[1.75rem]">
                    {heroContent.subtitle}
                </p>

                <div className="mx-auto w-full max-w-[700px]">
                    <div className="flex items-center rounded-full bg-white px-5 py-2 shadow-[0_10px_40px_rgba(0,0,0,0.2)] transition-shadow duration-300 hover:shadow-[0_15px_50px_rgba(0,0,0,0.3)] sm:px-7">
                        <input
                            type="text"
                            className="flex-1 bg-transparent py-3 text-base text-gray-700 placeholder:text-gray-500 focus:outline-none sm:text-lg"
                            placeholder={heroContent.searchPlaceholder}
                            aria-label="Search location"
                        />
                        <button
                            className="rounded-full p-3 transition-transform duration-200 hover:scale-110 focus:outline-none"
                            aria-label="Search"
                        >
                            <Search color="#3787de" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
