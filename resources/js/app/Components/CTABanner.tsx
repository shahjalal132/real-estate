import { Link } from '@inertiajs/react';

export default function CTABanner() {
    return (
        <section className="relative py-20 bg-[#0066CC] overflow-hidden">
            <div className="absolute inset-0" style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)' }}></div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-bold text-white mb-4">Have a Question?</h2>
                <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
                    Give us a call or fill out the contact form, and we will get back to you as soon as possible.
                </p>
                <Link
                    href="/contact"
                    className="inline-block bg-white text-[#0066CC] px-8 py-3 rounded font-semibold hover:bg-gray-100 transition-colors"
                >
                    CONTACT US
                </Link>
            </div>
        </section>
    );
}

