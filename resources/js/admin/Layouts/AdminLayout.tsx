import { useState, ReactNode } from "react";
import { Head, usePage } from "@inertiajs/react";
import Sidebar from "@/admin/Components/Sidebar";
import Header from "@/admin/Components/Header";
import Footer from "@/admin/Components/Footer";

interface AdminLayoutProps {
    children: ReactNode;
    title?: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { auth } = usePage().props as any;
    const user = auth?.user;

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
            <Head title={title ? `${title} - Admin` : "Admin"} />

            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            {/* Main Content Area */}
            <div
                className={`
                    flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out
                    ${sidebarOpen ? "md:ml-64" : "md:ml-20"}
                `}
            >
                <Header
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    user={user}
                />

                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto w-full">{children}</div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
