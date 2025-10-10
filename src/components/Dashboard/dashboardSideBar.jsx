'use client';

import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

const DashboardSideBar = ({ profile, session }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const searchParams = useSearchParams();
    const querySection = searchParams.get('section') || 'Profile';

    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    const navItems = [
        'Profile',
        'My Tickets',
        'My Events',
        'Bookmarks',
        'Settings',
    ];

    return (
        <>
            {/* 🔹 Mobile Header */}
            <header className="lg:hidden fixed top-0 left-0 w-full bg-neutral-950 text-white border-b border-neutral-800 z-40 flex justify-between items-center px-4 py-3">
                <button onClick={toggleSidebar} className="focus:outline-none">
                    {isSidebarOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </button>

                <Link href="/" className="flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="white"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 2.1L1 12h3v9h7v-6h2v6h7v-9h3L12 2.1z" />
                    </svg>
                    <span className="font-semibold text-sm">Dashboard</span>
                </Link>
            </header>

            {/* 🔹 Sidebar */}
            <aside
                className={`fixed lg:static top-0 left-0 h-full lg:h-auto w-4/5 sm:w-2/5 md:w-1/3 lg:w-64 
                bg-neutral-950 text-gray-200 border-r border-neutral-800 
                transform transition-transform duration-300 ease-in-out z-30 
                ${
                    isSidebarOpen
                        ? 'translate-x-0'
                        : '-translate-x-full lg:translate-x-0'
                }`}
            >
                {/* Profile Section */}
                <div className="p-6 text-center border-b border-neutral-800 mt-20 lg:mt-10">
                    <Image
                        src={
                            profile?.image ||
                            `${process.env.NEXT_PUBLIC_BASE_URL}/avatar/default.png`
                        }
                        alt="Profile"
                        className="w-20 h-20 rounded-full mx-auto border border-neutral-700"
                        width={80}
                        height={80}
                    />
                    <h2 className="mt-4 text-lg font-semibold text-white truncate">
                        {session?.user?.name || 'User'}
                    </h2>
                    <p className="text-xs text-neutral-400 truncate">
                        {session?.user?.email || ''}
                    </p>
                </div>

                {/* Navigation */}
                <nav className="mt-4 flex flex-col">
                    {navItems.map((item) => (
                        <Link
                            href={{
                                pathname: '/dashboard',
                                query: { section: item },
                            }}
                            key={item}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <div
                                className={`px-6 py-3 text-sm font-medium transition-all duration-200
                                ${
                                    querySection === item
                                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-inner'
                                        : 'hover:bg-neutral-800 text-gray-300'
                                }`}
                            >
                                {item}
                            </div>
                        </Link>
                    ))}

                    {/* Logout */}
                    <button
                        className="flex items-center justify-between px-6 py-3 text-sm text-red-500 hover:bg-neutral-800 transition-colors duration-200"
                        onClick={() => signOut({ redirectTo: '/' })}
                    >
                        <span className="font-medium">Logout</span>
                        <svg
                            fill="none"
                            height="22"
                            viewBox="0 0 24 24"
                            width="22"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.7 11.7 20 10 20H6C4.3 20 3 18.7 3 17V7C3 5.3 4.3 4 6 4H10C11.7 4 13 5.3 13 7V8"
                                stroke="red"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                            />
                        </svg>
                    </button>
                </nav>
            </aside>

            {/* 🔹 Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 lg:hidden"
                />
            )}
        </>
    );
};

export default DashboardSideBar;
