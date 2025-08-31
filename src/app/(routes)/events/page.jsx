import Button from '@/src/components/Button';
import { getEvents } from '@/src/serverAction/eventAction';
import React from 'react';
import Navbar from '@/src/components/layout/NavbarHome';
import Footer from '@/src/components/layout/Footer';
import EventCard from '@/src/components/EventCard/EventCard'; // Import the EventCard component
import { auth } from '@/auth';
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

            <div className="min-h-screen py-16 px-6 sm:px-10 lg:px-20 mt-10 dark:bg-background dark:text-primary">
                {/* Heading Section */}
                <div className="text-center mb-12">
                    <p className="text-lg sm:text-xl">
                        Explore our latest and past events. Discover, register,
                        and relive the moments!
                    </p>
                </div>

                {/* Upcoming Events */}
                {upcomingEvents.length > 0 && (
                    <section className="mb-24">
                        <h2 className="text-2xl sm:text-3xl font-semibold text-primary mb-8">
                            Upcoming Events
                        </h2>
                        <div className="grid grid-cols-1 lg:gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10">
                            {upcomingEvents.map((event, index) => (
                                <div
                                    key={event._id}
                                    className="flex flex-wrap justify-center items-center rounded-lg hover:shadow-xl transition-shadow duration-300"
                                >
                                    <EventCard
                                        key={index}
                                        image={event.thumbnail}
                                        title={event.name}
                                        date={event.start}
                                        description={event.shortDescription}
                                        price={event.price}
                                        category={event.category}
                                    />
                                    <div className="p-4">
                                        {/* Buttons Side by Side */}
                                        <div className="flex justify-between items-center  space-x-4">
                                            <Link
                                                href={`/events/${event.name}`}
                                            >
                                                <Button text="Details" />
                                            </Link>
                                            <Link
                                                href={{
                                                    pathname: '/register',
                                                    query: {
                                                        event: `${event.name}`,
                                                    },
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
                {/* Past Events */}
                {pastEvents.length > 0 && (
                    <section>
                        <h2 className="text-2xl sm:text-3xl font-semibold text-primary mb-8">
                            Past Events
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10">
                            {pastEvents.map((event) => (
                                <div
                                    key={event._id}
                                    className="rounded-lg hover:shadow-xl transition-shadow duration-300"
                                >
                                    <EventCard
                                        image={event.image}
                                        date={event.start}
                                        title={event.name}
                                        description={event.description[0]}
                                        category={event.category}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* No Events Available */}
                {upcomingEvents.length === 0 && pastEvents.length === 0 && (
                    <div className="text-center text-primary">
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
