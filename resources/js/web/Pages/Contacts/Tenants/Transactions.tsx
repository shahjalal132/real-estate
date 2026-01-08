import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import AppLayout from "../../../Layouts/AppLayout";
import { TennentCompany } from "../../../../types";
import CompanyDetailsHeader from "../../../../Components/Tenant/CompanyDetailsHeader";
import ResizableTable, {
    ResizableColumn,
} from "../../../../Components/ResizableTable/ResizableTable";
import StarRating from "../../../../Components/Tenant/StarRating";
import TransactionsFilterBar from "../../../../Components/Tenant/TransactionsFilterBar";

interface Transaction {
    id: string;
    address: string;
    city: string;
    state: string;
    country: string;
    tenantName: string;
    signDate: string;
    sfLeased: string;
    floor: string;
    spaceUse: string;
    leaseType: string;
    commencement: string;
    expiration: string;
    term: string;
    dealType: string;
    rent: string;
    tenantRepCompany: string;
    landlordCompany: string;
    starRating: number;
    market: string;
    submarket: string;
}

interface PageProps {
    company: TennentCompany;
}

export default function Transactions({ company }: PageProps) {
    const [transactionType, setTransactionType] = useState<"lease" | "sale">(
        "lease"
    );
    const [addressSearch, setAddressSearch] = useState("");
    const [spaceUse, setSpaceUse] = useState<string[]>([]);
    const [inShoppingCenter, setInShoppingCenter] = useState(false);
    const [minSizeLeased, setMinSizeLeased] = useState<number | null>(null);
    const [maxSizeLeased, setMaxSizeLeased] = useState<number | null>(null);
    const [signedWithinLast, setSignedWithinLast] = useState("");
    const [signDateStart, setSignDateStart] = useState("");
    const [signDateEnd, setSignDateEnd] = useState("");
    const [sortBy, setSortBy] = useState<string>("signDate");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

    const tabs = [
        {
            id: "summary",
            label: "Summary",
            href: `/contacts/tenants/${company.id}`,
        },
        {
            id: "locations",
            label: "Locations",
            href: `/contacts/tenants/${company.id}/locations`,
        },
        {
            id: "transactions",
            label: "Transactions",
            href: `/contacts/tenants/${company.id}/transactions`,
        },
        {
            id: "lease_expirations",
            label: "Lease Expirations",
            href: `/contacts/tenants/${company.id}/lease-expirations`,
        },
        {
            id: "contacts",
            label: "Contacts",
            href: `/contacts/tenants/${company.id}/contacts`,
        },
        {
            id: "relationships",
            label: "Relationships",
            href: `/contacts/tenants/${company.id}/relationships`,
        },
        {
            id: "news",
            label: "News",
            href: `/contacts/tenants/${company.id}/news`,
        },
    ];

    // Static transaction data based on the provided HTML
    const transactions: Transaction[] = [
        {
            id: "1",
            address: "35 Lakewood Blvd",
            city: "Winnipeg",
            state: "MB",
            country: "Canada",
            tenantName: "Walmart",
            signDate: "Oct 2025",
            sfLeased: "141,833",
            floor: "1",
            spaceUse: "Retail",
            leaseType: "Direct",
            commencement: "Oct 2025",
            expiration: "",
            term: "",
            dealType: "New",
            rent: "",
            tenantRepCompany: "",
            landlordCompany: "",
            starRating: 3,
            market: "",
            submarket: "Winnipeg",
        },
        {
            id: "2",
            address: "3363 Miac Cv",
            city: "Memphis",
            state: "TN",
            country: "United States",
            tenantName: "Walmart",
            signDate: "Oct 2025",
            sfLeased: "131,225",
            floor: "1",
            spaceUse: "Industrial",
            leaseType: "Direct",
            commencement: "Jan 2026",
            expiration: "",
            term: "",
            dealType: "Renewal",
            rent: "",
            tenantRepCompany: "",
            landlordCompany: "Prologis, Inc.",
            starRating: 3,
            market: "Memphis, TN",
            submarket: "Southeast",
        },
        {
            id: "3",
            address: "6 NE Salevan Pl",
            city: "Milford",
            state: "DE",
            country: "United States",
            tenantName: "Walmart",
            signDate: "Sep 2025",
            sfLeased: "9,760",
            floor: "1",
            spaceUse: "Industrial",
            leaseType: "Direct",
            commencement: "Nov 2025",
            expiration: "",
            term: "",
            dealType: "New",
            rent: "$9.96 NNN",
            tenantRepCompany: "",
            landlordCompany: "",
            starRating: 2.5,
            market: "Dover, DE",
            submarket: "Kent County",
        },
        {
            id: "4",
            address: "153 Blanding Blvd",
            city: "Orange Park",
            state: "FL",
            country: "United States",
            tenantName: "Walmart",
            signDate: "Aug 2025",
            sfLeased: "2,058",
            floor: "1",
            spaceUse: "Office",
            leaseType: "Direct",
            commencement: "Sep 2025",
            expiration: "Mar 2026",
            term: "6 Months",
            dealType: "New",
            rent: "$19.00 NNN",
            tenantRepCompany: "",
            landlordCompany: "Watson Commercial Realty, Inc.",
            starRating: 3,
            market: "Jacksonville, FL",
            submarket: "Orange Park/Clay County",
        },
        {
            id: "5",
            address: "1695-1701 Crossroads Dr",
            city: "Joliet",
            state: "IL",
            country: "United States",
            tenantName: "Walmart",
            signDate: "Aug 2025",
            sfLeased: "192,390",
            floor: "1",
            spaceUse: "Industrial",
            leaseType: "Direct",
            commencement: "Sep 2025",
            expiration: "",
            term: "",
            dealType: "New",
            rent: "",
            tenantRepCompany: "",
            landlordCompany: "Granite REIT",
            starRating: 4,
            market: "Chicago, IL",
            submarket: "Joliet Area",
        },
        {
            id: "6",
            address: "7095 Fifth Line",
            city: "Milton",
            state: "ON",
            country: "Canada",
            tenantName: "Walmart",
            signDate: "Aug 2025",
            sfLeased: "749,949",
            floor: "1",
            spaceUse: "Industrial",
            leaseType: "Direct",
            commencement: "Oct 2025",
            expiration: "",
            term: "",
            dealType: "New",
            rent: "",
            tenantRepCompany: "",
            landlordCompany: "IG Wealth Management",
            starRating: 4,
            market: "Toronto",
            submarket: "North GTA West",
        },
        {
            id: "7",
            address: "23040-23070 NE Townsend Way",
            city: "Fairview",
            state: "OR",
            country: "United States",
            tenantName: "Walmart",
            signDate: "Jul 2025",
            sfLeased: "76,491",
            floor: "1",
            spaceUse: "Retail",
            leaseType: "Direct",
            commencement: "Jan 2026",
            expiration: "",
            term: "",
            dealType: "Renewal",
            rent: "",
            tenantRepCompany: "",
            landlordCompany: "Invesco Advisers, Inc.",
            starRating: 4,
            market: "Portland, OR",
            submarket: "East Columbia Corridor",
        },
        {
            id: "8",
            address: "815 11th Ave",
            city: "Sunnyvale",
            state: "CA",
            country: "United States",
            tenantName: "Walmart Inc.",
            signDate: "Jun 2025",
            sfLeased: "206,268",
            floor: "1–5",
            spaceUse: "Office",
            leaseType: "Direct",
            commencement: "Oct 2025",
            expiration: "",
            term: "",
            dealType: "New",
            rent: "",
            tenantRepCompany: "Colliers",
            landlordCompany: "Jay Paul Company",
            starRating: 4,
            market: "San Jose, CA",
            submarket: "Moffett Park",
        },
        {
            id: "9",
            address: "809 11th Ave",
            city: "Sunnyvale",
            state: "CA",
            country: "United States",
            tenantName: "Walmart Inc.",
            signDate: "Jun 2025",
            sfLeased: "132,579",
            floor: "1–3",
            spaceUse: "Office",
            leaseType: "Direct",
            commencement: "Oct 2025",
            expiration: "",
            term: "",
            dealType: "New",
            rent: "",
            tenantRepCompany: "Colliers",
            landlordCompany: "Jay Paul Company",
            starRating: 4,
            market: "San Jose, CA",
            submarket: "Moffett Park",
        },
        {
            id: "10",
            address: "215 NW A St",
            city: "Bentonville",
            state: "AR",
            country: "United States",
            tenantName: "Lava Retail, LLC",
            signDate: "May 2025",
            sfLeased: "7,270",
            floor: "5",
            spaceUse: "Office",
            leaseType: "Direct",
            commencement: "Feb 2026",
            expiration: "May 2032",
            term: "6 Years 3 Months",
            dealType: "New",
            rent: "$43.00 MG",
            tenantRepCompany: "Capstone Commercial Advisors",
            landlordCompany: "",
            starRating: 4,
            market: "Northwest Arkansas, AR",
            submarket: "Bentonville",
        },
        {
            id: "11",
            address: "Rocky Rd & Turning Willow Dr",
            city: "Tomball",
            state: "TX",
            country: "United States",
            tenantName: "Sam's Club",
            signDate: "Apr 2025",
            sfLeased: "167,050",
            floor: "1",
            spaceUse: "Retail",
            leaseType: "Direct",
            commencement: "Sep 2026",
            expiration: "",
            term: "",
            dealType: "New",
            rent: "",
            tenantRepCompany: "",
            landlordCompany: "NewQuest Properties",
            starRating: 4,
            market: "Houston, TX",
            submarket: "Fairfield",
        },
        {
            id: "12",
            address: "221 River St",
            city: "Hoboken",
            state: "NJ",
            country: "United States",
            tenantName: "Walmart",
            signDate: "Apr 2025",
            sfLeased: "86,443",
            floor: "2–3",
            spaceUse: "Office",
            leaseType: "Sublease",
            commencement: "Sep 2025",
            expiration: "May 2030",
            term: "4 Years 8 Months",
            dealType: "New",
            rent: "",
            tenantRepCompany: "",
            landlordCompany: "Mitsui Fudosan America, Inc.",
            starRating: 4,
            market: "New York, NY",
            submarket: "Hudson Waterfront",
        },
        {
            id: "13",
            address: "5737 S Transit Rd",
            city: "Lockport",
            state: "NY",
            country: "United States",
            tenantName: "Walmart Inc.",
            signDate: "Mar 2025",
            sfLeased: "185,000",
            floor: "1",
            spaceUse: "Retail",
            leaseType: "Direct",
            commencement: "Sep 2025",
            expiration: "",
            term: "",
            dealType: "Renewal",
            rent: "",
            tenantRepCompany: "",
            landlordCompany: "Walmart Inc.",
            starRating: 3,
            market: "Buffalo, NY",
            submarket: "Outlying Niagara County",
        },
        {
            id: "14",
            address: "6611 Garth Rd",
            city: "Baytown",
            state: "TX",
            country: "United States",
            tenantName: "Sam's Club",
            signDate: "Mar 2025",
            sfLeased: "134,000",
            floor: "1",
            spaceUse: "Retail",
            leaseType: "Direct",
            commencement: "Jul 2026",
            expiration: "",
            term: "",
            dealType: "New",
            rent: "",
            tenantRepCompany: "",
            landlordCompany: "Fidelis Realty Partners",
            starRating: 4,
            market: "Houston, TX",
            submarket: "Channelview",
        },
        {
            id: "15",
            address: "4554 Portier St",
            city: "Orlando",
            state: "FL",
            country: "United States",
            tenantName: "Walmart",
            signDate: "Feb 2025",
            sfLeased: "107,783",
            floor: "1",
            spaceUse: "Industrial",
            leaseType: "Direct",
            commencement: "Mar 2025",
            expiration: "",
            term: "",
            dealType: "New",
            rent: "",
            tenantRepCompany: "",
            landlordCompany: "Link Logistics Real Estate",
            starRating: 4,
            market: "Orlando, FL",
            submarket: "SE Orange County",
        },
        {
            id: "16",
            address: "1657 N Guardian Dr",
            city: "Saratoga Springs",
            state: "UT",
            country: "United States",
            tenantName: "Walmart",
            signDate: "Feb 2025",
            sfLeased: "2,460",
            floor: "1",
            spaceUse: "Retail",
            leaseType: "Direct",
            commencement: "Mar 2025",
            expiration: "Sep 2025",
            term: "6 Months",
            dealType: "New",
            rent: "$32.10 +UTIL",
            tenantRepCompany: "",
            landlordCompany: "Tracy Tanner",
            starRating: 3,
            market: "Provo, UT",
            submarket: "Utah County",
        },
        {
            id: "17",
            address: "640 W California Ave",
            city: "Sunnyvale",
            state: "CA",
            country: "United States",
            tenantName: "Walmart",
            signDate: "Dec 2024",
            sfLeased: "27,130",
            floor: "1",
            spaceUse: "Office",
            leaseType: "Direct",
            commencement: "Jan 2025",
            expiration: "",
            term: "",
            dealType: "Renewal",
            rent: "",
            tenantRepCompany: "Colliers",
            landlordCompany: "Principal Real Estate Investors",
            starRating: 4,
            market: "San Jose, CA",
            submarket: "Sunnyvale",
        },
        {
            id: "18",
            address: "10000 Omni Dr",
            city: "Jacksonville",
            state: "FL",
            country: "United States",
            tenantName: "Walmart",
            signDate: "Dec 2024",
            sfLeased: "174,437",
            floor: "1",
            spaceUse: "Retail",
            leaseType: "Direct",
            commencement: "Mar 2027",
            expiration: "",
            term: "",
            dealType: "New",
            rent: "",
            tenantRepCompany: "",
            landlordCompany: "",
            starRating: 3,
            market: "Jacksonville, FL",
            submarket: "Riverside",
        },
        {
            id: "19",
            address: "10900 NE 4th St",
            city: "Bellevue",
            state: "WA",
            country: "United States",
            tenantName: "Walmart",
            signDate: "Nov 2024",
            sfLeased: "94,309",
            floor: "6–8,12–13",
            spaceUse: "Office",
            leaseType: "Direct",
            commencement: "Oct 2025",
            expiration: "",
            term: "",
            dealType: "New",
            rent: "",
            tenantRepCompany: "",
            landlordCompany: "Kilroy Realty Corporation",
            starRating: 4,
            market: "Seattle, WA",
            submarket: "Bellevue CBD",
        },
        {
            id: "20",
            address: "455-625 E Wetmore Rd",
            city: "Tucson",
            state: "AZ",
            country: "United States",
            tenantName: "Walmart",
            signDate: "Nov 2024",
            sfLeased: "86,922",
            floor: "1",
            spaceUse: "Retail",
            leaseType: "Direct",
            commencement: "Nov 2024",
            expiration: "",
            term: "",
            dealType: "Renewal",
            rent: "",
            tenantRepCompany: "Common Bond Development Group",
            landlordCompany: "Larsen Baker, LLC",
            starRating: 3,
            market: "Tucson, AZ",
            submarket: "Central West",
        },
    ];

    const columns: ResizableColumn[] = [
        {
            key: "address",
            label: "Address",
            defaultWidth: 260,
            render: (row: Transaction) => (
                <span className="block truncate" title={row.address}>
                    {row.address}
                </span>
            ),
        },
        {
            key: "city",
            label: "City",
            defaultWidth: 150,
            render: (row: Transaction) => (
                <span className="block truncate" title={row.city}>
                    {row.city}
                </span>
            ),
        },
        {
            key: "state",
            label: "State",
            defaultWidth: 110,
            render: (row: Transaction) => (
                <span className="block truncate" title={row.state}>
                    {row.state}
                </span>
            ),
        },
        {
            key: "country",
            label: "Country",
            defaultWidth: 150,
            render: (row: Transaction) => (
                <span className="block truncate" title={row.country}>
                    {row.country}
                </span>
            ),
        },
        {
            key: "tenantName",
            label: "Tenant Name",
            defaultWidth: 180,
            render: (row: Transaction) => (
                <span className="block truncate" title={row.tenantName}>
                    {row.tenantName}
                </span>
            ),
        },
        {
            key: "signDate",
            label: "Sign Date",
            defaultWidth: 140,
            render: (row: Transaction) => (
                <div className="flex items-center gap-1">
                    <span className="block truncate" title={row.signDate}>
                        {row.signDate}
                    </span>
                    <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 shrink-0"
                    >
                        <path d="M12 4.5V19.5M12 19.5L6 14M12 19.5L18 14" />
                    </svg>
                </div>
            ),
        },
        {
            key: "sfLeased",
            label: "SF Leased",
            align: "right",
            defaultWidth: 150,
            render: (row: Transaction) => (
                <span className="block truncate" title={row.sfLeased}>
                    {row.sfLeased}
                </span>
            ),
        },
        {
            key: "floor",
            label: "Floor",
            defaultWidth: 100,
            render: (row: Transaction) => (
                <span className="block truncate" title={row.floor}>
                    {row.floor}
                </span>
            ),
        },
        {
            key: "spaceUse",
            label: "Space Use",
            defaultWidth: 145,
            render: (row: Transaction) => (
                <span className="block truncate" title={row.spaceUse}>
                    {row.spaceUse}
                </span>
            ),
        },
        {
            key: "leaseType",
            label: "Lease Type",
            defaultWidth: 150,
            render: (row: Transaction) => (
                <span className="block truncate" title={row.leaseType}>
                    {row.leaseType}
                </span>
            ),
        },
        {
            key: "commencement",
            label: "Commencement",
            defaultWidth: 185,
            render: (row: Transaction) => (
                <span className="block truncate" title={row.commencement}>
                    {row.commencement}
                </span>
            ),
        },
        {
            key: "expiration",
            label: "Expiration",
            defaultWidth: 150,
            render: (row: Transaction) => (
                <span className="block truncate" title={row.expiration}>
                    {row.expiration || "—"}
                </span>
            ),
        },
        {
            key: "term",
            label: "Term",
            defaultWidth: 100,
            render: (row: Transaction) => (
                <span className="block truncate" title={row.term}>
                    {row.term || "—"}
                </span>
            ),
        },
        {
            key: "dealType",
            label: "Deal Type",
            defaultWidth: 145,
            render: (row: Transaction) => (
                <span className="block truncate" title={row.dealType}>
                    {row.dealType}
                </span>
            ),
        },
        {
            key: "rent",
            label: "Rent",
            align: "right",
            defaultWidth: 125,
            render: (row: Transaction) => (
                <span className="block truncate" title={row.rent}>
                    {row.rent || "—"}
                </span>
            ),
        },
        {
            key: "tenantRepCompany",
            label: "Tenant Rep Company",
            defaultWidth: 300,
            render: (row: Transaction) => (
                <span className="block truncate" title={row.tenantRepCompany}>
                    {row.tenantRepCompany || "—"}
                </span>
            ),
        },
        {
            key: "landlordCompany",
            label: "Landlord Company",
            defaultWidth: 300,
            render: (row: Transaction) => (
                <span className="block truncate" title={row.landlordCompany}>
                    {row.landlordCompany || "—"}
                </span>
            ),
        },
        {
            key: "starRating",
            label: "Star Rating",
            defaultWidth: 150,
            render: (row: Transaction) => (
                <StarRating rating={row.starRating} />
            ),
        },
        {
            key: "market",
            label: "Market",
            defaultWidth: 150,
            render: (row: Transaction) => (
                <span className="block truncate" title={row.market}>
                    {row.market || "—"}
                </span>
            ),
        },
        {
            key: "submarket",
            label: "Submarket",
            defaultWidth: 250,
            render: (row: Transaction) => (
                <span className="block truncate" title={row.submarket}>
                    {row.submarket || "—"}
                </span>
            ),
        },
    ];

    return (
        <AppLayout>
            <Head title={`${company.tenant_name} - Transactions`} />

            <div className="bg-gray-50 min-h-screen">
                {/* Company Header */}
                <div className="bg-white border-b border-gray-200">
                    <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 py-2">
                        <CompanyDetailsHeader company={company} />

                        {/* Tabs */}
                        <div className="border-b border-gray-200 mt-6">
                            <nav className="-mb-px flex space-x-8">
                                {tabs.map((tab) => (
                                    <Link
                                        key={tab.id}
                                        href={tab.href}
                                        className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                                            tab.id === "transactions"
                                                ? "border-red-500 text-red-600"
                                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                        }`}
                                    >
                                        {tab.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                        {/* Filter Bar */}
                        <TransactionsFilterBar
                            transactionType={transactionType}
                            onTransactionTypeChange={setTransactionType}
                            addressSearch={addressSearch}
                            onAddressSearchChange={setAddressSearch}
                            spaceUse={spaceUse}
                            onSpaceUseChange={setSpaceUse}
                            inShoppingCenter={inShoppingCenter}
                            onInShoppingCenterChange={setInShoppingCenter}
                            minSizeLeased={minSizeLeased}
                            maxSizeLeased={maxSizeLeased}
                            onSizeLeasedChange={(min, max) => {
                                setMinSizeLeased(min);
                                setMaxSizeLeased(max);
                            }}
                            signedWithinLast={signedWithinLast}
                            onSignedWithinLastChange={setSignedWithinLast}
                            signDateStart={signDateStart}
                            onSignDateStartChange={setSignDateStart}
                            signDateEnd={signDateEnd}
                            onSignDateEndChange={setSignDateEnd}
                            transactionCount={transactions.length}
                            sortBy={sortBy}
                            sortDir={sortDir}
                            onSortChange={(by, dir) => {
                                setSortBy(by);
                                setSortDir(dir);
                            }}
                        />

                        {/* Table */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-6">
                            <div className="h-[calc(100vh-400px)] min-h-[600px]">
                                <ResizableTable
                                    columns={columns}
                                    data={transactions}
                                    storageKey="tenant-transactions-table"
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
