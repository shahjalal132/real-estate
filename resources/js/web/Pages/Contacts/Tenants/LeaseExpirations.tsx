import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import AppLayout from "../../../Layouts/AppLayout";
import CompanyDetailsLayout from "../../../../Layouts/CompanyDetailsLayout";
import { TennentCompany } from "../../../../types";
import CompanyDetailsHeader from "../../../../Components/Tenant/CompanyDetailsHeader";
import ResizableTable, {
    ResizableColumn,
} from "../../../../Components/ResizableTable/ResizableTable";
import StarRating from "../../../../Components/Tenant/StarRating";
import LeaseExpirationsFilterBar from "../../../../Components/Tenant/LeaseExpirationsFilterBar";

interface LeaseExpiration {
    id: string;
    address: string;
    city: string;
    state: string;
    country: string;
    tenantName: string;
    sfLeased: string;
    floor: string;
    spaceUse: string;
    expiration: string;
    timeRemaining: string;
    occupancyType: string;
    siteType: string;
    buildingName: string;
    propertyType: string;
    starRating: number;
    market: string;
    submarket: string;
    locationType: string;
    tenantRepresentative: string;
}

interface PageProps {
    company: TennentCompany;
    currentIndex?: number;
    totalCount?: number;
    previousCompanyId?: number | null;
    nextCompanyId?: number | null;
}

