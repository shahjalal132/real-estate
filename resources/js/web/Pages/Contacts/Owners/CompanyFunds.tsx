import { useState, useMemo } from "react";
import { Head, router } from "@inertiajs/react";
import AppLayout from "@/web/Layouts/AppLayout";
import CompanyDetailsLayout from "@/Layouts/CompanyDetailsLayout";
import CompanyDetailsHeader from "@/Components/Owner/CompanyDetailsHeader";
import CompanyFundsFilterBar from "@/Components/Owner/CompanyFundsFilterBar";
import ResizableTable, {
    ResizableColumn,
} from "@/Components/ResizableTable/ResizableTable";

interface OwnerCompany {
    id: number;
    company: string;
}

interface OwnerFund {
    id: number;
    fund: string;
    fund_size?: number;
    status?: string;
    dry_powder?: number;
    aum?: number;
    vintage?: string;
    property_focus?: string;
    country_focus?: string;
    region_focus?: string;
    strategy?: string;
    properties?: number;
    portfolio_size_sf?: number;
    acquisitions_24_months?: number;
    dispositions_24_months?: number;
}

interface PageProps {
    company: OwnerCompany;
    currentIndex?: number;
    totalCount?: number;
    previousCompanyId?: number | null;
    nextCompanyId?: number | null;
}

// Static fund data (for now)
const STATIC_FUNDS: OwnerFund[] = [
    {
        id: 1,
        fund: "Blackstone Real Estate Income Trust",
        fund_size: 70000000000,
        status: "Active",
        dry_powder: 5000000000,
        aum: 65000000000,
        vintage: "2017",
        property_focus: "Office, Industrial, Retail",
        country_focus: "United States",
        region_focus: "National",
        strategy: "Core Plus",
        properties: 1250,
        portfolio_size_sf: 450000000,
        acquisitions_24_months: 8500000000,
        dispositions_24_months: 3200000000,
    },
    {
        id: 2,
        fund: "Blackstone Real Estate Partners IX",
        fund_size: 20000000000,
        status: "Active",
        dry_powder: 3500000000,
        aum: 16500000000,
        vintage: "2019",
        property_focus: "Office, Industrial",
        country_focus: "United States, Europe",
        region_focus: "Global",
        strategy: "Value Add",
        properties: 450,
        portfolio_size_sf: 180000000,
        acquisitions_24_months: 5200000000,
        dispositions_24_months: 2100000000,
    },
    {
        id: 3,
        fund: "Blackstone Real Estate Partners VIII",
        fund_size: 15800000000,
        status: "Fully Invested",
        dry_powder: 0,
        aum: 15800000000,
        vintage: "2015",
        property_focus: "Office, Hospitality",
        country_focus: "United States",
        region_focus: "National",
        strategy: "Value Add",
        properties: 380,
        portfolio_size_sf: 125000000,
        acquisitions_24_months: 0,
        dispositions_24_months: 5800000000,
    },
];

