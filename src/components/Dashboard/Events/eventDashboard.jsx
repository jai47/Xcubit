'use client';
import React, { useState } from 'react';
import Button from '../../Button';

const EventDashboard = ({ userTeams }) => {
    const [selectedTeamEvent, setSelectedTeamEvent] = useState(null);
    console.log(selectedTeamEvent);

    const handleEventClick = (teamEvent) => {
        setSelectedTeamEvent(teamEvent);
    };

    return (
        <div className="p-6 shadow-lg rounded-lg mx-auto w-full max-w-7xl">
            <h2 className="text-white text-2xl sm:text-3xl font-bold mb-6 border-b pb-2 text-center sm:text-left">
                My Events
            </h2>

            {userTeams?.data?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userTeams.data.map((team, idx) => {
                        const event = team.event;
                        return (
                            <div
                                key={idx}
                                className="flex flex-col items-center justify-between p-6 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-indigo-500 shadow-md hover:shadow-xl transition-all duration-300 text-white cursor-pointer"
                                onClick={() =>
                                    handleEventClick({ team, event })
                                }
                            >
                                <div className="text-center space-y-2">
                                    <h3 className="text-xl font-semibold text-indigo-400">
                                        {event.name}
                                    </h3>
                                    <p className="text-sm text-gray-300">
                                        Status:{' '}
                                        {new Date(event.dateTime) >
                                        new Date() ? (
                                            <span className="font-medium text-green-400">
                                                Upcoming
                                            </span>
                                        ) : (
                                            <span className="font-medium text-blue-400">
                                                Completed
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="text-center text-gray-400 text-lg mt-6">
                    You haven’t registered for any events yet.
                </p>
            )}

            {/* Modal */}
            {selectedTeamEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="relative bg-white max-w-md sm:max-w-lg w-full mx-auto rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh] border border-neutral-300 animate-fadeIn p-6">
                        <button
                            className="absolute top-3 right-3 text-gray-600 hover:text-black font-bold text-xl"
                            onClick={() => setSelectedTeamEvent(null)}
                        >
                            &times;
                        </button>

                        <h2 className="text-2xl font-bold mb-2 text-center">
                            {selectedTeamEvent.event.name}
                        </h2>
                        <p className="text-sm text-gray-600 text-center mb-4">
                            {new Date(
                                selectedTeamEvent.event.dateTime
                            ).toLocaleString()}
                        </p>

                        {/* Event Details */}
                        <div className="mb-4">
                            <p className="font-semibold">Location:</p>
                            <p className="text-gray-700">
                                {selectedTeamEvent.event.location}
                            </p>
                            {selectedTeamEvent.event.locationURL && (
                                <a
                                    href={selectedTeamEvent.event.locationURL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-600 underline text-sm"
                                >
                                    View on Google Maps
                                </a>
                            )}
                        </div>

                        {/* Team Info */}
                        <div className="mb-4">
                            <p className="font-semibold">Team Name:</p>
                            <p className="text-gray-700">
                                {selectedTeamEvent.team.name}
                            </p>

                            <p className="font-semibold mt-2">Team Leader:</p>
                            <p className="text-gray-700">
                                {selectedTeamEvent?.team?.leader?.name} (
                                {selectedTeamEvent?.team?.leader?.email})
                            </p>
                            <p className="font-semibold mt-2">Team Members:</p>
                            <ul className="list-disc list-inside text-gray-700">
                                {selectedTeamEvent.team.members.map(
                                    (member, i) => (
                                        <li key={i}>
                                            {member.name} ({member.email})
                                        </li>
                                    )
                                )}
                            </ul>

                            {/* Submissions */}
                            <p className="font-semibold mt-2">Submissions:</p>
                            <ul className="text-gray-700">
                                <li>
                                    Text:{' '}
                                    {selectedTeamEvent.team.submission.text
                                        ? '✅'
                                        : '❌'}
                                </li>
                                <li>
                                    Video:{' '}
                                    {selectedTeamEvent.team.submission.video
                                        ? '✅'
                                        : '❌'}
                                </li>
                                <li>
                                    Document:{' '}
                                    {selectedTeamEvent.team.submission.document
                                        ? '✅'
                                        : '❌'}
                                </li>
                                <li>
                                    Repo:{' '}
                                    {selectedTeamEvent.team.submission.repo
                                        ? '✅'
                                        : '❌'}
                                </li>
                            </ul>
                        </div>

                        <div className="flex justify-center mt-4">
                            <Button
                                text="Close"
                                onClick={() => setSelectedTeamEvent(null)}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventDashboard;
