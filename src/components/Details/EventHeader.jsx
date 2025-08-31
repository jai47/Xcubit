'use client'; // Ensures that this component is rendered client-side in Next.js

import Image from 'next/image';
import HeroTimeRemaining from './HeroTimeRamaining';
// Assuming this is another component you have

const EventHeader = ({ data }) => {
    return (
        <div className="relative w-full h-[50vh] sm:h-[60vh] hidden sm:block">
            <div className="absolute inset-0">
                <Image
                    src={data.image}
                    alt={data.name}
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center">
                    <div className="text-center px-4">
                        <h2
                            className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text"
                            style={{
                                backgroundImage:
                                    'linear-gradient(-45deg, rgb(247, 110, 31), rgb(251, 216, 96))',
                                color: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            {data.name}
                        </h2>
                        <p className="text-base sm:text-lg text-gray-300 mt-2">
                            {data.category}
                        </p>
                        <HeroTimeRemaining data={data.start} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventHeader;
