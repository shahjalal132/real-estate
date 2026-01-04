import { Phone, Mail, User, Linkedin } from "lucide-react";

interface Contact {
    id: string;
    name: string;
    jobTitle: string;
    company: string;
    phone: string;
    email: string;
    role: string;
    hasLinkedIn?: boolean;
    imageUrl?: string;
}

interface CompanyContactsProps {
    contacts?: Contact[];
}

function ContactCard({ contact }: { contact: Contact }) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex gap-4">
                {/* Profile Picture */}
                <div className="shrink-0">
                    {contact.imageUrl ? (
                        <img
                            src={contact.imageUrl}
                            alt={contact.name}
                            className="w-16 h-16 rounded-lg object-cover"
                        />
                    ) : (
                        <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
                            <User className="h-8 w-8 text-gray-400" />
                        </div>
                    )}
                </div>

                {/* Contact Info */}
                <div className="flex-1 min-w-0">
                    {/* Name */}
                    <h4 className="text-base font-semibold text-gray-900 mb-1">
                        {contact.name}
                    </h4>

                    {/* Job Title & Company */}
                    <p className="text-sm text-gray-700 mb-2">
                        {contact.jobTitle}, {contact.company}
                    </p>

                    {/* Phone */}
                    <div className="flex items-center gap-2 mb-1">
                        <Phone className="h-3.5 w-3.5 text-gray-500 shrink-0" />
                        <a
                            href={`tel:${contact.phone}`}
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            {contact.phone}
                        </a>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-2 mb-3">
                        <Mail className="h-3.5 w-3.5 text-gray-500 shrink-0" />
                        <a
                            href={`mailto:${contact.email}`}
                            className="text-sm text-gray-600 hover:text-gray-900 truncate"
                        >
                            {contact.email}
                        </a>
                    </div>

                    {/* Role/Function */}
                    <p className="text-xs text-gray-500 mb-2">
                        {contact.role}
                    </p>

                    {/* Icons */}
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        {contact.hasLinkedIn && (
                            <Linkedin className="h-4 w-4 text-gray-400" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CompanyContacts({ contacts }: CompanyContactsProps) {
    // Dummy data matching the screenshot
    const defaultContacts: Contact[] = [
        {
            id: "1",
            name: "Carole Baker",
            jobTitle: "Senior Director of Realty Operations",
            company: "Walmart Inc.",
            phone: "(479) 273-4000",
            email: "cbaker@walmart.com",
            role: "Decision Maker - Leasing",
            hasLinkedIn: true,
            imageUrl: "/assets/images/placeholder.png",
        },
        {
            id: "2",
            name: "Dan Bartlett",
            jobTitle: "Executive Vice President, Corporate Affairs",
            company: "Walmart Inc.",
            phone: "(479) 273-4000",
            email: "dbartlett@walmart.com",
            role: "Decision Maker - Leasing",
            hasLinkedIn: true,
            imageUrl: "/assets/images/placeholder.png",
        },
        {
            id: "3",
            name: "Daniel Ekstrand",
            jobTitle: "Finance, Operations & Real Estate - Sam's Club",
            company: "Sam's Club",
            phone: "(888) 746-7726",
            email: "daniel.ekstrand@samsclub.com",
            role: "Decision Maker - Leasing",
            hasLinkedIn: false,
            imageUrl: "/assets/images/placeholder.png",
        },
        {
            id: "4",
            name: "Brian Hooper",
            jobTitle: "VP Real Estate Development, Leasing & Manage...",
            company: "Walmart Inc.",
            phone: "(479) 273-4000",
            email: "bhooper@walmart.com",
            role: "Decision Maker - Leasing",
            hasLinkedIn: true,
            imageUrl: "/assets/images/placeholder.png",
        },
        {
            id: "5",
            name: "Jessica Howell",
            jobTitle: "Senior Director, Real Estate",
            company: "Walmart Inc.",
            phone: "(479) 273-4000",
            email: "jhowell@walmart.com",
            role: "Decision Maker - Leasing",
            hasLinkedIn: true,
            imageUrl: "/assets/images/placeholder.png",
        },
        {
            id: "6",
            name: "Jeremy Nash",
            jobTitle: "Real Estate Strategy & Operations - Sam's Club",
            company: "Sam's Club",
            phone: "(888) 746-7726",
            email: "jeremy.nash@samsclub.com",
            role: "Decision Maker - Leasing",
            hasLinkedIn: false,
            imageUrl: "/assets/images/placeholder.png",
        },
        {
            id: "7",
            name: "Andrew Shelor",
            jobTitle: "Director, Corporate and Office Retail",
            company: "Walmart Inc.",
            phone: "(479) 273-4000",
            email: "ashelor@walmart.com",
            role: "Decision Maker - Leasing",
            hasLinkedIn: true,
            imageUrl: "/assets/images/placeholder.png",
        },
        {
            id: "8",
            name: "Mark Stephens",
            jobTitle: "Senior Leasing Manager, New Business Develop...",
            company: "Walmart",
            phone: "(479) 273-4000",
            email: "mstephens@walmart.com",
            role: "Decision Maker - Leasing",
            hasLinkedIn: false,
            // No imageUrl - will show placeholder
        },
        {
            id: "9",
            name: "Jessica Straub",
            jobTitle: "Senior Director, Real Estate - Sam's Club",
            company: "Sam's Club",
            phone: "(888) 746-7726",
            email: "jessica.straub@samsclub.com",
            role: "Decision Maker - Leasing",
            hasLinkedIn: true,
            imageUrl: "/assets/images/placeholder.png",
        },
    ];

    const displayContacts = contacts || defaultContacts;
    const contactCount = displayContacts.length;

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                    Contacts
                </h3>
                <span className="text-sm text-gray-600">
                    {contactCount} {contactCount === 1 ? "Contact" : "Contacts"}
                </span>
            </div>

            {/* Contacts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayContacts.map((contact) => (
                    <ContactCard key={contact.id} contact={contact} />
                ))}
            </div>
        </div>
    );
}

