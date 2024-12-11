import Image from 'next/image';
import Link from 'next/link';

// components/EventCard.jsx
const EventCard = ({ image, date, title, description }) => {
    return (
        <Link href={`/events/${title}`}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out">
                {/* Event Image */}
                <Image
                    src={image}
                    width={400}
                    height={200}
                    alt={title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                />
                {/* Event Content */}
                <div className="p-6">
                    {/* Event Title and Date */}
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-xl text-gray-800">
                            {title}
                        </h3>
                        <p className="text-lg font-medium text-gray-600">
                            {date}
                        </p>
                    </div>
                    {/* Event Description */}
                    <p className="text-gray-600 text-sm mb-4">{description}</p>
                </div>
            </div>
        </Link>
    );
};

export default EventCard;
