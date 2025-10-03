import React from 'react';

const EventDashboard = ({ profile }) => {
    return (
        <div className="p-6   shadow-lg rounded-lg mx-auto">
            <h2 className="text-2xl font-bold mb-6 border-b pb-2  ">
                My Events
            </h2>
            <div className="space-y-6">
                {profile?.events.length !== 0 ? (
                    profile?.events.map((event, index) => {
                        return (
                            <div
                                key={index}
                                className="flex items-center justify-between p-6   border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                            >
                                <div>
                                    <h3 className="text-xl font-semibold  ">
                                        {event.name}
                                    </h3>
                                    <p className="text-sm   mt-1">
                                        Status:{' '}
                                        {new Date(event.date) > new Date() ? (
                                            <span className="font-medium text-green-600">
                                                Upcoming
                                            </span>
                                        ) : (
                                            <span className="font-medium text-blue-600">
                                                Completed
                                            </span>
                                        )}
                                    </p>
                                </div>
                                <Link
                                    href={`/events/${event.name}`}
                                    className="mt-4 sm:mt-0 text-blue-500 font-medium px-4 py-2 rounded-full  hover:bg-neutral-300 transition duration-200"
                                >
                                    View Details
                                </Link>
                            </div>
                        );
                    })
                ) : (
                    <p className="  text-lg">No registration</p>
                )}
            </div>
        </div>
    );
};

export default EventDashboard;
