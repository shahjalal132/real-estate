import ComingSoonPage from "./ComingSoon";
import { TrendingUp } from "lucide-react";

interface InsightsProps {
    title?: string;
    description?: string;
    features?: string[];
}

export default function Insights({
    title = "Insights",
    description = "Gain an advantage over competitors. With data-backed market insights, real-time property valuations, industry news, and more, we'll help you make smarter decisions.",
    features = [
        "Data-backed market insights",
        "Real-time property valuations",
        "Industry news and trends",
        "Market intelligence reports",
        "Analytics and forecasting",
    ],
}: InsightsProps) {
    return (
        <ComingSoonPage
            title={title}
            description={description}
            features={features}
            icon={TrendingUp}
        />
    );
}

