import { useMemo } from "react";
import { router } from "@inertiajs/react";
import { FilterValues } from "../Components/AllFiltersModal";

interface UsePropertyFiltersProps {
    url: string;
    initialFilters: Record<string, any>;
}

export function usePropertyFilters({
    url,
    initialFilters,
}: UsePropertyFiltersProps) {
    const buildFilterParams = (filters: FilterValues): Record<string, any> => {
        const params: Record<string, any> = {};

        // Location and Keywords
        if (filters.location && filters.location.length > 0) {
            params.location = filters.location.join(",");
        }
        if (filters.keywords) {
            params.keywords = filters.keywords;
        }

        // Property Types
        if (
            filters.propertyTypes &&
            filters.propertyTypes.length > 0 &&
            !filters.propertyTypes.includes("All")
        ) {
            params.property_types = filters.propertyTypes.join(",");
        }

        // Price filters
        if (
            filters.minPrice &&
            filters.minPrice !== "$0" &&
            filters.minPrice !== "0"
        ) {
            params.min_price = filters.minPrice;
            params.min_rate = filters.minPrice;
        }
        if (filters.maxPrice && !filters.maxPrice.endsWith("+")) {
            params.max_price = filters.maxPrice;
            params.max_rate = filters.maxPrice;
        }
        if (filters.excludeUnpriced) {
            params.exclude_unpriced = "1";
            params.exclude_undisclosed_rate = "1";
        }

        // Cap Rate filters
        if (filters.minCapRate && filters.minCapRate !== "0") {
            params.min_cap_rate = filters.minCapRate;
        }
        if (filters.maxCapRate && !filters.maxCapRate.endsWith("+")) {
            params.max_cap_rate = filters.maxCapRate;
        }

        // Tenant Brand filter
        if (filters.tenantBrand) {
            params.tenant_brand = filters.tenantBrand;
        }

        // Remaining Term filter
        if (filters.remainingTerm && Array.isArray(filters.remainingTerm)) {
            params.remaining_term = filters.remainingTerm;
        }

        // Broker filters
        if (filters.brokerAgent) {
            params.broker_agent = filters.brokerAgent;
        }
        if (filters.brokerageShop) {
            params.brokerage_shop = filters.brokerageShop;
        }

        // Tenancy filter
        if (filters.tenancy) {
            params.tenancy = filters.tenancy;
        }

        // Lease Type filter
        if (filters.leaseType) {
            params.lease_type = filters.leaseType;
        }

        // Unit Measurements filter
        if (filters.measurementType) {
            params.measurement_type = filters.measurementType;
        }
        if (filters.minUnits && filters.minUnits !== "0") {
            params.min_units = filters.minUnits;
        }
        if (filters.maxUnits && !filters.maxUnits.endsWith("+")) {
            params.max_units = filters.maxUnits;
        }

        // Property Details filters
        if (filters.minSqft && filters.minSqft !== "0") {
            params.min_sqft = filters.minSqft;
        }
        if (filters.maxSqft && !filters.maxSqft.endsWith("+")) {
            params.max_sqft = filters.maxSqft;
        }
        if (filters.minPricePerSqft && filters.minPricePerSqft !== "0") {
            params.min_price_per_sqft = filters.minPricePerSqft;
        }
        if (filters.maxPricePerSqft && !filters.maxPricePerSqft.endsWith("+")) {
            params.max_price_per_sqft = filters.maxPricePerSqft;
        }
        if (filters.minAcres && filters.minAcres !== "0") {
            params.min_acres = filters.minAcres;
        }
        if (filters.maxAcres && !filters.maxAcres.endsWith("+")) {
            params.max_acres = filters.maxAcres;
        }

        // Tenant Credit filter
        if (filters.tenantCredit) {
            params.tenant_credit = filters.tenantCredit;
        }

        // Occupancy filter
        if (filters.minOccupancy && filters.minOccupancy !== "0") {
            params.min_occupancy = filters.minOccupancy;
        }
        if (filters.maxOccupancy && !filters.maxOccupancy.endsWith("+")) {
            params.max_occupancy = filters.maxOccupancy;
        }

        // Timeline filters
        if (filters.timelineType) {
            params.timeline_type = filters.timelineType;
        }
        if (filters.fromDate) {
            params.from_date = filters.fromDate;
        }
        if (filters.toDate) {
            params.to_date = filters.toDate;
        }
        if (filters.timePeriod && filters.timePeriod !== "Any") {
            params.time_period = filters.timePeriod;
        }

        // Listing Status filter
        if (filters.listingStatus && filters.listingStatus.length > 0) {
            params.listing_status = filters.listingStatus.join(",");
        }

        // Opportunity Zone filter
        if (filters.opportunityZone) {
            params.opportunity_zone = "1";
        }

        // Property class filter
        if (filters.propertyClass && filters.propertyClass.length > 0) {
            params.property_class = filters.propertyClass.join(",");
        }

        // Other Options filters
        if (filters.brokerAgentCoOp) {
            params.broker_agent_co_op = "1";
        }
        if (filters.ownerUser) {
            params.owner_user = "1";
        }

        return params;
    };

    const getBasePath = useMemo(() => {
        // Backward compatibility: check URL path for old routes
        if (url.includes("/properties/auctions")) {
            return "/properties/auctions";
        } else if (url.includes("/properties/residential")) {
            return "/properties/residential";
        } else if (url.includes("/properties/commercial")) {
            return "/properties/commercial";
        } else if (url.includes("/properties/rental")) {
            return "/properties/rental";
        }
        return "/properties";
    }, [url]);

    const preserveQueryParams = (params: Record<string, any>) => {
        // Preserve existing query parameters (type, category, listing_type, status)
        if (initialFilters?.type) {
            params.type = initialFilters.type;
        }
        if (initialFilters?.category) {
            params.category = initialFilters.category;
        }
        if (initialFilters?.listing_type) {
            params.listing_type = initialFilters.listing_type;
        }
        if (initialFilters?.status) {
            params.status = initialFilters.status;
        }
        return params;
    };

    const applyFilters = (filters: FilterValues) => {
        const params = buildFilterParams(filters);
        const finalParams = preserveQueryParams(params);

        router.get(getBasePath, finalParams, {
            preserveState: false,
            preserveScroll: false,
        });
    };

    const resetFilters = () => {
        const params: Record<string, any> = {};
        const finalParams = preserveQueryParams(params);

        router.get(
            getBasePath,
            Object.keys(finalParams).length > 0 ? finalParams : {},
            {
                preserveState: false,
            }
        );
    };

    return {
        applyFilters,
        resetFilters,
        getBasePath,
    };
}