export default function CompanyFunds({
    company,
    currentIndex,
    totalCount,
    previousCompanyId,
    nextCompanyId,
}: PageProps) {
    const [searchValue, setSearchValue] = useState("");
    const [status, setStatus] = useState<string[]>([]);
    const [propertyFocus, setPropertyFocus] = useState<string[]>([]);
    const [countryFocus, setCountryFocus] = useState<string[]>([]);
    const [strategy, setStrategy] = useState<string[]>([]);
    const [minDryPowder, setMinDryPowder] = useState<number | null>(null);
    const [maxDryPowder, setMaxDryPowder] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState<string>("fund");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

    const tabs = [
        {
            id: "summary",
            label: "Summary",
            href: `/contacts/owners/${company.id}`,
        },
        {
            id: "properties",
            label: "Properties",
            href: `/contacts/owners/${company.id}/properties`,
        },
        {
            id: "transactions",
            label: "Transactions",
            href: `/contacts/owners/${company.id}/transactions`,
        },
        {
            id: "listings",
            label: "Listings",
            href: `/contacts/owners/${company.id}/listings`,
        },
        {
            id: "funds",
            label: "Funds",
            href: `/contacts/owners/${company.id}/funds`,
        },
        {
            id: "tenants",
            label: "Tenants",
            href: `/contacts/owners/${company.id}/tenants`,
        },
        {
            id: "relationships",
            label: "Relationships",
            href: `/contacts/owners/${company.id}/relationships`,
        },
        {
            id: "contacts",
            label: "Contacts",
            href: `/contacts/owners/${company.id}/contacts`,
        },
        {
            id: "news",
            label: "News",
            href: `/contacts/owners/${company.id}/news`,
        },
    ];

    // Filter and sort funds
    const filteredFunds = useMemo(() => {
        let filtered = [...STATIC_FUNDS];

        // Search filter
        if (searchValue) {
            const searchLower = searchValue.toLowerCase();
            filtered = filtered.filter((fund) => {
                const fundName = fund.fund || "";
                return fundName.toLowerCase().includes(searchLower);
            });
        }

        // Status filter
        if (status.length > 0) {
            filtered = filtered.filter((fund) =>
                fund.status && status.includes(fund.status)
            );
        }

        // Property Focus filter
        if (propertyFocus.length > 0) {
            filtered = filtered.filter((fund) =>
                fund.property_focus &&
                propertyFocus.some((pf) =>
                    fund.property_focus?.includes(pf)
                )
            );
        }

        // Country Focus filter
        if (countryFocus.length > 0) {
            filtered = filtered.filter((fund) =>
                fund.country_focus &&
                countryFocus.some((cf) =>
                    fund.country_focus?.includes(cf)
                )
            );
        }

        // Strategy filter
        if (strategy.length > 0) {
            filtered = filtered.filter((fund) =>
                fund.strategy && strategy.includes(fund.strategy)
            );
        }

        // Dry Powder filter
        if (minDryPowder !== null) {
            filtered = filtered.filter(
                (fund) => (fund.dry_powder || 0) >= minDryPowder
            );
        }
        if (maxDryPowder !== null) {
            filtered = filtered.filter(
                (fund) => (fund.dry_powder || 0) <= maxDryPowder
            );
        }

        // Sort
        filtered.sort((a, b) => {
            let aValue: any;
            let bValue: any;

            switch (sortBy) {
                case "fund":
                    aValue = a.fund || "";
                    bValue = b.fund || "";
                    break;
                case "fund_size":
                    aValue = a.fund_size || 0;
                    bValue = b.fund_size || 0;
                    break;
                case "status":
                    aValue = a.status || "";
                    bValue = b.status || "";
                    break;
                case "dry_powder":
                    aValue = a.dry_powder || 0;
                    bValue = b.dry_powder || 0;
                    break;
                case "aum":
                    aValue = a.aum || 0;
                    bValue = b.aum || 0;
                    break;
                case "vintage":
                    aValue = a.vintage || "";
                    bValue = b.vintage || "";
                    break;
                case "properties":
                    aValue = a.properties || 0;
                    bValue = b.properties || 0;
                    break;
                case "portfolio_size_sf":
                    aValue = a.portfolio_size_sf || 0;
                    bValue = b.portfolio_size_sf || 0;
                    break;
                default:
                    aValue = a.fund || "";
                    bValue = b.fund || "";
            }

            if (typeof aValue === "string" && typeof bValue === "string") {
                return sortDir === "asc"
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            } else {
                return sortDir === "asc"
                    ? (aValue as number) - (bValue as number)
                    : (bValue as number) - (aValue as number);
            }
        });

        return filtered;
    }, [
        searchValue,
        status,
        propertyFocus,
        countryFocus,
        strategy,
        minDryPowder,
        maxDryPowder,
        sortBy,
        sortDir,
    ]);

    const formatNumber = (num: number | null | undefined): string => {
        if (num === null || num === undefined) return "—";
        return num.toLocaleString();
    };

    const formatSF = (sf: number | null | undefined): string => {
        if (sf === null || sf === undefined) return "—";
        if (sf >= 1000000) {
            return `${(sf / 1000000).toFixed(1)}M`;
        }
        if (sf >= 1000) {
            return `${(sf / 1000).toFixed(1)}K`;
        }
        return sf.toLocaleString();
    };

    const formatCurrency = (value: number | null | undefined): string => {
        if (value === null || value === undefined) return "—";
        if (value >= 1000000000) {
            return `$${(value / 1000000000).toFixed(2)}B`;
        }
        if (value >= 1000000) {
            return `$${(value / 1000000).toFixed(2)}M`;
        }
        if (value >= 1000) {
            return `$${(value / 1000).toFixed(2)}K`;
        }
        return `$${value.toLocaleString()}`;
    };


    const columns: ResizableColumn[] = [
        {
            key: "fund",
            label: "Fund",
            align: "left",
            defaultWidth: 200,
            render: (row: OwnerFund) => (
                <span className="block truncate text-gray-900 font-medium">
                    {row.fund}
                </span>
            ),
        },
        {
            key: "fund_size",
            label: "Fund Size",
            align: "right",
            defaultWidth: 140,
            render: (row: OwnerFund) => (
                <span className="block truncate text-gray-500">
                    {formatCurrency(row.fund_size)}
                </span>
            ),
        },
        {
            key: "status",
            label: "Status",
            align: "left",
            defaultWidth: 120,
            render: (row: OwnerFund) => (
                <span className="block truncate text-gray-500">
                    {row.status || "—"}
                </span>
            ),
        },
        {
            key: "aum",
            label: "AUM",
            align: "right",
            defaultWidth: 140,
            render: (row: OwnerFund) => (
                <span className="block truncate text-gray-500">
                    {formatCurrency(row.aum)}
                </span>
            ),
        },
        {
            key: "dry_powder",
            label: "Dry Powder",
            align: "right",
            defaultWidth: 140,
            render: (row: OwnerFund) => (
                <span className="block truncate text-gray-500">
                    {formatCurrency(row.dry_powder)}
                </span>
            ),
        },
        {
            key: "vintage",
            label: "Vintage",
            align: "left",
            defaultWidth: 100,
            render: (row: OwnerFund) => (
                <span className="block truncate text-gray-500">
                    {row.vintage || "—"}
                </span>
            ),
        },
        {
            key: "property_focus",
            label: "Property Focus",
            align: "left",
            defaultWidth: 160,
            render: (row: OwnerFund) => (
                <span className="block truncate text-gray-500">
                    {row.property_focus || "—"}
                </span>
            ),
        },
        {
            key: "country_focus",
            label: "Country Focus",
            align: "left",
            defaultWidth: 150,
            render: (row: OwnerFund) => (
                <span className="block truncate text-gray-500">
                    {row.country_focus || "—"}
                </span>
            ),
        },
        {
            key: "region_focus",
            label: "Region Focus",
            align: "left",
            defaultWidth: 150,
            render: (row: OwnerFund) => (
                <span className="block truncate text-gray-500">
                    {row.region_focus || "—"}
                </span>
            ),
        },
        {
            key: "strategy",
            label: "Strategy",
            align: "left",
            defaultWidth: 160,
            render: (row: OwnerFund) => (
                <span className="block truncate text-gray-500">
                    {row.strategy || "—"}
                </span>
            ),
        },
        {
            key: "properties",
            label: "Properties (#)",
            align: "right",
            defaultWidth: 120,
            render: (row: OwnerFund) => (
                <span className="block truncate text-gray-500">
                    {formatNumber(row.properties)}
                </span>
            ),
        },
        {
            key: "portfolio_size_sf",
            label: "Portfolio Size (SF)",
            align: "right",
            defaultWidth: 160,
            render: (row: OwnerFund) => (
                <span className="block truncate text-gray-500">
                    {formatSF(row.portfolio_size_sf)}
                </span>
            ),
        },
        {
            key: "target_irr_gross",
            label: "Target IRR - Gross",
            align: "right",
            defaultWidth: 160,
            render: () => <span className="block truncate text-gray-500">—</span>,
        },
        {
            key: "target_irr_net",
            label: "Target IRR - Net",
            align: "right",
            defaultWidth: 160,
            render: () => <span className="block truncate text-gray-500">—</span>,
        },
        {
            key: "acquisitions_24_months",
            label: "Acquisitions 24M",
            align: "right",
            defaultWidth: 160,
            render: (row: OwnerFund) => (
                <span className="block truncate text-gray-500">
                    {formatCurrency(row.acquisitions_24_months)}
                </span>
            ),
        },
        {
            key: "dispositions_24_months",
            label: "Dispositions 24M",
            align: "right",
            defaultWidth: 160,
            render: (row: OwnerFund) => (
                <span className="block truncate text-gray-500">
                    {formatCurrency(row.dispositions_24_months)}
                </span>
            ),
        },
    ];

    const handleSearch = () => {
        // Handle search - for now just trigger re-filtering via useMemo
    };

    const handleClearFilters = () => {
        setSearchValue("");
        setStatus([]);
        setPropertyFocus([]);
        setCountryFocus([]);
        setStrategy([]);
        setMinDryPowder(null);
        setMaxDryPowder(null);
    };

    return (
        <AppLayout>
            <Head title={`${company.company} - Funds`} />
            <CompanyDetailsLayout
                title={`${company.company} - Funds`}
                tabs={tabs}
                currentIndex={currentIndex}
                totalCount={totalCount}
                previousCompanyId={previousCompanyId}
                nextCompanyId={nextCompanyId}
                basePath="/contacts/owners"
                headerComponent={<CompanyDetailsHeader company={company} />}
            >
                {/* Content Area */}
                <div className="flex flex-col h-full bg-white overflow-hidden max-h-[calc(100vh-8vh)]">
                    {/* Search and Filter Bar */}
                    <div className="shrink-0">
                        <CompanyFundsFilterBar
                            searchValue={searchValue}
                            onSearchChange={setSearchValue}
                            onSearch={handleSearch}
                            fundsCount={filteredFunds.length}
                            status={status}
                            onStatusChange={setStatus}
                            propertyFocus={propertyFocus}
                            onPropertyFocusChange={setPropertyFocus}
                            minDryPowder={minDryPowder}
                            maxDryPowder={maxDryPowder}
                            onDryPowderChange={(min, max) => {
                                setMinDryPowder(min);
                                setMaxDryPowder(max);
                            }}
                            countryFocus={countryFocus}
                            onCountryFocusChange={setCountryFocus}
                            strategy={strategy}
                            onStrategyChange={setStrategy}
                            sortBy={sortBy}
                            sortDir={sortDir}
                            onSortChange={(by, dir) => {
                                setSortBy(by);
                                setSortDir(dir);
                            }}
                        />
                    </div>

                    {/* Table Container */}
                    <div className="flex flex-1 min-h-0 overflow-hidden">
                        {/* Main Content */}
                        <div className="flex flex-col w-full min-h-0">
                            <div className="flex flex-col flex-1 min-h-0 mx-auto max-w-[1920px] w-full">
                                {/* Table - Takes available space */}
                                <div className="flex-1 min-h-0 overflow-hidden px-4 sm:px-6 lg:px-8 pt-4">
                                    <ResizableTable
                                        columns={columns}
                                        data={filteredFunds}
                                        storageKey="owner-company-funds-column-widths"
                                        className="h-full"
                                        rowKey={(row) => row.id}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CompanyDetailsLayout>
        </AppLayout>
    );
}
