'use client';
import React, { useState } from 'react';
import Avatar from '../../../../public/avatar/admin.jpg';
import Image from 'next/image';
import { logout } from '@/serverAction/authAction';
import Link from 'next/link';
const AdminDashboard = () => {
    const [sidePanel, setSidePanel] = useState(false);

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
                                    onClick={async () => {
                                        await logout();
                                    }}
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

                        {/* <a href="#" className="text-lg font-bold">
              <Image src={logo} alt="Logo" className="h-8" />
            </a> */}
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-4">
                            {/* Search Button */}
                            <button className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
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
                                        d="M11.25 4.5a6.75 6.75 0 016.75 6.75 6.75 6.75 0 11-6.75-6.75z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.5 16.5l4.5 4.5"
                                    />
                                </svg>
                            </button>

                            {/* Notification Button */}
                            <button className="relative text-gray-600 hover:text-gray-800 transition-colors duration-200">
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
                                        d="M15.75 9V6.75a6.75 6.75 0 10-13.5 0V9A6.75 6.75 0 003 19.5h18a6.75 6.75 0 00-5.25-10.5zm-6.75 15a3 3 0 006 0"
                                    />
                                </svg>
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                                    3
                                </span>
                            </button>

                            {/* Messages Button */}
                            <button className="relative text-gray-600 hover:text-gray-800 transition-colors duration-200">
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
                                        d="M21 12.75V6a3 3 0 00-3-3H6a3 3 0 00-3 3v6.75M3 15.75V18a3 3 0 003 3h12a3 3 0 003-3v-2.25M3 15.75h18M3 15.75l3-3m12 0l3 3"
                                    />
                                </svg>
                                <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs rounded-full px-1">
                                    4
                                </span>
                            </button>
                        </div>

                        <div className="relative">
                            <Image
                                src={Avatar}
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full"
                            />
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="p-4">
                    {/* Widgets */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white shadow-md rounded p-4">
                            <div className="flex items-center">
                                <div className="text-blue-500 text-2xl">
                                    <i className="pe-7s-cash"></i>
                                </div>
                                <div className="ml-4">
                                    <div className="text-xl font-bold">
                                        1000
                                    </div>
                                    <div className="text-gray-600">
                                        Total Number Of Tickets
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white shadow-md rounded p-4">
                            <div className="flex items-center">
                                <div className="text-green-500 text-2xl">
                                    <i className="pe-7s-cart"></i>
                                </div>
                                <div className="ml-4">
                                    <div className="text-xl font-bold">
                                        1000
                                    </div>
                                    <div className="text-gray-600">
                                        Tickets Used
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white shadow-md rounded p-4">
                            <div className="flex items-center">
                                <div className="text-yellow-500 text-2xl">
                                    <i className="pe-7s-browser"></i>
                                </div>
                                <div className="ml-4">
                                    <div className="text-xl font-bold">
                                        1000
                                    </div>
                                    <div className="text-gray-600">
                                        Tickets Left
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Registered Users Table */}
                    <div className="bg-white shadow-md rounded p-4">
                        <h4 className="text-lg font-bold mb-4">
                            Registered Users
                        </h4>
                        <table className="table-auto w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2">#</th>
                                    <th className="p-2">Unique Code</th>
                                    <th className="p-2">Name</th>
                                    <th className="p-2">Email</th>
                                    <th className="p-2">Contact Num</th>
                                    <th className="p-2">Num Of Ticket</th>
                                    <th className="p-2">Ticket Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-2">1</td>
                                    <td className="p-2">1234</td>
                                    <td className="p-2">Bwave Ict</td>
                                    <td className="p-2">bwaveict@gmail.com</td>
                                    <td className="p-2">
                                        Please Subscribe to our channel
                                    </td>
                                    <td className="p-2">This is a template</td>
                                    <td className="p-2">
                                        <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
                                            Subscribe
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-white text-gray-600 p-4 mt-6">
                    <div className="flex justify-between">
                        <div>&copy; 2018 Ela Admin</div>
                        <div>
                            Designed by{' '}
                            <a
                                href="https://colorlib.com"
                                className="text-blue-500"
                            >
                                Colorlib
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default AdminDashboard;
