import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import AppLayout from "../../../Layouts/AppLayout";
import CompanyDetailsHeader from "../../../../Components/Owner/CompanyDetailsHeader";
import ResizableTable, {
    ResizableColumn,
} from "../../../../Components/ResizableTable/ResizableTable";
import ContactsFilterBar from "../../../../Components/Tenant/ContactsFilterBar";

interface OwnerCompany {
    id: number;
    company: string;
    owner_type?: string;
}

interface Contact {
    id: string;
    name: string;
    avatarUrl?: string;
    company: string;
    title: string;
    role: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    country: string;
}

interface PageProps {
    company: OwnerCompany;
}

export default function Contacts({ company }: PageProps) {
    const [contactName, setContactName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [addressSearch, setAddressSearch] = useState("");
    const [title, setTitle] = useState("");
    const [role, setRole] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<string>("name");
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

    // Static contact data based on provided HTML
    const contacts: Contact[] = [
        {
            id: "1",
            name: "Carole Baker",
            avatarUrl:
                "https://ahprd1cdn.csgpimgs.com/i2/a_a1w3F9Edvf8fqE0EXo_Cm1B89Abev9ualo3ulwVAY/110/contact.jpg",
            company: "Walmart Inc.",
            title: "Senior Director of Realty Operations",
            role: "Decision Maker - Leasing",
            phone: "(479) 273-4000",
            email: "cbaker@walmart.com",
            address: "702 SW 8th St",
            city: "Bentonville",
            state: "AR",
            country: "United States",
        },
        {
            id: "2",
            name: "Dan Bartlett",
            avatarUrl:
                "https://ahprd1cdn.csgpimgs.com/i2/TST1sZM5UD1Xphiv1IdEkW8-M5VS1r7eYcf9UxmmdtA/110/contact.jpg",
            company: "Walmart Inc.",
            title: "Executive Vice President, Corporate Affairs",
            role: "Decision Maker - Leasing",
            phone: "(479) 273-4000",
            email: "dbartlett@walmart.com",
            address: "702 SW 8th St",
            city: "Bentonville",
            state: "AR",
            country: "United States",
        },
        {
            id: "3",
            name: "Daniel Ekstrand",
            avatarUrl:
                "https://ahprd1cdn.csgpimgs.com/i2/MYZHWNj-Pg6uKPgIX9VDDrDZ5VlUEUEG1OXnyO6L5Ng/110/contact.jpg",
            company: "Sam's Club",
            title: "Finance, Operations & Real Estate- Sam's Club",
            role: "Decision Maker - Leasing",
            phone: "(888) 746-7726",
            email: "daniel.ekstrand@samsclub.com",
            address: "2101 SE 25th St",
            city: "Bentonville",
            state: "AR",
            country: "United States",
        },
        {
            id: "4",
            name: "Brian Hooper",
            avatarUrl:
                "https://ahprd1cdn.csgpimgs.com/i2/Za5S2QOEOypa-FG4JxYqhrI03umINieUlYf9HCpM1O4/110/contact.jpg",
            company: "Walmart Inc.",
            title: "VP Real Estate Development, Leasing & Management",
            role: "Decision Maker - Leasing",
            phone: "(479) 273-4000",
            email: "bhooper@walmart.com",
            address: "702 SW 8th St",
            city: "Bentonville",
            state: "AR",
            country: "United States",
        },
        {
            id: "5",
            name: "Jessica Howell",
            avatarUrl:
                "https://ahprd1cdn.csgpimgs.com/i2/aIFt_ytUOuKyx5RTyn7BvjQZGYfpLq5HRh-dqaaaKTo/110/contact.jpg",
            company: "Walmart Inc.",
            title: "Senior Director, Real Estate",
            role: "Decision Maker - Leasing",
            phone: "(479) 273-4000",
            email: "jessica.howell@wal-mart.com",
            address: "702 SW 8th St",
            city: "Bentonville",
            state: "AR",
            country: "United States",
        },
        {
            id: "6",
            name: "Jeremy Nash",
            avatarUrl:
                "https://ahprd1cdn.csgpimgs.com/i2/fCOldx4E37UXY_wuoTtCJtfKMwO13CsETZMSac2zUwc/110/contact.jpg",
            company: "Sam's Club",
            title: "Real Estate Strategy & Operations- Sam's Club",
            role: "Decision Maker - Leasing",
            phone: "(888) 746-7726",
            email: "jeremy.nash@samsclub.com",
            address: "2101 SE 25th St",
            city: "Bentonville",
            state: "AR",
            country: "United States",
        },
        {
            id: "7",
            name: "Mark Stephens",
            company: "Walmart",
            title: "Senior Leasing Manager, New Business Development",
            role: "Decision Maker - Leasing",
            phone: "(479) 277-8869",
            email: "mark.stephens@walmart.com",
            address: "2001 SE 10th St",
            city: "Bentonville",
            state: "AR",
            country: "United States",
        },
        {
            id: "8",
            name: "Jessica Straub",
            avatarUrl:
                "https://ahprd1cdn.csgpimgs.com/i2/YhN8X-R4krL6GUfhwzLMayY1aenONtsIRmzcrhDBLXA/110/contact.jpg",
            company: "Sam's Club",
            title: "Senior Director, Real Estate - Sam's Club",
            role: "Decision Maker - Leasing",
            phone: "(888) 746-7726",
            email: "jessica.straub@samsclub.com",
            address: "2101 SE 25th St",
            city: "Bentonville",
            state: "AR",
            country: "United States",
        },
        {
            id: "9",
            name: "Mike Thomas",
            avatarUrl:
                "https://ahprd1cdn.csgpimgs.com/i2/dNig2UrZeqxs3PfEodmoqA1EaOtrd8Ezc_ZNze4ylJ4/110/contact.jpg",
            company: "Walmart Inc.",
            title: "Senior Director, Realty Operations",
            role: "Decision Maker - Leasing",
            phone: "(479) 273-4000",
            email: "cormorant29@gmail.com",
            address: "702 SW 8th St",
            city: "Bentonville",
            state: "AR",
            country: "United States",
        },
        {
            id: "10",
            name: "Tom Wait",
            avatarUrl:
                "https://ahprd1cdn.csgpimgs.com/i2/b6Qt0gz_E7LII58Z_xCkn8EJlahVBFjSWHOKxp8FA6w/110/contact.jpg",
            company: "Sam's Club",
            title: "SVP, Strategy & Real Estate Operations- Sam's Club",
            role: "Decision Maker - Leasing",
            phone: "(888) 746-7726",
            email: "",
            address: "2101 SE 25th St",
            city: "Bentonville",
            state: "AR",
            country: "United States",
        },
        {
            id: "11",
            name: "Ronald Belnap",
            company: "Walmart Inc.",
            title: "Director Real Estate",
            role: "Decision Maker - Leasing, Decision Maker - Acquisitions",
            phone: "(479) 273-4000",
            email: "ron.belnap@wal-mart.com",
            address: "702 SW 8th St",
            city: "Bentonville",
            state: "AR",
            country: "United States",
        },
        {
            id: "12",
            name: "Elizabeth Johnson",
            avatarUrl:
                "https://ahprd1cdn.csgpimgs.com/i2/8cLu6sM65L56ZIqaZq1KFTV2ptqj74rtv_0fKppSN1M/110/contact.jpg",
            company: "Sam's Club",
            title: "Senior Portfolio Manager - New Site Selection",
            role: "Decision Maker - Leasing, Decision Influencer - Leasing",
            phone: "(888) 746-7726",
            email: "elizabeth.johnson@samsclub.com",
            address: "2101 SE 25th St",
            city: "Bentonville",
            state: "AR",
            country: "United States",
        },
        {
            id: "13",
            name: "Joel Benninghoff",
            avatarUrl:
                "https://ahprd1cdn.csgpimgs.com/i2/OEDJHJtLBchVvbUL2d-gXeCHJka2WNSPXqOyuj-YUls/110/contact.jpg",
            company: "Walmart Inc.",
            title: "Director, Real Estate Systems & Strategy",
            role: "Decision Influencer - Leasing",
            phone: "(479) 277-1691",
            email: "joel.benninghoff@walmart.com",
            address: "702 SW 8th St",
            city: "Bentonville",
            state: "AR",
            country: "United States",
        },
        {
            id: "14",
            name: "Tristan Ritter",
            company: "Walmart Inc.",
            title: "Sr. Industrial Real Estate",
            role: "Decision Influencer - Leasing",
            phone: "(479) 273-4000",
            email: "tritter@walmart.com",
            address: "702 SW 8th St",
            city: "Bentonville",
            state: "AR",
            country: "United States",
        },
        {
            id: "15",
            name: "Dave Rowetto",
            company: "Walmart",
            title: "Senior Real Estate Manager",
            role: "Decision Influencer - Leasing",
            phone: "",
            email: "",
            address: "702 SW 8th St",
            city: "Bentonville",
            state: "AR",
            country: "United States",
        },
        {
            id: "16",
            name: "Andrew Shelor",
            avatarUrl:
                "https://ahprd1cdn.csgpimgs.com/i2/zHZEQ24wy5rr9H9m4mfz9m4I2FJCzKF4EaCghum7dJI/110/contact.jpg",
            company: "Walmart Inc.",
            title: "Director, Corporate and Office Retail",
            role: "Decision Maker - Leasing",
            phone: "(479) 204-5362",
            email: "ashelor@walmart.com",
            address: "702 SW 8th St",
            city: "Bentonville",
            state: "AR",
            country: "United States",
        },
    ];

    const columns: ResizableColumn[] = [
        {
            key: "name",
            label: "Name",
            defaultWidth: 250,
            render: (row: Contact) => (
                <div className="flex items-center gap-4">
                    <div className="relative w-12 h-14 min-w-12 max-h-14 bg-gray-100 border border-gray-300 rounded overflow-hidden shrink-0">
                        {row.avatarUrl ? (
                            <img
                                src={row.avatarUrl}
                                alt={row.name}
                                className="absolute left-0 top-0 h-auto min-h-full w-full max-w-full object-cover"
                            />
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 160 100"
                                className="h-auto min-h-full w-full max-w-full origin-bottom scale-[1.2] bg-gray-100"
                            >
                                <path fill="#E5E7E9" d="M0 0h160v160H0z" />
                                <g clipPath="url(#a)">
                                    <path fill="#F2F3F4" d="M0 0h160v160H0z" />
                                    <path
                                        d="M81.23 76.615c18.382 0 33.232-14.932 33.232-33.23 0-18.298-14.85-33.231-33.231-33.231S48 24.982 48 43.384c0 18.404 14.85 33.231 33.23 33.231ZM80 82.462c-43.505 0-78.77 34.713-78.77 77.538H158.77c0-42.825-35.264-77.538-78.769-77.538Z"
                                        fill="#E5E7E9"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="a">
                                        <path fill="#FCFDFD" d="M0 0h160v160H0z" />
                                    </clipPath>
                                </defs>
                            </svg>
                        )}
                    </div>
                    <span className="font-medium text-gray-900 block truncate">
                        {row.name}
                    </span>
                </div>
            ),
        },
        {
            key: "company",
            label: "Company",
            defaultWidth: 250,
            render: (row: Contact) => (
                <span className="block truncate" title={row.company}>
                    {row.company}
                </span>
            ),
        },
        {
            key: "title",
            label: "Title",
            defaultWidth: 250,
            render: (row: Contact) => (
                <span className="block truncate" title={row.title}>
                    {row.title}
                </span>
            ),
        },
        {
            key: "role",
            label: "Role",
            defaultWidth: 250,
            render: (row: Contact) => (
                <div className="flex items-center gap-1">
                    <span className="block truncate" title={row.role}>
                        {row.role}
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
            key: "phone",
            label: "Phone",
            align: "right",
            defaultWidth: 220,
            render: (row: Contact) => (
                <span className="block truncate text-right" title={row.phone}>
                    {row.phone || "—"}
                </span>
            ),
        },
        {
            key: "contactInfo",
            label: "Contact Info",
            defaultWidth: 180,
            render: (row: Contact) => (
                <div className="flex flex-col gap-1">
                    {row.email && (
                        <a
                            href={`mailto:${row.email}`}
                            className="flex items-center gap-1 text-gray-600 hover:text-gray-800 transition-colors"
                            title={row.email}
                        >
                            <svg
                                viewBox="0 -960 960 960"
                                className="h-6 w-6 shrink-0"
                                fill="currentColor"
                            >
                                <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
                            </svg>
                        </a>
                    )}
                    <a
                        href="#"
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                        title="vCard"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="h-5 w-5 shrink-0"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M22 3H2C0.9 3 0 3.9 0 5V19C0 20.1 0.9 21 2 21H22C23.1 21 23.99 20.1 23.99 19L24 5C24 3.9 23.1 3 22 3ZM22 19H2V5H22V19ZM21 6H14V11H21V6ZM20 8L17.5 9.75L15 8V7L17.5 8.75L20 7V8ZM9 12C10.65 12 12 10.65 12 9C12 7.35 10.65 6 9 6C7.35 6 6 7.35 6 9C6 10.65 7.35 12 9 12ZM9 8C9.55 8 10 8.45 10 9C10 9.55 9.55 10 9 10C8.45 10 8 9.55 8 9C8 8.45 8.45 8 9 8ZM15 16.59C15 14.09 11.03 13.01 9 13.01C6.97 13.01 3 14.09 3 16.59V18H15V16.59ZM5.48 16C6.22 15.5 7.7 15 9 15C10.3 15 11.77 15.49 12.52 16H5.48Z"
                            />
                        </svg>
                    </a>
                </div>
            ),
        },
        {
            key: "address",
            label: "Address",
            defaultWidth: 300,
            render: (row: Contact) => (
                <span className="block truncate" title={row.address}>
                    {row.address}
                </span>
            ),
        },
        {
            key: "city",
            label: "City",
            defaultWidth: 140,
            render: (row: Contact) => (
                <span className="block truncate" title={row.city}>
                    {row.city}
                </span>
            ),
        },
        {
            key: "state",
            label: "State",
            defaultWidth: 140,
            render: (row: Contact) => (
                <span className="block truncate" title={row.state}>
                    {row.state}
                </span>
            ),
        },
        {
            key: "country",
            label: "Country",
            defaultWidth: 140,
            render: (row: Contact) => (
                <span className="block truncate" title={row.country}>
                    {row.country}
                </span>
            ),
        },
    ];

    return (
        <AppLayout>
            <Head title={`${company.company} - Contacts`} />

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
                                            tab.id === "contacts"
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
                        <ContactsFilterBar
                            contactName={contactName}
                            onContactNameChange={setContactName}
                            companyName={companyName}
                            onCompanyNameChange={setCompanyName}
                            addressSearch={addressSearch}
                            onAddressSearchChange={setAddressSearch}
                            title={title}
                            onTitleChange={setTitle}
                            role={role}
                            onRoleChange={setRole}
                            contactCount={contacts.length}
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
                                    data={contacts}
                                    storageKey="owner-contacts-table"
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

