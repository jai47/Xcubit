'use client';

import Button from '@/src/components/Button';
import Image from '@/src/components/Image';
import Tickets from '@/src/components/Tickets/Ticket';
import { updateForgotPasswordToken } from '@/src/serverAction/userAction';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Dashboard() {
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const querySection = searchParams.get('section') || 'Profile';
    const ticketQuery = searchParams.get('ticket');
    const [showModal, setShowModal] = useState({
        visible: false,
        message: '',
    });
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [profile, setProfile] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [bookmarkedEvents, setBookmarkedEvents] = useState([]);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        // Define an async function within the effect
        const fetchUserData = async () => {
            try {
                if (session?.user) {
                    const response = await fetch('/api/getUser', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email: session.user.email }),
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch user data');
                    }

                    const userData = await response.json();
                    setProfile(userData.user);

                    if (
                        querySection == 'My Tickets' &&
                        ticketQuery &&
                        userData.user?.events
                    ) {
                        const matchingEvent = userData.user.events.find(
                            (event) => event.name === ticketQuery
                        );
                        if (matchingEvent) {
                            setSelectedEvent(matchingEvent); // Preselect the ticket
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                // Access cookies only on the client side
                const cookie = document.cookie
                    .split('; ')
                    .find((row) => row.startsWith('bookmarks'));
                const events = cookie
                    ? JSON.parse(decodeURIComponent(cookie.split('=')[1]))
                    : [];
                setBookmarkedEvents(events);
            }
        };

        // Call the async function
        fetchUserData();
    }, [session, querySection, ticketQuery]);

    if (!session) {
        redirect('/api/auth/signin');
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const showTicket = (value) => {
        setSelectedEvent(value); // Correctly toggle visibility
    };

    const startTimer = () => {
        setTimer(60);
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // Render the content based on the active section
    const renderContent = () => {
        switch (querySection) {
            case 'Profile':
                return (
                    <div className="p-6 shadow-lg rounded-lg mx-auto">
                        <h2 className="text-2xl font-bold mb-6 border-b pb-2">
                            Profile
                        </h2>
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1 space-y-4">
                                <p className="  text-md">
                                    <strong className="font-semibold">
                                        Name:
                                    </strong>{' '}
                                    {session?.user?.name}
                                </p>
                                <p className="  text-md">
                                    <strong className="font-semibold">
                                        Email:
                                    </strong>{' '}
                                    {session?.user?.email}
                                </p>
                                {profile?.phone && (
                                    <p className="text-md">
                                        <strong className="font-semibold">
                                            Phone:
                                        </strong>{' '}
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="phone"
                                                value={profile?.phone}
                                                onChange={handleInputChange}
                                                className="border rounded px-2 py-1 w-full"
                                            />
                                        ) : (
                                            profile?.phone
                                        )}
                                    </p>
                                )}
                                {profile?.address && (
                                    <p className="text-md">
                                        <strong className="font-semibold">
                                            Address:
                                        </strong>{' '}
                                        {profile?.address}
                                    </p>
                                )}
                                {profile?.city && (
                                    <p className="text-md">
                                        <strong className="font-semibold">
                                            City:
                                        </strong>{' '}
                                        {profile?.city}
                                    </p>
                                )}
                                {profile?.state && (
                                    <p className="text-md">
                                        <strong className="font-semibold">
                                            State/Province:
                                        </strong>{' '}
                                        {profile?.state}
                                    </p>
                                )}
                                {profile?.postalCode && (
                                    <p className="  text-md">
                                        <strong className="font-semibold">
                                            Postal Code:
                                        </strong>{' '}
                                        {profile?.postalCode}
                                    </p>
                                )}
                                {profile?.country && (
                                    <p className="  text-md">
                                        <strong className="font-semibold">
                                            Country:
                                        </strong>{' '}
                                        {profile?.country}
                                    </p>
                                )}
                                {profile?.dateOfBirth && (
                                    <p className="  text-md">
                                        <strong className="font-semibold">
                                            Date of Birth:
                                        </strong>{' '}
                                        {new Date(
                                            profile?.dateOfBirth
                                        ).toDateString('hi-IN')}
                                    </p>
                                )}
                                {profile?.gender && (
                                    <p className="  text-md">
                                        <strong className="font-semibold">
                                            Gender:
                                        </strong>{' '}
                                        {profile?.gender}
                                    </p>
                                )}
                                {profile?.linkedInOrGithub && (
                                    <p className="  text-md">
                                        <strong className="font-semibold">
                                            LinkedIn/GitHub:
                                        </strong>{' '}
                                        <a
                                            href={profile?.linkedInOrGithub}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 font-medium hover:underline"
                                        >
                                            LinkedIn Profile
                                        </a>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                );

            case 'My Tickets':
                return (
                    <div className="p-6   shadow-lg rounded-lg mx-auto">
                        <h2 className="text-2xl font-bold mb-6 border-b pb-2  ">
                            My Tickets
                        </h2>
                        <div className="space-y-6">
                            {profile?.events.length !== 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {profile?.events.map((event, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col items-center justify-between p-6   border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                                        >
                                            <div className="text-center">
                                                <h3 className="text-xl font-semibold  ">
                                                    {event.name}
                                                </h3>
                                                <p className="text-sm   mt-1">
                                                    Date:{' '}
                                                    <span className="font-medium">
                                                        {event.date}
                                                    </span>
                                                </p>
                                            </div>
                                            <Button
                                                className="bg-primary text-background border uppercase text-sm border-black py-2 px-8 mt-3 rounded-full hover:bg-main hover:border-primary hover:text-primary transition-all"
                                                onClick={() =>
                                                    showTicket(event)
                                                }
                                                text="View Ticket"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="  text-lg">
                                    You have not registered for any events yet.
                                </p>
                            )}

                            {/* Render the selected ticket only if an event is selected */}
                            {selectedEvent && (
                                <Tickets
                                    ticketData={{
                                        eventTitle: selectedEvent.name,
                                        eventDate:
                                            selectedEvent.date + ' - 12:00 PM',
                                        attendeeName: profile?.name,
                                        email: profile?.email,
                                        contactNumber: profile?.phone,
                                        orderId: selectedEvent?.['Order Id'],
                                        ticketId: selectedEvent?.['Payment Id'],
                                        paymentMethod: 'Razorpay',
                                        venue: selectedEvent.location,
                                        mapLink: selectedEvent.locationUrl,
                                        teamMates: selectedEvent.teamMembers,
                                        email: profile?.email,
                                    }}
                                    showTicket={showTicket}
                                />
                            )}
                        </div>
                    </div>
                );

            case 'My Events':
                return (
                    <div className="p-6   shadow-lg rounded-lg mx-auto">
                        <h2 className="text-2xl font-bold mb-6 border-b pb-2  ">
                            My Events
                        </h2>
                        <div className="space-y-6">
                            {profile?.events.length !== 0 ? (
                                profile?.events.map((event, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-6   border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                                        >
                                            <div>
                                                <h3 className="text-xl font-semibold  ">
                                                    {event.name}
                                                </h3>
                                                <p className="text-sm   mt-1">
                                                    Status:{' '}
                                                    {new Date(event.date) >
                                                    new Date() ? (
                                                        <span className="font-medium text-green-600">
                                                            Upcoming
                                                        </span>
                                                    ) : (
                                                        <span className="font-medium text-blue-600">
                                                            Completed
                                                        </span>
                                                    )}
                                                </p>
                                            </div>
                                            <Link
                                                href={`/events/${event.name}`}
                                                className="mt-4 sm:mt-0 text-blue-500 font-medium px-4 py-2 rounded-full  hover:bg-neutral-300 transition duration-200"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="  text-lg">No registration</p>
                            )}
                        </div>
                    </div>
                );

            case 'Bookmarks':
                return (
                    <div className="p-6   shadow-lg rounded-lg mx-auto">
                        <h2 className="text-2xl font-bold mb-6 border-b pb-2  ">
                            Bookmarks
                        </h2>
                        <div className="space-y-6">
                            {bookmarkedEvents.length > 0 ? (
                                bookmarkedEvents.map((event, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-6   border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                                    >
                                        <div>
                                            <h3 className="text-xl font-semibold  ">
                                                {event}
                                            </h3>
                                        </div>
                                        <Link
                                            href={`/events/${event}`}
                                            className="mt-4 sm:mt-0 text-blue-500 font-medium px-4 py-2 rounded-full hover:bg-neutral-300 transition duration-200"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p className="  text-lg">
                                    You have not bookmarked any events yet.
                                </p>
                            )}
                        </div>
                    </div>
                );

            case 'Settings':
                return (
                    <div className="p-6   shadow-lg rounded-lg mx-auto">
                        <h2 className="text-2xl font-bold mb-6 border-b pb-2  ">
                            Settings
                        </h2>
                        <div className="space-y-6">
                            {/* Notifications Toggle */}
                            <div className="flex justify-between items-center p-4   border border-gray-200 rounded-lg shadow-md">
                                <p className="text-lg font-medium  ">
                                    Email Notifications
                                </p>
                                <label className="relative flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                    />
                                    <div className="flex justify-start items-center  px-1 w-10 h-6 bg-gray-300 rounded-full shadow-inner peer-checked:bg-slate-800 peer-checked:justify-end transition duration-200">
                                        <div className="w-4 h-4 bg-white rounded-full shadow-sm shadow-slate-400 transform peer-checked:translate-x-4 transition duration-200"></div>
                                    </div>
                                </label>
                            </div>
                            <div className="flex justify-between items-center p-4   border border-gray-200 rounded-lg shadow-md">
                                <p className="text-lg font-medium  ">
                                    Clear Bookmarks
                                </p>
                                <label className="relative flex items-center cursor-pointer">
                                    <button
                                        className="w-full h-[50px] bg-main text-white px-10 rounded-full transition-all duration-300 dark:bg-background dark:hover:bg-main dark:border dark:border-primary"
                                        onClick={() => {
                                            try {
                                                document.cookie =
                                                    'bookmarks=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                                                alert('Bookmarks cleared');
                                            } catch (error) {
                                                alert(
                                                    'Error clearing bookmarks:',
                                                    error
                                                );
                                            }
                                        }}
                                    >
                                        Clear
                                    </button>
                                </label>
                            </div>
                            {/* Change Password Button */}
                            {showModal?.visible && (
                                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-10">
                                    <div className="bg-white p-6 rounded-lg shadow-lg relative w-11/12 max-w-md">
                                        {/* Close Button */}
                                        <button
                                            onClick={() =>
                                                setShowModal({
                                                    visible: false,
                                                    message: '',
                                                })
                                            }
                                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                                            aria-label="Close"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>

                                        {/* Modal Content */}
                                        <div className="text-center">
                                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                                Password Reset Link Sent!
                                            </h2>
                                            <p className="text-gray-600">
                                                {showModal?.message}
                                            </p>
                                            <button
                                                onClick={() =>
                                                    setShowModal({
                                                        visible: false,
                                                        message: '',
                                                    })
                                                }
                                                className="mt-6 px-4 py-2 bg-blue-600   rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
                                            >
                                                OK
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="flex w-full justify-end gap-3">
                                {/* Resend Verification Email */}
                                {profile && !profile?.verified && (
                                    <button
                                        onClick={async () => {
                                            if (timer > 0) return; // Prevent clicking while timer is active
                                            try {
                                                await fetch(
                                                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/mail`,
                                                    {
                                                        method: 'POST',
                                                        headers: {
                                                            'Content-Type':
                                                                'application/json',
                                                        },
                                                        body: JSON.stringify({
                                                            email: profile.email,
                                                            subject: `Welcome to the community, ${profile.name}`,
                                                            message: {
                                                                name: profile.name,
                                                                verifyLink: `${process.env.NEXT_PUBLIC_BASE_URL}/verify/${profile.verifyToken}`,
                                                                contactEmail:
                                                                    'helpdesk@xcubit.in',
                                                            },
                                                            type: 'verify',
                                                        }),
                                                    }
                                                );
                                                setShowModal({
                                                    visible: true,
                                                    message:
                                                        'A verification link has been sent to your registered email. Please check your inbox and follow the instructions.',
                                                });
                                                startTimer(); // Start the timer
                                            } catch (error) {
                                                setShowModal({
                                                    visible: true,
                                                    message: error.message,
                                                });
                                            }
                                        }}
                                        className={`text-green-600 border border-green-600 font-medium px-6 py-3 rounded-full ${
                                            timer === 0
                                                ? 'hover:bg-green-300 transition duration-200'
                                                : 'opacity-50 cursor-not-allowed'
                                        }`}
                                        disabled={timer > 0} // Disable button if timer is active
                                    >
                                        {timer > 0
                                            ? `Resend in ${timer}s`
                                            : 'Send Verify Link Again'}
                                    </button>
                                )}
                                <button
                                    onClick={async () => {
                                        try {
                                            const { msg, sucess } =
                                                await updateForgotPasswordToken(
                                                    session?.user?.email
                                                );

                                            if (!sucess) {
                                                setShowModal({
                                                    visible: true,
                                                    message: msg,
                                                });
                                                return;
                                            }
                                            setShowModal({
                                                visible: true,
                                                message: msg,
                                            });
                                        } catch (error) {
                                            setShowModal({
                                                visible: true,
                                                message: error.message,
                                            });
                                        }
                                    }}
                                    className="text-red-600 border border-red-600 font-medium px-6 py-3 rounded-full hover:bg-red-100 transition duration-200"
                                >
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </div>
                );

            default:
                return <div>Select a section from the sidebar</div>;
        }
    };

    return (
        <>
            {profile && !profile?.verified && (
                <div className="w-full bg-red-500 text-xs text-center p-1">
                    <p>Account not verified</p>
                    <p>Check your email for verification link</p>
                </div>
            )}

            <div className="flex flex-col lg:flex-row h-screen dark:bg-background dark:text-primary">
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
                        isSidebarOpen
                            ? 'fixed h-full w-4/5 left-0 top-0'
                            : 'hidden'
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

                {/* Main Content */}
                <div className="flex-1 pt-10 p-6">{renderContent()}</div>
            </div>
        </>
    );
}
