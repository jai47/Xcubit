import React from 'react';
import Tickets from '../../Tickets/Ticket';
import Button from '../../Button';

const TicketDashboard = ({ profile, selectedEvent }) => {
    return (
        <div className="p-6   shadow-lg rounded-lg mx-auto">
            <h2 className="text-2xl font-bold mb-6 border-b pb-2  ">
                My Tickets
            </h2>
            <div className="space-y-6">
                {profile?.events.length !== 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {profile?.events.map((event, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center justify-between p-6   border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="text-center">
                                    <h3 className="text-xl font-semibold  ">
                                        {event.name}
                                    </h3>
                                    <p className="text-sm   mt-1">
                                        Date:{' '}
                                        <span className="font-medium">
                                            {event.date}
                                        </span>
                                    </p>
                                </div>
                                <Button
                                    className="bg-primary text-background border uppercase text-sm border-black py-2 px-8 mt-3 rounded-full hover:bg-main hover:border-primary hover:text-primary transition-all"
                                    onClick={() => showTicket(event)}
                                    text="View Ticket"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="  text-lg">
                        You have not registered for any events yet.
                    </p>
                )}

                {/* Render the selected ticket only if an event is selected */}
                {selectedEvent && (
                    <Tickets
                        ticketData={{
                            eventTitle: selectedEvent.name,
                            eventDate: selectedEvent.date + ' - 12:00 PM',
                            attendeeName: profile?.name,
                            email: profile?.email,
                            contactNumber: profile?.phone,
                            orderId: selectedEvent?.['Order Id'],
                            ticketId: selectedEvent?.['Payment Id'],
                            paymentMethod: 'Razorpay',
                            venue: selectedEvent.location,
                            mapLink: selectedEvent.locationUrl,
                            teamMates: selectedEvent.teamMembers,
                            email: profile?.email,
                        }}
                        showTicket={showTicket}
                    />
                )}
            </div>
        </div>
    );
};

export default TicketDashboard;
