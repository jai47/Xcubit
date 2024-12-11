import { getEventByName } from '@/serverAction/eventAction';
import React from 'react';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { auth } from '@/app/auth';
import Link from 'next/link';
import Image from 'next/image';

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

    function convertTo12HourFormat(time) {
        const [hours, minutes] = time.split(':');
        const hoursInt = parseInt(hours, 10);
        const period = hoursInt >= 12 ? 'PM' : 'AM';
        const hours12 = hoursInt % 12 || 12; // Converts 0 to 12 for 12-hour format
        return `${hours12}:${minutes} ${period}`;
    }

    return (
        <>
            <Navbar user={user} />
            <div className="min-h-screen bg-white sm:px-6 lg:px-12">
                {/* Header Section */}
                <div className="w-full h-[50svh] relative bg-white overflow-hidden">
                    {/* Image with overlay */}
                    <div className="w-full h-[70%] overflow-hidden flex justify-center items-center ">
                        {/* Overlay */}
                        <Image
                            src={data.image} // Replace with dynamic `data.image` when available
                            alt={data.name}
                            width={1920} // Adjust dimensions as per your layout
                            height={720}
                            layout="responsive" // Make the image responsive
                            priority // Ensure optimized loading for LCP
                        />
                    </div>
                    <div className="relative flex flex-col sm:flex-row justify-between sm:items-center sm:p-8 z-10">
                        <div>
                            <h1 className="text-4xl font-extrabold text-black">
                                {data.name}
                            </h1>
                            <p className="text-sm text-gray-800 mt-2">
                                {data.category}
                            </p>
                        </div>
                        <div className="mt-4 sm:mt-0">
                            <h1 className="text-xl font-bold text-black">
                                Total Participation
                            </h1>
                            <p className="text-sm text-gray-800 mt-2">
                                {data.maxParticipation}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Event Details */}
                <div className="mt-8 bg-white p-8 ">
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
                                    <strong>Duration: </strong> {data.duration}
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

                    {/* Get Tickets Button */}
                    <div className="mt-8 sm:mt-12 text-center">
                        <Link
                            href={{
                                pathname: '/register',
                                query: {
                                    event: `${data.name}`,
                                },
                            }}
                        >
                            <button className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition w-full sm:w-auto">
                                Get Tickets
                            </button>
                        </Link>
                    </div>

                    {/* Share Button */}
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-8">
                        <p className="text-gray-700 text-sm text-center">
                            Share this Event with your Friends and Family
                        </p>
                        <Link
                            href={
                                'whatsapp://send?text=' +
                                encodeURIComponent(
                                    `${process.env.NEXT_PUBLIC_BASE_URL}/events/${data.name}`
                                )
                            }
                            className="mt-2 flex justify-center text-blue-600 cursor-pointer"
                        >
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
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Event;
