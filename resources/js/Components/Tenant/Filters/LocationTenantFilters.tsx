import TenancyFilter from "../../Filters/TenancyFilter";
import TenantFilters from "./TenantFilters";

interface LocationTenantFiltersProps {
    tenancy?: "vacant" | "single" | "multi" | "";
    onTenancyChange?: (tenancy: "vacant" | "single" | "multi" | "") => void;
    // TenantFilters props
    tenantName?: string;
    totalEmployeesMin?: string;
    totalEmployeesMax?: string;
    creditRating?: string;
    creditRatingIncludeUnknown?: boolean;
    companyGrowth?: string;
    revenue?: string;
    revenueIncludeUnknown?: boolean;
    retailersOnly?: boolean;
    industryClassification?: "industry-type" | "naics-code" | "sic-code";
    industryValue?: string;
    territory?: string;
    keywordSearch?: string;
    keywordMatch?: "all" | "any";
    onTenantNameChange?: (value: string) => void;
    onTotalEmployeesChange?: (min: string, max: string) => void;
    onCreditRatingChange?: (value: string) => void;
    onCreditRatingIncludeUnknownChange?: (value: boolean) => void;
    onCompanyGrowthChange?: (value: string) => void;
    onRevenueChange?: (value: string) => void;
    onRevenueIncludeUnknownChange?: (value: boolean) => void;
    onRetailersOnlyChange?: (value: boolean) => void;
    onIndustryClassificationChange?: (
        value: "industry-type" | "naics-code" | "sic-code"
    ) => void;
    onIndustryValueChange?: (value: string) => void;
    onTerritoryChange?: (value: string) => void;
    onKeywordSearchChange?: (value: string) => void;
    onKeywordMatchChange?: (value: "all" | "any") => void;
}

export default function LocationTenantFilters({
    tenancy = "",
    onTenancyChange,
    tenantName = "",
    totalEmployeesMin = "",
    totalEmployeesMax = "",
    creditRating = "",
    creditRatingIncludeUnknown = false,
    companyGrowth = "",
    revenue = "",
    revenueIncludeUnknown = false,
    retailersOnly = false,
    industryClassification = "industry-type",
    industryValue = "",
    territory = "",
    keywordSearch = "",
    keywordMatch = "all",
    onTenantNameChange,
    onTotalEmployeesChange,
    onCreditRatingChange,
    onCreditRatingIncludeUnknownChange,
    onCompanyGrowthChange,
    onRevenueChange,
    onRevenueIncludeUnknownChange,
    onRetailersOnlyChange,
    onIndustryClassificationChange,
    onIndustryValueChange,
    onTerritoryChange,
    onKeywordSearchChange,
    onKeywordMatchChange,
}: LocationTenantFiltersProps) {
    return (
        <div className="space-y-3">
            <TenancyFilter
                tenancy={tenancy}
                onChange={onTenancyChange || (() => {})}
            />
            <TenantFilters
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
                onTenantNameChange={onTenantNameChange}
                onTotalEmployeesChange={onTotalEmployeesChange}
                onCreditRatingChange={onCreditRatingChange}
                onCreditRatingIncludeUnknownChange={
                    onCreditRatingIncludeUnknownChange
                }
                onCompanyGrowthChange={onCompanyGrowthChange}
                onRevenueChange={onRevenueChange}
                onRevenueIncludeUnknownChange={onRevenueIncludeUnknownChange}
                onRetailersOnlyChange={onRetailersOnlyChange}
                onIndustryClassificationChange={onIndustryClassificationChange}
                onIndustryValueChange={onIndustryValueChange}
                onTerritoryChange={onTerritoryChange}
                onKeywordSearchChange={onKeywordSearchChange}
                onKeywordMatchChange={onKeywordMatchChange}
            />
        </div>
    );
}
