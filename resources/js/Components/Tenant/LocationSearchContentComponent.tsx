import { useState, useRef, useEffect } from "react";
import PortfolioFilters from "./Filters/PortfolioFilters";
import LeasesFilters from "./Filters/LeasesFilters";
import PropertyFilters from "./Filters/PropertyFilters";
import TenantContactsFilters from "./Filters/TenantContactsFilters";

type LocationSearchSection = "portfolio" | "leases" | "property" | "contacts";

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

export default function LocationSearchContentComponent() {
    const [activeSection, setActiveSection] =
        useState<LocationSearchSection>("portfolio");

    // State for PortfolioFilters
    const [spaceUse, setSpaceUse] = useState("");
    const [sizeOccupiedMin, setSizeOccupiedMin] = useState("");
    const [sizeOccupiedMax, setSizeOccupiedMax] = useState("");
    const [sizeOccupiedUnit, setSizeOccupiedUnit] = useState("SF");
    const [occupancy, setOccupancy] = useState("");

    // State for LeasesFilters
    const [leaseDate, setLeaseDate] = useState("");
    const [leaseTermMin, setLeaseTermMin] = useState("");
    const [leaseTermMax, setLeaseTermMax] = useState("");
    const [annualRentMin, setAnnualRentMin] = useState("");
    const [annualRentMax, setAnnualRentMax] = useState("");

    // State for PropertyFilters
    const [propertyType, setPropertyType] = useState("");
    const [locationType, setLocationType] = useState("");
    const [costarRating, setCostarRating] = useState(0);

    // State for TenantContactsFilters
    const [tenantName, setTenantName] = useState("");
    const [hqLocation, setHqLocation] = useState("");
    const [contactsByRole, setContactsByRole] = useState("");

    // Section refs for scrolling
    const portfolioRef = useRef<HTMLDivElement>(null);
    const leasesRef = useRef<HTMLDivElement>(null);
    const propertyRef = useRef<HTMLDivElement>(null);
    const contactsRef = useRef<HTMLDivElement>(null);

    // Scroll to section when tab is clicked
    const scrollToSection = (section: LocationSearchSection) => {
        setActiveSection(section);
        const refs = {
            portfolio: portfolioRef,
            leases: leasesRef,
            property: propertyRef,
            contacts: contactsRef,
        };

        const targetRef = refs[section];

        if (targetRef.current) {
            requestAnimationFrame(() => {
                if (!targetRef.current) return;

                const target = targetRef.current;
                const scrollableParent = findScrollableParent(target);

                if (scrollableParent) {
                    if (
                        scrollableParent.scrollHeight <=
                        scrollableParent.clientHeight
                    ) {
                        return;
                    }

                    const containerRect = scrollableParent.getBoundingClientRect();
                    const targetRect = target.getBoundingClientRect();

                    const relativePosition = targetRect.top - containerRect.top;
                    const absoluteScrollPosition =
                        scrollableParent.scrollTop + relativePosition;

                    const maxScroll =
                        scrollableParent.scrollHeight -
                        scrollableParent.clientHeight;
                    const scrollPosition = Math.max(
                        0,
                        Math.min(absoluteScrollPosition, maxScroll)
                    );

                    scrollableParent.scrollTo({
                        top: scrollPosition,
                        behavior: "smooth",
                    });
                } else {
                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
            });
        }
    };

    // Track which section is in view
    useEffect(() => {
        const container = portfolioRef.current
            ? findScrollableParent(portfolioRef.current)
            : null;
        if (!container) return;

        const handleScroll = () => {
            const containerRect = container.getBoundingClientRect();
            const containerTop = containerRect.top;
            const containerBottom = containerRect.bottom;

            const sections = [
                { ref: portfolioRef, name: "portfolio" as const },
                { ref: leasesRef, name: "leases" as const },
                { ref: propertyRef, name: "property" as const },
                { ref: contactsRef, name: "contacts" as const },
            ];

            let mostVisibleSection = sections[0];
            let maxVisibility = 0;

            for (const section of sections) {
                if (section.ref.current) {
                    const sectionRect =
                        section.ref.current.getBoundingClientRect();
                    const sectionTop = sectionRect.top;
                    const sectionBottom = sectionRect.bottom;
                    const sectionHeight = sectionRect.height;

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

                    const distanceFromTop = Math.abs(sectionTop - containerTop);

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
                            scrollToSection("portfolio");
                        }}
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
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            scrollToSection("leases");
                        }}
                        className={`relative px-4 py-3 text-sm font-medium border-b-2 transition-all duration-300 ease-in-out ${
                            activeSection === "leases"
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                        }`}
                    >
                        <span className="relative z-10">Leases</span>
                        {activeSection === "leases" && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 animate-pulse" />
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            scrollToSection("property");
                        }}
                        className={`relative px-4 py-3 text-sm font-medium border-b-2 transition-all duration-300 ease-in-out ${
                            activeSection === "property"
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                        }`}
                    >
                        <span className="relative z-10">Property</span>
                        {activeSection === "property" && (
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
                {/* Portfolio Section */}
                <div
                    ref={portfolioRef}
                    className="w-full shrink-0 bg-white rounded-lg border border-gray-200 shadow-sm"
                    style={{ scrollSnapAlign: "start" }}
                >
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                            Portfolio
                        </h2>
                        <PortfolioFilters
                            spaceUse={spaceUse}
                            sizeOccupiedMin={sizeOccupiedMin}
                            sizeOccupiedMax={sizeOccupiedMax}
                            sizeOccupiedUnit={sizeOccupiedUnit}
                            occupancy={occupancy}
                            onSpaceUseChange={setSpaceUse}
                            onSizeOccupiedChange={(min, max) => {
                                setSizeOccupiedMin(min);
                                setSizeOccupiedMax(max);
                            }}
                            onSizeOccupiedUnitChange={setSizeOccupiedUnit}
                            onOccupancyChange={setOccupancy}
                        />
                    </div>
                </div>

                {/* Leases Section */}
                <div
                    ref={leasesRef}
                    className="w-full shrink-0 bg-white rounded-lg border border-gray-200 shadow-sm"
                    style={{ scrollSnapAlign: "start" }}
                >
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                            Leases
                        </h2>
                        <LeasesFilters
                            leaseDate={leaseDate}
                            leaseTermMin={leaseTermMin}
                            leaseTermMax={leaseTermMax}
                            annualRentMin={annualRentMin}
                            annualRentMax={annualRentMax}
                            onLeaseDateChange={setLeaseDate}
                            onLeaseTermChange={(min, max) => {
                                setLeaseTermMin(min);
                                setLeaseTermMax(max);
                            }}
                            onAnnualRentChange={(min, max) => {
                                setAnnualRentMin(min);
                                setAnnualRentMax(max);
                            }}
                        />
                    </div>
                </div>

                {/* Property Section */}
                <div
                    ref={propertyRef}
                    className="w-full shrink-0 bg-white rounded-lg border border-gray-200 shadow-sm"
                    style={{ scrollSnapAlign: "start" }}
                >
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                            Property
                        </h2>
                        <PropertyFilters
                            propertyType={propertyType}
                            locationType={locationType}
                            costarRating={costarRating}
                            onPropertyTypeChange={setPropertyType}
                            onLocationTypeChange={setLocationType}
                            onCostarRatingChange={setCostarRating}
                        />
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

