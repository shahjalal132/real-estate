import { useState, useRef, useEffect } from "react";
import SpaceFilters from "./Filters/SpaceFilters";
import LocationTenantFilters from "./Filters/LocationTenantFilters";
import BuildingFilters from "./Filters/BuildingFilters";
import LocationContactsFilters from "./Filters/LocationContactsFilters";

type TenantLocationSearchSection = "space" | "tenant" | "building" | "contacts";

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

export default function TenantLocationSearchContentComponent() {
    const [activeSection, setActiveSection] =
        useState<TenantLocationSearchSection>("space");

    // State for SpaceFilters
    const [spaceUse, setSpaceUse] = useState("");
    const [sizeOccupied, setSizeOccupied] = useState("");
    const [occupancyType, setOccupancyType] = useState("");
    const [movedIn, setMovedIn] = useState("");
    const [expiration, setExpiration] = useState("");
    const [includeMonthToMonth, setIncludeMonthToMonth] = useState(false);
    const [retailStoreType, setRetailStoreType] = useState("");
    const [breakDate, setBreakDate] = useState("");
    const [reviewDate, setReviewDate] = useState("");
    const [rentalRateMin, setRentalRateMin] = useState("");
    const [rentalRateMax, setRentalRateMax] = useState("");
    const [rentalRateUnit, setRentalRateUnit] = useState("SF/Yr");
    const [includeStartingRentOnly, setIncludeStartingRentOnly] = useState(false);
    const [services, setServices] = useState("");
    const [employeesAtLocationMin, setEmployeesAtLocationMin] = useState("");
    const [employeesAtLocationMax, setEmployeesAtLocationMax] = useState("");
    const [areaPerEmployeeMin, setAreaPerEmployeeMin] = useState("");
    const [areaPerEmployeeMax, setAreaPerEmployeeMax] = useState("");
    const [headquartersOnly, setHeadquartersOnly] = useState(false);
    const [tenantInsights, setTenantInsights] = useState("");
    const [futureMove, setFutureMove] = useState("");
    const [futureMoveType, setFutureMoveType] = useState("");

    // State for LocationTenantFilters
    const [tenancy, setTenancy] = useState<"vacant" | "single" | "multi" | "">("");
    const [tenantName, setTenantName] = useState("");
    const [totalEmployeesMin, setTotalEmployeesMin] = useState("");
    const [totalEmployeesMax, setTotalEmployeesMax] = useState("");
    const [creditRating, setCreditRating] = useState("");
    const [creditRatingIncludeUnknown, setCreditRatingIncludeUnknown] =
        useState(false);
    const [companyGrowth, setCompanyGrowth] = useState("");
    const [revenue, setRevenue] = useState("");
    const [revenueIncludeUnknown, setRevenueIncludeUnknown] = useState(false);
    const [retailersOnly, setRetailersOnly] = useState(false);
    const [industryClassification, setIndustryClassification] = useState<
        "industry-type" | "naics-code" | "sic-code"
    >("industry-type");
    const [industryValue, setIndustryValue] = useState("");
    const [territory, setTerritory] = useState("");
    const [keywordSearch, setKeywordSearch] = useState("");
    const [keywordMatch, setKeywordMatch] = useState<"all" | "any">("all");

    // State for BuildingFilters
    const [costarRating, setCostarRating] = useState(0);
    const [buildingPropertyType, setBuildingPropertyType] = useState("");
    const [propertySize, setPropertySize] = useState("");
    const [secondaryType, setSecondaryType] = useState("");
    const [property, setProperty] = useState("");
    const [propertyId, setPropertyId] = useState("");
    const [shoppingCenterType, setShoppingCenterType] = useState("");
    const [percentLeasedMin, setPercentLeasedMin] = useState("");
    const [percentLeasedMax, setPercentLeasedMax] = useState("");
    const [buildingTenancy, setBuildingTenancy] = useState<
        "single" | "multiple" | ""
    >("");
    const [buildingTenancyIncludeUnknown, setBuildingTenancyIncludeUnknown] =
        useState(false);
    const [ownerOccupied, setOwnerOccupied] = useState<"yes" | "no" | "">("");
    const [ownerOccupiedIncludeUnknown, setOwnerOccupiedIncludeUnknown] =
        useState(false);

    // State for LocationContactsFilters
    const [locationTenantName, setLocationTenantName] = useState("");
    const [locationHqLocation, setLocationHqLocation] = useState("");
    const [locationContactsByRole, setLocationContactsByRole] = useState("");

    // Section refs for scrolling
    const spaceRef = useRef<HTMLDivElement>(null);
    const tenantRef = useRef<HTMLDivElement>(null);
    const buildingRef = useRef<HTMLDivElement>(null);
    const contactsRef = useRef<HTMLDivElement>(null);

    // Scroll to section when tab is clicked
    const scrollToSection = (section: TenantLocationSearchSection) => {
        setActiveSection(section);
        const refs = {
            space: spaceRef,
            tenant: tenantRef,
            building: buildingRef,
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
        const container = spaceRef.current
            ? findScrollableParent(spaceRef.current)
            : null;
        if (!container) return;

        const handleScroll = () => {
            const containerRect = container.getBoundingClientRect();
            const containerTop = containerRect.top;
            const containerBottom = containerRect.bottom;

            const sections = [
                { ref: spaceRef, name: "space" as const },
                { ref: tenantRef, name: "tenant" as const },
                { ref: buildingRef, name: "building" as const },
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
                            scrollToSection("space");
                        }}
                        className={`relative px-4 py-3 text-sm font-medium border-b-2 transition-all duration-300 ease-in-out ${
                            activeSection === "space"
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                        }`}
                    >
                        <span className="relative z-10">Space</span>
                        {activeSection === "space" && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 animate-pulse" />
                        )}
                    </button>
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
                            scrollToSection("building");
                        }}
                        className={`relative px-4 py-3 text-sm font-medium border-b-2 transition-all duration-300 ease-in-out ${
                            activeSection === "building"
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                        }`}
                    >
                        <span className="relative z-10">Building</span>
                        {activeSection === "building" && (
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
                {/* Space Section */}
                <div
                    ref={spaceRef}
                    className="w-full shrink-0 bg-white rounded-lg border border-gray-200 shadow-sm"
                    style={{ scrollSnapAlign: "start" }}
                >
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                            Space
                        </h2>
                        <SpaceFilters
                            spaceUse={spaceUse}
                            sizeOccupied={sizeOccupied}
                            occupancyType={occupancyType}
                            movedIn={movedIn}
                            expiration={expiration}
                            includeMonthToMonth={includeMonthToMonth}
                            retailStoreType={retailStoreType}
                            breakDate={breakDate}
                            reviewDate={reviewDate}
                            rentalRateMin={rentalRateMin}
                            rentalRateMax={rentalRateMax}
                            rentalRateUnit={rentalRateUnit}
                            includeStartingRentOnly={includeStartingRentOnly}
                            services={services}
                            employeesAtLocationMin={employeesAtLocationMin}
                            employeesAtLocationMax={employeesAtLocationMax}
                            areaPerEmployeeMin={areaPerEmployeeMin}
                            areaPerEmployeeMax={areaPerEmployeeMax}
                            headquartersOnly={headquartersOnly}
                            tenantInsights={tenantInsights}
                            futureMove={futureMove}
                            futureMoveType={futureMoveType}
                            onSpaceUseChange={setSpaceUse}
                            onSizeOccupiedChange={setSizeOccupied}
                            onOccupancyTypeChange={setOccupancyType}
                            onMovedInChange={setMovedIn}
                            onExpirationChange={setExpiration}
                            onIncludeMonthToMonthChange={setIncludeMonthToMonth}
                            onRetailStoreTypeChange={setRetailStoreType}
                            onBreakDateChange={setBreakDate}
                            onReviewDateChange={setReviewDate}
                            onRentalRateChange={(min, max) => {
                                setRentalRateMin(min);
                                setRentalRateMax(max);
                            }}
                            onRentalRateUnitChange={setRentalRateUnit}
                            onIncludeStartingRentOnlyChange={setIncludeStartingRentOnly}
                            onServicesChange={setServices}
                            onEmployeesAtLocationChange={(min, max) => {
                                setEmployeesAtLocationMin(min);
                                setEmployeesAtLocationMax(max);
                            }}
                            onAreaPerEmployeeChange={(min, max) => {
                                setAreaPerEmployeeMin(min);
                                setAreaPerEmployeeMax(max);
                            }}
                            onHeadquartersOnlyChange={setHeadquartersOnly}
                            onTenantInsightsChange={setTenantInsights}
                            onFutureMoveChange={setFutureMove}
                            onFutureMoveTypeChange={setFutureMoveType}
                        />
                    </div>
                </div>

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
                        <LocationTenantFilters
                            tenancy={tenancy}
                            onTenancyChange={setTenancy}
                            tenantName={tenantName}
                            totalEmployeesMin={totalEmployeesMin}
                            totalEmployeesMax={totalEmployeesMax}
                            creditRating={creditRating}
                            creditRatingIncludeUnknown={creditRatingIncludeUnknown}
                            companyGrowth={companyGrowth}
                            revenue={revenue}
                            revenueIncludeUnknown={revenueIncludeUnknown}
                            retailersOnly={retailersOnly}
                            industryClassification={industryClassification}
                            industryValue={industryValue}
                            territory={territory}
                            keywordSearch={keywordSearch}
                            keywordMatch={keywordMatch}
                            onTenantNameChange={setTenantName}
                            onTotalEmployeesChange={(min, max) => {
                                setTotalEmployeesMin(min);
                                setTotalEmployeesMax(max);
                            }}
                            onCreditRatingChange={setCreditRating}
                            onCreditRatingIncludeUnknownChange={
                                setCreditRatingIncludeUnknown
                            }
                            onCompanyGrowthChange={setCompanyGrowth}
                            onRevenueChange={setRevenue}
                            onRevenueIncludeUnknownChange={setRevenueIncludeUnknown}
                            onRetailersOnlyChange={setRetailersOnly}
                            onIndustryClassificationChange={
                                setIndustryClassification
                            }
                            onIndustryValueChange={setIndustryValue}
                            onTerritoryChange={setTerritory}
                            onKeywordSearchChange={setKeywordSearch}
                            onKeywordMatchChange={setKeywordMatch}
                        />
                    </div>
                </div>

                {/* Building Section */}
                <div
                    ref={buildingRef}
                    className="w-full shrink-0 bg-white rounded-lg border border-gray-200 shadow-sm"
                    style={{ scrollSnapAlign: "start" }}
                >
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                            Building
                        </h2>
                        <BuildingFilters
                            costarRating={costarRating}
                            propertyType={buildingPropertyType}
                            propertySize={propertySize}
                            secondaryType={secondaryType}
                            property={property}
                            propertyId={propertyId}
                            shoppingCenterType={shoppingCenterType}
                            percentLeasedMin={percentLeasedMin}
                            percentLeasedMax={percentLeasedMax}
                            tenancy={buildingTenancy}
                            tenancyIncludeUnknown={buildingTenancyIncludeUnknown}
                            ownerOccupied={ownerOccupied}
                            ownerOccupiedIncludeUnknown={ownerOccupiedIncludeUnknown}
                            onCostarRatingChange={setCostarRating}
                            onPropertyTypeChange={setBuildingPropertyType}
                            onPropertySizeChange={setPropertySize}
                            onSecondaryTypeChange={setSecondaryType}
                            onPropertyChange={setProperty}
                            onPropertyIdChange={setPropertyId}
                            onShoppingCenterTypeChange={setShoppingCenterType}
                            onPercentLeasedChange={(min, max) => {
                                setPercentLeasedMin(min);
                                setPercentLeasedMax(max);
                            }}
                            onTenancyChange={setBuildingTenancy}
                            onTenancyIncludeUnknownChange={
                                setBuildingTenancyIncludeUnknown
                            }
                            onOwnerOccupiedChange={setOwnerOccupied}
                            onOwnerOccupiedIncludeUnknownChange={
                                setOwnerOccupiedIncludeUnknown
                            }
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
                        <LocationContactsFilters
                            tenantName={locationTenantName}
                            hqLocation={locationHqLocation}
                            contactsByRole={locationContactsByRole}
                            onTenantNameChange={setLocationTenantName}
                            onHqLocationChange={setLocationHqLocation}
                            onContactsByRoleChange={setLocationContactsByRole}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

