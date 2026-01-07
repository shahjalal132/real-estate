import { useRef } from "react";
import PortfolioFilters from "./Filters/PortfolioFilters";
import SalesTransactionsFilters from "./Filters/SalesTransactionsFilters";
import SalesListingsFilters from "./Filters/SalesListingsFilters";
import FundsFilters from "./Filters/FundsFilters";
import { TabType, OwnerFundsFilterState } from "./types/filterState";
import { useScrollTracking, scrollToSection } from "./hooks/useScrollTracking";

interface SearchContentProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
    filterState: OwnerFundsFilterState;
    onFilterStateChange: (updates: Partial<OwnerFundsFilterState>) => void;
}

const tabs: { id: TabType; label: string }[] = [
    { id: "portfolio", label: "Portfolio" },
    { id: "sales-comps", label: "Sales Transactions" },
    { id: "sales-listings", label: "Sales Listings" },
    { id: "funds", label: "Funds" },
];

export default function SearchContent({
    activeTab,
    onTabChange,
    filterState,
    onFilterStateChange,
}: SearchContentProps) {
    const portfolioRef = useRef<HTMLDivElement>(null);
    const salesCompsRef = useRef<HTMLDivElement>(null);
    const salesListingsRef = useRef<HTMLDivElement>(null);
    const fundsRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const sections = [
        { ref: portfolioRef, name: "portfolio" as const },
        { ref: salesCompsRef, name: "sales-comps" as const },
        { ref: salesListingsRef, name: "sales-listings" as const },
        { ref: fundsRef, name: "funds" as const },
    ];

    const refs = {
        portfolio: portfolioRef,
        "sales-comps": salesCompsRef,
        "sales-listings": salesListingsRef,
        funds: fundsRef,
    };

    useScrollTracking(sections, scrollContainerRef, activeTab, onTabChange, true);

    const handleScrollToSection = (section: TabType) => {
        onTabChange(section);
        scrollToSection(section, refs, scrollContainerRef);
    };

    const { portfolio, salesTransactions, salesListings, funds } = filterState;

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Main Content Tabs */}
            <div className="border-b border-gray-200 bg-white px-4 shrink-0">
                <div className="flex items-center gap-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleScrollToSection(tab.id)}
                            className={`relative px-4 py-3 text-sm font-medium border-b-2 transition-all duration-300 ease-in-out ${
                                activeTab === tab.id
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                            }`}
                        >
                            <span className="relative z-10">{tab.label}</span>
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
                className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-gray-50"
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
                                portfolioSizeMin={portfolio.portfolioSizeMin}
                                portfolioSizeMax={portfolio.portfolioSizeMax}
                                propertiesOwnedBasis={portfolio.propertiesOwnedBasis}
                                propertiesOwnedMin={portfolio.propertiesOwnedMin}
                                propertiesOwnedMax={portfolio.propertiesOwnedMax}
                                propertyCriteria={portfolio.propertyCriteria}
                                propertyCriteriaValue={portfolio.propertyCriteriaValue}
                                portfolioPropertyType={portfolio.portfolioPropertyType}
                                portfolioSecondaryType={portfolio.portfolioSecondaryType}
                                propertySizeBasis={portfolio.propertySizeBasis}
                                propertySizeMin={portfolio.propertySizeMin}
                                propertySizeMax={portfolio.propertySizeMax}
                                costarRating={portfolio.costarRating}
                                locationType={portfolio.locationType}
                                onPortfolioSizeChange={(min, max) => {
                                    onFilterStateChange({
                                        portfolio: { ...portfolio, portfolioSizeMin: min, portfolioSizeMax: max },
                                    });
                                }}
                                onPropertiesOwnedChange={(basis, min, max) => {
                                    onFilterStateChange({
                                        portfolio: {
                                            ...portfolio,
                                            propertiesOwnedBasis: basis,
                                            propertiesOwnedMin: min,
                                            propertiesOwnedMax: max,
                                        },
                                    });
                                }}
                                onPropertyCriteriaChange={(criteria, value) => {
                                    onFilterStateChange({
                                        portfolio: {
                                            ...portfolio,
                                            propertyCriteria: criteria,
                                            propertyCriteriaValue: value,
                                        },
                                    });
                                }}
                                onPortfolioPropertyTypeChange={(value) => {
                                    onFilterStateChange({
                                        portfolio: { ...portfolio, portfolioPropertyType: value },
                                    });
                                }}
                                onPortfolioSecondaryTypeChange={(value) => {
                                    onFilterStateChange({
                                        portfolio: { ...portfolio, portfolioSecondaryType: value },
                                    });
                                }}
                                onPropertySizeChange={(basis, min, max) => {
                                    onFilterStateChange({
                                        portfolio: {
                                            ...portfolio,
                                            propertySizeBasis: basis,
                                            propertySizeMin: min,
                                            propertySizeMax: max,
                                        },
                                    });
                                }}
                                onCostarRatingChange={(value) => {
                                    onFilterStateChange({
                                        portfolio: { ...portfolio, costarRating: value },
                                    });
                                }}
                                onLocationTypeChange={(value) => {
                                    onFilterStateChange({
                                        portfolio: { ...portfolio, locationType: value },
                                    });
                                }}
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
                                numSalesTransactions={salesTransactions.numSalesTransactions}
                                soldWithin={salesTransactions.soldWithin}
                                dealRole={salesTransactions.dealRole}
                                totalDealValueMin={salesTransactions.totalDealValueMin}
                                totalDealValueMax={salesTransactions.totalDealValueMax}
                                individualDealValueBasis={salesTransactions.individualDealValueBasis}
                                individualDealValueMin={salesTransactions.individualDealValueMin}
                                individualDealValueMax={salesTransactions.individualDealValueMax}
                                includeUndisclosedSalePrice={salesTransactions.includeUndisclosedSalePrice}
                                totalDealSizeBasis={salesTransactions.totalDealSizeBasis}
                                totalDealSizeMin={salesTransactions.totalDealSizeMin}
                                totalDealSizeMax={salesTransactions.totalDealSizeMax}
                                individualDealSizeBasis={salesTransactions.individualDealSizeBasis}
                                individualDealSizeMin={salesTransactions.individualDealSizeMin}
                                individualDealSizeMax={salesTransactions.individualDealSizeMax}
                                salesCompsPropertyType={salesTransactions.salesCompsPropertyType}
                                salesCompsCostarRating={salesTransactions.salesCompsCostarRating}
                                salesCompsSecondaryType={salesTransactions.salesCompsSecondaryType}
                                onNumSalesTransactionsChange={(value) => {
                                    onFilterStateChange({
                                        salesTransactions: { ...salesTransactions, numSalesTransactions: value },
                                    });
                                }}
                                onSoldWithinChange={(value) => {
                                    onFilterStateChange({
                                        salesTransactions: { ...salesTransactions, soldWithin: value },
                                    });
                                }}
                                onDealRoleChange={(value) => {
                                    onFilterStateChange({
                                        salesTransactions: { ...salesTransactions, dealRole: value },
                                    });
                                }}
                                onTotalDealValueChange={(min, max) => {
                                    onFilterStateChange({
                                        salesTransactions: {
                                            ...salesTransactions,
                                            totalDealValueMin: min,
                                            totalDealValueMax: max,
                                        },
                                    });
                                }}
                                onIndividualDealValueChange={(basis, min, max) => {
                                    onFilterStateChange({
                                        salesTransactions: {
                                            ...salesTransactions,
                                            individualDealValueBasis: basis,
                                            individualDealValueMin: min,
                                            individualDealValueMax: max,
                                        },
                                    });
                                }}
                                onIncludeUndisclosedSalePriceChange={(value) => {
                                    onFilterStateChange({
                                        salesTransactions: {
                                            ...salesTransactions,
                                            includeUndisclosedSalePrice: value,
                                        },
                                    });
                                }}
                                onTotalDealSizeChange={(basis, min, max) => {
                                    onFilterStateChange({
                                        salesTransactions: {
                                            ...salesTransactions,
                                            totalDealSizeBasis: basis,
                                            totalDealSizeMin: min,
                                            totalDealSizeMax: max,
                                        },
                                    });
                                }}
                                onIndividualDealSizeChange={(basis, min, max) => {
                                    onFilterStateChange({
                                        salesTransactions: {
                                            ...salesTransactions,
                                            individualDealSizeBasis: basis,
                                            individualDealSizeMin: min,
                                            individualDealSizeMax: max,
                                        },
                                    });
                                }}
                                onSalesCompsPropertyTypeChange={(value) => {
                                    onFilterStateChange({
                                        salesTransactions: { ...salesTransactions, salesCompsPropertyType: value },
                                    });
                                }}
                                onSalesCompsCostarRatingChange={(value) => {
                                    onFilterStateChange({
                                        salesTransactions: { ...salesTransactions, salesCompsCostarRating: value },
                                    });
                                }}
                                onSalesCompsSecondaryTypeChange={(value) => {
                                    onFilterStateChange({
                                        salesTransactions: { ...salesTransactions, salesCompsSecondaryType: value },
                                    });
                                }}
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
                                numListingsMin={salesListings.numListingsMin}
                                numListingsMax={salesListings.numListingsMax}
                                totalAreaForSaleBasis={salesListings.totalAreaForSaleBasis}
                                totalAreaForSaleMin={salesListings.totalAreaForSaleMin}
                                totalAreaForSaleMax={salesListings.totalAreaForSaleMax}
                                totalAskingPriceMin={salesListings.totalAskingPriceMin}
                                totalAskingPriceMax={salesListings.totalAskingPriceMax}
                                individualAskingPriceBasis={salesListings.individualAskingPriceBasis}
                                individualAskingPriceMin={salesListings.individualAskingPriceMin}
                                individualAskingPriceMax={salesListings.individualAskingPriceMax}
                                includeUndisclosedAskingPrice={salesListings.includeUndisclosedAskingPrice}
                                salesListingsPropertyType={salesListings.salesListingsPropertyType}
                                salesListingsCostarRating={salesListings.salesListingsCostarRating}
                                salesListingsSecondaryType={salesListings.salesListingsSecondaryType}
                                onNumListingsChange={(min, max) => {
                                    onFilterStateChange({
                                        salesListings: {
                                            ...salesListings,
                                            numListingsMin: min,
                                            numListingsMax: max,
                                        },
                                    });
                                }}
                                onTotalAreaForSaleChange={(basis, min, max) => {
                                    onFilterStateChange({
                                        salesListings: {
                                            ...salesListings,
                                            totalAreaForSaleBasis: basis,
                                            totalAreaForSaleMin: min,
                                            totalAreaForSaleMax: max,
                                        },
                                    });
                                }}
                                onTotalAskingPriceChange={(min, max) => {
                                    onFilterStateChange({
                                        salesListings: {
                                            ...salesListings,
                                            totalAskingPriceMin: min,
                                            totalAskingPriceMax: max,
                                        },
                                    });
                                }}
                                onIndividualAskingPriceChange={(basis, min, max) => {
                                    onFilterStateChange({
                                        salesListings: {
                                            ...salesListings,
                                            individualAskingPriceBasis: basis,
                                            individualAskingPriceMin: min,
                                            individualAskingPriceMax: max,
                                        },
                                    });
                                }}
                                onIncludeUndisclosedAskingPriceChange={(value) => {
                                    onFilterStateChange({
                                        salesListings: {
                                            ...salesListings,
                                            includeUndisclosedAskingPrice: value,
                                        },
                                    });
                                }}
                                onSalesListingsPropertyTypeChange={(value) => {
                                    onFilterStateChange({
                                        salesListings: { ...salesListings, salesListingsPropertyType: value },
                                    });
                                }}
                                onSalesListingsCostarRatingChange={(value) => {
                                    onFilterStateChange({
                                        salesListings: { ...salesListings, salesListingsCostarRating: value },
                                    });
                                }}
                                onSalesListingsSecondaryTypeChange={(value) => {
                                    onFilterStateChange({
                                        salesListings: { ...salesListings, salesListingsSecondaryType: value },
                                    });
                                }}
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
                                fundName={funds.fundName}
                                fundStatus={funds.fundStatus}
                                fundPropertyFocus={funds.fundPropertyFocus}
                                fundStrategy={funds.fundStrategy}
                                fundStructure={funds.fundStructure}
                                fundCountryFocus={funds.fundCountryFocus}
                                fundSizeMin={funds.fundSizeMin}
                                fundSizeMax={funds.fundSizeMax}
                                dryPowderMin={funds.dryPowderMin}
                                dryPowderMax={funds.dryPowderMax}
                                aumMin={funds.aumMin}
                                aumMax={funds.aumMax}
                                launchDate={funds.launchDate}
                                finalCloseDate={funds.finalCloseDate}
                                vintageMin={funds.vintageMin}
                                vintageMax={funds.vintageMax}
                                monthsInMarketMin={funds.monthsInMarketMin}
                                monthsInMarketMax={funds.monthsInMarketMax}
                                lifespanMin={funds.lifespanMin}
                                lifespanMax={funds.lifespanMax}
                                targetIrrGrossMin={funds.targetIrrGrossMin}
                                targetIrrGrossMax={funds.targetIrrGrossMax}
                                targetIrrNetMin={funds.targetIrrNetMin}
                                targetIrrNetMax={funds.targetIrrNetMax}
                                fundManagerLocation={funds.fundManagerLocation}
                                onFundNameChange={(value) => {
                                    onFilterStateChange({
                                        funds: { ...funds, fundName: value },
                                    });
                                }}
                                onFundStatusChange={(value) => {
                                    onFilterStateChange({
                                        funds: { ...funds, fundStatus: value },
                                    });
                                }}
                                onFundPropertyFocusChange={(value) => {
                                    onFilterStateChange({
                                        funds: { ...funds, fundPropertyFocus: value },
                                    });
                                }}
                                onFundStrategyChange={(value) => {
                                    onFilterStateChange({
                                        funds: { ...funds, fundStrategy: value },
                                    });
                                }}
                                onFundStructureChange={(value) => {
                                    onFilterStateChange({
                                        funds: { ...funds, fundStructure: value },
                                    });
                                }}
                                onFundCountryFocusChange={(value) => {
                                    onFilterStateChange({
                                        funds: { ...funds, fundCountryFocus: value },
                                    });
                                }}
                                onFundSizeChange={(min, max) => {
                                    onFilterStateChange({
                                        funds: { ...funds, fundSizeMin: min, fundSizeMax: max },
                                    });
                                }}
                                onDryPowderChange={(min, max) => {
                                    onFilterStateChange({
                                        funds: { ...funds, dryPowderMin: min, dryPowderMax: max },
                                    });
                                }}
                                onAumChange={(min, max) => {
                                    onFilterStateChange({
                                        funds: { ...funds, aumMin: min, aumMax: max },
                                    });
                                }}
                                onLaunchDateChange={(value) => {
                                    onFilterStateChange({
                                        funds: { ...funds, launchDate: value },
                                    });
                                }}
                                onFinalCloseDateChange={(value) => {
                                    onFilterStateChange({
                                        funds: { ...funds, finalCloseDate: value },
                                    });
                                }}
                                onVintageChange={(min, max) => {
                                    onFilterStateChange({
                                        funds: { ...funds, vintageMin: min, vintageMax: max },
                                    });
                                }}
                                onMonthsInMarketChange={(min, max) => {
                                    onFilterStateChange({
                                        funds: { ...funds, monthsInMarketMin: min, monthsInMarketMax: max },
                                    });
                                }}
                                onLifespanChange={(min, max) => {
                                    onFilterStateChange({
                                        funds: { ...funds, lifespanMin: min, lifespanMax: max },
                                    });
                                }}
                                onTargetIrrGrossChange={(min, max) => {
                                    onFilterStateChange({
                                        funds: { ...funds, targetIrrGrossMin: min, targetIrrGrossMax: max },
                                    });
                                }}
                                onTargetIrrNetChange={(min, max) => {
                                    onFilterStateChange({
                                        funds: { ...funds, targetIrrNetMin: min, targetIrrNetMax: max },
                                    });
                                }}
                                onFundManagerLocationChange={(value) => {
                                    onFilterStateChange({
                                        funds: { ...funds, fundManagerLocation: value },
                                    });
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

