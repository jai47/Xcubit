'use client';

import Image from '@/src/components/Image';
import Navbar from '@/src/components/layout/Navbar';
import Tickets from '@/src/components/Tickets/Ticket';
import { updateForgotPasswordToken } from '@/src/serverAction/userAction';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Dashboard() {
    const { data: session } = useSession();
    if (!session) {
        redirect('/api/auth/signin');
    }
    const searchParams = useSearchParams();
    const querySection = searchParams.get('section') || 'Profile';
    const ticketQuery = searchParams.get('ticket');
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
                        userData.user.events
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
            }
        };

        // Call the async function
        fetchUserData();
    }, [session, querySection, ticketQuery]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const showTicket = (value) => {
        setSelectedEvent(value); // Correctly toggle visibility
    };

    // Render the content based on the active section
    const renderContent = () => {
        switch (querySection) {
            case 'Profile':
                return (
                    <div className="p-6 bg-white shadow-lg rounded-lg mx-auto">
                        <h2 className="text-2xl font-bold mb-6 border-b pb-2">
                            Profile
                        </h2>
                        <div className="flex flex-col md:flex-row gap-6">
                            <Image
                                src={
                                    profile?.image ||
                                    `${process.env.NEXT_PUBLIC_BASE_URL}/avatar/default.png`
                                }
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover border-2 border-gray-200 shadow-md mx-auto md:mx-0"
                                width={128}
                                height={128}
                            />
                            <div className="flex-1 space-y-4">
                                <p className="text-gray-700 text-lg">
                                    <strong className="font-semibold">
                                        Name:
                                    </strong>{' '}
                                    {session?.user?.name}
                                </p>
                                <p className="text-gray-700 text-lg">
                                    <strong className="font-semibold">
                                        Email:
                                    </strong>{' '}
                                    {session?.user?.email}
                                </p>
                                {profile?.phone && (
                                    <p className="text-gray-700 text-lg">
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
                                    <p className="text-gray-700 text-lg">
                                        <strong className="font-semibold">
                                            Address:
                                        </strong>{' '}
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="address"
                                                value={profile?.address}
                                                onChange={handleInputChange}
                                                className="border rounded px-2 py-1 w-full"
                                            />
                                        ) : (
                                            profile?.address
                                        )}
                                    </p>
                                )}
                                {profile?.city && (
                                    <p className="text-gray-700 text-lg">
                                        <strong className="font-semibold">
                                            City:
                                        </strong>{' '}
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="city"
                                                value={profile?.city}
                                                onChange={handleInputChange}
                                                className="border rounded px-2 py-1 w-full"
                                            />
                                        ) : (
                                            profile?.city
                                        )}
                                    </p>
                                )}
                                {profile?.state && (
                                    <p className="text-gray-700 text-lg">
                                        <strong className="font-semibold">
                                            State/Province:
                                        </strong>{' '}
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="state"
                                                value={profile?.state}
                                                onChange={handleInputChange}
                                                className="border rounded px-2 py-1 w-full"
                                            />
                                        ) : (
                                            profile?.state
                                        )}
                                    </p>
                                )}
                                {profile?.postalCode && (
                                    <p className="text-gray-700 text-lg">
                                        <strong className="font-semibold">
                                            Postal Code:
                                        </strong>{' '}
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="postalCode"
                                                value={profile?.postalCode}
                                                onChange={handleInputChange}
                                                className="border rounded px-2 py-1 w-full"
                                            />
                                        ) : (
                                            profile?.postalCode
                                        )}
                                    </p>
                                )}
                                {profile?.country && (
                                    <p className="text-gray-700 text-lg">
                                        <strong className="font-semibold">
                                            Country:
                                        </strong>{' '}
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="country"
                                                value={profile?.country}
                                                onChange={handleInputChange}
                                                className="border rounded px-2 py-1 w-full"
                                            />
                                        ) : (
                                            profile?.country
                                        )}
                                    </p>
                                )}
                                {profile?.dateOfBirth && (
                                    <p className="text-gray-700 text-lg">
                                        <strong className="font-semibold">
                                            Date of Birth:
                                        </strong>{' '}
                                        {isEditing ? (
                                            <input
                                                type="date"
                                                name="dateOfBirth"
                                                value={profile?.dateOfBirth}
                                                onChange={handleInputChange}
                                                className="border rounded px-2 py-1 w-full"
                                            />
                                        ) : (
                                            new Date(
                                                profile?.dateOfBirth
                                            ).toDateString('hi-IN')
                                        )}
                                    </p>
                                )}
                                {profile?.gender && (
                                    <p className="text-gray-700 text-lg">
                                        <strong className="font-semibold">
                                            Gender:
                                        </strong>{' '}
                                        {isEditing ? (
                                            <select
                                                name="gender"
                                                value={profile?.gender}
                                                onChange={handleInputChange}
                                                className="border rounded px-2 py-1 w-full"
                                            >
                                                <option value="Male">
                                                    Male
                                                </option>
                                                <option value="Female">
                                                    Female
                                                </option>
                                                <option value="Other">
                                                    Other
                                                </option>
                                            </select>
                                        ) : (
                                            profile?.gender
                                        )}
                                    </p>
                                )}
                                {profile?.linkedInOrGithub && (
                                    <p className="text-gray-700 text-lg">
                                        <strong className="font-semibold">
                                            LinkedIn/GitHub:
                                        </strong>{' '}
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="linkedInOrGithub"
                                                value={
                                                    profile?.linkedInOrGithub
                                                }
                                                onChange={handleInputChange}
                                                className="border rounded px-2 py-1 w-full"
                                            />
                                        ) : (
                                            <a
                                                href={profile?.linkedInOrGithub}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 font-medium hover:underline"
                                            >
                                                LinkedIn Profile
                                            </a>
                                        )}
                                    </p>
                                )}
                                <button
                                    className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full shadow hover:bg-blue-600"
                                    onClick={toggleEditing}
                                >
                                    {isEditing
                                        ? 'Update Profile'
                                        : 'Edit Profile'}
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'My Tickets':
                return (
                    <div className="p-6 bg-white shadow-lg rounded-lg mx-auto">
                        <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-gray-800">
                            My Tickets
                        </h2>
                        <div className="space-y-6">
                            {profile?.events ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {profile?.events.map((event, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col items-center justify-between p-6 bg-gray-100 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                                        >
                                            <div className="text-center">
                                                <h3 className="text-xl font-semibold text-gray-800">
                                                    {event.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    Date:{' '}
                                                    <span className="font-medium">
                                                        {event.date}
                                                    </span>
                                                </p>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    showTicket(event)
                                                }
                                                className="mt-4 text-white bg-slate-600 px-4 py-2 rounded-full shadow hover:bg-neutral-600 transition-colors duration-200"
                                            >
                                                View Ticket
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-700 text-lg">
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
                                        eventDescription:
                                            selectedEvent.description.substring(
                                                0,
                                                100
                                            ) + '...',
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
                    <div className="p-6 bg-white shadow-lg rounded-lg mx-auto">
                        <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-gray-800">
                            My Events
                        </h2>
                        <div className="space-y-6">
                            {profile?.events ? (
                                profile?.events.map((event, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-6 bg-gray-100 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                                        >
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-800">
                                                    {event.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 mt-1">
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
                                                className="mt-4 sm:mt-0 text-blue-500 font-medium px-4 py-2 rounded-full hover:underline hover:bg-neutral-300 transition duration-200"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-gray-700 text-lg">
                                    No registration
                                </p>
                            )}
                        </div>
                    </div>
                );

            case 'Settings':
                return (
                    <div className="p-6 bg-white shadow-lg rounded-lg mx-auto">
                        <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-gray-800">
                            Settings
                        </h2>
                        <div className="space-y-6">
                            {/* Notifications Toggle */}
                            <div className="flex justify-between items-center p-4 bg-gray-100 border border-gray-200 rounded-lg shadow-md">
                                <p className="text-lg font-medium text-gray-800">
                                    Email Notifications
                                </p>
                                <label className="relative flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                    />
                                    <div className="flex justify-start items-center  px-1 w-10 h-6 bg-gray-300 rounded-full shadow-inner peer-checked:bg-green-500 peer-checked:justify-end transition duration-200">
                                        <div className="w-4 h-4 bg-white rounded-full shadow-sm shadow-slate-400 transform peer-checked:translate-x-4 transition duration-200"></div>
                                    </div>
                                </label>
                            </div>
                            <div className="flex-1 space-y-4">
                                <p className="text-gray-700 text-lg">
                                    <strong className="font-semibold">
                                        Name:
                                    </strong>{' '}
                                    {session?.user?.name}
                                </p>
                                <p className="text-gray-700 text-lg">
                                    <strong className="font-semibold">
                                        Email:
                                    </strong>{' '}
                                    {session?.user?.email}
                                </p>
                                {profile?.phone && (
                                    <p className="text-gray-700 text-lg">
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
                                    <p className="text-gray-700 text-lg">
                                        <strong className="font-semibold">
                                            Address:
                                        </strong>{' '}
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="address"
                                                value={profile?.address}
                                                onChange={handleInputChange}
                                                className="border rounded px-2 py-1 w-full"
                                            />
                                        ) : (
                                            profile?.address
                                        )}
                                    </p>
                                )}
                                {profile?.city && (
                                    <p className="text-gray-700 text-lg">
                                        <strong className="font-semibold">
                                            City:
                                        </strong>{' '}
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="city"
                                                value={profile?.city}
                                                onChange={handleInputChange}
                                                className="border rounded px-2 py-1 w-full"
                                            />
                                        ) : (
                                            profile?.city
                                        )}
                                    </p>
                                )}
                                {profile?.state && (
                                    <p className="text-gray-700 text-lg">
                                        <strong className="font-semibold">
                                            State/Province:
                                        </strong>{' '}
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="state"
                                                value={profile?.state}
                                                onChange={handleInputChange}
                                                className="border rounded px-2 py-1 w-full"
                                            />
                                        ) : (
                                            profile?.state
                                        )}
                                    </p>
                                )}
                                {profile?.postalCode && (
                                    <p className="text-gray-700 text-lg">
                                        <strong className="font-semibold">
                                            Postal Code:
                                        </strong>{' '}
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="postalCode"
                                                value={profile?.postalCode}
                                                onChange={handleInputChange}
                                                className="border rounded px-2 py-1 w-full"
                                            />
                                        ) : (
                                            profile?.postalCode
                                        )}
                                    </p>
                                )}
                                {profile?.country && (
                                    <p className="text-gray-700 text-lg">
                                        <strong className="font-semibold">
                                            Country:
                                        </strong>{' '}
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="country"
                                                value={profile?.country}
                                                onChange={handleInputChange}
                                                className="border rounded px-2 py-1 w-full"
                                            />
                                        ) : (
                                            profile?.country
                                        )}
                                    </p>
                                )}
                                {profile?.dateOfBirth && (
                                    <p className="text-gray-700 text-lg">
                                        <strong className="font-semibold">
                                            Date of Birth:
                                        </strong>{' '}
                                        {isEditing ? (
                                            <input
                                                type="date"
                                                name="dateOfBirth"
                                                value={profile?.dateOfBirth}
                                                onChange={handleInputChange}
                                                className="border rounded px-2 py-1 w-full"
                                            />
                                        ) : (
                                            new Date(
                                                profile?.dateOfBirth
                                            ).toDateString('hi-IN')
                                        )}
                                    </p>
                                )}
                                {profile?.gender && (
                                    <p className="text-gray-700 text-lg">
                                        <strong className="font-semibold">
                                            Gender:
                                        </strong>{' '}
                                        {isEditing ? (
                                            <select
                                                name="gender"
                                                value={profile?.gender}
                                                onChange={handleInputChange}
                                                className="border rounded px-2 py-1 w-full"
                                            >
                                                <option value="Male">
                                                    Male
                                                </option>
                                                <option value="Female">
                                                    Female
                                                </option>
                                                <option value="Other">
                                                    Other
                                                </option>
                                            </select>
                                        ) : (
                                            profile?.gender
                                        )}
                                    </p>
                                )}
                                {profile?.linkedInOrGithub && (
                                    <p className="text-gray-700 text-lg">
                                        <strong className="font-semibold">
                                            LinkedIn/GitHub:
                                        </strong>{' '}
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="linkedInOrGithub"
                                                value={
                                                    profile?.linkedInOrGithub
                                                }
                                                onChange={handleInputChange}
                                                className="border rounded px-2 py-1 w-full"
                                            />
                                        ) : (
                                            <a
                                                href={profile?.linkedInOrGithub}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 font-medium hover:underline"
                                            >
                                                LinkedIn Profile
                                            </a>
                                        )}
                                    </p>
                                )}
                                <button
                                    className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full shadow hover:bg-blue-600"
                                    onClick={toggleEditing}
                                >
                                    {isEditing
                                        ? 'Update Profile'
                                        : 'Edit Profile'}
                                </button>
                            </div>
                            {/* Change Password Button */}
                            {showModal && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                    <div className="bg-white p-6 rounded-lg shadow-lg relative w-11/12 max-w-md">
                                        {/* Close Button */}
                                        <button
                                            onClick={() =>
                                                setShowModal(!showModal)
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
                                                A password-changing link has
                                                been sent to your registered
                                                email. Please check your inbox
                                                and follow the instructions.
                                            </p>
                                            <button
                                                onClick={() =>
                                                    setShowModal(!showModal)
                                                }
                                                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
                                            >
                                                OK
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="text-right">
                                <button
                                    onClick={async () => {
                                        await updateForgotPasswordToken(
                                            session?.user?.email
                                        );
                                        setShowModal(true);
                                    }}
                                    className="bg-red-500 text-white font-medium px-6 py-3 rounded-full shadow hover:bg-red-600 transition duration-200"
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
            <Navbar user={session?.user} />
            {!profile?.verified && (
                <div className="w-full bg-red-500 text-xs text-white text-center p-1">
                    <p>Account not verified</p>
                    <p>Check your email for verification link</p>
                </div>
            )}
            <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
                {/* Sidebar Toggle Button (Hamburger) */}
                <div className="lg:hidden p-4">
                    <button
                        onClick={toggleSidebar}
                        className="text-gray-600 focus:outline-none"
                    >
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
                </div>

                {/* Sidebar */}
                <div
                    className={`lg:w-64 bg-white shadow-lg lg:block ${
                        isSidebarOpen ? 'fixed h-full w-4/5 right-0' : 'hidden'
                    } lg:block`}
                >
                    <div className="p-6 text-center border-b">
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
                        <p className="text-sm text-gray-500">
                            {session?.user?.email}
                        </p>
                    </div>
                    <nav className="mt-4">
                        <ul>
                            {[
                                'Profile',
                                'My Tickets',
                                'My Events',
                                'Settings',
                            ].map((item) => (
                                <Link
                                    href={{
                                        pathname: '/dashboard',
                                        query: { section: item },
                                    }}
                                    key={item}
                                >
                                    <li
                                        className={`w-full px-6 py-3 text-left hover:bg-gray-100 ${
                                            querySection === item
                                                ? 'bg-gray-100'
                                                : ''
                                        }`}
                                    >
                                        {item}
                                    </li>
                                </Link>
                            ))}
                            <li className="w-full flex items-center pr-5">
                                <button
                                    className="w-full px-6 py-3 text-left text-red-500 hover:bg-gray-100"
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
                <div className="flex-1 p-6">{renderContent()}</div>
            </div>
        </>
    );
}
