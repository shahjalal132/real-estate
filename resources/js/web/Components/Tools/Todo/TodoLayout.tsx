import React, { useState, useEffect } from "react";
import AppLayout from "../../../Layouts/AppLayout";
import Header from "./Header";
import { ViewMode } from "./types";

interface TodoLayoutProps {
    children: React.ReactNode;
    title: string;
    activeFilter: string; // This corresponds to the sidebar item
    view?: ViewMode;
}

export default function TodoLayout({
    children,
    title,
    activeFilter,
}: TodoLayoutProps) {
    const [view, setView] = useState<ViewMode>("List");
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const storedView = localStorage.getItem("todo_view");

        if (storedView) {
            setView(storedView as ViewMode);
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("todo_view", view);
        }
    }, [view, isLoaded]);

    if (!isLoaded) return null;

    return (
        <AppLayout title= { title } >
        <div className="flex w-full bg-white font-sans text-[#2A2B2D] overflow-hidden h-[calc(100vh-64px)]" >
            <main className="flex-1 flex flex-col min-w-0 bg-white" >
                <Header
                        activeView={ view }
    setView = { setView }
    onAddTask = {() =>
    window.dispatchEvent(
        new CustomEvent("todo-add-task"),
    )
} // Simple event bus for now or context later
                    />

{/* Inject view prop into children if possible, or just render children */ }
<div className="flex-1 overflow-auto bg-white" >
{
    React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { view });
        }
        return child;
    })
}
    </div>
    </main>
    </div>
    </AppLayout>
    );
}
