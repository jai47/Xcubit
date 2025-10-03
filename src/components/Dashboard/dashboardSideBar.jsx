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

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <>
            {/* Sidebar Toggle Button (Hamburger) */}
            <div className="lg:hidden p-4 z-20 flex justify-between items-center">
                <button
                    onClick={toggleSidebar}
                    className="text-white focus:outline-none"
                >
                    {isSidebarOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-black dark:text-white"
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
                            className="h-6 w-6 text-black dark:text-white"
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
                <Link href="/">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-black dark:text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        stroke="none"
                    >
                        <path d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 11 21 L 11 15 L 13 15 L 13 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z M 12 4.7910156 L 18 10.191406 L 18 11 L 18 19 L 15 19 L 15 13 L 9 13 L 9 19 L 6 19 L 6 10.191406 L 12 4.7910156 z"></path>
                    </svg>
                </Link>
            </div>

            {/* Sidebar */}
            <div
                className={`z-10 lg:w-64 shadow-lg shadow-white bg-primary dark:bg-background dark:text-primary lg:block ${
                    isSidebarOpen ? 'fixed h-full w-4/5 left-0 top-0' : 'hidden'
                } lg:block lg:static lg:w-64`}
            >
                <div className="p-6 text-center border-b mt-32">
                    <Image
                        src={
                            profile?.image ||
                            `${process.env.NEXT_PUBLIC_BASE_URL}/avatar/default.png`
                        }
                        alt="Profile"
                        className="w-20 h-20 rounded-full mx-auto"
                        width={80}
                        height={80}
                    />
                    <h2 className="mt-4 text-lg font-semibold">
                        {session?.user?.name}
                    </h2>
                    <p className="text-sm">{session?.user?.email}</p>
                </div>
                <nav className="mt-4">
                    <ul>
                        {[
                            'Profile',
                            'My Tickets',
                            'My Events',
                            'Bookmarks',
                            'Settings',
                        ].map((item) => (
                            <Link
                                href={{
                                    pathname: '/dashboard',
                                    query: { section: item },
                                }}
                                key={item}
                                onClick={toggleSidebar}
                            >
                                <li
                                    className={`w-full px-6 py-3 text-left ${
                                        querySection === item
                                            ? 'bg-gray-100 dark:text-background'
                                            : ''
                                    }`}
                                >
                                    {item}
                                </li>
                            </Link>
                        ))}
                        <li className="w-full flex items-center pr-5">
                            <button
                                className="w-full px-6 py-3 text-left text-red-500"
                                onClick={() => signOut({ redirectTo: '/' })}
                            >
                                Logout
                            </button>
                            <svg
                                fill="none"
                                height="24"
                                viewBox="0 0 24 24"
                                width="24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8"
                                    stroke="red"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                />
                            </svg>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default DashboardSideBar;
