import { useState, useMemo } from "react";
import { Head, Link, router } from "@inertiajs/react";
import AppLayout from "@/web/Layouts/AppLayout";
import CompanyDetailsHeader from "@/Components/Owner/CompanyDetailsHeader";
import OwnerFundsFilter from "@/Components/Owner/OwnerFundsFilter";
import ResizableTable, {
    ResizableColumn,
} from "@/Components/ResizableTable/ResizableTable";
import OwnerFundsAdvancedFilter from "@/Components/Owner/OwnerFundsAdvancedFilter";

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

export default function CompanyFunds({ company }: PageProps) {
    const [searchValue, setSearchValue] = useState("");
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [status, setStatus] = useState<string[]>([]);
    const [propertyFocus, setPropertyFocus] = useState<string[]>([]);
    const [countryFocus, setCountryFocus] = useState<string[]>([]);
    const [strategy, setStrategy] = useState<string[]>([]);
    const [minDryPowder, setMinDryPowder] = useState<number | null>(null);
    const [maxDryPowder, setMaxDryPowder] = useState<number | null>(null);

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

    // Filter funds (for now, just return all as filtering will be implemented later)
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

        return filtered;
    }, [searchValue, status, propertyFocus]);

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

    const activeFiltersCount =
        status.length +
        propertyFocus.length +
        countryFocus.length +
        strategy.length +
        (minDryPowder !== null ? 1 : 0) +
        (maxDryPowder !== null ? 1 : 0);

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

            <div className="flex flex-col h-screen bg-gray-50">
                {/* Company Header */}
                <div className="bg-white border-b border-gray-200 shrink-0">
                    <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 pt-4">
                        <CompanyDetailsHeader company={company} />

                        {/* Tabs */}
                        <div className="border-b border-gray-200 mt-6">
                            <nav className="-mb-px flex space-x-8">
                                {tabs.map((tab) => (
                                    <Link
                                        key={tab.id}
                                        href={tab.href}
                                        className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                                            tab.id === "funds"
                                                ? "border-red-500 text-red-600"
                                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                        }`}
                                    >
                                        {tab.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Content Area - Same structure as Funds.tsx */}
                <div className="flex flex-col h-full bg-white overflow-hidden max-h-[calc(100vh-8vh)]">
                    {/* Search and Filter Bar */}
                    <div className="shrink-0">
                        <OwnerFundsFilter
                            searchValue={searchValue}
                            onSearchChange={setSearchValue}
                            onSearch={handleSearch}
                            onFiltersClick={() => {
                                setShowAdvancedFilters((prev) => !prev);
                            }}
                            onSaveClick={() => {
                                // Handle save click
                            }}
                            onExportClick={() => {
                                // Handle export click
                            }}
                            onClearClick={handleClearFilters}
                            activeFiltersCount={activeFiltersCount}
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
                        />
                    </div>

                    {/* Table Container with Sidebar */}
                    <div className="flex flex-1 min-h-0 overflow-hidden">
                        {/* Main Content */}
                        <div
                            className={`flex flex-col transition-all duration-300 min-h-0 ${
                                showAdvancedFilters
                                    ? "w-full md:w-[calc(100%-600px)] lg:w-[calc(100%-600px)] xl:w-[calc(100%-600px)]"
                                    : "w-full"
                            }`}
                        >
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

                        {/* Advanced Filters Sidebar - Desktop */}
                        {showAdvancedFilters && (
                            <div className="hidden md:flex w-[600px] border-l border-gray-200 bg-white shrink-0 flex-col">
                                <OwnerFundsAdvancedFilter
                                    isOpen={showAdvancedFilters}
                                    onClose={() => setShowAdvancedFilters(false)}
                                    onClear={() => {
                                        handleClearFilters();
                                        setShowAdvancedFilters(false);
                                    }}
                                    onDone={() => {
                                        setShowAdvancedFilters(false);
                                    }}
                                    activeFiltersCount={activeFiltersCount}
                                />
                            </div>
                        )}

                        {/* Advanced Filters Overlay - Mobile */}
                        {showAdvancedFilters && (
                            <div className="md:hidden fixed inset-0 z-50 flex">
                                {/* Backdrop */}
                                <div
                                    className="absolute inset-0 bg-black bg-opacity-50"
                                    onClick={() => setShowAdvancedFilters(false)}
                                />
                                {/* Panel */}
                                <div className="relative w-full max-w-sm ml-auto bg-white h-full flex flex-col shadow-xl">
                                    <OwnerFundsAdvancedFilter
                                        isOpen={showAdvancedFilters}
                                        onClose={() =>
                                            setShowAdvancedFilters(false)
                                        }
                                        onClear={() => {
                                            handleClearFilters();
                                            setShowAdvancedFilters(false);
                                        }}
                                        onDone={() => {
                                            setShowAdvancedFilters(false);
                                        }}
                                        activeFiltersCount={activeFiltersCount}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
