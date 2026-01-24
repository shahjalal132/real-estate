import React, { useState, useEffect } from "react";
import AppLayout from "../../../Layouts/AppLayout";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { ViewMode } from "./types";

interface TodoLayoutProps {
    children: React.ReactNode;
    title: string;
    activeFilter: string; // This corresponds to the sidebar item
    view?: ViewMode; // Current view (List/Board/etc) - managed by page or layout? 
    // Actually, if views are per-page or internal state, let's keep it flexible.
    // But Header controls "View", so state needs to be lifted or shared.
    // For V1 routing: "My Tasks" page might have its own internal view state (List/Board).
}

export default function TodoLayout({ children, title, activeFilter }: TodoLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // We can still share view state across pages if desired via localStorage,
    // or let each page have its own independent view setting.
    // For now, let's keep view state local to the layout/context to persist across internal navigation if we want,
    // OR just let each page handle it.

    // Simplification: Header is part of the layout. Header controls VIEW.
    // Children is the CONTENT (TaskList, BoardView, etc).

    // We need to hoist 'view' state here so Header can change it and Children can react? 
    // OR, Children are the *entire* content including the view switching logic?
    // Based on previous Todo.tsx, Todo.tsx handled view switching.

    // Let's make TodoLayout provide the Shell (Sidebar + AppLayout wrapper). 
    // The specific Page (e.g. MyTasks) will render the Header + Content.
    // OR TodoLayout renders Header too?

    // Integrating Header into Layout seems cleanest so it doesn't jump on navigation.

    const [view, setView] = useState<ViewMode>('List');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const storedSidebar = localStorage.getItem('todo_sidebar_open');
        const storedView = localStorage.getItem('todo_view');

        if (storedSidebar !== null) {
            setSidebarOpen(JSON.parse(storedSidebar));
        }
        if (storedView) {
            setView(storedView as ViewMode);
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('todo_sidebar_open', JSON.stringify(sidebarOpen));
        }
    }, [sidebarOpen, isLoaded]);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('todo_view', view);
        }
    }, [view, isLoaded]);

    if (!isLoaded) return null;

    return (
        <AppLayout title= { title } >
        <div className="flex w-full bg-white font-sans text-[#2A2B2D] overflow-hidden h-[calc(100vh-64px)]" >
            <Sidebar 
                    isOpen={ sidebarOpen }
    activeFilter = { activeFilter }
        />

        <main className="flex-1 flex flex-col min-w-0 bg-white" >
        {/* Pass view and setView to children via cloneElement or Context? 
                         Or render Header here and pass props?
                         If we render Header here, we need onAddTask.
                         
                         Let's expose a Context or just Render Props pattern?
                         Or clearer: Let Pages render the Header if they need specific actions,
                         BUT that duplicates code.
                         
                         Strategy: TodoLayout renders the CONTAINER.
                         It provides `view` and `setView` via a Render Prop or context? 
                         Actually, standard NextJS/Inertia layouts usually wrap children.
                         
                         Let's keep it simple: TodoLayout wraps everything strictly common.
                         Sidebar is common. 
                         Header is common BUT has page-specific actions (like "Add Task" might differ per page).
                         
                         For M1, "Add Task" is generic.
                         Let's put Header in TodoLayout for stability.
                         We'll need to accept an `onAddTask` prop or handle it generically.
                     */}

            < Header
    sidebarOpen = { sidebarOpen }
    setSidebarOpen = { setSidebarOpen }
    activeView = { view }
    setView = { setView }
    onAddTask = {() => window.dispatchEvent(new CustomEvent('todo-add-task'))
} // Simple event bus for now or context later
                    />

{/* Inject view prop into children if possible, or just render children */ }
<div className="flex-1 overflow-auto bg-white" >
{/* We need to pass 'view' to the page content.
                            Since 'children' is an opaque node, we can't easily pass props unless we clone.
                        */}
{
    React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            // @ts-ignore - dynamic prop passing
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
