import { LucideIcon, Clock, Sparkles, Construction, Zap } from "lucide-react";

interface ComingSoonProps {
    title?: string;
    description?: string;
    icon?: LucideIcon;
    features?: string[];
}

export default function ComingSoon({
    title = "Coming Soon",
    description = "We're working hard to bring you this feature. Stay tuned!",
    icon: Icon = Clock,
    features,
}: ComingSoonProps) {
    // Extract the actual title if it starts with "Coming soon: "
    const displayTitle = title?.startsWith("Coming soon: ")
        ? title.replace("Coming soon: ", "")
        : title;

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-gradient-to-b from-[#FAFBFC] via-white to-[#F0F7FF]">
            <div className="max-w-3xl w-full">
                {/* Prominent Coming Soon Badge */}
                <div className="flex justify-center mb-8">
                    <div className="relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF6B00] via-[#FF8C42] to-[#FF6B00] rounded-full shadow-lg animate-pulse">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B00] via-[#FF8C42] to-[#FF6B00] rounded-full blur-sm opacity-50 animate-pulse" />
                        <Construction className="w-5 h-5 text-white relative z-10 animate-bounce" />
                        <span className="text-white font-bold text-sm md:text-base uppercase tracking-wider relative z-10">
                            Coming Soon
                        </span>
                        <Zap className="w-5 h-5 text-white relative z-10" />
                    </div>
                </div>

                <div className="text-center">
                    {/* Icon with enhanced animation */}
                    <div className="relative mb-10 flex justify-center">
                        {/* Outer glow rings */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-40 h-40 bg-gradient-to-br from-[#0066CC] to-[#0052A3] rounded-full opacity-5 animate-ping" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-36 h-36 bg-gradient-to-br from-[#0066CC] to-[#0052A3] rounded-full opacity-10 animate-pulse" />
                        </div>
                        {/* Icon container */}
                        <div className="relative bg-gradient-to-br from-[#0066CC] to-[#0052A3] rounded-full p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                            <Icon className="w-16 h-16 text-white" strokeWidth={2} />
                        </div>
                    </div>

                    {/* Title with gradient effect */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                        <span className="bg-gradient-to-r from-[#0F2343] via-[#0066CC] to-[#0F2343] bg-clip-text text-transparent animate-gradient">
                            {displayTitle}
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-[#666666] mb-12 leading-relaxed max-w-2xl mx-auto">
                        {description}
                    </p>

                    {/* Features list if provided */}
                    {features && features.length > 0 && (
                        <div className="mt-12 mb-8">
                            <div className="bg-white rounded-2xl p-8 md:p-10 border-2 border-[#E6EAF0] shadow-xl">
                                <div className="flex items-center justify-center gap-3 mb-8">
                                    <div className="p-2 bg-gradient-to-br from-[#0066CC] to-[#0052A3] rounded-lg">
                                        <Sparkles className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-base md:text-lg font-bold text-[#0F2343] uppercase tracking-wider">
                                        What to Expect
                                    </h3>
                                </div>
                                <ul className="space-y-4 text-left max-w-lg mx-auto">
                                    {features.map((feature, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-4 text-[#1F2937] group"
                                        >
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#0066CC] to-[#0052A3] flex items-center justify-center mt-0.5 shadow-md group-hover:scale-110 transition-transform">
                                                <div className="w-2.5 h-2.5 rounded-full bg-white" />
                                            </div>
                                            <span className="text-base leading-relaxed font-medium">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Status indicator */}
                    <div className="mt-12 flex flex-col items-center gap-4">
                        <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-full border-2 border-[#E6EAF0] shadow-md">
                            <div className="relative">
                                <Clock className="w-5 h-5 text-[#0066CC] animate-spin-slow" />
                                <div className="absolute inset-0 w-5 h-5 border-2 border-[#0066CC] border-t-transparent rounded-full animate-spin" />
                            </div>
                            <span className="text-sm md:text-base font-semibold text-[#0F2343]">
                                We're building something amazing
                            </span>
                        </div>
                        <p className="text-sm text-[#999999] max-w-md">
                            We'll notify you as soon as this feature is ready. Thank you for your patience!
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient {
                    background-size: 200% auto;
                    animation: gradient 3s ease infinite;
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 3s linear infinite;
                }
            `}</style>
        </div>
    );
}

