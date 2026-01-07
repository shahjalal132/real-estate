import { useState, useRef, useEffect } from "react";
import { X, Search, MapPin } from "lucide-react";
import PortfolioFilters from "./Filters/PortfolioFilters";
import SalesTransactionsFilters from "./Filters/SalesTransactionsFilters";
import SalesListingsFilters from "./Filters/SalesListingsFilters";
import FundsFilters from "./Filters/FundsFilters";
import LocationFilters from "./Filters/LocationFilters";

interface OwnerFundsAdvancedFilterProps {
    isOpen: boolean;
    onClose: () => void;
    onClear: () => void;
    onDone: () => void;
    activeFiltersCount?: number;
}

type TabType = "portfolio" | "sales-comps" | "sales-listings" | "funds";

export default function OwnerFundsAdvancedFilter({
    isOpen,
    onClose,
    onClear,
    onDone,
}: OwnerFundsAdvancedFilterProps) {
    const [topTab, setTopTab] = useState<"search" | "location">("search");
    const [activeTab, setActiveTab] = useState<TabType>("portfolio");
    const [activeLocationTab, setActiveLocationTab] = useState<
        "city" | "market" | "country"
    >("city");

    // Section refs for scrolling (Search tab)
    const portfolioRef = useRef<HTMLDivElement>(null);
    const salesCompsRef = useRef<HTMLDivElement>(null);
    const salesListingsRef = useRef<HTMLDivElement>(null);
    const fundsRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Section refs for scrolling (Location tab)
    const cityRef = useRef<HTMLDivElement>(null);
    const marketRef = useRef<HTMLDivElement>(null);
    const countryRef = useRef<HTMLDivElement>(null);
    const locationScrollContainerRef = useRef<HTMLDivElement>(null);

    // Scroll to section when tab is clicked (Search tab)
    const scrollToSection = (section: TabType) => {
        setActiveTab(section);
        const refs = {
            portfolio: portfolioRef,
            "sales-comps": salesCompsRef,
            "sales-listings": salesListingsRef,
            funds: fundsRef,
        };

        const targetRef = refs[section];
        if (targetRef.current && scrollContainerRef.current) {
            targetRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    // Scroll to section when location tab is clicked
    const scrollToLocationSection = (
        section: "city" | "market" | "country"
    ) => {
        setActiveLocationTab(section);
        const refs = {
            city: cityRef,
            market: marketRef,
            country: countryRef,
        };

        const targetRef = refs[section];
        if (targetRef.current && locationScrollContainerRef.current) {
            targetRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    // Track which section is in view (for vertical scrolling - Search tab)
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container || topTab !== "search") return;

        const handleScroll = () => {
            const containerRect = container.getBoundingClientRect();
            const containerTop = containerRect.top;
            const containerBottom = containerRect.bottom;

            const sections = [
                { ref: portfolioRef, name: "portfolio" as const },
                { ref: salesCompsRef, name: "sales-comps" as const },
                { ref: salesListingsRef, name: "sales-listings" as const },
                { ref: fundsRef, name: "funds" as const },
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
                setActiveTab(mostVisibleSection.name);
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
        handleScroll();
        const timeoutId = setTimeout(handleScroll, 100);

        return () => {
            container.removeEventListener("scroll", throttledHandleScroll);
            clearTimeout(timeoutId);
        };
    }, [topTab]);

    // Track which location section is in view (for vertical scrolling - Location tab)
    useEffect(() => {
        const container = locationScrollContainerRef.current;
        if (!container || topTab !== "location") return;

        const handleScroll = () => {
            const containerRect = container.getBoundingClientRect();
            const containerTop = containerRect.top;
            const containerBottom = containerRect.bottom;

            const sections = [
                { ref: cityRef, name: "city" as const },
                { ref: marketRef, name: "market" as const },
                { ref: countryRef, name: "country" as const },
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
                setActiveLocationTab(mostVisibleSection.name);
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
        handleScroll();
        const timeoutId = setTimeout(handleScroll, 100);

        return () => {
            container.removeEventListener("scroll", throttledHandleScroll);
            clearTimeout(timeoutId);
        };
    }, [topTab]);

    // Portfolio tab state
    const [portfolioSizeMin, setPortfolioSizeMin] = useState<string>("");
    const [portfolioSizeMax, setPortfolioSizeMax] = useState<string>("");
    const [propertiesOwnedBasis, setPropertiesOwnedBasis] =
        useState<string>("# of Properties");
    const [propertiesOwnedMin, setPropertiesOwnedMin] = useState<string>("");
    const [propertiesOwnedMax, setPropertiesOwnedMax] = useState<string>("");
    const [propertyCriteria, setPropertyCriteria] = useState<"1" | "2">("1");
    const [propertyCriteriaValue, setPropertyCriteriaValue] =
        useState<string>("");
    const [portfolioPropertyType, setPortfolioPropertyType] =
        useState<string>("");
    const [portfolioSecondaryType, setPortfolioSecondaryType] =
        useState<string>("");
    const [propertySizeBasis, setPropertySizeBasis] = useState<string>("SF");
    const [propertySizeMin, setPropertySizeMin] = useState<string>("");
    const [propertySizeMax, setPropertySizeMax] = useState<string>("");
    const [costarRating, setCostarRating] = useState<number>(0);
    const [locationType, setLocationType] = useState<string[]>([]);

    // Sales Transactions tab state
    const [numSalesTransactions, setNumSalesTransactions] =
        useState<string>("");
    const [soldWithin, setSoldWithin] = useState<string>("");
    const [dealRole, setDealRole] = useState<string[]>([]);
    const [totalDealValueMin, setTotalDealValueMin] = useState<string>("");
    const [totalDealValueMax, setTotalDealValueMax] = useState<string>("");
    const [individualDealValueBasis, setIndividualDealValueBasis] =
        useState<string>("Total");
    const [individualDealValueMin, setIndividualDealValueMin] =
        useState<string>("");
    const [individualDealValueMax, setIndividualDealValueMax] =
        useState<string>("");
    const [includeUndisclosedSalePrice, setIncludeUndisclosedSalePrice] =
        useState<boolean>(false);
    const [totalDealSizeBasis, setTotalDealSizeBasis] = useState<string>("SF");
    const [totalDealSizeMin, setTotalDealSizeMin] = useState<string>("");
    const [totalDealSizeMax, setTotalDealSizeMax] = useState<string>("");
    const [individualDealSizeBasis, setIndividualDealSizeBasis] =
        useState<string>("SF");
    const [individualDealSizeMin, setIndividualDealSizeMin] =
        useState<string>("");
    const [individualDealSizeMax, setIndividualDealSizeMax] =
        useState<string>("");
    const [salesCompsPropertyType, setSalesCompsPropertyType] =
        useState<string>("");
    const [salesCompsCostarRating, setSalesCompsCostarRating] =
        useState<number>(0);
    const [salesCompsSecondaryType, setSalesCompsSecondaryType] =
        useState<string>("");

    // Sales Listings tab state
    const [numListingsMin, setNumListingsMin] = useState<string>("");
    const [numListingsMax, setNumListingsMax] = useState<string>("");
    const [totalAreaForSaleBasis, setTotalAreaForSaleBasis] =
        useState<string>("SF");
    const [totalAreaForSaleMin, setTotalAreaForSaleMin] = useState<string>("");
    const [totalAreaForSaleMax, setTotalAreaForSaleMax] = useState<string>("");
    const [totalAskingPriceMin, setTotalAskingPriceMin] = useState<string>("");
    const [totalAskingPriceMax, setTotalAskingPriceMax] = useState<string>("");
    const [individualAskingPriceBasis, setIndividualAskingPriceBasis] =
        useState<string>("Total");
    const [individualAskingPriceMin, setIndividualAskingPriceMin] =
        useState<string>("");
    const [individualAskingPriceMax, setIndividualAskingPriceMax] =
        useState<string>("");
    const [includeUndisclosedAskingPrice, setIncludeUndisclosedAskingPrice] =
        useState<boolean>(false);
    const [salesListingsPropertyType, setSalesListingsPropertyType] =
        useState<string>("");
    const [salesListingsCostarRating, setSalesListingsCostarRating] =
        useState<number>(0);
    const [salesListingsSecondaryType, setSalesListingsSecondaryType] =
        useState<string>("");

    // Funds tab state
    const [fundName, setFundName] = useState<string>("");
    const [fundStatus, setFundStatus] = useState<string[]>([]);
    const [fundPropertyFocus, setFundPropertyFocus] = useState<string[]>([]);
    const [fundStrategy, setFundStrategy] = useState<string[]>([]);
    const [fundStructure, setFundStructure] = useState<string>("");
    const [fundCountryFocus, setFundCountryFocus] = useState<string[]>([]);
    const [fundSizeMin, setFundSizeMin] = useState<string>("");
    const [fundSizeMax, setFundSizeMax] = useState<string>("");
    const [dryPowderMin, setDryPowderMin] = useState<string>("");
    const [dryPowderMax, setDryPowderMax] = useState<string>("");
    const [aumMin, setAumMin] = useState<string>("");
    const [aumMax, setAumMax] = useState<string>("");
    const [launchDate, setLaunchDate] = useState<string>("");
    const [finalCloseDate, setFinalCloseDate] = useState<string>("");
    const [vintageMin, setVintageMin] = useState<string>("");
    const [vintageMax, setVintageMax] = useState<string>("");
    const [monthsInMarketMin, setMonthsInMarketMin] = useState<string>("");
    const [monthsInMarketMax, setMonthsInMarketMax] = useState<string>("");
    const [lifespanMin, setLifespanMin] = useState<string>("");
    const [lifespanMax, setLifespanMax] = useState<string>("");
    const [targetIrrGrossMin, setTargetIrrGrossMin] = useState<string>("");
    const [targetIrrGrossMax, setTargetIrrGrossMax] = useState<string>("");
    const [targetIrrNetMin, setTargetIrrNetMin] = useState<string>("");
    const [targetIrrNetMax, setTargetIrrNetMax] = useState<string>("");
    const [fundManagerLocation, setFundManagerLocation] = useState<string>("");

    // Location tab state
    const [locationCities, setLocationCities] = useState<string[]>([]);
    const [locationMarkets, setLocationMarkets] = useState<string[]>([]);
    const [locationCountries, setLocationCountries] = useState<string[]>([]);

    if (!isOpen) return null;

    const tabs: { id: TabType; label: string }[] = [
        { id: "portfolio", label: "Portfolio" },
        { id: "sales-comps", label: "Sales Transactions" },
        { id: "sales-listings", label: "Sales Listings" },
        { id: "funds", label: "Funds" },
    ];

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

            {/* Search Content */}
            {topTab === "search" && (
                <>
                    {/* Main Content Tabs - Act as section references */}
                    <div className="border-b border-gray-200 bg-white px-4 shrink-0">
                        <div className="flex items-center gap-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => scrollToSection(tab.id)}
                                    className={`relative px-4 py-3 text-sm font-medium border-b-2 transition-all duration-300 ease-in-out ${
                                        activeTab === tab.id
                                            ? "border-blue-600 text-blue-600"
                                            : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                                    }`}
                                >
                                    <span className="relative z-10">
                                        {tab.label}
                                    </span>
                                    {activeTab === tab.id && (
                                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 animate-pulse" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Vertically Scrollable Content */}
                    <div
                        ref={scrollContainerRef}
                        className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50"
                        style={{ scrollSnapType: "y mandatory" }}
                    >
                        <div className="flex flex-col gap-4 p-4">
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
                                    <PortfolioFilters
                                        portfolioSizeMin={portfolioSizeMin}
                                        portfolioSizeMax={portfolioSizeMax}
                                        propertiesOwnedBasis={
                                            propertiesOwnedBasis
                                        }
                                        propertiesOwnedMin={propertiesOwnedMin}
                                        propertiesOwnedMax={propertiesOwnedMax}
                                        propertyCriteria={propertyCriteria}
                                        propertyCriteriaValue={
                                            propertyCriteriaValue
                                        }
                                        portfolioPropertyType={
                                            portfolioPropertyType
                                        }
                                        portfolioSecondaryType={
                                            portfolioSecondaryType
                                        }
                                        propertySizeBasis={propertySizeBasis}
                                        propertySizeMin={propertySizeMin}
                                        propertySizeMax={propertySizeMax}
                                        costarRating={costarRating}
                                        locationType={locationType}
                                        onPortfolioSizeChange={(min, max) => {
                                            setPortfolioSizeMin(min);
                                            setPortfolioSizeMax(max);
                                        }}
                                        onPropertiesOwnedChange={(
                                            basis,
                                            min,
                                            max
                                        ) => {
                                            setPropertiesOwnedBasis(basis);
                                            setPropertiesOwnedMin(min);
                                            setPropertiesOwnedMax(max);
                                        }}
                                        onPropertyCriteriaChange={(
                                            criteria,
                                            value
                                        ) => {
                                            setPropertyCriteria(criteria);
                                            setPropertyCriteriaValue(value);
                                        }}
                                        onPortfolioPropertyTypeChange={
                                            setPortfolioPropertyType
                                        }
                                        onPortfolioSecondaryTypeChange={
                                            setPortfolioSecondaryType
                                        }
                                        onPropertySizeChange={(
                                            basis,
                                            min,
                                            max
                                        ) => {
                                            setPropertySizeBasis(basis);
                                            setPropertySizeMin(min);
                                            setPropertySizeMax(max);
                                        }}
                                        onCostarRatingChange={setCostarRating}
                                        onLocationTypeChange={setLocationType}
                                    />
                                </div>
                            </div>

                            {/* Sales Transactions Section */}
                            <div
                                ref={salesCompsRef}
                                className="w-full shrink-0 bg-white rounded-lg border border-gray-200 shadow-sm"
                                style={{ scrollSnapAlign: "start" }}
                            >
                                <div className="p-6 space-y-4">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                                        Sales Transactions
                                    </h2>
                                    <SalesTransactionsFilters
                                        numSalesTransactions={
                                            numSalesTransactions
                                        }
                                        soldWithin={soldWithin}
                                        dealRole={dealRole}
                                        totalDealValueMin={totalDealValueMin}
                                        totalDealValueMax={totalDealValueMax}
                                        individualDealValueBasis={
                                            individualDealValueBasis
                                        }
                                        individualDealValueMin={
                                            individualDealValueMin
                                        }
                                        individualDealValueMax={
                                            individualDealValueMax
                                        }
                                        includeUndisclosedSalePrice={
                                            includeUndisclosedSalePrice
                                        }
                                        totalDealSizeBasis={totalDealSizeBasis}
                                        totalDealSizeMin={totalDealSizeMin}
                                        totalDealSizeMax={totalDealSizeMax}
                                        individualDealSizeBasis={
                                            individualDealSizeBasis
                                        }
                                        individualDealSizeMin={
                                            individualDealSizeMin
                                        }
                                        individualDealSizeMax={
                                            individualDealSizeMax
                                        }
                                        salesCompsPropertyType={
                                            salesCompsPropertyType
                                        }
                                        salesCompsCostarRating={
                                            salesCompsCostarRating
                                        }
                                        salesCompsSecondaryType={
                                            salesCompsSecondaryType
                                        }
                                        onNumSalesTransactionsChange={
                                            setNumSalesTransactions
                                        }
                                        onSoldWithinChange={setSoldWithin}
                                        onDealRoleChange={setDealRole}
                                        onTotalDealValueChange={(min, max) => {
                                            setTotalDealValueMin(min);
                                            setTotalDealValueMax(max);
                                        }}
                                        onIndividualDealValueChange={(
                                            basis,
                                            min,
                                            max
                                        ) => {
                                            setIndividualDealValueBasis(basis);
                                            setIndividualDealValueMin(min);
                                            setIndividualDealValueMax(max);
                                        }}
                                        onIncludeUndisclosedSalePriceChange={
                                            setIncludeUndisclosedSalePrice
                                        }
                                        onTotalDealSizeChange={(
                                            basis,
                                            min,
                                            max
                                        ) => {
                                            setTotalDealSizeBasis(basis);
                                            setTotalDealSizeMin(min);
                                            setTotalDealSizeMax(max);
                                        }}
                                        onIndividualDealSizeChange={(
                                            basis,
                                            min,
                                            max
                                        ) => {
                                            setIndividualDealSizeBasis(basis);
                                            setIndividualDealSizeMin(min);
                                            setIndividualDealSizeMax(max);
                                        }}
                                        onSalesCompsPropertyTypeChange={
                                            setSalesCompsPropertyType
                                        }
                                        onSalesCompsCostarRatingChange={
                                            setSalesCompsCostarRating
                                        }
                                        onSalesCompsSecondaryTypeChange={
                                            setSalesCompsSecondaryType
                                        }
                                    />
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
                                    <SalesListingsFilters
                                        numListingsMin={numListingsMin}
                                        numListingsMax={numListingsMax}
                                        totalAreaForSaleBasis={
                                            totalAreaForSaleBasis
                                        }
                                        totalAreaForSaleMin={
                                            totalAreaForSaleMin
                                        }
                                        totalAreaForSaleMax={
                                            totalAreaForSaleMax
                                        }
                                        totalAskingPriceMin={
                                            totalAskingPriceMin
                                        }
                                        totalAskingPriceMax={
                                            totalAskingPriceMax
                                        }
                                        individualAskingPriceBasis={
                                            individualAskingPriceBasis
                                        }
                                        individualAskingPriceMin={
                                            individualAskingPriceMin
                                        }
                                        individualAskingPriceMax={
                                            individualAskingPriceMax
                                        }
                                        includeUndisclosedAskingPrice={
                                            includeUndisclosedAskingPrice
                                        }
                                        salesListingsPropertyType={
                                            salesListingsPropertyType
                                        }
                                        salesListingsCostarRating={
                                            salesListingsCostarRating
                                        }
                                        salesListingsSecondaryType={
                                            salesListingsSecondaryType
                                        }
                                        onNumListingsChange={(min, max) => {
                                            setNumListingsMin(min);
                                            setNumListingsMax(max);
                                        }}
                                        onTotalAreaForSaleChange={(
                                            basis,
                                            min,
                                            max
                                        ) => {
                                            setTotalAreaForSaleBasis(basis);
                                            setTotalAreaForSaleMin(min);
                                            setTotalAreaForSaleMax(max);
                                        }}
                                        onTotalAskingPriceChange={(
                                            min,
                                            max
                                        ) => {
                                            setTotalAskingPriceMin(min);
                                            setTotalAskingPriceMax(max);
                                        }}
                                        onIndividualAskingPriceChange={(
                                            basis,
                                            min,
                                            max
                                        ) => {
                                            setIndividualAskingPriceBasis(
                                                basis
                                            );
                                            setIndividualAskingPriceMin(min);
                                            setIndividualAskingPriceMax(max);
                                        }}
                                        onIncludeUndisclosedAskingPriceChange={
                                            setIncludeUndisclosedAskingPrice
                                        }
                                        onSalesListingsPropertyTypeChange={
                                            setSalesListingsPropertyType
                                        }
                                        onSalesListingsCostarRatingChange={
                                            setSalesListingsCostarRating
                                        }
                                        onSalesListingsSecondaryTypeChange={
                                            setSalesListingsSecondaryType
                                        }
                                    />
                                </div>
                            </div>

                            {/* Funds Section */}
                            <div
                                ref={fundsRef}
                                className="w-full shrink-0 bg-white rounded-lg border border-gray-200 shadow-sm"
                                style={{ scrollSnapAlign: "start" }}
                            >
                                <div className="p-6 space-y-4">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                                        Funds
                                    </h2>
                                    <FundsFilters
                                        fundName={fundName}
                                        fundStatus={fundStatus}
                                        fundPropertyFocus={fundPropertyFocus}
                                        fundStrategy={fundStrategy}
                                        fundStructure={fundStructure}
                                        fundCountryFocus={fundCountryFocus}
                                        fundSizeMin={fundSizeMin}
                                        fundSizeMax={fundSizeMax}
                                        dryPowderMin={dryPowderMin}
                                        dryPowderMax={dryPowderMax}
                                        aumMin={aumMin}
                                        aumMax={aumMax}
                                        launchDate={launchDate}
                                        finalCloseDate={finalCloseDate}
                                        vintageMin={vintageMin}
                                        vintageMax={vintageMax}
                                        monthsInMarketMin={monthsInMarketMin}
                                        monthsInMarketMax={monthsInMarketMax}
                                        lifespanMin={lifespanMin}
                                        lifespanMax={lifespanMax}
                                        targetIrrGrossMin={targetIrrGrossMin}
                                        targetIrrGrossMax={targetIrrGrossMax}
                                        targetIrrNetMin={targetIrrNetMin}
                                        targetIrrNetMax={targetIrrNetMax}
                                        fundManagerLocation={
                                            fundManagerLocation
                                        }
                                        onFundNameChange={setFundName}
                                        onFundStatusChange={setFundStatus}
                                        onFundPropertyFocusChange={
                                            setFundPropertyFocus
                                        }
                                        onFundStrategyChange={setFundStrategy}
                                        onFundStructureChange={setFundStructure}
                                        onFundCountryFocusChange={
                                            setFundCountryFocus
                                        }
                                        onFundSizeChange={(min, max) => {
                                            setFundSizeMin(min);
                                            setFundSizeMax(max);
                                        }}
                                        onDryPowderChange={(min, max) => {
                                            setDryPowderMin(min);
                                            setDryPowderMax(max);
                                        }}
                                        onAumChange={(min, max) => {
                                            setAumMin(min);
                                            setAumMax(max);
                                        }}
                                        onLaunchDateChange={setLaunchDate}
                                        onFinalCloseDateChange={
                                            setFinalCloseDate
                                        }
                                        onVintageChange={(min, max) => {
                                            setVintageMin(min);
                                            setVintageMax(max);
                                        }}
                                        onMonthsInMarketChange={(min, max) => {
                                            setMonthsInMarketMin(min);
                                            setMonthsInMarketMax(max);
                                        }}
                                        onLifespanChange={(min, max) => {
                                            setLifespanMin(min);
                                            setLifespanMax(max);
                                        }}
                                        onTargetIrrGrossChange={(min, max) => {
                                            setTargetIrrGrossMin(min);
                                            setTargetIrrGrossMax(max);
                                        }}
                                        onTargetIrrNetChange={(min, max) => {
                                            setTargetIrrNetMin(min);
                                            setTargetIrrNetMax(max);
                                        }}
                                        onFundManagerLocationChange={
                                            setFundManagerLocation
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Location Content */}
            {topTab === "location" && (
                <>
                    {/* Location Tabs */}
                    <div className="border-b border-gray-200 bg-white px-4 shrink-0">
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => scrollToLocationSection("city")}
                                className={`relative px-4 py-3 text-sm font-medium border-b-2 transition-all duration-300 ease-in-out ${
                                    activeLocationTab === "city"
                                        ? "border-blue-600 text-blue-600"
                                        : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                                }`}
                            >
                                <span className="relative z-10">City</span>
                                {activeLocationTab === "city" && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 animate-pulse" />
                                )}
                            </button>
                            <button
                                onClick={() =>
                                    scrollToLocationSection("market")
                                }
                                className={`relative px-4 py-3 text-sm font-medium border-b-2 transition-all duration-300 ease-in-out ${
                                    activeLocationTab === "market"
                                        ? "border-blue-600 text-blue-600"
                                        : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                                }`}
                            >
                                <span className="relative z-10">Market</span>
                                {activeLocationTab === "market" && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 animate-pulse" />
                                )}
                            </button>
                            <button
                                onClick={() =>
                                    scrollToLocationSection("country")
                                }
                                className={`relative px-4 py-3 text-sm font-medium border-b-2 transition-all duration-300 ease-in-out ${
                                    activeLocationTab === "country"
                                        ? "border-blue-600 text-blue-600"
                                        : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                                }`}
                            >
                                <span className="relative z-10">Country</span>
                                {activeLocationTab === "country" && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 animate-pulse" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Vertically Scrollable Content */}
                    <div
                        ref={locationScrollContainerRef}
                        className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50"
                        style={{ scrollSnapType: "y mandatory" }}
                    >
                        <div className="flex flex-col gap-4 p-4">
                            {/* City Section */}
                            <div
                                ref={cityRef}
                                className="w-full shrink-0 bg-white rounded-lg border border-gray-200 shadow-sm"
                                style={{ scrollSnapAlign: "start" }}
                            >
                                <div className="p-6 space-y-4">
                                    <LocationFilters
                                        activeTab="city"
                                        cities={locationCities}
                                        markets={locationMarkets}
                                        countries={locationCountries}
                                        onCitiesChange={setLocationCities}
                                        onMarketsChange={setLocationMarkets}
                                        onCountriesChange={setLocationCountries}
                                    />
                                </div>
                            </div>

                            {/* Market Section */}
                            <div
                                ref={marketRef}
                                className="w-full shrink-0 bg-white rounded-lg border border-gray-200 shadow-sm"
                                style={{ scrollSnapAlign: "start" }}
                            >
                                <div className="p-6 space-y-4">
                                    <LocationFilters
                                        activeTab="market"
                                        cities={locationCities}
                                        markets={locationMarkets}
                                        countries={locationCountries}
                                        onCitiesChange={setLocationCities}
                                        onMarketsChange={setLocationMarkets}
                                        onCountriesChange={setLocationCountries}
                                    />
                                </div>
                            </div>

                            {/* Country Section */}
                            <div
                                ref={countryRef}
                                className="w-full shrink-0 bg-white rounded-lg border border-gray-200 shadow-sm"
                                style={{ scrollSnapAlign: "start" }}
                            >
                                <div className="p-6 space-y-4">
                                    <LocationFilters
                                        activeTab="country"
                                        cities={locationCities}
                                        markets={locationMarkets}
                                        countries={locationCountries}
                                        onCitiesChange={setLocationCities}
                                        onMarketsChange={setLocationMarkets}
                                        onCountriesChange={setLocationCountries}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Footer */}
            <div className="border-t border-gray-200 px-4 py-3 bg-white shrink-0">
                <div className="flex items-center justify-between">
                    <button
                        onClick={onClear}
                        className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
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
