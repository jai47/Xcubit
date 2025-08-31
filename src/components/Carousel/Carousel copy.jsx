'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '../Button';

const Carousel = ({ events }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [events.length]);

    return (
        <div className="w-full h-full flex flex-col justify-center relative overflow-hidden">
            {/* Carousel Content */}
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {events.map((event, index) => (
                    <div
                        key={index}
                        className="flex-none w-full h-full px-4 md:px-6 flex flex-col justify-center items-center"
                    >
                        <h2
                            className="text-4xl md:text-6xl font-bold md:mb-10"
                            style={{
                                backgroundImage:
                                    'linear-gradient(-45deg,#F76E1F, #FBD860)',
                                color: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
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
                            <Button text={'View Details'} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
