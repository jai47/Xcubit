'use client';

import React from 'react';
import { IoPieChart, IoCodeWorkingSharp } from 'react-icons/io5';
import { FaUsers, FaCalendarPlus } from 'react-icons/fa';
import { GrInspect } from 'react-icons/gr';
import { BsCalendarEventFill } from 'react-icons/bs';
import { AiFillNotification } from 'react-icons/ai';
import { BiLogOutCircle } from 'react-icons/bi';
import { MdSchool } from 'react-icons/md';
import { SiGithubsponsors, SiReverbnation } from 'react-icons/si';
import { RiSpeakAiLine } from 'react-icons/ri';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const Sidebar = ({ query }) => {
    const searchParams = useSearchParams();
    const querySection = searchParams.get('section') || 'Dashboard';
    return (
        <aside className="bg-gray-50 py-4 px-3 dark:bg-gray-800 basis-1/6 lg:basis-1/5 h-full">
            <ul className="flex flex-col gap-3">
                {[
                    {
                        section: 'Dashboard',
                        icon: <IoPieChart size={20} />,
                    },
                    {
                        section: 'Nationals',
                        icon: <SiReverbnation size={20} />,
                    },
                    {
                        section: 'Sponsors',
                        icon: <SiGithubsponsors size={20} />,
                    },
                    {
                        section: 'Institutes',
                        icon: <MdSchool size={20} />,
                    },
                    {
                        section: 'Speakers',
                        icon: <RiSpeakAiLine size={20} />,
                    },
                    {
                        section: 'Judges',
                        icon: <GrInspect size={20} />,
                    },
                    {
                        section: 'Problems',
                        icon: <IoCodeWorkingSharp size={20} />,
                    },
                    {
                        section: 'Events',
                        icon: <BsCalendarEventFill size={20} />,
                    },
                    {
                        section: 'Create',
                        icon: <FaCalendarPlus size={20} />,
                        href: '/admin/create-event',
                    },
                    { section: 'Users', icon: <FaUsers size={20} /> },
                    {
                        section: 'Queries',
                        icon: <AiFillNotification size={20} />,
                        showCount: query.length,
                    },
                ].map(({ section, icon, badge, href, showCount }, i) => {
                    const isActive = querySection === section;
                    return (
                        <Link
                            key={i}
                            href={href || `?section=${section}`}
                            scroll={false}
                            className={`flex items-center p-4 gap-5 font-bold rounded-lg hover:bg-gray-500 hover:text-gray-500 dark:hover:text-primary ${
                                isActive
                                    ? 'dark:text-primary bg-gray-500 text-gray-500'
                                    : 'text-gray-400'
                            }`}
                        >
                            <div className="relative">
                                {icon}
                                {showCount > 0 && (
                                    <span className="absolute w-3 h-3 bg-red-500 -top-1 -right-1 rounded-full text-[10px] flex items-center justify-center text-primary">
                                        {showCount}
                                    </span>
                                )}
                            </div>
                            <li className="flex items-center gap-2">
                                {section}{' '}
                                {badge && (
                                    <span className="bg-gray-900 text-xs p-1 rounded">
                                        {badge}
                                    </span>
                                )}
                            </li>
                        </Link>
                    );
                })}
                <li
                    className="flex items-center p-5 gap-5 font-bold rounded-lg text-gray-400 hover:bg-gray-500 hover:text-gray-500 dark:hover:text-primary cursor-pointer"
                    onClick={() => signOut({ redirectTo: '/' })}
                >
                    <BiLogOutCircle size={20} />
                    Sign Out
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
