import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Info } from "lucide-react";

type TenantSection = "tenant" | "occupancy" | "contacts";

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

    // Section refs for scrolling
    const tenantRef = useRef<HTMLDivElement>(null);
    const occupancyRef = useRef<HTMLDivElement>(null);
    const contactsRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

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
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
            {/* Main Content Tabs - Act as section references */}
            <div className="border-b border-gray-200 bg-white px-4 shrink-0">
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => scrollToSection("tenant")}
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
                        onClick={() => scrollToSection("occupancy")}
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
                </div>
            </div>

            {/* Vertically Scrollable Content */}
            <div
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50"
                style={{ scrollSnapType: "y mandatory" }}
            >
                <div className="flex flex-col gap-4 p-4">
                    {/* Tenant Section */}
                    <div
                        ref={tenantRef}
                        className="w-full shrink-0 bg-white rounded-lg border border-gray-200 shadow-sm overflow-y-auto"
                        style={{ scrollSnapAlign: "start" }}
                    >
                        <div className="p-6 space-y-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                                Tenant
                            </h2>

                            {/* Tenant */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tenant
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Tenant Name or Ticker"
                                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Total Employees */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Total Employees
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

                            {/* Company Growth */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Company Growth
                                </label>
                                <div className="relative">
                                    <select className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10">
                                        <option>Select</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Credit Rating */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Credit Rating
                                </label>
                                <div className="relative mb-2">
                                    <select className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10">
                                        <option>Select</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="credit-rating-unknown"
                                        checked={creditRatingIncludeUnknown}
                                        onChange={(e) =>
                                            setCreditRatingIncludeUnknown(
                                                e.target.checked
                                            )
                                        }
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <label
                                        htmlFor="credit-rating-unknown"
                                        className="ml-2 text-sm text-gray-700"
                                    >
                                        Include Unknown
                                    </label>
                                </div>
                            </div>

                            {/* Revenue */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Revenue
                                </label>
                                <div className="relative mb-2">
                                    <select className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10">
                                        <option>Select</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="revenue-unknown"
                                        checked={revenueIncludeUnknown}
                                        onChange={(e) =>
                                            setRevenueIncludeUnknown(
                                                e.target.checked
                                            )
                                        }
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <label
                                        htmlFor="revenue-unknown"
                                        className="ml-2 text-sm text-gray-700"
                                    >
                                        Include Unknown
                                    </label>
                                </div>
                            </div>

                            {/* Retailers Only */}
                            <div className="flex items-center gap-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Retailers Only
                                </label>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setRetailersOnly(!retailersOnly)
                                    }
                                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                                        retailersOnly
                                            ? "bg-blue-600"
                                            : "bg-gray-300"
                                    }`}
                                    role="switch"
                                    aria-checked={retailersOnly}
                                >
                                    <span
                                        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                                            retailersOnly
                                                ? "translate-x-5"
                                                : "translate-x-0.5"
                                        }`}
                                    />
                                </button>
                                <button className="text-blue-500 hover:text-blue-600">
                                    <Info className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Industry Classification */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Industry Classification
                                </label>
                                <div className="flex items-center gap-4 mb-3">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="industry-classification"
                                            value="industry-type"
                                            checked={
                                                industryClassification ===
                                                "industry-type"
                                            }
                                            onChange={(e) =>
                                                setIndustryClassification(
                                                    e.target.value as
                                                        | "industry-type"
                                                        | "naics-code"
                                                        | "sic-code"
                                                )
                                            }
                                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">
                                            Industry Type
                                        </span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="industry-classification"
                                            value="naics-code"
                                            checked={
                                                industryClassification ===
                                                "naics-code"
                                            }
                                            onChange={(e) =>
                                                setIndustryClassification(
                                                    e.target.value as
                                                        | "industry-type"
                                                        | "naics-code"
                                                        | "sic-code"
                                                )
                                            }
                                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">
                                            NAICS Code
                                        </span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="industry-classification"
                                            value="sic-code"
                                            checked={
                                                industryClassification ===
                                                "sic-code"
                                            }
                                            onChange={(e) =>
                                                setIndustryClassification(
                                                    e.target.value as
                                                        | "industry-type"
                                                        | "naics-code"
                                                        | "sic-code"
                                                )
                                            }
                                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">
                                            SIC Code
                                        </span>
                                    </label>
                                </div>
                                <div className="relative">
                                    <select className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10">
                                        <option>Select</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Territory */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Territory
                                </label>
                                <div className="relative">
                                    <select className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10">
                                        <option>Select</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Company Description Keyword Search */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Company Description Keyword Search
                                </label>
                                <input
                                    type="text"
                                    placeholder="Use quotes for specific phrases"
                                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-3"
                                />
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="keyword-match"
                                            value="all"
                                            checked={keywordMatch === "all"}
                                            onChange={(e) =>
                                                setKeywordMatch(
                                                    e.target.value as
                                                        | "all"
                                                        | "any"
                                                )
                                            }
                                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">
                                            Match all keywords
                                        </span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="keyword-match"
                                            value="any"
                                            checked={keywordMatch === "any"}
                                            onChange={(e) =>
                                                setKeywordMatch(
                                                    e.target.value as
                                                        | "all"
                                                        | "any"
                                                )
                                            }
                                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">
                                            Match any keywords
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Occupancy Section */}
                    <div
                        ref={occupancyRef}
                        className="w-full shrink-0 bg-white rounded-lg border border-gray-200 shadow-sm overflow-y-auto"
                        style={{ scrollSnapAlign: "start" }}
                    >
                        <div className="p-6 space-y-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                                Occupancy
                            </h2>

                            {/* Number of Locations */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Number of Locations
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="Min"
                                        value="5"
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

                            {/* Size Occupied */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Size Occupied
                                </label>
                                <div className="relative">
                                    <select className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10">
                                        <option>Select</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* in the following location */}
                            <div>
                                <div className="flex items-center gap-1 mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        in the following location
                                    </label>
                                    <button className="text-blue-500 hover:text-blue-600">
                                        <Info className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Market or Country"
                                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Headquarters Location */}
                            <div>
                                <div className="flex items-center gap-1 mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Headquarters Location
                                    </label>
                                    <button className="text-blue-500 hover:text-blue-600">
                                        <Info className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Market, City, Postal Code or Country"
                                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Search companies with locations that meet the following criteria */}
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-4">
                                    Search companies with locations that meet
                                    the following criteria:
                                </p>

                                {/* Space Use */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Space Use
                                    </label>
                                    <div className="relative">
                                        <select className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10">
                                            <option>Select</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Lease Expirations */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Lease Expirations
                                    </label>
                                    <div className="relative">
                                        <select className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10">
                                            <option>Select</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Transaction Activity */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Transaction Activity
                                    </label>
                                    <div className="relative">
                                        <select className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10">
                                            <option>Select</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contacts Section */}
                    <div
                        ref={contactsRef}
                        className="w-full shrink-0 bg-white rounded-lg border border-gray-200 shadow-sm overflow-y-auto"
                        style={{ scrollSnapAlign: "start" }}
                    >
                        <div className="p-6 space-y-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                                Contacts
                            </h2>

                            <div className="grid grid-cols-2 gap-6">
                                {/* Left Column */}
                                <div className="space-y-6">
                                    {/* Tenant Contact */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tenant Contact
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Contact Name"
                                                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            />
                                            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* Landlord */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Landlord
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Company or Contact Name"
                                                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            />
                                            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* Property Manager */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Property Manager
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Company or Contact Name"
                                                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            />
                                            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-6">
                                    {/* Tenant Representative */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tenant Representative
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Company or Contact Name"
                                                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            />
                                            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* Leasing Representative */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Leasing Representative
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Company or Contact Name"
                                                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            />
                                            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* Owner Type */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Owner Type
                                        </label>
                                        <div className="relative">
                                            <select className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10">
                                                <option>Select</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
