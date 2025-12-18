import { useMemo } from "react";
import { FilterValues } from "../Components/AllFiltersModal";

interface UseActiveFiltersProps {
    filter: string;
    currentSection: string | null;
    initialFilters: Record<string, any>;
    currentFilters: FilterValues | null;
}

export function useActiveFilters({
    filter,
    currentSection,
    initialFilters,
    currentFilters,
}: UseActiveFiltersProps) {
    const activeFiltersData = useMemo(() => {
        let count = 0;
        let hasActive = false;

        if (filter && filter !== "all") {
            count++;
            hasActive = true;
        }
        if (currentSection) {
            count++;
            hasActive = true;
        }

        // Check current filters or initial filters
        if (currentFilters) {
            if (currentFilters.location && currentFilters.location.length > 0) {
                count++;
                hasActive = true;
            }
            if (currentFilters.keywords) {
                count++;
                hasActive = true;
            }
            if (
                currentFilters.propertyTypes &&
                currentFilters.propertyTypes.length > 0 &&
                !currentFilters.propertyTypes.includes("All")
            ) {
                count++;
                hasActive = true;
            }
            if (currentFilters.minPrice || currentFilters.maxPrice) {
                count++;
                hasActive = true;
            }
            if (currentFilters.brokerAgent || currentFilters.brokerageShop) {
                count++;
                hasActive = true;
            }
        } else {
            if (initialFilters.location) {
                count++;
                hasActive = true;
            }
            if (initialFilters.keywords) {
                count++;
                hasActive = true;
            }
            if (
                initialFilters.property_types &&
                Array.isArray(initialFilters.property_types) &&
                initialFilters.property_types.length > 0 &&
                !initialFilters.property_types.includes("All")
            ) {
                count++;
                hasActive = true;
            }
            if (initialFilters.min_rate || initialFilters.max_rate) {
                count++;
                hasActive = true;
            }
            if (initialFilters.broker_agent || initialFilters.brokerage_shop) {
                count++;
                hasActive = true;
            }
        }

        return { activeFiltersCount: count, hasActiveFilters: hasActive };
    }, [filter, currentSection, initialFilters, currentFilters]);

    return activeFiltersData;
}
