import React from 'react';
import { BsCalendarEventFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import { AiFillNotification } from 'react-icons/ai';
import { IoIosArrowRoundUp } from 'react-icons/io';
import Link from 'next/link';

const DashboardSection = ({ users, queries, events }) => {
    function getRecentUsers(users) {
        // Get the current date and define the start and end of the current month
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            0,
            23,
            59,
            59
        );

        // Filter users based on the timestamp within the current month
        return users.filter((user) => {
            const timestamp = new Date(user.timestamp);
            return timestamp >= startOfMonth && timestamp <= endOfMonth;
        });
    }

    function getRecentEvents(events) {
        // Get the current date and define the start and end of the current month
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            0,
            23,
            59,
            59
        );

        // Filter users based on the timestamp within the current month
        return events.filter((user) => {
            const timestamp = new Date(user.timestamp);
            return timestamp >= startOfMonth && timestamp <= endOfMonth;
        });
    }

    const recentUsers = getRecentUsers(users);
    const recentEvents = getRecentEvents(events);
    return (
        <>
            <div className="grid grid-cols-3 gap-5 p-5">
                <div className="flex items-center justify-between p-5 bg-gray-700 rounded-lg text-gray-200">
                    <div>
                        <h1 className="text-md uppercase">Total Users</h1>
                        <span className="text-2xl font-bold">
                            {users.length}
                        </span>
                        <div className="flex items-center justify-center text-green-500 gap-2">
                            <span className="flex items-center justify-center">
                                <IoIosArrowRoundUp size={20} />{' '}
                                {recentUsers.length}
                            </span>{' '}
                            <span className="text-gray-500">Last Month</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 p-4 bg-teal-600 rounded-full">
                        <FaUsers size={20} />
                    </div>
                </div>
                <div className="flex items-center justify-between p-5 bg-gray-700 rounded-lg text-gray-200">
                    <div>
                        <h1 className="text-md uppercase">Total Events</h1>
                        <span className="text-2xl font-bold">
                            {events.length}
                        </span>
                        <div className="flex items-center justify-center text-green-500 gap-2">
                            <span className="flex items-center justify-center">
                                <IoIosArrowRoundUp size={20} />{' '}
                                {recentEvents.length}
                            </span>{' '}
                            <span className="text-gray-500">Last Month</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 p-4 bg-indigo-600 rounded-full">
                        <BsCalendarEventFill size={20} />
                    </div>
                </div>
                <div className="flex items-center justify-between p-5 bg-gray-700 rounded-lg text-gray-200">
                    <div>
                        <h1 className="text-md uppercase">Recent Queries</h1>
                        <span className="text-2xl font-bold">
                            {queries?.length || 0}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 p-4 bg-lime-600 rounded-full">
                        <AiFillNotification size={20} />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-5 p-5">
                <div className="flex flex-col items-center justify-centre p-5 bg-gray-700 rounded-lg text-gray-200">
                    <div className="flex items-center justify-between w-full">
                        <h1 className="text-md">Recent Users</h1>
                        <Link
                            href="admin?section=Users"
                            className="group flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-gradient-to-r from-purple-500 to-pink-500 enabled:hover:bg-gradient-to-l focus:ring-purple-200 dark:focus:ring-purple-800 border-0 rounded-lg focus:ring-2"
                        >
                            <span className="items-center flex justify-center bg-white text-gray-900 transition-all duration-75 ease-in group-enabled:group-hover:bg-opacity-0 group-enabled:group-hover:text-inherit dark:bg-gray-900 dark:text-white w-full rounded-md text-sm px-4 py-2 border border-transparent">
                                View All
                            </span>
                        </Link>
                    </div>
                    <div className="mt-5 flex flex-col gap-1 overflow-y-auto max-h-[300px] w-full">
                        {recentUsers.map((user, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 bg-gray-700 rounded-lg text-gray-200 hover:bg-gray-500"
                            >
                                <div>
                                    <h1 className="text-md">{user.name}</h1>
                                    <span className="text-sm">
                                        {user.email}
                                    </span>
                                    <p className="text-sm text-green-500">
                                        Joined on{' '}
                                        <span className="text-xs text-muted">
                                            {new Date(
                                                user.timestamp
                                            ).toDateString()}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 p-4 bg-cyan-700 rounded-full">
                                    <FaUser size={20} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col items-center justify-centre p-5 bg-gray-700 rounded-lg text-gray-200">
                    <div className="flex items-center justify-between w-full">
                        <h1 className="text-md">Recent Events</h1>
                        <Link
                            href="admin?section=Events"
                            className="group flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-gradient-to-r from-purple-500 to-pink-500 enabled:hover:bg-gradient-to-l focus:ring-purple-200 dark:focus:ring-purple-800 border-0 rounded-lg focus:ring-2"
                        >
                            <span className="items-center flex justify-center bg-white text-gray-900 transition-all duration-75 ease-in group-enabled:group-hover:bg-opacity-0 group-enabled:group-hover:text-inherit dark:bg-gray-900 dark:text-white w-full rounded-md text-sm px-4 py-2 border border-transparent">
                                View All
                            </span>
                        </Link>
                    </div>
                    <div className="mt-3 flex flex-col gap-1 overflow-y-auto max-h-[300px] w-full">
                        {recentEvents.map((event, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-5 bg-gray-700 rounded-lg text-gray-200 hover:bg-gray-500"
                            >
                                <div>
                                    <h1 className="text-md">{event.name}</h1>
                                    <span className="text-sm">
                                        {event.start}
                                    </span>
                                </div>
                                <div className="w-10 h-10 flex items-center justify-center bg-cyan-700 rounded-full">
                                    <span>{event.registered}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col items-center justify-centre p-5 bg-gray-700 rounded-lg text-gray-200">
                    <div className="flex items-center justify-between w-full">
                        <h1 className="text-md">Recent Queries</h1>
                        <Link
                            href="admin?section=Queries"
                            className="group flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-gradient-to-r from-purple-500 to-pink-500 enabled:hover:bg-gradient-to-l focus:ring-purple-200 dark:focus:ring-purple-800 border-0 rounded-lg focus:ring-2"
                        >
                            <span className="items-center flex justify-center bg-white text-gray-900 transition-all duration-75 ease-in group-enabled:group-hover:bg-opacity-0 group-enabled:group-hover:text-inherit dark:bg-gray-900 dark:text-white w-full rounded-md text-sm px-4 py-2 border border-transparent">
                                View All
                            </span>
                        </Link>
                    </div>
                    <div className="mt-5 flex flex-col gap-1 overflow-y-auto max-h-[300px] w-full">
                        {queries.map((query, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 bg-gray-700 rounded-lg text-gray-200 hover:bg-gray-500"
                            >
                                <div className="flex flex-col gap-2 w-full">
                                    <div className="w-full text-md flex items-center justify-between">
                                        <div className="flex flex-col items-start justify-center ">
                                            <span>{query.name}</span>
                                            <span className="text-xs text-gray-400">
                                                {query.email}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-center gap-2">
                                            <span className="text-sm text-green-500">
                                                {(() => {
                                                    const queryDate = new Date(
                                                        query.timestamp
                                                    );
                                                    const today = new Date();
                                                    const yesterday =
                                                        new Date();
                                                    yesterday.setDate(
                                                        today.getDate() - 1
                                                    );

                                                    // Reset time to midnight for accurate comparison
                                                    today.setHours(0, 0, 0, 0);
                                                    yesterday.setHours(
                                                        0,
                                                        0,
                                                        0,
                                                        0
                                                    );
                                                    queryDate.setHours(
                                                        0,
                                                        0,
                                                        0,
                                                        0
                                                    );

                                                    if (
                                                        queryDate.getTime() ===
                                                        today.getTime()
                                                    ) {
                                                        return (
                                                            <span className="text-xs text-muted">
                                                                Today
                                                            </span>
                                                        );
                                                    } else if (
                                                        queryDate.getTime() ===
                                                        yesterday.getTime()
                                                    ) {
                                                        return (
                                                            <span className="text-xs text-muted">
                                                                Yesterday
                                                            </span>
                                                        );
                                                    } else {
                                                        return (
                                                            <>
                                                                <span className="text-xs text-muted">
                                                                    {queryDate.toLocaleDateString()}
                                                                </span>{' '}
                                                                <span className="text-xs text-muted">
                                                                    {new Date(
                                                                        query.timestamp
                                                                    ).toLocaleTimeString(
                                                                        [],
                                                                        {
                                                                            hour: '2-digit',
                                                                            minute: '2-digit',
                                                                        }
                                                                    )}
                                                                </span>
                                                            </>
                                                        );
                                                    }
                                                })()}
                                            </span>
                                            <span className="text-xs text-muted">
                                                {new Date(
                                                    query.timestamp
                                                ).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-sm max-h-16 overflow-y-auto break-words">
                                        {query.query}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardSection;
