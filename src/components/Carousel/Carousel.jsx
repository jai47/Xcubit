'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Carousel = ({ events }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [events.length]);

    return (
        <div className="relative w-full h-full overflow-hidden">
            {/* Carousel Content */}
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {events.map((event, index) => (
                    <div
                        key={index}
                        className="flex-none w-full h-full px-4 md:px-6 flex flex-col justify-between"
                    >
                        <h2 className="text-3xl md:text-2xl font-bold mb-4">
                            {event.name}
                        </h2>
                        <p className="text-sm md:text-base mb-4">
                            {event.description.length > 50
                                ? `${event.description.substring(0, 50)}...`
                                : event.description}
                        </p>
                        <p className="text-sm md:text-base mb-2">
                            Location: {event.location || 'N/A'}
                        </p>
                        {/* Date and Time */}
                        <p className="text-sm md:text-base  mb-2">
                            {new Date(event.start).toLocaleDateString('en-US', {
                                month: 'short',
                                day: '2-digit',
                            })}{' '}
                            |{' '}
                            {new Date(event.start).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                            })}
                        </p>
                        <Link href={`/events/${event.name}`}>
                            <button className="mt-4 border  text-white py-2 px-4 rounded-3xl hover:bg-gray-700 transition">
                                View Details
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
