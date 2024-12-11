import Link from 'next/link';
import EventCard from '../EventCard/EventCard';
import { getEvents } from '@/serverAction/eventAction';

const UpcomingEvents = async () => {
    const data = await getEvents();
    const currentDate = new Date();
    let event = data.filter((event) => new Date(event.start) > currentDate);

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <section className="py-12 px-4 w-full max-w-7xl">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 text-center lg:text-left">
                        Upcoming Events
                    </h2>
                </div>

                {/* Event Cards Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
                    {Object.entries(event).map((event, index) => (
                        <EventCard
                            key={index}
                            title={event[1].name}
                            image={event[1].thumbnail}
                            data={event[1].start}
                            description={
                                event[1].description.length > 40
                                    ? event[1].description.substring(0, 40) +
                                      '...view more'
                                    : event[1].description
                            } // Truncate description to 50 characters
                        />
                    ))}
                </div>

                {/* View More Button */}
                <div className="text-center mt-8">
                    <Link
                        href="/events"
                        className="text-gray-800 border border-gray-500 py-2 px-8 mt-3 rounded-full hover:bg-gray-600 hover:border-gray-700 transition duration-300"
                    >
                        View More
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default UpcomingEvents;
