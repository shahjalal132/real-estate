import ComingSoonPage from "../ComingSoon";
import { FileText } from "lucide-react";

interface NewsIndexProps {
    title?: string;
    description?: string;
    features?: string[];
}

export default function NewsIndex({
    title = "Latest Marketplace News",
    description = "Stay informed with industry insights, market updates, and the latest trends in commercial real estate.",
    features = [
        "Latest industry news and updates",
        "Market insights and analysis",
        "Auction reports and calendars",
        "Expert interviews and articles",
        "Quarterly market reports",
    ],
}: NewsIndexProps) {
    return (
        <ComingSoonPage
            title={title}
            description={description}
            features={features}
            icon={FileText}
        />
    );
}

