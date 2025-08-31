'use client';
import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { CiSearch } from 'react-icons/ci';
import { RxCross1 } from 'react-icons/rx';
import { IoPieChart } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import { BsCalendarEventFill } from 'react-icons/bs';
import { FaUsers } from 'react-icons/fa';
import { AiFillNotification } from 'react-icons/ai';
import { BiLogOutCircle } from 'react-icons/bi';
import { FaCalendarPlus } from 'react-icons/fa';
import { IoNotifications } from 'react-icons/io5';
import { redirect, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Loading from './loading';
import UsersSection from '@/src/components/Admin/UsersSection';
import EventsSection from '@/src/components/Admin/EventsSection';
import DashboardSection from '@/src/components/Admin/DashboardSection';
import ProfileSection from '@/src/components/Admin/ProfileSection';
import QuerySection from '@/src/components/Admin/QuerySection';

const RenderSection = ({ section, events, users, currentUser, query }) => {
    if (section === 'Dashboard') {
        return (
            <DashboardSection events={events} users={users} queries={query} />
        );
    }
    if (section === 'Profile') {
        return <ProfileSection currentUser={currentUser} />;
    }
    if (section === 'Events') {
        return <EventsSection events={events} />;
    }
    if (section === 'Users') {
        return <UsersSection users={users} />;
    }
    if (section === 'Queries') {
        return <QuerySection query={query} />;
    }
};

const AdminDashboard = () => {
    const { data: session } = useSession();
    const [currentUser, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const [query, setQuery] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredResults, setFilteredResults] = useState({
        events: [],
        users: [],
        query: [],
    });

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await fetch('/api/getUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: session.user.email }),
            });

            if (!response.ok) throw new Error('Failed to fetch user data');

            const userData = await response.json();
            setUser(userData.user);

            let rawData = await fetch('/api/events/', {
                cache: 'no-store',
                method: 'GET',
            });
            rawData = await rawData.json();
            setEvents(rawData.events);

            let res = await fetch('/api/admin-route/', {
                method: 'GET',
            });
            res = await res.json();
            if (res.success) {
                setUsers(res.data);
            }

            let queryRes = await fetch('/api/query', {
                method: 'GET',
            });

            queryRes = await queryRes.json();
            setQuery(queryRes);
        };
        fetchEvents();
    }, []);
    const searchParams = useSearchParams();
    const querySection = searchParams.get('section') || 'Dashboard';

    const handleSearch = (value) => {
        setSearch(value);

        const lowerCaseValue = value.toLowerCase();
        if (!lowerCaseValue) {
            setFilteredResults({
                events: [],
                users: [],
                query: [],
            });
            return;
        }

        setFilteredResults({
            events: events.filter((event) =>
                event.name.toLowerCase().includes(lowerCaseValue)
            ),
            users: users.filter(
                (user) =>
                    user.name.toLowerCase().includes(lowerCaseValue) ||
                    user.email.toLowerCase().includes(lowerCaseValue) ||
                    user.role.toLowerCase().includes(lowerCaseValue)
            ),
            query: query.filter(
                (q) =>
                    q.name?.toLowerCase().includes(lowerCaseValue) ||
                    q.email?.toLowerCase().includes(lowerCaseValue) ||
                    q.query?.toLowerCase().includes(lowerCaseValue)
            ),
        });
    };

    if (session?.role !== 'admin') {
        return redirect('/api/auth/signin');
    }

    return (
        <div>
            <nav className="w-screen bg-gray-200 dark:bg-gray-800 flex justify-between items-center p-4 border-b border-gray-300">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/logo/logo.png"
                        alt="logo"
                        width="20"
                        height="20"
                        className="invert dark:invert-0"
                    />
                    <span className="text-background dark:text-white">
                        XCUBIT
                    </span>
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
                        <div className="cursor-pointer">
                            {filteredResults?.events?.length === 0 &&
                            filteredResults?.users?.length === 0 &&
                            filteredResults?.query?.length === 0 ? (
                                <div>
                                    <CiSearch size={20} />
                                </div>
                            ) : (
                                <div
                                    onClick={() => {
                                        setFilteredResults({
                                            events: [],
                                            users: [],
                                            query: [],
                                        });
                                        setSearch('');
                                    }}
                                >
                                    <RxCross1 size={18} />
                                </div>
                            )}
                        </div>
                    </div>
                    <div
                        className={`absolute w-full z-[3] mt-2 bg-gray-600 text-white rounded border border-gray-400 ${
                            filteredResults?.events?.length === 0 &&
                            filteredResults?.users?.length === 0 &&
                            filteredResults?.query?.length === 0
                                ? 'hidden'
                                : 'block'
                        }`}
                    >
                        {filteredResults.events.map((e, i) => (
                            <Link
                                key={i}
                                href="admin?section=Events"
                                className="bg-red-50"
                                onClick={() =>
                                    setFilteredResults({
                                        events: [],
                                        users: [],
                                        query: [],
                                    })
                                }
                            >
                                <div className="cursor-pointer w-full hover:bg-gray-500 px-3 py-3 border-b border-gray-400 flex items-center justify-between">
                                    <span>{e.name}</span>
                                    <span className="text-[10px]">event</span>
                                </div>
                            </Link>
                        ))}
                        {filteredResults.users.map((u, i) => (
                            <Link
                                key={i}
                                href="/admin?section=Users"
                                onClick={() =>
                                    setFilteredResults({
                                        events: [],
                                        users: [],
                                        query: [],
                                    })
                                }
                            >
                                <div className="cursor-pointer w-full hover:bg-gray-500 px-3 py-3 border-b border-gray-400 flex items-center justify-between">
                                    <span>{u.name}</span>
                                    <span className="text-[10px]">user</span>
                                </div>
                            </Link>
                        ))}
                        {filteredResults.query.map((q, i) => (
                            <Link
                                key={i}
                                href="/admin?section=Queries"
                                onClick={() =>
                                    setFilteredResults({
                                        events: [],
                                        users: [],
                                        query: [],
                                    })
                                }
                            >
                                <div className="cursor-pointer w-full hover:bg-gray-500 px-3 py-3 border-b border-gray-400 flex items-center justify-between">
                                    <span>{q.name}</span>
                                    <span className="text-[10px]">query</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Link
                        href="?section=Queries"
                        scroll={false}
                        className="cursor-pointer relative text-primary"
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
            <main
                className="flex h-screen"
                style={{
                    height: 'calc(100vh - 4rem)', // Adjust '4rem' to match your <nav> height
                }}
            >
                <aside className="bg-gray-50 py-4 px-3 dark:bg-gray-800 basis-1/6 lg:basis-1/5 h-full">
                    <ul className="flex flex-col gap-3">
                        <Link
                            href="?section=Dashboard"
                            scroll={false}
                            className={`flex items-center p-5 gap-5 font-bold rounded-lg hover:bg-gray-500 hover:text-gray-500 dark:hover:text-primary ${
                                querySection === 'Dashboard'
                                    ? 'dark:text-primary bg-gray-500 text-gray-500'
                                    : 'text-gray-400'
                            }`}
                        >
                            <IoPieChart size={20} />
                            <li>Dashboard</li>
                        </Link>

                        <Link
                            href="?section=Profile"
                            scroll={false}
                            className={`flex items-center p-5 gap-5 font-bold rounded-lg hover:bg-gray-500 hover:text-gray-500 dark:hover:text-primary ${
                                querySection === 'Profile'
                                    ? 'dark:text-primary bg-gray-500 text-gray-500'
                                    : 'text-gray-400'
                            }`}
                        >
                            <FaUser size={20} />
                            <li className="flex items-center gap-2">
                                Profile{' '}
                                <span className="bg-gray-900 text-xs p-1 rounded">
                                    Admin
                                </span>
                            </li>
                        </Link>
                        <Link
                            href="?section=Events"
                            scroll={false}
                            className={`flex items-center p-5 gap-5 font-bold rounded-lg hover:bg-gray-500 hover:text-gray-500 dark:hover:text-primary ${
                                querySection === 'Events'
                                    ? 'dark:text-primary bg-gray-500 text-gray-500'
                                    : 'text-gray-400'
                            }`}
                        >
                            <BsCalendarEventFill size={20} />
                            <li>Events</li>
                        </Link>
                        <Link
                            href="/admin/create-event"
                            scroll={false}
                            className={`flex items-center p-5 gap-5 font-bold rounded-lg hover:bg-gray-500 hover:text-gray-500 dark:hover:text-primary text-gray-400`}
                        >
                            <FaCalendarPlus size={20} />
                            <li>Create</li>
                        </Link>
                        <Link
                            href="?section=Users"
                            scroll={false}
                            className={`flex items-center p-5 gap-5 font-bold rounded-lg hover:bg-gray-500 hover:text-gray-500 dark:hover:text-primary ${
                                querySection === 'Users'
                                    ? 'dark:text-primary bg-gray-500 text-gray-500'
                                    : 'text-gray-400'
                            }`}
                        >
                            <FaUsers size={20} />
                            <li>Users</li>
                        </Link>
                        <Link
                            href="?section=Queries"
                            scroll={false}
                            className={`flex items-center p-5 gap-5 font-bold rounded-lg hover:bg-gray-500 hover:text-gray-500 dark:hover:text-primary ${
                                querySection === 'Queries'
                                    ? 'dark:text-primary bg-gray-500 text-gray-500'
                                    : 'text-gray-400'
                            }`}
                        >
                            <div className="relative">
                                <AiFillNotification size={20} />
                                {query.length > 0 && (
                                    <span className="absolute w-3 h-3 bg-red-500 -top-1 -right-1 rounded-full text-[10px] flex items-center justify-center text-primary">
                                        {query.length}
                                    </span>
                                )}
                            </div>
                            <li>Queries</li>
                        </Link>
                        <li
                            className={`flex items-center p-5 gap-5 font-bold rounded-lg text-gray-400 hover:bg-gray-500 hover:text-gray-500 dark:hover:text-primary cursor-pointer`}
                            onClick={() => signOut({ redirectTo: '/' })}
                        >
                            <BiLogOutCircle size={20} />
                            Sign Out
                        </li>
                    </ul>
                </aside>
                <section className="bg-gray-200 dark:bg-slate-900 flex-1">
                    <Suspense fallback={<Loading />}>
                        <RenderSection
                            section={querySection}
                            events={events}
                            users={users}
                            currentUser={currentUser}
                            query={query}
                        />
                    </Suspense>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;
