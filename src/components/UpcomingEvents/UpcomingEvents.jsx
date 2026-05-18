import Link from 'next/link';
import Image from 'next/image';
import { eventGET } from '@/src/serverAction/eventAction';
import Button from '../Button';

const UpcomingEvents = async ({ currentEvent }) => {
    const { data } = await eventGET();
    const currentDate = new Date();
    const upcomingEvents = data?.filter(
        (event) =>
            new Date(event?.dateTime) > currentDate &&
            event.slug !== currentEvent?.slug
    );

    if (!upcomingEvents || upcomingEvents.length === 0) return null;

    return (
        <div className="flex flex-col h-fit relative justify-between md:px-16 lg:px-24 xl:px-32 py-20 bg-neutral-950 text-white dark:bg-neutral-950 dark:text-primary">
            {/* Section Header */}
            <section className="flex flex-col w-full justify-center items-center">
                <div className="flex flex-col justify-between items-center mb-16 gap-8">
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-blue-300 to-purple-300 drop-shadow-lg">
                        Upcoming Events
                    </h2>
                    <p className="text-gray-400 text-xs sm:text-base text-center max-w-2xl">
                        Discover upcoming events and opportunities. Stay ahead
                        and don’t miss out on exciting experiences.
                    </p>
                </div>

                {/* Event Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {upcomingEvents.map((event, index) => (
                        <Link
                            key={index}
                            href={`/events/${event.slug}`}
                            className="group relative flex flex-col justify-between h-[320px] w-4/5 overflow-hidden rounded-2xl shadow-lg border border-white/10 bg-neutral-900 hover:scale-[1.02] transition-transform duration-300"
                        >
                            {/* Event Image */}
                            <div className="relative h-2/3 w-full overflow-hidden">
                                <Image
                                    src={event.image || '/promo1.jpg'}
                                    alt={event.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    quality={80}
                                />
                                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <span className="text-white font-semibold text-sm uppercase tracking-wider">
                                        View Details
                                    </span>
                                </div>
                            </div>

                            {/* Event Info */}
                            <div className="flex flex-col justify-between p-5">
                                <p className="text-xs text-gray-400 mb-2">
                                    {new Date(event.dateTime).toDateString(
                                        'hi-IN'
                                    )}
                                </p>
                                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">
                                    {event.name}
                                </h3>
                                <p className="text-sm text-gray-300 line-clamp-2 mb-4">
                                    {event.shortDescription ||
                                        'Exciting event awaits you!'}
                                </p>

                                <div className="flex items-center justify-between">
                                    <span className="text-xs uppercase font-semibold text-gray-300 group-hover:text-indigo-300 transition-colors">
                                        View details
                                    </span>
                                    <svg
                                        width="24"
                                        height="20"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        className="fill-indigo-300 group-hover:translate-x-1 transition-transform duration-300"
                                    >
                                        <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* View More Button */}
            <div className="text-center mt-16">
                <Link href="/events">
                    <div className="relative group inline-block">
                        <button className="relative px-8 py-3 font-bold text-black text-xs rounded-full overflow-hidden bg-gradient-to-r from-indigo-300 via-blue-300 to-purple-300 transition-all duration-300 group-hover:scale-105 group-hover:text-white">
                            {/* Animated Gradient Border */}
                            <span className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-indigo-300 via-blue-300 to-purple-300 animate-gradient-border opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <span className="block h-full w-full rounded-full bg-neutral-950"></span>
                            </span>

                            {/* Button Text Layer */}
                            <span className="relative lowercase">
                                View More
                            </span>
                        </button>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default UpcomingEvents;
