import { useState, useRef, useEffect } from "react";
import { X, Search, MapPin } from "lucide-react";
import SearchContentComponent from "./SearchContentComponent";
import LocationContentComponent from "./LocationContentComponent";

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

            {/* Search Content Component */}
            {topTab === "search" && (
                <SearchContentComponent
                    activeSection={activeSection}
                    scrollToSection={scrollToSection}
                    contactsRef={contactsRef}
                    portfolioRef={portfolioRef}
                    salesTransactionsRef={salesTransactionsRef}
                    salesListingsRef={salesListingsRef}
                    scrollContainerRef={scrollContainerRef}
                />
            )}

            {/* Location Content Component */}
            {topTab === "location" && <LocationContentComponent />}

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
