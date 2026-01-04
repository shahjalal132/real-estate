import { Phone, Mail } from "lucide-react";

interface CoStarContactProps {
    contact?: {
        name: string;
        jobTitle: string;
        phone: string;
        email: string;
        imageUrl?: string;
    };
}

export default function CoStarContact({ contact }: CoStarContactProps) {
    // Dummy data matching the screenshot
    const defaultContact = {
        name: "Benjamin Ford",
        jobTitle: "Research Manager",
        phone: "(972) 532-7612 X0471",
        email: "bford@costar.com",
        imageUrl: "/assets/images/placeholder.png",
    };

    const displayContact = contact || defaultContact;

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            {/* Header */}
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
                CoStar Contact
            </h3>

            {/* Contact Card */}
            <div className="flex gap-4">
                {/* Profile Image */}
                <div className="shrink-0">
                    {displayContact.imageUrl ? (
                        <img
                            src={displayContact.imageUrl}
                            alt={displayContact.name}
                            className="w-20 h-20 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-lg font-semibold text-gray-600">
                                {displayContact.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </span>
                        </div>
                    )}
                </div>

                {/* Contact Info */}
                <div className="flex-1 min-w-0">
                    <h4 className="text-base font-semibold text-gray-900 mb-1">
                        {displayContact.name}
                    </h4>
                    <p className="text-sm text-gray-700 mb-3">
                        {displayContact.jobTitle}
                    </p>

                    {/* Phone */}
                    <div className="flex items-center gap-2 mb-2">
                        <Phone className="h-4 w-4 text-gray-500 shrink-0" />
                        <a
                            href={`tel:${displayContact.phone.replace(/[^\d+]/g, "")}`}
                            className="text-sm text-gray-700 hover:text-gray-900"
                        >
                            {displayContact.phone}
                        </a>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500 shrink-0" />
                        <a
                            href={`mailto:${displayContact.email}`}
                            className="text-sm text-gray-700 hover:text-gray-900"
                        >
                            {displayContact.email}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

