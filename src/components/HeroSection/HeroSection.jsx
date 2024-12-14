// components/HeroSection.jsx
import Carousel from '../Carousel/Carousel';
import { getEvents } from '@/src/serverAction/eventAction';

const HeroSection = async () => {
    const data = await getEvents();
    const currentDate = new Date();

    const upcomingEvents = data
        .filter((event) => new Date(event.start) > currentDate)
        .map((event) => ({
            id: event._id?.toString(),
            name: event.name,
            description: event.description,
            location: event.location,
            start: event.start,
        }));

    return (
        <section
            className="w-screen h-[85vh] md:h-[90vh] lg:h-screen text-white flex justify-center items-center"
            style={{
                background:
                    'url(/background.gif) no-repeat center center/cover',
            }}
        >
            <div className="w-full max-w-6xl px-4 md:px-8 pt-16 lg:pt-24">
                <Carousel events={upcomingEvents} />
            </div>
        </section>
    );
};

export default HeroSection;
