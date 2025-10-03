import Link from 'next/link';
import EventCard from '../EventCard/EventCard';
import { eventGET } from '@/src/serverAction/eventAction';
import Button from '../Button';
import FiltersSection from '../FiltersSection/FiltersSection';

const UpcomingEvents = async () => {
    const data = await eventGET();
    const currentDate = new Date();
    let event = data;

    return (
        data.length > 0 && (
            <div className="flex flex-col h-fit relative justify-between selection:bg-main selection:text-white md:px-44 dark:bg-background dark:text-primary">
                <section className="flex flex-col w-full justify-center items-center">
                    {/* Filter Section */}

                    <div className="flex flex-col justify-between items-center mb-12 gap-10 md:gap-20">
                        <div className="w-full h-fit flex flex-col justify-center items-center md:justify-between mt-20 md:flex-row">
                            {/* Upcoming Events Heading */}
                            <h2 className="text-3xl w-fit sm:text-4xl md:text-5xl font-bold">
                                Upcoming Events
                            </h2>
                            <div className="w-2/4 hidden md:block lg:block">
                                <FiltersSection />
                            </div>
                        </div>
                        {/* Event Cards Section */}
                        <div className="grid grid-cols-1 w-full md:grid-cols-3 md:gap-24">
                            {Object.entries(event).map((event, index) => (
                                <EventCard
                                    key={index}
                                    title={event[1].name}
                                    image={event[1].thumbnail}
                                    date={event[1].start}
                                    description={event[1].shortDescription}
                                    price={event[1].price}
                                    category={event[1].category}
                                />
                            ))}
                        </div>
                    </div>
                    {/* View More Button */}
                </section>
                <div className="text-center mb-16">
                    <Link href="/events">
                        <Button text="View More" />
                    </Link>
                </div>
            </div>
        )
    );
};

export default UpcomingEvents;
