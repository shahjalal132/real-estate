import { Head } from "@inertiajs/react";
import AppLayout from "../Layouts/AppLayout";
import ComingSoon from "../../Components/ComingSoon";
import { LucideIcon } from "lucide-react";

interface ComingSoonPageProps {
    title?: string;
    description?: string;
    features?: string[];
    icon?: LucideIcon;
}

export default function ComingSoonPage({
    title = "Coming Soon",
    description = "We're working hard to bring you this feature. Stay tuned!",
    features,
    icon,
}: ComingSoonPageProps) {
    return (
        <AppLayout title={title}>
            <ComingSoon
                title={title}
                description={description}
                features={features}
                icon={icon}
            />
        </AppLayout>
    );
}

