'use client';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

import { MdSchool } from 'react-icons/md';
import { BiLogOutCircle } from 'react-icons/bi';
import {
    FaCalendarPlus,
    FaUsers,
    FaRegChartBar,
    FaImages,
} from 'react-icons/fa';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const SideNavbar = () => {
    const searchParams = useSearchParams();
    const currentSection = searchParams.get('section') || 'College Info';
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const sections = [
        {
            name: 'College Info',
            icon: <MdSchool size={20} />,
            href: '/institute?section=College Info',
        },
        {
            name: 'My Event',
            icon: <FaCalendarPlus size={20} />,
            href: '/institute?section=My Event',
        },
        {
            name: 'Submit Teams',
            icon: <FaUsers size={20} />,
            href: '/institute?section=Submit Teams',
        },
        {
            name: 'Upload Images',
            icon: <FaImages size={20} />,
            href: '/institute?section=Upload Images',
        },
        {
            name: 'Report',
            icon: <FaRegChartBar size={20} />,
            href: '/institute?section=Report',
        },
    ];

    return (
        // {/* Sidebar */}
        <aside
            className={`fixed md:relative z-40 bg-gray-50 pt-5 dark:bg-gray-800 h-full w-64 md:w-1/5 transform transition-transform duration-300 ease-in-out ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0`}
        >
            <div className="p-4 md:hidden flex justify-between items-center border-b border-gray-300 dark:border-gray-700">
                <span className="text-lg font-bold text-gray-800 dark:text-white">
                    Menu
                </span>
                <button
                    className="text-gray-600 dark:text-white"
                    onClick={() => setSidebarOpen(false)}
                >
                    ✕
                </button>
            </div>
            <ul className="flex flex-col gap-3 mt-4 md:mt-0 px-3">
                {sections.map(({ name, icon, href }, i) => {
                    const isActive = currentSection === name;
                    return (
                        <Link key={i} href={href}>
                            <li
                                className={`flex items-center p-5 gap-4 font-bold rounded-lg cursor-pointer ${
                                    isActive
                                        ? 'bg-gray-500 text-gray-500 dark:text-primary'
                                        : 'text-gray-400 hover:bg-gray-500 hover:text-gray-500 dark:hover:text-primary'
                                }`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                {icon}
                                {name}
                            </li>
                        </Link>
                    );
                })}
                <li
                    className="flex items-center p-4 gap-4 font-bold rounded-lg text-gray-400 hover:bg-gray-500 hover:text-gray-500 dark:hover:text-primary cursor-pointer"
                    onClick={() => {
                        signOut({ redirectTo: '/' });
                        setSidebarOpen(false);
                    }}
                >
                    <BiLogOutCircle size={20} />
                    Sign Out
                </li>
            </ul>
        </aside>
    );
};

export default SideNavbar;
