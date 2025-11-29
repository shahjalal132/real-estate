import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
    quote: string;
    author: string;
    title: string;
}

interface TestimonialsProps {
    testimonials?: Testimonial[];
}

export default function Testimonials({ testimonials = [] }: TestimonialsProps) {
    const defaultTestimonials: Testimonial[] = [
        {
            quote: "The platform provides an incredible volume of transactions and the technology makes it seamless.",
            author: "Johan Moschki",
            title: "SRGSCG",
        },
        {
            quote: "We successfully sold our property through the platform with great results.",
            author: "Deborah A. Nemec",
            title: "PRESIDENT NEMEC PROPERTIES INC.",
        },
        {
            quote: "The marketing exposure and transaction efficiency exceeded our expectations.",
            author: "David Hoppe",
            title: "INVESTMENT ADVISOR ATLANTIC RETH",
        },
    ];

    const displayTestimonials =
        testimonials.length > 0 ? testimonials : defaultTestimonials;

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex(
            (prev) =>
                (prev - 1 + displayTestimonials.length) %
                displayTestimonials.length
        );
    };

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#FFE5CC]/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0066CC]/5 rounded-full blur-3xl"></div>

            <div className="w-[95%] max-w-full mx-auto px-4 sm:px-6 lg:px-2 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#333333] mb-4">
                        Winning Words
                    </h2>
                    <p className="text-[#666666] text-lg">
                        Hear from our satisfied clients
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {displayTestimonials.map((testimonial, idx) => (
                        <div
                            key={idx}
                            className="group relative bg-gradient-to-br from-[#FFE5CC] to-[#FFE5CC]/80 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[#FFE5CC]/50"
                        >
                            {/* Quote icon */}
                            <div className="absolute top-6 right-6 opacity-10">
                                <Quote className="w-16 h-16 text-[#0066CC]" />
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-1 mb-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg
                                            key={star}
                                            className="w-5 h-5 text-[#FF6B00] fill-current"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                        </svg>
                                    ))}
                                </div>

                                <p className="text-[#333333] mb-8 leading-relaxed text-lg font-medium">
                                    "{testimonial.quote}"
                                </p>

                                <div className="pt-6 border-t border-[#FF6B00]/20">
                                    <p className="font-bold text-[#333333] mb-1">
                                        {testimonial.author}
                                    </p>
                                    <p className="text-sm text-[#666666]">
                                        {testimonial.title}
                                    </p>
                                </div>
                            </div>

                            {/* Decorative corner accent */}
                            <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#0066CC]/5 rounded-tl-full"></div>
                        </div>
                    ))}
                </div>

                {/* Navigation controls */}
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={prevTestimonial}
                        className="p-3 bg-white border-2 border-[#0066CC] text-[#0066CC] rounded-full hover:bg-[#0066CC] hover:text-white transition-all duration-300 hover:shadow-lg"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <div className="flex gap-2">
                        {displayTestimonials.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    idx === currentIndex
                                        ? "w-8 bg-[#0066CC]"
                                        : "w-2 bg-gray-300 hover:bg-[#0066CC]/50"
                                }`}
                                aria-label={`Go to testimonial ${idx + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={nextTestimonial}
                        className="p-3 bg-white border-2 border-[#0066CC] text-[#0066CC] rounded-full hover:bg-[#0066CC] hover:text-white transition-all duration-300 hover:shadow-lg"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </section>
    );
}
