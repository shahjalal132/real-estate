import { useState } from "react";
import AdvancedFilterHeader from "./AdvancedFilterHeader";
import AdvancedFilterFooter from "./AdvancedFilterFooter";
import SearchContent from "./SearchContent";
import LocationContent from "./LocationContent";
import {
    TabType,
    LocationTabType,
    TopTabType,
    OwnerFundsFilterState,
    createInitialFilterState,
} from "./types/filterState";

interface OwnerFundsAdvancedFilterProps {
    isOpen: boolean;
    onClose: () => void;
    onClear: () => void;
    onDone: () => void;
    activeFiltersCount?: number;
}

export default function OwnerFundsAdvancedFilter({
    isOpen,
    onClose,
    onClear,
    onDone,
}: OwnerFundsAdvancedFilterProps) {
    const [topTab, setTopTab] = useState<TopTabType>("search");
    const [activeTab, setActiveTab] = useState<TabType>("portfolio");
    const [activeLocationTab, setActiveLocationTab] =
        useState<LocationTabType>("city");
    const [filterState, setFilterState] = useState<OwnerFundsFilterState>(
        createInitialFilterState()
    );

    const handleFilterStateChange = (
        updates: Partial<OwnerFundsFilterState>
    ) => {
        setFilterState((prev) => ({ ...prev, ...updates }));
    };

    if (!isOpen) return null;

    return (
        <div className="h-[calc(100vh-170px)] w-full bg-white flex flex-col overflow-hidden">
            <AdvancedFilterHeader
                topTab={topTab}
                onTopTabChange={setTopTab}
                onClose={onClose}
            />

            {topTab === "search" && (
                <SearchContent
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    filterState={filterState}
                    onFilterStateChange={handleFilterStateChange}
                />
            )}

            {topTab === "location" && (
                <LocationContent
                    activeTab={activeLocationTab}
                    onTabChange={setActiveLocationTab}
                    filterState={filterState.location}
                    onFilterStateChange={(updates) =>
                        handleFilterStateChange({
                            location: { ...filterState.location, ...updates },
                        })
                    }
                />
            )}

            <AdvancedFilterFooter onClear={onClear} onDone={onDone} />
        </div>
    );
}
