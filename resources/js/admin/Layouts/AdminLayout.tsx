import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

interface AdminLayoutProps {
    children: ReactNode;
    title?: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
    return (
        <>
            <Head title={title ? `${title} - Admin` : 'Admin'} />
            <div className="min-h-screen bg-gray-100">
                <nav className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <span className="text-xl font-semibold text-gray-800">Admin Panel</span>
                            </div>
                        </div>
                    </div>
                </nav>
                <main className="py-6">
                    {children}
                </main>
            </div>
        </>
    );
}

