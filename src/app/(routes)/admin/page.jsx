'use client';
import React, { useState, useEffect } from 'react';
import Avatar from '../../../../public/avatar/admin.jpg';
import Image from 'next/image';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import Loading from './loading';
import { redirect } from 'next/navigation';

const AdminDashboard = () => {
    const { data: session } = useSession();
    const [sidePanel, setSidePanel] = useState(false);
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const fetchEvents = async () => {
            let rawData = await fetch('/api/events/', {
                cache: 'no-store',
                method: 'GET',
            });
            rawData = await rawData.json();
            setEvents(rawData.events);
        };

        fetchEvents();
    }, []);

    if (session?.role !== 'admin') {
        return redirect('/api/auth/signin');
    }

    return (
        <div className="flex">
            {/* Left Panel */}
            {sidePanel && (
                <aside
                    id="left-panel"
                    className="bg-gray-800 mt-18 text-white w-64 h-screen p-4"
                >
                    <nav>
                        <ul className="space-y-4">
                            <li className="active">
                                <a
                                    href="#"
                                    className="flex items-center space-x-2"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path d="M20 18H4c-1.1 0-2 .9-2 2v1h20v-1c0-1.1-.9-2-2-2zM4 4h16c1.1 0 2 .9 2 2v10H2V6c0-1.1.9-2 2-2zm16-2H4C2.34 2 1 3.34 1 5v12h22V5c0-1.66-1.34-3-3-3z" />
                                    </svg>
                                    <span>Dashboard</span>
                                </a>
                            </li>

                            <li className="mt-6 text-gray-400">Events</li>
                            <Link href="/admin/create-event">
                                <li className="flex items-center space-x-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path d="M4 20h2V10H4v10zm4 0h2V4H8v16zm4 0h2V14h-2v6zm4 0h2V7h-2v13zm4 0h2V1h-2v19z" />
                                    </svg>
                                    <span>Add Events</span>
                                </li>
                            </Link>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center space-x-2"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path d="M21.432 2.586a3 3 0 00-4.243 0l-1.68 1.68 4.242 4.243 1.681-1.681a3 3 0 000-4.242zM13.671 7.327l-9.899 9.9a1 1 0 00-.263.486L2.41 21.243a.75.75 0 00.917.917l3.529-1.1a1 1 0 00.486-.263l9.9-9.899-4.243-4.243z" />
                                    </svg>
                                    <span>Edit Events</span>
                                </a>
                            </li>

                            <li className="mt-6 text-gray-400">Logout</li>

                            <li>
                                <button
                                    href="#"
                                    className="flex items-center space-x-2"
                                    onClick={() => signOut({ redirectTo: '/' })}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path d="M15.75 9V5.25A2.25 2.25 0 0013.5 3H5.25A2.25 2.25 0 003 5.25v13.5A2.25 2.25 0 005.25 21H13.5a2.25 2.25 0 002.25-2.25V15M9 12h12m0 0l-3-3m3 3l-3 3" />
                                    </svg>
                                    <span>Logout</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </aside>
            )}

            {/* Right Panel */}
            <div id="right-panel" className="flex-1 bg-gray-100">
                {/* Header */}
                <header className="bg-white shadow-md p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <button
                            id="menuToggle"
                            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
                            aria-label="Toggle Menu"
                            onClick={() => setSidePanel(!sidePanel)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Image
                                src={Avatar}
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full"
                            />
                        </div>
                    </div>
                </header>

                <main className="p-4 relative">
                    {/* Event Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <div
                                key={event._id}
                                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 relative"
                            >
                                {/* SVG Icon in top-left corner */}
                                <div className="absolute right-4 bottom-8">
                                    <Link href="/admin/editevent">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-5 h-5 text-gray-500"
                                        >
                                            <path d="M21.432 2.586a3 3 0 00-4.243 0l-1.68 1.68 4.242 4.243 1.681-1.681a3 3 0 000-4.242zM13.671 7.327l-9.899 9.9a1 1 0 00-.263.486L2.41 21.243a.75.75 0 00.917.917l3.529-1.1a1 1 0 00.486-.263l9.9-9.899-4.243-4.243z" />
                                        </svg>
                                    </Link>
                                </div>

                                <img
                                    src={event.image}
                                    alt={event.name}
                                    className="w-full h-40 object-cover rounded-md"
                                />
                                <div className="mt-4">
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {event.name}
                                    </h3>

                                    {/* Button to redirect to event details page */}
                                    <Link href="/admin/details">
                                        <button className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                                            View Analytics
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-white text-gray-600 p-4 mt-6">
                    <div className="flex justify-between">
                        <div>&copy; 2024</div>
                        <div>
                            Designed and Developed by{' '}
                            <a
                                href="https://linkedin.com/in/himanshupal24"
                                className="text-blue-500"
                            >
                                Himanshu{' '}
                            </a>
                            &{' '}
                            <a
                                href="https://linkedin.com/in/jai47"
                                className="text-blue-500"
                            >
                                Jai
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default AdminDashboard;
