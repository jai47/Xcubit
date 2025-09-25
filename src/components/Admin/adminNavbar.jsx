'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoNotifications } from 'react-icons/io5';
import { RxCross1 } from 'react-icons/rx';

const AdminNavbar = ({ events, users, query }) => {
    const [search, setSearch] = useState('');

    const filtered = useMemo(() => {
        if (!search) return { events: [], users: [], query: [] };
        const lower = search.toLowerCase();
        return {
            events: events.filter((e) => e.name.toLowerCase().includes(lower)),
            users: users.filter((u) =>
                [u.name, u.email, u.role].some((field) =>
                    field.toLowerCase().includes(lower)
                )
            ),
            query: query.filter((q) =>
                [q.name, q.email, q.query].some((field) =>
                    field?.toLowerCase().includes(lower)
                )
            ),
        };
    }, [search, events, users, query]);

    const handleSearch = (value) => setSearch(value);

    return (
        <nav className="w-screen bg-gray-200 dark:bg-gray-800 flex justify-between items-center p-4 border-b border-gray-300">
            <Link href="/" className="flex items-center gap-2">
                <Image
                    src="/logo/logo.png"
                    alt="logo"
                    width="20"
                    height="20"
                    className="invert dark:invert-0"
                />
                <span className="text-background dark:text-white">XCUBIT</span>
            </Link>

            <div className="relative">
                <div className="bg-gray-600 text-white px-3 py-2 rounded border border-gray-400 flex items-center gap-10">
                    <input
                        type="text"
                        placeholder="Search anything"
                        className="outline-none border-none bg-transparent"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        aria-label="Search"
                    />
                    <div
                        className="cursor-pointer"
                        onClick={() => setSearch('')}
                    >
                        {filtered.events.length +
                            filtered.users.length +
                            filtered.query.length >
                        0 ? (
                            <RxCross1 size={18} />
                        ) : (
                            <CiSearch size={20} />
                        )}
                    </div>
                </div>

                {/* Search Results */}
                {filtered.events.length +
                    filtered.users.length +
                    filtered.query.length >
                    0 && (
                    <div className="absolute w-full z-[3] mt-2 bg-gray-600 text-white rounded border border-gray-400">
                        {filtered.events.map((e, i) => (
                            <Link
                                key={i}
                                href="admin?section=Events"
                                onClick={() => setSearch('')}
                            >
                                <div className="cursor-pointer w-full hover:bg-gray-500 px-3 py-3 border-b border-gray-400 flex items-center justify-between">
                                    <span>{e.name}</span>
                                    <span className="text-[10px]">event</span>
                                </div>
                            </Link>
                        ))}
                        {filtered.users.map((u, i) => (
                            <Link
                                key={i}
                                href="/admin?section=Users"
                                onClick={() => setSearch('')}
                            >
                                <div className="cursor-pointer w-full hover:bg-gray-500 px-3 py-3 border-b border-gray-400 flex items-center justify-between">
                                    <span>{u.name}</span>
                                    <span className="text-[10px]">user</span>
                                </div>
                            </Link>
                        ))}
                        {filtered.query.map((q, i) => (
                            <Link
                                key={i}
                                href="/admin?section=Queries"
                                onClick={() => setSearch('')}
                            >
                                <div className="cursor-pointer w-full hover:bg-gray-500 px-3 py-3 border-b border-gray-400 flex items-center justify-between">
                                    <span>{q.name}</span>
                                    <span className="text-[10px]">query</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Top Menu */}
            <div className="flex items-center gap-4">
                <Link
                    href="?section=Queries"
                    scroll={false}
                    className="cursor-pointer relative text-primary dark:text-white"
                >
                    <IoNotifications size={20} />
                    {query.length > 0 && (
                        <span className="absolute w-3 h-3 bg-red-500 -top-1 -right-1 rounded-full text-[10px] flex items-center justify-center">
                            {query.length}
                        </span>
                    )}
                </Link>
                <ul className="flex gap-4 text-background dark:text-white">
                    <Link href="/">
                        <li>Home</li>
                    </Link>
                    <Link href="?section=Queries" scroll={false}>
                        <li>Queries</li>
                    </Link>
                    <Link href="/events">
                        <li>Events</li>
                    </Link>
                </ul>
            </div>
        </nav>
    );
};

export default AdminNavbar;
