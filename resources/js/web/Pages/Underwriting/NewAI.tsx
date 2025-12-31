import ComingSoonPage from "../ComingSoon";
import { Bot } from "lucide-react";

export default function NewAI() {
    return (
        <ComingSoonPage
            title="New AI Analysis"
            description="Start new AI-powered underwriting analysis"
            features={[
                "AI-powered property analysis",
                "Automated data extraction",
                "Intelligent recommendations",
            ]}
            icon={Bot}
        />
    );
}

