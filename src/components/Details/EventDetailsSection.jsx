'use client'; // Ensures that this component is rendered client-side in Next.js

import Link from 'next/link';
import Image from 'next/image';
import BookmarkButton from './BookmarkButton'; // Assuming you have a BookmarkButton component
import Button from '../Button';

const EventDetailsSection = ({ data }) => {
    return (
        <div className="bg-background p-6 shadow-lg rounded-lg mt-[-5rem] mx-4 sm:mx-8 lg:mx-16 xl:mx-24 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
                {/* Event Logo and Location */}
                <Link href={data.locationURL} target="_blank">
                    <div className="group flex flex-col items-center relative w-full h-60 overflow-hidden">
                        <Image
                            src={data.image}
                            alt="Event Location"
                            layout="fill"
                            objectFit="contain"
                            quality={100}
                            className="group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Overlay div */}
                        <div className="h-full w-full absolute bg-black bg-opacity-60 flex flex-col justify-center items-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 200 200"
                                xmlSpace="preserve"
                                width="50px"
                            >
                                <path
                                    fill="#ffffff"
                                    d="M100.232 149.198c-2.8 0-5.4-1.8-7.2-5.2-22.2-41-22.4-41.4-22.4-41.6-3.2-5.1-4.9-11.3-4.9-17.6 0-19.1 15.5-34.6 34.6-34.6s34.6 15.5 34.6 34.6c0 6.5-1.8 12.8-5.2 18.2 0 0-1.2 2.4-22.2 41-1.9 3.4-4.4 5.2-7.3 5.2zm.1-95c-16.9 0-30.6 13.7-30.6 30.6 0 5.6 1.5 11.1 4.5 15.9.6 1.3 16.4 30.4 22.4 41.5 2.1 3.9 5.2 3.9 7.4 0 7.5-13.8 21.7-40.1 22.2-41 3.1-5 4.7-10.6 4.7-16.3-.1-17-13.8-30.7-30.6-30.7z"
                                />
                                <path
                                    fill="#ffffff"
                                    d="M100.332 105.598c-10.6 0-19.1-8.6-19.1-19.1s8.5-19.2 19.1-19.2c10.6 0 19.1 8.6 19.1 19.1s-8.6 19.2-19.1 19.2zm0-34.3c-8.3 0-15.1 6.8-15.1 15.1s6.8 15.1 15.1 15.1 15.1-6.8 15.1-15.1-6.8-15.1-15.1-15.1z"
                                />
                            </svg>
                            <span className="text-white">View Location</span>
                        </div>
                    </div>
                </Link>

                {/* Event Info */}
                <div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h2
                                className="text-xs sm:text-sm font-bold text-transparent bg-clip-text"
                                style={{
                                    background:
                                        'linear-gradient(-45deg, rgb(247, 110, 31), rgb(251, 216, 96))',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Event Name
                            </h2>
                            <p className="font-bold text-base sm:text-lg text-gray-100">
                                {data.name}
                            </p>
                        </div>
                        <div>
                            <h2
                                className="text-xs sm:text-sm font-bold text-transparent bg-clip-text"
                                style={{
                                    background:
                                        'linear-gradient(-45deg, rgb(247, 110, 31), rgb(251, 216, 96))',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Date
                            </h2>
                            <p className="font-bold text-base sm:text-lg text-primary">
                                {new Date(data.start).toDateString('hi-IN')}
                            </p>
                        </div>
                        <div>
                            <h2
                                className="text-xs sm:text-sm font-bold text-transparent bg-clip-text"
                                style={{
                                    background:
                                        'linear-gradient(-45deg, rgb(247, 110, 31), rgb(251, 216, 96))',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Total Registrants
                            </h2>
                            <p className="font-bold text-base sm:text-lg text-gray-100">
                                {data.maxParticipation}
                            </p>
                        </div>
                        <div>
                            <h2
                                className="text-xs sm:text-sm font-bold text-transparent bg-clip-text"
                                style={{
                                    background:
                                        'linear-gradient(-45deg, rgb(247, 110, 31), rgb(251, 216, 96))',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Prize Pool
                            </h2>
                            <p className="font-bold text-base sm:text-lg text-gray-100">
                                ₹2,00,000
                            </p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Link
                            href={{
                                pathname: '/register',
                                query: { event: data.name },
                            }}
                        >
                            <Button text={'Register Now'} />
                        </Link>
                    </div>
                </div>

                {/* Registration Fee */}
                <div className="flex justify-between">
                    <div className="flex flex-col items-center">
                        {data.price !== '0' ? (
                            <>
                                <h2
                                    className="text-white text-sm"
                                    style={{
                                        backgroundImage:
                                            'linear-gradient(-45deg,#F76E1F, #FBD860)',
                                        color: 'transparent',
                                        backgroundClip: 'text',
                                    }}
                                >
                                    Registration Fee
                                </h2>
                                <p className="font-bold text-lg text-white">
                                    Rs {data.price}
                                </p>
                            </>
                        ) : (
                            <span className="p-semibold-14 w-auto rounded-full bg-green-400 px-4 py-1 text-white">
                                FREE
                            </span>
                        )}
                    </div>
                    <BookmarkButton cookie={'bookmarks'} value={data.name} />
                </div>
            </div>
        </div>
    );
};

export default EventDetailsSection;
