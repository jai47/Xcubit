import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import QRCodeGenerator from './QRCodeGenerator';

const Tickets = ({ ticketData, showTicket }) => {
    const modalRef = useRef(null);

    // Close the ticket when clicking outside the modal
    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            showTicket(null); // Close ticket
        }
    };

    useEffect(() => {
        // Add event listener on mount
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Clean up the event listener on unmount
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const qrData = {
        name: ticketData.attendeeName,
        event: ticketData.eventTitle,
        teamMembers: ticketData.teamMates,
        email: ticketData.email,
    };

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
            {/* Floating Window */}
            <div
                className="relative bg-white max-w-lg w-full mx-4 border border-black rounded-lg shadow-lg overflow-hidden max-h-screen overflow-y-auto"
                ref={modalRef}
            >
                <div className="rounded-lg border border-dashed border-black m-6 mb-3">
                    {/* Header */}
                    <div className="text-center bg-gray-500 text-white py-2 rounded-t-lg font-semibold mb-4 text-lg">
                        Event Pass
                    </div>

                    {/* Event Details */}
                    <div className="text-center">
                        <h2 className="text-lg sm:text-xl font-bold">
                            {ticketData.eventTitle}
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600">
                            {ticketData.eventDate}
                        </p>
                    </div>

                    {/* Attendee Details */}
                    <div className="text-center my-4">
                        <p className="font-semibold text-sm sm:text-base">
                            {ticketData.attendeeName}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                            {ticketData.email}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                            {ticketData.contactNumber}
                        </p>
                    </div>

                    {/* QR Code */}
                    <div className="flex justify-center">
                        <QRCodeGenerator data={qrData} />
                    </div>

                    {/* Ticket Details */}
                    {ticketData.orderId && ticketData.ticketId && (
                        <div className="text-center my-4">
                            <p>
                                <span className="font-semibold">
                                    Order ID:{' '}
                                </span>
                                <span className="text-sm sm:text-base">
                                    {ticketData.orderId}
                                </span>
                            </p>
                            <p className="hidden sm:block">
                                <span className="font-semibold">
                                    Ticket ID:{' '}
                                </span>
                                {ticketData.ticketId}
                            </p>
                            <p className="hidden sm:block">
                                <span className="font-semibold">
                                    Payment Method:{' '}
                                </span>
                                {ticketData.paymentMethod}
                            </p>
                        </div>
                    )}

                    {/* Venue */}
                    <div className="border-t my-4 py-4">
                        <h3 className="font-semibold text-center mb-2 text-sm sm:text-base">
                            Event Venue
                        </h3>
                        <p className="text-center text-xs sm:text-sm text-gray-600 whitespace-pre-line">
                            {ticketData.venue}
                        </p>
                        <div className="text-center mt-2">
                            <a
                                href={ticketData.mapLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline text-xs sm:text-sm"
                            >
                                View on Google Maps
                            </a>
                        </div>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-xs sm:text-sm text-gray-500 mt-2">
                        Thank you for registering!
                    </p>
                </div>
                {/* Close Button */}
                <button
                    className="w-full text-gray-500 hover:text-gray-800 mb-2"
                    onClick={() => showTicket(false)}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Tickets;
