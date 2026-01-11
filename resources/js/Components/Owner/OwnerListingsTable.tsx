import {
    ResizableColumn,
    default as ResizableTable,
} from "@/Components/ResizableTable/ResizableTable";
import { Star } from "lucide-react";
import { Link } from "@inertiajs/react";

export interface Listing {
    id: number;
    address: string;
    buildingName: string;
    propertyType: string;
    city: string;
    market: string;
    country: string;
    costarRating: number;
    greenRating: string | null;
    class: string;
    status: string;
    rbaGla: number;
    sfAvail: number;
    rentPerSF: string;
    secondaryType: string;
}

interface OwnerListingsTableProps {
    listings: Listing[];
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

// LEED badge component
function LEEDBadge() {
    return (
        <div className="flex items-center justify-center">
            <svg
                width="51"
                height="12"
                viewBox="0 0 77 18"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g fill="none" fillRule="evenodd">
                    <path
                        d="M31.83 1.922c.589 0 .937-.316.937-.949 0-.63-.348-.973-.937-.973h-6.842C24.292 0 24 .288 24 .973v15.61c0 .686.292.975.988.975h6.842c.589 0 .937-.343.937-.974s-.348-.948-.937-.948h-5.878v-5.92h4.17c.587 0 .907-.316.907-.948 0-.633-.32-.975-.908-.975h-4.17V1.922h5.88"
                        fill="#51A846"
                    />
                    <path
                        d="M53.577 11.61h-4.811l.018-.052h-.018l2.405-7.242 2.406 7.242h-.017l.017.053ZM52.241.923C52.025.263 51.812 0 51.171 0c-.642 0-.855.263-1.07.922L45.077 16.32c-.108.34-.235.92.627 1.194.756.243 1.137-.246 1.243-.563l1.125-3.475h6.2l1.124 3.475c.105.317.458.86 1.295.582.778-.256.683-.901.599-1.19L52.241.922Z"
                        fill="#51A846"
                        fillRule="nonzero"
                    />
                    <path
                        d="M69.308 0c-.67 0-.748.314-1.15.973l-4.01 6.766L60.14.973C59.738.314 59.66 0 58.99 0c-.693 0-.99.288-.99.973v15.61c0 .686.297.975.99.975.695 0 .962-.289.962-.974V4.579l3.127 5.188c.242.395.488.817 1.07.817.584 0 .83-.422 1.068-.817l3.128-5.188v12.005c0 .685.267.974.963.974.694 0 .988-.289.988-.974V.974c0-.686-.294-.974-.988-.974M42.835 1.922c.59 0 .937-.316.937-.949 0-.63-.347-.973-.937-.973h-6.847C35.292 0 35 .288 35 .973v15.61c0 .686.292.975.988.975h6.847c.59 0 .937-.343.937-.974s-.347-.948-.937-.948h-5.883v-5.92h4.172c.589 0 .91-.316.91-.948 0-.633-.321-.975-.91-.975h-4.172V1.922h5.883"
                        fill="#51A846"
                    />
                    <path
                        d="M13.954 7.758V1.921h3.678c1.696 0 2.668 1.015 2.668 2.785 0 0 .198 1.268-.662 2.288-.457.543-1.068.764-1.843.764h-3.84Zm4.789 1.864a4.208 4.208 0 0 0 2.38-1.381c1.319-1.5 1.13-3.535 1.13-3.535 0-2.815-1.858-4.706-4.62-4.706 0 0-4.783.007-4.845.02-.55.054-.788.347-.788.961v15.614c0 .686.293.975.988.975.694 0 .963-.289.963-.975V9.69h2.616l4.08 7.328c.335.6.734.714 1.342.384.609-.33.702-.71.367-1.31l-3.613-6.47Z"
                        fill="#51A846"
                        fillRule="nonzero"
                    />
                    <path
                        d="M74.449 4.327c-1.356 0-2.133-1.006-2.133-1.985 0-1.23.958-2.04 2.006-2.04 1.266 0 2.07 1.042 2.07 1.942 0 1.264-.984 2.083-1.943 2.083M74.44 0C73.002 0 72 1.086 72 2.333c0 1.255.939 2.297 2.386 2.297 1.13 0 2.332-.997 2.332-2.36C76.718.99 75.625 0 74.44 0"
                        fill="#51A746"
                        fillRule="nonzero"
                    />
                    <path
                        d="M75.095 2.451h-.77V1.33h.76c.19 0 .434.16.434.551 0 .366-.145.57-.424.57m.75-.57c0-.543-.317-.881-.85-.881h-.832c-.117 0-.163.053-.163.17v2.635c0 .115.046.17.163.17s.162-.055.162-.17V2.78h.516l.624 1.104c.1.17.317.071.317-.063 0-.062-.019-.088-.037-.115l-.524-.935c.36-.036.624-.32.624-.89M6.308 15.587H1.95V9.716h4.522c.774 0 1.377.261 1.842.798.667.77.663 2.288.663 2.288 0 1.77-.973 2.785-2.67 2.785ZM1.95 1.92h3.678c1.696 0 2.669 1.016 2.669 2.785 0 0 .15 1.385-.663 2.288-.475.529-1.068.799-1.842.799H1.95V1.92Zm6.912 6.585c.087-.084.172-.173.256-.265 1.305-1.425 1.13-3.535 1.13-3.535C10.248 1.891 8.392 0 5.628 0H.976A.968.968 0 0 0 0 .96v15.587c0 .531.437.96.976.96h5.332c2.763 0 4.62-1.89 4.62-4.705 0 0 .195-2.09-1.13-3.535-.286-.312-.843-.713-.936-.762Z"
                        fill="#51A846"
                        fillRule="nonzero"
                    />
                </g>
            </svg>
        </div>
    );
}

export default function OwnerListingsTable({
    listings,
}: OwnerListingsTableProps) {
    const formatSF = (sf: number | null | undefined): string => {
        if (sf === null || sf === undefined) return "—";
        return sf.toLocaleString();
    };

    const columns: ResizableColumn[] = [
        {
            key: "address",
            label: "Address",
            defaultWidth: 300,
            render: (row: Listing) => (
                <Link
                    href={`/properties/${row.id}`}
                    className="block truncate font-medium text-gray-900 hover:text-blue-600 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                >
                    {row.address}
                </Link>
            ),
        },
        {
            key: "buildingName",
            label: "Building Name",
            defaultWidth: 250,
            render: (row: Listing) => (
                <span className="block truncate text-gray-500">
                    {row.buildingName || "—"}
                </span>
            ),
        },
        {
            key: "propertyType",
            label: "Property Type",
            defaultWidth: 165,
            render: (row: Listing) => (
                <span className="block truncate text-gray-500">
                    {row.propertyType}
                </span>
            ),
        },
        {
            key: "city",
            label: "City",
            defaultWidth: 150,
            render: (row: Listing) => (
                <span className="block truncate text-gray-500">{row.city}</span>
            ),
        },
        {
            key: "market",
            label: "Market",
            defaultWidth: 220,
            render: (row: Listing) => (
                <span className="block truncate text-gray-500" title={row.market}>
                    {row.market}
                </span>
            ),
        },
        {
            key: "country",
            label: "Country",
            defaultWidth: 230,
            render: (row: Listing) => (
                <span className="block truncate text-gray-500">
                    {row.country}
                </span>
            ),
        },
        {
            key: "costarRating",
            label: "CoStar Rating",
            defaultWidth: 165,
            render: (row: Listing) => (
                <StarRatingDisplay rating={row.costarRating} />
            ),
        },
        {
            key: "greenRating",
            label: "Green Rating",
            align: "center",
            defaultWidth: 120,
            render: (row: Listing) => (
                <div className="flex items-center justify-center">
                    {row.greenRating === "LEED" ? <LEEDBadge /> : <span>—</span>}
                </div>
            ),
        },
        {
            key: "class",
            label: "Class",
            defaultWidth: 165,
            render: (row: Listing) => (
                <span className="block truncate text-gray-500">{row.class}</span>
            ),
        },
        {
            key: "status",
            label: "Status",
            defaultWidth: 140,
            render: (row: Listing) => (
                <span className="block truncate text-gray-500">{row.status}</span>
            ),
        },
        {
            key: "rbaGla",
            label: "RBA/GLA",
            align: "right",
            defaultWidth: 140,
            render: (row: Listing) => (
                <span className="block truncate text-gray-500">
                    {formatSF(row.rbaGla)}
                </span>
            ),
        },
        {
            key: "sfAvail",
            label: "SF Avail",
            align: "right",
            defaultWidth: 140,
            render: (row: Listing) => (
                <span className="block truncate text-gray-500">
                    {formatSF(row.sfAvail)}
                </span>
            ),
        },
        {
            key: "rentPerSF",
            label: "Rent/SF/yr",
            defaultWidth: 170,
            render: (row: Listing) => (
                <span className="block truncate text-gray-500">
                    {row.rentPerSF}
                </span>
            ),
        },
        {
            key: "secondaryType",
            label: "Secondary Type",
            defaultWidth: 180,
            render: (row: Listing) => (
                <span className="block truncate text-gray-500">
                    {row.secondaryType || "—"}
                </span>
            ),
        },
    ];

    return (
        <div className="h-full">
            <ResizableTable
                columns={columns}
                data={listings}
                storageKey="owner-listings-columns"
                rowKey={(row) => row.id}
            />
        </div>
    );
}

