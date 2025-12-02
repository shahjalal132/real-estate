import { ExternalLink } from "lucide-react";

interface PropertyExternalLinkProps {
    externalUrl: string;
    platformName?: string;
}

export default function PropertyExternalLink({
    externalUrl,
    platformName = "Crexi",
}: PropertyExternalLinkProps) {
    return (
        <div className="bg-gradient-to-br from-[#0066CC] to-[#0052A3] rounded-2xl shadow-xl p-6 text-white">
            <h3 className="text-xl font-bold mb-2">View on {platformName}</h3>
            <p className="text-blue-100 text-sm mb-4">
                Get more details and contact information
            </p>
            <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-white hover:bg-gray-100 text-[#0066CC] font-bold py-3 px-4 rounded-xl transition-colors"
            >
                <ExternalLink className="h-5 w-5" />
                Visit {platformName}
            </a>
        </div>
    );
}
