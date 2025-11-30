import React from "react";
import { Link } from "@inertiajs/react";
import {
    Users,
    TrendingUp,
    BarChart3,
    ArrowRight,
    Sparkles,
} from "lucide-react";

interface Statistic {
    icon: string;
    number: string;
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
}

interface StatisticsProps {
    statistics?: Statistic[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    users: Users,
    "trending-up": TrendingUp,
    "bar-chart": BarChart3,
};

export default function Statistics({ statistics = [] }: StatisticsProps) {
    const stats =
        statistics.length > 0
            ? statistics
            : [
                  {
                      icon: "users",
                      number: "100,000+",
                      title: "Investors",
                      description:
                          "Our platform has grown to over 100,000 active investors, creating the largest network of qualified buyers in commercial real estate.",
                      ctaText: "View investor network",
                      ctaLink: "/investors",
                  },
                  {
                      icon: "trending-up",
                      number: "$5B+",
                      title: "Transacted",
                      description:
                          "Total transaction volume exceeds $5 billion, demonstrating the platform's ability to facilitate large-scale commercial real estate deals.",
                      ctaText: "See transaction data",
                      ctaLink: "/transactions",
                  },
                  {
                      icon: "bar-chart",
                      number: "75%",
                      title: "Industry Leading Trade Rate",
                      description:
                          "Our auction platform achieves a 75% trade rate, significantly higher than industry averages, ensuring successful property sales.",
                      ctaText: "Learn about our success",
                      ctaLink: "/success-stories",
                  },
              ];

    return (
        <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#0066CC]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFE5CC]/20 rounded-full blur-3xl"></div>

            <div className="w-[95%] max-w-full mx-auto px-4 sm:px-6 lg:px-2 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-[#0066CC]" />
                        <span className="text-sm font-semibold text-[#0066CC] uppercase tracking-wider">
                            Proven Results
                        </span>
                        <Sparkles className="w-5 h-5 text-[#0066CC]" />
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#333333] mb-4 leading-tight">
                        The Right Place To Transact
                    </h2>

                    <div className="w-24 h-1 bg-[#0066CC] mx-auto mb-4"></div>

                    <p className="text-lg md:text-xl text-[#666666] max-w-3xl mx-auto">
                        THE AUCTION PLATFORM THAT ACHIEVES POWERFUL RESULTS
                    </p>
                </div>

                {/* Enhanced Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat, idx) => {
                        const IconComponent = iconMap[stat.icon] || Users;
                        return (
                            <div
                                key={idx}
                                className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#0066CC]/30 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                            >
                                {/* Gradient Background Section */}
                                <div className="relative bg-gradient-to-br from-[#0066CC] via-[#0052A3] to-[#004080] text-white p-8 overflow-hidden">
                                    {/* Animated background pattern */}
                                    <div className="absolute inset-0 opacity-10">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FFE5CC] rounded-full blur-2xl"></div>
                                    </div>

                                    {/* Decorative corner element */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>

                                    <div className="relative z-10">
                                        {/* Icon with background */}
                                        <div className="inline-flex p-4 bg-white/20 backdrop-blur-sm rounded-xl mb-6 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                                            <IconComponent className="h-8 w-8" />
                                        </div>

                                        {/* Large number */}
                                        <div className="text-6xl md:text-7xl font-bold mb-3 leading-none">
                                            {stat.number}
                                        </div>

                                        {/* Title */}
                                        <div className="text-xl md:text-2xl font-bold mb-4">
                                            {stat.title}
                                        </div>

                                        {/* Description */}
                                        <p className="text-sm md:text-base text-white/90 leading-relaxed">
                                            {stat.description}
                                        </p>
                                    </div>

                                    {/* Shine effect on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                </div>

                                {/* Enhanced CTA Section */}
                                <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 px-6 py-5 relative overflow-hidden">
                                    {/* Subtle pattern */}
                                    <div
                                        className="absolute inset-0 opacity-5"
                                        style={{
                                            backgroundImage:
                                                "repeating-linear-gradient(45deg, transparent, transparent 10px, white 10px, white 20px)",
                                        }}
                                    ></div>

                                    <Link
                                        href={stat.ctaLink}
                                        className="relative z-10 flex items-center justify-between group/link"
                                    >
                                        <span className="text-white text-sm font-semibold uppercase tracking-wider group-hover/link:text-[#FFE5CC] transition-colors">
                                            {stat.ctaText}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <ArrowRight className="h-5 w-5 text-white group-hover/link:text-[#FFE5CC] transform group-hover/link:translate-x-2 transition-all" />
                                        </div>
                                    </Link>

                                    {/* Animated underline */}
                                    <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#0066CC] to-[#FFE5CC] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                                </div>

                                {/* Decorative number badge */}
                                <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                                    <span className="text-white font-bold text-lg">
                                        {idx + 1}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom decorative line */}
                <div className="mt-16 flex justify-center">
                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#0066CC] to-transparent"></div>
                </div>
            </div>
        </section>
    );
}
