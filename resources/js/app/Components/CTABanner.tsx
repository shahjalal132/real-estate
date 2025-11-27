import { Link } from "@inertiajs/react";

export default function CTABanner() {
    return (
        <section className="py-8 overflow-hidden -mb-24 relative">
            <div
                className="absolute top-0 right-0 w-full md:w-[60%] h-full bg-[#0066CC]"
                style={{
                    clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)",
                }}
            >
                {" "}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-end items-center text-center md:text-left">
                    <div className="md:w-[50%] text-white px-4 pl-12 flex flex-col justify-center h-full">
                        <h2 className="text-3xl md:text-4xl font-bold mb-3">
                            Have a Question ?
                        </h2>
                        <p className="text-base md:text-lg mb-6 text-blue-50 whitespace-nowrap">
                            Give us a call or fill out the contact form and we
                            will get back to you as soon as possible.
                        </p>
                        <div>
                            <Link
                                href="/contact"
                                className="inline-block w-full text-center bg-white text-[#0066CC] py-3 rounded font-bold text-sm tracking-wider hover:bg-gray-100 transition-colors uppercase"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
