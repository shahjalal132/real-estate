import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    Menu,
    Bell,
    Search,
    User,
    LogOut,
    Settings,
    ChevronDown,
    X,
} from "lucide-react";
import Dropdown from "@/Components/Dropdown";

interface HeaderProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    user: any;
}

export default function Header({
    sidebarOpen,
    setSidebarOpen,
    user,
}: HeaderProps) {
    return (
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 h-16 shadow-sm">
            <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 -ml-2 rounded-md hover:bg-gray-100 text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {sidebarOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>

                    <div className="hidden md:flex items-center relative">
                        <Search className="absolute left-3 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-9 pr-4 py-1.5 w-64 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="relative p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white">
                            {" "}
                        </span>
                    </button>

                    <div className="h-6 w-px bg-gray-200"> </div>

                    <div className="relative">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150 gap-2"
                                    >
                                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold uppercase">
                                            {user?.name?.charAt(0) || "A"}
                                        </div>
                                        <span className="hidden md:block">
                                            {" "}
                                            {user?.name}{" "}
                                        </span>
                                        <ChevronDown className="ml-1 h-3 w-3" />
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route("profile.edit")}>
                                    {" "}
                                    Profile{" "}
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </header>
    );
}
