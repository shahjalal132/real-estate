import ComingSoonPage from "../ComingSoon";
import { FileText } from "lucide-react";

interface NewsShowProps {
    title?: string;
    description?: string;
    slug?: string;
}

export default function NewsShow({
    title = "News Article",
    description = "This news article will be available soon. Check back later for the latest updates.",
    slug,
}: NewsShowProps) {
    return (
        <ComingSoonPage
            title={title}
            description={description}
            icon={FileText}
        />
    );
}

