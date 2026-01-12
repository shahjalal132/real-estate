import { Phone, Mail, Linkedin, User } from "lucide-react";

interface LeadershipMember {
    name: string;
    jobTitle: string;
    company: string;
    phone: string;
    email: string;
    linkedinUrl?: string;
    imageUrl?: string;
}

export default function CompanyLeadership() {
    // Static data for Company Leadership - matching the provided HTML
    const leadershipData: LeadershipMember[] = [
        {
            name: "Stephen Schwarzman",
            jobTitle: "Chairman, CEO & Co-Founder",
            company: "Blackstone Inc.",
            phone: "(212) 583-5000",
            email: "stephen.schwarzman@blackstone.com",
            linkedinUrl: "https://www.linkedin.com/in/stephenschwarzman/",
            imageUrl:
                "https://ahprd1cdn.csgpimgs.com/i2/cL3IVY2Dza5GijT4pqijNRqgn2fplJjCmOTBapuQe1g/118/contact.jpg",
        },
        {
            name: "Michael Chae",
            jobTitle: "Vice Chairman & Chief Financial Officer",
            company: "Blackstone Inc.",
            phone: "(212) 583-5000",
            email: "Michael.chae@blackstone.com",
            linkedinUrl: "https://www.linkedin.com/in/michael-chae/",
            imageUrl:
                "https://ahprd1cdn.csgpimgs.com/i2/9hWBkUD6YVmQ96c58ETP8DQ0KUK12EPJay1epjgE78U/118/contact.jpg",
        },
        {
            name: "John Finley",
            jobTitle: "Chief Legal Officer",
            company: "Blackstone Inc.",
            phone: "(212) 583-5000",
            email: "John.finley@blackstonegroup.com",
            imageUrl:
                "https://ahprd1cdn.csgpimgs.com/i2/xz5Pvcx0Ymw8IQGgbD65ewuvkJ9jOwFrC4cPrjZx43Y/118/contact.jpg",
        },
        {
            name: "Vik Sawhney",
            jobTitle: "Chief Administrative Officer",
            company: "Blackstone Inc.",
            phone: "(212) 583-5000",
            email: "Vik.sawhney@blackstone.com",
            linkedinUrl: "https://www.linkedin.com/in/vik-sawhney-4b47a11b8/",
            imageUrl:
                "https://ahprd1cdn.csgpimgs.com/i2/2gshHxf1ckl2UlLUCmD0-MyyMDbG0vrLB0NxHmFvsFw/118/contact.jpg",
        },
        {
            name: "Christine Anderson",
            jobTitle: "Global Head of Corporate Affairs",
            company: "Blackstone Inc.",
            phone: "(212) 583-5000",
            email: "Christine.anderson@blackstonegroup.com",
            linkedinUrl:
                "https://www.linkedin.com/in/christine-anderson-33aa99123/",
            imageUrl:
                "https://ahprd1cdn.csgpimgs.com/i2/p0vBSKrhNvxC9f-9i_7XA-a1bjtZILpRSFnilw-zrEo/118/contact.jpg",
        },
        {
            name: "Lionel Assant",
            jobTitle: "Senior Manager - Global Co-CIO",
            company: "Blackstone Inc.",
            phone: "011 44 20 7451 4000",
            email: "Lionel.assant@blackstone.com",
            linkedinUrl:
                "https://www.linkedin.com/in/lionel-assant-3225a810/?originalSubdomain=uk",
            imageUrl:
                "https://ahprd1cdn.csgpimgs.com/i2/S_Wyxm-XW28r33yyr3qNCKNtzZYAR91IFntQjLerwTk/118/contact.jpg",
        },
        {
            name: "Joseph Baratta",
            jobTitle: "Global Head of Private Equity",
            company: "Blackstone Inc.",
            phone: "(212) 583-5000",
            email: "Joseph.baratta@blackstone.com",
            linkedinUrl: "https://www.linkedin.com/in/joe-baratta-abaaab1b8/",
            imageUrl:
                "https://ahprd1cdn.csgpimgs.com/i2/gYdtBFgZGoJ8VTRH52zuK1kMeTCTYBxdkx8Vgyeb43M/118/contact.jpg",
        },
        {
            name: "Kenneth Caplan",
            jobTitle: "Co-Chief Investment Officer",
            company: "Blackstone Inc.",
            phone: "(212) 583-5000",
            email: "Kenneth.caplan@blackstone.com",
            linkedinUrl: "https://www.linkedin.com/in/kenneth-caplan/",
            imageUrl:
                "https://ahprd1cdn.csgpimgs.com/i2/_rkvEiHK5-c-PkBl8uxddeshoO7XQC3fAFQnATdTPZ0/118/contact.jpg",
        },
    ];

    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900">
                    Company Leadership
                </h2>
            </div>

            {/* Leadership Grid */}
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {leadershipData.map((member, index) => (
                        <figure
                            key={index}
                            className="bg-gray-50 border border-gray-300 rounded-lg p-4 hover:shadow-md transition-all duration-200 flex gap-4"
                        >
                            {/* Avatar - Left Side */}
                            <div className="shrink-0">
                                <div className="w-20 h-20 rounded overflow-hidden bg-gray-200 flex items-center justify-center">
                                    {member.imageUrl ? (
                                        <img
                                            src={member.imageUrl}
                                            alt={member.name}
                                            title={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <User className="w-10 h-10 text-gray-400" />
                                    )}
                                </div>
                            </div>

                            {/* Content - Right Side */}
                            <figcaption className="flex-1 min-w-0">
                                {/* Name */}
                                <h3 className="text-base font-bold text-gray-900 mb-1.5">
                                    {member.name}
                                </h3>

                                {/* Job Title and Company */}
                                <div className="mb-3 space-y-0.5">
                                    <p className="text-sm text-gray-700 leading-tight">
                                        {member.jobTitle}
                                    </p>
                                    <p className="text-sm text-gray-700 leading-tight">
                                        {member.company}
                                    </p>
                                </div>

                                {/* Contact Info */}
                                <div className="space-y-2">
                                    {/* Phone */}
                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                        <Phone className="w-4 h-4 text-gray-700 shrink-0" />
                                        <a
                                            href={`tel:${member.phone.replace(
                                                /\D/g,
                                                ""
                                            )}`}
                                            className="hover:text-blue-600 transition-colors"
                                        >
                                            {member.phone}
                                        </a>
                                    </div>

                                    {/* Email */}
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-gray-700 shrink-0" />
                                        <a
                                            href={`mailto:${member.email}`}
                                            className="text-sm text-blue-600 hover:text-blue-800 hover:underline truncate"
                                            title={member.email}
                                        >
                                            {member.email}
                                        </a>
                                    </div>

                                    {/* Social Links */}
                                    <div className="flex items-center gap-2 mt-3">
                                        <div className="w-6 h-6 border border-gray-300 rounded bg-white flex items-center justify-center">
                                            <User className="w-3.5 h-3.5 text-gray-600" />
                                        </div>
                                        {member.linkedinUrl && (
                                            <a
                                                href={member.linkedinUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-6 h-6 border border-gray-300 rounded bg-white flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-blue-300 transition-colors"
                                                aria-label={`${member.name} LinkedIn`}
                                            >
                                                <Linkedin className="w-3.5 h-3.5" />
                                            </a>
                                        )}
                                    </div>

                                    {/* Website */}
                                    <div className="mt-2">
                                        <a
                                            href="https://www.blackstone.com/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium"
                                        >
                                            blackstone.com
                                        </a>
                                    </div>
                                </div>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </div>
    );
}
