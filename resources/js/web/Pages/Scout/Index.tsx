import ComingSoonPage from "../ComingSoon";
import { Navigation } from "lucide-react";

export default function ScoutIndex() {
    return (
        <ComingSoonPage
            title="Scout Intelligence"
            description="Analyze tenant proximity, ratings, and criteria from any location"
            features={[
                "Tenant proximity analysis",
                "Location intelligence reports",
                "Owner and tenant criteria matching",
                "Market research insights",
            ]}
            icon={Navigation}
        />
    );
}

