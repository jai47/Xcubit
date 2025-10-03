import { getEventBySlug } from '@/src/serverAction/eventAction';
import React from 'react';
import Footer from '@/src/components/layout/Footer';
import FeaturedGuestsSection from '@/src/components/Details/FeaturedGuestsSection';
import HeroTimeRemaining from '@/src/components/Details/HeroTimeRamaining';
import Link from 'next/link';
import BookmarkButton from '@/src/components/Details/BookmarkButton';
import Navbar from '@/src/components/layout/NavbarHome';
import UpcomingEvents from '@/src/components/UpcomingEvents/UpcomingEvents';
import Image from '@/src/components/Image';
import NotFound from '@/src/app/not-found';

const Event = async (props) => {
    const params = await props.params;
    const data = await getEventBySlug(decodeURI(params.event[0]));
    if (!data) {
        return <NotFound />;
    }
    return (
        <>
            <Navbar />

            <div className="min-h-screen dark:bg-neutral-950 dark:text-primary bg-neutral-950 text-white">
                {/* Hero Section */}
                <div className="relative w-full h-[50vh] sm:h-[60vh]">
                    <Image
                        src={data.image}
                        alt={data.name}
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                        className="filter brightness-50"
                    />
                    <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-4">
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-blue-300 to-purple-300 drop-shadow-lg">
                            {data.name}
                        </h1>
                        <p className="text-gray-300 mt-2 sm:text-lg">
                            {data.category || 'National Event'}
                        </p>
                        <HeroTimeRemaining data={data.dateTime} />
                    </div>
                </div>

                {/* Event Info Panel */}
                <div className="p-6 shadow-lg rounded-lg md:mt-[-5rem] mx-4 sm:mx-8 lg:mx-16 xl:mx-24 relative bg-neutral-950 grid lg:grid-cols-3 gap-8">
                    {/* Event Logo & Location */}
                    <Link href={data.locationURL} target="_blank">
                        <div className="group flex flex-col items-center relative w-full h-60 overflow-hidden rounded-xl">
                            <Image
                                src={data.image}
                                alt="Event Location"
                                layout="fill"
                                objectFit="contain"
                                quality={100}
                                className="group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl cursor-pointer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 200 200"
                                    width="50px"
                                >
                                    <path
                                        fill="#ffffff"
                                        d="M100.232 149.198c-2.8 0-5.4-1.8-7.2-5.2-22.2-41-22.4-41.4-22.4-41.6-3.2-5.1-4.9-11.3-4.9-17.6 0-19.1 15.5-34.6 34.6-34.6s34.6 15.5 34.6 34.6c0 6.5-1.8 12.8-5.2 18.2 0 0-1.2 2.4-22.2 41-1.9 3.4-4.4 5.2-7.3 5.2zm.1-95c-16.9 0-30.6 13.7-30.6 30.6 0 5.6 1.5 11.1 4.5 15.9.6 1.3 16.4 30.4 22.4 41.5 2.1 3.9 5.2 3.9 7.4 0 7.5-13.8 21.7-40.1 22.2-41 3.1-5 4.7-10.6 4.7-16.3-.1-17-13.8-30.7-30.6-30.7z"
                                    />
                                    <path
                                        fill="#ffffff"
                                        d="M100.332 105.598c-10.6 0-19.1-8.6-19.1-19.1s8.5-19.2 19.1-19.2c10.6 0 19.1 8.6 19.1 19.1s-8.6 19.2-19.1 19.2zm0-34.3c-8.3 0-15.1 6.8-15.1 15.1s6.8 15.1 15.1 15.1 15.1-6.8 15.1-15.1-6.8-15.1-15.1-15.1z"
                                    />
                                </svg>
                                <span className="text-white mt-2">
                                    View Location
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* Event Details */}
                    <div className="flex flex-col justify-between">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h2 className="text-xs sm:text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-blue-300 to-purple-300 drop-shadow-lg">
                                    Event Name
                                </h2>
                                <p className="font-bold text-white sm:text-lg">
                                    {data.name}
                                </p>
                            </div>
                            <div>
                                <h2 className="text-xs sm:text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-blue-300 to-purple-300 drop-shadow-lg">
                                    Date
                                </h2>
                                <p className="font-bold text-white sm:text-lg">
                                    {new Date(data.dateTime).toDateString(
                                        'hi-IN'
                                    )}
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs sm:text-sm font-bold text-white">
                                {data.shortDescription}
                            </p>
                        </div>

                        <div className="mt-4">
                            <Link
                                href={{
                                    pathname: '/register',
                                    query: { event: data.slug },
                                }}
                            >
                                <button className="mt-4 px-6 py-3 font-bold rounded-full bg-gradient-to-r from-indigo-300 via-blue-300 to-purple-300 text-gray-800 hover:scale-105 transition-transform duration-300 shadow-lg">
                                    Register Now
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Extra Info */}
                    <div className="flex flex-col items-center justify-between">
                        <BookmarkButton
                            cookie={'bookmarks'}
                            value={data.name}
                        />
                        <div className="text-gray-400 text-sm mt-2">
                            Created:{' '}
                            {new Date(data.createdAt).toLocaleDateString()}{' '}
                            <br />
                            Updated:{' '}
                            {new Date(data.updatedAt).toLocaleDateString()}
                        </div>
                    </div>
                </div>

                {/* MultiSection: Description / Guests / Sponsors */}
                <div className="py-10 mx-4 sm:mx-8 lg:mx-16 xl:mx-24 relative bg-neutral-950">
                    <div
                        className="leading-relaxed text-white text-sm sm:text-base space-y-4 w-full md:w-4/5 mx-auto"
                        dangerouslySetInnerHTML={{ __html: data.description }}
                    />
                </div>

                {data.featureGuests && data.featureGuests.length > 0 && (
                    <FeaturedGuestsSection
                        featuredGuests={data.featureGuests}
                    />
                )}

                <UpcomingEvents />
            </div>

            <Footer />
        </>
    );
};

export default Event;
