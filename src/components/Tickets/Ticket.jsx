import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

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
    }, [handleClickOutside]);
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            {/* Floating Window */}
            <div
                className="relative bg-white max-w-lg w-full mx-4 border border-black rounded-lg shadow-lg  overflow-hidden"
                ref={modalRef}
            >
                <div className="rounded-lg border border-dashed border-black m-6 mb-3">
                    {/* Header */}
                    <div className="text-center bg-pink-500 text-white py-2 rounded-t-lg font-semibold mb-4 text-lg ">
                        Event Pass
                    </div>

                    {/* Event Details */}
                    <div className="text-center">
                        <h2 className="text-xl font-bold">
                            {ticketData.eventTitle}
                        </h2>
                        <p className="text-gray-600">{ticketData.eventDate}</p>
                    </div>

                    {/* Attendee Details */}
                    <div className="text-center my-4">
                        <p className="font-semibold">
                            {ticketData.attendeeName}
                        </p>
                        <p className="text-sm text-gray-500">
                            {ticketData.email}
                        </p>
                        <p className="text-sm text-gray-500">
                            {ticketData.contactNumber}
                        </p>
                    </div>

                    {/* Event Description */}
                    <div className="my-4">
                        <h3 className="font-semibold text-center mb-2">
                            Event Description
                        </h3>
                        <p className="text-sm text-gray-600 text-center">
                            {ticketData.eventDescription}
                        </p>
                    </div>

                    {/* QR Code */}
                    <div className="flex justify-center my-4">
                        <Image
                            src="https://via.placeholder.com/150" // Replace with actual QR code
                            alt="QR Code"
                            className="h-36 w-36"
                        />
                    </div>

                    {/* Ticket Details */}
                    <div className="text-center my-4">
                        <p>
                            <span className="font-semibold">Order ID: </span>
                            {ticketData.orderId}
                        </p>
                        <p>
                            <span className="font-semibold">Ticket ID: </span>
                            {ticketData.ticketId}
                        </p>
                        <p>
                            <span className="font-semibold">Price: </span>
                            {ticketData.price}
                        </p>
                        <p>
                            <span className="font-semibold">
                                Payment Method:{' '}
                            </span>
                            {ticketData.paymentMethod}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            Registered on {ticketData.bookingDate}
                        </p>
                    </div>

                    {/* Venue */}
                    <div className="border-t my-4 py-4">
                        <h3 className="font-semibold text-center mb-2">
                            Event Venue
                        </h3>
                        <p className="text-center text-sm text-gray-600 whitespace-pre-line">
                            {ticketData.venue}
                        </p>
                        <div className="text-center mt-2">
                            <a
                                href={ticketData.mapLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline text-sm"
                            >
                                View on Google Maps
                            </a>
                        </div>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-sm text-gray-500 mt-2">
                        Thank you for registering!
                    </p>
                </div>
                {/* Close Button */}
                <button
                    className="w-full text-gray-500 hover:text-gray-800 mb-2"
                    onClick={() => showTicket(false)} // Toggles visibility off
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Tickets;
