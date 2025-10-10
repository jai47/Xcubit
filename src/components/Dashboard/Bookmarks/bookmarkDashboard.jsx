import Link from 'next/link';
import React from 'react';

const BookmarkDashboard = ({ bookmarkedEvents }) => {
    return (
        <div className="p-6   shadow-lg rounded-lg mx-auto">
            <h2 className="text-2xl font-bold mb-6 border-b pb-2  ">
                Bookmarks
            </h2>
            <div className="space-y-6">
                {bookmarkedEvents.length > 0 ? (
                    bookmarkedEvents.map((event, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-6   border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <div>
                                <h3 className="text-xl font-semibold  ">
                                    {event}
                                </h3>
                            </div>
                            <Link
                                href={`/events/${event}`}
                                className="mt-4 sm:mt-0 text-blue-500 font-medium px-4 py-2 rounded-full hover:bg-neutral-300 transition duration-200"
                            >
                                View Details
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="  text-lg">
                        You have not bookmarked any events yet.
                    </p>
                )}
            </div>
        </div>
    );
};

export default BookmarkDashboard;
