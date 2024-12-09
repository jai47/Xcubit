import Button from '@/components/Button';
import { getEvents } from '@/serverAction/eventAction';
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EventCard from '@/components/EventCard/EventCard'; // Import the EventCard component
import { auth } from '@/app/auth';
import Link from 'next/link';

const Events = async () => {
    const session = await auth();
    const user = session?.user;
    const data = await getEvents();
    const currentDate = new Date();
    const upcomingEvents = data.filter(
        (event) => new Date(event.start) > currentDate
    );
    const pastEvents = data.filter(
        (event) => new Date(event.start) <= currentDate
    );

    return (
        <>
            <Navbar user={user} />

            <div className="min-h-screen bg-gray-50 py-8 px-6 sm:px-10 lg:px-20">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-800 mb-3">
                        Events
                    </h1>
                    <p className="text-1xl text-gray-600">
                        Explore our latest and past events. Discover, register,
                        and relive the moments!
                    </p>
                </div>

                {upcomingEvents.length > 0 && (
                    <section className="mb-24">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-8">
                            Upcoming Events
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            {upcomingEvents.map((event) => (
                                <div
                                    key={event._id}
                                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                                >
                                    <EventCard
                                        image={event.thumbnail}
                                        title={event.name}
                                        description={
                                            event.description.substring(
                                                0,
                                                100
                                            ) + '...'
                                        }
                                    />
                                    <div className="p-6">
                                        <div className="flex justify-between">
                                            <Link
                                                href={`/events/${event.name}`}
                                            >
                                                <Button text="View Details" />
                                            </Link>
                                            <Link
                                                href={{
                                                    pathname: '/register',
                                                    query: {
                                                        event: `${event.name}`,
                                                    }, // the data
                                                }}
                                            >
                                                <Button text="Register" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {pastEvents.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-semibold text-gray-800 mb-8">
                            Past Events
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            {pastEvents.map((event) => (
                                <div
                                    key={event._id}
                                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                                >
                                    <EventCard
                                        image={event.thumbnail}
                                        title={event.name}
                                        description={event.description}
                                    />
                                    <div className="p-6 text-center">
                                        <Link href={`/events/${event.name}`}>
                                            <Button text="View Details" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {upcomingEvents.length === 0 && pastEvents.length === 0 && (
                    <div className="text-center text-gray-600">
                        <p>
                            No events available at the moment. Please check back
                            later!
                        </p>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Events;
