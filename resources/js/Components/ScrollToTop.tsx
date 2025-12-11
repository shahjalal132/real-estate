import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-50 flex items-center justify-center w-12 h-12 bg-[#0066CC] text-white rounded-full shadow-lg hover:bg-[#0052A3] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:ring-offset-2 ${
                isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
            }`}
            aria-label="Scroll to top"
        >
            <ChevronUp className="w-6 h-6" strokeWidth={2.5} />
        </button>
    );
}

