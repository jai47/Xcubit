'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const Carousel = ({ events }) => {
    console.log(events);
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
                        className="flex-none w-full h-full px-4 md:px-6 flex flex-col justify-center items-center bg-black"
                    >
                        <Image
                            src={event.image}
                            alt="upcoming event"
                            width={500}
                            height={500}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
