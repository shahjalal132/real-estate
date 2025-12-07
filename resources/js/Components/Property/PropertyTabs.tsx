import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Property } from "../../types";

interface Tab {
    id: string;
    label: string;
}

interface PropertyTabsProps {
    onTabClick: (tabId: string) => void;
    property: Property;
    formattedPrice: string;
    fullAddress: string;
}

const tabs: Tab[] = [
    { id: "contacts", label: "Listing Contacts" },
    { id: "details", label: "Details" },
    { id: "about", label: "About Property" },
    { id: "map", label: "Map" },
    { id: "climate", label: "Climate Risk" },
    { id: "history", label: "Property History" },
    { id: "tax", label: "Tax History" },
    { id: "valuation", label: "Valuation Calculator" },
    { id: "metrics", label: "Valuation Metrics" },
    { id: "demographics", label: "Demographics" },
    { id: "insights", label: "Location Insights" },
];

export default function PropertyTabs({
    onTabClick,
    property,
    formattedPrice,
    fullAddress,
}: PropertyTabsProps) {
    const [activeTab, setActiveTab] = useState<string>("contacts");
    const tabsContainerRef = useRef<HTMLDivElement>(null);
    const stickyContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isSticky, setIsSticky] = useState(false);
    const [topPosition, setTopPosition] = useState(102); // Default: PropertyTopTabs top (54) + height (~48)

    useEffect(() => {
        const handleScroll = () => {
            // Don't update active tab if a modal is open (check for modal backdrop)
            const modalBackdrop = document.querySelector(
                '[class*="z-[100]"], [class*="z-100"]'
            );
            if (modalBackdrop) {
                return; // Modal is open, don't update active tab
            }

            const scrollPosition = window.scrollY + 150; // Offset for sticky tabs bar

            // Check tabs in reverse order to get the topmost visible section
            const reversedTabs = [...tabs].reverse();
            let foundActive = false;

            for (const tab of reversedTabs) {
                const element = document.getElementById(tab.id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const elementTop = rect.top + window.scrollY;
                    const elementBottom = elementTop + rect.height;

                    // Check if section is in viewport or just passed
                    if (
                        scrollPosition >= elementTop - 100 &&
                        scrollPosition < elementBottom
                    ) {
                        setActiveTab(tab.id);
                        foundActive = true;
                        break;
                    }
                }
            }

            // If no section found, check if we're at the top
            if (!foundActive && window.scrollY < 100) {
                setActiveTab(tabs[0].id);
            }
        };

        // Use throttled scroll for better performance
        let ticking = false;
        const throttledScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", throttledScroll, { passive: true });
        handleScroll(); // Initial check
        return () => window.removeEventListener("scroll", throttledScroll);
    }, []);

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
        onTabClick(tabId);
    };

    // Check scroll position for navigation arrows
    const checkScrollPosition = () => {
        if (tabsContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } =
                tabsContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        checkScrollPosition();
        const container = tabsContainerRef.current;
        if (container) {
            container.addEventListener("scroll", checkScrollPosition);
            window.addEventListener("resize", checkScrollPosition);
            return () => {
                container.removeEventListener("scroll", checkScrollPosition);
                window.removeEventListener("resize", checkScrollPosition);
            };
        }
    }, []);

    // Detect when component becomes sticky and calculate top position
    useEffect(() => {
        const container = stickyContainerRef.current;
        if (!container) return;

        let initialOffsetTop: number | null = null;

        const calculateTopPosition = () => {
            // Find PropertyTopTabs element by ID
            const topTabsElement = document.getElementById(
                "property-top-tabs"
            ) as HTMLElement;

            if (topTabsElement) {
                // Get the computed top position from CSS (PropertyTopTabs uses top-[54px])
                const computedStyle = window.getComputedStyle(topTabsElement);
                const topTabsTop = parseFloat(computedStyle.top) || 54;
                const topTabsHeight = topTabsElement.offsetHeight || 48;
                const totalOffset = topTabsTop + topTabsHeight;
                setTopPosition(totalOffset);
                return totalOffset;
            } else {
                // Fallback: PropertyTopTabs is at 54px, height is ~48px
                const totalOffset = 54 + 48;
                setTopPosition(totalOffset);
                return totalOffset;
            }
        };

        const checkSticky = () => {
            if (initialOffsetTop === null) {
                initialOffsetTop = container.offsetTop;
            }

            const totalOffset = calculateTopPosition();
            const scrollY = window.scrollY;
            const isCurrentlySticky = scrollY + totalOffset >= initialOffsetTop;

            setIsSticky(isCurrentlySticky);
        };

        // Initial check - use setTimeout to ensure DOM is ready
        const initTimeout = setTimeout(() => {
            calculateTopPosition();
            checkSticky();
        }, 0);

        // Throttled scroll handler
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    checkSticky();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        const handleResize = () => {
            calculateTopPosition();
            checkSticky();
        };
        window.addEventListener("resize", handleResize);

        return () => {
            clearTimeout(initTimeout);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const scrollTabs = (direction: "left" | "right") => {
        if (tabsContainerRef.current) {
            const scrollAmount = 200;
            const newScrollLeft =
                tabsContainerRef.current.scrollLeft +
                (direction === "left" ? -scrollAmount : scrollAmount);
            tabsContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: "smooth",
            });
        }
    };

    // Get thumbnail image
    const thumbnailUrl =
        property.thumbnail_url ||
        property.images?.[0]?.url ||
        "/assets/images/placeholder.png";

    // Truncate address for display
    const displayAddress =
        fullAddress.length > 35
            ? `${fullAddress.substring(0, 35)}...`
            : fullAddress;

    return (
        <div ref={stickyContainerRef}>
            <div
                className="sticky z-40 bg-white border-b border-gray-200 shadow-sm"
                style={{ top: `${topPosition}px` }}
            >
                {/* Mobile: Stacked Layout */}
                <div className="lg:hidden">
                    {/* Property Info Row - Only show when sticky */}
                    {isSticky && (
                        <div className="flex items-center gap-3 px-4 py-2 border-b border-gray-100">
                            <img
                                src={thumbnailUrl}
                                alt={property.name || "Property"}
                                className="w-12 h-9 object-cover rounded border border-gray-200 shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-medium text-gray-900 truncate">
                                    {displayAddress}
                                </p>
                                <p className="text-xs font-semibold text-gray-900">
                                    {formattedPrice}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <button
                                    type="button"
                                    className="px-3 py-1.5 bg-[#0066CC] text-white text-xs font-semibold rounded hover:bg-[#0052A3] transition-colors"
                                >
                                    Request Info
                                </button>
                                <button
                                    type="button"
                                    className="px-3 py-1.5 bg-white text-[#0066CC] text-xs font-semibold rounded border border-[#0066CC] hover:bg-blue-50 transition-colors"
                                >
                                    View Flyer
                                </button>
                            </div>
                        </div>
                    )}
                    {/* Tabs Row */}
                    <div className="flex items-center justify-center gap-1 px-2 py-2 overflow-x-auto scrollbar-hide">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => handleTabClick(tab.id)}
                                className={`shrink-0 px-3 py-1.5 text-xs font-medium whitespace-nowrap border-b-2 transition-all duration-200 ${
                                    activeTab === tab.id
                                        ? "border-[#0066CC] text-[#0066CC] font-semibold"
                                        : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Desktop: Horizontal Layout */}
                <div
                    className={`hidden lg:flex items-center gap-4 px-4 py-3 ${
                        isSticky ? "justify-between" : "justify-center"
                    }`}
                >
                    {/* Left: Property Thumbnail and Info - Only show when sticky */}
                    {isSticky && (
                        <div className="flex items-center gap-3 shrink-0">
                            <img
                                src={thumbnailUrl}
                                alt={property.name || "Property"}
                                className="w-16 h-12 object-cover rounded border border-gray-200"
                            />
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {displayAddress}
                                </p>
                                <p className="text-sm font-semibold text-gray-900">
                                    {formattedPrice}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Middle: Scrollable Tabs with Navigation */}
                    <div
                        className={`flex items-center gap-2 ${
                            isSticky ? "flex-1 min-w-0" : "justify-center"
                        }`}
                    >
                        {/* Left Arrow */}
                        {canScrollLeft && (
                            <button
                                type="button"
                                onClick={() => scrollTabs("left")}
                                className="shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                aria-label="Scroll tabs left"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                        )}

                        {/* Tabs Container */}
                        <div
                            ref={tabsContainerRef}
                            className={`flex items-center gap-1 overflow-x-auto scrollbar-hide ${
                                isSticky ? "flex-1" : ""
                            }`}
                        >
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabClick(tab.id)}
                                    className={`shrink-0 px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200 ${
                                        activeTab === tab.id
                                            ? "border-[#0066CC] text-[#0066CC] font-semibold"
                                            : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Right Arrow */}
                        {canScrollRight && (
                            <button
                                type="button"
                                onClick={() => scrollTabs("right")}
                                className="shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                aria-label="Scroll tabs right"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    {/* Right: Action Buttons - Only show when sticky */}
                    {isSticky && (
                        <div className="flex items-center gap-2 shrink-0">
                            <button
                                type="button"
                                className="px-4 py-2 bg-[#0066CC] text-white text-sm font-semibold rounded hover:bg-[#0052A3] transition-colors whitespace-nowrap"
                            >
                                Request Info
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 bg-white text-[#0066CC] text-sm font-semibold rounded border border-[#0066CC] hover:bg-blue-50 transition-colors whitespace-nowrap"
                            >
                                View Flyer
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
