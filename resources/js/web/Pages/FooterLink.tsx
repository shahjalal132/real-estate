import { Head } from "@inertiajs/react";
import AppLayout from "../Layouts/AppLayout";
import ComingSoon from "../../Components/ComingSoon";

interface FooterLinkPageProps {
    category: "quick-links" | "learn-more" | "policies";
    slug: string;
    title?: string;
}

export default function FooterLinkPage({
    category,
    slug,
    title,
}: FooterLinkPageProps) {
    // Generate title from slug if not provided
    const pageTitle =
        title ||
        slug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

    const categoryTitle =
        category === "quick-links"
            ? "Quick Links"
            : category === "learn-more"
            ? "Learn More"
            : "Policy";

    const description = `This ${categoryTitle.toLowerCase()} page will be available soon. We're working hard to bring you this content.`;

    return (
        <AppLayout title={pageTitle}>
            <Head title={pageTitle} />
            <ComingSoon
                title={pageTitle}
                description={description}
            />
        </AppLayout>
    );
}

