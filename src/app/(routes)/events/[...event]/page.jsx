import { getEventByName } from '@/serverAction/eventAction';
import React from 'react';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { auth } from '@/app/auth';
import Link from 'next/link';

// Metadata for SEO
export async function generateMetadata(props) {
    const params = await props.params;
    return {
        title: `${decodeURI(params.event).split(' ')[0]} | VIEF`,
        description: `Event: ${params.event}`,
    };
}

const Event = async (props) => {
    const session = await auth();
    const user = session?.user;
    const params = await props.params;
    const data = await getEventByName(decodeURI(params.event[0]));
    // Mock Similar Events (replace with API data if available)
    const similarEvents = [
        {
            id: 1,
            name: 'Saturday Live by Sunitha Upadrasta',
            image: '/images/event1.jpg',
        },
        {
            id: 2,
            name: 'Alan Walker India Tour - Hyderabad',
            image: '/images/event2.jpg',
        },
        {
            id: 3,
            name: 'The One Artist - Jasleen Royal',
            image: '/images/event3.jpg',
        },
        { id: 4, name: 'Papon Live in Hyderabad', image: '/images/event4.jpg' },
    ];

    function convertTo12HourFormat(time) {
        const [hours, minutes] = time.split(':');
        const hoursInt = parseInt(hours, 10);
        const period = hoursInt >= 12 ? 'PM' : 'AM';
        const hours12 = hoursInt % 12 || 12; // Converts 0 to 12 for 12-hour format
        return `${hours12}:${minutes} ${period}`;
    }
    function calculateRunTime(start, end) {
        // Convert start and end times to Date objects
        const startTime = new Date(start); // Example: "2024-11-29T14:00:00"
        const endTime = new Date(end); // Example: "2024-11-29T17:30:00"

        // Calculate the difference in milliseconds
        const duration = endTime - startTime;

        // Convert duration to hours and minutes
        const hours = Math.floor(duration / (1000 * 60 * 60)); // Total hours
        const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60)); // Remaining minutes

        // Format output
        return `${hours} Hour${hours !== 1 ? 's' : ''} ${minutes} Minute${
            minutes !== 1 ? 's' : ''
        }`;
    }

    return (
        <>
            <Navbar user={user} />
            <div className="min-h-screen bg-gray-100 sm:px-6 lg:px-12">
                {/* Header Section */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img
                        src={data.image} // Replace with dynamic `data.image` when available
                        alt={data.name}
                        className="w-full h-60 object-cover"
                    />
                    <div className="p-8">
                        <h1 className="text-3xl font-bold text-gray-800">
                            {data.name}
                        </h1>
                        <p className="text-sm text-gray-500 mt-2">
                            {data.category}
                        </p>
                    </div>
                </div>

                {/* Event Details */}
                <div className="mt-8 bg-white p-8 rounded-lg shadow-lg relative">
                    {/* Header */}
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">
                        <span className="text-3xl font-bold text-gray-800">
                            {data.name}
                        </span>
                        <p className="text-sm text-gray-500 mt-2">
                            {data.category}
                        </p>
                    </h1>

                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Section: Event Information */}
                        <div className="space-y-6">
                            {/* Date */}
                            <div className="flex items-center gap-4">
                                <div className="text-blue-600">
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
                                            strokeWidth={2}
                                            d="M8 7V3m8 4V3M3 10h18M5 21h14a2 2 0 002-2v-7H3v7a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <p className="text-gray-700 text-lg">
                                    <strong>Date:</strong>{' '}
                                    {new Date(data.start).toDateString()}
                                </p>
                            </div>

                            {/* Start Time */}
                            <div className="flex items-center gap-4">
                                <div className="text-blue-600">
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
                                            strokeWidth={2}
                                            d="M12 8c-1.658 0-3 1.342-3 3s1.342 3 3 3 3-1.342 3-3-1.342-3-3-3zm0 10c4.418 0 8-3.582 8-8S16.418 2 12 2 4 5.582 4 10s3.582 8 8 8z"
                                        />
                                    </svg>
                                </div>
                                <p className="text-gray-700 text-lg">
                                    <strong>Start Time:</strong>{' '}
                                    {convertTo12HourFormat(data.time)}
                                </p>
                            </div>

                            {/* Run Time */}
                            <div className="flex items-center gap-4">
                                <div className="text-blue-600">
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
                                            strokeWidth={2}
                                            d="M8 12H6a2 2 0 01-2-2V7a2 2 0 012-2h2M16 12h2a2 2 0 002-2V7a2 2 0 00-2-2h-2m-6 8h4m-2 4v1m0 3v-1m0-4h-2m4 0h2"
                                        />
                                    </svg>
                                </div>
                                <p className="text-gray-700 text-lg">
                                    <strong>Run Time:</strong>{' '}
                                    {calculateRunTime(data.start, data.end)}
                                </p>
                            </div>
                            {/* Venue */}
                            <div>
                                <p className="text-gray-700 text-lg">
                                    <strong>Venue:</strong> {data.location}
                                </p>
                            </div>

                            {/* View on Map Button */}
                            <button className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition">
                                <a
                                    href={data.locationURL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View on Map
                                </a>
                            </button>
                        </div>
                    </div>

                    {/* About the Event */}
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            About the Event
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            {data.description}
                        </p>
                    </div>
                    {/* Button Container */}
                    <div className="absolute top-8 right-8 space-y-4">
                        {/* Get Tickets Button */}
                        <Link
                            href={{
                                pathname: '/register',
                                query: {
                                    event: `${data.name}`,
                                }, // the data// the data
                            }}
                        >
                            <button className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition w-full">
                                Get Tickets
                            </button>
                        </Link>

                        {/* Share Button */}
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <p className="text-gray-700 text-sm text-center">
                                Share this Event with your Friends and Family
                            </p>
                            <div className="mt-2 flex justify-center text-blue-600 cursor-pointer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 12v8m0 0h8m-8 0l12-12M8 4h8m-4 0V8"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Get Tickets Button */}
                <div className="mt-8 flex justify-center">
                    <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
                        Get Tickets
                    </button>
                </div>

                {/* Similar Events */}
                <div className="mt-16 bg-gray-50 p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                        Similar Events
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {similarEvents.map((event) => (
                            <div
                                key={event.id}
                                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                            >
                                {/* Event Image */}
                                <img
                                    src="/logo/ideathon.jpeg" // Replace with dynamic `event.image` when available
                                    alt={event.name}
                                    className="w-full h-48 object-cover"
                                />

                                {/* Event Details */}
                                <div className="p-4 flex flex-col items-center text-center flex-1">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                                        {event.name}
                                    </h3>
                                    <button className="mt-auto px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Event;
