import {
    ResizableColumn,
    default as ResizableTable,
} from "@/Components/ResizableTable/ResizableTable";
import { Star } from "lucide-react";

export interface Transaction {
    id: number;
    address: string;
    city: string;
    state: string;
    country: string;
    spaceUse: string;
    sfLeased: number | null;
    floor: string;
    costarRating: number;
    leaseType: string;
    signDate: string | null;
    commencement: string | null;
    expiration: string | null;
    term: string | null;
    dealType: string;
    tenant: string | null;
    landlordCompany: string | null;
    leasingCompany: string | null;
    tenantRepCompany: string | null;
    buildingName: string | null;
    market: string | null;
    submarket: string | null;
    postalCode: string | null;
    rentPerSF: number | null;
    services: string | null;
}

interface OwnerTransactionsTableProps {
    transactions: Transaction[];
}

// Star rating display component
function StarRatingDisplay({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`h-4 w-4 ${
                        star <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                    }`}
                />
            ))}
        </div>
    );
}

export default function OwnerTransactionsTable({
    transactions,
}: OwnerTransactionsTableProps) {
    const formatSF = (sf: number | null | undefined): string => {
        if (sf === null || sf === undefined) return "—";
        return sf.toLocaleString();
    };

    const formatCurrency = (value: number | null | undefined): string => {
        if (value === null || value === undefined) return "—";
        return `$${value.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;
    };

    const columns: ResizableColumn[] = [
        {
            key: "address",
            label: "Address",
            defaultWidth: 300,
            render: (row: Transaction) => (
                <span className="block truncate text-gray-900 font-medium">
                    {row.address}
                </span>
            ),
        },
        {
            key: "city",
            label: "City",
            defaultWidth: 150,
            render: (row: Transaction) => (
                <span className="block truncate text-gray-500">{row.city}</span>
            ),
        },
        {
            key: "state",
            label: "State",
            defaultWidth: 140,
            render: (row: Transaction) => (
                <span className="block truncate text-gray-500">
                    {row.state}
                </span>
            ),
        },
        {
            key: "country",
            label: "Country",
            defaultWidth: 220,
            render: (row: Transaction) => (
                <span className="block truncate text-gray-500">
                    {row.country}
                </span>
            ),
        },
        {
            key: "spaceUse",
            label: "Space Use",
            defaultWidth: 140,
            render: (row: Transaction) => (
                <span className="block truncate text-gray-500">
                    {row.spaceUse}
                </span>
            ),
        },
        {
            key: "sfLeased",
            label: "SF Leased",
            align: "right",
            defaultWidth: 140,
            render: (row: Transaction) => (
                <span className="block truncate text-gray-500">
                    {formatSF(row.sfLeased)}
                </span>
            ),
        },
        {
            key: "floor",
            label: "Floor",
            defaultWidth: 140,
            render: (row: Transaction) => (
                <span className="block truncate text-gray-500">
                    {row.floor}
                </span>
            ),
        },
        {
            key: "costarRating",
            label: "CoStar Rating",
            defaultWidth: 165,
            render: (row: Transaction) => (
                <StarRatingDisplay rating={row.costarRating} />
            ),
        },
        {
            key: "leaseType",
            label: "Lease Type",
            defaultWidth: 140,
            render: (row: Transaction) => (
                <span className="block truncate text-gray-500">
                    {row.leaseType}
                </span>
            ),
        },
        {
            key: "signDate",
            label: "Sign Date",
            defaultWidth: 165,
            render: (row: Transaction) => (
                <span className="block truncate text-gray-500">
                    {row.signDate || "—"}
                </span>
            ),
        },
        {
            key: "commencement",
            label: "Commencement",
            defaultWidth: 220,
            render: (row: Transaction) => (
                <span className="block truncate text-gray-500">
                    {row.commencement || "—"}
                </span>
            ),
        },
        {
            key: "expiration",
            label: "Expiration",
            defaultWidth: 220,
            render: (row: Transaction) => (
                <span className="block truncate text-gray-500">
                    {row.expiration || "—"}
                </span>
            ),
        },
        {
            key: "term",
            label: "Term",
            align: "right",
            defaultWidth: 140,
            render: (row: Transaction) => (
                <span className="block truncate text-gray-500">
                    {row.term || "—"}
                </span>
            ),
        },
        {
            key: "dealType",
            label: "Deal Type",
            defaultWidth: 140,
            render: (row: Transaction) => (
                <span className="block truncate text-gray-500">
                    {row.dealType}
                </span>
            ),
        },
        {
            key: "tenant",
            label: "Tenant",
            defaultWidth: 260,
            render: (row: Transaction) => (
                <span className="block truncate text-gray-500">
                    {row.tenant || "—"}
                </span>
            ),
        },
        {
            key: "landlordCompany",
            label: "Landlord Company",
            defaultWidth: 260,
            render: (row: Transaction) => (
                <span className="block truncate text-gray-500">
                    {row.landlordCompany || "—"}
                </span>
            ),
        },
        {
            key: "leasingCompany",
            label: "Leasing Company",
            defaultWidth: 260,
            render: (row: Transaction) => (
                <span className="block truncate text-gray-500">
                    {row.leasingCompany || "—"}
                </span>
            ),
        },
        {
            key: "tenantRepCompany",
            label: "Tenant Rep Company",
            defaultWidth: 260,
            render: (row: Transaction) => (
                <span className="block truncate text-gray-500">
                    {row.tenantRepCompany || "—"}
                </span>
            ),
        },
        {
            key: "buildingName",
            label: "Building Name",
            defaultWidth: 180,
            render: (row: Transaction) => (
                <span className="block truncate text-gray-500">
                    {row.buildingName || "—"}
                </span>
            ),
        },
        {
            key: "market",
            label: "Market",
            defaultWidth: 220,
            render: (row: Transaction) => (
                <span className="block truncate text-gray-500">
                    {row.market || "—"}
                </span>
            ),
        },
        {
            key: "submarket",
            label: "Submarket",
            defaultWidth: 220,
            render: (row: Transaction) => (
                <span className="block truncate text-gray-500">
                    {row.submarket || "—"}
                </span>
            ),
        },
        {
            key: "postalCode",
            label: "Postal Code",
            defaultWidth: 140,
            render: (row: Transaction) => (
                <span className="block truncate text-gray-500">
                    {row.postalCode || "—"}
                </span>
            ),
        },
        {
            key: "rentPerSF",
            label: "Rent/SF",
            defaultWidth: 140,
            render: (row: Transaction) => (
                <span className="block truncate text-gray-500">
                    {formatCurrency(row.rentPerSF)}
                </span>
            ),
        },
        {
            key: "services",
            label: "Services",
            defaultWidth: 165,
            render: (row: Transaction) => (
                <span className="block truncate text-gray-500">
                    {row.services || "—"}
                </span>
            ),
        },
    ];

    return (
        <div className="h-full">
            <ResizableTable
                columns={columns}
                data={transactions}
                storageKey="owner-transactions-columns"
                rowKey={(row) => row.id}
            />
        </div>
    );
}
