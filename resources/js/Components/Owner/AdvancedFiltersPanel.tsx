import { useState, useRef, useEffect } from "react";
import { X, Search, MapPin, Info } from "lucide-react";

interface AdvancedFiltersPanelProps {
    isOpen: boolean;
    onClose: () => void;
    onClear: () => void;
    onDone: () => void;
    activeFiltersCount?: number;
}

export default function AdvancedFiltersPanel({
    isOpen,
    onClose,
    onClear,
    onDone,
}: AdvancedFiltersPanelProps) {
    const [topTab, setTopTab] = useState<"search" | "location">("search");
    const [activeSection, setActiveSection] = useState<
        "contacts" | "portfolio" | "sales-transactions" | "sales-listings"
    >("contacts");

    // Section refs for scrolling
    const contactsRef = useRef<HTMLDivElement>(null);
    const portfolioRef = useRef<HTMLDivElement>(null);
    const salesTransactionsRef = useRef<HTMLDivElement>(null);
    const salesListingsRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Scroll to section when tab is clicked
    const scrollToSection = (
        section:
            | "contacts"
            | "portfolio"
            | "sales-transactions"
            | "sales-listings"
    ) => {
        // Set active section immediately for instant feedback
        setActiveSection(section);
        const refs = {
            contacts: contactsRef,
            portfolio: portfolioRef,
            "sales-transactions": salesTransactionsRef,
            "sales-listings": salesListingsRef,
        };

        const targetRef = refs[section];
        if (targetRef.current && scrollContainerRef.current) {
            targetRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    // Track which section is in view (for vertical scrolling)
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const containerRect = container.getBoundingClientRect();
            const containerTop = containerRect.top;
            const containerBottom = containerRect.bottom;

            const sections = [
                { ref: contactsRef, name: "contacts" as const },
                { ref: portfolioRef, name: "portfolio" as const },
                {
                    ref: salesTransactionsRef,
                    name: "sales-transactions" as const,
                },
                { ref: salesListingsRef, name: "sales-listings" as const },
            ];

            // Find which section is most visible in the viewport
            let mostVisibleSection = sections[0];
            let maxVisibility = 0;

            for (const section of sections) {
                if (section.ref.current) {
                    const sectionRect =
                        section.ref.current.getBoundingClientRect();
                    const sectionTop = sectionRect.top;
                    const sectionBottom = sectionRect.bottom;
                    const sectionHeight = sectionRect.height;

                    // Calculate how much of the section is visible
                    const visibleTop = Math.max(sectionTop, containerTop);
                    const visibleBottom = Math.min(
                        sectionBottom,
                        containerBottom
                    );
                    const visibleHeight = Math.max(
                        0,
                        visibleBottom - visibleTop
                    );
                    const visibilityRatio = visibleHeight / sectionHeight;

                    // Also check if section is near the top of the container
                    const distanceFromTop = Math.abs(sectionTop - containerTop);

                    // Prefer sections that are more visible and closer to the top
                    const score = visibilityRatio * 100 - distanceFromTop * 0.1;

                    if (score > maxVisibility) {
                        maxVisibility = score;
                        mostVisibleSection = section;
                    }
                }
            }

            if (mostVisibleSection) {
                setActiveSection(mostVisibleSection.name);
            }
        };

        // Use throttling to improve performance
        let ticking = false;
        const throttledHandleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        container.addEventListener("scroll", throttledHandleScroll, {
            passive: true,
        });
        // Also check on mount and after a short delay to catch initial state
        handleScroll();
        const timeoutId = setTimeout(handleScroll, 100);

        return () => {
            container.removeEventListener("scroll", throttledHandleScroll);
            clearTimeout(timeoutId);
        };
    }, []);

    if (!isOpen) return null;

    return (
        <div className="h-[calc(100vh-170px)] w-full bg-white flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3 shrink-0">
                <div className="flex items-center gap-1">
                    {/* Top Tabs */}
                    <button
                        onClick={() => setTopTab("search")}
                        className={`flex items-center gap-2 px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                            topTab === "search"
                                ? "border-blue-600 text-blue-600 bg-white"
                                : "border-transparent text-gray-600 hover:text-gray-900"
                        }`}
                    >
                        <Search className="h-4 w-4" />
                        Search
                    </button>
                    <button
                        onClick={() => setTopTab("location")}
                        className={`flex items-center gap-2 px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                            topTab === "location"
                                ? "border-blue-600 text-blue-600 bg-white"
                                : "border-transparent text-gray-600 hover:text-gray-900"
                        }`}
                    >
                        <MapPin className="h-4 w-4" />
                        Location
                    </button>
                </div>
                <button
                    onClick={onClose}
                    className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded hover:bg-gray-200"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>

            {/* Main Content Tabs - Act as section references */}
            <div className="border-b border-gray-200 bg-white px-4 shrink-0">
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => scrollToSection("contacts")}
                        className={`relative px-4 py-3 text-sm font-medium border-b-2 transition-all duration-300 ease-in-out ${
                            activeSection === "contacts"
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                        }`}
                    >
                        <span className="relative z-10">Contacts</span>
                        {activeSection === "contacts" && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 animate-pulse" />
                        )}
                    </button>
                    <button
                        onClick={() => scrollToSection("portfolio")}
                        className={`relative px-4 py-3 text-sm font-medium border-b-2 transition-all duration-300 ease-in-out ${
                            activeSection === "portfolio"
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                        }`}
                    >
                        <span className="relative z-10">Portfolio</span>
                        {activeSection === "portfolio" && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 animate-pulse" />
                        )}
                    </button>
                    <button
                        onClick={() => scrollToSection("sales-transactions")}
                        className={`relative px-4 py-3 text-sm font-medium border-b-2 transition-all duration-300 ease-in-out ${
                            activeSection === "sales-transactions"
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                        }`}
                    >
                        <span className="relative z-10">
                            Sales Transactions
                        </span>
                        {activeSection === "sales-transactions" && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 animate-pulse" />
                        )}
                    </button>
                    <button
                        onClick={() => scrollToSection("sales-listings")}
                        className={`relative px-4 py-3 text-sm font-medium border-b-2 transition-all duration-300 ease-in-out ${
                            activeSection === "sales-listings"
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                        }`}
                    >
                        <span className="relative z-10">Sales Listings</span>
                        {activeSection === "sales-listings" && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 animate-pulse" />
                        )}
                    </button>
                </div>
            </div>

            {/* Horizontally Scrollable Content */}
            <div
                ref={scrollContainerRef}
                className="overflow-y-auto overflow-x-hidden bg-gray-50"
                style={{ scrollSnapType: "x mandatory" }}
            >
                <div className="flex flex-col h-full gap-4 p-4">
                    {/* Contacts Section */}
                    <div
                        ref={contactsRef}
                        className="w-full shrink-0 bg-white rounded-lg border border-gray-200 shadow-sm"
                        style={{ scrollSnapAlign: "start" }}
                    >
                        <div className="p-6 space-y-4">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                                Contacts
                            </h2>

                            {/* True Owner */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    True Owner
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Owner Name or Ticker"
                                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            {/* Owner Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Owner Type
                                </label>
                                <select className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                    <option>Select</option>
                                </select>
                            </div>

                            {/* HQ Location */}
                            <div>
                                <div className="flex items-center gap-1 mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        HQ Location
                                    </label>
                                    <button className="text-blue-500 hover:text-blue-600">
                                        <Info className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="City, State or Country"
                                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            {/* Is Publicly Traded */}
                            <div>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">
                                        Is Publicly Traded
                                    </span>
                                </label>
                            </div>

                            {/* Contacts by Role */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Contacts by Role
                                </label>
                                <select className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                    <option>Select</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Portfolio Section */}
                    <div
                        ref={portfolioRef}
                        className="w-full shrink-0 bg-white rounded-lg border border-gray-200 shadow-sm"
                        style={{ scrollSnapAlign: "start" }}
                    >
                        <div className="p-6 space-y-4">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                                Portfolio
                            </h2>

                            {/* Portfolio Size */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Portfolio Size
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="Min SF"
                                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-500 text-sm">
                                        –
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Max SF"
                                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Properties Owned */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Properties Owned
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="Min"
                                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-500 text-sm">
                                        –
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Max"
                                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Property Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Property Type
                                </label>
                                <select className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                    <option>Select</option>
                                </select>
                            </div>

                            {/* Secondary Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Secondary Type
                                </label>
                                <select className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                    <option>Select</option>
                                </select>
                            </div>

                            {/* Property Size */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Property Size
                                    </label>
                                    <select className="w-16 rounded-md border border-gray-300 bg-white px-2 py-1 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                        <option>SF</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="Min SF"
                                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-500 text-sm">
                                        –
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Max SF"
                                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* CoStar Rating */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    CoStar Rating
                                </label>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            className="text-gray-300 hover:text-yellow-400 transition-colors"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </button>
                                    ))}
                                    <button className="ml-2 text-gray-400 hover:text-gray-600">
                                        <Info className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Location Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Location Type
                                </label>
                                <div className="flex items-center gap-2">
                                    {["CBD", "Urban", "Suburban"].map(
                                        (type) => (
                                            <button
                                                key={type}
                                                className="px-4 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                                            >
                                                {type}
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sales Transactions Section */}
                    <div
                        ref={salesTransactionsRef}
                        className="w-full shrink-0 bg-white rounded-lg border border-gray-200 shadow-sm"
                        style={{ scrollSnapAlign: "start" }}
                    >
                        <div className="p-6 space-y-4">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                                Sales Transactions
                            </h2>

                            {/* Sale Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Sale Date
                                </label>
                                <input
                                    type="text"
                                    placeholder="Select Date"
                                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>

                            {/* Deal Role */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Deal Role
                                </label>
                                <div className="flex items-center gap-2">
                                    {["Buyer", "Seller"].map((role) => (
                                        <button
                                            key={role}
                                            className={`px-4 py-2 text-sm border rounded-md transition-colors ${
                                                role === "Buyer"
                                                    ? "border-blue-600 bg-blue-600 text-white"
                                                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                            }`}
                                        >
                                            {role}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Total Deal Value */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Total Deal Value
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="$ Min"
                                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-500 text-sm">
                                        –
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="$ Max"
                                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Individual Deal Value */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Individual Deal Value
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="$ Min"
                                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-500 text-sm">
                                        –
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="$ Max"
                                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <select className="w-24 rounded-md border border-gray-300 bg-white px-2 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                        <option>Total</option>
                                    </select>
                                </div>
                            </div>

                            {/* Include Undisclosed Sale Price */}
                            <div>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">
                                        Include Undisclosed Sale Price
                                    </span>
                                </label>
                            </div>

                            {/* Total Deal Size */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Total Deal Size
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="Min SF"
                                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-500 text-sm">
                                        –
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Max SF"
                                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <select className="w-16 rounded-md border border-gray-300 bg-white px-2 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                        <option>SF</option>
                                    </select>
                                </div>
                            </div>

                            {/* Individual Deal Size */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Individual Deal Size
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="Min SF"
                                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-500 text-sm">
                                        –
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Max SF"
                                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <select className="w-16 rounded-md border border-gray-300 bg-white px-2 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                        <option>SF</option>
                                    </select>
                                </div>
                            </div>

                            {/* Property Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Property Type
                                </label>
                                <select className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                    <option>Select</option>
                                </select>
                            </div>

                            {/* CoStar Rating */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    CoStar Rating
                                </label>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            className="text-gray-300 hover:text-yellow-400 transition-colors"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </button>
                                    ))}
                                    <button className="ml-2 text-gray-400 hover:text-gray-600">
                                        <Info className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Secondary Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Secondary Type
                                </label>
                                <select className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                    <option>Select</option>
                                </select>
                            </div>

                            {/* Sale Conditions */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Sale Conditions
                                </label>
                                <select className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                    <option>Select</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Sales Listings Section */}
                    <div
                        ref={salesListingsRef}
                        className="w-full shrink-0 bg-white rounded-lg border border-gray-200 shadow-sm"
                        style={{ scrollSnapAlign: "start" }}
                    >
                        <div className="p-6 space-y-4">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                                Sales Listings
                            </h2>

                            {/* Number of Listings */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Number of Listings
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="Min"
                                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-500 text-sm">
                                        –
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Max"
                                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Total Area for Sale */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Total Area for Sale
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="Min SF"
                                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-500 text-sm">
                                        –
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Max SF"
                                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <select className="w-16 rounded-md border border-gray-300 bg-white px-2 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                        <option>SF</option>
                                    </select>
                                </div>
                            </div>

                            {/* Total Asking Price - All Buildings */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Total Asking Price - All Buildings
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="$ Min"
                                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-500 text-sm">
                                        –
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="$ Max"
                                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Individual Asking Price */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Individual Asking Price
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="$ Min"
                                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-500 text-sm">
                                        –
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="$ Max"
                                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <select className="w-24 rounded-md border border-gray-300 bg-white px-2 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                        <option>Total</option>
                                    </select>
                                </div>
                            </div>

                            {/* Include Undisclosed Sale Price */}
                            <div>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">
                                        Include Undisclosed Sale Price
                                    </span>
                                </label>
                            </div>

                            {/* Property Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Property Type
                                </label>
                                <select className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                    <option>Select</option>
                                </select>
                            </div>

                            {/* CoStar Rating */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    CoStar Rating
                                </label>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            className="text-gray-300 hover:text-yellow-400 transition-colors"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </button>
                                    ))}
                                    <button className="ml-2 text-gray-400 hover:text-gray-600">
                                        <Info className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Secondary Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Secondary Type
                                </label>
                                <select className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                    <option>Select</option>
                                </select>
                            </div>

                            {/* Sale Conditions */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Sale Conditions
                                </label>
                                <select className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                    <option>Select</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-4 py-3 bg-white shrink-0">
                <div className="flex items-center justify-between">
                    <button
                        onClick={onClear}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                        Show Criteria
                    </button>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onClear}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                        >
                            Clear
                        </button>
                        <button
                            onClick={onDone}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
