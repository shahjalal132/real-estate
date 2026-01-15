
import { Mail, Phone, Globe, Linkedin } from "lucide-react";

export interface Contact {
    id: number;
    name: string;
    avatarUrl?: string; // Optional
    title: string;
    companyName: string; // "Newmark" in screenshot
    address: string;
    phone?: string;
    email?: string;
    website?: string; // "nmrk.com"
    linkedIn?: string; // URL
    roles?: string[]; // "Investment Broker", "Landlord Representation", etc.
}

interface BrokerContactCardProps {
    contact: Contact;
}

export default function BrokerContactCard({ contact }: BrokerContactCardProps) {
    return (
        <div className= "bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex gap-4 h-full" >
        {/* Avatar */ }
        < div className = "shrink-0" >
            <div className="relative w-24 h-32 bg-gray-100 border border-gray-200 rounded overflow-hidden" >
                {
                    contact.avatarUrl ? (
                        <img
                            src= { contact.avatarUrl }
                            alt={ contact.name }
                            className="w-full h-full object-cover"
                    />
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox = "0 0 160 100"
                            className = "w-full h-full object-cover text-gray-300 fill-current"
                        >
                        <path d="M0 0h160v160H0z" fill = "#f3f4f6" />
                        <path
                                d="M80 82.462c-43.505 0-78.77 34.713-78.77 77.538H158.77c0-42.825-35.264-77.538-78.769-77.538Z"
                                className = "fill-gray-300"
                        />
                        </svg>
                    )
}
</div>
    </div>

{/* Content */ }
<div className="flex flex-col min-w-0 flex-1" >
    {/* Header */ }
    < div className = "mb-3" >
        <h3 className="text-base font-bold text-gray-900 truncate" title = { contact.name } >
            { contact.name }
            </h3>
            < p className = "text-sm text-gray-600 truncate" title = { contact.title } >
                { contact.title }
                </p>
                </div>

{/* Company Info */ }
<div className="mb-3" >
    <p className="text-sm font-semibold text-gray-900" > { contact.companyName } </p>
        < p className = "text-sm text-gray-600 whitespace-pre-line" > { contact.address } </p>
            < p className = "text-sm text-gray-600" > { contact.phone } </p>
                </div>

{/* Actions / Links */ }
<div className="mb-3 space-y-1" >
{
    contact.email && (
        <a
                            href={ `mailto:${contact.email}` }
className = "flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline truncate"
title = { contact.email }
    >
    <Mail className="h-3.5 w-3.5" />
        { contact.email }
        </a>
                    )}
{
    contact.linkedIn && (
        <a
                            href={ contact.linkedIn }
    target = "_blank"
    rel = "noopener noreferrer"
    className = "flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline truncate"
    title = "LinkedIn Profile"
        >
        <Linkedin className="h-3.5 w-3.5" />
            { contact.name }
            </a>
                    )
}
{/* vCard Link Placeholder from Grid Icon in screenshot */ }
<a href="#" className = "flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline" title = "Download vCard" >
    <svg viewBox="0 0 24 24" className = "h-3.5 w-3.5 fill-current" >
        <path fillRule="evenodd" clipRule = "evenodd" d = "M22 3H2C0.9 3 0 3.9 0 5V19C0 20.1 0.9 21 2 21H22C23.1 21 23.99 20.1 23.99 19L24 5C24 3.9 23.1 3 22 3ZM22 19H2V5H22V19ZM21 6H14V11H21V6ZM20 8L17.5 9.75L15 8V7L17.5 8.75L20 7V8ZM9 12C10.65 12 12 10.65 12 9C12 7.35 10.65 6 9 6C7.35 6 6 7.35 6 9C6 10.65 7.35 12 9 12ZM9 8C9.55 8 10 8.45 10 9C10 9.55 9.55 10 9 10C8.45 10 8 9.55 8 9C8 8.45 8.45 8 9 8ZM15 16.59C15 14.09 11.03 13.01 9 13.01C6.97 13.01 3 14.09 3 16.59V18H15V16.59ZM5.48 16C6.22 15.5 7.7 15 9 15C10.3 15 11.77 15.49 12.52 16H5.48Z" />
            </svg>
            </a>

{
    contact.website && (
        <a
                            href={ `https://${contact.website}` }
    target = "_blank"
    rel = "noopener noreferrer"
    className = "flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline truncate"
        >
        { contact.website }
        </a>
                    )
}
</div>

{/* Roles */ }
{
    contact.roles && contact.roles.length > 0 && (
        <div className="mt-auto" >
            <p className="text-sm text-gray-800" >
                { contact.roles.join(", ") }
                </p>
                </div>
                )
}
</div>
    </div>
    );
}
