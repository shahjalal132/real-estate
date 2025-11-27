import { Head } from "@inertiajs/react";
import { ReactNode } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

interface AppLayoutProps {
    children: ReactNode;
    title?: string;
    footerClassName?: string;
}

export default function AppLayout({
    children,
    title,
    footerClassName,
}: AppLayoutProps) {
    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-white">
                <Header />
                <main className="max-w-full mx-auto"> {children} </main>
                <Footer className={footerClassName} />
            </div>
        </>
    );
}
