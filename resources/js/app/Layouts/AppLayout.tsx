import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

interface AppLayoutProps {
    children: ReactNode;
    title?: string;
}

export default function AppLayout({ children, title }: AppLayoutProps) {
    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-white">
                <Header />
                <main>{children}</main>
                <Footer />
            </div>
        </>
    );
}

