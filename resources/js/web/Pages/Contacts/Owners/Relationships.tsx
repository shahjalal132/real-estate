import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import AppLayout from "../../../Layouts/AppLayout";
import CompanyDetailsHeader from "../../../../Components/Owner/CompanyDetailsHeader";
import ResizableTable, {
    ResizableColumn,
} from "../../../../Components/ResizableTable/ResizableTable";
import TenantSortSelector from "../../../../Components/Tenant/TenantSortSelector";

interface OwnerCompany {
    id: number;
    company: string;
    owner_type?: string;
}

interface TenantRepresentative {
    id: string;
    company: string;
    tenantLocations: number;
    tenantSfOccupied: string;
    tenantRepEmployees: string;
    tenantRepLocations: string;
    hqCity: string;
    hqState: string;
    hqCountry: string;
    website: string;
}

interface PageProps {
    company: OwnerCompany;
}

export default function Relationships({ company }: PageProps) {
    const [relationshipType, setRelationshipType] = useState<
        "tenant-representatives" | "landlords"
    >("tenant-representatives");
    const [companyName, setCompanyName] = useState("");
    const [viewType, setViewType] = useState<"companies" | "contacts">(
        "companies"
    );
    const [sortBy, setSortBy] = useState<string>("company");
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

    // Static tenant representative data based on provided HTML
    const tenantRepresentatives: TenantRepresentative[] = [
        {
            id: "1",
            company: "JLL",
            tenantLocations: 12,
            tenantSfOccupied: "7,071,565",
            tenantRepEmployees: "111,000",
            tenantRepLocations: "192",
            hqCity: "Chicago",
            hqState: "IL",
            hqCountry: "United States",
            website: "https://www.us.jll.com/",
        },
        {
            id: "2",
            company: "Colliers",
            tenantLocations: 17,
            tenantSfOccupied: "3,898,870",
            tenantRepEmployees: "27,538",
            tenantRepLocations: "338",
            hqCity: "Toronto",
            hqState: "ON",
            hqCountry: "Canada",
            website: "https://www.colliers.com/",
        },
        {
            id: "3",
            company: "The State of South Carolina",
            tenantLocations: 1,
            tenantSfOccupied: "3,000,000",
            tenantRepEmployees: "60,000",
            tenantRepLocations: "79",
            hqCity: "Columbia",
            hqState: "SC",
            hqCountry: "United States",
            website: "https://sc.gov/",
        },
        {
            id: "4",
            company: "Cushman & Wakefield",
            tenantLocations: 6,
            tenantSfOccupied: "2,773,872",
            tenantRepEmployees: "52,000",
            tenantRepLocations: "181",
            hqCity: "Chicago",
            hqState: "IL",
            hqCountry: "United States",
            website: "https://www.cushmanwakefield.com/en",
        },
        {
            id: "5",
            company: "CBRE",
            tenantLocations: 4,
            tenantSfOccupied: "2,210,932",
            tenantRepEmployees: "140,000",
            tenantRepLocations: "427",
            hqCity: "Dallas",
            hqState: "TX",
            hqCountry: "United States",
            website: "https://www.cbre.com/",
        },
        {
            id: "6",
            company: "OnPace Partners",
            tenantLocations: 3,
            tenantSfOccupied: "2,185,200",
            tenantRepEmployees: "",
            tenantRepLocations: "",
            hqCity: "Atlanta",
            hqState: "GA",
            hqCountry: "United States",
            website: "https://www.onpacepartners.com",
        },
        {
            id: "7",
            company: "Newmark",
            tenantLocations: 1,
            tenantSfOccupied: "634,400",
            tenantRepEmployees: "6,000",
            tenantRepLocations: "165",
            hqCity: "New York",
            hqState: "NY",
            hqCountry: "United States",
            website: "https://www.nmrk.com/",
        },
        {
            id: "8",
            company: "Payson Smith Holbrook",
            tenantLocations: 3,
            tenantSfOccupied: "433,952",
            tenantRepEmployees: "4",
            tenantRepLocations: "1",
            hqCity: "Boston",
            hqState: "MA",
            hqCountry: "United States",
            website: "https://paysonsmithholbrook.com/",
        },
        {
            id: "9",
            company: "B. D. Baker Company",
            tenantLocations: 1,
            tenantSfOccupied: "208,129",
            tenantRepEmployees: "",
            tenantRepLocations: "",
            hqCity: "",
            hqState: "",
            hqCountry: "United States",
            website: "",
        },
        {
            id: "10",
            company: "NAI Global",
            tenantLocations: 2,
            tenantSfOccupied: "192,896",
            tenantRepEmployees: "5,100",
            tenantRepLocations: "215",
            hqCity: "New York",
            hqState: "NY",
            hqCountry: "United States",
            website: "https://www.naiglobal.com",
        },
        {
            id: "11",
            company: "Flaum Management Company, Inc.",
            tenantLocations: 1,
            tenantSfOccupied: "128,277",
            tenantRepEmployees: "50",
            tenantRepLocations: "1",
            hqCity: "Rochester",
            hqState: "NY",
            hqCountry: "United States",
            website: "https://www.flaummgt.com/",
        },
        {
            id: "12",
            company: "Navarro Retail Group",
            tenantLocations: 1,
            tenantSfOccupied: "100,322",
            tenantRepEmployees: "2",
            tenantRepLocations: "",
            hqCity: "Laguna Niguel",
            hqState: "CA",
            hqCountry: "United States",
            website: "",
        },
        {
            id: "13",
            company: "Common Bond Development Group",
            tenantLocations: 1,
            tenantSfOccupied: "86,922",
            tenantRepEmployees: "",
            tenantRepLocations: "",
            hqCity: "Phoenix",
            hqState: "AZ",
            hqCountry: "United States",
            website: "https://commonbonddg.com/",
        },
        {
            id: "14",
            company: "Potter - Taylor & Company",
            tenantLocations: 1,
            tenantSfOccupied: "86,245",
            tenantRepEmployees: "2",
            tenantRepLocations: "",
            hqCity: "Sacramento",
            hqState: "CA",
            hqCountry: "United States",
            website: "https://www.potter-taylor.com",
        },
        {
            id: "15",
            company: "Commercial Realty Advisors NW",
            tenantLocations: 1,
            tenantSfOccupied: "60,000",
            tenantRepEmployees: "14",
            tenantRepLocations: "2",
            hqCity: "Portland",
            hqState: "OR",
            hqCountry: "United States",
            website: "https://www.cra-nw.com",
        },
        {
            id: "16",
            company: "DJM Realty",
            tenantLocations: 1,
            tenantSfOccupied: "51,288",
            tenantRepEmployees: "",
            tenantRepLocations: "",
            hqCity: "",
            hqState: "",
            hqCountry: "United States",
            website: "",
        },
        {
            id: "17",
            company: "The Edwards Company",
            tenantLocations: 1,
            tenantSfOccupied: "46,221",
            tenantRepEmployees: "3",
            tenantRepLocations: "1",
            hqCity: "Sacramento",
            hqState: "CA",
            hqCountry: "United States",
            website: "https://www.theedwardsco.com",
        },
        {
            id: "18",
            company: "Taylor Building Investors",
            tenantLocations: 1,
            tenantSfOccupied: "44,650",
            tenantRepEmployees: "13",
            tenantRepLocations: "",
            hqCity: "Sacramento",
            hqState: "CA",
            hqCountry: "United States",
            website: "",
        },
        {
            id: "19",
            company: "Foundation Real Estate Advisors",
            tenantLocations: 1,
            tenantSfOccupied: "38,456",
            tenantRepEmployees: "2",
            tenantRepLocations: "",
            hqCity: "Irvine",
            hqState: "CA",
            hqCountry: "United States",
            website: "https://foundationrea.com",
        },
        {
            id: "20",
            company: "Longo Commercial Advisors, LLC",
            tenantLocations: 1,
            tenantSfOccupied: "6,344",
            tenantRepEmployees: "1",
            tenantRepLocations: "1",
            hqCity: "Dallas",
            hqState: "TX",
            hqCountry: "United States",
            website: "https://www.longocommercial.com/",
        },
    ];

    const columns: ResizableColumn[] = [
        {
            key: "company",
            label: "Company",
            defaultWidth: 300,
            render: (row: TenantRepresentative) => (
                <span
                    className="block truncate font-medium text-gray-900"
                    title={row.company}
                >
                    {row.company}
                </span>
            ),
        },
        {
            key: "tenantLocations",
            label: "Tenant Locations",
            align: "right",
            defaultWidth: 195,
            render: (row: TenantRepresentative) => (
                <span
                    className="block truncate text-right"
                    title={row.tenantLocations.toString()}
                >
                    {row.tenantLocations.toLocaleString()}
                </span>
            ),
        },
        {
            key: "tenantSfOccupied",
            label: "Tenant SF Occupied",
            align: "right",
            defaultWidth: 215,
            render: (row: TenantRepresentative) => (
                <span
                    className="block truncate text-right"
                    title={row.tenantSfOccupied}
                >
                    {row.tenantSfOccupied}
                </span>
            ),
        },
        {
            key: "tenantRepEmployees",
            label: "Tenant Rep Employees",
            align: "right",
            defaultWidth: 240,
            render: (row: TenantRepresentative) => (
                <span
                    className="block truncate text-right"
                    title={row.tenantRepEmployees || ""}
                >
                    {row.tenantRepEmployees || "—"}
                </span>
            ),
        },
        {
            key: "tenantRepLocations",
            label: "Tenant Rep Locations",
            align: "right",
            defaultWidth: 235,
            render: (row: TenantRepresentative) => (
                <span
                    className="block truncate text-right"
                    title={row.tenantRepLocations || ""}
                >
                    {row.tenantRepLocations || "—"}
                </span>
            ),
        },
        {
            key: "hqCity",
            label: "HQ City",
            defaultWidth: 150,
            render: (row: TenantRepresentative) => (
                <span className="block truncate" title={row.hqCity || ""}>
                    {row.hqCity || "—"}
                </span>
            ),
        },
        {
            key: "hqState",
            label: "HQ State",
            defaultWidth: 140,
            render: (row: TenantRepresentative) => (
                <span className="block truncate" title={row.hqState || ""}>
                    {row.hqState || "—"}
                </span>
            ),
        },
        {
            key: "hqCountry",
            label: "HQ Country",
            defaultWidth: 150,
            render: (row: TenantRepresentative) => (
                <span className="block truncate" title={row.hqCountry}>
                    {row.hqCountry}
                </span>
            ),
        },
        {
            key: "website",
            label: "Website",
            align: "center",
            defaultWidth: 100,
            render: (row: TenantRepresentative) => (
                <div className="flex justify-center">
                    {row.website ? (
                        <a
                            href={row.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                            title={row.website}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="20px"
                                height="20px"
                                fill="currentColor"
                                className="w-5 h-5"
                            >
                                <path d="M19,19 L5,19 L5,5 L12,5 L12,3 L5,3 C3.89,3 3,3.9 3,5 L3,19 C3,20.1 3.89,21 5,21 L19,21 C20.1,21 21,20.1 21,19 L21,12 L19,12 L19,19 Z M14,3 L14,5 L17.59,5 L7.76,14.83 L9.17,16.24 L19,6.41 L19,10 L21,10 L21,3 L14,3 Z" />
                            </svg>
                        </a>
                    ) : (
                        <span className="text-gray-400">—</span>
                    )}
                </div>
            ),
        },
    ];

    return (
        <AppLayout>
            <Head title={`${company.company} - Relationships`} />

            <div className="bg-gray-50 min-h-screen">
                {/* Company Header */}
                <div className="bg-white border-b border-gray-200">
                    <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 py-2">
                        <CompanyDetailsHeader company={company} />

                        {/* Main Tabs */}
                        <div className="border-b border-gray-200 mt-6">
                            <nav className="-mb-px flex space-x-8">
                                {tabs.map((tab) => (
                                    <Link
                                        key={tab.id}
                                        href={tab.href}
                                        className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                                            tab.id === "relationships"
                                                ? "border-red-500 text-red-600"
                                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                        }`}
                                    >
                                        {tab.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Secondary Navigation and Filters */}
                        <div className="border-b border-gray-200">
                            {/* Row 1: Relationship Type Tabs and Companies/Contacts Toggle */}
                            <div className="flex items-center justify-between pt-4 pb-3">
                                {/* Relationship Type Tabs */}
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() =>
                                            setRelationshipType(
                                                "tenant-representatives"
                                            )
                                        }
                                        className={`border-b-2 px-1 py-2 text-sm font-medium transition-colors ${
                                            relationshipType ===
                                            "tenant-representatives"
                                                ? "border-red-500 text-red-600"
                                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                        }`}
                                    >
                                        Tenant Representatives
                                    </button>
                                    <button
                                        onClick={() =>
                                            setRelationshipType("landlords")
                                        }
                                        className={`border-b-2 px-1 py-2 text-sm font-medium transition-colors ${
                                            relationshipType === "landlords"
                                                ? "border-red-500 text-red-600"
                                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                        }`}
                                    >
                                        Landlords
                                    </button>
                                </div>

                                {/* Companies/Contacts Toggle */}
                                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => setViewType("companies")}
                                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                                            viewType === "companies"
                                                ? "bg-blue-600 text-white"
                                                : "bg-white text-gray-700 hover:bg-gray-50"
                                        }`}
                                    >
                                        Companies
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setViewType("contacts")}
                                        className={`px-4 py-2 text-sm font-medium transition-colors border-l border-gray-300 ${
                                            viewType === "contacts"
                                                ? "bg-blue-600 text-white"
                                                : "bg-white text-gray-700 hover:bg-gray-50"
                                        }`}
                                    >
                                        Contacts
                                    </button>
                                </div>
                            </div>

                            {/* Row 2: Company Name Input and Sort */}
                            <div className="flex items-center justify-between pb-4">
                                {/* Company Name Input */}
                                <div className="relative shrink-0">
                                    <input
                                        type="text"
                                        value={companyName}
                                        onChange={(e) =>
                                            setCompanyName(e.target.value)
                                        }
                                        placeholder="Company Name"
                                        className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 min-w-[160px]"
                                    />
                                </div>

                                {/* Sort Selector */}
                                <div className="flex items-center gap-4 shrink-0">
                                    <TenantSortSelector
                                        sortBy={sortBy}
                                        sortDir={sortDir}
                                        onSortChange={(
                                            by: string,
                                            dir: "asc" | "desc"
                                        ) => {
                                            setSortBy(by);
                                            setSortDir(dir);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-6">
                            <div className="h-[calc(100vh-400px)] min-h-[600px]">
                                <ResizableTable
                                    columns={columns}
                                    data={tenantRepresentatives}
                                    storageKey="owner-relationships-table"
                                    rowKey={(row) => row.id}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

