import { useState } from "react";
import ResizableTable, {
    ResizableColumn,
} from "@/Components/ResizableTable/ResizableTable";
import ContactsFilterBar from "@/Components/Tenant/ContactsFilterBar";
import BrokerContactCard, {
    Contact,
} from "@/Components/Broker/BrokerContactCard";

// Static contact data matching the provided Gallery View screenshot
const contacts: Contact[] = [
    {
        id: 1,
        name: "Issa Abbassi",
        title: "Director",
        companyName: "Newmark",
        address: "125 Park Ave\nNew York, NY 10017\nUnited States",
        phone: "(212) 372-2221",
        email: "iabbassi@ngkf.com",
        website: "nmrk.com",
        linkedIn: "https://www.linkedin.com/in/issa-abbassi-8b1b1b1b/",
        roles: ["Investment Broker"],
        avatarUrl:
            "https://ahprd1cdn.csgpimgs.com/i2/a_a1w3F9Edvf8fqE0EXo_Cm1B89Abev9ualo3ulwVAY/110/contact.jpg",
    },
    {
        id: 2,
        name: "Harrison Abramowitz",
        title: "Managing Director",
        companyName: "Newmark",
        address: "125 Park Ave\nNew York, NY 10017\nUnited States",
        phone: "(212) 372-2467",
        email: "harrison.abramowitz@nmrk.com",
        website: "nmrk.com",
        linkedIn: "#",
        roles: ["Landlord Representation", "+1"],
        avatarUrl:
            "https://ahprd1cdn.csgpimgs.com/i2/TST1sZM5UD1Xphiv1IdEkW8-M5VS1r7eYcf9UxmmdtA/110/contact.jpg",
    },
    {
        id: 3,
        name: "Olivia Alanis",
        title: "Property Manager",
        companyName: "Newmark",
        address: "125 Park Ave\nNew York, NY 10017\nUnited States",
        phone: "(212) 829-4775",
        email: "olivia.alanis@nmrk.com",
        website: "nmrk.com",
        roles: ["Property Management"],
    },
    {
        id: 4,
        name: "Gary Alterman",
        title: "Executive Managing Director",
        companyName: "Newmark",
        address: "125 Park Ave\nNew York, NY 10017\nUnited States",
        phone: "(212) 916-3367",
        email: "Gary.Alterman@nmrk.com",
        website: "nmrk.com",
        linkedIn: "#",
        roles: ["Landlord Representation", "+1"],
        avatarUrl:
            "https://ahprd1cdn.csgpimgs.com/i2/Za5S2QOEOypa-FG4JxYqhrI03umINieUlYf9HCpM1O4/110/contact.jpg",
    },
    {
        id: 5,
        name: "Roger Anscher",
        title: "Chief Administrative Officer",
        companyName: "Newmark",
        address: "125 Park Ave\nNew York, NY 10017\nUnited States",
        phone: "(212) 372-2128",
        email: "roger.anscher@nmrk.com",
        website: "nmrk.com",
        linkedIn: "#",
        avatarUrl:
            "https://ahprd1cdn.csgpimgs.com/i2/aIFt_ytUOuKyx5RTyn7BvjQZGYfpLq5HRh-dqaaaKTo/110/contact.jpg",
    },
    {
        id: 6,
        name: "Neal Armstrong",
        title: "Head of Fund Administration",
        companyName: "Newmark",
        address: "125 Park Ave\nNew York, NY 10017\nUnited States",
        phone: "(708) 528-2061",
        email: "neal.armstrong@nmrk.com",
        website: "nmrk.com",
        linkedIn: "#",
        avatarUrl:
            "https://ahprd1cdn.csgpimgs.com/i2/fCOldx4E37UXY_wuoTtCJtfKMwO13CsETZMSac2zUwc/110/contact.jpg",
    },
    {
        id: 7,
        name: "Matthew Augarten",
        title: "Associate Director",
        companyName: "Newmark",
        address: "125 Park Ave\nNew York, NY 10017\nUnited States",
        phone: "(212) 372-2051",
        email: "matthew.augarten@nmrk.com",
        website: "nmrk.com",
        linkedIn: "#",
        roles: ["Landlord Representation", "+1"],
        avatarUrl:
            "https://ahprd1cdn.csgpimgs.com/i2/YhN8X-R4krL6GUfhwzLMayY1aenONtsIRmzcrhDBLXA/110/contact.jpg",
    },
    {
        id: 8,
        name: "David Behin",
        title: "Executive Managing Director",
        companyName: "Newmark",
        address: "125 Park Ave\nNew York, NY 10017\nUnited States",
        phone: "(212) 372-2128",
        email: "david.behin@nmrk.com",
        website: "nmrk.com",
        linkedIn: "#",
        avatarUrl:
            "https://ahprd1cdn.csgpimgs.com/i2/dNig2UrZeqxs3PfEodmoqA1EaOtrd8Ezc_ZNze4ylJ4/110/contact.jpg",
    },
    {
        id: 9,
        name: "Karen Bellantoni",
        title: "Vice Chairman",
        companyName: "Newmark",
        address: "125 Park Ave\nNew York, NY 10017\nUnited States",
        phone: "(212) 372-2128",
        website: "nmrk.com",
        linkedIn: "#",
        avatarUrl:
            "https://ahprd1cdn.csgpimgs.com/i2/b6Qt0gz_E7LII58Z_xCkn8EJlahVBFjSWHOKxp8FA6w/110/contact.jpg",
    },
];

export default function BrokerContacts() {
    const [contactName, setContactName] = useState("");
    const [title, setTitle] = useState("");
    const [sortBy, setSortBy] = useState<string>("name");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
    const [viewMode, setViewMode] = useState<"list" | "gallery">("list");

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
                                        <path
                                            fill="#FCFDFD"
                                            d="M0 0h160v160H0z"
                                        />
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
            key: "contactInfo",
            label: "Contact Info",
            defaultWidth: 180,
            render: (row: Contact) => (
                <div className="flex gap-1">
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
            key: "phone",
            label: "Phone Number",
            align: "right",
            defaultWidth: 220,
            render: (row: Contact) => (
                <span className="block truncate text-right" title={row.phone}>
                    {row.phone || "—"}
                </span>
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
    ];

    return (
        <div>
            {/* Filter Bar */}
            <ContactsFilterBar
                contactName={contactName}
                onContactNameChange={setContactName}
                title={title}
                onTitleChange={setTitle}
                contactCount={contacts.length}
                sortBy={sortBy}
                sortDir={sortDir}
                onSortChange={(by, dir) => {
                    setSortBy(by);
                    setSortDir(dir);
                }}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
            />

            {/* Content */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-6">
                <div className="h-[calc(100vh-400px)] min-h-[600px]">
                    {viewMode === "list" ? (
                        <ResizableTable
                            columns={columns}
                            data={contacts}
                            storageKey="broker-contacts-table"
                            rowKey={(row) => row.id}
                        />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 p-6 overflow-y-auto h-full bg-gray-50">
                            {contacts.map((contact) => (
                                <div key={contact.id} className="h-full">
                                    <BrokerContactCard contact={contact} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