export default function LeaseExpirations({
    company,
    currentIndex,
    totalCount,
    previousCompanyId,
    nextCompanyId,
}: PageProps) {
    const [addressSearch, setAddressSearch] = useState("");
    const [minSizeLeased, setMinSizeLeased] = useState<number | null>(null);
    const [maxSizeLeased, setMaxSizeLeased] = useState<number | null>(null);
    const [spaceUse, setSpaceUse] = useState<string[]>([]);
    const [expiresWithinLast, setExpiresWithinLast] = useState<string>("");
    const [expiresAfterStartDate, setExpiresAfterStartDate] =
        useState<string>("2026-01-08");
    const [expiresAfterEndDate, setExpiresAfterEndDate] = useState<string>("");
    const [tenantName, setTenantName] = useState("");
    const [sortBy, setSortBy] = useState<string>("expiration");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

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

    // Static lease expiration data based on provided HTML
    const leaseExpirations: LeaseExpiration[] = [
        {
            id: "1",
            address: "102 Primeway Dr",
            city: "Welland",
            state: "ON",
            country: "Canada",
            tenantName: "Walmart",
            sfLeased: "142,606",
            floor: "1",
            spaceUse: "Retail",
            expiration: "Jan 2026",
            timeRemaining: "",
            occupancyType: "Leased",
            siteType: "Retail Store/Branch",
            buildingName: "Walmart",
            propertyType: "Retail",
            starRating: 2,
            market: "Greater Golden Horseshoe",
            submarket: "Southern GGH",
            locationType: "Suburban",
            tenantRepresentative: "",
        },
        {
            id: "2",
            address: "10 Cambridge St",
            city: "Collingwood",
            state: "ON",
            country: "Canada",
            tenantName: "Walmart",
            sfLeased: "108,828",
            floor: "1",
            spaceUse: "Retail",
            expiration: "Jan 2026",
            timeRemaining: "",
            occupancyType: "Leased",
            siteType: "Retail Store/Branch",
            buildingName: "Walmart Collingwood Supercentre",
            propertyType: "Retail",
            starRating: 2,
            market: "Greater Golden Horseshoe",
            submarket: "Northern GGH",
            locationType: "Suburban",
            tenantRepresentative: "",
        },
        {
            id: "3",
            address: "153 Blanding Blvd",
            city: "Orange Park",
            state: "FL",
            country: "United States",
            tenantName: "Walmart",
            sfLeased: "2,058",
            floor: "1",
            spaceUse: "Office",
            expiration: "Mar 2026",
            timeRemaining: "2 Months",
            occupancyType: "Leased",
            siteType: "Retail Store/Branch",
            buildingName: "",
            propertyType: "Office",
            starRating: 3,
            market: "Jacksonville, FL",
            submarket: "Orange Park/Clay County",
            locationType: "Suburban",
            tenantRepresentative: "",
        },
        {
            id: "4",
            address: "5702 Baltimore National Pike",
            city: "Baltimore",
            state: "MD",
            country: "United States",
            tenantName: "Sam's Club",
            sfLeased: "130,345",
            floor: "1",
            spaceUse: "Retail",
            expiration: "Mar 2026",
            timeRemaining: "2 Months",
            occupancyType: "Leased",
            siteType: "Retail Store/Branch",
            buildingName: "",
            propertyType: "Retail",
            starRating: 3,
            market: "Baltimore, MD",
            submarket: "Catonsville",
            locationType: "Suburban",
            tenantRepresentative: "",
        },
        {
            id: "5",
            address: "9000 Metcalf St",
            city: "Overland Park",
            state: "KS",
            country: "United States",
            tenantName: "Walmart Neighborhood Market",
            sfLeased: "43,289",
            floor: "1",
            spaceUse: "Retail",
            expiration: "Jul 2026",
            timeRemaining: "6 Months",
            occupancyType: "Leased",
            siteType: "Retail Store/Branch",
            buildingName: "Walmart Neighborhood Market",
            propertyType: "Retail",
            starRating: 3,
            market: "Kansas City, MO",
            submarket: "Northeast Johnson County",
            locationType: "Suburban",
            tenantRepresentative: "",
        },
        {
            id: "6",
            address: "1009 Saint Patricks Dr",
            city: "Perry",
            state: "GA",
            country: "United States",
            tenantName: "Walmart",
            sfLeased: "152,720",
            floor: "1",
            spaceUse: "Retail",
            expiration: "Jul 2026",
            timeRemaining: "6 Months",
            occupancyType: "Leased",
            siteType: "Retail Store/Branch",
            buildingName: "Walmart",
            propertyType: "Retail",
            starRating: 3,
            market: "Warner Robins, GA",
            submarket: "Perry/Warner Robins",
            locationType: "",
            tenantRepresentative: "",
        },
        {
            id: "7",
            address: "100-300 Nitro Market Pl",
            city: "Cross Lanes",
            state: "WV",
            country: "United States",
            tenantName: "Walmart",
            sfLeased: "197,984",
            floor: "1",
            spaceUse: "Retail",
            expiration: "Aug 2026",
            timeRemaining: "7 Months",
            occupancyType: "Leased",
            siteType: "Retail Store/Branch",
            buildingName: "Wal-Mart Supercenter",
            propertyType: "Retail",
            starRating: 3,
            market: "Charleston , WV",
            submarket: "Outlying Kanawha County",
            locationType: "Suburban",
            tenantRepresentative: "",
        },
        {
            id: "8",
            address: "2601 SE J St",
            city: "Bentonville",
            state: "AR",
            country: "United States",
            tenantName: "Walmart",
            sfLeased: "109,500",
            floor: "1",
            spaceUse: "Industrial",
            expiration: "Sep 2026",
            timeRemaining: "7 Months",
            occupancyType: "Leased",
            siteType: "Corporate Office",
            buildingName: "",
            propertyType: "Industrial",
            starRating: 3,
            market: "Northwest Arkansas, AR",
            submarket: "Bentonville",
            locationType: "Suburban",
            tenantRepresentative: "",
        },
        {
            id: "9",
            address: "761 Airport Rd",
            city: "Hazleton",
            state: "PA",
            country: "United States",
            tenantName: "Walmart",
            sfLeased: "184,218",
            floor: "1",
            spaceUse: "Retail",
            expiration: "Sep 2026",
            timeRemaining: "8 Months",
            occupancyType: "Leased",
            siteType: "Retail Store/Branch",
            buildingName: "Walmart",
            propertyType: "Retail",
            starRating: 3,
            market: "Scranton, PA",
            submarket: "I-81 Corridor",
            locationType: "Suburban",
            tenantRepresentative: "",
        },
        {
            id: "10",
            address: "15 Texas Station Ct",
            city: "Timonium",
            state: "MD",
            country: "United States",
            tenantName: "Sam's Club",
            sfLeased: "133,859",
            floor: "1",
            spaceUse: "Retail",
            expiration: "Nov 2026",
            timeRemaining: "9 Months",
            occupancyType: "Leased",
            siteType: "Retail Store/Branch",
            buildingName: "Sam's Club Timonium",
            propertyType: "Retail",
            starRating: 3,
            market: "Baltimore, MD",
            submarket: "Route 83 Corridor North",
            locationType: "Suburban",
            tenantRepresentative: "",
        },
        {
            id: "11",
            address: "1776a Plainfield Pike",
            city: "Cranston",
            state: "RI",
            country: "United States",
            tenantName: "Walmart",
            sfLeased: "167,151",
            floor: "1",
            spaceUse: "Retail",
            expiration: "Nov 2026",
            timeRemaining: "10 Months",
            occupancyType: "Leased",
            siteType: "Retail Store/Branch",
            buildingName: "",
            propertyType: "Retail",
            starRating: 3,
            market: "Providence, RI",
            submarket: "Cranston",
            locationType: "Suburban",
            tenantRepresentative: "",
        },
        {
            id: "12",
            address: "3812 Liberty Hwy",
            city: "Anderson",
            state: "SC",
            country: "United States",
            tenantName: "Walmart",
            sfLeased: "191,957",
            floor: "1",
            spaceUse: "Retail",
            expiration: "Nov 2026",
            timeRemaining: "10 Months",
            occupancyType: "Leased",
            siteType: "Retail Store/Branch",
            buildingName: "",
            propertyType: "Retail",
            starRating: 3,
            market: "Greenville, SC",
            submarket: "Clemson Blvd",
            locationType: "Suburban",
            tenantRepresentative: "",
        },
        {
            id: "13",
            address: "3850 E Grand River Ave",
            city: "Howell",
            state: "MI",
            country: "United States",
            tenantName: "Walmart",
            sfLeased: "218,891",
            floor: "1",
            spaceUse: "Retail",
            expiration: "Dec 2026",
            timeRemaining: "11 Months",
            occupancyType: "Leased",
            siteType: "Retail Store/Branch",
            buildingName: "",
            propertyType: "Retail",
            starRating: 3,
            market: "Detroit, MI",
            submarket: "Livingston County",
            locationType: "Suburban",
            tenantRepresentative: "",
        },
        {
            id: "14",
            address: "2101-2151 Royal Ave",
            city: "Monona",
            state: "WI",
            country: "United States",
            tenantName: "Walmart",
            sfLeased: "202,393",
            floor: "1",
            spaceUse: "Retail",
            expiration: "Dec 2026",
            timeRemaining: "11 Months",
            occupancyType: "Leased",
            siteType: "Retail Store/Branch",
            buildingName: "",
            propertyType: "Retail",
            starRating: 3,
            market: "Madison, WI",
            submarket: "Southeast Madison",
            locationType: "Suburban",
            tenantRepresentative: "",
        },
        {
            id: "15",
            address: "1550 Leucadia Blvd",
            city: "Encinitas",
            state: "CA",
            country: "United States",
            tenantName: "Walmart",
            sfLeased: "105,849",
            floor: "1",
            spaceUse: "Retail",
            expiration: "Jan 2027",
            timeRemaining: "11 Months",
            occupancyType: "Sublet",
            siteType: "Retail Store/Branch",
            buildingName: "",
            propertyType: "Retail",
            starRating: 3,
            market: "San Diego, CA",
            submarket: "Carlsbad",
            locationType: "Suburban",
            tenantRepresentative: "",
        },
        {
            id: "16",
            address: "11179-11181 Lee Hwy",
            city: "Fairfax",
            state: "VA",
            country: "United States",
            tenantName: "Walmart",
            sfLeased: "90,653",
            floor: "1",
            spaceUse: "Retail",
            expiration: "Jan 2027",
            timeRemaining: "11 Months",
            occupancyType: "Sublet",
            siteType: "Retail Store/Branch",
            buildingName: "Fairfax Centre II",
            propertyType: "Retail",
            starRating: 3,
            market: "Washington, DC",
            submarket: "Fairfax City",
            locationType: "Suburban",
            tenantRepresentative: "KLNB",
        },
        {
            id: "17",
            address: "8941 Greenback Ln",
            city: "Orangevale",
            state: "CA",
            country: "United States",
            tenantName: "Walmart",
            sfLeased: "98,000",
            floor: "1",
            spaceUse: "Retail",
            expiration: "Jan 2027",
            timeRemaining: "1 Year ",
            occupancyType: "Leased",
            siteType: "Retail Store/Branch",
            buildingName: "Wal-Mart Supercenter",
            propertyType: "Retail",
            starRating: 3,
            market: "Sacramento, CA",
            submarket: "Orangevale/Citrus Hts",
            locationType: "Suburban",
            tenantRepresentative: "",
        },
        {
            id: "18",
            address: "50555-50739 Valley Plaza Dr",
            city: "Saint Clairsville",
            state: "OH",
            country: "United States",
            tenantName: "Walmart",
            sfLeased: "200,659",
            floor: "1",
            spaceUse: "Retail",
            expiration: "Jan 2027",
            timeRemaining: "1 Year ",
            occupancyType: "Leased",
            siteType: "Retail Store/Branch",
            buildingName: "",
            propertyType: "Retail",
            starRating: 3,
            market: "Wheeling, WV",
            submarket: "Ohio South Area",
            locationType: "",
            tenantRepresentative: "",
        },
        {
            id: "19",
            address: "130 Black Horse Pike",
            city: "Mount Ephraim",
            state: "NJ",
            country: "United States",
            tenantName: "Walmart",
            sfLeased: "142,413",
            floor: "1",
            spaceUse: "Retail",
            expiration: "Jan 2027",
            timeRemaining: "1 Year ",
            occupancyType: "Leased",
            siteType: "Retail Store/Branch",
            buildingName: "Building 100",
            propertyType: "Retail",
            starRating: 3,
            market: "Philadelphia, PA",
            submarket: "North Camden County",
            locationType: "Urban",
            tenantRepresentative: "",
        },
        {
            id: "20",
            address: "67 Newtown Rd",
            city: "Danbury",
            state: "CT",
            country: "United States",
            tenantName: "Walmart",
            sfLeased: "105,255",
            floor: "1",
            spaceUse: "Retail",
            expiration: "Jan 2027",
            timeRemaining: "1 Year ",
            occupancyType: "Leased",
            siteType: "Retail Store/Branch",
            buildingName: "Walmart",
            propertyType: "Retail",
            starRating: 3,
            market: "Stamford, CT",
            submarket: "Danbury",
            locationType: "Suburban",
            tenantRepresentative: "",
        },
    ];

    const columns: ResizableColumn[] = [
        {
            key: "address",
            label: "Address",
            defaultWidth: 260,
            render: (row: LeaseExpiration) => (
                <Link
                    href="#"
                    className="text-blue-600 hover:text-blue-800 hover:underline block truncate"
                    title={row.address}
                >
                    {row.address}
                </Link>
            ),
        },
        {
            key: "city",
            label: "City",
            defaultWidth: 150,
            render: (row: LeaseExpiration) => (
                <span className="block truncate" title={row.city}>
                    {row.city}
                </span>
            ),
        },
        {
            key: "state",
            label: "State",
            defaultWidth: 110,
            render: (row: LeaseExpiration) => (
                <span className="block truncate" title={row.state}>
                    {row.state}
                </span>
            ),
        },
        {
            key: "country",
            label: "Country",
            defaultWidth: 150,
            render: (row: LeaseExpiration) => (
                <span className="block truncate" title={row.country}>
                    {row.country}
                </span>
            ),
        },
        {
            key: "tenantName",
            label: "Tenant Name",
            defaultWidth: 250,
            render: (row: LeaseExpiration) => (
                <span className="block truncate" title={row.tenantName}>
                    {row.tenantName}
                </span>
            ),
        },
        {
            key: "sfLeased",
            label: "SF Leased",
            align: "right",
            defaultWidth: 150,
            render: (row: LeaseExpiration) => (
                <span className="block truncate" title={row.sfLeased}>
                    {row.sfLeased}
                </span>
            ),
        },
        {
            key: "floor",
            label: "Floor",
            defaultWidth: 125,
            render: (row: LeaseExpiration) => (
                <span className="block truncate" title={row.floor}>
                    {row.floor}
                </span>
            ),
        },
        {
            key: "spaceUse",
            label: "Space Use",
            defaultWidth: 150,
            render: (row: LeaseExpiration) => (
                <span className="block truncate" title={row.spaceUse}>
                    {row.spaceUse}
                </span>
            ),
        },
        {
            key: "expiration",
            label: "Expiration",
            defaultWidth: 150,
            render: (row: LeaseExpiration) => (
                <div className="flex items-center gap-1">
                    <span className="block truncate" title={row.expiration}>
                        {row.expiration}
                    </span>
                    <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 shrink-0 text-blue-600"
                    >
                        <path d="M12 4.5V19.5M12 4.5L18 10M12 4.5L6 10" />
                    </svg>
                </div>
            ),
        },
        {
            key: "timeRemaining",
            label: "Time Remaining",
            defaultWidth: 160,
            render: (row: LeaseExpiration) => (
                <div className="flex items-center gap-1">
                    <span
                        className="block truncate"
                        title={row.timeRemaining || ""}
                    >
                        {row.timeRemaining || "—"}
                    </span>
                    <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 shrink-0 text-blue-600"
                    >
                        <path d="M12 4.5V19.5M12 4.5L18 10M12 4.5L6 10" />
                    </svg>
                </div>
            ),
        },
        {
            key: "occupancyType",
            label: "Occupancy Type",
            defaultWidth: 200,
            render: (row: LeaseExpiration) => (
                <span className="block truncate" title={row.occupancyType}>
                    {row.occupancyType}
                </span>
            ),
        },
        {
            key: "siteType",
            label: "Site Type",
            defaultWidth: 150,
            render: (row: LeaseExpiration) => (
                <span className="block truncate" title={row.siteType}>
                    {row.siteType}
                </span>
            ),
        },
        {
            key: "buildingName",
            label: "Building Name",
            defaultWidth: 340,
            render: (row: LeaseExpiration) => (
                <span className="block truncate" title={row.buildingName}>
                    {row.buildingName || "—"}
                </span>
            ),
        },
        {
            key: "propertyType",
            label: "Property Type",
            defaultWidth: 170,
            render: (row: LeaseExpiration) => (
                <span className="block truncate" title={row.propertyType}>
                    {row.propertyType}
                </span>
            ),
        },
        {
            key: "starRating",
            label: "Star Rating",
            defaultWidth: 150,
            render: (row: LeaseExpiration) => (
                <StarRating rating={row.starRating} />
            ),
        },
        {
            key: "market",
            label: "Market",
            defaultWidth: 200,
            render: (row: LeaseExpiration) => (
                <span className="block truncate" title={row.market}>
                    {row.market || "—"}
                </span>
            ),
        },
        {
            key: "submarket",
            label: "Submarket",
            defaultWidth: 200,
            render: (row: LeaseExpiration) => (
                <span className="block truncate" title={row.submarket}>
                    {row.submarket || "—"}
                </span>
            ),
        },
        {
            key: "locationType",
            label: "Location Type",
            defaultWidth: 200,
            render: (row: LeaseExpiration) => (
                <span className="block truncate" title={row.locationType}>
                    {row.locationType || "—"}
                </span>
            ),
        },
        {
            key: "tenantRepresentative",
            label: "Tenant Representative",
            defaultWidth: 250,
            render: (row: LeaseExpiration) => (
                <span
                    className="block truncate"
                    title={row.tenantRepresentative}
                >
                    {row.tenantRepresentative || "—"}
                </span>
            ),
        },
    ];

    return (
        <AppLayout>
            <Head title={`${company.tenant_name} - Lease Expirations`} />
            <CompanyDetailsLayout
                title={`${company.tenant_name} - Lease Expirations`}
                tabs={tabs}
                currentIndex={currentIndex}
                totalCount={totalCount}
                previousCompanyId={previousCompanyId}
                nextCompanyId={nextCompanyId}
                basePath="/contacts/tenants"
                headerComponent={<CompanyDetailsHeader company={company} />}
            >
                {/* Filter Bar */}
                <LeaseExpirationsFilterBar
                    addressSearch={addressSearch}
                    onAddressSearchChange={setAddressSearch}
                    minSizeLeased={minSizeLeased}
                    maxSizeLeased={maxSizeLeased}
                    onSizeLeasedChange={(min, max) => {
                        setMinSizeLeased(min);
                        setMaxSizeLeased(max);
                    }}
                    spaceUse={spaceUse}
                    onSpaceUseChange={setSpaceUse}
                    expiresWithinLast={expiresWithinLast}
                    onExpiresWithinLastChange={setExpiresWithinLast}
                    expiresAfterStartDate={expiresAfterStartDate}
                    onExpiresAfterStartDateChange={setExpiresAfterStartDate}
                    expiresAfterEndDate={expiresAfterEndDate}
                    onExpiresAfterEndDateChange={setExpiresAfterEndDate}
                    tenantName={tenantName}
                    onTenantNameChange={setTenantName}
                    expirationCount={leaseExpirations.length}
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
                            data={leaseExpirations}
                            storageKey="tenant-lease-expirations-table"
                            rowKey={(row) => row.id}
                        />
                    </div>
                </div>
            </CompanyDetailsLayout>
        </AppLayout>
    );
}
