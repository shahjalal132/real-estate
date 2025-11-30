import { Link } from "@inertiajs/react";
import { Phone, Mail, ArrowRight, MessageCircle } from "lucide-react";

interface CTABannerContent {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
}

interface CTABannerProps {
    content?: CTABannerContent;
}

export default function CTABanner({ content }: CTABannerProps) {
    const defaultContent: CTABannerContent = {
        title: "Have a Question ?",
        description:
            "Give us a call or fill out the contact form and we will get back to you as soon as possible.",
        buttonText: "Contact Us",
        buttonLink: "/contact",
    };

    const ctaContent = content || defaultContent;

    return (
        <section className="py-12 overflow-hidden -mb-24 relative">
            {/* Enhanced Animated background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0066CC] via-[#0052A3] to-[#004080]">
                {/* Animated background orbs */}
                <div className="absolute inset-0 opacity-15">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
                    <div
                        className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-[#FFE5CC] rounded-full blur-3xl animate-pulse"
                        style={{ animationDelay: "1s" }}
                    ></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl"></div>
                </div>

                {/* Grid pattern overlay */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                ></div>
            </div>

            {/* Centered geometric pattern overlay */}
            <div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full md:w-[60%] h-full bg-gradient-to-br from-[#0066CC] to-[#004C99] opacity-95"
                style={{
                    clipPath: "polygon(0% 0, 100% 0, 85% 100%, 15% 100%)",
                }}
            >
                {/* Subtle light rays centered */}
                <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-px h-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
            </div>

            <div className="relative z-10 w-[95%] max-w-full mx-auto px-4 sm:px-6 lg:px-2">
                <div className="flex flex-col items-center justify-center min-h-[350px] md:min-h-[400px] text-center">
                    {/* Centered content */}
                    <div className="w-full max-w-3xl text-white flex flex-col items-center justify-center space-y-6">
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                                <MessageCircle className="w-6 h-6" />
                            </div>
                            <span className="text-sm font-bold text-white uppercase tracking-wider">
                                Get In Touch
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
                            {ctaContent.title}
                        </h2>

                        <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-2xl">
                            {ctaContent.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
                            <Link
                                href={ctaContent.buttonLink}
                                className="group inline-flex items-center justify-center gap-2 bg-white text-[#0066CC] px-8 py-4 rounded-xl font-bold text-sm tracking-wider hover:bg-gray-50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 uppercase"
                            >
                                {ctaContent.buttonText}
                                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <a
                                href="tel:8009157015"
                                className="inline-flex items-center justify-center gap-2 bg-white/15 backdrop-blur-md text-white border-2 border-white/40 px-8 py-4 rounded-xl font-semibold hover:bg-white/25 hover:border-white/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                            >
                                <Phone className="w-5 h-5" />
                                Call Now
                            </a>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-6 border-t border-white/20">
                            <a
                                href="mailto:info@rmarketplace.com"
                                className="flex items-center gap-3 text-white/90 hover:text-white transition-colors group/contact"
                            >
                                <div className="p-2 bg-white/10 rounded-lg group-hover/contact:bg-white/20 transition-colors">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-medium">
                                    info@tenantshq.com
                                </span>
                            </a>
                            <a
                                href="tel:(443) 489-9162"
                                className="flex items-center gap-3 text-white/90 hover:text-white transition-colors group/contact"
                            >
                                <div className="p-2 bg-white/10 rounded-lg group-hover/contact:bg-white/20 transition-colors">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-medium">
                                    (443) 489-9162
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
