'use client';
import React, { useEffect, useState } from 'react';
import Tickets from '../../Tickets/Ticket';
import Button from '../../Button';

const TicketDashboard = ({ profile, userTeams, queryTicket }) => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState(null);

    useEffect(() => {
        if (queryTicket) {
            const ticketData = userTeams?.find(
                (team) => team._id === queryTicket
            );
            showTicket(ticketData);
        }
    }, [queryTicket, userTeams]);

    const showTicket = (team) => {
        if (!team) {
            setSelectedEvent(null);
            setSelectedTeam(null);
        } else {
            setSelectedEvent(team.event);
            setSelectedTeam(team);
        }
    };
    console.log(queryTicket);

    return (
        <div className="p-4 sm:p-10 shadow-lg rounded-lg mx-auto w-full max-w-7xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 border-b pb-2 text-center sm:text-left text-white">
                My Tickets
            </h2>

            {/* Event Cards */}
            {userTeams?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userTeams?.map((team, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-between p-6 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-indigo-500 shadow-md hover:shadow-xl transition-all duration-300 text-white"
                        >
                            <div className="text-center space-y-2">
                                <h3 className="text-xl font-semibold text-indigo-400">
                                    {team?.event?.name}
                                </h3>
                                <p className="text-sm text-gray-300">
                                    Date:{' '}
                                    <span className="font-medium">
                                        {new Date(
                                            team?.event?.dateTime
                                        ).toLocaleString()}
                                    </span>
                                </p>
                                <p className="text-sm text-gray-300">
                                    Team:{' '}
                                    <span className="font-medium">
                                        {team?.name}
                                    </span>
                                </p>
                            </div>

                            <Button
                                className="bg-indigo-600 hover:bg-indigo-700 text-white border-none text-sm font-medium py-2 px-6 mt-4 rounded-full transition-all"
                                onClick={() => showTicket(team)}
                                text="View Ticket"
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-400 text-lg mt-6">
                    You haven’t registered for any events yet.
                </p>
            )}

            {/* Ticket Modal */}
            {selectedEvent && selectedTeam ? (
                <Tickets
                    event={selectedEvent}
                    user={profile}
                    teamCode={selectedTeam._id}
                    showTicket={showTicket}
                />
            ) : null}
        </div>
    );
};

export default TicketDashboard;
