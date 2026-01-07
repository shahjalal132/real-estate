/**
 * Type definitions for Owner Funds Advanced Filter state
 */

export type TabType = "portfolio" | "sales-comps" | "sales-listings" | "funds";
export type LocationTabType = "city" | "market" | "country";
export type TopTabType = "search" | "location";

export interface PortfolioFilterState {
    portfolioSizeMin: string;
    portfolioSizeMax: string;
    propertiesOwnedBasis: string;
    propertiesOwnedMin: string;
    propertiesOwnedMax: string;
    propertyCriteria: "1" | "2";
    propertyCriteriaValue: string;
    portfolioPropertyType: string;
    portfolioSecondaryType: string;
    propertySizeBasis: string;
    propertySizeMin: string;
    propertySizeMax: string;
    costarRating: number;
    locationType: string[];
}

export interface SalesTransactionsFilterState {
    numSalesTransactions: string;
    soldWithin: string;
    dealRole: string[];
    totalDealValueMin: string;
    totalDealValueMax: string;
    individualDealValueBasis: string;
    individualDealValueMin: string;
    individualDealValueMax: string;
    includeUndisclosedSalePrice: boolean;
    totalDealSizeBasis: string;
    totalDealSizeMin: string;
    totalDealSizeMax: string;
    individualDealSizeBasis: string;
    individualDealSizeMin: string;
    individualDealSizeMax: string;
    salesCompsPropertyType: string;
    salesCompsCostarRating: number;
    salesCompsSecondaryType: string;
}

export interface SalesListingsFilterState {
    numListingsMin: string;
    numListingsMax: string;
    totalAreaForSaleBasis: string;
    totalAreaForSaleMin: string;
    totalAreaForSaleMax: string;
    totalAskingPriceMin: string;
    totalAskingPriceMax: string;
    individualAskingPriceBasis: string;
    individualAskingPriceMin: string;
    individualAskingPriceMax: string;
    includeUndisclosedAskingPrice: boolean;
    salesListingsPropertyType: string;
    salesListingsCostarRating: number;
    salesListingsSecondaryType: string;
}

export interface FundsFilterState {
    fundName: string;
    fundStatus: string[];
    fundPropertyFocus: string[];
    fundStrategy: string[];
    fundStructure: string;
    fundCountryFocus: string[];
    fundSizeMin: string;
    fundSizeMax: string;
    dryPowderMin: string;
    dryPowderMax: string;
    aumMin: string;
    aumMax: string;
    launchDate: string;
    finalCloseDate: string;
    vintageMin: string;
    vintageMax: string;
    monthsInMarketMin: string;
    monthsInMarketMax: string;
    lifespanMin: string;
    lifespanMax: string;
    targetIrrGrossMin: string;
    targetIrrGrossMax: string;
    targetIrrNetMin: string;
    targetIrrNetMax: string;
    fundManagerLocation: string;
}

export interface LocationFilterState {
    cities: string[];
    markets: string[];
    countries: string[];
}

export interface OwnerFundsFilterState {
    portfolio: PortfolioFilterState;
    salesTransactions: SalesTransactionsFilterState;
    salesListings: SalesListingsFilterState;
    funds: FundsFilterState;
    location: LocationFilterState;
}

export const createInitialFilterState = (): OwnerFundsFilterState => ({
    portfolio: {
        portfolioSizeMin: "",
        portfolioSizeMax: "",
        propertiesOwnedBasis: "# of Properties",
        propertiesOwnedMin: "",
        propertiesOwnedMax: "",
        propertyCriteria: "1",
        propertyCriteriaValue: "",
        portfolioPropertyType: "",
        portfolioSecondaryType: "",
        propertySizeBasis: "SF",
        propertySizeMin: "",
        propertySizeMax: "",
        costarRating: 0,
        locationType: [],
    },
    salesTransactions: {
        numSalesTransactions: "",
        soldWithin: "",
        dealRole: [],
        totalDealValueMin: "",
        totalDealValueMax: "",
        individualDealValueBasis: "Total",
        individualDealValueMin: "",
        individualDealValueMax: "",
        includeUndisclosedSalePrice: false,
        totalDealSizeBasis: "SF",
        totalDealSizeMin: "",
        totalDealSizeMax: "",
        individualDealSizeBasis: "SF",
        individualDealSizeMin: "",
        individualDealSizeMax: "",
        salesCompsPropertyType: "",
        salesCompsCostarRating: 0,
        salesCompsSecondaryType: "",
    },
    salesListings: {
        numListingsMin: "",
        numListingsMax: "",
        totalAreaForSaleBasis: "SF",
        totalAreaForSaleMin: "",
        totalAreaForSaleMax: "",
        totalAskingPriceMin: "",
        totalAskingPriceMax: "",
        individualAskingPriceBasis: "Total",
        individualAskingPriceMin: "",
        individualAskingPriceMax: "",
        includeUndisclosedAskingPrice: false,
        salesListingsPropertyType: "",
        salesListingsCostarRating: 0,
        salesListingsSecondaryType: "",
    },
    funds: {
        fundName: "",
        fundStatus: [],
        fundPropertyFocus: [],
        fundStrategy: [],
        fundStructure: "",
        fundCountryFocus: [],
        fundSizeMin: "",
        fundSizeMax: "",
        dryPowderMin: "",
        dryPowderMax: "",
        aumMin: "",
        aumMax: "",
        launchDate: "",
        finalCloseDate: "",
        vintageMin: "",
        vintageMax: "",
        monthsInMarketMin: "",
        monthsInMarketMax: "",
        lifespanMin: "",
        lifespanMax: "",
        targetIrrGrossMin: "",
        targetIrrGrossMax: "",
        targetIrrNetMin: "",
        targetIrrNetMax: "",
        fundManagerLocation: "",
    },
    location: {
        cities: [],
        markets: [],
        countries: [],
    },
});

