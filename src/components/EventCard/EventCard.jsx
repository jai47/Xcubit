import Image from 'next/image';
import Link from 'next/link';
import Button from '../Button';

// components/EventCard.jsx
const EventCard = ({ image, date, title, description }) => {
    return (
        <Link href={`/events/${title}`}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
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
                <div className="p-4">
                    {/* Event Title and Date */}
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg text-gray-800">
                            {title}
                        </h3>
                        <p className="text-lg font-bold text-gray-700">
                            {date}
                        </p>
                    </div>
                    {/* Event Description */}
                    <p className="text-gray-600 text-sm">{description}</p>
                </div>
            </div>
        </Link>
    );
};

export default EventCard;
