import { useState, useRef, useEffect } from "react";
import TenantFilters from "./Filters/TenantFilters";
import OccupancyFilters from "./Filters/OccupancyFilters";
import TenantContactsFilters from "./Filters/TenantContactsFilters";

type TenantSection = "tenant" | "occupancy" | "contacts";

// Find the scrollable parent container
const findScrollableParent = (
    element: HTMLElement | null
): HTMLElement | null => {
    if (!element) return null;

    let parent = element.parentElement;
    while (parent) {
        const style = window.getComputedStyle(parent);
        if (
            style.overflowY === "auto" ||
            style.overflowY === "scroll" ||
            style.overflow === "auto" ||
            style.overflow === "scroll"
        ) {
            return parent;
        }
        parent = parent.parentElement;
    }
    return null;
};

export default function TenantSearchContentComponent() {
    const [activeSection, setActiveSection] = useState<TenantSection>("tenant");
    const [retailersOnly, setRetailersOnly] = useState(false);
    const [industryClassification, setIndustryClassification] = useState<
        "industry-type" | "naics-code" | "sic-code"
    >("industry-type");
    const [keywordMatch, setKeywordMatch] = useState<"all" | "any">("all");
    const [creditRatingIncludeUnknown, setCreditRatingIncludeUnknown] =
        useState(false);
    const [revenueIncludeUnknown, setRevenueIncludeUnknown] = useState(false);

    // State for TenantContactsFilters
    const [tenantName, setTenantName] = useState("");
    const [hqLocation, setHqLocation] = useState("");
    const [contactsByRole, setContactsByRole] = useState("");

    // Section refs for scrolling
    const tenantRef = useRef<HTMLDivElement>(null);
    const occupancyRef = useRef<HTMLDivElement>(null);
    const contactsRef = useRef<HTMLDivElement>(null);

    // Scroll to section when tab is clicked
    const scrollToSection = (section: TenantSection) => {
        // Set active section immediately for instant feedback
        setActiveSection(section);
        const refs = {
            tenant: tenantRef,
            occupancy: occupancyRef,
            contacts: contactsRef,
        };

        const targetRef = refs[section];

        if (targetRef.current) {
            // Use requestAnimationFrame to ensure DOM is ready
            requestAnimationFrame(() => {
                if (!targetRef.current) return;

                const target = targetRef.current;
                const scrollableParent = findScrollableParent(target);

                if (scrollableParent) {
                    // Verify container is scrollable
                    if (
                        scrollableParent.scrollHeight <=
                        scrollableParent.clientHeight
                    ) {
                        return;
                    }

                    const containerRect =
                        scrollableParent.getBoundingClientRect();
                    const targetRect = target.getBoundingClientRect();

                    // Calculate the scroll position relative to the scrollable parent
                    const relativePosition = targetRect.top - containerRect.top;
                    const absoluteScrollPosition =
                        scrollableParent.scrollTop + relativePosition;

                    // Ensure we don't scroll beyond bounds
                    const maxScroll =
                        scrollableParent.scrollHeight -
                        scrollableParent.clientHeight;
                    const scrollPosition = Math.max(
                        0,
                        Math.min(absoluteScrollPosition, maxScroll)
                    );

                    // Scroll to the target position
                    scrollableParent.scrollTo({
                        top: scrollPosition,
                        behavior: "smooth",
                    });
                } else {
                    // Fallback to window scroll if no scrollable parent found
                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
            });
        }
    };

    // Track which section is in view (for vertical scrolling)
    useEffect(() => {
        // Find the scrollable parent container
        const container = tenantRef.current
            ? findScrollableParent(tenantRef.current)
            : null;
        if (!container) return;

        const handleScroll = () => {
            const containerRect = container.getBoundingClientRect();
            const containerTop = containerRect.top;
            const containerBottom = containerRect.bottom;

            const sections = [
                { ref: tenantRef, name: "tenant" as const },
                { ref: occupancyRef, name: "occupancy" as const },
                { ref: contactsRef, name: "contacts" as const },
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

    return (
        <div className="flex flex-col bg-gray-50">
            {/* Main Content Tabs - Sticky header */}
            <div className="sticky top-0 z-10 border-b border-gray-200 bg-white px-4 shrink-0">
                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            scrollToSection("tenant");
                        }}
                        className={`relative px-4 py-3 text-sm font-medium border-b-2 transition-all duration-300 ease-in-out ${
                            activeSection === "tenant"
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                        }`}
                    >
                        <span className="relative z-10">Tenant</span>
                        {activeSection === "tenant" && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 animate-pulse" />
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            scrollToSection("occupancy");
                        }}
                        className={`relative px-4 py-3 text-sm font-medium border-b-2 transition-all duration-300 ease-in-out ${
                            activeSection === "occupancy"
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                        }`}
                    >
                        <span className="relative z-10">Occupancy</span>
                        {activeSection === "occupancy" && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 animate-pulse" />
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            scrollToSection("contacts");
                        }}
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
                </div>
            </div>

            {/* Content Sections */}
            <div className="flex flex-col gap-4 p-4">
                {/* Tenant Section */}
                <div
                    ref={tenantRef}
                    className="w-full shrink-0 bg-white rounded-lg border border-gray-200 shadow-sm"
                    style={{ scrollSnapAlign: "start" }}
                >
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                            Tenant
                        </h2>
                        <TenantFilters
                            retailersOnly={retailersOnly}
                            industryClassification={industryClassification}
                            keywordMatch={keywordMatch}
                            creditRatingIncludeUnknown={
                                creditRatingIncludeUnknown
                            }
                            revenueIncludeUnknown={revenueIncludeUnknown}
                            onRetailersOnlyChange={setRetailersOnly}
                            onIndustryClassificationChange={
                                setIndustryClassification
                            }
                            onKeywordMatchChange={setKeywordMatch}
                            onCreditRatingIncludeUnknownChange={
                                setCreditRatingIncludeUnknown
                            }
                            onRevenueIncludeUnknownChange={
                                setRevenueIncludeUnknown
                            }
                        />
                    </div>
                </div>

                {/* Occupancy Section */}
                <div
                    ref={occupancyRef}
                    className="w-full shrink-0 bg-white rounded-lg border border-gray-200 shadow-sm"
                    style={{ scrollSnapAlign: "start" }}
                >
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                            Occupancy
                        </h2>
                        <OccupancyFilters />
                    </div>
                </div>

                {/* Contacts Section */}
                <div
                    ref={contactsRef}
                    className="w-full shrink-0 bg-white rounded-lg border border-gray-200 shadow-sm"
                    style={{ scrollSnapAlign: "start" }}
                >
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                            Contacts
                        </h2>
                        <TenantContactsFilters
                            tenantName={tenantName}
                            hqLocation={hqLocation}
                            contactsByRole={contactsByRole}
                            onTenantNameChange={setTenantName}
                            onHqLocationChange={setHqLocation}
                            onContactsByRoleChange={setContactsByRole}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
