import { Head, usePage } from "@inertiajs/react";
import { ReactNode, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

interface AppLayoutProps {
    children: ReactNode;
    title?: string;
    footerClassName?: string;
    hideHeader?: boolean;
}

export default function AppLayout({
    children,
    title,
    footerClassName,
    hideHeader = false,
}: AppLayoutProps) {
    const { flash } = usePage<any>().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
        if (flash?.warning) {
            toast(flash.warning, { icon: "⚠️" });
        }
        if (flash?.info) {
            toast(flash.info, { icon: "ℹ️" });
        }
    }, [flash]);

    return (
        <>
            <Head title={title} />
            <Toaster position="bottom-right" />
            <div className="min-h-screen bg-white">
                {!hideHeader && <Header />}
                <main className="max-w-full mx-auto"> {children} </main>
                <Footer className={footerClassName} />
            </div>
        </>
    );
}
