interface Testimonial {
    quote: string;
    author: string;
    title: string;
}

export default function Testimonials() {
    const testimonials: Testimonial[] = [
        {
            quote: 'The platform provides an incredible volume of transactions and the technology makes it seamless.',
            author: 'Johan Moschki',
            title: 'SRGSCG',
        },
        {
            quote: 'We successfully sold our property through the platform with great results.',
            author: 'Deborah A. Nemec',
            title: 'PRESIDENT NEMEC PROPERTIES INC.',
        },
        {
            quote: 'The marketing exposure and transaction efficiency exceeded our expectations.',
            author: 'David Hoppe',
            title: 'INVESTMENT ADVISOR ATLANTIC RETH',
        },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-[#333333]">Winning Words</h2>
                    <div className="flex items-center space-x-4">
                        <button className="text-[#0066CC] hover:text-[#004C99] font-medium">PREVIOUS</button>
                        <button className="text-[#0066CC] hover:text-[#004C99] font-medium">NEXT</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, idx) => (
                        <div key={idx} className="bg-[#FFE5CC] rounded-lg p-8">
                            <p className="text-[#333333] mb-6 leading-relaxed">{testimonial.quote}</p>
                            <div>
                                <p className="font-semibold text-[#333333]">{testimonial.author}</p>
                                <p className="text-sm text-[#666666]">{testimonial.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

